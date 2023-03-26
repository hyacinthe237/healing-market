<template lang="html">
    <main-modal 
        :id="'checkoutModal'"
        :title="''"
    >
        <div class="checkout-container">
            <div class="booking-details">
                <h3>Your about booking</h3>
                <div class="_head">
                    <div class="bg-img"></div>
                    <div class="right-box">
                        <div class="desc">
                            1 hour reiki session with Nathalia
                        </div>
                        <div class="pract">
                            <span class="teal">Practitioner: </span> <span class="primary bold">Victor Ilome</span>
                        </div>
                    </div>
                </div>
                <div class="lines">
                    <div class="line nowrap">
                        Date:  <span>25.03.2023</span>
                    </div>
                    <div class="line nowrap">
                        Hour:  <span>7:30 am - 8:30 am</span>
                    </div>
                </div>
            </div>

            
            <div class="payment-details">
                <h3>Payment</h3>
                <div class="_head">
                    <div class="primary bold"><i class="feather icon-credit-card"></i> Credit Card</div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Provident in tempora a necessitatibus nihil 
                        ipsam quos recusandae dicta cum doloribus.
                    </p>
                </div>
                <div class="mt-20">
                    <form class="_form" @submit.prevent>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input type="text" name="card_name" v-model="ghost.card_name" placeholder="Card Name" class="form-control-modal">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <input type="number" name="card_number" v-model="ghost.card_number" placeholder="Card Number" class="form-control-modal">
                                </div>
                            </div>
                            
                            
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="number" name="expiry" v-model="ghost.expiry" placeholder="Expiry" class="form-control-modal">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="number" name="cvv" v-model="ghost.cvv" placeholder="CVV" class="form-control-modal">
                                </div>
                            </div>
                            <div class="col-sm-12 text-center">
                                <button type="submit" class="btn btn-secondary mt-20">Confirm booking</button>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '../../../services/config'
export default {
    name: 'SignUpModal',

    data: () => ({
        ghost: {
            email: '',
            phone: '',
            password: '',
            confirm_password: ''
        },
    }),

    computed: {},

    methods: {
        signin () {
            this.$emit('signin')
            setTimeout(() => {
                $('#signUpModal').modal('hide')
            }, 150)
        },

        /**
         * User signs in
         * @return {void}
         */
        async signup () {
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
    }
}
</script>