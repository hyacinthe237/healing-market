/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        client: {},
        clients: [],
        therapist: {},
        therapists: [],
    },

    mutations: {
        SET_CLIENT (state, payload) {
            state.client = payload
        },

        SET_CLIENTS (state, payload) {
            state.clients = payload
        },

        SET_THERAPIST (state, payload) {
            state.therapist = payload
        },

        SET_THERAPISTS (state, payload) {
            state.therapists = payload
        },
    },

    actions: {
        async getClients ({ commit }) {
            const response = await ApiService.get(`/user-api/clients/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CLIENTS', response.data.results)
        },

        async getClient ({ commit }, id) {
            const response = await ApiService.get(`/user-api/clients/${id}/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CLIENT', response.data)
        },

        async updateClient ({ state, commit }, client) {
            let clients = state.clients.slice()

            for (var i = 0; i < clients.length; i++) {
                if (clients[i].id === client.id) {
                    clients[i] = client
                }
            }

            commit('SET_CLIENTS', clients)
        },

        async getTherapists ({ commit }) {
            const response = await ApiService.get(`/user-api/therapists/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CLIENTS', response.data.results)
        },

        async getTherapist ({ commit }, id) {
            const response = await ApiService.get(`/user-api/therapists/${id}/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CLIENT', response.data)
        },

        async updateTherapist ({ state, commit }, therapist) {
            let therapists = state.therapists.slice()

            for (var i = 0; i < therapists.length; i++) {
                if (therapists[i].id === therapist.id) {
                    therapists[i] = therapist
                }
            }

            commit('SET_THERAPISTS', therapists)
        },
    },

    getters: {
        getClient: state => state.client,
        getClients: state => state.clients,
        getTherapist: state => state.therapist,
        getTherapists: state => state.therapists,
    }
}
