/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        list: [],
        availability: {},
    },

    mutations: {
        ADD_AVAILABILITY (state, payload) {
            state.list.push(payload)
        },

        SET_AVAILABILITY (state, payload) {
            state.availability = payload
        },

        SET_AVAILABILITIES (state, payload) {
            state.list = payload
        },
    },

    actions: {
        async getAvailability ({ commit }, id) {
            const response = await ApiService.get(`/booking-api/availibilities/${id}/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_AVAILABILITY', response.data)
        },
        async getAvailabilities ({ commit }) {
            const response = await ApiService.get(`/booking-api/availibilities/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_AVAILABILITIES', response.data.results)
        },
    },

    getters: {
        getAvailability: state => state.availability,
        getAvailabilities: state => state.list,
    }
}
