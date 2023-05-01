<template lang="html">
    <div class="hab-footer">
        <div class="hab-footer-top">
            <div class="cardre logo">
                <img :src="logoFooter" alt="LOGO" />
                <p class="mt-20">Use of this website, content, and products are for informational purposes only. Healing Marketplace does not provide medical advice, diagnosis, or treatment.</p>
                <div class="icons">
                    <div><a href="#" target="_blank"><i class="feather icon-youtube"></i></a></div>
                    <div><a href="#" target="_blank"><i class="feather icon-linkedin"></i></a></div>
                    <div><a href="#" target="_blank"><i class="feather icon-twitter"></i></a></div>
                    <div><a href="#" target="_blank"><i class="feather icon-facebook"></i></a></div>
                    <div><a href="#" target="_blank"><i class="feather icon-instagram"></i></a></div>
                </div>
            </div>
            <div class="cardre other">
                <h3>Quick Links</h3>
                <ul>
                    <li>Privacy policy</li>
                    <li>Terms and conditions</li>
                    <li>Join our beta test</li>
                </ul>
            </div>
            <div class="cardre other">
                <h3 class="white">About</h3>
                <ul>
                    <li>Find a practitioner</li>
                    <li>Ask a question</li>
                    <li>About us</li>
                </ul>
            </div>
            <div class="cardre other" v-show="!isConnected">
                <button class="btn btn-primary"  @click="n('signup')">List your practice</button>
            </div>
        </div>
        <div class="hab-footer-bottom">
            <div class="line"></div>
            <div class="copy">
                <span>&copy; 2022 Healing Marketplace - </span>
                <span>All Rights Reserved.</span>
            </div>
        </div>
    </div>
</template>

<script>

import logoFooter from '@/assets/img/healing/logo.svg'
export default {
    data: () => ({
      logoFooter
    }),
    props: {
        isConnected: { type: Boolean, default: false }
    },
    methods: {
        goto (name) {
            this.$router.push({ name })
        }
    }
}
</script>
