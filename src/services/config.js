export default {
    keys: {
        domain: process.env.VUE_APP_DOMAIN || '/',
        root_url: `${process.env.VUE_APP_ROOT_URL}` || 'https://nogada-api.herokuapp.com/',
        base_url: `${process.env.VUE_APP_ROOT_URL}/` || 'https://nogada-api.herokuapp.com/',
        // front_url: `${process.env.VUE_APP_FRONT_SERVER}/`,
        refresh_token: process.env.VUE_APP_REFRESH_TOKEN || 'nogada_refresh_token',
        token: process.env.VUE_APP_TOKEN || 'nogada_token',
        user: process.env.VUE_APP_USER || 'nogada_user',
        app_key: process.env.VUE_APP_KEY || 'base64:qfqr3qV0NU2R3/4VX11vwREaPpQbKfzyxxYbWKTFZFE=',
        pusher_app_id: process.env.VUE_APP_PUSHER_APP_ID || '1540216',
        pusher_app_key: process.env.VUE_APP_PUSHER_KEY || '2d0eda717660b1bb1f25',
        pusher_app_secret: process.env.VUE_APP_PUSHER_SECRET || '9918ad69408d3e16b03a',
        pusher_app_cluster: process.env.VUE_APP_PUSHER_CLUSTER || 'eu',
    },

    get(key) {
        return this.keys[key]
    },

    set(key, value) {
        this.keys[key] = value
    },
}
