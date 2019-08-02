<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
 <div  style="max-height:80%; overflow:auto;font-size:100%;" class="green lighten-5 pa-0 pt-0 pb-0" id="test_1"  @scroll="TestRend" >
 <div>
        I:{{IDEFIX}} {{ ID }} {{ ID2 }}
      </div>
<table style="float:left" ><tr>
  <td style="border-top:none;border-bottom:none;border-right: solid 2px white;max-width:5.5em;text-align:center">
   <div class="honza_color" style="height:26px;padding-top:2px;text-align:center;width:5.2em;width:100%" >
   <button class="kolecko2" @click="Rozdel()">
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
import f from '@/services/fce'

export default {
   components: {
    'work-left': WorkLeft,
    'work-col': WorkCol,

 },
  props: {
    ID:0,
    ID2: {
      default:"0",
      required: false
    },
    IDEFIX: {
      default:"0",
      required: false
    },


  },
 data () {
   return {
     ID0: this.ID,


     f: f,
     st: [],
     form: {
     }

   }
 },
 created() {
   const self=this
   // self.ID2 = Math.round((Math.round(Math.random() * 1983458) * Math.round(Math.random() * 1983458)) / Math.round(Math.random() * 1983458))
   self.st = self.$store.state

   eventBus.$off('DATARADKASENDDATA')
   eventBus.$on('DATARADKASENDDATA',(server)=>{
     self.form=server.data
     f.Alert2(JSON.stringify(self.form))


    })
   // f.Alert(self.st.KalkulaceThis)

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
  Rozdel(){
    const self=this

    var stAll = JSON.parse(JSON.stringify(self.st.Kalkulace))
    var idxCut=-1

    if (self.ID<1){
      f.Alert2('Prvni kalkulace .. co s tim ?')
      return
    }
    $("#Zmenad").get(0).value++
      //eventBus.$emit("DATARADKARECZADOST")



      //f.Alert2('Rozdeleni',self.ID,self.st.KalkulaceThis)
      var stBackup= stAll.filter((el,idx2) => {   //Zalozit do db
        return idx2 < self.ID
      })

      var stNew= stAll.filter((el,idx3) => {  //Zbytek pro praci
        return idx3 >= self.ID
      })
      stNew.forEach((element,idx) => {
          element.kalkulaceid=idx+1
      });

      // self.$store.dispatch('saveKalkCela', {data: stNew })
      // eventBus.$emit("NulujRadek")
      eventBus.$emit('MenuHlavni',
        {
          //Kalkulace: cItem.obsah,
          Kalkulace1: stBackup,
          Kalkulace2: stNew,
          key: 668,
          id2: self.ID2,
          Poradi: 0,
          data:{}

        })


      //f.Alert('a')

      self.TestRend()


    }

 },

}
</script>


<style scoped>
textarea:focus, input:focus{
    outline: 0px dashed;
}
button:focus, button:hover {
  zoom: 105%;
  opacity: 1;
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


