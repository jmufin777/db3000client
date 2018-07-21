import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Desktop from '@/components/Desktop'
import Testy from '@/components/_Testy/testy'
import TestMenu from '@/components/_Testy/TestMenu.vue'

import SetBarevnost from '@/components/ListUsers.vue'
import Old1 from '@/components/Old_1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/desktop',
      name: 'desktop',
      component: Desktop
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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/set/barevnost',
      name: 'set-barevnost',
      component: SetBarevnost
    },

    {
      path: '/set/users',
      name: 'set-users',
      component: SetBarevnost
    },
    {
      path: '/old/1',
      name: 'old-1',
      component: Old1
    }

  ]
})
