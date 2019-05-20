<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
       <div v-if="ukaz==true" class="white lighten-5 pt-4 px-2 mt-2" :style="'height:'+getHeight('d1_'+ID,100)+'px'" :id="'d1_'+ID" @click="s12(1,$event)">
         <table cols="100" >
           <tr >
             <td v-for="n in 100" :key="n" style="font-size:1px">&nbsp;</td>
           </tr>
           <tr>
             <td colspan="90" ><slot name="hlavni"> Hlavni nabidka</slot></td>
            <td colspan="10" style="text-align:center"><slot name="menuleft">Menu Leve</slot></td>
           </tr>
           <tr>
             <td v-for="n in 100" :key="n" style="font-size:5px">&nbsp;</td>
           </tr>

           <tr :style="'height:'+getHeight('d1_'+ID,50)+'px'" class="pt-0">
             <td colspan="100" :style="'height:'+getHeight('d1_'+ID,s1)+'px'" class="pt-0" :id="'d2_'+ID">
               <div  class="green lighten-5 pt-0 px-0 mt-0 ml-2" style="overflow:scroll" id="obal1_kalkulace">
                  <!-- aaAAAAAA{{ getBottom('d1_'+ID)}} /                 TOP{{ getTop('d1_'+ID)}} / {{getHeight('d1_'+ID,s1)}} / {{getHeight('d1_'+ID,s2)}} -->
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
          <tr <tr :style="'height:'+getHeight('d1_'+ID,50)+'px'" class="pt-0">
             <td colspan="100">
               <div  class="orange lighten-5 pt-0 px-0 mt-0" :id="'d3_'+ID" :style="'height:'+getHeight('d1_'+ID,s2)+'px'" style="overflow:auto" @click="s12(2,$event)">
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
import f from '../../services/fce'

export default {
  props: {

  },
 data () {
   return {
     ID:0,
     s1:50,
     s2:50,
     ukaz:true


   }
 },
 mounted() {
   this.ID = Math.round(Math.random() * 198345813)
   //alert("ahoj"+ this.ID)
 },

methods: {
  getBottom(id,addPoz=10) {
     var neco=200
     var oNeco
     var obal= document.getElementById("obal1_kalkulace")
   //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetTop+oNeco.offsetHeight+ addPoz
       neco = neco - obal.scrollTop
       //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

       //oNeco.parentElement.style.background='pink'

       //neco = oNeco.offsetTop
   //    alert(neco+ " // "+ id )

     } else {

     }

     return neco;
   },

   s12(prvek,e) {
     const self=this
     return
     f.stopka(e)

     if (prvek==1){


       this.s1=80
       this.s2=20
     }
     if (prvek==2){
       this.s1=20
       this.s2=80

     }
      document.getElementById('d1_'+self.ID).style.height=getHeight('d1_'+ID,s1)+'px'
      document.getElementById('d2_'+self.ID).style.height=getHeight('d1_'+ID,s1)+'px'
      document.getElementById('d3_'+self.ID).style.height=getHeight('d1_'+ID,s2)+'px'



   },

getTop(id,addPoz=10) {
     var neco=200
     var oNeco
     var obal= document.getElementById("obal1_kalkulace")
   //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetTop+ addPoz
       return neco
       return window.innerHeight

       //oNeco.parentElement.parentElement.style.display='none'

       //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

       //oNeco.parentElement.style.background='pink'

       //neco = oNeco.offsetTop
   //    alert(neco+ " // "+ id )

     } else {

     }

     return neco;
   },

   getHeight(id,pomer) {
     var neco=200
     var oNeco
     var obal= document.getElementById("obal1_kalkulace")
   //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetTop

       return Math.ceil((window.innerHeight - neco) * pomer / 100)

       //oNeco.parentElement.parentElement.style.display='none'

       //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

       //oNeco.parentElement.style.background='pink'

       //neco = oNeco.offsetTop
   //    alert(neco+ " // "+ id )

     } else {

     }

     return neco;
   },

   getLeft(id,addPoz=10) {
     var neco=500
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetLeft+addPoz


     } else {
     }

     return neco;
   },
   getWidth(id,addPoz=10) {
     var neco=300
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetWidth+addPoz

       //neco = oNeco.offsetTop
       //alert(neco)

     } else {

     }

     return neco;
   },
},
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


