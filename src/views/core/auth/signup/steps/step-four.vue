<template lang="html">
  <section class="full-page" :style="`background-image:url(${background})`">
    <div class="overlay">
       <form class="full-form" @submit.prevent v-show="!isLoading">
            <div class="top">
                <div class="step-title">step 4 of 4</div>
                <div class="progress"><div class="step-4"></div></div>
                <div class="message-big">Finish signing up</div>
            </div>

            <input type="text" name="email" v-model="ghost.email" placeholder="Email address" class="form-control">
            <input type="password" name="password" v-model="ghost.password" placeholder="Password" class="password form-control">
            <input type="text" name="phone" v-model="ghost.phone" placeholder="Phone number" class="form-control">
            <div class="txt">By clicking continue you agree to our Terms of Service, Privacy Policy and User Agreement.</div>
            <div class="bttn pointer" @click="save()">
                <div class="text">Continue to Nogada 360</div>
                <div class="icon"><i class="feather icon-chevron-right"></i></div>
            </div>
       </form>
       <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
    </div>
  </section>
</template>

<script>
import background from '@/assets/img/background.png'
import ApiService from '@/services/api'
import AuthService from '@/services/auth'

export default {
    name: 'Step4',

    data: () => ({
        ghost: {
          username: '',
          email: '',
          password: '',
          phone: ''
        },
        showList: false,
        showForm: false,
        selected: [],
        items: [],
        background,
        people: ''
    }),

    mounted () {
      this.resetGhost()
    },

    computed: {
      business () { return JSON.parse(localStorage.getItem('business')) },
      manager () { return this.business.message.manager },
      username () { return this.manager.username },
    },

    methods: {
        resetGhost () {
            this.ghost = { username: this.username, email: '', password: '', phone: '' }
        },
        async save () {
            if (this.ghost.email == '' || this.ghost.password == '' || this.ghost.phone == '') {
                this.$swal.error('Validation error', 'You can not submit the empty form or empty input.')
            }

            if (this.ghost.email !== '' && this.ghost.password !== '' && this.ghost.phone !== '') {
                this.ghost.username = this.username
                this.startLoading()
                const response = await this.$api.post('user-api/step-4/manager', this.ghost)
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Step 4 Error', error.response.data.message)
                })
            
                this.stopLoading()
                if(response) {
                    let data = response.data
                    AuthService.setUser(data)
                    AuthService.setToken(data.token)
                    ApiService.setToken(data.token)
                    localStorage.removeItem('business')
                    this.n('dashoard')
                }
            }
        }
    }
}
</script>
