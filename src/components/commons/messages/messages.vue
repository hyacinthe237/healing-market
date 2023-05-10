<template lang="html">
    <div class="messages">
        <section class="discussions">
            <div class="search">
            <div class="searchbar">
                <i class="feather icon-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search..." />
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
            </div>
        </section>

        <section class="chat">
            <div class="header-chat" v-show="displaychat">
                <div class="gauche">
                    <div class="photo"></div>
                    <div class="text">
                    <div class="name">{{ name }}</div>
                    <div class="on"><span></span> Online</div>
                    </div>
                </div>
                <div class="droite">
                    <!-- <div class="item-icon"><i class="feather icon-video"></i></div>
                    <div class="item-icon"><i class="feather icon-phone"></i></div>
                    <div class="item-icon"><i class="feather icon-more-vertical"></i></div> -->
                </div>
            </div>
            <div class="messages-chat" v-show="displaychat">
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
            <form class="_form" v-show="displaychat">
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
  </template>
  
  <script>
  import config from '@/services/config'
  import _ from 'lodash'
  
  export default {
      data: () => ({
          payload: {},
          displaychat: false,
      }),
  
      components: { },
  
    computed: {
        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },

        name () {
            return this.isConnected ? this.user.first_name || this.user.email : ''
        },

        isConnected () {
            return !_.isEmpty(this.user)
        },

        last_message () {
            return this.$store.state.chats.last_message
        },
        chat () {
            return this.$store.state.chats.chat
        },
        chats () {
            return this.$store.state.chats.chats
        },
        contacts () {
            return this.$store.state.chats.contacts
        },
    },
      
      watch: { },
  
      mounted () {
        this.getChats()
        this.getLastMessage()
        this.getContacts()
      },
  
      methods: { 
        async getChats () {
            this.startLoading()

            const res = await this.$api.get(`/chat-api/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })

            if (res) {
            this.stopLoading()
            this.$store.commit('chats/SET_CHATS', res.data)
            }
        },

        async getChat (id) {
            this.startLoading()

            const res = await this.$api.get(`/chat-api/${id}`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })

            if (res) {
            this.stopLoading()
            this.$store.commit('chats/SET_CHAT', res.data)
            }
        },

        async getLastMessage () {
            this.startLoading()

            const res = await this.$api.get(`/chat-api/last-message/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })

            if (res) {
            this.stopLoading()
            this.$store.commit('chats/SET_LAST_MESSAGE', res.data)
            }
        },

        async getContacts () {
            this.startLoading()

            const res = await this.$api.get(`/chat-api/contacts/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })

            if (res) {
            this.stopLoading()
            this.$store.commit('chats/SET_CONTACTS', res.data)
            }
        },
      }
  }
  </script>
  