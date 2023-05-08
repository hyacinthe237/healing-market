/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        chats: [],
        contacts: [],
        chat: {},
        last_message: {},
    },

    mutations: {
        SET_CHAT (state, payload) {
            state.chat = payload
        },

        SET_LAST_MESSAGE (state, payload) {
            state.last_message = payload
        },

        SET_CHATS (state, payload) {
            state.chats = payload
        },

        SET_CONTACTS (state, payload) {
            state.contacts = payload
        },
    },

    actions: {
        async getChat ({ commit }, id) {
            const response = await ApiService.get(`/chat-api/${id}`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CHAT', response.data)
        },
        async getChats ({ commit }) {
            const response = await ApiService.get(`/chat-api/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CHATS', response.data)
        },

        async getLastMessage ({ commit }) {
            const response = await ApiService.get(`/chat-api/last-message/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_LAST_MESSAGE', response.data)
        },

        async getContacts ({ commit }) {
            const response = await ApiService.get(`/chat-api/contacts/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CONTACTS', response.data)
        },
    },

    getters: {
        getChat: state => state.chat,
        getChats: state => state.chats,
        getContacts: state => state.contacts,
        getLastMessage: state => state.last_message,
    }
}
