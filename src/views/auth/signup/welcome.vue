<template lang="html">
    <section class="signup-page">
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
        <div class="content">
            <div class="head">
                <div class="message-big" v-show="showForm">Put in mail so we can verify<br> you have been added by<br> your manager</div>
                <div class="message-big" v-show="!showForm">Become more <br><span>efficient</span> today</div>
                <div class="message-small mt-10" v-show="!showForm">How will you want to use <span class="bold">NOGADA 360</span>?</div>
            </div>

            <form class="_form signup-form mt-20" v-show="showForm">
                <div class="form-group">
                    <input type="text" name="email" placeholder="Email address" class="form-control">
                </div>
                <div class="button mt-20 pointer">
                    <div class="text">Continue</div>
                    <div class="icon"><i class="feather icon-chevron-right"></i></div>
                </div>
            </form>
            <div class="bold msg mt-60" v-show="showForm">Or, download the NOGADA 360 mobile apps</div>
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
                                class="css-input css-checkbox css-checkbox-primary selected"
                            >
                                <input type="checkbox" name="list_item" checked>
                                <span class="mr-2"></span>
                                <span>{{ 'Guard scheduling' }}</span>
                                <span class="mr-2"></span>
                                <i class="feather icon-check"></i>
                            </label>
                        </div>
                        <div class="list-item">
                            <label
                                class="css-input css-checkbox css-checkbox-primary"
                            >
                                <input type="checkbox" name="list_item">
                                <span class="mr-2"></span>
                                <span>{{ 'VMS visitor management system' }}</span>
                            </label>
                        </div>
                        <div class="list-item">
                            <label
                                class="css-input css-checkbox css-checkbox-primary"
                            >
                                <input type="checkbox" name="list_item">
                                <span class="mr-2"></span>
                                <span>{{ 'Guard tracking' }}</span>
                            </label>
                        </div>
                    </div>
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

            <div class="link">Already have an account? <span>Sign In</span></div>
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
        background, logoUsers,logoApple,logoGoogle
    }),

    mounted () {
      this.initItems()
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

        initItems () {
            this.items = [
              { 'id': 1, 'name': 'Guard scheduling' },
              { 'id': 2, 'name': 'VMS visitor management system' },
              { 'id': 3, 'name': 'Guard tracking' },
            ]
        },
    }
}
</script>
