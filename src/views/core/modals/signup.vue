<template lang="html">
    <main-modal 
        :id="'signUpModal'"
        :title="'Happy to have join our community'"
    >
        <div class="">
            <form class="_form" @submit.prevent="signup()" v-show="!isLoading">
                <div class="form-group">
                    <input type="text" name="first_name" v-model="ghost.first_name" placeholder="First name" class="form-control-modal">
                </div>
                <div class="form-group">
                    <input type="text" name="last_name" v-model="ghost.last_name" placeholder="Last name" class="form-control-modal">
                </div>
                <div class="form-group">
                    <input type="text" name="email" v-model="ghost.email" placeholder="Email" class="form-control-modal">
                </div>
                <div class="form-group">
                    <input type="number" name="phone" v-model="ghost.phone" placeholder="Phone" class="form-control-modal">
                </div>
                <div class="form-group">
                    <input type="password" name="password1" v-model="ghost.password1" placeholder="Password" class="form-control-modal">
                </div>
                <div class="form-group">
                    <input type="password" v-validate="'required|confirmed:password'" name="password2" v-model="ghost.password2" placeholder="Confirm password" class="form-control-modal">
                </div>
                <button type="submit" class="btn btn-secondary uppercase">Sign Up</button>

                <div class="link mt-20">Have an account? <span @click="signin()" class="primary pointer">Sign In</span></div>
            </form>
            <div class="_loader" v-show="isLoading">
                <Spinners></Spinners>
            </div>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
export default {
    name: 'SignUpModal',

    data: () => ({
        ghost: {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            password1: '',
            password2: '',
            is_client: true,
            is_therapist: false
        },
    }),

    computed: {},

    methods: {
        closer () {
            this.closeAllModals()
            this.$emit('signup')
        },

        /**
         * User signs in
         * @return {void}
         */
        async signup () {
            if (this.ghost.first_name == '' 
                || this.ghost.last_name == '' 
                || this.ghost.email == '' 
                || this.ghost.phone == ''
                || this.ghost.password1 == '' 
                || this.ghost.password2 == ''
            ) {
                this.$swal.error('Validation warning', 'All inputs are mandatory')
            }

            if (this.ghost.first_name !== '' 
                && this.ghost.last_name !== '' 
                && this.ghost.email !== '' 
                && this.ghost.phone !== ''
                && this.ghost.password1 !== '' 
                && this.ghost.password2 !== ''
            ) {
                this.isLoading = true

                const response = await this.$api.post('rest-auth/registration/', this.ghost)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Oups ! an error', error.response.data.message)
                    })
                
                
                if (response) {
                    let data = response.data
                    AuthService.setUser(data)
                    AuthService.setToken(data.key)
                    ApiService.setToken(data.key)
                    this.closer()
                }
            }
            
        },
    }
}
</script>
