<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
    <div  style="max-height:80%; overflow:auto;font-size:100%;" class="green lighten-5 pt-0 " >

<table width="120%" border="0px" >
  <tr><td v-for="n in 95" :key="n" style="font-size:1px">&nbsp;</td></tr>
    <tr>
  <td colspan="20" rowspan="2" style="border-style: 0px " class="sloupec">
    <slot name="leva">
       Leva Cast
   </slot>
   </td>
  <!-- <td colspan="1">A</td> -->
   <td colspan="10" class="sloupec">
      <slot  name="sloupec1"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec2"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec3"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec4"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec5"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec6"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec7"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec8"></slot>
    </td>

   </tr>
   <tr>

  <!-- <td colspan="1">.</td> -->

   <td colspan="10" class="sloupec">
      <slot  name="sloupec9"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec10"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec11"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec12"></slot>
    </td>
    <td colspan="10" class="sloupec">
        <slot name="sloupec13"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec14"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec15"></slot>
    </td>
     <td colspan="10" class="sloupec">
        <slot name="sloupec16"></slot>
    </td>

   </tr>
</table>

<hr class="pb-1">

    </div>
 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'

import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole




export default {
   components: {
    'work-left': WorkLeft,
    'work-col': WorkCol,

 },
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


