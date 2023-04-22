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
                  <input type="email" name="email" v-model="ghost.email" placeholder="Email" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="password" name="password" v-model="ghost.password" placeholder="********" class="form-control">
              </div>
              <div class="forgot pointer" @click="n('password-forgot')">Password forgot ?</div>
              <div class="bouton">
                <button type="submit" class="btn btn-primary mt-20 pointer" @click="signin()">Sign In</button>
              </div>
          </form>

          <div class="link mt-20">You don't have an account? <span @click="n('signup')" class="pointer">Sign Up</span></div>
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
      <pendingModal></pendingModal>
  </section>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '../../../services/config'
import logo from '@/assets/img/healing/logo.svg'
import background from '@/assets/img/healing/hero.png'
import pendingModal from './modals/pending'

export default {
    name: 'Signin',

    data: () => ({
        ghost: {
            email: '',
            password: ''
        },
        logo, background
    }),

    components: { pendingModal },

    computed: {},

    methods: {
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            if (this.ghost.email == '' || this.ghost.password == '') {
                this.$swal.error('Validation warning', 'Email and password inputs are mandatory')
            }

            if (this.ghost.email !== '' && this.ghost.password !== '') {
                this.isLoading = true

                const response = await this.$api.post('/login/', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.error))
                    })
                
                
                if (response) {
                    this.isLoading = false
                    let data = response.data
                    if (!data.is_active) {
                        setTimeout(() => {
                            $('#pendingModal').modal('show')
                        }, 150)
                    }

                    if (data.is_active) {
                        AuthService.setUser(data.user)

                        this.n('practitioner-dashboard')
                    }
                    
                }
            }
            
        },
    }
}
</script>
