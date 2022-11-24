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
                <div class="step-title">step 3 of 4</div>
                <div class="progress"><div class="step-3"></div></div>
                <div class="message-big">{{ username }}, tel us about <br> your business</div>
            </div>

            <form class="_form s-form mt-10" @submit.prevent>
                <div class="form-group">
                    <label>What's your business called?</label>
                    <input type="text" name="name" v-model="ghost.name" placeholder="Business name" class="form-control">
                    <div class="litle-form" v-if="ghost.name!=''">
                        <div class="smaller">We use your business zip code to set your overtime and break policies - so you don't have to</div>
                        <input type="text" name="zip_code" v-model="ghost.zip_code" placeholder="Zip Code" style="max-height:35px;">
                    </div>
                </div>
                <div class="form-group">
                    <label>What kind of business is it?</label>
                    <select name="category_id" v-model="ghost.category_id" class="form-control">
                        <option value="">Select an option</option>
                        <option :value="s.id" :key="s.id" v-for="s in services">{{ s.name }}</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>How many people work there ?</label>
                    <div class="workers">
                        <div
                          v-for="(n, index) in employees"
                          :key="index+1"
                          :class="['worker', people==n ? 'selected' : '']"
                          @click="selectPeople(n)"
                        >
                          <span>{{ n }}</span>
                        </div>
                    </div>
                    <div class="check-form">
                        <div class="smaller">This business has many locations</div>
                        <input type="checkbox" name="more_locations" class="checkbox" checked>
                    </div>
                </div>
                <div class="bottom-form mt-20" @click="save()">
                    <div class="notyet"></div>
                    <div class="button pointer">
                        <div class="text">One last step</div>
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
    name: 'Step3',

    data: () => ({
        ghost: { business_id : '', name:'', category_id: '',  nb_employee: '', zip_code:'' },
        logo,
        showList: false,
        showForm: false,
        selected: [],
        services: [],
        background, logoUsers,logoApple,logoGoogle,
        people: '',
        employees: ['0 - 5', '5 - 10', '10 -100', '100 - 1000', '1000 - more'],
    }),

    mounted () {
      this.resetGhost()
      this.getServiceTypes()
    },

    computed: {
      business () { return JSON.parse(localStorage.getItem('business')) },
      manager () { return this.business.message.manager },
      username () { return this.manager.username },
    },

    methods: {
        displayList () { this.showList = !this.showList },

        displayForm () { this.showForm = !this.showForm },

        selectPeople (value) { 
          this.people = value 
          this.ghost.nb_employee = value
        },

        resetGhost () {
            this.ghost = { business_id : this.business.id, name:'', category_id: '',  nb_employee: '', zip_code:'' }
        },

        async getServiceTypes () {
            this.startLoading()
                const response = await this.$api.get('user-api/service-types/')
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Get Service Types Error', error.response.data)
                })
            
            this.stopLoading()
            if(response) {
                this.services = response.data.results
            }
        },

        async save () {
            if (this.ghost.name == '' || this.ghost.category_id == '' || this.ghost.nb_employee == '' || this.ghost.zip_code == '') {
                this.$swal.error('Validation error', 'You can not submit the empty form or empty input.')
            }

            if (this.ghost.name !== '' && this.ghost.category_id !== '' && this.ghost.nb_employee !== '' && this.ghost.zip_code !== '') {
                this.ghost.business_id = this.business.message.id
                this.startLoading()
                const response = await this.$api.post('user-api/step-3/manager', this.ghost)
                .catch(error => {
                    console.log('Error ==> ', error.response.data)
                    this.stopLoading()
                    this.$swal.error('Step 3 Error', error.response.data.message)
                })
            
                this.stopLoading()
                if(response) {
                    localStorage.setItem('business', JSON.stringify(response.data))
                    // this.$swal.success('Confirmation', 'Projet ajouté')
                    this.n('signup-step-four')
                }
            }
        }
    }
}
</script>
