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
                        <Practitioner-Offers :items="offers"></Practitioner-Offers>

                        <div class="add-block mt-20" @click="openAddOfferModal()">
                            <i class="feather icon-plus-circle"></i>
                            <p>Create new offer</p>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="nav-completed" role="tabpanel" aria-labelledby="nav-completed-tab">
                        <Practitioner-Offers :items="offers"></Practitioner-Offers>
                    </div>
                </div>
            </div>
        </div>
          
      </div>
      <div class="_loader" v-show="isLoading">
        <Spinners></Spinners>
      </div>
  
      <AddCategoryModal 
        @added="saveCategory" 
        :categories="categories"
      ></AddCategoryModal>

      <AddTagModal @added="getTags"></AddTagModal>
      <EditTagModal @edited="getTags" :tag="payload"></EditTagModal>

      <AddOfferModal @added="saveOffer"></AddOfferModal>
      <Footer :isConnected="isConnected"></Footer>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/commons/frontend/header/nav'
  import Footer from '@/components/commons/frontend/footer/footer'
  import config from '@/services/config'
  import _ from 'lodash'
  import profil from '@/assets/img/healing/profil-homme.png'
  import AddOfferModal from '../modals/add-offer'
  import AddCategoryModal from '../modals/categories/add'
  import AddTagModal from '../modals/tags/add'
  import EditTagModal from '../modals/tags/edit'
  
  export default {
      data: () => ({
          payload: {},
          offers: [],
          categories: [],
          therapist_categories: [],
          therapist_tags: [],
          profil
      }),
  
      components: { Navbar, Footer, AddOfferModal, AddCategoryModal, AddTagModal, EditTagModal },
  
      computed: {
         user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
         },
  
         isConnected () {
              return !_.isEmpty(this.user)
          }
      },
      
      watch: { },
  
      mounted () {
        this.getOffers()
        this.getTherapistCategories()
        this.getCategories()
        this.getTags()
      },
  
      methods: { 
        async getOffers () {
          this.startLoading()
  
          const res = await this.$api.get(`/market-api/therapists/offers`)
          .catch(error => {
              this.stopLoading()
              this.$swal.error('Sorry', error.response.data.error_message)
          })
  
          if (res) {
            this.stopLoading()
            console.log('offers', res.data)
            this.offers = res.data
          }
        },

        async saveOffer (data) {
            this.isLoading = true
            let formData = new FormData()
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('price', data.price)
            formData.append('therapist', this.user.therapist_id)
            formData.append('image', data.image)

            const response = await this.$api.post('/market-api/offers/', formData)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('Sorry', error.response.data.message)
                })
            
            
            if (response) {
                this.isLoading = false
                this.$swal.success('Success', 'New offer added')
                this.getOffers()                  
            }            
        },

        async saveCategory (data) {
            this.isLoading = true

            const response = await this.$api.post('/market-api/therapists/add-categories/', data)
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('Sorry', error.response.data.error.message)
                })
            
            
            if (response) {
                this.isLoading = false
                this.$swal.success('Success', 'New category added')
                this.getCategories()                  
            }            
        },

        async getTags () {
            this.isLoading = true

            const response = await this.$api.get('/market-api/tag-providers/')
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('Sorry', error.response.data.message)
                })
            
            
            if (response) {
                this.isLoading = false
                this.therapist_tags = response.data.results           
            }            
        },

        async getTherapistCategories () {
            this.isLoading = true

            const response = await this.$api.get('/market-api/therapists/categories/')
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('sorry', error.response.data.error.message)
                })
            
            
            if (response) {
                this.isLoading = false
                this.therapist_categories = response.data                  
            }            
        },

        async getCategories () {
            this.isLoading = true

            const response = await this.$api.get('/market-api/categories/')
                .catch(error => {
                    this.isLoading = false
                    console.log('error => ', error.response.data.error)
                    this.$swal.error('sorry', error.response.data.error.message)
                })
            
            
            if (response) {
                this.isLoading = false
                this.categories = response.data.results                  
            }            
        },

        openAddOfferModal () {
            setTimeout(() => {
                $('#addOfferModal').modal('show')
            }, 150)
        },

        openAddCategoryModal () {
            setTimeout(() => {
                $('#addCategoryModal').modal('show')
            }, 150)
        },

        openAddTagModal () {
            setTimeout(() => {
                $('#addTagModal').modal('show')
            }, 150)
        },

        openEditTagModal (tag) {
            this.payload = tag
            setTimeout(() => {
                $('#editTagModal').modal('show')
            }, 150)
        },
      }
  }
  </script>
  