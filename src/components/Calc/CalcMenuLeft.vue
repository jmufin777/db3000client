<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
     <div style="font-size:100%; height:100%" class="white lighten-5 pt-0 " >
     <v-overflow-btn slot="obsah"
      :items="MenuLeft"
      hide-details
      class="pa-0 d-flex"
      @change="MenuRet"
      value="Tisk"

    ></v-overflow-btn>
        <slot name="obsah">
         <!-- Slot Menu Leve -->
       </slot>
      </div>

  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'

export default {
  props: {

  },
 data () {
   return {
      MenuLeft: [
       { text: 'Tisk'},
       { text: 'Dokoncovani'},
       { text: 'Materialy'},
       { text: 'Baleni'}
     ],
     MenuLeftJoin: [
       {key: 1 , text: 'Tisk'},
       {key: 2 , text: 'Dokoncovani'},
       {key: 3 , text: 'Materialy'},
       {key: 4 , text: 'Baleni'},
     ],
     nRet: -1

   }
 },
 methods: {
   MenuRet(a,b) {
     const self = this
     self.MenuLeftJoin.forEach(el => {
       if (el.text == a) {
         self.nRet = el.key
         return
       }
     })
     eventBus.$emit('MenuLeft',{key: self.nRet })
     //console.log(a ,"::: ", self.nRet)


   }
 }
}

</script>


<style scoped>
</style>


