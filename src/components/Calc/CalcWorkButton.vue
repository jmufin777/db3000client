<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
 <div  style="max-height:80%; overflow:auto;font-size:100%;" class="green lighten-5 pa-0 pt-0 pb-0" id="test_1"  @scroll="TestRend" >

<table style="float:left" ><tr>
  <td style="border-top:none;border-bottom:none;border-right: solid 2px white;max-width:5.5em">
     <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:5.2em;width:100%" >
   <button class="kolecko2" >
    <div class="kolecko" >
      <!-- <i class="el-icon-plus" style="color:#93908e;position:absolute;top:-0px;left:0px"></i> -->
       <span style="color:#93908e;position:absolute;top:-5px;left:3px;font-family:Helvetica">+</span>
      </div>
  </button>
  <span>&nbsp;</span>
  <button class="kolecko2" >
    <div class="kolecko" >
      <!-- <i class="el-icon-close" style="color:#93908e;position:absolute;top:-0px;left:0px"></i> -->
     <span style="color:#93908e;position:absolute;top:-5px;left:3px;font-family:monospace">x</span>
      </div>
  </button>
   </div>
  </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 0px white;width:40em" >
      <input type="text" v-model="form.nazev" style="height:26px;border:none;width:100%" :placeholder="'TEXT NA FAKTURE '+ ID2" class="honza_text"
      :id="'seek'+ID2"
      @focus="fokus('seek'+ID2);showTemplates=true"
      @blur="Opust('seek')"
      @click="showTemplates=true"
      @keydown="showTemplates=true;seznam('seek'+ID2+'_list_'+0,1,$event)"
      >
    </td>
    <td  style="text-align:center;border-top:none;border-bottom:none;border-right: solid 2px white;width:3em" >
   <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:1em;width:100%" >
    <button class="kolecko2" @click="send()" >
      <div class="kolecko" >
      <i class="el-icon-upload" style="color:#93908e;position:absolute;top:-0px;left:0px"

      ></i>
      </div>
    </button>
   </div>
    </td>
     <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white" >
      <input type="number" v-model="form.kcks" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="Kc/ks" class="honza_text honza_color pr-1 ">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white" >
      <input type="number" v-model="form.ks" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="ks" class="honza_text honza_color pr-1">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.naklad" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="NAKLADY CELKEM" class="honza_text honza_color pr-1">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.marze" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="MARZE" class="honza_text honza_color pr-1">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.marze_pomer" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="MARZE POMER" class="honza_text honza_color pr-1">
    </td>

    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.prodej" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="PRODEJ CELKEM" class="honza_text honza_color pr-1">
    </td>

  </tr></table>
     <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:100%" >
       &nbsp;
     </div>


  <div
style="position:absolute;z-index:90010;overflow:scroll;max-height:14em"
:style="'top:'+ f1.getBottom('seek'+ID2,0)+'px;width:'+f1.getWidth('seek'+ID2,0)+'px;left:'+f1.getLeft('seek'+ID2, 0)+'px'"
   v-if="showTemplates " class="elevation-12 honza_color"

       >
        <!-- {{showTemplates}} {{dataTemplates.length}} -->
          <table  width="100%" v-if="showTemplates " class="pa-2 ">
              <tr v-for="(m1b, i1b) in
              dataTemplates.filter(
                el =>
                  ( el.nazev.toUpperCase().match((form.nazev+'').toUpperCase()) && form.nazev+'' > '' && form.nazev !== el.nazev )
                  || (form.nazev+'').trim() == ''
                )" :key="i1b" >
              <td class="pa-0 ">
              <v-card class="hpa-0 " style="width:115%;" >
                <a :href="'#'" :id="'seek'+ID2+'_list_'+i1b"
                 @keydown="seznam('seek'+ID2+'_list_'+i1b,1,$event)"
                 @click="setTemplate(m1b);showTemplates=false"
                 @focus="fokus('seek'+ID)"

                 >
                <table style="width:100%" ><tr><td style="width:70%" class="honza_color">
                <v-card-text style="font-size:90%;text-align:left;width:100%"  @click="setTemplate(m1b)"
                class=" pa-0 pt-1"
                >
                 {{ m1b['nazev']}}
                 </v-card-text>
                 </td><td style="width:30%;height:100" class="pa-0 honza_color">
                 <v-card-text style="font-size:90%;text-align:left;width:100%;height:100%"  @click="setTemplate(m1b)"
                 class=" pa-0 pt-1">
                 {{m1b['login']}}

                 </v-card-text>
                 </td>
                 </tr></table>
              </a>
              </v-card>
              </td>
            </tr>
          </table>
  </div>



