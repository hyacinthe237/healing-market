import Vue from 'vue'
import Router from 'vue-router'
import Guard from '@/services/middleware'
import Dashboard from '@/views/organizations/organization'
import NotFound from '@/views/core/errors/notfound'

import CoreRoutes from './core'

Vue.use(Router)

export default new Router({
    mode: 'history',

    routes: [
        CoreRoutes,
        { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: Guard.guest  },

        { path: '*', component: NotFound }
    ]
})
