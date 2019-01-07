
<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
      <div style="font-size:100%; height:100%" class="white lighten-5 pt-0 " >
        <slot name="obsah">
          <table width="100%" style="border:none"><tr><td style="width:30%;border:none">
           <v-btn small
            outline
           color="green"
           class="green lighten-3" @click="send(777)"> Ulozit </v-btn>

           <v-btn small
           outline
           color="orange"
           class="orange lighten-3" @click="send(666)"> Vycistit </v-btn>



           </td>


           <td style="width:55%;border:none" >
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
            </td>
            <td style="width:15%;border:none;text-align:right">

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
            </td>
            </tr>
          </table>
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

     if (key > 0  ) {
       self.lastSend = key
       // console.log('tag', '')
       eventBus.$emit('MenuHlavni', {key: key })
     }
     if ( key == 11) {
       self.lastSend = 0
     }

   }
 }
}

</script>


<style scoped>
</style>


