import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '@/services/config'
import _ from 'lodash'
import profil from '@/assets/img/healing/profil-homme.png'
import AddOfferModal from './modals/add-offer'
import AddCategoryModal from './modals/categories/add'
import AddTagModal from './modals/tags/add'
import EditTagModal from './modals/tags/edit'

export default {
    data: () => ({
        profil,
        therapistId: '',
        currentUser: {},
        payload: {},
        offers: [],
        categories: [],
        therapist_categories: [],
        therapist_tags: [],
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

    mounted () {
        this.getOffers()
        this.getUser()
        this.getCategories()
        this.getTags()
    },

    methods: {
        async getUser () {
            this.startLoading()
    
            const res = await this.$api.get(`/user-api/therapists/${this.user.therapist_id}/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })
    
            if (res) {
              this.stopLoading()
              console.log('data', res.data.properties)
              this.therapistId = res.data.id
              this.currentUser = res.data.properties
              this.therapist_categories = res.data.properties.categories
            }
        },

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
  
              const response = await this.$api.get('/market-api/therapists/categories')
                  .catch(error => {
                      this.isLoading = false
                      console.log('error => ', error.response.data.error)
                      this.$swal.error('sorry', error.response.data.error.message)
                  })
              
              
              if (response) {
                  this.isLoading = false
                  this.therapist_categories = response.data.properties.categories                  
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
