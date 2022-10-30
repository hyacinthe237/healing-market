<template lang="html">
    <div class="hab-footer">
        <div class="hab-footer-top">
            <div class="hab-website">
                <div class="img">
                    <img :src="logoFooter" alt="">
                </div>
                <form action="" class="_form mt-20">
                    <div class="form-group mt-20">
                        <div class="content bs">
                            <input type="email"
                                name="email"
                                placeholder="Email address"
                                class="form-control form-control-lg dark no-white"
                            >
                            <button>Start free trial version</button>
                        </div>
                        <div class="text-center button mt-20">
                            <button class="btn btn-primary">Start free trial version</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="hab-useful-links">
                <div class="title">Useful links</div>
                <div class="line"></div>
                <div class="links">
                    <div class="link">Terms of Service</div>
                    <div class="link">Privacy Policy</div>
                    <div class="link">Accessibility</div>
                </div>
            </div>
            <div class="hab-follow-us">
                <div class="title">Follow us</div>
                <div class="line"></div>
                <div class="social-links">
                    <div class="social"><i class="feather icon-facebook"></i></div>
                    <div class="social"><i class="feather icon-instagram"></i></div>
                </div>
            </div>
        </div>
        <div class="hab-footer-bottom">
            <span class="uppercase">&copy; 2022 nogada 360.</span>
            <span>All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>

import logoFooter from '@/assets/img/logo-nogada-foot.png'
export default {
    data: () => ({
      logoFooter
    }),
    methods: {
        goto (name) {
            this.$router.push({ name })
        }
    }
}
</script>
