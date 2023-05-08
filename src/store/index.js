import Vue from 'vue'
import Vuex from 'vuex'
import ChatsModule from './modules/chats'
import UsersModule from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        auth: {},
        offers: [],
        toggleIcon: false,
        query: '',
        zipcode: '',
    },

    mutations: {
        SET_QUERY (state, value) {
            state.query = value
        },

        SET_ZIP_CODE (state, value) {
            state.zipcode = value
        },

        SET_OFFERS (state, payload) {
            state.offers = payload
        },

        SET_TOGGLE_ICON (state, value) {
            state.toggleIcon = value
        },
    },

    modules: {
        chats: ChatsModule,
        users: UsersModule,
    }
})
