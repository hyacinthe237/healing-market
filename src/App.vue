<template>
    <div id="app">
        <div id="wrapper" :class="[token ? 'toggled' : 'notoggled']">
            <Header v-if="token" />
            <Sidebar v-if="token" />

            <div id="page-content-wrapper">
                <div class="toggle-container" v-if="token">
                    <a @click="toggled()" id="menu-toggle"  v-if="isToggled">
                        <i class="feather icon-chevron-right"></i>
                    </a>

                    <a @click="closeToggle()" v-else>
                        <i class="feather icon-chevron-left"></i>
                    </a>
                </div>

                <vue-page-transition name="fade">
                    <router-view />
                </vue-page-transition>

            </div>

            <OfflineFooter></OfflineFooter>
        </div>

        <!--<div class="unconnected" v-else>
            <vue-page-transition name="fade">
                <router-view />
            </vue-page-transition>
        </div>

        <LoadingModal />-->
    </div>
</template>

<script>
import AuthService from '@/services/auth'
import Sidebar from '@/components/commons/sidebar/sidebar'
import Header from '@/components/commons/header/header'
// import LoadingModal from '@/components/commons/loaders/modal'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default {
    data: () => ({
        duration: '',
        endDate: '',
        interval: null
    }),

    components: { Sidebar, Header },

    created () {
        this.$translate.setLang('french')
    },

    mounted () {

    },

    watch: { },

    computed: {
        isToggled () {
            return this.$store.state.toggleIcon
        },

        token () {
            return this.$auth.getToken()
            // return '8e4e3b90-4593-11ed-a70c-9786182f617f'
        },

        auth () {
            return !_.isEmpty(AuthService.getUser()) ? AuthService.getUser().account : null
        },
    },

    methods: {
        getUser () {
            if (!_.isEmpty(this.auth)) {
                this.$store.dispatch('users/getUser', this.auth.id)
            }
        },

        toggled () {
            $("#wrapper").removeClass("toggled")
            this.$store.commit('SET_TOGGLE_ICON', true)
        },

        closeToggle () {
            $("#wrapper").toggleClass("toggled")
            this.$store.commit('SET_TOGGLE_ICON', false)
        },

        /**
         * Events listeners
         *
         * @return {void}
         */
        listenToEvents () {
            window.eventBus.$on('loading:show', () => {
                $('#loadingModal').modal('show')
            })

            window.eventBus.$on('loading:hide', () => {
                $('#loadingModal').modal('hide')
            })
        }
    }
}
</script>

<style lang="scss">
@import "./assets/sass/app";
</style>
