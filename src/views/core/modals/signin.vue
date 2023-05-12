<template lang="html">
    <main-modal 
        :id="'signInModal'"
        :title="'Please Sign In to complete your booking'"
    >
        <div class="">
            <form class="_form" @submit.prevent v-show="!isLoading">
                <div class="form-group">
                    <input type="email" name="email" v-model="ghost.email" placeholder="Email" class="form-control" v-validate="'required'">
                    <v-error :name="'email'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group mt-20">
                    <input type="password" name="password" v-model="ghost.password" placeholder="********" class="form-control" v-validate="'required'">
                    <v-error :name="'password'" :err="errors" :show="showErrors"></v-error>
                </div>
                
                <div class="bouton">
                    <div class="forgot primary pointer" @click="gotoForgot()">Password forgot ?</div>
                    <button type="submit" class="btn btn-secondary pointer uppercase" @click="signin()">Sign In</button>
                </div>

                <div class="link mt-20">Don't have an account? <span @click="signup()" class="primary pointer">Sign Up</span></div>
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
    name: 'SignInModal',

    data: () => ({
        ghost: {
            email: '',
            password: ''
        },
    }),

    computed: {},

    methods: {
        /**
         * User signs in
         * @return {void}
         */
        async signin () {
            const isValid = await this.$validator.validate()
            if (!isValid) return false

            this.isLoading = true

            const response = await this.$api.post('/user-api/custom/login', this.ghost)
                .catch(error => {
                    this.isLoading = false
                    this.$swal.error('Oups! an error', error.response.data.message)
                })
            
            
            if (response) {
                let data = response.data
                AuthService.setUser(data)
                AuthService.setToken(data.key)
                ApiService.setToken(data.key)
                this.closeAllModals()
                this.n('client-dashboard')
            }
            
        },

        signup () {
            this.$emit('signup')
            setTimeout(() => {
                $('#signInModal').modal('hide')
            }, 150)
        },

        gotoForgot () {
            this.closeAllModals()
            this.n('password-forgot')
        },
    }
}
</script>
