<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar></Practitioner-SideBar>
        <div class="droite">
            <div class="wallet-box">
                <div class="titre">
                    <h3>Wallet</h3>
                    <button class="btn btn-secondary" @click="openWithdrawModal()">Withdraw</button>
                </div>

                <div class="balance">
                    <div class="label">Balance</div>
                    <div class="value">
                        <h2>$ 100</h2>
                        <i class="feather icon-credit-card"></i>
                    </div>
                </div>

                <div class="activities mt-40">
                    <h5>Recent activity</h5>

                    <div class="_head mt-10">
                        <div class="month">
                            <i class="feather icon-chevron-left"></i>
                            <span>March</span>                            
                            <i class="feather icon-chevron-right"></i>
                        </div>
                        <div class="search">
                            <input type="text" v-model="ghost.search" placeholder="Define your search">
                        </div>
                    </div>

                    <div class="withdraws mt-10">

                        <div class="withdraw">
                            <div class="id">
                                <div class="name">Withdraw <span>B0c30000FD</span></div>
                                <div class="date">Wen. 15.03.2023</div>
                            </div>                            
                            <div class="montant">
                                <span class="bold secondary">$ 10</span>
                                <i class="feather icon-chevron-right"></i>
                            </div>
                        </div>
                        <div class="withdraw">
                            <div class="id">
                                <div class="name">Withdraw <span>B0c30000FD</span></div>
                                <div class="date">Wen. 15.03.2023</div>
                            </div>                            
                            <div class="montant">
                                <span class="bold secondary">$ 10</span>
                                <i class="feather icon-chevron-right"></i>
                            </div>
                        </div>
                        <div class="withdraw">
                            <div class="id">
                                <div class="name">Withdraw <span>B0c30000FD</span></div>
                                <div class="date">Wen. 15.03.2023</div>
                            </div>                            
                            <div class="montant">
                                <span class="bold secondary">$ 10</span>
                                <i class="feather icon-chevron-right"></i>
                            </div>
                        </div>
                        <div class="withdraw">
                            <div class="id">
                                <div class="name">Withdraw <span>B0c30000FD</span></div>
                                <div class="date">Wen. 15.03.2023</div>
                            </div>                            
                            <div class="montant">
                                <span class="bold secondary">$ 10</span>
                                <i class="feather icon-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="filter">
                    <i class="feather icon-chevron-left"></i>                    
                    <i class="feather icon-chevron-right"></i>
                </div>
            </div>
        </div>
          
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  
      <WithdrawModal></WithdrawModal>
      <Footer :isConnected="isConnected"></Footer>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/commons/frontend/header/nav'
  import Footer from '@/components/commons/frontend/footer/footer'
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  import WithdrawModal from '../modals/withdraw'
  
  export default {
      data: () => ({
          payload: {},
          shifts: [],
          members: [],
          profil
      }),
  
      components: { Navbar, Footer, WithdrawModal },
  
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

        openWithdrawModal () {
            setTimeout(() => {
                $('#withdrawModal').modal('show')
            }, 150)
        },
      }
  }
  </script>
  