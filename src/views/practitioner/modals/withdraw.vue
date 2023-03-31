<template lang="html">
    <main-modal 
        :id="'withdrawModal'"
        :title="'How much do you wish to withdraw From account ?'"
    >
        <div class="" style="padding:0px 20px;">
            <form class="_form" @submit.prevent>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="amount">Withdrawal amount</label>
                            <input type="text" name="amount" v-model="ghost.amount" placeholder="$ 100" class="form-control">
                        </div>
                    </div>
                    
                    <div class="col-sm-12">
                        <h6>Select a payment method</h6>
                        <div style="display:flex;flex-direction:row;align-items:center;justify-content:flex-start;margin-top: 20px;">
                            <div class="pointer" style="display:flex;flex-direction:row;align-items:center;margin-right: 20px;">
                                <input type="radio" value="paypal" v-model="picked" name="payment_method" id="paypal" style="width:25px;height:25px;margin-right:10px">
                                <img :src="paypal" alt="PayPal" style="width:70px;">                                
                            </div>
                            
                            <div class="pointer text-center" style="display:flex;flex-direction:row;align-items:center;">
                                <input type="radio" value="bank deposit" v-model="picked" name="payment_method" id="bank" style="width:25px;height:25px;margin-right:10px">
                                <img :src="bankdeposit" width="100px"  alt="Bank Deposit" style="width:70px;" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group mt-20" v-if="picked == 'paypal'">
                            <label for="amount">Paypal Email</label>
                            <input type="text" name="paypal_email" v-model="ghost.paypal_email" placeholder="Enter your paypal email" class="form-control">
                        </div>
                        <div class="form-group mt-20" v-if="picked == 'bank deposit'">
                            <label for="amount">Card Number</label>
                            <input type="text" name="card_number" v-model="ghost.card_number" placeholder="Enter your card number" class="form-control">
                        </div>
                    </div>
                </div>
                
                
                <div class="text-right mt-20">
                    <button type="submit" class="btn btn-secondary pointer uppercase" @click="next()">Next</button>
                </div>

                <!-- <div class="link mt-20">Don't have an account? <span @click="signup()" class="primary pointer">Sign Up</span></div> -->
            </form>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
import config from '../../../services/config'
import paypal from '@/assets/img/healing/paypal.png'
import bankdeposit from '@/assets/img/healing/bank-deposit.jpg'
export default {
    name: 'WithdrawModal',

    data: () => ({
        ghost: {
            email: '',
            phone: '',
            password: '',
            confirm_password: ''
        },
        picked: '',
        paypal, bankdeposit
    }),

    watch: {
        picked (val) {
            console.log(val)
        }
    },

    methods: {
        next () {
            this.$emit('nexted')
            setTimeout(() => {
                $('#withdrawModal').modal('hide')
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
