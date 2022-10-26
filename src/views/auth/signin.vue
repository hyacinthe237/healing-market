<template lang="html">
  <section class="signup-page">
      <div class="profile-top" :style="`background-image:url(${background})`">
          <div class="overlay"></div>
          <div class="profile-top-container">
              <div class="profile-photo"><img :src="logo" /></div>
          </div>
      </div>
      <div class="content">
          <div class="head mt-40">
              <div class="message-big">Sign in your account</div>
              <div class="message-small mt-10">Welcome to <span class="bold">NOGADA 360</span></div>
          </div>

          <form class="_form signup-form mt-20">
              <div class="form-group">
                  <input type="text" name="email" placeholder="Email address" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="passwword" name="password" placeholder="********" class="form-control">
              </div>
              <div class="forgot pointer" @click="n('password-forgot')">Password forgot ?</div>
              <div class="button mt-20 pointer">
                  <div class="text">Sign In</div>
                  <div class="icon"><i class="feather icon-log-in"></i></div>
              </div>
          </form>

          <div class="link">You don't have an account? <span>Sign Up</span></div>
      </div>
  </section>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import _ from 'lodash'
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

    computed: {
        last_action () {
            return localStorage.getItem('last_action')
        }
    },

    methods: {
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            const isValid = await this.$validator.validate()
            if (!isValid) return false
            this.isLoading = true

            let formData = new FormData()
            formData.append('username', this.ghost.username)
            formData.append('password', this.ghost.password)

            const response = await this.$api.post('/login', formData)
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.error)
                    this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.error))
                })

            if (response) {
                let data = response.data
                AuthService.setUser(data)
                AuthService.setToken(data.token)
                ApiService.setToken(data.token)
                this.$store.commit('SET_TOGGLE_ICON', true)
                localStorage.setItem(this.$config.get('token'), data.token)
                localStorage.setItem('roleId', data.account.role.id)
                localStorage.setItem('organisation', data.organisation.root_folder)

                if (!_.isEmpty(this.last_action)) {
                    window.open(this.last_action, '_self')
                } else {
                    this.n('home')
                    window.location.reload()
                }
            }

            this.isLoading = false
        },
    }
}
</script>
