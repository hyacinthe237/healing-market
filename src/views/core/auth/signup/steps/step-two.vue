<template lang="html">
    <section class="signup-page">
        <div class="g-page" :style="`background-image:url(${background})`" v-show="!isLoading">
            <div class="overlay">

                <div class="link">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
            </div>
            <div class="profile-top-container">
                <div
                    class="profile-photo"
                >
                  <img :src="logo" />
                </div>
            </div>
        </div>
        <div class="d-page" v-show="!isLoading">
            <div class="profile-top" :style="`background-image:url(${background})`">
                <div class="overlay"></div>
                <div class="profile-top-container">
                    <div
                        class="profile-photo"
                    >
                      <img :src="logo" />
                    </div>
                </div>
            </div>
             <div class="dhead mt-20">
                <div class="step-title">step 2 of 4</div>
                <div class="progress"><div class="step-2"></div></div>
                <div class="message-big">Welcome {{ username }}!</div>
            </div>

            <form class="_form s-form mt-10" @submit.prevent>
                <div class="form-group">
                    <label>What brings you to NOGADA 360 ?</label>
                    <div class="small">Pick what you need now. You can also do more later.</div>
                    <div class="needs">
                        <div 
                            :class="['need pointer', need == m.name ? 'selected' : '']" 
                            @click="selectedNeed(m.name)"
                            v-for="m in items"
                            :key="m.id"
                            :title="m.description"
                        >
                          <i class="feather icon-plus"></i>
                          <span>{{ m.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="bottom-form pointer" @click="save()">
                    <div class="notyet">Not sure yet</div>
                    <div class="button mt-20 pointer">
                        <div class="text">Continue</div>
                        <div class="icon"><i class="feather icon-chevron-right"></i></div>
                    </div>
                </div>
            </form>

            <div class="link">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </section>
</template>

<script>
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'
import logoUsers from '@/assets/img/users.png'
import logoApple from '@/assets/img/landing/apple.png'
import logoGoogle from '@/assets/img/landing/google-playstore.png'

export default {
    name: 'Step2',

    data: () => ({
        ghost: { username: '', app_modules: '' },
        logo,
        showList: false,
        showForm: false,
        selected: [],
        items: [],
        background, logoUsers,logoApple,logoGoogle,
        need: ''
    }),

    mounted () {
      this.getAppModules()
    },

    computed: {
        business () {
            return JSON.parse(localStorage.getItem('business'))
        },

        username () { return this.business.message.username },
    },

    methods: {
        displayList () {
            this.showList = !this.showList
        },

        displayForm () {
            this.showForm = !this.showForm
        },

        selectedNeed (value) {
            this.need = value
            this.ghost.app_modules = this.items.filter(m => m.name == value)[0].id
        },

        async getAppModules () {
            this.startLoading()
                const response = await this.$api.get('user-api/app-modules/')
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Error', error.response.data)
                })
            
            this.stopLoading()
            if(response) {
                this.items = response.data.results
            }
        },

        async save () {
            if (this.ghost.app_modules == '') {
                this.$swal.error('Validation error', 'Please, select one module.')
            }

            if (this.ghost.app_modules !== '') {
                this.ghost.username = this.username
                this.startLoading()
                const response = await this.$api.post('user-api/step-2/manager', this.ghost)
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Step 2 Error', error.response.data.error_message)
                })
            
                this.stopLoading()
                if(response) {
                    localStorage.setItem('business', JSON.stringify(response.data))
                    // this.$swal.success('Confirmation', 'Projet ajouté')
                    this.n('signup-step-three')
                }
            }
        }
    }
}
</script>
