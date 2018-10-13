// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import { hasClass } from './funkce/fce'


import vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import store from '@/store/store'

// main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css' //
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loade

// import DlgDraggable from 'vue-element-dialog-draggable'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/cs-CZ'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

import draggable from 'vuedraggable'
import vuedraggableresizable from 'vue-draggable-resizable'
Vue.component('draggable', draggable)
Vue.component('vue-draggable-resizable',vuedraggableresizable )

//import VueFriendlyIframe from 'vue-friendly-iframe';
//Vue.component('vue-friendly-iframe', VueFriendlyIframe);

//import VueFrame from 'vue-frame'

import Panel from '@/components/globals/Panel'
import Panel2 from '@/components/globals/Panel2'
import Dialog from '@/components/globals/Dialog'

import WinDow from '@/components/globals/WinDow'

import VueJsonPretty from 'vue-json-pretty'


import VueScrollingTable from "vue-scrolling-table"
Vue.component('vue-scrolling-table', VueScrollingTable)

import VueBarcode from 'vue-barcode'



Vue.component('panel', Panel)
Vue.component('panel2', Panel2)
Vue.component('win-dow', WinDow)
Vue.component('dia-log', Dialog)
// Vue.component('ram1', Ram1)
Vue.component('vue-json-pretty', VueJsonPretty)
Vue.component('barcode', VueBarcode)
//Vue.component('bar-code', VueBarCode)
// https://github.com/lindell/vue-barcode
//--format width height text font-options font text-align text-position text-margin font-size background lineColor margin margin-top margin-bottom margin-left margin-right display-value
// -- format : CODE128 EAN EAN-13 EAN-8 EAN-5 EAN-2 UPC (A) CODE39 ITF-14 MSI Pharmacode Codabar



// main.js
Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(ElementUI)

sync(store, router)

// import g from '@/funkce/global.js'

export const eventBus = new Vue()




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
//    VueFrame,
//    VueFriendlyIframe,

  },

  template: '<App/>'
})
// var vm = new Vue({
//   data: {
//     // declare message with an empty value
//     message: ''
//   },
//   template: '<div>{{ message }}</div>'
// })
// // set `message` later
// vm.message = 'Hello!'
