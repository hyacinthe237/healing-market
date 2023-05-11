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
                                Date:  <span class="secondary">{{ payload.start_date }}</span>
                            </div>
                            <div class="line nowrap">
                                Hour:  <span class="secondary">{{ payload.start_time }}</span>
                            </div>
                        </div>
                    </div>
    
                    <div class="payment-details">
                        <h3>Payment</h3>
                        <div class="_head">
                            <div class="primary bold"><i class="feather icon-credit-card"></i> Credit Card</div>
                            <p>Your payment are processed securely through stripe secure payment gateway.</p>
                        </div>
                        <div class="form-group mt-20" v-show="!isLoading">
                            <stripe-element-payment
                                ref="elementRef"
                                :pk="pk"
                                :elements-options="elementsOptions"
                                :confirm-params="confirmParams"
                            />
                            <button class="btn btn-primary" @click="payer()">
                                Confirm booking
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { StripeElementPayment } from '@vue-stripe/vue-stripe'
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
    }),

    components: { StripeElementPayment },

    watch: {
        stripe: {
            immediate: true,
            handler: function (val) {
                if (val) {
                    this.elementsOptions.clientSecret = val.client_secret
                    this.confirmParams.return_url = `${this.$config.get('front_url')}`
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
    },

    mounted () {
    },

    methods: {
        payer () {
            this.startLoading()
            this.$refs.paymentRef.submit();
        },
    }
}
</script>
