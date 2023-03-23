import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import NotFound from '@/views/core/errors/notfound'
import PractitionerDetails from '@/views/core/services/details'
import CoreBody from '@/views/core/body'
import SignUp from '@/views/core/auth/signup'
import AuthSignin from '@/views/core/auth/signin'
import AuthPasswordForgot from '@/views/core/auth/password-forgot'

import Dashboard from '@/views/dashboard/dashboard'
import Booking from '@/views/booking/booking'
import Messages from '@/views/messages/messages'
import Team from '@/views/team/team'
import Schedule from '@/views/schedule/schedule'
import MySchedule from '@/views/schedule/my-schedule'
import Settings from '@/views/settings/settings'
import Timesheets from '@/views/timesheets/timesheets'
import MyTimesheet from '@/views/timesheets/my-timesheet'
import Profile from '@/views/team/profile'
import JobSite from '@/views/jobsites/jobsites'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', component: CoreBody, name: 'landing' },
        { path: '/signin', component: AuthSignin, name: 'signin' },
        { path: '/signup', component: SignUp, name: 'signup', beforeEnter: Guard.guest },
        { path: '/password-forgot', component: AuthPasswordForgot, name: 'password-forgot', beforeEnter: Guard.guest },
        { path: '/practitioner/details', component: PractitionerDetails, name: 'practitioner-details' },

        { path: '/dashboard', name: 'dashboard', component: Dashboard },
        { path: '/booking', name: 'booking', component: Booking },
        { path: '/messages', name: 'messages', component: Messages },
        { path: '/team', name: 'team', component: Team },
        { path: '/schedule', name: 'schedule', component: Schedule },
        { path: '/my/schedule', name: 'my-schedule', component: MySchedule },
        { path: '/settings', name: 'settings', component: Settings },
        { path: '/timesheets', name: 'timesheets', component: Timesheets },
        { path: '/my/timesheet', name: 'mytimesheet', component: MyTimesheet },
        { path: '/profile', name: 'profile', component: Profile },
        { path: '/jobsites', name: 'jobsites', component: JobSite },

        { path: '*', component: NotFound }
    ]
})
