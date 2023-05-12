<template lang="html">
    <main-modal 
        :id="'signUpModal'"
        :title="'Happy to have join our community'"
    >
        <div class="">
            <form class="_form" @submit.prevent="signup()" v-show="!isLoading">
                <div class="form-group">
                    <input 
                        type="text" 
                        name="first_name" 
                        v-model="ghost.first_name" 
                        placeholder="First name" 
                        class="form-control"
                        v-validate="'required'"
                        :data-vv-as="t('first name')"
                    >
                    <v-error :name="'first_name'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        name="last_name" 
                        v-model="ghost.last_name" 
                        placeholder="Last name" 
                        class="form-control"
                        v-validate="'required'"
                        :data-vv-as="t('last name')"
                    >
                    <v-error :name="'last_name'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group">
                    <input 
                        type="text" 
                        name="email" 
                        v-model="ghost.email" 
                        placeholder="Email" 
                        class="form-control"
                        v-validate="'required'"
                    >
                    <v-error :name="'email'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group">
                    <input 
                        type="number" 
                        name="phone" 
                        v-model="ghost.phone" 
                        placeholder="Phone" 
                        class="form-control"
                        v-validate="'required'"
                    >
                    <v-error :name="'phone'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group">
                    <input 
                        type="password" 
                        name="password1" 
                        v-model="ghost.password1" 
                        placeholder="Fill your password" 
                        class="form-control"
                        v-validate="'required'"
                        :data-vv-as="t('password')"
                    >
                    <v-error :name="'password1'" :err="errors" :show="showErrors"></v-error>
                </div>
                <div class="form-group">
                    <input 
                        type="password" 
                        name="password2" 
                        v-model="ghost.password2" 
                        placeholder="Confirm your password" 
                        class="form-control"
                        v-validate="'required|confirmed:password'"
                        :data-vv-as="t('password')"
                    >
                    <v-error :name="'password2'" :err="errors" :show="showErrors"></v-error>
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
            const isValid = await this.$validator.validate()
            if (!isValid) return false

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
            
        },
    }
}
</script>
