import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import NotFound from '@/views/core/errors/notfound'
import CoreBody from '@/views/core/body'
import SignUpWelcome from '@/views/core/auth/signup/welcome'
import SignUpStepOne from '@/views/core/auth/signup/steps/step-one'
import SignUpStepTwo from '@/views/core/auth/signup/steps/step-two'
import SignUpStepThree from '@/views/core/auth/signup/steps/step-three'
import SignUpStepFour from '@/views/core/auth/signup/steps/step-four'
import AuthSignin from '@/views/core/auth/signin'
import CompleteAccess from '@/views/core/auth/complete-access'
import AuthPasswordForgot from '@/views/core/auth/password-forgot'

import Dashboard from '@/views/dashboard/dashboard'
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
        { path: '/complete/access', component: CompleteAccess, name: 'complete-access' },
        { path: '/password-forgot', component: AuthPasswordForgot, name: 'password-forgot', beforeEnter: Guard.guest },
        { path: '/signup/welcome', component: SignUpWelcome, name: 'signup-welcome', beforeEnter: Guard.guest },
        { path: '/signup/step/one', component: SignUpStepOne, name: 'signup-step-one', beforeEnter: Guard.guest },
        { path: '/signup/step/two', component: SignUpStepTwo, name: 'signup-step-two', beforeEnter: Guard.guest },
        { path: '/signup/step/three', component: SignUpStepThree, name: 'signup-step-three', beforeEnter: Guard.guest },
        { path: '/signup/step/four', component: SignUpStepFour, name: 'signup-step-four', beforeEnter: Guard.guest },

        { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: Guard.auth },
        { path: '/team', name: 'team', component: Team, beforeEnter: Guard.auth },
        { path: '/schedule', name: 'schedule', component: Schedule, beforeEnter: Guard.auth },
        { path: '/my/schedule', name: 'my-schedule', component: MySchedule, beforeEnter: Guard.auth },
        { path: '/settings', name: 'settings', component: Settings, beforeEnter: Guard.auth },
        { path: '/timesheets', name: 'timesheets', component: Timesheets, beforeEnter: Guard.auth },
        { path: '/my/timesheet', name: 'mytimesheet', component: MyTimesheet, beforeEnter: Guard.auth },
        { path: '/profile', name: 'profile', component: Profile, beforeEnter: Guard.auth },
        { path: '/jobsites', name: 'jobsites', component: JobSite, beforeEnter: Guard.auth },

        { path: '*', component: NotFound }
    ]
})
