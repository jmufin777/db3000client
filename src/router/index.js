import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Desktop from '@/components/Desktop'
import Testy from '@/components/_Testy/testy'
import TestMenu from '@/components/_Testy/TestMenu.vue'
import List2Barevnost2 from '@/components/List2BarevnostTab2.vue'

import DevDoc from '@/components/dev/DevDoc.vue'
import DevPP from '@/components/dev/DevPP.vue'
import DevPPKalc from '@/components/dev/DevPPKalc.vue'


import ListUsers from '@/components/ListUsers.vue'
import Old1 from '@/components/dev/Old_1.vue'

import MenuSchema from '@/components/MenuSchema.vue'
import ListModules from '@/components/ListModules.vue'
import MenuAdminIndex from '@/components/MenuAdminIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login-update',
      name: 'login-update',
      component: Login
    },

    {
      path: '/desktop/:ktery',
      name: 'desktop',
      component: Desktop
    },
    {
      path: '/old/1',
      name: 'old-1',
      force: true,
      component: Old1
    },
    {
      path: '/menu-schema',
      name: 'menu-schema',
      component: MenuSchema
    },
    {
      path: '/menu-admin',
      name: 'menu-admin',
      component: MenuAdminIndex
    },
    {
      path: '/testy',
      name: 'testy',
      component: Testy
    },
    {
      path: '/testmenu',
      name: 'testmenu',
      component: TestMenu
    },
    {
      path: '/list2-barevnost2',
      name: 'list2-barevnost2',
      component: List2Barevnost2
    },
    {
      path: '/list-modules',
      name: 'list-modules',
      component: ListModules
    },
    {
      path: '/dev-pp',
      name: 'dev-pp',
      component: DevPP
    },
    {
      path: '/dev-pp-kalc',
      name: 'dev-pp-kalc',
      component: DevPPKalc
    },
    {
      path: '/dev-doc',
      name: 'dev-doc',
      component: DevDoc
    },
    {
      path: '/set/list-users',
      name: 'list-users',
      component: ListUsers
    }



  ]
})
