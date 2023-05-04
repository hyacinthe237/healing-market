<template lang="html">
    <main-modal 
        :id="'successModal'"
        :title="''"
    >
        <div class="_success">
            <i class="feather icon-check-circle"></i>
            <p>Thanks <span>Client Name</span>. Your booking with <span>Practitioner name</span> was successful.</p>
            <button type="submit" class="btn btn-secondary pointer mt-20" @click="gotoDashboard()">Go to dashboard</button>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '../../../services/config'
export default {
    name: 'SignInModal',

    data: () => ({
        ghost: {
            username: '',
            password: ''
        },
    }),

    computed: {},

    methods: {
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            if (this.ghost.username == '' || this.ghost.password == '') {
                this.$swal.error('Validation warning', 'Username & Password inputs are mandatory')
            }

            if (this.ghost.username !== '' && this.ghost.password !== '') {
                this.isLoading = true

                const response = await this.$api.post('user-api/login/', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error(this.$translate.text('Login error'), this.$translate.text(error.response.data.error))
                    })
                
                
                if (response) {
                    let data = response.data
                    AuthService.setUser(data.user)

                    const res = await this.$api.apiToken(this.ghost)
                    .catch(err => {
                        this.isLoading = false
                        console.log('token error', err.response.data)
                    })
                    if (res) {
                        this.isLoading = false
                        AuthService.setToken(res.data.access)
                        ApiService.setToken(res.data.access)

                        // Set Refresh token
                        AuthService.setRefreshToken(res.data.refresh)
                        this.n('dashboard')
                    }
                }
            }
            
        },

        gotoDashboard () {
            this.closeAllModals()
            this.n('client-dashboard')
        },

        gotoForgot () {
            this.closeAllModals()
            this.n('password-forgot')
        },
    }
}
</script>
