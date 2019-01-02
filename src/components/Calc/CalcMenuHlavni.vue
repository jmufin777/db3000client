
<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
      <div style="font-size:100%; height:100%" class="white lighten-5 pt-0 " >
        <slot name="obsah">
           <v-btn
           outline
           small
           color="indigo"
           v-for="(item , n ) in aHlavni" :key="n"
           :disabled="item.key == lastSend"
           @click="send(item.key)"
           v-bind:class="{'elevation-5': item.key !== lastSend }"
           >
             {{ item.value }}
             </v-btn>
             <v-btn
           outline
           small
           color="indigo"
           flat
           @click="send(11)"
           class="elevation-5"
           >
             <v-icon>fa-plus</v-icon>
             </v-btn>
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
     aHlavni:[
       {key: 1 , value: 'Velkoploch'},
       {key: 2 , value: 'Archovy'},
       {key: 3 , value: 'Jine'},
     ],
     lastSend: 0
   }
 },
 methods: {
   send(key) {
     const self = this

     if (key > 0 && key < 11 ) {
       self.lastSend = key
       // console.log('tag', '')
       eventBus.$emit('MenuHlavni', {key: key })
     } else if ( key == 11) {
       self.lastSend = 0
     }

   }
 }
}

</script>


<style scoped>
</style>


