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
                        <div class="blocks">
                            <div class="block">
                                <div class="sharebox">
                                    <div class="share">
                                        <i class="feather icon-share-2"></i>
                                    </div>
                                </div>
                                <div class="bg-img"></div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                <div class="footer">
                                    <i class="feather icon-more-horizontal"></i>
                                    <span class="secondary bold">$ 75</span>
                                </div>
                            </div>
                            <div class="block">
                                <div class="sharebox">
                                    <div class="share">
                                        <i class="feather icon-share-2"></i>
                                    </div>
                                </div>
                                <div class="bg-img"></div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                <div class="footer">
                                    <i class="feather icon-more-horizontal"></i>
                                    <span class="secondary bold">$ 75</span>
                                </div>
                            </div>
                        </div>

                        <div class="add-block mt-20">
                            <i class="feather icon-plus-circle"></i>
                            <p>Create new offer</p>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                        <div class="blocks">
                            <div class="block">
                                <div class="sharebox">
                                    <div class="share">
                                        <i class="feather icon-share-2"></i>
                                    </div>
                                </div>
                                <div class="bg-img"></div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                <div class="footer">
                                    <i class="feather icon-more-horizontal"></i>
                                    <span class="secondary bold">$ 75</span>
                                </div>
                            </div>
                            <div class="block">
                                <div class="sharebox">
                                    <div class="share">
                                        <i class="feather icon-share-2"></i>
                                    </div>
                                </div>
                                <div class="bg-img"></div>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                <div class="footer">
                                    <i class="feather icon-more-horizontal"></i>
                                    <span class="secondary bold">$ 75</span>
                                </div>
                            </div>
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
  