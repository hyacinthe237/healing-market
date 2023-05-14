<template lang="html">
  <div class="">
    <Navbar v-show="!isLoading"></Navbar>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'dashboard'" />

        <div id="page-content-wrapper">
            <div class="dashboard">
              <h2>Recent Booking</h2>
              <div class="bookings">
                <div class="booking empty" v-if="no_bookings">
                  No booking for the moment
                </div>
                <div 
                class="booking" 
                v-else
                v-for="booking in bookings"
                :key="booking.id"
              >
                <div class="name">
                  <div class="primary bold">{{ booking.therapist }}</div>
                  <div class="secondary">{{ booking.therapist_email }}</div>
                </div>
                <div class="date">
                  <i class="feather icon-calendar"></i> {{ booking.created_at | date }}
                </div>
              </div>
              </div>
            </div>
        </div>
    </div>
    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>

    <Footer :isConnected="isConnected"></Footer>
  </div>
</template>

<script>
import Sidebar from '@/components/commons/sidebar/sidebar'
import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '@/services/config'
import _ from 'lodash'

export default {
    data: () => ({
        payload: {},
        shifts: [],
        bookings: [],
    }),

    components: { Navbar, Sidebar, Footer },

    computed: {
       user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },

       isConnected () {
            return !_.isEmpty(this.user)
        },
      no_bookings () {
        return this.bookings.length == 0
      }
    },
    
    watch: { },

    mounted () {
      this.geBookings()
    },

    methods: { 
      async geBookings () {
        this.startLoading()

        const res = await this.$api.get(`/booking-api/clients/bookings`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.bookings = res.data.filter(b=> b.status == 'VALIDATED')
        }
      },
    }
}
</script>
