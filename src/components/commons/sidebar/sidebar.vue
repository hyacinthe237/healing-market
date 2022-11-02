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
                    <span>{{ t('Schedule') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'timesheets' }" :class="[current == 'timesheets' ? 'active' : '']">
                    <i class="ion-md-timer"></i>
                    <span>{{ t('Timesheets') }}</span>
                </router-link>
            </li>
            <li>
                <router-link :to="{ name: 'team' }" :class="[current == 'team' ? 'active' : '']">
                    <i class="ion-md-people"></i>
                    <span>{{ t('Team') }}</span>
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
import _ from 'lodash'
import logo from '@/assets/img/logo-nogada-foot.png'

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
        computeSize () {
            if (this.root && this.root.root) {
                let value = this.root.root.size
                let size = ''

                if (value >= 1000) {
                    let gb = value/1000
                    this.sizecss = parseInt(gb, 10)
                    size = gb.toFixed(2) + ' GB'
                } else { size = value.toFixed(2) + ' MB' }

                return size
            }
        },

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
