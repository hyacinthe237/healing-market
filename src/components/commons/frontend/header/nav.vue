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
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-if="isLandingPage">
            <a class="nav-link" href="#">Browse Services <span class="sr-only">(current)</span></a>
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
              <img :src="profil" alt="" style="width:45px; height:45px; border-radius:45px;margin-right:10px;">
              Wellcome <span class="bold">Hyacinthe</span>
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

    isPractitioner () {
      return this.role == 'practitioner'
    },

    isLandingPage () {
      return this.$route.name == 'landing'
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
  },
}
</script>
