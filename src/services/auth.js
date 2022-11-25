import config from './config'

const REFRESH_TOKEN = config.get('refresh_token')
const TOKEN = config.get('token')
const USER = config.get('user')

export default {
    user() {
        return this.$store.state.auth
    },

    setUser (user) {
        localStorage.setItem(USER, JSON.stringify(user))
    },

    getUser () {
        return JSON.parse(localStorage.getItem(USER))
    },

    getToken() {
        return localStorage.getItem(TOKEN)
    },

    setToken(token) {
        localStorage.setItem(TOKEN, token)
    },

    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN)
    },

    setRefreshToken(refresh_token) {
        localStorage.setItem(REFRESH_TOKEN, refresh_token)
    },

    logout() {
        localStorage.clear()
        window.setTimeout(location.reload(), 50000)
    },

    check() {
        return localStorage.getItem(TOKEN)
    }
}
