<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
 <div  style="max-height:80%; overflow:auto;font-size:100%;" class="green lighten-5 pa-0 pt-0 pb-0" id="test_1"  @scroll="TestRend" >


<table style="float:left" ><tr>
<td class="leva white pt-1 prava pr-1" style="width:1em;">
  <v-icon size="medium">fa-lock</v-icon>
</td>
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
      :title="(form.nazev>'')?'Text na fakture':''"
      >
    </td>
    <td  style="text-align:center;border-top:none;border-bottom:none;border-right: solid 2px white;width:3em" >
   <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:1em;width:100%" >
    <button class="kolecko2" @click="send()" title="Ulozit">
      <div class="kolecko" >
      <i class="el-icon-upload" style="color:#93908e;position:absolute;top:-0px;left:0px"
      ></i>
      </div>
    </button>
   </div>
    </td>
     <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white" >
      <input type="number" v-model="form.kcks" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="Kc/ks" class="honza_text honza_color pr-1 " title="Kc/ks">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white" >
      <input type="number" v-model="form.ks" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="ks" class="honza_text honza_color pr-1" title="Pocet kusu">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.naklad"  style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important"
      :placeholder="'NAKLADY CELKEM' "
      class="honza_text honza_color pr-1" title="Naklady celkem">
      <!-- <input type="text" :value="f1.getCislo(form.naklad)" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" class="honza_text honza_color pr-1"> -->
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.marze" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="MARZE" class="honza_text honza_color pr-1" title="Marze">
    </td>
    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.marze_pomer" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="MARZE POMER" class="honza_text honza_color pr-1" title="Marze Pomer">
    </td>

    <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em" >
      <input type="number" v-model="form.prodej" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="PRODEJ CELKEM" class="honza_text honza_color pr-1" title="Prodej">
    </td>

  </tr></table>
     <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:100%" >
       &nbsp;
     </div>

  <div
style="position:absolute;z-index:90010;overflow:scroll;max-height:14em;z-index:100000000"
:style="'top:'+ f1.getBottom('seek'+ID2,0)+'px;width:'+f1.getWidth('seek'+ID2,50)+'px;left:'+f1.getLeft('seek'+ID2, 0)+'px'"
   v-if="showTemplates " class="elevation-12 honza_color_seznam"

       >
        <!-- {{showTemplates}} {{dataTemplates.length}} -->
          <table  width="100%" v-if="showTemplates " class="pa-2 honza_color_seznam" border="0">
              <tr v-for="(m1b, i1b) in
              dataTemplates.filter(
                el =>
                  ( el.nazev.toUpperCase().match((form.nazev+'').toUpperCase()) && form.nazev+'' > '' && form.nazev !== el.nazev )
                  || (form.nazev+'').trim() == ''
                )" :key="i1b" class="pa-0 honza_color_seznam">
              <td class="pa-0 pl-1 honza_color_seznam" style="width:90%;border-bottom:solid 1px black">
              <v-card class="pa-0 elevation-0 honza_color_seznam" style="width:100%;;border:solid 0px" >
                <a :href="'#'" :id="'seek'+ID2+'_list_'+i1b"
                 @keydown="seznam('seek'+ID2+'_list_'+i1b,1,$event)"
                 @click="setTemplate(m1b);showTemplates=false"
                 @focus="fokus('seek'+ID)"
                 class="honza_color_seznam"
                 >
               <table style="width:100%;border:solid 0px;border-bottom: solid 0px #575756" class="honza_color_seznam" ><tr><td style="width:60%;border-bottom:solid 0px" class="honza_color_seznam" >
               <v-card class="pa-0 elevation-0 honza_color_seznam"  >
                <v-card-text style="font-size:100%;text-align:left;width:100%"  @click="setTemplate(m1b)"
                class=" pa-0 pt-0 honza_color_seznam"
                >
                 {{ m1b['nazev']}}
                 </v-card-text>
                 </v-card>
                 </td>
                 <td style="width:20%" class="pa-0 honza_color_seznam">
                 <v-card class="pa-0 elevation-0 honza_color_seznam">
                 <v-card-text style="font-size:100%;text-align:left;width:100%;height:100%"  @click="setTemplate(m1b)"
                 class=" pa-0 pt-0 honza_color_seznam">
                 {{m1b['login']}}
                 </v-card-text>
                 </v-card>
                 </td>
                 </tr>
               </table>
              </a>
              </v-card>
              </td>
              <td style="width:10%;border-bottom:solid 1px" class="honza_color_seznam">
                <v-card class="pa-0  honza_color_seznam elevation-0">
                  <v-card-text
                  v-if="$store.state.idefix == m1b.user_update_idefix"
                  style="font-size:100%;text-align:center;width:100%;height:100%;cursor:pointer"  @click="delTemplate(m1b,$event)"
                  class=" pa-0 pt-0 pr-0 honza_color_seznam"
                  >
                  <i class="el-icon-delete honza_color_seznam"></i>
                  </v-card-text>
                  <v-card-text
                  v-else
                  style="font-size:100%;text-align:center;width:100%;height:100%;cursor:pointer"
                  @click="showTemplateVar()"
                  class=" pa-0 pt-0 pr-0 honza_color_seznam"
                  >
                  <!-- <i class="el-icon-question honza_color_seznam"></i> -->
                  &nbsp;


                  </v-card-text>
                  </v-card>


              </td>
            </tr>
          </table>
  </div>

  <div :id="'box'+ID2"  style="display:none">
    Ulozeni kalkulace
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
import prepocty from '../../services/fceKalkulacePrepocty'



