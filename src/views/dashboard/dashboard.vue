<template lang="html">
  <div class="">
      <Header v-show="!isLoading" />
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'dashboard'" />

        <div id="page-content-wrapper">
            <div class="dashboard">
              <div class="cards">

                <div class="card" v-show="isManager">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Team members</div>
                  </div>
                  <div class="droite"><i class="feather icon-users"></i></div>
                </div>

                <div class="card" v-show="isManager">
                  <div class="gauche">
                    <div class="number">45</div>
                    <div class="name">Clocked in</div>
                  </div>
                  <div class="droite"><i class="feather icon-user"></i></div>
                </div>

                <div class="card" v-show="isEmployee">
                  <div class="gauche">
                    <div class="number">02</div>
                    <div class="name">Active shifts</div>
                  </div>
                  <div class="droite"><i class="feather icon-file"></i>!</div>
                </div>

                <div class="card" v-show="isEmployee">
                  <div class="gauche">
                    <div class="number">00</div>
                    <div class="name">Completed shifts</div>
                  </div>
                  <div class="droite"><i class="feather icon-file"></i></div>
                </div>

                <div class="card" v-show="isEmployee">
                  <div class="gauche">
                    <div class="number">$00</div>
                    <div class="name">Actual earning</div>
                  </div>
                  <div class="droite"><i class="feather icon-user"></i></div>
                </div>
              </div>

              <div v-show="isManager">
                  <div class="_tabs mt-20">
                      <div class="nav nav-tabs bg" id="nav-tab" role="tablist">
                          <a class="nav-item nav-link" id="nav-upcoming-tab"
                              data-toggle="tab" href="#nav-upcoming" role="tab"
                              aria-controls="nav-upcoming">Now & Upcoming (1)</a>

                          <a class="nav-item nav-link" id="nav-completed-tab"
                              data-toggle="tab" href="#nav-completed" role="tab"
                              aria-controls="nav-completed">Completed (0)</a>
                      </div>
                  </div>

                  <div class="tab-content" id="nav-tabContent">
                      <div class="tab-pane fade" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab">
                          <div class="upcoming-box">
                            <div class="upcoming-item">
                              <div class="hour">5 pm</div>
                              <div class="avatar">AH</div>
                              <div class="content">
                                <div class="name">
                                  Abanda Hyacinthe
                                  <div class="time">Starts in 1hr 32m / 4:45 pm - 9:45 am</div>
                                </div>
                                <div class="more"><i class="feather icon-more-vertical"></i></div>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                        <div class="upcoming-box">
                          <div class="upcoming-item">
                            <div class="hour">5 pm</div>
                            <div class="avatar">AH</div>
                            <div class="content">
                              <div class="name">
                                Abanda Hyacinthe
                                <div class="time">Starts in 1hr 32m / 4:45 pm - 9:45 am</div>
                              </div>
                              <div class="more"><i class="feather icon-more-vertical"></i></div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="cards" v-show="isEmployee">
                <div class="schedule-item">
                  <div class="gauche">
                    <div class="label">Security officer</div>
                    <div class="time">10pm - 6am</div>
                    <div class="more mt-20">Views details</div>
                  </div>
                  <div class="droite"><i class="feather icon-message-square"></i></div>
                </div>
                
                <div class="schedule-item">
                  <div class="gauche">
                    <div class="label">Security officer</div>
                    <div class="time">10pm - 6am</div>
                    <div class="more mt-20">Views details</div>
                  </div>
                  <div class="droite"><i class="feather icon-message-square"></i></div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="_loader" v-show="isLoading">
      <Spinners></Spinners>
    </div>
  </div>
</template>

<script>
import Header from '@/components/commons/header/header'
import Sidebar from '@/components/commons/sidebar/sidebar'
import config from '../../services/config'

export default {
    data: () => ({
        payload: {}
    }),

    components: { Header, Sidebar },

    computed: {
       user () {
          return JSON.parse(localStorage.getItem(config.get('user')))
       },

       isManager () { return this.user.is_manager },
       isEmployee () { return this.user.is_employee },
    },
    
    watch: { },

    mounted () { 
      //this.getDoashboard()
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
    }
}
</script>
