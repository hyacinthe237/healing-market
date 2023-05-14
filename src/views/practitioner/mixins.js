import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '@/services/config'
import _ from 'lodash'
import profil from '@/assets/img/healing/profil-homme.png'
import AddOfferModal from './modals/add-offer'
import EditOfferModal from './modals/edit-offer'
import PreviewOfferModal from './modals/preview-offer'
import AddCategoryModal from './modals/categories/add'
import AddTagModal from './modals/tags/add'
import EditTagModal from './modals/tags/edit'
import AddAvailabilityModal from './modals/add-availability'
import Swal from 'sweetalert2'

export default {
    data: () => ({
        profil,
        therapistId: 1,
        currentUser: {},
        payload: {},
        offers: [],
        bookings: [],
        pauseOffers: [],
        categories: [],
        therapist_categories: [],
        therapist_tags: [],
        availabilities: [],
    }),

    components: { Navbar, Footer, AddOfferModal, AddCategoryModal, AddTagModal, EditTagModal, EditOfferModal, PreviewOfferModal, AddAvailabilityModal },

    computed: {
        user () {
           return JSON.parse(localStorage.getItem(config.get('user')))
        },
 
        isConnected () {
            return !_.isEmpty(this.user)
        },

        no_bookings () {
            return this.bookings.length == 0
        }
    },

    mounted () {
        this.getOffers()
        this.getUser()
        this.getCategories()
        this.getTags()
        this.getAvailabilities()
        this.geBookings()
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
              this.therapistId = res.data.id
              this.currentUser = res.data.properties
              this.ghost = res.data.properties
              this.therapist_categories = res.data.properties.categories
            }
        },

        async geBookings () {
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

        async getAvailabilities () {
            this.startLoading()
    
            const res = await this.$api.get(`/booking-api/availibilities/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error.message)
            })
    
            if (res) {
              this.stopLoading()
              this.availabilities = res.data.results
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
              this.offers = res.data.filter(o => o.status == 'Active')
              this.pauseOffers = res.data.filter(o => o.status !== 'Active')
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
                  this.categories = response.data                
              }            
          },
  
          openAddOfferModal () {
              this.selectedcats = this.categories
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

          previewEvent (item) {
                this.payload = item
                setTimeout(() => {
                    $('#previewOfferModal').modal('show')
                }, 150)
          },
            
            shareEvent (item) {
                console.log('share', item)
            },

            editEvent (item) {
                this.payload = item
                setTimeout(() => {
                    $('#editOfferModal').modal('show')
                }, 150)
            },

            manageCalendarModal () {
                setTimeout(() => {
                    $('#addAvailabilityModal').modal('show')
                }, 150)
            },

            async pauseEvent (item) {
                this.isLoading = true
  
                const response = await this.$api.post(`/market-api/offers/${item.id}/change-status`)
                    .catch(error => {
                        this.isLoading = false
                        console.log('error => ', error.response.data.error)
                        this.$swal.error('Sorry', error.response.data.error.message)
                    })
                
                
                if (response) {
                    this.isLoading = false
                    let status = item.status == 'Active' ? 'Pause' : 'Active'
                    this.$swal.success('Success', `The offer name's "${item.title}" status changed to "${status}"`)
                    this.getOffers()                  
                }
            },

            statisticsEvent (item) {
                console.log('statistics', item)
            },

            confirmChangeStatus (item) {
                let status = item.status == 'Active' ? 'Pause' : 'Active'
                Swal.fire({
                    // title: this.$translate.text('Are you sure ?'),
                    text: this.$translate.text(`Are you sure you want to ${status} the offer?`),
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: this.$translate.text('No'),
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: this.$translate.text('Yes')
                }).then((result) => {
                    if (result.value) {
                        this.pauseEvent(item)
                    }
                })
            },
    }
}
