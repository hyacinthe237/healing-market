<template lang="html">
  <section class="welcome-page">
      <div class="profile-top" :style="`background-image:url(${background})`" @click="n('home')" v-show="!isLoading">
          <div class="overlay"></div>
          <div class="profile-top-container">
              <div class="profile-photo"><img :src="logo" /></div>
          </div>
      </div>
      <div class="content" v-show="!isLoading">
          <div class="head mt-40">
              <div class="message-big">Sign In</div>
              <!-- <div class="message-small mt-10">Welcome to <span class="bold">NOGADA 360</span></div> -->
          </div>

          <form class="_form signup-form mt-20" @submit.prevent>
              <div class="form-group">
                  <input type="text" name="username" v-model="ghost.username" placeholder="Username" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="password" name="password" v-model="ghost.password" placeholder="********" class="form-control">
              </div>
              <div class="forgot pointer" @click="n('password-forgot')">Password forgot ?</div>
              <div class="button mt-20 pointer" @click="signin()">
                  <div class="text">Sign In</div>
                  <div class="icon"><i class="feather icon-log-in"></i></div>
              </div>
          </form>

          <div class="link mt-10">You don't have an account? <span @click="n('signup-step-one')" class="pointer">Sign Up</span></div>
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  </section>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'

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
                        this.isLoading = true
                        console.log('error => ', error.response.data.error)
                        this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.error))
                    })
                
                this.isLoading = false
                if (response) {
                    let data = response.data
                    AuthService.setUser(data)
                    AuthService.setToken(data.refresh_token)
                    ApiService.setToken(data.refresh_token)
                    this.n('dashboard')
                }
            }
            
        },
    }
}
</script>
