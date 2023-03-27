<template lang="html">
    <div class="services">
      <Navbar></Navbar>
  
      <section class="header" :style="`background-image:url(${hero})`">
          <div class="container">
              <div class="box">
                  <h3>reiki session with chakra balancing</h3>
              </div>
          </div>
      </section>

      <section class="details">
          <div class="container">
              <div class="details-box">
                <div class="gauche">
                    <div class="carrousel">
                      <VueSlickCarousel v-bind="settings1" id="carousel1">
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                          <div class="content">
                              <img :src="femme" alt="" srcset="">
                          </div>
                      </VueSlickCarousel>
                    </div>
                    <div class="infos">
                        <div class="name">Maryjane a henning</div>
                        <div class="job">holistic weellness coach</div>
                        <div class="skills mt-20">
                            <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span>licensed mariage and family therapist</span></div>
                            <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span>licensed alcohol drug courselor</span></div>
                            <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span>access bars&rArr; practitioner</span></div>
                            <div class="skill"><div class="icon"><i class="feather icon-check"></i></div> <span>accredited, certified advanced EFT practitioner</span></div>
                        </div>
                        <div class="reviews mt-20">
                            <div class="icons">
                                <star-rating 
                                    :increment="0.25"
                                    :max-rating="5"
                                    :rating="4"
                                    inactive-color="#000"
                                    active-color="#FF6900"
                                    :star-size="20"
                                ></star-rating>(verified reviews)
                            </div>
                            <div class="location"><i class="feather icon-map-pin"></i> Oakalnd, CA</div>
                        </div>
                        <div class="passion mt-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo cupiditate repellat fugit delectus adipisci eaque maiores iure doloribus. Architecto recusandae cum, magnam reiciendis adipisci natus vel voluptate veritatis? Assumenda, repudiandae.</div>
                    </div>
                    <div class="reviews-carousel mt-20">
                        <div class="box-header">
                            <div class="text">what people love about this practitioner</div>
                            <div class="see-all">see all reviews</div>
                        </div>
                        <VueSlickCarousel v-bind="settings2" id="carousel2">
                            <div class="box">
                                <div class="titre">
                                    <div class="name">Lynne B .</div>
                                    <div class="date">feb 13, 2023 .</div>
                                    <div class="rating-box">
                                        <star-rating 
                                            :increment="0.25"
                                            :max-rating="5"
                                            :rating="5"
                                            inactive-color="#000"
                                            active-color="#FF6900"
                                            :star-size="20"
                                        ></star-rating>
                                    </div>
                                </div>
                                <div class="t-box">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, molestiae doloribus voluptatum ea consequuntur ducimus sint consequatur dolores quibusdam doloremque vero debitis possimus, nihil deleniti placeat ratione cupiditate saepe optio?
                                </div>
                            </div>
                            <div class="box">
                                <div class="titre">
                                    <div class="name">Lynne B .</div>
                                    <div class="date">feb 13, 2023 .</div>
                                    <div class="rating-box">
                                        <star-rating 
                                            :increment="0.25"
                                            :max-rating="5"
                                            :rating="5"
                                            inactive-color="#000"
                                            active-color="#FF6900"
                                            :star-size="20"
                                        ></star-rating>
                                    </div>
                                </div>
                                <div class="t-box">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, molestiae doloribus voluptatum ea consequuntur ducimus sint consequatur dolores quibusdam doloremque vero debitis possimus, nihil deleniti placeat ratione cupiditate saepe optio?
                                </div>
                            </div>
                            <div class="box">
                                <div class="titre">
                                    <div class="name">Lynne B .</div>
                                    <div class="date">feb 13, 2023 .</div>
                                    <div class="rating-box">
                                        <star-rating 
                                            :increment="0.25"
                                            :max-rating="5"
                                            :rating="5"
                                            inactive-color="#000"
                                            active-color="#FF6900"
                                            :star-size="20"
                                        ></star-rating>
                                    </div>
                                </div>
                                <div class="t-box">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, molestiae doloribus voluptatum ea consequuntur ducimus sint consequatur dolores quibusdam doloremque vero debitis possimus, nihil deleniti placeat ratione cupiditate saepe optio?
                                </div>
                            </div>
                        </VueSlickCarousel>
                    </div>

                    <div class="divider-line"></div>

                    <div class="box-services mt-20">
                        <div class="titre">Services</div>
                        <div class="content">
                            <div class="image"></div>
                            <div class="text-box">
                                <div class="name">life coaching for empowerment</div>
                                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda temporibus sint culpa consequuntur doloremque nihil perferendis, eveniet repellat ipsa itaque doloribus velit delectus expedita aliquid quidem officia praesentium, nostrum quis!</div>
                                <div class="footer">
                                    <div class="price">$111 - $150</div>
                                    <button class="btn btn-secondary">Book appointment</button>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div class="image"></div>
                            <div class="text-box">
                                <div class="name">life coaching for empowerment</div>
                                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda temporibus sint culpa consequuntur doloremque nihil perferendis, eveniet repellat ipsa itaque doloribus velit delectus expedita aliquid quidem officia praesentium, nostrum quis!</div>
                                <div class="footer">
                                    <div class="price">$111 - $150</div>
                                    <button class="btn btn-secondary">Book appointment</button>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div class="image"></div>
                            <div class="text-box">
                                <div class="name">life coaching for empowerment</div>
                                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda temporibus sint culpa consequuntur doloremque nihil perferendis, eveniet repellat ipsa itaque doloribus velit delectus expedita aliquid quidem officia praesentium, nostrum quis!</div>
                                <div class="footer">
                                    <div class="price">$111 - $150</div>
                                    <button class="btn btn-secondary">Book appointment</button>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div class="image"></div>
                            <div class="text-box">
                                <div class="name">life coaching for empowerment</div>
                                <div class="desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda temporibus sint culpa consequuntur doloremque nihil perferendis, eveniet repellat ipsa itaque doloribus velit delectus expedita aliquid quidem officia praesentium, nostrum quis!</div>
                                <div class="footer">
                                    <div class="price">$111 - $150</div>
                                    <button class="btn btn-secondary">Book appointment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="droite">
                    <div class="description">
                      <div class="titre">Service Description</div>
                      <div class="divider"></div>
                      <div class="d-box">
                        <div class="short-text">Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
                        <div class="button"><button type="submit" class="btn btn-secondary" @click="openSelectTimeModal()">Continue Booking</button></div>
                      </div>
                    </div>
                    <div class="contact mt-20">
                        <button type="submit" class="btn btn-primary" @click="openSignInModal()">Message practitioner</button>
                    </div>
                </div>
              </div>
          </div>
      </section>


  
      <SignInModal @signup="openSignUpModal"></SignInModal>
      <SignUpModal @signin="openSignInModal"></SignUpModal>
      <SelectTimeModal @continue="openCheckoutModal"></SelectTimeModal>
      <SuccessModal></SuccessModal>
      <CheckoutModal @success="openSuccessModal"></CheckoutModal>
      <Footer :isConnected="isConnected"></Footer>
    </div>
  </template>
  
  <script>
    import femme from '@/assets/img/healing/profil-femme.png'
    import homme from '@/assets/img/healing/profil-homme.png'
    import hero from '@/assets/img/healing/hero.png'
    import Navbar from '@/components/commons/frontend/header/nav'
    import Footer from '@/components/commons/frontend/footer/footer'
    import config from '@/services/config'
    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    import StarRating from 'vue-star-rating'
    import SignInModal from '../modals/signin'
    import SignUpModal from '../modals/signup'
    import SelectTimeModal from '../modals/select-time'
    import CheckoutModal from '../modals/checkout'
    import SuccessModal from '../modals/success'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
          selectedText: '',
          femme, homme, hero,
          settings1: {
            "dots": false,
            "edgeFriction": 0.35,
            "infinite": true,
            "speed": 500,
            "slidesToShow": 1,
            "slidesToScroll": 1
          },
          settings2: {
            "dots": false,
            "edgeFriction": 0.35,
            "infinite": true,
            "speed": 500,
            "slidesToShow": 1,
            "slidesToScroll": 1
          },
      }),
  
      components: {
          Navbar, Footer, VueSlickCarousel, StarRating, SignInModal, SignUpModal, SelectTimeModal, CheckoutModal, SuccessModal
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

        openSelectTimeModal () {
            setTimeout(() => {
                $('#selectTimeModal').modal('show')
            }, 150)
        },

        openCheckoutModal () {
            setTimeout(() => {
                $('#checkoutModal').modal('show')
            }, 150)
        },

        openSuccessModal () {
            setTimeout(() => {
                $('#successModal').modal('show')
            }, 150)
        },

        openSignInModal () {
            setTimeout(() => {
                $('#signInModal').modal('show')
            }, 150)
        },

        openSignUpModal () {
            setTimeout(() => {
                $('#signUpModal').modal('show')
            }, 150)
        },
      },
  }
  </script>
  