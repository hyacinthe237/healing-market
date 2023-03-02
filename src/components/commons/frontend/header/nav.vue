<template lang="html">
<!-- Header Start -->
  <VueScrollFixedNavbar>
    <header class="site-header">
      <div class="container">
          <div class="wrapper site-header__wrapper">
            <div class="site-header__start">
              <a href="#" class="brand"><img :src="logo" alt=""></a>
            </div>
            <div class="site-header__middle">
              <nav class="nav">
                <button class="nav__toggle" aria-expanded="false" type="button">
                  <i class="feather icon-align-justify"></i>
                </button>
                <ul class="nav__wrapper">
                  <li class="nav__item"><a href="#">Home</a></li>
                  <li class="nav__item"><a href="#">Product</a></li>
                  <li class="nav__item"><a href="#">Pricing</a></li>
                  <li class="nav__item"><a href="#">Contact us</a></li>
                  <li class="nav__item signin"><a href="#" @click="n('signin')" v-show="!isConnected">Signin</a></li>
                  <li class="nav__item signin"><a href="#" @click="n('dashboard')" v-show="isConnected">View dashboard</a></li>
                </ul>
              </nav>
            </div>
            <div class="site-header__end pointer" @click="n('dashboard')" v-show="isConnected">
              <a class="pointer"><span>View dashboard</span> <i class="feather icon-log-in"></i></a>
            </div>
            <div class="site-header__end pointer" @click="n('signin')" v-show="!isConnected">
              <a class="pointer"><span>Sign in</span> <i class="feather icon-log-in"></i></a>
            </div>
          </div>
      </div>
    </header>
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

  mounted () {
      let navToggle = document.querySelector(".nav__toggle");
      let navWrapper = document.querySelector(".nav__wrapper");

      navToggle.addEventListener("click", function () {
          if (navWrapper.classList.contains("active")) {
              this.setAttribute("aria-expanded", "false");
              this.setAttribute("aria-label", "menu");
              navWrapper.classList.remove("active");
          } else {
              navWrapper.classList.add("active");
              this.setAttribute("aria-label", "close menu");
              this.setAttribute("aria-expanded", "true");
          }
      });
  },

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
