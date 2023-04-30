<template lang="html">
    <div class="">
      <Navbar></Navbar>
      <div class="practitioner-dashboard" v-show="!isLoading">
        
        <Practitioner-SideBar
            @addCategory="openAddCategoryModal"
            @addTag="openAddTagModal"
            @selectedTag="openEditTagModal"
            :categories="therapist_categories"
            :tags="therapist_tags"
            :currentUser="currentUser"
        ></Practitioner-SideBar>

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
                    <div class="th">Clicks</div>
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

      <AddCategoryModal 
        @added="getCategories" 
        :categories="categories"
      ></AddCategoryModal>

      <AddTagModal @added="getTags"></AddTagModal>
      <EditTagModal @edited="getTags" :tag="payload"></EditTagModal>
  
      <Footer :isConnected="isConnected"></Footer>
    </div>
  </template>
  
  <script>
  import money from '@/assets/img/healing/money.png'
  import moneys from '@/assets/img/healing/moneys.png'
  import TherapistMixins from '../mixins'
  
  export default {
      data: () => ({
          money, moneys
      }),

      mixins: [TherapistMixins],
      
      watch: { },
  
      mounted () {},
  
      methods: { 
        
      }
  }
  </script>
  