<!--nabidka templates !-->

<!--nabidka templates !-->
  </div>
 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import f from '@/services/fce'
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole
import queryKalk from '../../services/fcesqlKalkulace'

import JQuery from 'jquery'
import { locales } from 'moment';
let $ = JQuery




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
     ID0: this.ID,
     ID2: 0,
     f1: f,
     $: $,
     showTemplates: true,
     timeout: 0 , //tOpusteni:0,
     lastFocus:'',
     dataTemplates: [],

     form: {
       nazev: '',
       kcks: null,
       ks: null,
       naklad:null ,
       marze: null,
       prodej:null,
       marze_pomer: null,
     }
   }
 },
 async created() {

  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
  const self = this
    eventBus.$off('DATATEMPLATES')
    eventBus.$on('DATATEMPLATES',(server)=>{
      self.dataTemplates=server.data
      self.showTemplates = true
      //f.Alert("SERVER: ", JSON.stringify(self.dataTemplates))

  })
  self.ID2 = Math.round((Math.round(Math.random() * 1983458) * Math.round(Math.random() * 1983458)) / Math.round(Math.random() * 1983458))
  setTimeout(function(){
    $('#seek'+self.ID2).on('focus', function(){
      try {
        queryKalk.getTemplates()

      } catch(e) {
        f.Alert('Chyba data templajtes')
      }

    })
   },100)
  $(document).ready(function(){

  });

 },

 mounted () {
   const self = this
   var cvar = 'seek'+self.ID2+''
  $('input,button').on('focus',function(){
      if (this.id>'') {
        self.lastFocus = this.id
       //if (this.id == )
       //f.Alert(this.id, cvar)
      } else {
        self.lastFocus = 'NemaID'
      }
    });
 },

 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
  fokus(lastFocus=''){
    this.lastFocus=lastFocus
  },
  setTemplate(cItem){
    const self = this
      //f.Alert(cItem.nazev)
       self.form.nazev=cItem.nazev
       self.form.kcks = cItem.kcks
       self.form.ks = cItem.ks
       self.form.naklad = cItem.naklad
       self.form.marze = cItem.marze
       self.form.prodej = cItem.prodej
       self.form.marze_pomer = cItem.marze_pomer

       self.$store.dispatch('saveKalkCela', {data: cItem.obsah })
       location.reload()




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
  send(){
    const self = this
    eventBus.$emit("SAVETEMPLATE",{data: self.form })
    //queryKalk.setKalk(server.data,self.aKalkulace)
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
     console.log("Seznam ",nKey, " ID: ", id)

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
            self.showTemplates=false

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

//el.selectionEnd = el.selectionStart


   },
 }
}
</script>


<style scoped>
textarea:focus, input:focus{
    outline: 0px dashed;
}
a:focus {
  color:red;
}

.honza_text{
  background: #93908e;
  color: #ffffff;
  height:14px;
  font-size:12px;
  font-weight:400;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:10px;
  padding-right:10px;

}
.honza_cislo{
  background: #93908e;
  color: #ffffff !important;
  height:14px;
  font-size:12px;
  font-weight:900;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:10px;
  padding-right:5px;

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


