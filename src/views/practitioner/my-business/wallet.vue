<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar
            @addCategory="openAddCategoryModal"
            @addTag="openAddTagModal"
            @selectedTag="openEditTagModal"
            @manageCalendar="manageCalendarModal"
            :categories="therapist_categories"
            :tags="therapist_tags"
            :currentUser="currentUser"
        ></Practitioner-SideBar>
        <div class="droite">
            <div class="wallet-box">
                <div class="titre">
                    <h3>Wallet</h3>
                    <button class="btn btn-secondary" @click="openWithdrawModal()">Withdraw</button>
                </div>

                <div class="balance">
                    <div class="label">Balance</div>
                    <div class="value">
                        <h2>${{ balance }}</h2>
                        <i class="feather icon-credit-card"></i>
                    </div>
                </div>

                <div class="activities mt-40">
                    <h5>Recent activity</h5>

                    <div class="_head mt-10">
                        <vue-month-carousel @searchMonth="getData"></vue-month-carousel>
                        <div class="search mr-3">
                            <input type="text" v-model="ghost.search" placeholder="Define your search">
                        </div>
                        <div class="btn btn-secondary" @click="toggleType()">{{ btnTest }}</div>
                    </div>

                    <div class="withdraws mt-10" v-for="(t, index) in transactions" :key="index++" v-show="showType">
                        <h4>{{ t.created_at | dat }}</h4>
                        <div class="withdraw" v-for="item in t.items" :key="item.id">
                            <div class="id">
                                <div class="name">Withdraw credited <span>{{ item.id }}</span></div>
                                <div class="date">{{ item.created_at | dat }}</div>
                            </div>                            
                            <div :class="['montant', item.cash_flow]">
                                <span class="bold">$ {{ parseAmount(item.amount) }}</span>
                                <i class="feather icon-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                    <div class="withdraws mt-10" v-show="!showType">
                        <div class="withdraw" v-for="item in requests" :key="item.id">
                            <div class="id">
                                <div class="name">Withdraw debited <span>{{ item.id }}</span></div>
                                <div class="date">
                                    {{ item.created_at | dat }} | 
                                    <span class="primary">Status: {{ item.status }}</span>
                                </div>
                                
                            </div>                            
                            <div class="montant OUT">
                                <span class="bold">- $ {{ parseAmount(item.amount) }}</span>
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
  
      <WithdrawModal @nexted="getData"></WithdrawModal>
      <AddCategoryModal 
        @added="getCategories" 
        :categories="categories"
      ></AddCategoryModal>

      <AddTagModal @added="getTags"></AddTagModal>
      <EditTagModal @edited="getTags" :tag="payload"></EditTagModal>
      <AddAvailabilityModal @added="getAvailabilities"></AddAvailabilityModal>
      <Footer :isConnected="isConnected"></Footer>
    </div>
  </template>
  
  <script>
  import WithdrawModal from '../modals/withdraw'
  import TherapistMixins from '../mixins'
  import moment from 'moment'
  
  export default {
      data: () => ({
          balance: 0,
          transactions: [],
          requests: [],
          currentMonth: moment().month()+1,
          showType: true,
      }),
  
      components: { WithdrawModal },
  
      mixins: [TherapistMixins],
      
      computed: {
        btnTest () {
            return this.showType ? 'Display Money Requests' : 'Display Booking transactions'
        }
      },
  
      mounted () {
        this.getData()
      },
  
      methods: { 
        openWithdrawModal () {
            setTimeout(() => {
                $('#withdrawModal').modal('show')
            }, 150)
        },

        toggleType () {
            this.showType = !this.showType
        },
        
        getData (month=null) {
            var payload = {}
            if (month == null) {
                payload = { month: this.currentMonth }
            }

            if (month !== null) {
                let i = month+1
                payload = { month: i }
            }
            this.getMyWallet()
            this.getGroupTransactions(payload)
            this.getMoneyRequests(payload)
        },

        async getMyWallet () {
            this.startLoading()
    
            const res = await this.$api.get(`/user-api/get-my-wallet`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.balance = Number.parseFloat(res.data.amount).toFixed(2) || 0
            }
        },

        parseAmount (amount) {
           return Number.parseFloat(amount).toFixed(2)
        },

        async getGroupTransactions (payload) {
            this.startLoading()    
            const res = await this.$api.get(`/user-api/group-transactions/`, { params: payload })
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.transactions = res.data.results
            }
        },

        async getMoneyRequests (payload) {
            this.startLoading()    
            const res = await this.$api.get(`/user-api/money-requests/`, { params: payload })
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.requests = res.data.results
            }
        },
      }
  }
  </script>
  