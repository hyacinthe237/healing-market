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
            <div>
                <div class="_tabs mt-20">
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-upcoming-tab"
                            data-toggle="tab" href="#nav-upcoming" role="tab"
                            aria-controls="nav-upcoming">Active offers</a>

                        <a class="nav-item nav-link" id="nav-completed-tab"
                            data-toggle="tab" href="#nav-completed" role="tab"
                            aria-controls="nav-completed">Paused offers</a>
                    </div>
                </div>

                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade active show" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-upcoming-tab">
                        <Practitioner-Offers 
                            :items="offers"
                            @previewEvent="previewEvent"
                            @editEvent="editEvent"
                            @pauseEvent="confirmChangeStatus"
                            @statisticsEvent="statisticsEvent"
                            @shareEvent="shareEvent"
                        ></Practitioner-Offers>

                        <div class="add-block mt-20" @click="openAddOfferModal()">
                            <i class="feather icon-plus-circle"></i>
                            <p>Create new offer</p>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                      <Practitioner-Offers 
                        :items="pauseOffers"
                        @previewEvent="previewEvent"
                        @editEvent="editEvent"
                        @pauseEvent="confirmChangeStatus"
                        @statisticsEvent="statisticsEvent"
                        @shareEvent="shareEvent"
                      ></Practitioner-Offers>
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

      <AddOfferModal @added="getOffers" :categories="categories" :therapistId="therapistId"></AddOfferModal>
      <EditOfferModal 
        @edited="getOffers" 
        :categories="categories" 
        :therapistId="therapistId"
        :offer="payload"
      ></EditOfferModal>

      <PreviewOfferModal 
        :offer="payload"
      ></PreviewOfferModal>
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
  