<template lang="html">
    <div class="services">
      <Navbar  v-show="!isLoading"></Navbar>
  
      <section class="header" :style="`background-image:url(${hero})`" v-show="!isLoading">
          <div class="container">
              <div class="box">
                  <h3>{{ offer_title }}</h3>
              </div>
          </div>
      </section>

      <section class="details" v-show="!isLoading">
          <div class="container">
              <div class="details-box">
                <div class="gauche mr-5">
                    <div class="carrousel">
                      <VueSlickCarousel v-bind="settings1" id="carousel1">
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                          <div class="content">
                            <div class="image" :style="`background-image:url(${femme})`">
                                <div class="overlay"></div>
                            </div>
                          </div>
                      </VueSlickCarousel>
                    </div>
                    <div class="infos">
                        <div class="name">{{ name }}</div>
                        <div class="job">{{ label }}</div>
                        <div class="skills mt-20">
                            <div class="skill" v-for="(tag, index) in tags" :key="index++">
                                <div class="icon"><i class="feather icon-check"></i></div>
                                <span class="nowrap">{{ tag }}</span>
                            </div>
                        </div>
                        <div class="reviews mt-20">
                            <div class="icons nowrap">
                                <star-rating 
                                    :increment="0.25"
                                    :max-rating="5"
                                    :rating="rating"
                                    inactive-color="#000"
                                    active-color="#FF6900"
                                    :star-size="20"
                                    @rating-selected="setRating"
                                ></star-rating>(verified reviews)
                            </div>
                            <div class="location nowrap"><i class="feather icon-map-pin"></i> {{ address }}</div>
                        </div>
                        <div class="passion mt-20">{{ litle_therapist_description }}</div>
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
                        <div class="titre">Other services</div>
                        <div 
                            class="content"
                            v-for="o in offers"
                            :key="o.id"
                        >
                            <div class="image"></div>
                            <div class="text-box">
                                <div class="name">{{ o.title }}</div>
                                <div class="desc">
                                    <span v-show="!moreOtherService">{{ truncateString(o.description, 200) }}</span>
                                    <span v-show="moreOtherService">{{ o.description }}</span>
                                    <span class="pointer primary bold" @click="moreOtherService = !moreOtherService"> 
                                        {{ moreOtherService ? 'Read less' : 'Read more' }}</span>
                                </div>
                                <div class="footer">
                                    <div class="price">${{ o.price }}</div>
                                    <button class="btn btn-secondary" @click="selectedBook(offer)">Book appointment</button>
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
                        <div class="short-text">
                            <span v-show="!moreOfferDescription">{{ litle_offer_description }}</span>
                            <span v-show="moreOfferDescription">{{ offer_description }}</span>
                            <span class="pointer primary bold" @click="toggleOfferDescription">  {{ more_text_offer }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="contact mt-20">
                        <button type="submit" class="btn btn-secondary mr-3 nowrap" @click="booknow()">
                            <i class="feather icon-bookmark mr-1"></i> Continue booking</button>
                        <button type="submit" class="btn btn-primary nowrap" @click="openchat()">
                            <i class="feather icon-message-square mr-1"></i> Chat</button>
                    </div>
                </div>
              </div>
          </div>
      </section>

      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>


  
      <SignInModal @signup="openSignUpModal" @signin="openSelectTimeModal"></SignInModal>
      <SignUpModal @signup="openSelectTimeModal"></SignUpModal>
      <SelectTimeModal 
        @continue="openCheckoutModal"
        :offer="offer"
        :therapist="therapist"
        :clientId="clientId"
        :therapistId="therapistId"
      ></SelectTimeModal>
      <SuccessModal 
        @open="opendash"
        :practitionerName="name"
        :clientName="clientName"
      ></SuccessModal>
      <CheckoutModal 
        @success="openSuccessModal"
        :payload="payload"
        :offer="offerSelected"
        :therapist="therapistSelected"
        :stripe="stripe"
      ></CheckoutModal>
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
    import Swal from 'sweetalert2'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
          selectedText: '',
          therapistId: 1,
          therapist: {},
          therapistSelected: {},
          payload: {},
          offer: {},
          stripe: {},
          offerSelected: {},
          client: {},
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
          moreTherapistDescription: false,
          moreOfferDescription: false,
          moreOtherService: false,
      }),
  
      components: {
          Navbar, Footer, VueSlickCarousel, StarRating, SignInModal, SignUpModal, SelectTimeModal, CheckoutModal, SuccessModal
      },
  
      computed: {
          user () {
              return JSON.parse(localStorage.getItem(config.get('user')))
          },

          clientId () {
              return this.isConnected ? this.user.id : 1
          },
  
          isConnected () {
              return !_.isEmpty(this.user)
          },

            more_text_offer () {
                return this.moreOfferDescription ? 'Read less' : 'Read more'
            },

            name () {
                return this.therapist.first_name + ' ' + this.therapist.last_name || '...'
            },

            clientName () {
                return this.isConnected ? this.user.email : ''
            },

            clientEmail () {
                return this.isConnected ? this.user.email : ''
            },

            therapistEmail () {
                return this.therapist.email
            },

            address () {
                return this.therapist.address || ''
            },

            rating () {
                return this.therapist.rating
            },

            tags () {
                return this.therapist.tags || []
            },

            availibilities () {
                return this.therapist.availibilities || []
            },

            therapist_description () {
                return this.therapist.description || ''
            },

            litle_therapist_description () {
                return this.truncateString(this.therapist_description, 100)
            },

            offer_description () {
                return this.offer.description || ''
            },

            litle_offer_description () {
                return this.truncateString(this.offer_description, 100)
            },

            offer_title () {
                return this.offer.title || ''
            },

            label () {
                return this.therapist.label || ''
            },

            offers () {
                return this.$store.state.offers
            },
      },

      mounted () {
        this.getTherapist()
        this.getOffers()
        this.getOffer()
      },
  
      methods: {
        toggleTherapistDescription () {
            this.moreTherapistDescription = !this.moreTherapistDescription
        },

        toggleOfferDescription () {
            this.moreOfferDescription = !this.moreOfferDescription
        },

        booknow () {
            if (this.isConnected) {
                this.openSelectTimeModal()
            }

            if (!this.isConnected) {
                this.openSignInModal()
            }
        },

        openchat () {
            if (this.isConnected) {
                this.createChat()
            }

            if (!this.isConnected) {
                this.openSignInModal()
            }
        },

        selectedBook (offer) {
            this.offer = offer
            this.booknow()
        },

        setRating (rating) {
            if (this.isConnected) {
                this.saveRating(rating)                
            }

            if (!this.isConnected) {
                this.$swal.error('Sorry', 'You need to sign in to your account first')
            }
        },

        async getBookingClientKey (data) {
            this.startLoading()
            let booking = JSON.parse(localStorage.getItem('booking'))
            const res = await this.$api.post(`/booking-api/bookings/${booking.id}/pay`, data)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.detail)
            })
    
            if (res) {
              this.stopLoading()
              this.stripe = res.data
              this.openCheckoutModal(booking)
            }
        },

        openSignSuccess () {
            this.$swal.success('Hi', 'Welcome back in to our platform, continue your booking')
            setTimeout(() => {
                this.getTherapist()
                this.getOffers()
                this.getOffer()
                this.getUser()
            }, 5000)
            
        },

        confirmLogOut () {
            Swal.fire({
                text: this.$translate.text("After success signup, please sign in to our platform and continue your booking"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: this.$translate.text('Not now !'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.$translate.text('Yes, i continue my booking')
            }).then((result) => {
                if (result.value) {
                    this.booknow()
                }
            })
        },

        async createBooking (data) {
            this.startLoading()
    
            const res = await this.$api.post(`/booking-api/bookings/`, data)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.detail)
            })
    
            if (res) {
              this.stopLoading()
              localStorage.setItem('booking', JSON.stringify(res.data))
              this.getBookingClientKey({payment_method: 'stripe'})
            }
        },

        async createChat () {
            this.startLoading()

            let data = {
                name: `Chat ${this.clientEmail} for ${this.offer_title}`,
                participants: new Array(this.clientEmail, this.therapistEmail)
            }
    
            const res = await this.$api.post(`/chat-api/create-chat/`, data)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.detail)
            })
    
            if (res) {
              this.stopLoading()
              this.n('client-messages')
            }
        },

        async saveRating (rating) {
            this.startLoading()

            let data = {
                therapist: this.$router.history.current.params.id,
                client: this.user.id,
                value: rating
            }
    
            const res = await this.$api.post(`/market-api/ratings/`, data)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.getTherapist()
              this.$swal.success('Success', 'Your rating review are saved')
            }
        },

        async getUser () {
            this.startLoading()

            let id = this.user.client_id
    
            const res = await this.$api.get(`/user-api/clients/${id}/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.client = res.data.properties
            }
        },

        async getTherapist () {
            this.startLoading()

            let id = this.$router.history.current.params.id
    
            const res = await this.$api.get(`user-api/therapists/${id}/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.therapist = res.data.properties
              this.therapistId = res.data.id
            }
        },

        async getOffers () {
            this.startLoading()
            let id = this.$router.history.current.params.id
            let offerId = this.$router.history.current.params.offer
    
            const res = await this.$api.get(`/market-api/offers/all-no-token`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              let data = res.data.filter(o => o.therapist.id == id && o.id != offerId)
              this.$store.commit('SET_OFFERS', data)
            }
        },

        async getOffer () {
            this.startLoading()
            let offerId = this.$router.history.current.params.offer
    
            const res = await this.$api.get(`market-api/offers/${offerId}/detail`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.offer = res.data
            }
        },

        openPreviewModal (text) {
            this.selectedText = text
            this.showBtn = false
            this.openModal({ id: 'previewModal' })
        },

        openSelectTimeModal () {
            window.eventBus.$emit('therapist', this.therapist)
            setTimeout(() => {
                $('#selectTimeModal').modal('show')
            }, 150)
        },

        openCheckoutModal (data) {
            console.log(data)
            this.payload = data
            this.therapistSelected = this.therapist
            this.offerSelected = this.offer
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

        opendash () {
            this.n('client-dashboard')
        }
      },
  }
  </script>
  