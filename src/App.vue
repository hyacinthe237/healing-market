<template>
    <div id="app">
        <div id="wrapper" v-if="token" class="toggled">
            <Sidebar :root="root" />

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

                <div class="card _bottom-card" v-if="showModal">
                    <div class="card-header">
                        <div class="_name">
                            {{ t('Indexation') }}
                        </div>
                        <div class="_close" @click="closeIndexation">
                            <i class="feather icon-x"></i>
                        </div>
                    </div>

                    <!-- Uninstalling -->
                    <div class="card-body text-center">
                        <div class="set-size charts-container">
                          <div :class="'pie-wrapper progress-' + taux">
                            <span class="label">{{ taux }}<span class="smaller">%</span></span>
                            <div class="pie">
                              <div class="left-side half-circle"></div>
                              <div class="right-side half-circle"></div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>

            <OfflineFooter></OfflineFooter>
        </div>

        <div v-else>
            <vue-page-transition name="fade">
                <router-view />
            </vue-page-transition>
        </div>

        <LoadingModal />
    </div>
</template>

<script>
import AuthService from '@/services/auth'
import Sidebar from '@/components/commons/sidebar/sidebar'
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

    components: { Sidebar, LoadingModal },

    created () {
        this.$translate.setLang('french')
    },

    mounted () {
        this.getRoles()
        this.listenToEvents()
        this.getUser()
    },

    watch: {
         taux: {
             immediate: true,
             handler: function (value) {
                 if ((value > 0) || (value >= 98.50)) {
                     this.$emit('indexationEnd')
                 }
             }
         },

         user: {
             immediate: true,
             handler: function (value) {
                 if (!_.isEmpty(value)) {
                     return value
                 }
             }
         },

         duration (val) {
             if (val <= 0) {
                 this.closeIndexation()
                 return true
             }
         }
     },

    computed: {
        token () {
            return this.$auth.getToken()
        },

        auth () {
            return !_.isEmpty(AuthService.getUser()) ? AuthService.getUser().account : null
        },

        ...mapGetters('organizations', {
            root: 'getRoot'
        }),

        ...mapGetters('users', {
            user: 'getUser'
        }),

        showModal () {
            return this.$store.state.folders.showModal
        },

        isToggled () {
            return this.$store.state.toggleIcon
        },

        taux () {
            let taux =  this.$store.state.folders.taux
            if (taux >= 98.80) {
                this.endDate = moment().add(60, 's')
                this.$store.dispatch('folders/setOperation', -1)
                this.closeAllModals()
                this.makeTimer()
                return taux
            }
            return taux
        }
    },

    methods: {
        getUser () {
            if (!_.isEmpty(this.auth)) {
                this.$store.dispatch('users/getUser', this.auth.id)
            }
        },

        async getRoles () {
            const res = await this.$api.get('roles/list', {})
                .catch(error => {
                    console.log('error =>', error)
                })
                if (res) {
                    this.$store.commit('SET_ROLES', res.data)
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

        closeIndexation () {
            clearInterval(this.interval)
            this.duration  = '00:00:00'
            this.duration  = ''
            this.$store.commit('folders/SET_SHOW_MODAL', false)
            window.eventBus.$emit('kill_status', 'kill')
        },

        makeTimer () {
            this.interval = setInterval(() => {
                let duration = moment.duration(this.endDate.diff(moment(), true))
                let seconds = duration.get('seconds') > 9
                    ? duration.get('seconds')
                    : '0' + duration.get('seconds')

                this.duration = seconds
            }, 1000)
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
