/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        chats: [],
        chat: {}
    },

    mutations: {
        SET_CHAT (state, payload) {
            state.chat = payload
        },

        SET_CHATS (state, payload) {
            state.chats = payload
        }
    },

    actions: {
        async getFile ({ commit }, id) {
            const response = await ApiService.get(`/api/organisation/folder/${id}/update`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_FILE', response.data)
        },
    },

    getters: {}
}
