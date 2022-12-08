<template lang="html">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li>
                <router-link :to="{ name: 'dashboard' }" :class="[current == 'dashboard' ? 'active' : '']">
                    <i class="ion-md-grid"></i>
                    <span>{{ 'Dashboard' }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'schedule' }" :class="[current == 'schedule' ? 'active' : '']">
                    <i class="ion-md-calendar"></i>
                    <span>{{ isManager ? t('Schedule') : t('My Schedule') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'timesheets' }" :class="[current == 'timesheets' ? 'active' : '']">
                    <i class="ion-md-timer"></i>
                    <span>{{ isManager ? t('Timesheets') : t('My Timesheets') }}</span>
                </router-link>
            </li>
            <li v-if="isManager">
                <router-link :to="{ name: 'team' }" :class="[current == 'team' ? 'active' : '']">
                    <i class="ion-md-people"></i>
                    <span>{{ t('Team') }}</span>
                </router-link>
            </li>
            <li v-if="isManager">
                <router-link :to="{ name: 'jobsites' }" :class="[current == 'jobsites' ? 'active' : '']">
                    <i class="ion-ios-briefcase"></i>
                    <span>{{ t('Job sites') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'settings' }" :class="[current == 'settings' ? 'active' : '']">
                    <i class="ion-md-settings"></i>
                    <span>{{ t('Settings') }}</span>
                </router-link>
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

       isManager () { return this.user.is_manager },
       isEmployee () { return this.user.is_employee },
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
