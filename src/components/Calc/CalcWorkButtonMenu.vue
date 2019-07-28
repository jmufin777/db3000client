<template>
<div style="position:relative;top:0px;background:#e4eff8;text-align:left;font-size:14px;">
      <div style="position:relative;top:0px;background:#e4eff8;text-align:left">
        <button v-for="(item,i) in aMain" :key="i" class="px-4 tlacitkoMenu elevation-2 hoVer"
          @click="setMenu(item.id)"
          :class="{'tlacitkoMenuActive':setmenu==item.id}"

          >
         {{item.txt}}
        </button>
        <span class="tlacitkoMenu elevation-0 ml-4 pr-2 pb-1 pt-1" style="border-radius:0px 0px 0px 0px;background:#e4eff8">
           <input type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;widht:30em;border: solid 1px black">
           <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
           <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
           </span>
        </span>
        {{ LastMain }}
      </div>

      <div v-if="setmenu==''" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3em;font-size:12px;">
          Nic neni vybrano
      </div>
      <div v-if="setmenu=='kalkulace'" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3.2em;font-size:14px;">
        <table><tr>
          <td v-for="(item2,i2) in aSubKalkulace" :key="i2"   style="max-width: 8em;background:#e4eff8;font-size:14px;">
          <button
          class="px-1  pt-2 hoVer"
          @click="send(item2.id)"
          :class="{'blue--text':item2.set==1}"

         >
         <table style="background:#e4eff8"><tr><td style="background:#e4eff8;width:20px;
         ">
          <i class="el-icon-plus white--text d3" style="font-weight:bold;height:25px;zoom:120%;"></i>
         </td><td style="background:#e4eff8;"
                :class="{'blue--text': item2.id==LastMain}"
         >
            <b class="hoVer"
            >{{item2.txt}}</b>
        </td></tr></table>
       </button>
          </td>

        </tr></table>
        <!-- {{ aSubKalkulace}} -->

      </div>
      <div v-else style="position:relative;top:0px;background:#e4eff8;text-align:left;height:4.05em;font-size:11px;" >
          Aktualne v procesu
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

     LastMain: 0,
     aMain : [
        {id: "zakazky",  txt: "Zakázky"},
        {id: "kalkulace",txt: "Kalkulace"},
        {id: "vyroba",  txt:  "Výroba"},
        {id: "studio",  txt:  "Studio"},
        {id: "doprava", txt:  "Dopravy"},
        {id: "xxx", txt:  "???"},
       ],
       aSubKalkulace:[
        {id:9, txt: "Nová sada",set: 0},
        {id:1, txt: "Velkoplošná",set: 0},
        {id:2, txt: "Archová" ,set: 0},
        {id:3, txt: "Jiná",set: 0},
        {id:4, txt: "Externí",set: 0},
        {id:777, txt: "Ulozit",set: 0},
        {id:666, txt: "Vycistit",set: 0},
       ],

   }
 },
 created() {
  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
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
       self.LastMain = key
       // console.log('tag', '')
       eventBus.$emit('MenuHlavni', {key: key })
     }
     if ( key == 11) {
       self.LastMain = 0
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
.hoVer:hover {
      text-shadow: 0 1px 0 #ccc,
               0 2px 0 #c9c9c9,
               0 1px 0 #bbb,
               0 1px 0 #b9b9b9,
               0 1px 0 #aaa,
               0 1px 1px rgba(0,0,0,.1),
               0 0 1px rgba(0,0,0,.1),
               0 1px 1px rgba(0,0,0,.3),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.25),
               0 1px 1px rgba(0,0,0,.2),
               0 1px 1px rgba(0,0,0,.15);

}

</style>


