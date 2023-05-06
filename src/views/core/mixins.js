import post1 from '@/assets/img/healing/post1.png'
import post2 from '@/assets/img/healing/post2.png'
import post3 from '@/assets/img/healing/post3.png'
import bg from '@/assets/img/healing/bg.png'
import circle from '@/assets/img/healing/image-circle.png'
import femme from '@/assets/img/healing/profil-femme.png'
import homme from '@/assets/img/healing/profil-homme.png'
import hero from '@/assets/img/healing/hero.png'
import Navbar from '@/components/commons/frontend/header/nav'
import Footer from '@/components/commons/frontend/footer/footer'
import config from '../../services/config'
import GetStartedModal from './modals/get-started'

export default {
    data: () => ({
        post1, post2, post3, circle, bg, femme, homme, hero,
        offers: [],
        therapists: [],
        categories: [],
        lists: [],
        query: '',
        zipcode: '',
        showMenus: false,        
        searching: false,
    }),

    components: {
        Navbar, Footer, GetStartedModal
    },

    mounted () {
        this.getCategories()
        this.getOffers()
        this.getTherapists()
    },

    computed: {
        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
        },

        search_query () {
            return this.$store.state.query
        },

        search_zipcode () {
            return this.$store.state.zipcode
        },

        searh_host () {
            return {
                query: this.search_query,
                zipcode: this.search_zipcode
            }
        },

        isConnected () {
            return !_.isEmpty(this.user)
        }
    },

    methods: {
        async getCategories () {
            this.startLoading()
    
            const res = await this.$api.get(`/market-api/categories/`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.categories = res.data
              this.lists = res.data.slice(0, 5)
            }
        },

        toggleMenus (value) {
            this.showMenus = value
        },

        async getOffers () {
            this.startLoading()
    
            const res = await this.$api.get(`/market-api/offers/all-no-token`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.offers = res.data.filter(o => o.status == 'Active')
            }
        },

        selectItem (label) {
            let data = {
                query: label,
                zipcode: ''
            }
            this.searchTherapists(data)
        },

        async getTherapists () {
            this.startLoading()

            const payload = {
                query: this.query,
                zipcode: this.zipcode
            }
    
            const res = await this.$api.get(`/market-api/search/therapists/`, payload)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.therapists = res.data.features
            }
        },

        async searchTherapists (data = null) {
            this.startLoading()

            let payload = {}
            if (data !== null) {
                payload = {
                    query: data.query,
                    zipcode: data.zipcode
                }
                this.$store.commit('SET_QUERY', data.query)
                this.$store.commit('SET_ZIP_CODE', data.zipcode)
            }

            if (data == null) {
                payload = {
                    query: this.query,
                    zipcode: this.zipcode
                }
                this.$store.commit('SET_QUERY', this.query)
                this.$store.commit('SET_ZIP_CODE', this.zipcode)
            }
    
            const res = await this.$api.get(`/market-api/search/therapists/`, payload)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              this.therapists = res.data.features
              this.n('search')
            }
        },
    }
}
