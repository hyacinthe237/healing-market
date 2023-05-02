import mapsService from '@/services/maps'
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
        google: null,
        showAddress: false,
        ghost: {
            postcode: '',
            address: '',
            country: '',
            state: '',
            city: '',
        },
        map: null,
        image: '',
        options: {
            quality: 70,
            correctOrientation: true
        },

        camera: 'camera',
        platform: 'browser',
        offers: [],
        query: '',
        zipcode: '',
    }),

    components: {
        Navbar, Footer, GetStartedModal
    },

    mounted () {
        this.initGoogle()
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
        async getOffers () {
            this.startLoading()
    
            const res = await this.$api.get(`/market-api/offers/all-no-token`)
            .catch(error => {
                this.stopLoading()
                this.$swal.error('Sorry', error.response.data.error_message)
            })
    
            if (res) {
              this.stopLoading()
              console.log('offers', res.data)
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
              console.log('offers', res.data)
              this.offers = res.data.filter(o => o.status == 'Active')
            }
        },

        async initGoogle () {
            this.google = await mapsService()
            this.initAutocomplete()
        },

        initAutocomplete () {
            const _that = this
            let input = document.getElementById('address')
            let autocomplete = new this.google.maps.places.Autocomplete(input)
            autocomplete.setFields(['address_components', 'geometry', 'formatted_address'])

            autocomplete.addListener('place_changed', function() {
                const place = autocomplete.getPlace()
                const comp  = place.address_components
                console.log('place ==> ', place)
                _that.$set(_that.ghost, 'address', _that.extractAddress(comp))
                _that.$set(_that.ghost, 'city', _that.extractCity(comp))
                _that.$set(_that.ghost, 'state', _that.extractFields(comp, 'administrative_area_level_1', false))
                _that.$set(_that.ghost, 'country', _that.extractFields(comp, 'country'))
                _that.$set(_that.ghost, 'postcode', _that.extractFields(comp, 'postal_code'))
                _that.$set(_that.ghost, 'lat', place.geometry.location.lat())
                _that.$set(_that.ghost, 'lon', place.geometry.location.lng())
                _that.$set(_that.ghost, 'formatted_address', place.formatted_address)
            })
        },

        /**
         * Extract field from array
         *
         * @return {String}
         */
        extractFields(components, type, long = true) {
            return components.filter((component) => component.types.includes(type))
                .map((item) => item[long ? 'long_name' : 'short_name']).pop() || ''
        },

        /**
         * Extract address from components
         *
         * @return {String}
         */
        extractAddress(comp) {
            let house  = this.extractFields(comp, 'street_number')
            let street = this.extractFields(comp, 'route')
            street = street || this.extractFields(comp, 'sublocality_level_1')

            let str = house ? house + ' ' : ''
            str += street
            str = str == '' ? this.extractCity(comp) : str
            return str
        },

        /**
         * Find city from components
         *
         * @return {String}
         */
        extractCity (comp) {
            let city = this.extractFields(comp, 'locality')
            return city || this.extractFields(comp, 'administrative_area_level_2')
        },

        /**
         * Get static map URL
         *
         * @return {void}
         */
        async getMap () {
            let url = 'https://maps.googleapis.com/maps/api/staticmap?zoom=10&size=400x400'
            url += `&center=${this.activity.lat},${this.activity.lon}&maptype=roadmap`
            url += `&markers=color:green%7C${this.activity.lat},${this.activity.lon}`
            this.map = url += `&key=${this.$config.get('google_api_key')}`
        },
    }
}
