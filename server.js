require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const config =  require('./src/services/config.js')
    
const app = express();
const port = process.env.PORT || 4000;
const pusher = new Pusher({
    appId: config.get('pusher_app_id'),
    key: config.get('pusher_app_key'),
    secret: config.get('pusher_app_secret'),
    cluster: config.get('pusher_app_cluster'),
});
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
    
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
});
  
app.post('/schedule', (req, res) => {
    const {body} = req;
    const data = {
      ...body,
    };
    
pusher.trigger('schedule', 'new-event', data);
    res.json(data);
});