<template lang="html">
  <section class="welcome-page">
      <div class="profile-top" :style="`background-image:url(${background})`">
          <div class="overlay"></div>
          <div class="profile-top-container">
              <div class="profile-photo"><img :src="logo" /></div>
          </div>
      </div>
      <div class="content">
          <div class="head mt-40">
              <div class="message-big">Forgot password</div>
          </div>

          <form class="_form signup-form mt-20">
              <div class="form-group">
                  <input type="text" name="email" placeholder="Email address" class="form-control">
              </div>
              <div class="button mt-20 pointer">
                  <div class="text">Sign In</div>
                  <div class="icon"><i class="feather icon-log-in"></i></div>
              </div>
          </form>

          <div class="link">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
      </div>
  </section>
</template>

<script>
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'

export default {
    name: 'ForgotPassword',

    data: () => ({
        logo, background
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

            const response = await this.$api.post('/login', this.ghost)
                .catch(error => {
                    console.log('error => ', error)
                    this.$swal.error(this.$translate.text(error.response.data))
                })

            if (response) {
                console.log(response)
                this.$swal.success(this.$translate.text('Please check your email box.'))
            }

            this.isLoading = false
        },
    }
}
</script>
