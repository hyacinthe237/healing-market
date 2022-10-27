<template>
    <div id="app">
        <Header />
        <div id="wrapper" class="toggled">
            <Sidebar />

            <div id="page-content-wrapper">
                <div class="toggle-container">
                    <a @click="toggled()" id="menu-toggle"  v-if="isToggled">
                        <i class="feather icon-align-justify"></i>
                    </a>

                    <a @click="closeToggle()" v-else>
                        <i class="feather icon-align-justify"></i>
                    </a>
                </div>

                <vue-page-transition name="fade">
                    <router-view />
                </vue-page-transition>

            </div>

            <OfflineFooter></OfflineFooter>
        </div>

        <!-- <div v-else>
            <vue-page-transition name="fade">
                <router-view />
            </vue-page-transition>
        </div>

        <LoadingModal /> -->
    </div>
</template>

<script>
import AuthService from '@/services/auth'
import Sidebar from '@/components/commons/sidebar/sidebar'
import Header from '@/components/commons/header/header'
import LoadingModal from '@/components/commons/loaders/modal'
import { mapGetters } from 'vuex'
import moment from 'moment'
import _ from 'lodash'

export default {
    data: () => ({
        duration: '',
        endDate: '',
        interval: null
    }),

    components: { Sidebar, LoadingModal, Header },

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
