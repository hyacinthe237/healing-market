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
        <messages-component></messages-component>
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
