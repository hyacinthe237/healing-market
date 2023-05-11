<template>
  <div>
    <stripe-element-card
      ref="elementRef"
      :pk="pk"
      :testMode="true"
      @token="tokenCreated"
    />
    <button @click="submit" class="btn btn-secondary mt-20 text-right">Confirm booking</button>
  </div>
</template>

<script>
import config from '@/services/config'
import { StripeElementCard  } from '@vue-stripe/vue-stripe';
export default {
  components: {
    StripeElementCard,
  },
  data: () => ({
      pk: config.get('stripe_key'),
      elementsOptions: {
        appearance: {}, // appearance options
      },
      confirmParams: {
        return_url: 'http://localhost:8080/success', // success url
      },
      token: null,
  }),
  methods: {
    submit () {
      // this will trigger the process
      this.$refs.elementRef.submit();
    },
    tokenCreated (token) {
      console.log(token);
      // handle the token
      // send it to your server
    },
  },
};
</script>