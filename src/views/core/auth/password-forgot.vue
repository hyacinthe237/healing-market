<template lang="html">
  <section class="welcome-page">
      <div class="profile-top pointer" v-show="!isLoading" :style="`background-image:url(${hero})`" @click="n('landing')">
          <div class="overlay"></div>
          <div class="profile-top-container">
              <div class="profile-photo"><img :src="logo" /></div>
          </div>
      </div>
      <div class="content" v-show="!isLoading">
          <div class="mt-40 head">
              <div class="message-big">Forgot password</div>
          </div>

          <form class="mt-20 _form signup-form" @submit.prevent="send()">
              <div class="form-group">
                  <input 
                    type="text" name="email" placeholder="Email address" class="form-control" 
                    v-model="ghost.email"
                    v-validate="'required'"
                  >
                  <v-error :name="'email'" :err="errors" :show="showErrors"></v-error>
              </div>
              <div class="bouton">
                <button type="submit" class="btn btn-primary mt-20 pointer">Send</button>
              </div>
          </form>

          <div class="link mt-20">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  </section>
</template>

<script>
import logo from '@/assets/img/healing/logo.svg'
import hero from '@/assets/img/healing/hero.png'

export default {
    name: 'ForgotPassword',

    data: () => ({
        logo,hero
    }),

    methods: {
        /**
         * User forgot password
         * @return {void}
         */
        async send () {
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.isLoading = true

            const response = await this.$api.post('/rest-auth/password/reset/', this.ghost)
                .catch(error => {
                    console.log('error => ', error)
                    this.$swal.error(this.$translate.text(error.response.data))
                })

            if (response) {
                this.$swal.success(this.$translate.text('Please check your email box.'))
                this.ghost.email = ''
            }

            this.isLoading = false
        },
    }
}
</script>
