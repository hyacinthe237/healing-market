<template lang="html">
    <section class="section-home">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <div class="title"><span>All in one</span> solution to track 
                        and manage your <span>security</span> services</div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    
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
                                <button class="btn btn-block btn-primary">Start free trial version</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-sm-6">
                    <div class="img">
                        <img :src="logoHeaderSection" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import _ from 'lodash'

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        }
    },

    data: () => ({
        role: 1,
        sizecss: 0
    }),

    computed: {
        user () {
           return this.$store.state.users.user
        }
    },

    mounted () {
        this.role = localStorage.getItem('roleId')
    },

    methods: {
        signout () {
            this.$auth.logout()
            this.$store.commit('SET_TOGGLE_ICON', false)
        }
    }
}
</script>
