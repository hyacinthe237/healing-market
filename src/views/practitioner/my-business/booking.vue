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
import Swal from 'sweetalert2'
  
  export default {
      data: () => ({
      }),

      mixins: [TherapistMixins],
      
      watch: { },
  
      mounted () {
    },

    methods: { 
      confirmLogOut () {
        Swal.fire({
            text: this.$translate.text("Are you sure you want to validate this booking?"),
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: this.$translate.text('No'),
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: this.$translate.text('Yes')
        }).then((result) => {
            if (result.value) {
                this.validateBooking()
            }
        })
      },

      async validateBooking () {
            this.startLoading()
    
            const res = await this.$api.get(`/booking-api/therapists/bookings`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.bookings = res.data
            }
          },
    }
  }
  </script>
  