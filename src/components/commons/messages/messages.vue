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
                <div 
                    class="discussion message-active"
                    v-for="chat in chats"
                    :key="chat.id"
                    @click="selectChat(chat)"
                >
                    <div class="photo" style="background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);">
                    <!-- <div class="online"></div> -->
                    </div>
                    <div class="desc-contact">
                        <p class="name nowrap">{{ chat.name }}</p>
                        <p class="message">{{ chat.messages? chat.messages.slice(-1) : '' }}</p>
                    </div>
                    <div class="timer" v-if="chat.messages.length">
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
                    <div class="name">{{ selected.name }}</div>
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
            <form class="_form" v-show="displaychat" @submit.prevent="sendMessage()">
                <div class="input-group">
                <input 
                    type="text" 
                    class="form-control" 
                    name="message" 
                    v-model="ghost.message" 
                    placeholder="Type your message here"
                />
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
            selected: {},
            ghost: { message: ''},
            displaychat: false,
            connection: null,
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
            this.displaychat = false
        },

        methods: { 
            async getChats () {
                this.startLoading()

                const res = await this.$api.get(`/chat-api/`)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('Sorry Chats', error.response.data.chat.messages)
                })

                if (res) {
                    this.stopLoading()
                    this.$store.commit('chats/SET_CHATS', res.data.results)
                }
            },

            async getChat (id) {
                this.startLoading()

                const res = await this.$api.get(`/chat-api/${id}`)
                .catch(error => {
                    this.stopLoading()
                    this.$swal.error('SorryChat ', error.response.data.detail)
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
                    this.$swal.error('Sorry Last Message', error.response.data.detail)
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
                    this.$swal.error('Sorry Contacts', error.response.data.etail)
                })

                if (res) {
                    this.stopLoading()
                    this.$store.commit('chats/SET_CONTACTS', res.data)
                }
            },

            selectChat (chat) {
                this.displaychat = true
                this.selected = chat
                this.connection = new WebSocket(`${config.get('web_socket_root')}${chat.name}`)
            },

            sendMessage () {
                if (this.ghost.message == '') {
                    this.$swal.error('Validation warning', 'Fill the message')
                }
                if (this.ghost.message !== '') {
                    // const socket = new WebSocket(`${config.get('web_socket_root')}${this.selected.name}`)

                    let data = {
                    command: 'new_message', 
                        from: this.clientEmail,
                        message: this.ghost.image,
                        chatId: this.selected.id 
                    }
                    console.log(this.connection)
                    this.connection.send(data)
                }
            }
        },

        created: function() {
            console.log("Starting connection to WebSocket Server")
            this.connection = new WebSocket(`${config.get('web_socket_root')}${this.selected.name}`)

            this.connection.onmessage = function(event) {
                console.log(event);
            }

            this.connection.onopen = function(event) {
                console.log(event)
                console.log("Successfully connected to the echo websocket server...")
            }

        }
  }
  </script>
  