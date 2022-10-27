<template lang="html">
  <section class="full-page" :style="`background-image:url(${background})`">
    <div class="overlay">
       <form class="full-form">
            <div class="top">
                <div class="step-title">step 4 of 4</div>
                <div class="progress"><div class="step-4"></div></div>
                <div class="message-big">Finish signing up</div>
            </div>

            <input type="text" name="email" v-model="ghost.email" placeholder="Email address" class="form-control">
            <input type="password" name="password" v-model="ghost.password" placeholder="Password" class="form-control">
            <input type="text" name="phone" v-model="ghost.phone" placeholder="Phone number" class="form-control">
            <div class="txt">By clicking continue you agree to our Terms of Service, Privacy Policy and User Agreement.</div>
            <div class="bttn pointer">
                <div class="text">Continue to Nogada 360</div>
                <div class="icon"><i class="feather icon-chevron-right"></i></div>
            </div>
       </form>
    </div>
  </section>
</template>

<script>
import background from '@/assets/img/background.png'

export default {
    name: 'Welcome',

    data: () => ({
        ghost: {
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
            this.ghost = { email: '', password: '', phone: '' }
        },
    }
}
</script>
