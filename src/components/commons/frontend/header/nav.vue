<template lang="html">
<!-- Header Start -->
  <VueScrollFixedNavbar>      
    <nav class="navbar navbar-expand-lg navbar-default bg-default">
      <div class="container-fluid">
      <a class="navbar-brand pointer" @click="n('landing')"><img :src="logo" alt=""></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="feather icon-align-justify"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul :class="['navbar-nav mr-auto', isSearchPage ? '' : 'padding']">
          <li class="nav-item" v-if="isLandingPage">
            <a class="nav-link pointer nowrap" @click="toggleMenus()">
              Browse Services
              <i class="feather icon-chevron-down" v-show="!showMenus"></i>
              <i class="feather icon-chevron-up" v-show="showMenus"></i>
            </a>
          </li>
          <li class="nav-item pointer" v-if="isTherapist">
            <a :class="['nav-link', isPractitionerDashboardPage ? 'active' : '']"  @click="n('practitioner-dashboard')">Dashboard</a>
          </li>
          <li class="nav-item dropdown" v-if="isTherapist">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My business
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item pointer" @click="n('practitioner-booking')">Booking</a>
              <a class="dropdown-item pointer" @click="n('practitioner-wallet')">Wallet</a>
              <a class="dropdown-item pointer" @click="n('practitioner-offer-stat')">Offer stat</a>
            </div>
          </li>
          <li class="nav-item pointer" v-if="isTherapist">
            <a :class="['nav-link', isPractitionerAnalyticsPage ? 'active' : '']" @click="n('practitioner-analytics')">Analytics</a>
          </li>
        </ul>

        <vue-inline-form 
          @search="emitSearch" 
          v-if="isSearchPage && !showMenus"
        ></vue-inline-form>
        
        <ul class="navbar-nav" v-if="isTherapist">
          <li class="nav-item">
            <a class="nav-link pointer">
              <i class="feather icon-help-circle"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer" @click="n('practitioner-messages')">
              <i class="feather icon-message-square"></i>
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link pointer">
              <i class="feather icon-bell"></i>
            </a>
          </li>

          <li class="nav-item" @click="confirmLogOut()">
            <a class="nav-link pointer">
              <i class="feather icon-log-out"></i>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link pointer">
              <img :src="profil" alt="" style="width:30px; height:30px; border-radius:30px;margin-left:70px;">
            </a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="isLandingPage && !isConnected && !showMenus">
          <li class="nav-item">
            <a class="nav-link pointer nowrap" @click="n('signin')">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-primary pointer nowrap" @click="n('signup')">List your practice</a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="isClient">
          <li class="nav-item">
            <a class="nav-link pointer nowrap" @click="n('client-settings')">
              <img :src="profil" alt="" style="width:30px; height:30px; border-radius:30px;margin-right:10px;">
              Welcome <span class="bold">{{name}}</span>
            </a>
          </li>
        </ul>
      </div>
      
      </div>
    </nav>
    <div class="large-menu bg-white" v-if="showMenus">
      <div class="container">
        <div class="row mb-20">
            <div class="col-sm-3 pointer black" v-for="category in cats" 
            :key="category.id" @click="selectCat(category)">{{ category.label }}</div>
        </div>
    </div>
    </div>    
  </VueScrollFixedNavbar>
</template>

<script>
import logo from '@/assets/img/healing/logo.svg'
import profil from '@/assets/img/healing/profil-homme.png'
import config from '../../../../services/config'
import Swal from 'sweetalert2'
import _ from 'lodash'

export default {
  props: {
    isSearching: {  type: Boolean, default: false },
    role: {  type: String, default: 'client' },
    categories: { type: Array, default: () => []  },
    search: { type: Object, default: () => {}  },
  },
  data: () => ({
    logo, profil,
    showMenus: false,
    cats: []
  }),

  watch: {
    search: {
      immediate: true,
      handler: function (val) {
        if(val) {
          this.ghost = Object.assign({}, val)
        }
      }
    }
  },

  computed: {
    user () {
      return JSON.parse(localStorage.getItem(config.get('user')))
    },

    isConnected () {
      return !_.isEmpty(this.user)
    },

    name () {
      return this.user.first_name || '...'
    },

    isTherapist () {
      return this.isConnected && this.user.is_therapist
    },

    isClient () {
      return  this.isConnected && this.user.is_client
    },

    isLandingPage () {
      return this.$route.name == 'landing' 
      || this.$route.name == 'practitioner-details'
      || this.$route.name == 'search'
    },

    isSearchPage () {
      return  this.$route.name == 'search'
    },

    isClientDashboardPage () {
      return this.$route.name == 'client-dashboard'
    },

    isClientBookingPage () {
      return this.$route.name == 'client-booking'
    },

    isClientMessagesPage () {
      return this.$route.name == 'client-messages'
    },

    isClientSettingsPage () {
      return this.$route.name == 'client-settings'
    },
    
    isPractitionerDashboardPage () {
      return this.$route.name == 'practitioner-dashboard'
    },

    isPractitionerBookingPage () {
      return this.$route.name == 'practitioner-booking'
    },

    isPractitionerMessagesPage () {
      return this.$route.name == 'practitioner-messages'
    },

    isPractitionerWalletPage () {
      return this.$route.name == 'practitioner-wallet'
    },

    isPractitionerAnalyticsPage () {
      return this.$route.name == 'practitioner-analytics'
    },

    isPractitionerOfferStatPage () {
      return this.$route.name == 'practitioner-offer-stat'
    },

    isPractitioner () {
      return this.isPractitionerDashboardPage 
        || this.isPractitionerBookingPage 
        || this.isPractitionerMessagesPage 
        || this.isPractitionerWalletPage
        || this.isPractitionerAnalyticsPage
        || this.isPractitionerOfferStatPage

    }
  },

  mounted () {
    this.getCats()
  },

  methods: {
    confirmLogOut () {
      Swal.fire({
          // title: this.$translate.text('Are you sure ?'),
          text: this.$translate.text("Are you sure you want to log out?"),
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: this.$translate.text('No'),
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: this.$translate.text('Yes')
      }).then((result) => {
          if (result.value) {
              this.signout()
          }
      })
    },

    signout () {
      this.$auth.logout()
    },

    emitSearch () {
      this.$emit('search', this.ghost)
    },

    toggleMenus () {
      this.showMenus = !this.showMenus
      // this.$emit('toggleMenus', this.showMenus)
    },

    selectCat (category) {
      console.log('category', category)
      this.ghost.query = category.label
      this.showMenus = !this.showMenus
      this.emitSearch()
    },

    async getCats () {
      this.startLoading()

      const res = await this.$api.get(`/market-api/categories/`)
      .catch(error => {
          this.stopLoading()
          this.$swal.error('Sorry', error.response.data.error_message)
      })

      if (res) {
        this.stopLoading()
        this.cats = res.data.reverse()
      }
    },
  }
}
</script>
