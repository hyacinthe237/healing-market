import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'

import Body from '@/views/core/body'
// import Home from '@/views/home/home'
import LandingPage from '@/views/landing/landing'
import AuthRoot from '@/views/core/auth/root'
import SignUpWelcome from '@/views/core/auth/signup/welcome'
import SignUpStepOne from '@/views/core/auth/signup/steps/step-one'
import SignUpStepTwo from '@/views/core/auth/signup/steps/step-two'
import SignUpStepThree from '@/views/core/auth/signup/steps/step-three'
import SignUpStepFour from '@/views/core/auth/signup/steps/step-four'
import AuthSignin from '@/views/auth/signin'
import AuthPasswordForgot from '@/views/auth/password-forgot'

export default {
    path: '/',
    component: Body,
    beforeEnter: Guard.guest,
    children: [
        { path: 'landing', component: LandingPage, name: 'landing' },
        { path: 'signin', component: AuthSignin, name: 'signin' },
        { path: 'password-forgot', component: AuthPasswordForgot, name: 'password-forgot' },
        {
            path: 'signup',
            component: AuthRoot,
            children: [
                { path: 'welcome', component: SignUpWelcome, name: 'signup-welcome' },
                { path: 'step/one', component: SignUpStepOne, name: 'signup-step-one' },
                { path: 'step/two', component: SignUpStepTwo, name: 'signup-step-two' },
                { path: 'step/three', component: SignUpStepThree, name: 'signup-step-three' },
                { path: 'step/four', component: SignUpStepFour, name: 'signup-step-four' },
            ]
        },
    ]
}
