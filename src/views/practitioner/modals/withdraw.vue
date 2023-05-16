<template lang="html">
    <main-modal 
        :id="'withdrawModal'"
        :title="'How much do you wish to withdraw From account ?'"
    >
        <div class="" style="padding:0px 20px;">
            <form class="_form" @submit.prevent v-show="!isLoading">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="amount">Withdrawal amount</label>
                            <input 
                                type="text" 
                                name="amount" 
                                v-model="ghost.amount" 
                                placeholder="$ 100" 
                                class="form-control"
                                v-validate="'required'"
                            />
                            <v-error :name="'amount'" :err="errors" :show="showErrors"></v-error>
                        </div>
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="paypal_email">Paypal Email</label>
                            <input 
                                type="text" 
                                name="paypal_email" 
                                v-model="ghost.paypal_email" 
                                placeholder="Paypal email" 
                                class="form-control"
                                v-validate="'required'"
                                :data-vv-as="t('paypal email')"
                            />
                            <v-error :name="'paypal_email'" :err="errors" :show="showErrors"></v-error>
                        </div>
                    </div>
                    
                    <!-- <div class="col-sm-12">
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
                    </div> -->
                </div>
                
                
                <div class="text-right mt-20">
                    <button type="submit" class="btn btn-secondary pointer uppercase" @click="send()">Next</button>
                </div>

                <!-- <div class="link mt-20">Don't have an account? <span @click="signup()" class="primary pointer">Sign Up</span></div> -->
            </form>
            <div class="_loader" v-show="isLoading">
                <Spinners></Spinners>
            </div>
        </div>
    </main-modal>
</template>

<script>
export default {
    name: 'WithdrawModal',

    data: () => ({
        ghost: {
            amount: '',
            paypal_email: '',
        },
        picked: '',
        // paypal, bankdeposit
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
        async send () {
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.isLoading = true
            const response = await this.$api.post('/user-api/money-requests/', this.ghost)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('Sorry', this.$translate.text(error.response.data.error_maessage))
                })
            
            
            if (response) {
                this.isLoading = false
                this.$swal.success('Success', response.data.message)
                this.resetGhost()
                this.next()
            }
        },

        resetGhost () {
            this.ghost =  {
                amount: '',
                paypal_email: '',
            }
        }
    }
}
</script>
