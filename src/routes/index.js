import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/organizations/organization'
// import File from '@/views/files/file'
import Home from '@/views/home/home'
// import Users from '@/views/users/users'
// import UserLogs from '@/views/users/logs/logs'
// import Files from '@/views/files/files'
// import Search from '@/views/search/search'
// import FilesSearch from '@/views/search/search'
// import Profile from '@/views/users/profile'
// import UserActions from '@/views/users/user-actions'
// import Settings from '@/views/settings/settings'
// import Organization from '@/views/organizations/organization'
// import Organizations from '@/views/organizations/organizations'
// import Metadatas from '@/views/metadatas/metadatas'
// import Logs from '@/views/organizations/logs/logs'
// import Connectors from '@/views/organizations/connectors/connectors'
// import Connector from '@/views/organizations/connectors/connector'
// import Subscriptions from '@/views/subscriptions/subscriptions'
// import DisplayFile from '@/views/search/viewers/display-file'
// import DisplayDocument from '@/views/search/viewers/display-file'
import LandingPage from '@/views/landing/landing'
import SignUpWelcome from '@/views/auth/signup/welcome'
import SignUpStepOne from '@/views/auth/signup/steps/step-one'
import SignUpStepTwo from '@/views/auth/signup/steps/step-two'
import SignUpStepThree from '@/views/auth/signup/steps/step-three'
import SignUpStepFour from '@/views/auth/signup/steps/step-four'

import Guard from '@/services/middleware'
import AuthSignin from '@/views/auth/signin'
import AuthPasswordForgot from '@/views/auth/password-forgot'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        { path: '/', name: 'home', component: Home, beforeEnter: Guard.auth },
        { path: '/signin', name: 'signin', component: AuthSignin, beforeEnter: Guard.guest  },
        { path: '/landing', name: 'landing', component: LandingPage, beforeEnter: Guard.guest  },
        { path: '/signup/welcome', name: 'signup-welcome', component: SignUpWelcome, beforeEnter: Guard.guest  },
        { path: '/signup/step/one', name: 'signup-step-one', component: SignUpStepOne, beforeEnter: Guard.guest  },
        { path: '/signup/step/two', name: 'signup-step-two', component: SignUpStepTwo, beforeEnter: Guard.guest  },
        { path: '/signup/step/three', name: 'signup-step-three', component: SignUpStepThree, beforeEnter: Guard.guest  },
        { path: '/signup/step/four', name: 'signup-step-four', component: SignUpStepFour, beforeEnter: Guard.guest  },
        { path: '/password-forgot', name: 'password-forgot', component: AuthPasswordForgot, beforeEnter: Guard.guest  },

        // { path: '/search', name: 'search', component: Search, beforeEnter: Guard.auth  },
        //
        { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: Guard.guest  },
        // { path: '/dashboard/connectors', name: 'connectors-dash', component: Connectors, beforeEnter: Guard.auth  },
        // { path: '/dashboard/connectors/:id', name: 'connector-dash', component: Connector, beforeEnter: Guard.auth  },
        // { path: '/dashboard/logs', name: 'logs-dash', component: Logs, beforeEnter: Guard.auth  },
        // { path: '/dashboard/metadata', name: 'metadata-dash', component: Metadatas, beforeEnter: Guard.auth  },
        //
        // { path: '/advanced/search', name: 'advanced-search', component: Search, beforeEnter: Guard.auth  },
        // { path: '/documents/filtering', name: 'documents-filtering', component: Search, beforeEnter: Guard.auth  },
        // { path: '/settings', name: 'settings', component: Settings, beforeEnter: Guard.auth  },
        //
        // { path: '/users', name: 'users', component: Users, beforeEnter: Guard.auth  },
        // { path: '/profile', name: 'profile', component: Profile, beforeEnter: Guard.auth  },
        // { path: '/user-logs', name: 'user-logs', component: UserLogs, beforeEnter: Guard.auth  },
        // { path: '/users/:id/actions', name: 'user-actions', component: UserActions, beforeEnter: Guard.auth  },
        //
        // { path: '/files', name: 'files', component: Files, beforeEnter: Guard.auth  },
        // { path: '/files/search', name: 'files-search', component: FilesSearch, beforeEnter: Guard.auth  },
        // { path: '/files/:id', name: 'file', component: File, beforeEnter: Guard.auth  },
        // { path: '/files/:id/content/:file', parent: 'file', name: 'file-content', component: File, beforeEnter: Guard.auth  },
        // { path: '/files/:id/content/:file/content/:item', name: 'file-content-item', component: File, beforeEnter: Guard.auth  },
        //
        // { path: '/organizations/connectors', name: 'connectors', component: Connectors, beforeEnter: Guard.auth  },
        // { path: '/organizations/connectors/:id', name: 'connector', component: Connector, beforeEnter: Guard.auth  },
        // { path: '/organizations/:id/metadata', name: 'metadata', component: Metadatas, beforeEnter: Guard.auth  },
        // { path: '/organizations/logs', name: 'logs', component: Logs, beforeEnter: Guard.auth  },
        //
        // { path: '/organizations', name: 'organizations', component: Organizations, beforeEnter: Guard.auth  },
        // { path: '/organizations/:id', name: 'organization', component: Organization, beforeEnter: Guard.auth  },
        //
        // { path: '/subscriptions', name: 'subscriptions', component: Subscriptions, beforeEnter: Guard.auth  },
        // { path: '/file/:id/display', name: 'display-file', component: DisplayFile, beforeEnter: Guard.auth  },
        // { path: '/document/:id/display', name: 'display-document', component: DisplayDocument, beforeEnter: Guard.auth  },
        // { path: '/copy/:id/link', name: 'copy-link', component: DisplayFile, beforeEnter: Guard.auth  },
    ]
})
