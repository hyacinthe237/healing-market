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
          <li class="nav-item active">
            <a class="nav-link" href="#">Browse Services <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="#">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-primary pointer" @click="n('list-practice')">List your practice</a>
          </li>
        </ul>
      </div>
      
      </div>
    </nav>
  </VueScrollFixedNavbar>
</template>

<script>
import logo from '@/assets/img/healing/logo.svg'
import config from '../../../../services/config';
import _ from 'lodash'

export default {
  data: () => ({
    logo
  }),

  mounted () {},

  computed: {
    user () {
      return JSON.parse(localStorage.getItem(config.get('user')))
    },

    isConnected () {
      return !_.isEmpty(this.user)
    }
  },
}
</script>
