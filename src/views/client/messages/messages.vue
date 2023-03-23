<template lang="html">
  <div class="">
    <Navbar></Navbar>
    <div id="wrapper" v-show="!isLoading">
        <Sidebar :current="'messages'" />

        <div id="page-content-wrapper">
          <div class="messages">
              <section class="discussions">
                <div class="search">
                  <div class="searchbar">
                    <i class="feather icon-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search..."></input>
                  </div>
                </div>
                <div class="discussions-list">
                  <div class="discussion message-active">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <!-- <div class="online"></div> -->
                    </div>
                    <div class="desc-contact">
                      <p class="name">Megan Leib</p>
                      <p class="message">9 pm at the bar if possible 😳</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(http://e0.365dm.com/16/08/16-9/20/theirry-henry-sky-sports-pundit_3766131.jpg?20161212144602);">
                      <!-- <div class="online"></div> -->
                    </div>
                    <div class="desc-contact">
                      <p class="name">Dave Corlew</p>
                      <p class="message">Let's meet for a coffee or something today ?</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1497551060073-4c5ab6435f12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80);">
                    </div>
                    <div class="desc-contact">
                      <p class="name">Jerome Seiber</p>
                      <p class="message">I've sent you the annual report</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(http://thomasdaubenton.xyz/portfolio/images/photo.jpg);">
                      <!-- <div class="online"></div> -->
                    </div>
                    <div class="desc-contact">
                      <p class="name">Thomas Dbtn</p>
                      <p class="message">See you tomorrow ! 🙂</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1553514029-1318c9127859?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80);">
                    </div>
                    <div class="desc-contact">
                      <p class="name">Elsie Amador</p>
                      <p class="message">What the f**k is going on ?</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80);">
                    </div>
                    <div class="desc-contact">
                      <p class="name">Billy Southard</p>
                      <p class="message">Ahahah 😂</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
          
                  <div class="discussion">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);">
                      <!-- <div class="online"></div> -->
                    </div>
                    <div class="desc-contact">
                      <p class="name">Paul Walker</p>
                      <p class="message">You can't see me</p>
                    </div>
                    <div class="timer">
                      <span>14:00</span>
                      <div class="_notif mt-10">
                        <span>1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="chat">
                <div class="header-chat">
                  <div class="gauche">
                    <div class="photo"></div>
                    <div class="text">
                      <div class="name">Megan Leib</div>
                      <div class="on"><span></span> Online</div>
                    </div>
                  </div>
                  <div class="droite">
                    <!-- <div class="item-icon"><i class="feather icon-video"></i></div>
                    <div class="item-icon"><i class="feather icon-phone"></i></div>
                    <div class="item-icon"><i class="feather icon-more-vertical"></i></div> -->
                  </div>
                </div>
                <div class="messages-chat">
                  <div class="message">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <div class="online"></div>
                    </div>
                    <p class="text"> Hi, how are you ? </p>
                  </div>
                  <div class="message text-only">
                    <p class="text"> What are you doing tonight ? Want to go take a drink ?</p>
                  </div>
                  <p class="time"> 14h58</p>
                  <div class="message text-only">
                    <div class="response">
                      <p class="text"> Hey Megan ! It's been a while 😃</p>
                    </div>
                  </div>
                  <div class="message text-only">
                    <div class="response">
                      <p class="text"> When can we meet ?</p>
                    </div>
                  </div>
                  <p class="response-time time"> 15h04</p>
                  <div class="message">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <div class="online"></div>
                    </div>
                    <p class="text"> 9 pm at the bar if possible 😳</p>
                  </div>
                  <p class="time"> 15h09</p>
                  <div class="message">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <div class="online"></div>
                    </div>
                    <p class="text"> 9 pm at the bar if possible 😳</p>
                  </div>
                  <p class="time"> 15h09</p>
                  <div class="message">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <div class="online"></div>
                    </div>
                    <p class="text"> 9 pm at the bar if possible 😳</p>
                  </div>
                  <p class="time"> 15h09</p>
                  <div class="message">
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                      <div class="online"></div>
                    </div>
                    <p class="text"> 9 pm at the bar if possible 😳</p>
                  </div>
                  <p class="time"> 15h09</p>
                </div>
                <div class="footer-chat">
                  <form class="_form">
                    <div class="input-group">
                      <!-- <div class="icon">
                        <i class="feather icon-paperclip" aria-hidden="true"></i>
                      </div> -->
                      <input type="text" class="form-control" placeholder="Type your message here"/>
                    </div>
                  </form>
                </div>
              </section>
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
