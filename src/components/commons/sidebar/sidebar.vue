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
                <a class="pointer" @click="confirmLogOut()">
                    <i class="ion-md-log-out"></i>
                    <span>{{ t('Sign out') }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import config from '@/services/config'
import Swal from 'sweetalert2'

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
        sizecss: 0
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
        confirmLogOut () {
            Swal.fire({
                // title: this.$translate.text('Are you sure ?'),
                text: this.$translate.text("Are you sure you want to log out?"),
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: this.$translate.text('No'),
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: this.$translate.text('Yes')
            }).then((result) => {
                if (result.value) {
                    this.signout()
                }
            })
        },

        signout () {
            this.$auth.logout()
        },
    }
}
</script>
