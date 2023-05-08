<template>
    <div>
      <stripe-checkout
        ref="checkoutRef"
        mode="subscription"
        :pk="publishableKey"
        :line-items="lineItems"
        :success-url="successURL"
        :cancel-url="cancelURL"
        @loading="v => loading = v"
      />
      <button @click="submit">Subscribe!</button>
    </div>
  </template>
  
  <script>
  import { StripeCheckout } from '@vue-stripe/vue-stripe';
  import config from '@/services/config'
  export default {
    name: 'StripeCheckout',

    components: {
      StripeCheckout,
    },

    data: () => ({
        loading: false,
        lineItems: [
          {
            price: 'some-price-id', // The id of the recurring price you created in your Stripe dashboard
            quantity: 1,
          },
        ],
        successURL: 'your-success-url',
        cancelURL: 'your-cancel-url',
    }),

    computed: {
        publishableKey () {
            return config.get('stripe_key')
        }
    },
    methods: {
      submit () {
        // You will be redirected to Stripe's secure checkout page
        this.$refs.checkoutRef.redirectToCheckout();
      },
    },
  };
  </script>