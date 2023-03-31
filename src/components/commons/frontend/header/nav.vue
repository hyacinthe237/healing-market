<template lang="html">
<!-- Header Start -->
  <VueScrollFixedNavbar>      
    <nav class="navbar navbar-expand-lg navbar-default bg-default">
      <div class="container">
      <a class="navbar-brand pointer" @click="n('landing')"><img :src="logo" alt=""></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="feather icon-align-justify"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto padding">
          <li class="nav-item" v-if="isLandingPage">
            <a class="nav-link" href="#">Browse Services <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item pointer" v-if="isPractitioner">
            <a :class="['nav-link', isPractitionerDashboardPage ? 'active' : '']"  @click="n('practitioner-dashboard')">Dashboard</a>
          </li>
          <li class="nav-item dropdown" v-if="isPractitioner">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              My business
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item pointer" @click="n('practitioner-booking')">Booking</a>
              <a class="dropdown-item pointer" @click="n('practitioner-wallet')">Wallet</a>
              <a class="dropdown-item pointer" @click="n('practitioner-offer-stat')">Offer stat</a>
            </div>
          </li>
          <li class="nav-item pointer" v-if="isPractitioner">
            <a :class="['nav-link', isPractitionerAnalyticsPage ? 'active' : '']" @click="n('practitioner-analytics')">Analytics</a>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="isPractitioner">
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
          <li class="nav-item">
            <a class="nav-link pointer">
              <img :src="profil" alt="" style="width:40px; height:40px; border-radius:40px;margin-left:70px;">
            </a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="isLandingPage">
          <li class="nav-item">
            <a class="nav-link pointer" @click="n('signin')">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-primary pointer" @click="n('signup')">List your practice</a>
          </li>
        </ul>

        <ul class="navbar-nav" v-if="isClientDashboardPage || isClientBookingPage || isClientMessagesPage || isClientSettingsPage">
          <li class="nav-item">
            <a class="nav-link pointer">
              <img :src="profil" alt="" style="width:40px; height:40px; border-radius:40px;margin-right:10px;">
              Welcome <span class="bold">Hyacinthe</span>
            </a>
          </li>
        </ul>
      </div>
      
      </div>
    </nav>
  </VueScrollFixedNavbar>
</template>

<script>
import logo from '@/assets/img/healing/logo.svg'
import profil from '@/assets/img/healing/profil-homme.png'
import config from '../../../../services/config';
import _ from 'lodash'

export default {
  props: {
    role: {
      type: String, default: 'client'
    }
  },
  data: () => ({
    logo, profil
  }),

  mounted () {
  },

  computed: {
    user () {
      return JSON.parse(localStorage.getItem(config.get('user')))
    },

    isConnected () {
      return !_.isEmpty(this.user)
    },

    isClient () {
      return this.role == 'client'
    },

    isLandingPage () {
      return this.$route.name == 'landing' || this.$route.name == 'practitioner-details'
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
}
</script>
