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
                <div class="booking">
                  <div class="name">
                    <div class="primary bold">Maryjane A Henning</div>
                    <div class="secondary">Holistic Weellness Coach</div>
                  </div>
                  <div class="date">
                    <i class="feather icon-calendar"></i> 22.03.2023
                  </div>
                </div>
                <div class="booking empty">
                  No booking for the moment
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
  
      mounted () {},
  
      methods: { 
        
      }
  }
  </script>
  