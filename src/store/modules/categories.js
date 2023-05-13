/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        categories: [],
        category: {},
    },

    mutations: {
        ADD_CATEGORY (state, payload) {
            state.categories.push(payload)
        },

        SET_CATEGORY (state, payload) {
            state.category = payload
        },

        SET_CATEGORIES (state, payload) {
            state.categories = payload
        },
    },

    actions: {
        async getCategory ({ commit }, id) {
            const response = await ApiService.get(`/market-api/categories/${id}/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CATEGORY', response.data)
        },
        async getCategories ({ commit }) {
            const response = await ApiService.get(`/market-api/categories/`)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CATEGORIES', response.data.results)
        },
    },

    getters: {
        getCategory: state => state.category,
        getCategories: state => state.categories,
    }
}
