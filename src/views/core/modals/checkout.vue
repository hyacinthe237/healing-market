<template lang="html">
    <div class="_checkout-modal modal animated fadeIn" id="checkoutModal">
        <div class="_preview-dialog" role="document">
            <div class="_preview-content">
                <div class="close" @click="closeAllModals()">
                    <i class="feather icon-x"></i>
                </div>

                <div class="checkout-container">
                    <div class="booking-details">
                        <h3>Your about booking</h3>
                        <div class="_head">
                            <div class="bg-img"></div>
                            <div class="right-box">
                                <div class="desc">
                                    1 hour to "{{ offer_title }}"
                                </div>
                                <div class="pract">
                                    <span class="Black">Practitioner: </span> <span class="primary bold nowrap">{{ name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="lines">
                            <div class="line nowrap">
                                Date:  <span class="secondary">{{ payload.start_date | date }}</span>
                            </div>
                            <div class="line nowrap">
                                Hour:  <span class="secondary">{{ payload.start_time | amPm }}</span>
                            </div>
                        </div>
                    </div>
    
                    <div class="payment-details">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
export default {
    name: 'CheckoutModal',

    props: {
        therapist: { type: Object, default: () => {} },
        offer: { type: Object, default: () => {} },
        payload: { type: Object, default: () => {} },
    },

    data: () => ({
        ghost: {
            email: '',
            phone: '',
            password: '',
            confirm_password: ''
        },
        token: null,
        cardNumber: null,
        cardExpiry: null,
        cardCvc: null,
    }),

    computed: {
        name () {
            return this.therapist.first_name + ' ' + this.therapist.last_name
        },

        offer_title () {
            return this.offer.title
        },
    },

    mounted () {
    },

    methods: {

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
    }
}
</script>
