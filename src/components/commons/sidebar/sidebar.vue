<template lang="html">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li>
                <router-link :to="{ name: 'dashboard' }">
                    <i class="feather icon-layers"></i>
                    {{ t('Dashboard') }}
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
        }
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
