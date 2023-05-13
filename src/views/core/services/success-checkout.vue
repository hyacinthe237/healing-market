<template>
    <div>
        <section class="home mt-20" v-show="!isLoading">
            <div class="block">
                <div class="message text-justify bold">
                  Hello {{ nom_user }}, your booking are successfully paid 🤜🏿😊</div>

                <div class="content-profile-photo mt-60">
                    <div class="photo">
                        <i class="feather icon-check"></i>
                    </div>
                </div>

                <div class="mt-60 text-center">
                    <button class="btn btn-primary br-100" @click="nouvelle()">
                        Back to home page
                    </button>
                </div>
            </div>
        </section>
        <div class="_loader" v-show="isLoading">
            <Spinners></Spinners>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        nom_user () {
            return localStorage.getItem('booking').booker
        }
    },
    mounted () {
        this.$router.push({ name: 'success' , query: {redirect_status: this.$route.query.redirect_status } })
        this.chargeBooking()
    },

    methods: {
        async chargeBooking () {
            this.startLoading()
            let payload = {
                'status': this.$route.query.redirect_status,
                'booking_id': localStorage.getItem('booking').id
            }
            const response = await this.$api.post(`/booking-api/bookings/charge-confirm`, payload)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Sorry', error.response.data.message)
                })

                if (response) {
                    this.stopLoading()
                }
        },

        nouvelle () {
            this.$router.push({ name: 'home' })
            localStorage.removeItem('booking')
        }
    },
}
</script>
