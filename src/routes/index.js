import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import NotFound from '@/views/core/errors/notfound'
import PractitionerDetails from '@/views/core/services/details'
import SuccessCheckout from '@/views/core/services/success-checkout'
import CoreBody from '@/views/core/body'
import SignUp from '@/views/core/auth/signup'
import AuthSignin from '@/views/core/auth/signin'
import AuthPasswordForgot from '@/views/core/auth/password-forgot'
import Search from '@/views/core/search'

import ClientDashboard from '@/views/client/dashboard/dashboard'
import ClientBooking from '@/views/client/booking/booking'
import ClientMessages from '@/views/client/messages/messages'
import ClientSettings from '@/views/client/settings/settings'

// For Practitioner components
import PractitionerDashboard from '@/views/practitioner/dashboard/dashboard'
import PractitionerBooking from '@/views/practitioner/my-business/booking'
import PractitionerWallet from '@/views/practitioner/my-business/wallet'
import PractitionerOfferStat from '@/views/practitioner/my-business/offer-stat'
import PractitionerMessages from '@/views/practitioner/messages/messages'
import PractitionerAnalytics from '@/views/practitioner/analytics/analytics'
import PractitionerSettings from '@/views/practitioner/settings/settings'
import PractitionerManageCalendar from '@/views/practitioner/manage/calendar'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', component: CoreBody, name: 'landing' },
        { path: '/signin', component: AuthSignin, name: 'signin' },
        { path: '/signup', component: SignUp, name: 'signup' },
        { path: '/password-forgot', component: AuthPasswordForgot, name: 'password-forgot' },
        { path: '/search', component: Search, name: 'search' },

        { path: '/client/dashboard', name: 'client-dashboard', component: ClientDashboard, beforeEnter: Guard.auth },
        { path: '/client/booking', name: 'client-booking', component: ClientBooking, beforeEnter: Guard.auth },
        { path: '/client/messages', name: 'client-messages', component: ClientMessages, beforeEnter: Guard.auth },
        { path: '/client/settings', name: 'client-settings', component: ClientSettings, beforeEnter: Guard.auth },

        { path: '/practitioner/:id/:offer', component: PractitionerDetails, name: 'practitioner-details' },
        { path: '/checkout/success', name: 'success', component: SuccessCheckout },
        { path: '/practitioner/dashboard', name: 'practitioner-dashboard', component: PractitionerDashboard, beforeEnter: Guard.auth },
        { path: '/practitioner/booking', name: 'practitioner-booking', component: PractitionerBooking, beforeEnter: Guard.auth },
        { path: '/practitioner/messages', name: 'practitioner-messages', component: PractitionerMessages, beforeEnter: Guard.auth },
        { path: '/practitioner/analytics', name: 'practitioner-analytics', component: PractitionerAnalytics, beforeEnter: Guard.auth },
        { path: '/practitioner/wallet', name: 'practitioner-wallet', component: PractitionerWallet, beforeEnter: Guard.auth },
        { path: '/practitioner/offer/stat', name: 'practitioner-offer-stat', component: PractitionerOfferStat, beforeEnter: Guard.auth },
        { path: '/practitioner/settings', name: 'practitioner-settings', component: PractitionerSettings, beforeEnter: Guard.auth },
        { path: '/practitioner/manage/calendar', name: 'practitioner-manage-calendar', component: PractitionerManageCalendar, beforeEnter: Guard.auth },

        { path: '*', component: NotFound }
    ]
})
