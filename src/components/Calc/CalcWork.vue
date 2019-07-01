<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
 <div  style="max-height:80%; overflow:auto;font-size:100%;" class="white lighten-5 pa-0 pt-0 pb-0" id="test_1"  @scroll="TestRend" >
 <slot name="sloupce" class="pl-0">

<slot name="tlacitka" class="white"></slot>


<table width="120%" border="0px" >
  <tr><td v-for="n in 95" :key="n" style="font-size:1px">&nbsp;</td></tr>
    <tr>
  <td colspan="20" rowspan="2" style="border-style: 0px;z-index:99999999 " class="sloupec pa-0">

    <!-- <div style="position:fixed;top:25%;right:5%;z-index:999999" > -->
    <div>
    <slot name="leva" >
       Leva Cast
   </slot>
    </div>
   </td>
  <!-- <td colspan="1">A</td> -->
   <td colspan="10" class="sloupec pa-0" style="">
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
</slot>
<!-- <hr class="pa-0 red darken-4" style="height:1px"> -->
<!-- <hr class="pa-0 red darken-4" style="height:1px"> -->

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

 },
 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
 }
}
</script>


<style scoped>
textarea:focus, input:focus{
    outline: 0px dashed;
}
.honza_text{
  background: #93908e;
  color: #ffffff;
  height:14px;
  font-size:12px;
  font-weight:400;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:3px;
  padding-right:3px;

}
.honza_cislo{
  background: #93908e;
  color: #ffffff !important;
  height:14px;
  font-size:12px;
  font-weight:900;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:3px;
  padding-right:3px;

}
.honza_color{
  background: #93908e;
  color: #ffffff;
}
.kolecko {
  height:16px;
  width:16px;
  border: solid 1px #93908e !important;
  border-radius:10px  !important;
  vertical-align: top  !important;
  text-align: center  !important;
  font-size:14px;
  padding-top:0px !important;
  padding-bottom:0px !important;
  background: white;
  position:absolute;
  top:1px;
  left:1px;
}

.kolecko2 {
  height:20px;
  width:20px;
  border: solid 1px #93908e !important;
  border-radius:14px  !important;
  background: #ffffff;
  vertical-align: top  !important;
  text-align: center !important;
  padding-top:0px !important;
  background: white;
  position:relative;
}

table tr td  {
  border:none;
  border-collapse: collapse;
  vertical-align: top;
}
.sloupec {
  vertical-align: top;

}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  background-color: #93908e;
  font-size:12px;
  color: #ffffff;
  opacity: 0.71; /* Firefox */
  text-align: center;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #ffffff;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #ffffff;
}
</style>


