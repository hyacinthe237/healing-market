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
  
  export default {
      data: () => ({
          
      }),
  
      components: { WithdrawModal },
  
      mixins: [TherapistMixins],
      
      watch: { },
  
      mounted () {},
  
      methods: { 
        openWithdrawModal () {
            setTimeout(() => {
                $('#withdrawModal').modal('show')
            }, 150)
        },
      }
  }
  </script>
  