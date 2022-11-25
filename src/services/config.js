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
    },

    get(key) {
        return this.keys[key]
    },

    set(key, value) {
        this.keys[key] = value
    },
}
