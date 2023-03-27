<template lang="html">
    <main-modal 
        :id="'selectTimeModal'"
        :title="'Select time'"
    >
        <div class="main-container">
             <div class="select-date">
                <div id="datepicker" class="datepicker"></div>
             </div>
             <div class="content">
                <div class="times">
                    <div class="time" v-for="(time, index) in times" :key="index++">{{ time }}</div>
                </div>
                <div class="buttons mt-20">
                    <button class="btn btn-primary" @click="selected()">Continue</button>
                    <button class="btn btn-outline-primary">Cancel</button>
                </div>
             </div>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '@/services/config'

const MOMENT_DATE_FORMAT = 'DD/MM/YYYY'
const BOOTSTRAP_DATE_FORMAT = 'dd/mm/yyyy'
export default {
    name: 'SelectTimeModal',

    data: () => ({
        ghost: {
            username: '',
            password: ''
        },
        times: ['9:00 am', '10:00 am', '11:00 am', '12:00 am', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm']
    }),

    mounted () {
       this.makeDatepicker()
    },

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

        selected () {
            this.$emit('continue')
            setTimeout(() => {
                $('#selectTimeModal').modal('hide')
            }, 150)
        },

        gotoForgot () {
            this.closeAllModals()
            this.n('password-forgot')
        },

        async getNewAccessToken () {
            this.isLoading = false
            let payload = {
                'token': config.get('refresh_token'),
            }
            const response = await this.$api.refreshToken(payload)
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.error)
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    AuthService.setToken(data.refresh)
                    ApiService.setToken(data.refresh)
                    console.log('new access token', data)
                }
        },

        async getNewRefreshToken (token) {
            this.isLoading = false
            const response = await this.$api.refreshToken({ 'refresh': token})
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.error)
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log(data.token)
                }
        },

        async checkAccessToken (token) {
            this.isLoading = false
            let payload = { 'token': token }

            const response = await this.$api.verifyToken(payload)
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.detail)
                    if(error.response.data.code == 'token_not_valid') {
                        this.getNewAccessToken()
                    }
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log('check access token', data)
                }
        },

        async checkRefreshToken (payload, token) {
            this.isLoading = false
            const response = await this.$api.verifyToken({ 'token': token })
                .catch(error => {
                    this.isLoading = true
                    console.log('error => ', error.response.data.detail)
                    if(error.response.data.code == 'token_not_valid') {
                        this.getNewRefreshToken(payload)
                    }
                })
                
                this.isLoading = false

                if (response) {
                    let data = response.data
                    console.log('check refresh token', data)
                }
        },

         /**
         * Make datepicker listening to change events
         */
         makeDatepicker () {
            $(document).ready(function () {
                $('#datepicker').datepicker({
                    format: BOOTSTRAP_DATE_FORMAT,
                    autoclose: true,
                    startDate: "today"
                })
            }).on('changeDate', () => {
                const date = $('#datepicker').val()
                this.ghost.release_date = moment(date, MOMENT_DATE_FORMAT).format()
                console.log('datepicker changed', this.ghost.release_date)
            })
        },
    }
}
</script>
