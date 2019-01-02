<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
    <div style="max-height:400px; overflow:auto;font-size:100%;" class="green lighten-5 pt-0 " >
<table width="100%" border="0px" >
  <tr><td v-for="n in 100" :key="n" style="font-size:1px">&nbsp;</td></tr>
    <tr>
  <td colspan="15" style="border-style: 20px ">
  <slot name="leva">
       Leva Cast
   </slot>
   </td>
  <td colspan="1">.</td>

   <td colspan="85">
        <slot name="sloupce">Sloupce</slot>
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

   }
 }
}
</script>


<style scoped>
table tr td  {
  border:none;
  border-collapse: collapse;
}
</style>


