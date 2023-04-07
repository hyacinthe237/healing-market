<template lang="html">
    <section class="list-practice">
        <div class="g-page" v-show="!isLoading">
            <div class="overlay">
                <div class="link">Apply to feature your<br>practice on the #1 plateform<br>for
                     <span>holistic practitioners</span></div>
                <div class="b-text mt-40">
                    <div class="tle">two steps to apply:</div>
                    <div class="stp1">1) Fill Out Our Application Form</div>
                    <div class="stp2 mt-10">2) Select A Time For An Onboarding<br>Interview With A Member Of Our Team</div>
                </div>
            </div>
            <div class="profile-top-container pointer" @click="n('landing')">
                <div
                    class="profile-photo"
                >
                <img :src="logo" alt="" />                  
                </div>
            </div>
        </div>
        <div class="d-page" v-show="!isLoading">
            <div class="profile-top"  :style="`background-image:url(${hero})`" @click="n('landing')">
                <div class="overlay"></div>
                <div class="profile-top-container">
                    <div
                        class="profile-photo"
                    >
                    <img :src="logo" alt="" />
                    </div>
                </div>
            </div>

            <div class="form">
                <h4>Apply to feature your practice on<br>Healing Marketplace</h4>

                <form class="_form mt-20" @submit.prevent>
                    <div class="form-group">
                        <input 
                            type="text" 
                            name="first_name" 
                            v-model="ghost.first_name" 
                            placeholder="First name" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="text" 
                            name="last_name" 
                            v-model="ghost.last_name" 
                            placeholder="Last name" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="text" 
                            name="email" 
                            v-model="ghost.email" 
                            placeholder="Email" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="number" 
                            name="phone" 
                            v-model="ghost.phone" 
                            placeholder="Phone" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="text" 
                            name="website" 
                            v-model="ghost.website" 
                            placeholder="Website URL/Facebook or Instagram" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" @click="signup()">Apply Now</button>
                </form>
            </div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
        <successModal @good="gotoDashboard"></successModal>
    </section>
  </template>
  
  <script>
    import ApiService from '@/services/api'
    import AuthService from '@/services/auth'
    import config from '@/services/config'
    import logo from '@/assets/img/healing/logo.svg'
    import hero from '@/assets/img/healing/hero.png'
    import successModal from './modals/success'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
        logo, hero
      }),
  
      components: { successModal },
  
      computed: {
          user () {
              return JSON.parse(localStorage.getItem(config.get('user')))
          },
  
          isConnected () {
              return !_.isEmpty(this.user)
          }
      },
  
      methods: {
          gotoDashboard () {
              this.n('practitioner-dashboard')
          },

          async signup () {
            this.isLoading = true

            const response = await this.$api.post('user-api/therapists/', this.ghost)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error(this.$translate.text('Signup error'), this.$translate.text(error.response.data.error))
                })


            if (response) {
                let data = response.data
                console.log("sign up data", response.data)
                this.$swal.success('SignUp Success', 
                "Thanks for signing up with us. An email has been sent to you please check to complete your onboarding process."
                )
            }
        },

        async getNewAccessToken () {
            this.isLoading = false
            let payload = {
                'token': config.get('refresh_token'),
            }
            const response = await this.$api.refreshToken(payload)
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.error)
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    AuthService.setToken(data.refresh)
                    ApiService.setToken(data.refresh)
                    console.log('new access token', data)
                }
        },

        async getNewRefreshToken (token) {
            this.isLoading = false
            const response = await this.$api.refreshToken({ 'refresh': token})
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.error)
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log(data.token)
                }
        },

        async checkAccessToken (token) {
            this.isLoading = false
            let payload = { 'token': token }

            const response = await this.$api.verifyToken(payload)
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.detail)
                    if(error.response.data.code == 'token_not_valid') {
                        this.getNewAccessToken()
                    }
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log('check access token', data)
                }
        },

        async checkRefreshToken (payload, token) {
            this.isLoading = false
            const response = await this.$api.verifyToken({ 'token': token })
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.detail)
                    if(error.response.data.code == 'token_not_valid') {
                        this.getNewRefreshToken(payload)
                    }
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log('check refresh token', data)
                }
        },
      },
  }
  </script>
  