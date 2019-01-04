<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
    <div  style="max-height:400px; overflow:auto;font-size:100%;" class="green lighten-5 pt-0 " >
<table width="100%" border="0px" >
  <tr><td v-for="n in 100" :key="n" style="font-size:1px">&nbsp;</td></tr>
    <tr>
  <td colspan="15" style="border-style: 20px " class="sloupec">
    <slot name="leva">
       Leva Cast
   </slot>
   </td>
  <td colspan="1">.</td>

   <td colspan="17" class="sloupec">
      <slot  name="sloupec1">1</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec2">2</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec3">3</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec4">4</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec5">5</slot>
    </td>

   </tr>
       <tr>
  <td colspan="15" style="border-style: 20px ">
   </td>
  <td colspan="1">.</td>

   <td colspan="17" class="sloupec">
        <slot name="sloupec6">.</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec7" >.</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec8">.</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec9">.</slot>
    </td>
    <td colspan="17" class="sloupec">
        <slot name="sloupec10">.</slot>
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
 },
 created() {

  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })

 }
}
</script>


<style scoped>
table tr td  {
  border:none;
  border-collapse: collapse;
}
.sloupec {
  vertical-align: text-top;
}
</style>


