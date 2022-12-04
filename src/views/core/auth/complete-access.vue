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
              <div class="message-big">Complete your <span class="bold">NOGADA 360</span> access</div>
              <!-- <div class="message-small mt-10">Welcome to <span class="bold">NOGADA 360</span></div> -->
          </div>

          <form class="_form signup-form mt-20" @submit.prevent>
              <div class="form-group">
                  <input type="text" name="username" v-model="ghost.username" placeholder="Username" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="text" name="email" v-model="ghost.email" placeholder="Email" class="form-control">
              </div>
              <div class="form-group mt-20">
                  <input type="password" name="password" v-model="ghost.password" placeholder="********" class="form-control">
              </div>
              <div class="button mt-20 mb-20 pointer" @click="save()">
                  <div class="text">Save</div>
                  <div class="icon"><i class="feather icon-save"></i></div>
              </div>
          </form>
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  </section>
</template>

<script>
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'

export default {
    name: 'CompleteAccess',

    data: () => ({
        ghost: {
            username: '',
            email: '',
            password: ''
        },
        logo, background
    }),

    mounted () {
        this.resetGhost()
    },

    methods: {
        resetGhost () {
            this.ghost = { username: '', email: '', password: '' }
        },

        /**
         * User signs in
         * @return {void}
         */
        async save () {
            if (this.ghost.username == '' || this.ghost.email == '' || this.ghost.password == '') {
                this.$swal.error('Validation warning', 'Username, Email & Password inputs are mandatory')
            } else {
                this.isLoading = true

                const response = await this.$api.post('/user-api/employee-profile-complete', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Sorry', this.$translate.text(error.response.data.message))
                    })
                
                
                if (response) {
                    let data = response.data
                    localStorage.removeItem('member')
                    this.n('signin')
                    console.log(data)
                    this.$swal.success('Confirmation', 'You are complete your access successfuly!')
                }
            }
            
        },
    }
}
</script>
