<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
 <div  style="max-height:80%; overflow:auto;font-size:100%;" class="green lighten-5 pa-0 pt-0 pb-0" id="test_1"  @scroll="TestRend" >

<table style="float:left" ><tr>
  <td style="border-top:none;border-bottom:none;border-right: solid 2px white;max-width:5.5em;text-align:center">
   <div class="honza_color" style="height:26px;padding-top:2px;text-align:center;width:5.2em;width:100%" >
   <button class="kolecko2" >
    <div class="kolecko" >
      <span style="color:#93908e;position:absolute;top:-5px;left:3px;font-family:Helvetica">+</span>
      </div>
  </button>
   </div>
  </td>

  </tr></table>
     <div class="white " style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:100%" >
       &nbsp;
     </div>
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
    ID:0


  },
 data () {
   return {
     ID0: this.ID

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
  font-size:15px;
  font-weight: 900;
  padding-top:0px !important;
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


