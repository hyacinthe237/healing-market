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
                            v-model="ghost.social_link" 
                            placeholder="Your social link" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            name="password1" 
                            v-model="ghost.password1" 
                            placeholder="Fill your password" 
                            class="form-control"
                            v-validate="'required'"
                        >
                    </div>
                    <div class="form-group">
                        <input 
                            type="password" 
                            name="password2" 
                            v-model="ghost.password2" 
                            placeholder="Confirm your password" 
                            class="form-control"
                            v-validate="'required|confirmed:password'"
                        >
                    </div>
                    <button type="submit" class="btn btn-primary btn-block" @click="signup()">Apply Now</button>
                </form>
            </div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
        <successModal></successModal>
    </section>
  </template>
  
  <script>
    import config from '@/services/config'
    import logo from '@/assets/img/healing/logo.svg'
    import hero from '@/assets/img/healing/hero.png'
    import successModal from './modals/success'
  
  export default {
      name: 'PractitionerDetails',
  
      data: () => ({
        logo, hero,
        ghost: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            social_link: '',
            password1: '',
            password2: '',
            is_client: false,
            is_therapist: true
        }
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

      mounted () {
        this.resetGhost()
      },
  
      methods: {
          resetGhost () {
              this.ghost = { 
                first_name: '', 
                last_name: '', 
                email: '', 
                phone: '', 
                social_link: '', 
                password1: '',  
                password2: '',
                is_client: false,
                is_therapist: true 
            }
          },

          async signup () {
            this.isLoading = true

            const response = await this.$api.post('rest-auth/registration/', this.ghost)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error(this.$translate.text('Signup error'), this.$translate.text(error.response.data.error))
                })


            if (response) {
                let data = response.data
                this.isLoading = false
                setTimeout(() => {
                    $('#successModal').modal('show')
                    window.eventBus.$emit('user-key', data.key)
                }, 150)

            }
        },
      },
  }
  </script>
  