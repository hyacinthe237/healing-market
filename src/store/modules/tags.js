/* eslint no-unused-vars: "off" */
import ApiService from '@/services/api'

export default {
    namespaced: true,

    state: {
        offer_tags: [],
    },

    mutations: {
        SET_OFFER_TAGS (state, payload) {
            state.offer_tags = payload
        },
    },

    actions: {
        async setOfferTags ({ commit }, tags, id) {
            const response = await ApiService.post(`/market-api/offers/${id}/add-tags`, tags)
                .catch(error => console.log(error.response.data.errors))

            commit('SET_CHAT', response.data)
        },
    },

    getters: {
        setOfferTags: state => state.offer_tags
    }
}
