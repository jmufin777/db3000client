<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
       <div  class="white lighten-5 pt-4 px-2 mt-2" style="height:400px" >
         <table cols="100" >
           <tr>
             <td v-for="n in 100" :key="n" style="font-size:1px">&nbsp;</td>
           </tr>
           <tr><td colspan="90" ><slot name="hlavni"> Hlavni nabidka</slot></td>
           <td colspan="10" style="text-align:center"><slot name="menuleft">Menu Leve</slot></td>
           </tr>
           <tr>
             <td v-for="n in 100" :key="n" style="font-size:5px">&nbsp;</td>
           </tr>

           <tr>
             <td colspan="100">
               <div  class="green lighten-5 pt-0 px-0 mt-0 ml-2" style="height:350px;overflow:scroll" id="obal1_kalkulace">
               <slot name="kalkulace">Slot kalkulace</slot>
               </div>
               </td>
           </tr>
           <tr >

              <td colspan="100" style="font-size:10px;text-align:left;" class="pl-4">
                <slot name="odkazy">
                &nbsp;
               </slot>
              </td>
              <!-- <td v-for="n in 100" :key="n" style="font-size:5px">&nbsp;</td> -->


           </tr>
          <tr>
             <td colspan="100">
               <div  class="orange lighten-5 pt-0 px-0 mt-0" style="height:350px;overflow:auto">
               <slot name="prehled">Prehled</slot>
               </div>
               </td>
           </tr>

         </table>
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
     ID:0,


   }
 },
 mounted() {
   this.ID = Math.round(Math.random() * 198345813)
   //alert("ahoj"+ this.ID)
 }
}

</script>


<style scoped>
td {
  border:1px solid silver;

  border-collapse: collapse;
  padding: 0;
  background: white;
}
</style>


