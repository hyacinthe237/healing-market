<template lang="html">
    <section class="welcome-page">
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
        <div v-show="!isLoading" class="profile-top pointer" :style="`background-image:url(${background})`" @click="n('home')">
            <div class="overlay"></div>
            <div class="profile-top-container">
                <div
                    class="profile-photo"
                >
                  <img :src="logo" />
                </div>
            </div>
        </div>
        <div class="content" v-show="!isLoading">
            <div class="head mt-10">
                <div class="message-big" v-show="showForm">Put in mail so we can verify<br> you have been added by<br> your manager</div>
                <div class="message-big" v-show="!showForm">Become more <br><span>efficient</span> today</div>
                <div class="message-small mt-10" v-show="!showForm">How will you want to use <span class="bold">NOGADA 360</span>?</div>
            </div>

            <form class="_form signup-form mt-60" v-show="showForm" @submit.prevent>
                <div class="form-group">
                    <input type="text" name="email" v-model="ghost.email" placeholder="Email address" class="form-control">
                </div>
                <div class="button mt-20 pointer" @click="checkMyEmail()">
                    <div class="text">Continue</div>
                    <div class="icon"><i class="feather icon-chevron-right"></i></div>
                </div>
            </form>
            <div class="bold msg mt-60 text-center" v-show="showForm">Or, download the NOGADA 360 mobile apps</div>
            <div class="buttons mt-20" v-show="showForm">
                <button class="play-store">
                    <img :src="logoGoogle" alt="">
                    <span>Get it on <br><strong>Google Play</strong></span>
                </button>
                <button class="app-store">
                    <img :src="logoApple" alt="">
                    <span>Download on the <br> <strong>App Store</strong></span>
                </button>
            </div>
            <div class="_main" v-show="!showForm">
                <div class="gauche">
                    <div class="btn-list" @click="displayList()">
                        <span>List service</span>
                        <div><i class="feather icon-play"></i></div>
                    </div>
                    <div class="list-box" v-show="showList">
                        <div class="list-item">
                            <label
                                :class="['css-input css-checkbox css-checkbox-primary', service == item.name ? 'selected': '']"
                                v-for="item in items" :key="item.id"
                            >
                                <input type="checkbox" name="list_item" @click="selectService(item.name)">
                                <span class="mr-2"></span>
                                <span>{{ item.name }}</span>
                                <span class="mr-2"></span>
                                <i class="feather icon-check" v-if="service == item.name"></i>
                            </label>
                        </div>
                    </div>
                    <form class="_form signup-form mt-10" v-show="showList" @click="n('signup-step-one')">
                        <div class="button pointer">
                            <div class="text">Continue</div>
                        </div>
                    </form>
                </div>
                <div class="vertical-line"></div>
                <div class="droite">
                    <img :src="logoUsers">
                    <p class="bold">Are you an employee joining a team ?</p>
                    <div class="action" @click="displayForm()">
                      Join an existing team
                      <i class="feather icon-play"></i>
                    </div>
                </div>
            </div>

            <div class="link mt-20">Already have an account? <span @click="n('signin')" class="pointer">Sign In</span></div>
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
        ghost: {},
        logo,
        showList: false,
        showForm: false,
        selected: [],
        items: [],
        background, logoUsers,logoApple,logoGoogle,
        service: ''
    }),

    mounted () {
      this.initItems()
    },

    computed: {
    },

    methods: {
        selectService (value) {
            this.service = value
        },

        displayList () {
            this.showList = !this.showList
        },

        displayForm () {
            this.showForm = !this.showForm
        },

        initItems () {
            this.items = [
              { 'id': 1, 'name': 'Guard scheduling' },
              { 'id': 2, 'name': 'VMS visitor management system' },
              { 'id': 3, 'name': 'Guard tracking' },
            ]
        },

        async checkMyEmail () {
            this.startLoading()

            const res = await this.$api.post('user-api/verify-employee-email', this.ghost)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Sorry', error.response.data.message)
                })
                if (res) {
                    this.stopLoading()
                    this.n('complete-access')
                    localStorage.setItem('member', JSON.stringify(res.data.message))
                }
        }
    }
}
</script>
