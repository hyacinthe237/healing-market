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
                <div class="see-all bold">See all</div>
            </div>
            <div class="cares">
                <div 
                    class="care pointer" 
                    @click="openDetails(offer)"
                    v-for="offer in offers"
                    :key="offer.id"
                >
                    <div class="image" :style="`background-image:url(${femme})`">
                        <div class="overlay"></div>
                    </div>
                    <div class="care-content">
                        <h6>{{ offer.title }}</h6>
                        <div class="verified">4.6 (verified reviews)</div>
                        <p>{{ offer.description }}</p>

                        <div class="care-footer">
                            <div class="price">${{ offer.price }}</div>
                            <button class="btn btn-primary">Book</button>
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
            this.$router.push({ name: 'practitioner-details', params: { id: offer.therapist_id, offer: offer.id } })
        },

        async search (data) {
            this.startLoading()

            const payload = {
                query: data.query,
                zipcode: data.zipcode
            }

            this.$store.commit('SET_QUERY', data.query)
            this.$store.commit('SET_ZIP_CODE', data.zipcode)
    
            const res = await this.$api.get(`/market-api/search/therapists/`, payload)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.therapists = res.data.features
            }
        },
    },
}
</script>
