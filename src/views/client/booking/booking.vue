<template lang="html">
  <div class="">
    <Navbar></Navbar>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'booking'" />

        <div id="page-content-wrapper">
            <div class="dashboard">
              <!-- <h2>Recent Booking</h2> -->
              <div class="bookings">
                  <div class="booking">
                    <div class="name">
                      <div class="primary bold">Maryjane A Henning</div>
                      <div class="secondary">Holistic Weellness Coach</div>
                    </div>
                    <div class="date">
                      <i class="feather icon-calendar"></i> 22.03.2023
                    </div>
                  </div>
                  <div class="booking">
                    <div class="name">
                      <div class="primary bold">Maryjane A Henning</div>
                      <div class="secondary">Holistic Weellness Coach</div>
                    </div>
                    <div class="date">
                      <i class="feather icon-calendar"></i> 22.03.2023
                    </div>
                  </div>
                  <div class="booking">
                    <div class="name">
                      <div class="primary bold">Maryjane A Henning</div>
                      <div class="secondary">Holistic Weellness Coach</div>
                    </div>
                    <div class="date">
                      <i class="feather icon-calendar"></i> 22.03.2023
                    </div>
                  </div>
                  <div class="booking">
                    <div class="name">
                      <div class="primary bold">Maryjane A Henning</div>
                      <div class="secondary">Holistic Weellness Coach</div>
                    </div>
                    <div class="date">
                      <i class="feather icon-calendar"></i> 22.03.2023
                    </div>
                  </div>
                  <!-- <div class="booking empty">
                    No booking for the moment
                  </div> -->
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
        members: [],
    }),

    components: { Navbar, Sidebar, Footer },

    computed: {
       user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },

       isConnected () {
            return !_.isEmpty(this.user)
        }
    },
    
    watch: { },

    mounted () {
      $(function(){
          // Enables popover
          $("[data-toggle=popover]").popover();
      });
      if (this.isEmployee) {
        this.getEmployeeDoashboard()
      }
      if (this.isManager) {
        this.getMembers()
      }
    },

    methods: { 
      async getDoashboard () {
        this.startLoading()

        const res = await this.$api.get(`/schedule-api/dashboard-event`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          console.log('members', res.data)
        }
      },

      async getMembers () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/manager-team-member`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('get members error', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.members = res.data.message.teamates.filter(m => m.id!== this.user.id)
        }
      },

      async getEmployeeDoashboard () {
        this.startLoading()

        const res = await this.$api.get(`/user-api/users/${this.user.id}/`)
        .catch(error => {
            this.stopLoading()
            this.$swal.error('Sorry', error.response.data.error_message)
        })

        if (res) {
          this.stopLoading()
          this.payload = Object.assign({}, res.data)
          this.shifts = res.data.shifts.slice(0,2)
        }
      },
    }
}
</script>
