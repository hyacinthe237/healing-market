import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import NotFound from '@/views/core/errors/notfound'
import PractitionerDetails from '@/views/core/services/details'
import CoreBody from '@/views/core/body'
import SignUp from '@/views/core/auth/signup'
import AuthSignin from '@/views/core/auth/signin'
import AuthPasswordForgot from '@/views/core/auth/password-forgot'

import ClientDashboard from '@/views/client/dashboard/dashboard'
import ClientBooking from '@/views/client/booking/booking'
import ClientMessages from '@/views/client/messages/messages'
import ClientSettings from '@/views/client/settings/settings'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', component: CoreBody, name: 'landing' },
        { path: '/signin', component: AuthSignin, name: 'signin' },
        { path: '/signup', component: SignUp, name: 'signup', beforeEnter: Guard.guest },
        { path: '/password-forgot', component: AuthPasswordForgot, name: 'password-forgot', beforeEnter: Guard.guest },
        { path: '/practitioner/details', component: PractitionerDetails, name: 'practitioner-details' },

        { path: '/client/dashboard', name: 'client-dashboard', component: ClientDashboard },
        { path: '/client/booking', name: 'client-booking', component: ClientBooking },
        { path: '/client/messages', name: 'client-messages', component: ClientMessages },
        { path: '/client/settings', name: 'client-settings', component: ClientSettings },

        { path: '*', component: NotFound }
    ]
})
