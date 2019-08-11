import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import Desktop from '@/components/Desktop'
import Testy from '@/components/_Testy/testy'
import TestMenu from '@/components/_Testy/TestMenu.vue'

import List2Index from '@/components/List2Index.vue'
import List2IndexDodVyr from '@/components/List2IndexDodVyr.vue'
import List2IndexMat from '@/components/List2IndexMat.vue'
import List2IndexStroj from '@/components/List2IndexStroj.vue'
import List2MatBarevnost from '@/components/List2MatBarevnost.vue'

import List2StrojSkup from '@/components/List2StrojSkup.vue'
import List2MatPotisknutelnost from '@/components/List2MatPotisknutelnost.vue'

import DevDoc from '@/components/dev/DevDoc.vue'
import DevPP from '@/components/dev/DevPP.vue'
import DevPPKalc from '@/components/dev/DevPPKalc.vue'


import ListUsers from '@/components/ListUsers.vue'
import Old1 from '@/components/dev/Old_1.vue'

import MenuSchema from '@/components/MenuSchema.vue'
import ListModules from '@/components/ListModules.vue'
import MenuAdminIndex from '../components/MenuAdminIndex.vue'
import Calc from '../components/Calc/CalcIndex.vue'
import CalcCol from '../components/Calc/CalcWorkCol.vue'
import ListFirma from '@/components/ListFirmaView.vue'

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
      path: '/col/:id',
      name: 'col',
      component: CalcCol
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
      path: '/list2-matbarevnost',
      name: 'list2-matbarevnost',
      component: List2MatBarevnost
    },
    {
      path: '/list2-strojskup',
      name: 'list2-strojskup',
      component: List2StrojSkup
    },
    {
      path: '/list2-index',
      name: 'list2-index',
      component: List2Index
    },
    {
      path: '/list2-index-dodvyr',
      name: 'list2-index-dodvyr',
      component: List2IndexDodVyr
    },
    {
      path: '/list2-index-mat',
      name: 'list2-index-mat',
      component: List2IndexMat
    },
    {
      path: '/list2-index-stroj',
      name: 'list2-index-stroj',
      component: List2IndexStroj
    },
    {
      path: '/list2-matpotisknutelnost',
      name: 'list2-matpotisknutelnost',
      component: List2MatPotisknutelnost
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
    },
    {
      path: '/calc',
      name: 'Calc',
      component: Calc
    },
    {
      path: '/firma/:id',
      name: 'firma',
      component: ListFirma
    }






  ]
})
