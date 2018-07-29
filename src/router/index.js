import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Desktop from '@/components/Desktop'
import Testy from '@/components/_Testy/testy'
import TestMenu from '@/components/_Testy/TestMenu.vue'
import List2Barevnost from '@/components/List2Barevnost'

import ListUsers from '@/components/ListUsers.vue'
import Old1 from '@/components/Old_1.vue'
import MenuSchema from '@/components/MenuSchema.vue'
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
      path: '/list2-barevnost',
      name: 'list2-barevnost',
      component: List2Barevnost
    },
    {
      path: '/set/list-users',
      name: 'list-users',
      component: ListUsers
    }


  ]
})
