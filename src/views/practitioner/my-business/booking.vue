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
          <div class="bookings">
            <div class="booking empty" v-if="no_bookings">
              <h1 class="uppercase">No booking for the moment</h1>
            </div>
             <div 
                class="booking" 
                v-else
                v-for="booking in bookings"
                :key="booking.id"
              >
                <div class="name">
                  <div class="primary bold">{{ booking.therapist }}</div>
                  <div class="secondary">{{ booking.therapist_email }}</div>
                </div>
                <div class="date">
                  <i class="feather icon-calendar"></i> {{ booking.created_at | date }}
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
      <AddAvailabilityModal @added="getAvailabilities"></AddAvailabilityModal>
      <Footer :isConnected="isConnected"></Footer>
    </div>
</template>
  
  <script>
  import TherapistMixins from '../mixins'
  
  export default {
      data: () => ({
      }),

      mixins: [TherapistMixins],
      
      watch: { },
  
      mounted () {
    },

    methods: { 
      
    }
  }
  </script>
  