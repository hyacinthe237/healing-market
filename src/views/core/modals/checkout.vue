<template lang="html">
    <div class="_checkout-modal modal animated fadeIn" id="checkoutModal">
        <div class="_preview-dialog" role="document" v-show="!isLoading">
            <div class="_preview-content">
                <div class="close" @click="closeAllModals()">
                    <i class="feather icon-x"></i>
                </div>

                <div class="checkout-container">
                    <div class="booking-details">
                        <h4 class="nowrap">Your about booking</h4>
                        <div class="_head mt-10">
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
                               Booking date:  <span class="primary">{{ payload.start_date }}</span>
                            </div>
                            <div class="line nowrap">
                                Booking time:  <span class="primary">{{ payload.start_time }}</span>
                            </div>
                        </div>
                    </div>
    
                    <div class="payment-details">
                        <h4>Payment</h4>
                        <div class="_head mt-10">
                            <div class="primary bold"><i class="feather icon-credit-card"></i> Credit Card</div>
                            <p>Your payment are processed securely through stripe secure payment gateway.</p>
                        </div>
                        <div class="form-group mt-20" v-show="!isLoading">
                            <stripe-element-card
                                ref="paymentRef"
                                :pk="pk"
                                :elements-options="elementsOptions"
                                :confirm-params="confirmParams"
                                :hidePostalCode="true"
                                :testMode="true"
                                @token="tokenCreated"
                            />
                            <div class="mt-20 text-right">
                                <button class="btn btn-primary" @click="payer()">
                                    Confirm booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </div>
</template>

<script>
import { StripeElementCard   } from '@vue-stripe/vue-stripe'
import config from '@/services/config'

export default {
    name: 'CheckoutModal',

    props: {
        therapist: { type: Object, default: () => {} },
        offer: { type: Object, default: () => {} },
        payload: { type: Object, default: () => {} },
        stripe: { type: Object, default: () => {} },
    },

    data: () => ({
        ghost: {
            email: '',
            phone: '',
            password: '',
            confirm_password: ''
        },
        elementsOptions: {},
        confirmParams: {
            return_url: '',
        },
        auth: null,
        calendar: null,
    }),

    components: { StripeElementCard  },

    watch: {
        stripe: {
            immediate: true,
            handler: function (val) {
                if (val) {
                    this.elementsOptions.clientSecret = val.client_secret
                    this.confirmParams.return_url = `${this.$config.get('front_url')}checkout/success`
                }
            }
        }
    },

    computed: {
        name () {
            return this.therapist.first_name + ' ' + this.therapist.last_name
        },

        offer_title () {
            return this.offer.title
        },

        pk () {
            return config.get('stripe_key')
        },

        booking () {
            return JSON.parse(localStorage.getItem('booking'))
        },
    },

    mounted () {},

    methods: {
        payer () {
            this.startLoading()
            this.$refs.paymentRef.submit();
        },

        tokenCreated (token) {
            let id = token.id
            setTimeout(() => {
                this.chargeBooking(id)
            }, 3000)
        },

        async chargeBooking (token) {
            this.startLoading()
            
            let payload = {
                'status': token,
                'booking_id': this.booking.id
            }
            const response = await this.$api.post(`/booking-api/bookings/charge-confirm`, payload)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Sorry', error.response.data.message)
                })

                if (response) {
                    this.stopLoading()
                    this.$swal.success('Success', 'We are receive your booking checkout')
                    setTimeout(() => {
                        this.closeAllModals()
                        this.$emit('success')
                    }, 2000)
                }
        },
    }
}
</script>
