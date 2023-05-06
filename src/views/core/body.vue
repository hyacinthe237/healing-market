<template lang="html">
  <div class="landing">
    <Navbar 
        v-show="!isLoading" 
        :categories="categories" 
        @search="searchTherapists"
        :isSearching="searching"
        @toggleMenus="toggleMenus"
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

    <section class="section-hero" :style="`background-image:url(${hero})`" v-show="!isLoading">
        <div class="container">
            <div class="content">
                <h2>book your next</h2>
                <h2>wellness practitioner</h2>

                <form class="form-inline mt-20 _form" @submit.prevent>
                    <div class="input-group">
                        <div class="icon"><i class="feather icon-search"></i></div>
                        <input type="text" name="query" v-model="ghost.query" class="form-control" placeholder="Try massage , backpain, etc" />
                    </div>
                    <div class="input-group">
                        <div class="icon"><i class="feather icon-map-pin"></i></div>
                        <input 
                            type="number" 
                            class="form-control" 
                            placeholder="Enter zipcode"
                            name="zipcode"
                            v-model="ghost.zipcode"
                        />
                    </div>
                    <button type="submit" class="btn btn-secondary" @click="searchTherapists()">Search</button>
                </form>
                <div class="lists">
                    <div class="list" @click="selectItem(item.label)" v-for="item in lists" :key="item.id">{{ item.label }}</div>
                    <div class="list">All</div>
                </div>
            </div>
        </div>
    </section>

    <div class="spacer" v-show="!isLoading"></div>

    <section class="section-home" v-show="!isLoading">
        <div class="container">
            <div class="section-header">
                <h2>BOOK ONLINE HOLISTIC CARE</h2>
                <div class="see-all bold">See all</div>
            </div>
            <div class="cares">
                <div class="row">
                    <div 
                        class="col-sm-3"
                        @click="openDetails(offer)"
                        v-for="offer in offers"
                        :key="offer.id"
                    >
                        <div class="care pointer">
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
            </div>
        </div>
    </section>

    <section class="section-home" v-show="!isLoading">
        <div class="container">
            <div class="bg-box pointer" :style="`background-image:url(${bg})`">
                <h1>match with the perfect</h1>
                <h1>practitioner in under a minute.</h1>
                <button class="btn btn-primary mt-20" @click="openGetStartedModal()">Get startet</button>
            </div>
        </div>
    </section>

    <section class="section-home bg-gray" v-show="!isLoading">
        <div class="container">
            <div class="banner">
                <div class="text">
                    <h1>wellness practitioner?</h1>
                    <p>Crow your practice and join our mission to make wellness primary care</p>
                    <button class="btn btn-primary"  @click="n('signup')">List your practice</button>
                </div>
                <div class="img">
                    <img :src="circle" alt="image en cercle">
                </div>
            </div>
        </div>
        
    </section>

    <section class="section-home" v-show="!isLoading">
        <div class="container">
            <div class="section-header">
                <h2>Read Our Blogs</h2>
                <div class="see-all bold">See all</div>
            </div>
            <div class="row">
            <div class="posts">
                <div class="post">
                    <img :src="post1" alt="">
                    <div class="post-content">
                        <h6>How to make your Own room perfume efficiently</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat commodi, maiores, perferendis veritatis non ducimus consectetur exercitationem</p>
                    </div>
                </div>
                <div class="post">
                    <img :src="post2" alt="">
                    <div class="post-content">
                        <h6>tips cleaning your big house for one person</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat commodi, maiores, perferendis veritatis non ducimus consectetur exercitationem</p>
                    </div>
                </div>
                <div class="post">
                    <img :src="post3" alt="">
                    <div class="post-content">
                        <h6>cleaning home fastly and perfect clean for perfect house</h6>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat commodi, maiores, perferendis veritatis non ducimus consectetur exercitationem</p>
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
        seeAllOffers: false,
    }),

    methods: {
        openGetStartedModal () {
            this.openModal({ id: 'GetStartedModal' })
        },

        openDetails (offer) {
            this.$router.push({ name: 'practitioner-details', params: { id: offer.therapist_id, offer: offer.id } })
        }
    },
}
</script>
