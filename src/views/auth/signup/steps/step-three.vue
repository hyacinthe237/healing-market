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
                <div class="step-title">step 3 of 4</div>
                <div class="progress"><div class="step-3"></div></div>
                <div class="message-big">Yacuintha, tel us about <br> your business</div>
            </div>

            <form class="_form s-form mt-20">
                <div class="form-group">
                    <label>What's your business called?</label>
                    <input type="text" name="name" v-model="ghost.business_name" placeholder="Business name" class="form-control">
                    <div class="litle-form" v-if="ghost.business_name!=''">
                        <div class="smaller">We use your business zip code to set your overtime and break policies - so you don't have to</div>
                        <input type="text" name="zip_code" v-model="ghost.zip_code" placeholder="Zip Code" style="max-height:35px;">
                    </div>
                </div>
                <div class="form-group">
                    <label>What kind of business is it?</label>
                    <select name="business_type" v-model="ghost.business_type" class="form-control">
                        <option value="">Select an option</option>
                        <option value="coffee">Coffee</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>How many people work there ?</label>
                    <div class="workers">
                        <div
                          :class="['worker', people=='1-5' ? 'selected' : '']"
                          @click="selectPeople('1-5')"
                        >
                          <span>1-5</span>
                        </div>
                        <div
                          :class="['worker', people=='6-10' ? 'selected' : '']"
                          @click="selectPeople('6-10')"
                        >
                          <span>6-10</span>
                        </div>
                        <div
                          :class="['worker', people=='11-29' ? 'selected' : '']"
                          @click="selectPeople('11-29')"
                        >
                          <span>11-29</span>
                        </div>
                        <div
                          :class="['worker', people=='30-50' ? 'selected' : '']"
                          @click="selectPeople('30-50')"
                        >
                          <span>30-50</span>
                        </div>
                        <div
                          :class="['worker', people=='51+' ? 'selected' : '']"
                          @click="selectPeople('51+')"
                        >
                          <span>51+</span>
                        </div>
                    </div>
                    <div class="check-form">
                        <div class="smaller">This business has many locations</div>
                        <input type="checkbox" name="more_locations" class="checkbox" checked>
                    </div>
                </div>
                <div class="bottom-form mt-20" @click="n('signup-step-four')">
                    <div class="notyet"></div>
                    <div class="button pointer">
                        <div class="text">One last step</div>
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
        ghost: {
          business_name: '',
          zip_code: '',
          business_type: ''
        },
        logo,
        showList: false,
        showForm: false,
        selected: [],
        items: [],
        background, logoUsers,logoApple,logoGoogle,
        people: ''
    }),

    mounted () {
      this.resetGhost()
      this.initItems()
    },

    computed: {
    },

    methods: {
        displayList () { this.showList = !this.showList },

        displayForm () { this.showForm = !this.showForm },

        selectPeople(value) { this.people = value },

        initItems () {
            this.items = [
              { 'id': 1, 'name': 'Guard scheduling' },
              { 'id': 2, 'name': 'VMS visitor management system' },
              { 'id': 3, 'name': 'Guard tracking' },
            ]
        },

        resetGhost () {
            this.ghost = { business_name: '', zip_code: '', business_type: '' }
        },
    }
}
</script>
