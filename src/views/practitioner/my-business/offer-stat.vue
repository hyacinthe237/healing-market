<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar></Practitioner-SideBar>
        <div class="droite">
            <div>
                <div class="_tabs mt-20">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-upcoming-tab"
                            data-toggle="tab" href="#nav-upcoming" role="tab"
                            aria-controls="nav-upcoming">Active offers</a>

                        <a class="nav-item nav-link" id="nav-completed-tab"
                            data-toggle="tab" href="#nav-completed" role="tab"
                            aria-controls="nav-completed">Paused offers</a>
                    </div>
                </div>

                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade active show" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab">
                        <Practitioner-Offers :items="offers"></Practitioner-Offers>

                        <div class="add-block mt-20">
                            <i class="feather icon-plus-circle"></i>
                            <p>Create new offer</p>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                        <Practitioner-Offers :items="offers"></Practitioner-Offers>
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
  import Navbar from '@/components/commons/frontend/header/nav'
  import Footer from '@/components/commons/frontend/footer/footer'
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  
  export default {
      data: () => ({
          payload: {},
          offers: [
            {id: 1, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', price: 75},
            {id: 2, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', price: 75},
          ],
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
  