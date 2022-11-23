<template lang="html">
    <section class="signup-page">
        <div class="g-page" :style="`background-image:url(${background})`">
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
        <div class="d-page">
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
                <div class="message-big">Welcome Yacuintha!</div>
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
    </section>
</template>

<script>
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'
import logoUsers from '@/assets/img/users.png'
import logoApple from '@/assets/img/landing/apple.png'
import logoGoogle from '@/assets/img/landing/google-playstore.png'

export default {
    name: 'Welcome',

    data: () => ({
        ghost: { username: '', app_modules: [] },
        logo,
        showList: false,
        showForm: false,
        selected: [],
        items: [],
        background, logoUsers,logoApple,logoGoogle,
        need: ''
    }),

    mounted () {
      //this.initItems()
      this.getAppModules()
    },

    computed: {
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
        },

        initItems () {
            this.items = [
              { 'id': 1, 'name': 'Guard scheduling' },
              { 'id': 2, 'name': 'VMS visitor management system' },
              { 'id': 3, 'name': 'Guard tracking' },
            ]
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
                console.log('app modules', response.data)
                this.items = response.data.results
            }
        },

        async save () {
            if (this.ghost.username == '') {
                this.$swal.error('Validation error', 'Please, fill the username.')
            }

            if (this.ghost.username !== '') {
                this.startLoading()
                const response = await this.$api.post('user-api/step-1/manager', this.ghost)
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Error', error.response.data)
                })
            
                this.stopLoading()
                if(response) {
                    localStorage.setItem('manager', JSON.stringify(response.data))
                    // this.$swal.success('Confirmation', 'Projet ajouté')
                    this.n('signup-step-two')
                }
            }
        }
    }
}
</script>
