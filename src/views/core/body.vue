<template lang="html">
  <div class="landing">
    <Navbar></Navbar>

    <section class="section-hero" :style="`background-image:url(${hero})`">
        <div class="container">
            <div class="content">
                <h2>book your next</h2>
                <h2>wellness practitioner</h2>

                <form class="form-inline mt-20">
                    <div class="input-group">
                        <div class="icon"><i class="feather icon-search"></i></div>
                        <input type="text" class="form-control" placeholder="Try Message or Back Pain" />
                    </div>
                    <div class="input-group">
                        <div class="icon"><i class="feather icon-map-pin"></i></div>
                        <input 
                            type="text" 
                            class="form-control" 
                            placeholder="Yaounde, Cameroun"
                            name="address"
                            v-model="ghost.address"
                            v-validate="'required'"
                            id="address"
                        />
                    </div>
                    <button class="btn btn-secondary">Search</button>
                </form>
                <div class="lists">
                    <div class="list">Message</div>
                    <div class="list">Browse Services</div>
                </div>
            </div>
        </div>
    </section>

    <div class="spacer"></div>

    <section class="section-home">
        <div class="container">
            <div class="section-header">
                <h2>BOOK ONLINE HOLISTIC CARE</h2>
                <div class="see-all bold">See all</div>
            </div>
            <div class="cares">
                <div class="care">
                    <img :src="femme" alt="">
                    <div class="care-content">
                        <h6>How to make your Own room perfume efficiently</h6>
                        <div class="verified">4.6 (verified reviews)</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

                        <div class="care-footer">
                            <div class="price">$75.00</div>
                            <button class="btn btn-secondary">Book</button>
                        </div>
                    </div>
                </div>
                <div class="care">
                    <img :src="homme" alt="">
                    <div class="care-content">
                        <h6>How to make your Own room perfume efficiently</h6>
                        <div class="verified">4.6 (verified reviews)</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div class="care-footer">
                            <div class="price">$75.00</div>
                            <button class="btn btn-secondary">Book</button>
                        </div>
                    </div>
                </div>
                <div class="care">
                    <img :src="femme" alt="">
                    <div class="care-content">
                        <h6>tips cleaning your big house for one person</h6>
                        <div class="verified">4.6 (verified reviews)</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div class="care-footer">
                            <div class="price">$75.00</div>
                            <button class="btn btn-secondary">Book</button>
                        </div>
                    </div>
                </div>
                <div class="care">
                    <img :src="homme" alt="">
                    <div class="care-content">
                        <h6>cleaning home fastly and perfect clean for perfect house</h6>
                        <div class="verified">4.6 (verified reviews)</div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div class="care-footer">
                            <div class="price">$75.00</div>
                            <button class="btn btn-secondary">Book</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section class="section-home">
        <div class="container">
            <div class="bg-box pointer" :style="`background-image:url(${bg})`">
                <h1>match with the perfect</h1>
                <h1>practitioner in under a minute.</h1>
                <button class="btn btn-primary mt-20">Get startet</button>
            </div>
        </div>
    </section>

    <section class="section-home bg-gray">
        <div class="container">
            <div class="banner">
                <div class="text">
                    <h1>wellness practitioner?</h1>
                    <p>Crow your practice and join our mission to make wellness primary care</p>
                    <button class="btn btn-primary">List your practice</button>
                </div>
                <div class="img">
                    <img :src="circle" alt="image en cercle">
                </div>
            </div>
        </div>
        
    </section>

    <section class="section-home">
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

    <Footer :isConnected="isConnected"></Footer>
  </div>
</template>

<script>
import post1 from '@/assets/img/healing/post1.png'
import post2 from '@/assets/img/healing/post2.png'
import post3 from '@/assets/img/healing/post3.png'
import bg from '@/assets/img/healing/bg.png'
import circle from '@/assets/img/healing/image-circle.png'
import femme from '@/assets/img/healing/profil-femme.png'
import homme from '@/assets/img/healing/profil-homme.png'
import hero from '@/assets/img/healing/hero.png'
import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '../../services/config'
import BodyMixins from './mixins'

export default {
    name: 'CoreBody',

    mixins: [BodyMixins],

    data: () => ({
        selectedText: '',
        post1, post2, post3, circle, bg, femme, homme, hero
    }),

    components: {
        Navbar, Footer
    },

    computed: {
        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },

        isConnected () {
            return !_.isEmpty(this.user)
        }
    },

    methods: {
        openPreviewModal (text) {
            this.selectedText = text
            this.showBtn = false
            this.openModal({ id: 'previewModal' })
        },
    },
}
</script>
