export default {
    keys: {
        domain: process.env.VUE_APP_DOMAIN || '/',
        root_url: `${process.env.VUE_APP_ROOT_URL}` || 'https://healing-market.herokuapp.com/',
        base_url: `${process.env.VUE_APP_ROOT_URL}/` || 'https://healing-market.herokuapp.com/',        
        front_url: `${process.env.VUE_APP_FRONT_SERVER}/` || `https://getzebest.com/`,
        google_api_key: process.env.VUE_APP_GOOGLE_API_KEY || 'no-google-api-key',
        token: process.env.VUE_APP_TOKEN || 'healing_token',
        user: process.env.VUE_APP_USER || 'healing_user',
        app_key: process.env.VUE_APP_KEY || 'base64:qfqr3qV0NU2R3/4VX11vwREaPpQbKfzyxxYbWKTFZFE=',
        pusher_app_id: process.env.VUE_APP_PUSHER_APP_ID || '1540216',
        pusher_app_key: process.env.VUE_APP_PUSHER_KEY || '2d0eda717660b1bb1f25',
        pusher_app_secret: process.env.VUE_APP_PUSHER_SECRET || '9918ad69408d3e16b03a',
        pusher_app_cluster: process.env.VUE_APP_PUSHER_CLUSTER || 'eu',
        stripe_key: process.env.VUE_APP_STRIPE_KEY || 'pk_live_51KVhNNE4Hh3BjuasVFLe2FvSylGJgTknweKmQvfeqrI1ObQladfyM2t7A8fUqzmdyRJw9HWgVPOv2gwXVCQfP1b400Clx1yf9W',
        stripe_account: process.env.VUE_APP_STRIPE_ACCOUNT || 'acct_1IMgMoD0JaUAVNhk',
        web_socket_root: process.env.VUE_APP_WEB_SOCKET_ROOT || 'wss://healing-market.herokuapp.com/ws/chatroom/',
    },

    get(key) {
        return this.keys[key]
    },

    set(key, value) {
        this.keys[key] = value
    },
}
