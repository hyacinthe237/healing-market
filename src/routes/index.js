import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'
import Dashboard from '@/views/organizations/organization'
import NotFound from '@/views/core/errors/notfound'
import CoreBody from '@/views/core/body'
import SignUpWelcome from '@/views/core/auth/signup/welcome'
import SignUpStepOne from '@/views/core/auth/signup/steps/step-one'
import SignUpStepTwo from '@/views/core/auth/signup/steps/step-two'
import SignUpStepThree from '@/views/core/auth/signup/steps/step-three'
import SignUpStepFour from '@/views/core/auth/signup/steps/step-four'
import AuthSignin from '@/views/auth/signin'
import AuthPasswordForgot from '@/views/auth/password-forgot'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', component: CoreBody, name: 'landing' },
        { path: '/signin', component: AuthSignin, name: 'signin' },
        { path: '/password-forgot', component: AuthPasswordForgot, name: 'password-forgot' },
        { path: '/signup/welcome', component: SignUpWelcome, name: 'signup-welcome' },
        { path: '/signup/step/one', component: SignUpStepOne, name: 'signup-step-one' },
        { path: '/signup/step/two', component: SignUpStepTwo, name: 'signup-step-two' },
        { path: '/signup/step/three', component: SignUpStepThree, name: 'signup-step-three' },
        { path: '/signup/step/four', component: SignUpStepFour, name: 'signup-step-four' },
        { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: Guard.guest  },

        { path: '*', component: NotFound }
    ]
})
