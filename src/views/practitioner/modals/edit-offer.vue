<template lang="html">
    <main-modal 
        :id="'edit OfferModal'"
        :title="'Modify an offer'"
    >
        <div class="">
            <form class="_form" @submit.prevent="edit()">
                <div class="form-group">
                    <label for="title">Offer title</label>
                    <input type="text" name="title" v-model="ghost.title" placeholder="Offer title" class="form-control-modal">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" v-model="ghost.description" cols="30" rows="5" class="form-control-modal"></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Offer price</label>
                    <input type="number" name="price" v-model="ghost.price" placeholder="Offer price" class="form-control-modal">
                </div>
                <div class="form-group">
                    <label for="image">Upload offer image</label>
                    <input type="file" name="image" id="image" class="form-control-modal">
                </div>
                <button type="submit" class="btn btn-secondary uppercase">Save</button>

                <!-- <div class="link mt-20">Have an account? <span @click="signin()" class="primary pointer">Sign In</span></div> -->
            </form>
        </div>
    </main-modal>
</template>

<script>
import ApiService from '@/services/api'
import AuthService from '@/services/auth'
export default {
    name: 'AddOfferModal',

    data: () => ({
        ghost: {
            title: '',
            description: '',
            price: '',
            image: ''
        },
    }),

    computed: {},

    methods: {
        edit () {
            this.$emit('edited')
            setTimeout(() => {
                $('#editOfferModal').modal('hide')
            }, 150)
        },

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
