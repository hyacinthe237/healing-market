/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        tags: [],
        tag: {},
    },

    mutations: {
        ADD_TAG (state, payload) {
            state.tags.push(payload)
        },

        SET_TAGS (state, payload) {
            state.tags = payload
        },

        SET_TAG (state, payload) {
            state.tag = payload
        },
    },

    actions: {
        async getTags ({ commit }) {
            const response = await ApiService.get(`/market-api/tag-providers/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_TAGS', response.data)
        },

        async getTag ({ commit }, id) {
            const response = await ApiService.get(`/market-api/tag-providers/${id}/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_TAG', response.data)
        },
    },

    getters: {
        getTags: state => state.tags,
        getTag: state => state.tag,
    }
}
