<template lang="html">
  <div class="landing">
    <Navbar 
        v-show="!isLoading" 
        :categories="categories" 
        :search="searh_host" 
        @toggleMenus="toggleMenus"
        @search="search"
    ></Navbar>
    <div class="container" v-if="showMenus">
        <div class="row mb-20">
            <div class="col-sm-3 pointer black" v-for="category in categories" 
            :key="category.id">{{ category.label }}</div>
        </div>
    </div>
    <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
    </div>

    <div class="spacer" v-show="!isLoading"></div>

    <section class="section-home" v-show="!isLoading">
        <div class="container">
            <div class="section-header">
                <h2>BOOK ONLINE HOLISTIC CARE</h2>
            </div>
            <div class="row mt-20">
                <div class="titre" v-if="no_offers">No offers found</div>
                <div 
                    class="col-sm-12"
                    v-for="o in offers"
                    :key="o.id"
                    v-else
                >
                    <div class="wrap">
                        <div class="image"></div>
                        <div class="text-wrap">
                            <div class="name">{{ o.title }}</div>
                            <div class="price">${{ o.price }}</div>
                            <div class="desc">{{ truncateString(o.description, 300) }}</div>
                            <div class="footer mt-10">
                                <button class="btn btn-primary mr-5">View profile</button>
                                <button class="btn btn-secondary" @click="openDetails(o)">Book appointment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <GetStartedModal></GetStartedModal>
    <Footer :isConnected="isConnected" v-show="!isLoading"></Footer>
  </div>
</template>

<script>
import BodyMixins from './mixins'

export default {
    name: 'CoreBody',

    mixins: [BodyMixins],

    data: () => ({
        selectedText: '',
        searching: false,
        seeAllOffers: false,
    }),

    methods: {
        openGetStartedModal () {
            this.openModal({ id: 'GetStartedModal' })
        },

        openDetails (offer) {
            this.$router.push({ name: 'practitioner-details', params: { id: offer.therapist.id, offer: offer.id } })
        },

        async search (data = null) {
            this.startLoading()

            let payload = {}
            if (data !== null) {
                payload = {
                    query: data.query,
                    zipcode: data.zipcode
                }
            }

            if (data == null) {
                payload = {
                    query: this.searh_host.query,
                    zipcode: this.searh_host.zipcode
                }
            }
    
            const res = await this.$api.get(`/market-api/search/therapists/`,  { params: payload })
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.$store.commit('SET_OFFERS', res.data)
              this.$store.commit('SET_QUERY', payload.query)
              this.$store.commit('SET_ZIP_CODE', payload.zipcode)
            }
        },
    },
}
</script>
