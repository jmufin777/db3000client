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
//Material asi na nic
// import "@material/select/mdc-select";

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
import Dialog2 from '@/components/globals/Dialog2'
import DialogFrame from '@/components/globals/DialogFrame'
import MyTable from '@/components/globals/MyTable'
import TaBle from '@/components/globals/TaBle'
import TaBle2 from '@/components/globals/TaBle_v2'
import TaBle3 from '@/components/globals/TabLe_3leftfix'

import WinDow from '@/components/globals/WinDow'
import WinDowMale from '@/components/globals/WinDowMale'

import VueJsonPretty from 'vue-json-pretty'


import VueScrollingTable from "vue-scrolling-table"
Vue.component('vue-scrolling-table', VueScrollingTable)

import VueBarcode from 'vue-barcode'

import VueTextareaAutosize from 'vue-textarea-autosize'

//import $ from 'jquery-ui'
import $ from 'jquery'
//import jQuery from 'jquery'

import 'jquery-ui/themes/base/all.css';

window.$ = window.jQuery = $;
///Users/mares/Documents/node/fx/client/node_modules/jquery-ui/ui/widgets/datepicker.js

import timepicker from 'timepicker'
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import dialog from 'jquery-ui/ui/widgets/dialog';
import tooltip from 'jquery-ui/ui/widgets/tooltip';
import explode from 'jquery-ui/ui/effects/effect-explode';
import blind from 'jquery-ui/ui/effects/effect-blind';
import bounce from 'jquery-ui/ui/effects/effect-bounce';
import clip from 'jquery-ui/ui/effects/effect-clip';
import drop from 'jquery-ui/ui/effects/effect-drop';
import highlight from 'jquery-ui/ui/effects/effect-highlight';
import slide from 'jquery-ui/ui/effects/effect-slide';
import fade from 'jquery-ui/ui/effects/effect-fade';
import fold from 'jquery-ui/ui/effects/effect-fold';
import size from 'jquery-ui/ui/effects/effect-size';

// import dialog from 'jquery-ui/ui/widgets/dialog';

//window.jQuery = $
// import 'jquery-ui/ui/widgets/datepicker.js';
//require("jquery-ui/datepicker")
//import qq from 'jquery-ui'

//import 'jquery-ui/ui/widgets/datepicker.js';

Vue.use(VueTextareaAutosize)



Vue.component('panel', Panel)
Vue.component('panel2', Panel2)
Vue.component('win-dow', WinDow)
Vue.component('win-dow-male', WinDowMale)
Vue.component('dia-log', Dialog)
Vue.component('dia-log2', Dialog2)
Vue.component('dia-frame', DialogFrame)
Vue.component('my-table', MyTable)
Vue.component('ta-ble', TaBle)
Vue.component('ta-ble2', TaBle2)
Vue.component('ta-ble3', TaBle3)

// Vue.component('ram1', Ram1)
Vue.component('vue-json-pretty', VueJsonPretty)
Vue.component('barcode', VueBarcode)
//Vue.component('bar-code', VueBarCode)
// https://github.com/lindell/vue-barcode
//--format width height text font-options font text-align text-position text-margin font-size background lineColor margin margin-top margin-bottom margin-left margin-right display-value
// -- format : CODE128 EAN EAN-13 EAN-8 EAN-5 EAN-2 UPC (A) CODE39 ITF-14 MSI Pharmacode Codabar

import vSelect from 'vue-select'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

Vue.component('v-select', vSelect)
// main.js
Vue.config.productionTip = false

Vue.use(vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(ElementUI)


import VueHtmlToPaper from "vue-html-to-paper";

// ...
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};

Vue.use(VueHtmlToPaper, options);

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