import { locales } from 'moment';
//import JQuery from 'jquery'
//let $ = JQuery






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
       idefix:0, // pri nacteni se aktualizuje na otevrenou kalkulaci
       nazev: '',
       kcks: null,
       ks: null,
       naklad:null ,
       marze: null,
       prodej:null,
       marze_pomer: null,
       user_update_idefix: 0,
       nazevOrig:'',
       vlozit: 0,
       idefixuser:0,
       ID: 0,
     }
   }
 },
 async created() {

  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
  const self = this
    eventBus.$off('DATATEMPLATES')  //Nacitani rolovaciho menu - seznam templatu
    eventBus.$on('DATATEMPLATES',(server)=>{
      self.dataTemplates=server.data
      self.showTemplates = true
      //f.Alert("SERVER: ", JSON.stringify(self.dataTemplates))
    })
    eventBus.$off('DATATEMPLATE')  //Nacitenijedne jedina kompletni kalkulace z databaze
    eventBus.$on('DATATEMPLATE',(server)=>{

       self.form.obsah=server.data[0].obsah
//       f.Alert('SET', JSON.stringify(self.form.obsah))
       eventBus.$emit('MenuHlavni',
        {
          Kalkulace: server.data[0].obsah,
          key: 667,

        })
      //self.setTemplate(server.data)
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
    $("*").click(function(){
      //f.Alert(this)
      //$(this).toggle(2000)
      self.lastFocus=this.id
    })
    // $( function() {
    //   $( document ).tooltip();
    // });
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
    this.$nextTick(function () {
    // Code that will run only after the entire view has been rendered
      //$('input').hide(2000).show(2000);
      //$('input').dialog();
  })
 },

 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
  fokus(lastFocus=''){
    this.lastFocus=lastFocus
  },

  async setTemplate(cItem){
    const self = this
      var neco
      var ksOrig = cItem.ks
       neco=await(f.setCislo('Pocet kusu pro kalkulaci',cItem.ks))
//       alert(neco)

       //f.Alert(cItem.idefix)
       //return
       self.form.idefix=cItem.idefix
       self.form.nazev=cItem.nazev
       self.form.kcks = cItem.kcks
       self.form.ks = neco
       self.form.naklad = cItem.naklad
       self.form.marze = cItem.marze
       self.form.prodej = cItem.prodej
       self.form.marze_pomer = cItem.marze_pomer
       //Polozky pro praci
       self.form.user_update_idefix = cItem.user_update_idefix
       self.form.nazevOrig=cItem.nazev
       self.form.ID = self.ID2

       var nK= await(queryKalk.getTemplate(self.form.idefix))
       //,
       //await (f.Alert2('Ahoj //',JSON.stringify(nK[0].obsah.length) ," // ") )
       //alert('tEd ')
       var obsah = await(self.KalkulacePrepocetKusy(nK[0].obsah,neco))
       self.form.naklad = await(prepocty.getNaklad(obsah))
       //alert('spoceteno', self.form.naklad)
       //self.form.naklad = 2000
       //f.Alert2("OBSAH : " , JSON.stringify(obsah))
       //alert('cek')




       eventBus.$emit('MenuHlavni',
        {
          //Kalkulace: cItem.obsah,
          Kalkulace: nK[0].obsah,
          key: 667,

        })

  },
async KalkulacePrepocetKusy(k, ks=1){
  //f.Alert("K" , k.length)
  //return
  var defer = $.Deferred();
  //f.Alert("Propocet 1")
  k.forEach(element => {

      //f.Alert("E :: " , f.isEmpty(element.data.FormatNakladKs ), f.isEmpty(10))
      if (f.isEmpty(element.data.FormatNakladKs)) {
        element.data.FormatNakladKs = ks
      } else {
        element.data.FormatNakladKs = element.data.FormatNakladKs * ks
      }
  });

  defer.resolve(k);

  return defer.promise();

},
  delTemplate(cItem,e){
    const self = this
      f.stopka(e)
       //f.Alert(cItem.idefix)
       //return
       self.form.idefix=cItem.idefix
       $("#box"+self.ID2 ).dialog({
        modal: false,
        buttons: {
          Smazat: function() {

            eventBus.$emit("DELETETEMPLATE",{idefix: cItem.idefix })
            $( this ).dialog( "close" );
          },

          Zrusit: function() {

            $( this ).dialog( "close" );
          },
        },
        title: 'Smazat template ' + cItem.nazev + '?',

        show: {
          effect: "fade",
          duration: 500
        },
        hide: {
          effect: "fade",
          duration: 500
        },
        // position:
        // {
        //     my: 'left',
        //     at: 'right',
        //     of: event
        // }
      });
       return

       f.setFocus('seek'+self.ID2)

  },
  showTemplateVar(){
    const self = this
    this.showTemplates=true;

    //f.setFocus('seek'+self.ID2)
    setTimeout(function(){
      $('#seek'+self.ID2).trigger('click')
    },500)



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
  async send(){
    const self = this
    var idefixuser=self.$store.state.idefix
  //  alert(self.form.ID)
    self.form.ID=self.ID2
    //f.Alert(self.form.ID)
    //return
    eventBus.$emit("SAVETEMPLATE",{data: self.form })


    return


    //$("#box"+self.ID ).innerHTML ='AAA<b>BBB'
    $("#box"+self.ID ).dialog({
      modal: false,
      buttons: {
        Vlozit: function() {
          self.form.Vlozit=1
          eventBus.$emit("SAVETEMPLATE",{data: self.form })
          $( this ).dialog( "close" );
        },
        Prepsat: function() {
          self.form.Vlozit=2
          eventBus.$emit("SAVETEMPLATE",{data: self.form })
          $( this ).dialog( "close" );
        },


      },
       title: "Success" + self.idefix+ ' '+self.form.idefix + ' /' + self.form.nazev + '/ ' + self.form.nazevOrig + self.form.user_update_idefix + ' '+ idefixuser,
      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      }

    });

    //$("#box"+self.ID).css('visibility','visible')


    //$("#box"+self.ID).dialog()

    //eventBus.$emit("SAVETEMPLATE",{data: self.form })
    //queryKalk.setKalk(server.data,self.aKalkulace)
  },
  async dlg(){
    $("#box"+self.ID ).dialog({
      modal: true,
      buttons: {
        Ok: function() {

          $( this ).dialog( "close" );
        },

      },
      show: {
        effect: "blind",
        duration: 1000
      },
      hide: {
        effect: "explode",
        duration: 1000
      }

    });

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
  font-size:13px;
  font-weight: 900;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:10px;
  padding-right:10px;
}

.honza_cislo{
  background: #93908e;
  color: #ffffff !important;
  height:14px;
  font-size:13px;
  font-weight:900;
  opacity:1;
  caret-color: #ffffff !important;
  padding-left:10px;
  padding-right:5px;
}

.honza_color{
  background: #93908e;
  color: #ffffff;
}
.honza_color_seznam{
  background: #ececec;
  color: #3c3c3a;
  border-color:black;
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


