<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar></Practitioner-SideBar>
        <div class="droite">
            <div class="bookings">
                <div class="booking">
                  <div class="name">
                    <h5 class="primary bold">Maryjane A Henning</h5>
                    <div class="secondary">Holistic Weellness Coach</div>
                  </div>
                  <div class="date">
                    <i class="feather icon-calendar"></i> 22.03.2023
                  </div>
                </div>
                <div class="booking">
                  <div class="name">
                    <h5 class="primary bold">Maryjane A Henning</h5>
                    <div class="secondary">Holistic Weellness Coach</div>
                  </div>
                  <div class="date">
                    <i class="feather icon-calendar"></i> 22.03.2023
                  </div>
                </div>
                <div class="booking">
                  <div class="name">
                    <h5 class="primary bold">Maryjane A Henning</h5>
                    <div class="secondary">Holistic Weellness Coach</div>
                  </div>
                  <div class="date">
                    <i class="feather icon-calendar"></i> 22.03.2023
                  </div>
                </div>
                <div class="booking">
                  <div class="name">
                    <h5 class="primary bold">Maryjane A Henning</h5>
                    <div class="secondary">Holistic Weellness Coach</div>
                  </div>
                  <div class="date">
                    <i class="feather icon-calendar"></i> 22.03.2023
                  </div>
                </div>
                <div class="booking empty">
                  No booking for the moment
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
  import Navbar from '@/components/commons/frontend/header/nav'
  import Footer from '@/components/commons/frontend/footer/footer'
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  
  export default {
      data: () => ({
          payload: {},
          shifts: [],
          members: [],
          profil
      }),
  
      components: { Navbar, Footer },
  
      computed: {
         user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
         },
  
         isConnected () {
              return !_.isEmpty(this.user)
          }
      },
      
      watch: { },
  
      mounted () {},
  
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
      }
  }
  </script>
  