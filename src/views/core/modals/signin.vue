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
                <div class="form-group row-pass">
                    <input 
                        v-if="showPassword"
                        type="text" 
                        name="password" 
                        v-model="ghost.password" 
                        placeholder="Password" 
                        class="form-control"
                        v-validate="'required'"
                        :data-vv-as="t('password')"
                    >
                    <input 
                        v-else
                        type="password" 
                        name="password" 
                        v-model="ghost.password" 
                        placeholder="Password" 
                        class="form-control"
                        v-validate="'required'"
                        :data-vv-as="t('password')"
                    >
                    <div class="input-group-append" @click="togglePassword()">
                        <span class="input-group-text" v-if="showPassword">
                          <i class="feather icon-eye-off"></i>
                        </span>
                        <span class="input-group-text pointer" v-else>
                          <i class="feather icon-eye"></i>
                        </span>
                    </div>
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
        showPassword: false,
    }),

    computed: {},

    methods: {
        togglePassword () {
            this.showPassword = !this.showPassword
        },
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
                this.isLoading = false
                let data = response.data
                AuthService.setUser(data)
                AuthService.setToken(data.key)
                ApiService.setToken(data.key)
                this.closeAllModals()
                this.emitSignin()
            }
            
        },

        signup () {
            this.$emit('signup')
            setTimeout(() => {
                $('#signInModal').modal('hide')
            }, 150)
        },

        emitSignin () {
            this.$emit('signin')
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
