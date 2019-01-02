<template>
  <div style="height:400px">
    <my-layout>

    <div slot="hlavni">
      <menu-hlavni></menu-hlavni>
    </div>

    <menu-left slot="menuleft"></menu-left>

     <work slot="kalkulace" v-for="na in 2" :key="na">
        <span slot="leva">
          <work-left>
            <span slot="obsah">
             </span>
          </work-left>
        </span>
     </work>

      <prehled slot="prehled" v-for="nb in 150" :key="nb">
        <span slot="obsah">
          Modul Prehledu {{nb}}
        </span>
     </prehled>



    </my-layout>




  </div>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import MyLayout from './CalcMyLayout.vue'
import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue'

import Work from './CalcWork.vue'       // Pracovni cast nahore
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore

import Prehled from './CalcPrehled.vue' // Prehledova dole





export default {
 components: {
   'prehled': Prehled,
    'menu-left': MenuLeft,
    'my-layout': MyLayout,
    'work': Work,
    'work-left': WorkLeft,
    'menu-hlavni': MenuHlavni
 },
 data () {

   return {

     Hlavni: 0,
     Left: 0,



   }

 },

 created () {
      const self = this
//      alert('Tvorim')
     eventBus.$off('MenuHlavni')
     eventBus.$off('MenuLeft')
     //eventBus.$off()
     eventBus.$on('MenuHlavni', (server) => {
      self.Hlavni=server.key
    })
     eventBus.$on('MenuLeft', (server) => {
      self.Left=server.key
    })

 },
 mounted () {
    //alert('ahoj')
 },
 beforeEnter: (to, from, next) => {
 //  this.$destroy()
 }
}

</script>

<style >

.v-list__tile__title {

  font-size:13px;

  padding: 0;
}

.v-list__tile--input .v-select__selection .v-select__selection--comma {
  /*
  font-size:20px !important;
  height: 14px !important;
  */

}
.v-label .theme--light .v-input__slot .v-select__slot .v-label .theme--light .v-select__selections {
  font-size:22px !important;
  height: 14px !important;

}
.v-list__tile {

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    font-weight: 100;
    height: 25px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

}
.v-overflow-btn .v-input__append-inner {
    width: 18px !important;
    height: 18px  !important;
    -ms-flex-item-align: auto;
    align-self: auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0;
    padding: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

div .v-select__slot {
  height: 22px !important;
  background: lightblue;
  padding: 0px 0px 0px 0px ;



}

input {
    width: 100%;
    height: 14px;
    font-size: 12px;

    margin: 0px;
}
.v-overflow-btn .v-select__selections {
    width: 100%;
    height: 12px;
    font-size: 12px;

    margin: 0px;
    padding: 0px;
}
</style>


