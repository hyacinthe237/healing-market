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
                  <input type="email" name="email" v-model="ghost.email" placeholder="Email" class="form-control" v-validate="'required'">
                  <v-error :name="'email'" :err="errors" :show="showErrors"></v-error>
              </div>
              <div class="form-group row-pass">
                <input 
                    v-if="showPassword"
                    type="text" 
                    name="password" 
                    v-model="ghost.password" 
                    placeholder="Password" 
                    class="form-control"
                    v-validate="'required'"
                    :data-vv-as="t('password')"
                >
                <input 
                    v-else
                    type="password" 
                    name="password" 
                    v-model="ghost.password" 
                    placeholder="Password" 
                    class="form-control"
                    v-validate="'required'"
                    :data-vv-as="t('password')"
                >
                <div class="input-group-append" @click="togglePassword()">
                    <span class="input-group-text" v-if="showPassword">
                      <i class="feather icon-eye-off"></i>
                    </span>
                    <span class="input-group-text pointer" v-else>
                      <i class="feather icon-eye"></i>
                    </span>
                </div>
                <v-error :name="'password'" :err="errors" :show="showErrors"></v-error>
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
// import config from '../../../services/config'
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
        logo, background,
        showPassword: false,
    }),

    components: { pendingModal },

    computed: {},

    methods: {
        togglePassword () {
            this.showPassword = !this.showPassword
          },
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.isLoading = true

            const response = await this.$api.post('/user-api/custom/login', this.ghost)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.message))
                })
            
            
            if (response) {
                this.isLoading = false
                let data = response.data                
                AuthService.setUser(data)
                AuthService.setToken(data.key)
                ApiService.setToken(data.key)
                
                if (data.is_client) {
                    this.n('client-dashboard')
                }

                if (data.is_therapist) {
                    this.n('practitioner-dashboard')
                }
            }
            
        },
    }
}
</script>
