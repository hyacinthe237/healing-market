<template lang="html">
    <section class="signup-page">
        <div class="header" :style="`background-image: url(${background})`">
            <div class="overlay"></div>
            <img :src="logo">
        </div>
        <div class="content">
            <div class="head">
                <div class="message-big">Become more <br><span>efficient</span> today</div>
                <div class="message-small mt-10">How will you want to use <span class="bold">NOGADA 360</span>?</div>
            </div>
            <div class="_main">
                <div class="gauche">
                    <div class="btn-list" @click="displayList()">
                        <span>List service</span>
                        <div><i class="feather icon-play"></i></div>
                    </div>
                    <div class="list-box" v-show="showList">
                        <div
                            class="list-item"
                            v-for="item in items"
                            :key="item.id"
                        >
                            <label
                                class="css-input css-checkbox css-checkbox-primary selected"
                            >
                                <input type="checkbox"
                                    name="list_item[]" :value="item.id"
                                    v-model="selected"
                                >
                                <span class="mr-2"></span>
                                <span>{{ item.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="droite">droite</div>
            </div>
            <div class="link">Already have an account? <span>Sign In</span></div>
        </div>
    </section>
</template>

<script>
import logo from '@/assets/img/vertical.png'
import background from '@/assets/img/background.png'
export default {
    name: 'Welcome',

    data: () => ({
        ghost: {},
        logo,
        showList: false,
        selected: [],
        items: [],
    }),

    mounted () {
      this.initItems()
    },

    methods: {
        displayList () {
            this.showList = !this.showList
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
