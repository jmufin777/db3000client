<template>
<div style="position:relative;top:0px;background:#fdf0f7;text-align:left;font-size:14px;">
      <div style="position:relative;top:0px;background:#fdf0f7;text-align:left">
        <button v-for="(item,i) in aMain" :key="i" class="px-4 tlacitkoMenu elevation-2"
          @click="setMenu(item.id)"
          :class="{'tlacitkoMenuActive':setmenu==item.id}"
          >
         {{item.txt}}
        </button>
      </div>

      <div v-if="setmenu==''" style="position:relative;top:0px;background:#fdf0f7;text-align:left;height:5em;font-size:12px;">
          Nic neni vybrano
      </div>
      <div v-if="setmenu=='kalkulace'" style="position:relative;top:0px;background:#fdf0f7;text-align:left;height:5.2em;font-size:14px;">
        <table><tr>
          <td v-for="(item2,i2) in aSubKalkulace" :key="i2"   style="max-width: 6em;background:#fdf0f7;font-size:14px;">
          <button
          class="px-2 elevation-0 pt-2"
          @click="send(item2.id)"
          :class="{'blue--text':item2.set==1}"
         >
         <div>
          <i class="el-icon-circle-plus-outline" style="font-weight:bold;height:15px"></i>
         </div>
         <div class="pa-0">
            <b >{{item2.txt}}</b>
        </div>
       </button>
          </td>
          <td style="max-width: 5em;background:#fdf0f7">
         <div class="pt-2 pl-2">
          <i class="el-icon-search" style="font-weight:bold;height:15px"></i>
         </div>
         <div style="font-weight:bold;height:15px">
           <b >Hledat</b>
         </div>

          </td>
          <td style="max-width: 25em;background:#fdf0f7">


         <div class="pt-3 pl-0">
           <input type="text" class="white px-2"  style="border-radius:15px 15px 15px 15px;height:15px;font-size:12px;background:white !important;widht:30em">
         </div>


          </td>
        </tr></table>
        <!-- {{ aSubKalkulace}} -->

      </div>
      <div v-else style="position:relative;top:0px;background:#fdf0f7;text-align:left;height:5.2em;font-size:11px;" >
          Zatim nejsem naprogramovane menu pro tento vyber
    </div>

      <div style="position:relative;top:0px;background:#ffffff;text-align:left;border-top: solid 1px #cacade;height:10em;font-size:12px;">
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Číslo zakázakazky:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4" ><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%;" class="prava">Název firmy:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Název zakázky:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Datum expedice:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="date" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
          </table>


        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
                    <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyrobni listy:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Kontaktni osoba:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Doprava:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Datum zadani:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="date" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
          </table>

        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Faktury:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Platba:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Account:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Produkce:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input  size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
          </table>
        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Zisk:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyfakturovano:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn "></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">???:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">???:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="date" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
          </table>
        </div>


    </div>
    <hr style="color:#cacade">




</div>




  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->

 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'






export default {
   components: {


 },
  props: {
    ID:0


  },
 data () {
   return {
     ID0: this.ID,
     setmenu:"kalkulace",
     setsub:0,

     lastSend:0,
     aMain : [
        {id: "zakazky",  txt: "Zakázky"},
        {id: "kalkulace",txt: "Kalkulace"},
        {id: "vyroba",  txt:  "Výroba"},
        {id: "studio",  txt:  "Studio"},
        {id: "doprava", txt:  "Dopravy"},
        {id: "xxx", txt:  "???"},
       ],
       aSubKalkulace:[
        {id:1, txt: "Nová Velkoplošná",set: 0},
        {id:2, txt: "Nová Archová" ,set: 0},
        {id:3, txt: "Nová Jiná",set: 0},
        {id:4, txt: "Nová Externí",set: 0},
        {id:777, txt: "Ulozit",set: 0},
        {id:666, txt: "Vycistit",set: 0},
       ]
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
  setMenu(cVal='') {
      //aler('aa')
      this.setmenu = cVal;
  },
  send(key) {
     const self = this
      self.disabled = true
      self.setsub=key
      self.aSubKalkulace.forEach(element => {
        if (element.id==key ) {
            element.set=1
        } else {
          element.set=0

        }

      })



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

.tlacitkoMenu {
  background:#dfdede;
  border: solid 0px green;
  border-radius: 0px 0px 8px 8px !important;
  font-family: Helvetica,'Times New Roman', Times, serif;

}

.tlacitkoMenuActive {
  background:#2489cc;
  border: solid 1px #ffffff;
  border-radius: 0px 0px 8px 8px !important;
  color: #ffffff;
  font-family: Helvetica,'Times New Roman', Times, serif;
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


