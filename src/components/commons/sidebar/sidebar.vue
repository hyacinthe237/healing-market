<template lang="html">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li>
                <router-link :to="{ name: 'client-dashboard' }" :class="[current == 'dashboard' ? 'active' : '']">
                    <i class="ion-md-grid"></i>
                    <span>{{ 'Dashboard' }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'client-booking' }" :class="[current == 'booking' ? 'active' : '']">
                    <i class="ion-md-calendar"></i>
                    <span>{{ t('Booking') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'client-messages' }" :class="[current == 'messages' ? 'active' : '']">
                    <i class="feather icon-message-square"></i>
                    <span>{{ t('Messages') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'client-settings' }" :class="[current == 'settings' ? 'active' : '']">
                    <i class="ion-md-settings"></i>
                    <span>{{ t('Settings') }}</span>
                </router-link>
            </li>
            <li>
                <a href="" @click="signout()">
                    <i class="ion-md-log-out"></i>
                    <span>{{ t('Sign out') }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import logo from '@/assets/img/logo-nogada-foot.png'
import config from '../../../services/config'

export default {
    props: {
        root: {
            type: Object,
            default: () => {}
        },
        current: {
            type: String,
            default: 'dashboard'
        },
    },

    data: () => ({
        role: 1,
        sizecss: 0,
        logo
    }),

    computed: {
        user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },
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
