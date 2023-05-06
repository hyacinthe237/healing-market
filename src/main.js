window._ = require('lodash')
window.moment = require('moment')
window.$ = window.jQuery = require('jquery')


import 'bootstrap'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import vueAutosize from 'vue-autosize'
import VueTranslate from 'vue-translate-plugin'
import VueOffline from 'vue-offline'
import VuePageTransition from 'vue-page-transition'
import Multiselect from 'vue-multiselect'
import VueScrollFixedNavbar from "vue-scroll-fixed-navbar"
import InputTag from 'vue-input-tag'
import VueDatePicker from '@mathieustan/vue-datepicker'

import 'bootstrap/dist/css/bootstrap.css';
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'


import App from './App.vue'
import router from './routes/'
import store from './store/'
import api from '@/plugins/api'
import auth from '@/plugins/auth'
import swal from '@/plugins/swal'
import config from '@/plugins/config'
import toastr from '@/plugins/toastr'
import { french } from '@/assets/i18n'

import Spinners from '@/components/commons/loaders/spinners'
import VErrorComponent from '@/components/commons/error/v-error'
import MainModal from '@/components/commons/modals/main-modal'
import PractitionerSideBar from '@/components/commons/practitioner/practitioner-sidebar'
import PractitionerOffers from '@/components/commons/offers/offers'
import Messages from '@/components/commons/messages/messages'

// eslint-disable-next-line
import globalMixins from '@/mixins/global'
import messagesEn from 'vee-validate/dist/locale/en.js'

global.$ = $
window.eventBus = new Vue()

require('./filters')
require('./components/ui')

Vue.use(api)
Vue.use(auth)
Vue.use(swal)
Vue.use(config)
Vue.use(toastr)
Vue.use(VueOffline)
Vue.use(vueAutosize)
Vue.use(VueTranslate)
Vue.locales({ french })
Vue.mixin(globalMixins)
Vue.use(VuePageTransition)
Vue.use(VueScrollFixedNavbar)
Vue.use(VueDatePicker, {
  lang: 'en'
})
Vue.use(VeeValidate, { locale: 'en', dictionary: { en: messagesEn } })

Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)
Vue.component('Spinners', Spinners)
Vue.component('v-error', VErrorComponent)
Vue.component('main-modal', MainModal)
Vue.component('Practitioner-SideBar', PractitionerSideBar)
Vue.component('Practitioner-Offers', PractitionerOffers)
Vue.component('messages-component', Messages)
Vue.component('input-tag', InputTag)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
