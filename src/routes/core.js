import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import Body from '@/views/core/body'
// import Home from '@/views/home/home'
import LandingPage from '@/views/landing/landing'
import AuthRoot from '@/views/core/auth/root'


export default {
    path: '/',
    component: Body,
    beforeEnter: Guard.guest,
    children: [
        { path: 'landing', component: LandingPage, name: 'landing' },
        { path: 'signin', component: AuthSignin, name: 'signin' },
        { path: 'password-forgot', component: AuthPasswordForgot, name: 'password-forgot' },
        { path: 'signup/welcome', component: SignUpWelcome, name: 'signup-welcome' },
        { path: 'signup/step/one', component: SignUpStepOne, name: 'signup-step-one' },
        { path: 'signup/step/two', component: SignUpStepTwo, name: 'signup-step-two' },
        { path: 'signup/step/three', component: SignUpStepThree, name: 'signup-step-three' },
        { path: 'signup/step/four', component: SignUpStepFour, name: 'signup-step-four' },
    ]
}
