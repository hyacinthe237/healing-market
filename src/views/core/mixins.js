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
        query: '',
        zipcode: '',
        showMenus: false
    }),

    components: {
        Navbar, Footer, GetStartedModal
    },

    mounted () {
        this.getCategories()
        this.getOffers()
        this.searchTherapists()
    },

    computed: {
        categories () {
            return this.$store.state.lists['categories']
        },

        user () {
            return JSON.parse(localStorage.getItem(config.get('user')))
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

        async searchTherapists () {
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
    }
}
