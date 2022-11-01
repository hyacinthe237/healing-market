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
                <div class="step-title">step 1 of 4</div>
                <div class="progress"><div class="step-1"></div></div>
                <div class="message-big">Hi, We're <br> NOGODA 360</div>
            </div>

            <form class="_form s-form mt-10">
                <div class="form-group">
                    <label>What's your name?</label>
                    <input type="text" name="name" placeholder="e.g. Art Paul" class="form-control mt-20">
                    <div class="check-form">
                        <div class="smaller">Try everything free for 14 days. No credit card required. Basic plan is free forever.</div>
                        <input type="checkbox" name="is_free" class="checkbox" checked>
                    </div>
                </div>
                <div class="bottom-form" @click="n('signup-step-two')">
                    <div class="notyet"></div>
                    <div class="button mt-20 pointer">
                        <div class="text">Get Started</div>
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
