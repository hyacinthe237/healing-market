<template lang="html">
  <section class="welcome-page">
      <div class="profile-top pointer" :style="`background-image:url(${background})`" @click="n('landing')" v-show="!isLoading">
          <div class="overlay"></div>
          <div class="profile-top-container">
              <div class="profile-photo"><img :src="logo" /></div>
          </div>
      </div>
      <div class="content" v-show="!isLoading">
          <div class="head mt-40">
              <div class="message-big">Enter your log in details below</div>
          </div>

          <form class="_form signup-form mt-20" @submit.prevent>
              <div class="form-group">
                  <input type="text" name="username" v-model="ghost.username" placeholder="Username" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="password" name="password" v-model="ghost.password" placeholder="********" class="form-control">
              </div>
              <div class="forgot pointer" @click="n('password-forgot')">Password forgot ?</div>
              <div class="bouton">
                <button type="submit" class="btn btn-primary mt-20 pointer" @click="n('practitioner-dashboard')">Sign In</button>
              </div>
          </form>

          <div class="link mt-20">You don't have an account? <span @click="n('signup')" class="pointer">Sign Up</span></div>
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  </section>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '../../../services/config'
import logo from '@/assets/img/healing/logo.svg'
import background from '@/assets/img/healing/hero.png'

export default {
    name: 'Signin',

    data: () => ({
        ghost: {
            username: '',
            password: ''
        },
        logo, background
    }),

    computed: {},

    methods: {
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            if (this.ghost.username == '' || this.ghost.password == '') {
                this.$swal.error('Validation warning', 'Username & Password inputs are mandatory')
            }

            if (this.ghost.username !== '' && this.ghost.password !== '') {
                this.isLoading = true

                const response = await this.$api.post('user-api/login/', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.error))
                    })
                
                
                if (response) {
                    let data = response.data
                    AuthService.setUser(data.user)

                    const res = await this.$api.apiToken(this.ghost)
                    .catch(err => {
                        this.isLoading = false
                        console.log('token error', err.response.data)
                    })
                    if (res) {
                        this.isLoading = false
                        AuthService.setToken(res.data.access)
                        ApiService.setToken(res.data.access)

                        // Set Refresh token
                        AuthService.setRefreshToken(res.data.refresh)
                        this.n('dashboard')
                    }
                }
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
    }
}
</script>
