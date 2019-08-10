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
        {{ LastMain }} / {{ID}}
      </div>

      <div v-if="setmenu==''" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3em;font-size:12px;">
          Nic neni vybrano
      </div>
      <div v-if="setmenu=='kalkulace' || setmenu=='zakazky'" style="position:relative;top:0px;background:#e4eff8;text-align:left;height:3.2em;font-size:14px;">
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
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Číslo zakázky:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4" ><input type="text" size="mini"  style="width:90%" class="tdl tdn"
              :id="'cislo' + ID "
              ></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%;" class="prava">Název firmy:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4">
              <input
              type="text"
              :id="'nazevfirmy_'+ID"
              size="mini"
              style="width:90%"
              class="tdl tdn"
              @focus="fokus('nazevfirmy_'+ID);showTemplates=true"
              @blur="Opust('nazevfirmy_'+ID)"
              @click="showTemplates=ZobrazMenu"
              @keydown="showTemplates=ZobrazMenu;ZobrazMenu ? seznam('nazevfirmy_'+ID+'_list_'+0,1,$event) : false"
              ></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Název zakázky:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava">Datum expedice:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn datum"></td>
            </tr>
          </table>


        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
                    <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyrobni listy:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Kontaktni osoba:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Doprava:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Datum zadani:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn datum"></td>
            </tr>
          </table>

        </div>
        <div style="width:24%;float:left;background:#ffffff;border-right: solid 1px #cacade" class="pl-1 mt-1 pt-1">
          <table style="width:100%;height:100%">
            <!-- <tr><td>a</td></tr> -->
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Faktury:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Platba:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Account:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
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
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
           <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">Vyfakturovano:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn "></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">???:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn"></td>
            </tr>
            <tr>
              <td style="position:relative;top:0px;color:#258bce;width:30%" class="prava pr-2">???:</td>
              <td style="position:relative;top:0px;color:#000000;width:70%" class="prava pr-4"><input type="text" size="mini"  style="width:90%" class="tdl tdn datum"></td>
            </tr>
          </table>
        </div>


    </div>
    <hr style="color:#cacade">

       <div style="min-height:5px;max-height:10em;overflow-y:scroll;position:absolute;z-index:510000001;top:0px"
        v-if="showFirma && aFirma.length > 0" class="elevation-12 teal"
          :style="'top:'+ f.getBottom('nazevfirmy_'+ID,80)+'px;width:'+f.getWidth('nazevfirmy_'+ID,8)+'px;left:'+f.getLeft('nazevfirmy_'+ID,0)+'px'">
        <span style="display:none">FF {{ aFirma.length}}</span>
        <span style="display:none">
         {{ aFirma}}
         <!-- {{ getBottom('seek5_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="true " >
             <tr class="mt-0 pa-0 grey lighten-4" v-for="(item1, i1) in aFirma" :key="i1"  >
              <td class="pa-0 ma-0 pl-1 grey lighten-4">

              <a :href="'#'" :id="'nazevfirmy_'+ID+'_list_'+i1"  @keydown="seznam('nazevfirmy_'+ID+'_list_'+i1,1,$event)" @click="form.txtDod= item1['firma']; form.showtxtDod=false; setColDod(item1)" @focus="lastFocus='seek5_'+ID">
              <v-card class="grey lighten-4 pa-0 ma-0" style="width:99%;" >
                <table style="width:100%" class="pa-0 ma-0"><tr><td style="width:100%" class="pa-0 ma-0 grey lighten-4">
                <v-card-text style="font-size:90%;text-align:left;width:100%" @click="form.txtDod= item1['firma']; form.showtxtDod=false; setColDod(item1)"
                :class="{'grey lighten-4':1==1, 'grey lighten-5':1>1}"
                class="ma-0 pa-0 pl-1"
                >

                  {{ item1['nazev'] }}
                 </v-card-text>
                 </td></tr></table>

              </v-card>
            </a>
              </td>
            </tr>
          </table>
        </div>





</div>




  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->

 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import f from '@/services/fce'
import SQL from '../../services/fcesql'






export default {
   components: {


 },
  props: {
    ID:0,
    required: false


  },
 data () {
   return {
     ID0: this.ID,
     setmenu:"zakazky",
     setsub:0,
     f:f,

     showTemplates: true,
     showFirma: true,
     ZobrazMenu: true,




     LastMain: 0,
     aMain : [
        {id: "kalkulace",txt: "Nabídky"},
        {id: "zakazky",  txt: "Zakázky"},

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
       form:{
         cislo             : 0,   //zakazky . nabidky - vyresit pri ulozeni
         vl_rozsah         : '',
         idefix_firma      : 0,
         idefix_firmaosoba : 0,
         nazev             : '',
         cisloobjednavky   : '',
         datumzadani       : null,
         datumexpedice     : null,
         datumsplatnosti   : null,
         vyrobapopis       : '',
         naklad            : 0,   //Asi smazat
         poznamky          : '',
         zamknuto          : null, //datum
         idefix_user_lock  : 0,
         odemknuto         : null,//datum
         idefix_user_unlock: 0,
         zamek             : false,
         uct_rok           : 2019, //nevim ,asi smazt
         login             : '', // pomucka 0- vypise se
         vyrobapopis_print : '',
         cislofaktury      : '',
         idefix_obchodnik  : 0,
         idefix_produkce   : 0,
         idefix_last       : 0,
         idefix_nabidka    : 0,
         dodak0            : '',  //pdf soubory - nazvy
         objednavka0       : '',
         pdf0              : '',
         informace         : '',
       },
       aFirma: [],
       aOsoba: [],
       aUser: [],
       aProdukce: [],

   }
 },
 async created() {
     const self=this
     //alert(11111)
     self.aFirma =  await SQL.getFirma(0)

     //f.Alert("afirma", f.Jstr(self.aFirma))
  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })

 },
 async mounted() {
    const self = this

   // alert('nazevfirmy_'+self.ID)
  //setTimeout(function(){
    //alert(document.getElementById('nazevfirmy_'+self.ID))
  //},2000)
  //
//       return
    setTimeout(function() {
      eventBus.$emit('MenuHlavni',{key:1999, item: self.setmenu})
     },100)
         this.$nextTick(function () {
    // Code that will run only after the entire view has been rendered
      //$('input').hide(2000).show(2000);
      //$('input').dialog();

      $( ".datum" ).datepicker();
  })

  },
 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
  setMenu(cVal='') {
      //aler('aa')
      const self = this
      this.setmenu = cVal;
      eventBus.$emit('MenuHlavni',{key:1999, item: self.setmenu})
  },
  async qFirmy() { //Jen dodavatel
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        // self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.DataDod=atmp; //Jen Stroj
        self.form.dataDo = atmp;

        // self.info=atmp;
        console.log("DATA Dod" , JSON.stringify(self.Col.filtrDataDod))

      } catch(e){
        console.log(e)
      }
      return atmp

   },
     seznam(id,kod,e, obsah=""){
     const self  = this
     var i=0;
     var aPrvek=id.split("_")

     var nKey=e.keyCode
     var obj1= e.target  //kde stojim
     var objSeznam="";
     var delka=aPrvek.length
     var idPoz= aPrvek[delka -1] ;
     var PrvekBase=""
     var PrvekNext=""
     var PrvekBefore=""
     var tmp=0;

     var PrvekTxt=""
     // seznamPoz(self.lastFocus );
     console.log("Seznam ",nKey, " ID: ", id, self.showTemplates)

    // self.info=aPrvek
     // self.info.push({dele: aPrvek.length })

     for (i=0;i<(delka-1);i++) {
       if (i < delka -2){
         if (PrvekTxt>"") PrvekTxt+="_"
         PrvekTxt+=aPrvek[i]
       }
       PrvekBase+=aPrvek[i]+'_'
        //self.info.push(PrvekBase)

     }
      //self.info.push({"PrvekTxt": PrvekTxt })
      //self.info.push({"Pozice": idPoz })
      //self.info.push({"base": PrvekBase })

      tmp = idPoz*1;
      if (idPoz>0){
        tmp = tmp -1
        PrvekBefore = PrvekBase + tmp
      }
        tmp = idPoz*1;
        tmp = tmp +1
        PrvekNext = PrvekBase + tmp
     //   f.Alert(document.getElementById(PrvekTxt),PrvekTxt )



     var status = false;


      if (document.getElementById(id)) { //Id odkazuje na prvni radku seznamu = pokud existuje
          status= true;
          objSeznam= document.getElementById(id)
        //  self.info.push("OK")
      }


     //self.info.push(e.keyCode)
     switch (nKey) {
       case 27:
        setTimeout(function(){
            self.MenuFormatShow=false

            document.getElementById(PrvekTxt).focus()


          setTimeout(function(){
            self.showTemplates=false;

          },100)

        },100)


        //alert('nevidim jej')
        //f.stopka(e)
        //return true
        break;
     }
     if (kod==0){
       switch (nKey) {
       case 9:
        setTimeout(function(){
          self.showTemplates=false
        },100)


        //alert('nevidim jej')
        //f.stopka(e)
        //return true
        break;
       case 40:
         f.stopka(e)

         if (status) {
           objSeznam.focus()
           // self.info.push(objSeznam.id)
         } else {
           return
         }
     }

     }
   if (kod==1){

    switch (nKey) {
      case 38:
          f.stopka(e)
          if (PrvekBefore>"" &&  document.getElementById(PrvekBefore)){
            document.getElementById(PrvekBefore).focus()
            break;
          }
      case 40:
          f.stopka(e)
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
      case 36: //Houm
          f.stopka(e)
          PrvekNext = PrvekBase+"0"

          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }

      case 35: //End
          f.stopka(e)
            tmp = idPoz*1;
          while (PrvekNext>"" &&  document.getElementById(PrvekNext)) {

            tmp = tmp +1
            PrvekNext = PrvekBase + tmp
          }
          PrvekNext = PrvekBase + (tmp-1)

          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
      case 34: //PejdzDaun
          f.stopka(e)
          tmp = idPoz*1;
          PrvekNext = PrvekBase + tmp
          for (i=1;i<8;i++){
            if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
              tmp = tmp +1
              PrvekNext = PrvekBase + tmp
            } else {
              if (!document.getElementById(PrvekNext)){
                PrvekNext = PrvekBase + (tmp-1)
              }
              break;
            }
          }
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
         case 33: //PejdzAp
          f.stopka(e)
          tmp = idPoz*1;
          PrvekNext = PrvekBase + tmp
          for (i=1;i<8;i++){
            if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
              tmp = tmp - 1
              if (tmp<=0){
                PrvekNext = PrvekBase + "0"
                break;
              }
              PrvekNext = PrvekBase + tmp

            } else {
              if (!document.getElementById(PrvekNext)){
                PrvekNext = PrvekBase + (tmp+1)
              }
              break;
            }
          }
          if (PrvekNext>"" &&  document.getElementById(PrvekNext)){
            document.getElementById(PrvekNext).focus()
            break;
          }
        case 37:  //sipa vleft

          setTimeout(function(){
              document.getElementById(PrvekTxt).focus()
            },50)
        break;
       case 39:  //sipa vright
            setTimeout(function(){
               //e.target.click()
               f.stopka(e)
               e.target.click()
               document.getElementById(PrvekTxt).focus()
               document.getElementById(PrvekTxt).change
            },100)
            //f.stopka(e)
        break;

        case 13:
            //f.stopka(e)
            e.target.click
            setTimeout(function(){
              document.getElementById(PrvekTxt).focus()
            },50)

            break;
     }
     }

   },
  async  send(key) {
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
   },
     fokus(lastFocus=''){
    const self = this
    if (self.ZobrazMenu == false)  return
    this.lastFocus=lastFocus
    var oSeznam="#"+lastFocus+"_list2"
     $(oSeznam).css("z-index",99999999999)

      $(oSeznam).show(1000)
      if (self.ZobrazMenu) {
        console.log(self.ZobrazMenu)
      }
      //f.Info(self.ZobrazMenu)
      //f.Info(oSeznam, self.ZobrazMenu)

    return

    // f.Alert(lastFocus);
  //f.Alert($("#"+lastFocus).offset().top - $(document).scrollTop()) ;
    this.seznamPoz(lastFocus)

    //$("#"+lastFocus+'_list').css

    this.lastFocus=lastFocus
  },
  seznamPoz(lastFocus=''){
    var oSeznam="#"+lastFocus+"_list2"
    try {
      var x=$("#"+lastFocus).offset().top
      var pozTop = Math.ceil($("#"+lastFocus).offset().top - $(document).scrollTop())
      var pozLeft = Math.ceil($("#"+lastFocus).offset().left - $(document).scrollLeft())
      $("#"+lastFocus).attr("autocomplete", "off");
      $(oSeznam).css("position","absolute")
      $(oSeznam).css("top",pozTop+"px")
      $(oSeznam).css("left",pozLeft+"px")
      $(oSeznam).css("z-index",99999999)

    } catch (e) {
      //f.Alert("Pokazena pozice")
    }
  },
  Opust(cid='') {

    const self = this
  //  var x = document.activeElement.tagName
    //f.Alert(self.lastFocus)

    //console.log(x)
    setTimeout(function(){
    //f.Alert(self.lastFocus)
    if (self.lastFocus.substr(0,4)=='seek'){
       self.showTemplates=true
     } else {
        self.showTemplates=false
    }

  },200)

    return
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


