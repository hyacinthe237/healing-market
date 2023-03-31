<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar></Practitioner-SideBar>

        <div class="droite">
            <div class="stats">

                <div class="stat">
                  <div class="circle">
                    <img alt="" :src="money" width="25px" />
                  </div>
                  <div class="line"></div>
                  <div class="earning">
                    <div class="nowrap">Earning to date</div>
                    <h3 class="amount">$ 0</h3>
                  </div>
                </div>

                <div class="stat">
                  <div class="circle">
                    <i class="feather icon-calendar"></i>
                  </div>
                  <div class="line"></div>
                  <div class="earning">
                    <div class="nowrap">Total booking</div>
                    <h3 class="amount">$ 0</h3>
                  </div>
                </div>

                <div class="stat">
                  <div class="circle">
                    <img alt="" :src="moneys" width="40px" />
                  </div>
                  <div class="line"></div>
                  <div class="earning">
                    <div class="nowrap">Earning of the month</div>
                    <h3 class="amount">$ 0</h3>
                  </div>
                </div>

            </div>

            <div class="lists">
                <div class="head-list">
                    <div class="th">Active offers</div>
                    <div class="th">Click</div>
                    <div class="th">Booking</div>
                </div>
                <div class="body-list">
                    <div class="list-item">
                        <div class="td">
                            <div class="bg-img"></div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div class="td"><h3>0</h3></div>
                        <div class="td"><h3>0</h3></div>
                    </div>

                    <div class="list-item">
                        <div class="td">
                            <div class="bg-img"></div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                        <div class="td"><h3>2</h3></div>
                        <div class="td"><h3>2</h3></div>
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
  import money from '@/assets/img/healing/money.png'
  import moneys from '@/assets/img/healing/moneys.png'
  
  export default {
      data: () => ({
          payload: {},
          shifts: [],
          members: [],
          profil, money, moneys
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
  