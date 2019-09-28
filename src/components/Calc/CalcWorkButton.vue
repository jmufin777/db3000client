<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
<div  style="max-height:80%; overflow:auto;font-size:100%;" class="white lighten-5 pa-0 pt-0 pb-0 " id="test_2"  @scroll="TestRend"
      :class="'buttons'+ID2"
>
    <table style="float:left;max-width:100%" >
      <tr style="height:28px" class="honza_color" >
      <td class="leva white pt-1 prava pr-1 honza_color" style="width:1em;;height:28px" >
        <v-icon size="medium" @click.native="f1.Alert2('Uzmaceno')">fa-lock</v-icon>
      </td>
      <td style="border-top:none;border-bottom:none;border-right: solid 2px white;max-width:8.5em;height:28px" class="honza_color" >
       <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:17.2em;width:100%" >
       <table  class="honza_color" border="0"><tr><td  class="honza_color pa-0" style="text-align:left">
        <button class="kolecko2" @click="copyVL()">
          <div class="kolecko" >
            <!-- <i class="el-icon-plus" style="color:#93908e;position:absolute;top:-0px;left:0px"></i> -->
            <span style="color:#93908e;position:absolute;top:-5px;left:3px;font-family:Helvetica">+</span>
            </div>
        </button>
        </td><td  class="honza_color pa-0" style="text-align:left">
        <button class="kolecko2"  @click="delVL()">
          <div class="kolecko" >
            <!-- <i class="el-icon-close" style="color:#93908e;position:absolute;top:-0px;left:0px"></i> -->
          <span style="color:#93908e;position:absolute;top:-5px;left:3px;font-family:monospace">x</span>
            </div>
        </button>
        </td><td  class="honza_color pa-0" style="text-align:left">
         <button class="kolecko2"  @click="setVL()" title="Ulozit">
           <div class="kolecko" v-if="IDEFIX==IDEFIXACTIVE">
           <i class="el-icon-arrow-down" style="color:#93908e;position:absolute;top:-0px;left:0px"
           ></i>
           </div>
           <div v-else class="kolecko" >
           <i class="el-icon-arrow-right" style="color:#93908e;position:absolute;top:-0px;left:0px"
           ></i>
           </div>
         </button>


        </td>
        </tr></table>
       </div>
      </td>
      <!-- ;seznamPoz('seek'+ID2) //-->
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 0px white;width:40em;height:28px" class="honza_color" >
       <input type="text" v-model="form.nazev" style="height:26px;border:none;width:100%" :placeholder="'TEXT NA FAKTURE '" class="honza_text"
        :id="'seek'+ID2"
        :IDEFIX="'seek'+IDEFIX"
        @focus="fokus('seek'+ID2);showTemplates=true"
        @blur="Opust('seek')"
        @click="showTemplates=ZobrazMenu"
        @keydown="showTemplates=ZobrazMenu;ZobrazMenu ? seznam('seek'+ID2+'_list_'+0,1,$event) : false"
        :title="(form.nazev>'')?'Text na fakture':''"
        >
        <!-- cale {{cTable}} -->
      </td>
      <td  style="text-align:center;border-top:none;border-bottom:none;border-right: solid 2px white;width:3em;height:28px" class="honza_color" >

        <div class="honza_color" style="height:26px;padding-top:2px;text-align:left;padding-left:7px;width:1em;width:100%"
        v-if="IDEFIX==IDEFIXACTIVE"
        >

         <button class="kolecko2" @click="send('template')" title="Ulozit" :id="'send_'+ID2"
         :IDEFIX="'send'+IDEFIX"

         >
           <div class="kolecko" >
           <i class="el-icon-upload" style="color:#93908e;position:absolute;top:-0px;left:0px"
           ></i>
           </div>
         </button>
        </div>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;height:28px;width:15em" class="honza_color" >
        <table><tr><td style="width:75%" class="honza_color">
        <input type="number" v-model="form.kcks" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="Kc/ks" class="honza_text honza_color pr-1 " title="Kc/ks"
        :id="'kcks'+ID2"
        :IDEFIX="'kcks'+IDEFIX"
        readonly
        >
        </td><td style="width:25%;" class="honza_color pt-1">
        <span style="font-size:14px">Kč/ks</span>
        </td></tr></table>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;height:28px;width:15em" class="honza_color" >
        <table><tr><td style="width:80%" class="honza_color">
        <input type="number" v-model="form.ks"
        style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="ks" class="honza_text honza_color pr-1 zmeny" title="Pocet kusu"
        :id="'ks'+ID2"
        :IDEFIX="'ks'+IDEFIX"

        >
        </td><td style="width:20%;" class="honza_color pt-1">
        <span style="font-size:14px">ks</span>
        </td></tr></table>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:24em;height:28px" class="honza_color" >
          <table><tr><td style="width:20%" class="honza_color">
            <span style="font-size:20px">&#931;</span><span>N</span>
            </td><td stylee="width:80%"  class="honza_color">
            <input type="number" v-model="form.naklad"  style="width:100%;text-align:right;height:26px;border:none;color:#ffffff !important"
                   :placeholder="'NAKLADY CELKEM' "
                   class="honza_text honza_color pr-1" title="Naklady celkem"
                   :id="'naklad'+ID2"
                   :IDEFIX="'naklad'+IDEFIX"
                   readonly
            >
        </td></tr></table>
        <!-- <input type="text" :value="f1.getCislo(form.naklad)" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" class="honza_text honza_color pr-1"> -->
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:20em;height:28px" class="honza_color" >
        <input type="number" v-model="form.marze" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="MARZE" class="honza_text honza_color pr-1" title="Marze"
        :id="'marze'+ID2"
        :IDEFIX="'marze'+IDEFIX"
        >
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px white;width:8em;height:28px;visibility:wisible" class="honza_color"  >
          <table border="0"><tr>
          <td style="width:80%" class="honza_color">
          <input type="text" v-model="form.marze_pomer" style="text-align:right;width:100%;height:26px;border:none;color:#ffffff !important" placeholder="" class="honza_text honza_color pr-1" title="Marze Pomer"
            :id="'marze_pomer'+ID2"
            :IDEFIX="'marze_pomer'+IDEFIX"
            readonly
          >
          </td>
          <td style="width:20%" class="honza_color">
            <span style="font-size:20px">%</span><span></span>
          </td>
          </tr></table>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px #93908e;width:24em;height:28px" class="honza_color" >
           <table border="0"><tr><td style="width:15%" class="honza_color">
            <span style="font-size:20px">&#931;</span><span>P</span>
            </td><td stylee="width:80%"  class="honza_color">
         <input type="number" v-model="form.prodej" style="width:100%;text-align:right;height:26px;border:none;color:#ffffff !important" placeholder="PRODEJ CELKEM" class="honza_text honza_color pr-1 " title="Prodej"
             :id="'prodej'+ID2"
             :IDEFIX="'prodej'+IDEFIX"
         >
        </td></tr></table>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px #93908e;width:29em;height:28px" class="honza_color2" >
         <input type="text" v-model="form.expedice_datum"
            :id="'expedice_datum'+ID2"
        :IDEFIX="'expedice_datum'+IDEFIX"
        style="text-align:center;width:100%;height:26px;border:none;color:#1d1d1b !important" placeholder="DATUM" class="datum_expedice honza_text2 honza_color2 pr-1 " title="DATUM EXPEDICE">
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: solid 2px #93908e;width:15em;height:28px" class="honza_color2" >
        <!-- <input type="text" v-model="form.expedice_cas" style="text-align:center;width:100%;height:26px;border:none;color:#1d1d1b !important" placeholder="A HOD. EXPEDICE" class="honza_text2 honza_color2 pr-1 cas_expedice ui-timepicker-input i-timepicker-positioned-top" title="HODINA EXPEDICE"> -->
      <select v-model="form.expedice_cas"
      style="text-align:center;width:100%;height:26px;border:none;color:#1d1d1b !important" placeholder="A HOD. EXPEDICE"
      class="honza_text2 honza_color2 pr-1 cas_expedice ui-timepicker-input i-timepicker-positioned-top" title="HODINA EXPEDICE"
      :id="'expedice_cas'+ID2"
      :IDEFIX="'expedice_cas'+IDEFIX"
      >
        <option v-for="(tItem,i) in timelist"
        :key="i"

        :label="tItem"
        :value="tItem"
         >{{tItem}}</option>
      </select>
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: none;width:20em;height:28px" class="honza_color2" >
        &nbsp;
      </td>
      <td  style="text-align:left;border-top:none;border-bottom:none;border-right: none;height:26px;height:28px" class="honza_color2" >
        VL seznam:
      </td>

      </tr>
      </table>
         <div class="honza_color2" style="height:29px;padding-top:2px;text-align:left;padding-left:7px;width:100%;text-align:right;padding-right:2%" >

           <button style="background:#c3c3bf;border-right: solid 1px white;border-left: solid 1px white;height:90%;width:28px" class="px-1"
           @click="prettyVL()"
           title="Nahled - detail podkladu pro propocet  "
           >
           <v-icon size="small" class="honza_color2" style="cursor:pointer;font-size:15px" >view_list</v-icon>
           </button>
           <button style="background:#c3c3bf;border-right: solid 1px white;border-left: solid 1px white;height:90%" class="px-1"
           @click="prepocetVL()"
           title="Prepocet radky"
           >
           <v-icon size="medium" class="honza_color2" style="cursor:pointer" >filter_9_plus</v-icon>
           </button>
           <button style="background:#c3c3bf;border-right: solid 1px white;border-left: solid 1px white;height:90%" class="px-1"
           @click="saveVL()"
           title="Ulozit"
           >
           <v-icon size="medium" class="honza_color2" style="cursor:pointer" >save</v-icon>
           </button>

           <button style="background:#c3c3bf;border-right: solid 1px white;border-left: solid 1px white;height:90%" class="px-1"
           @click="f1.Alert2('Odeslani do vyroby','pripravuje se', IDEFIX )"
           title="Odeslat do vyroby"
           >
           <v-icon size="medium" class="honza_color2" style="cursor:pointer" >rotate_right</v-icon>
           </button>
         </div>
         <div>
           neco
           <!-- {{showTemplates }} /{{ID2}} / {{ f1.getBottom('seek'+ID2,0) }} :: {{ ZobrazMenu }} : {{ form }} isOpen:  {{ isOpen}} -->
         </div>
      <div
        style="position:absolute;overflow:scroll;max-height:14em;z-index:999999999"
        :style="'top:'+ f1.getBottom('seek'+ID2,0)+'px;width:'+f1.getWidth('seek'+ID2,50)+'px;leftx:'+f1.getLeft('seek'+ID2, 0)+'px'"
        :id="'seek'+ID2+'_list2'"
        v-if=" showTemplates && ZobrazMenu  " class="elevation-12 honza_color_seznam"
      >
             <!-- {{showTemplates}} {{dataTemplates.length}} -->
              <table  width="100%" v-if="showTemplates " class="pa-2 honza_color_seznam" border="0">
                <tr v-if="false"><td colspan="20">POZ : {{'top:'+ f1.getBottom('seek'+ID2,0)+'px;width:'+f1.getWidth('seek'+ID2,50)+'px;left:'+f1.getLeft('seek'+ID2, 0)+'px'}}</td></tr>
                  <tr v-for="(m1b, i1b) in
                  dataTemplates.filter(
                    el =>
                      ( el.nazev.toUpperCase().match((form.nazev+'').toUpperCase()) && form.nazev+'' > '' && form.nazev !== el.nazev )
                      || (form.nazev+'').trim() == ''
                    )" :key="i1b" class="pa-0 honza_color_seznam">
                  <td class="pa-0 pl-1 honza_color_seznam" style="width:90%;border-bottom:solid 1px black">
                  <v-card class="pa-0 elevation-0 honza_color_seznam" style="width:100%;;border:solid 0px" >
                    <a :href="'#'" :id="'seek'+ID2+'_list_'+i1b"

                     @keydown="$event.keyCode==13?(setTemplate(m1b)):seznam('seek'+ID2+'_list_'+i1b,1,$event)"
                     @click="showTemplates=false;setTemplate(m1b)"
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
  <!-- <div
        style="position:absolute;overflow:scroll;max-height:14em;z-index:999999999"
        :style="'top:'+ f1.getBottom('seek'+ID2,0)+'px;width:'+f1.getWidth('seek'+ID2,50)+'px;'"
        :id="'seekTest'+ID2+'_list2'"
        class="elevation-12 honza_color_seznam"
      >
      SEEKTEST
  </div> -->

  <div :id="'box'+ID2"  style="display:none" :IDEFIX="'box'+IDEFIX">
    Ulozeni template
  </div>

<!--nabidka templates !-->

<!--nabidka templates !-->
  </div>
 <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, setInterval } from 'timers'
import f from '@/services/fce'
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole
import Q from '@/services/query'
import queryKalk from '../../services/fcesqlKalkulace'
import prepocty from '../../services/fceKalkulacePrepocty'

import { locales } from 'moment'
//import Q from '../../services/query'
//import JQuery from 'jquery'
//let $ = JQuery

export default {
   components: {
    'work-left': WorkLeft,
    'work-col': WorkCol,

 },
  props: {
    ID:0,
    ID2: {
      type: Number,
      default:0,
      required: false
    },

    IDEFIX: {
      type: Number,
      default:0,
      required: false
    },
    IDEFIXACTIVE: {
      // type: String,
      default:"0",
      required: false
    },
    ZobrazMenu: {  // k dispozici jsou rozbalovaci nabidky
      type: Boolean,
      required: false,
      default: false
    },
    isOpen: { //Pokud je kalkulace rozbalena - (vuex)
      type: Boolean,
      default: false,
      required: false
    },
    Poradi: {
      type: Number,
      required: false,
      default: 0
    },
    dataDB: {
        required: false,
    },
    cTable: {
      type: String,
      default:"xTable",
      required: true,
    }


  },
 data () {
   return {
     ID0: this.ID,
     IDEFIXTEMPLATE :0 ,

     f1: f,
     $: $,
     showTemplates: true,
     timeout: 0 , //tOpusteni:0,
     lastFocus:'',
     dataTemplates: [],
     ksLast: -100,
     pocetVolani:0,


     form: {
       idefix:0, // pri nacteni se aktualizuje na otevrenou kalkulaci
       nazev: '',
       kcks: null,
       ks: null,
       naklad:null ,
       marze: null,
       prodej:null,
       marze_pomer: null,
       expedice_datum: '01.01.2010',
       expedice_cas: "08:00",
       user_update_idefix: 0,
       nazevOrig:'',
       vlozit: 0,
       idefixuser:0,
       ID: 0,
     },
     timelist: ['00:00','08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00' ],
   }
 },
 beforeDestroy: function () {
    //this.choicesSelect.destroy()
    //f.Alert('Nazdar bazer')
},
deactivated: function () {
     //f.Alert('Nazdar bazer 2')
      eventBus.$off('AskID2')
  // remove any data you do not want to keep alive
},
 async created() {

  //  eventBus.$on('MenuLeft', (server) => {
  //     self.Left=server.key
  //     //self.addCol(server.key)

  //   })
  const self = this
//    eventBus.$off('DATATEMPLATES')  //Nacitani rolovaciho menu - seznam templatu
    eventBus.$on('DATATEMPLATES',(server)=>{

          server.data.forEach(el=>{
            self.dataTemplates.push(el)
          })
          self.dataTemplates=server.data
          self.showTemplates = true
          //f.Info(f.Jstr(self.dataTemplates))

        //f.Alert("SERVER: ", JSON.stringify(self.dataTemplates))




      //f.Alert("SERVER: ", JSON.stringify(self.dataTemplates))
    })
    //f.Alert('Tvorim')
    //eventBus.$off('AskID2')
    // eventBus.$on('AskID2',(server)=>{
    //   if (server.idefix == self.IDEFIX) {
    //     eventBus.$emit('AnswerID2',{id2:self.ID2})
    //      //f.Alert('ASK ', server.idefix,'Answer ', self.ID2, self.IDEFIX)
    //   }

    // }),
  //  eventBus.$off('DATATEMPLATE')  //Nacitenijedne jedina kompletni kalkulace z databaze
    eventBus.$on('DATATEMPLATE',(server)=>{

       self.form.obsah=server.data[0].obsah
//       f.Alert('SET', JSON.stringify(self.form.obsah))
       eventBus.$emit('MenuHlavni',
        {
          Kalkulace: server.data[0].obsah,
          key: 667,
        })
    })

  //self.ID2 = Math.round((Math.round(Math.random() * 1983458) * Math.round(Math.random() * 1983458)) / Math.round(Math.random() * 1983458))
  setTimeout(function(){
    $('#seek'+self.ID2).on('focus', function(){
      try {
        queryKalk.getTemplates()
        //f.Alert('a', this.id)
      } catch(e) {
        f.Alert('Chyba data templajtes')
      }
    })
   },100)
  $(document).ready(function(){
    $("*").click(function(){
      //f.Alert(self.lastFocus)
      //$(this).toggle(2000)
      self.lastFocus=this.id
    })


    // $( function() {
    //   $( document ).tooltip();
    // });
  });
 },

 async mounted () {
   const self = this
   var cvar = 'seek'+self.ID2+''

    //f.Alert('Created', self.isOpen)
/*
      eventBus.$off('DATARADKARECZADOST')  //Nacitani rolovaciho menu - seznam templatu
      eventBus.$on('DATARADKARECZADOST',(server)=>{
        if (self.isOpen){
          f.Alert('Poslu')
          eventBus.$emit('DATARADKASENDDATA',
            {
              data: self.form
            })
        }
      })
*/

    self.setDataDBtoForm()
     setInterval(function(){
       if (self.ksLast == self.form.ks) return;

       if (self.form.naklad !=0 && self.form.ks >0){
         //self.form.ks=Math.round(self.form.ks)
         self.form.ks=parseInt(self.form.ks)
         self.form.kcks = (self.form.naklad / self.form.ks).toFixed(2)
         self.ksLast = self.form.ks
         self.saveVL(0)
       }
     },200)


   //self.form.nazev= self.dataDB.nazev


   //f.Info(self.idefix)

   //var atmp= (await Q.all(self.idefix,'select * from calc_templates')).data.data

   //f.Info(JSON.stringify(atmp))

   $("#seek"+self.ID2).on('keypress', function(e){
             if (e.keyCode==9) {
               $('#kcks'+self.ID2).focus()
             }
        })
//  $("button,input").tooltip({
    /*
    show: {
        effect: "slideDown",
        delay: 250
      },
    hide: {
        effect: "explode",
        delay: 250
      }
    */
  // })
  $("input").change(function(){

    if (self.form.naklad !=0 && self.form.ks >0){
        self.form.kcks = self.form.naklad / self.form.ks
      }

  })

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
      $( ".datum_expedice" ).datepicker();
  })




      $( "#expedice_datum"+self.ID2 ).on('change', function(){
        //f.Alert(this.value)
        self.form.expedice_datum= this.value
      });

    $(window).bind('keydown', function(event) {

    if (event.ctrlKey || event.metaKey) {
        switch (String.fromCharCode(event.which).toLowerCase()) {
        case 's':
            //f.Alert2( $("#seek"+self.ID2).value )
            //$(window).trigger('blur')
            $(":focus").each(function() {
              // alert("Focused Elem_id = "+ this.id );
              $(this).trigger('blur')
            });

            event.preventDefault();

           $('#send_'+self.ID2).trigger('click')
           /*
           if (self.IDEFIX==0){
            self.send().then(
              setTimeout(function(){
                $("#seek"+self.ID2).focus()
              },3000)
            )
            }
            */

            //alert('ctrl-s');
            break;
        case 'f':
            break;
            event.preventDefault();
            alert('ctrl-f');
            break;
        case 'g':
            break;
            event.preventDefault();
            alert('ctrl-g');
            break;
        }
    }
    });


      //$(  "#expedice_datum"+self.ID2 ).datepicker( "option", "showAnim", "clip");


      //$(".cas_expedice").timepicker({'scrollDefault': 'now'});
      //$('.cas_expedice').timepicker();

/*
       $('.cas_expedice').timepicker({
           timeFormat: 'hh:mm',
           interval: 30,
           minTime: '8',
           maxTime: '18:00',
           defaultTime: '8',
           startTime: '10:00',
           dynamic: true,
           dropdown: true,
           scrollbar: true,
           orientation:'l',
           show2400: true
       });
*/



  //} );
 },
 computed: {
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',
      'KalkulaceThis',
      'user'



    ]),


  },


 methods: {
   TestRend() {
    //alert('aRend')
     eventBus.$emit("Rend")
  },
 async prepocetVL(){
       const self=this
       //self.cTable = 'calc_my_' + self.idefix
       var nK= await(queryKalk.getTemplateUser(self.IDEFIX,self.cTable))   //Aktualni kalulkulace
       self.form.naklad = await(prepocty.getNaklad(nK[0].obsah))
 },
 async prettyVL() {
       const self=this
       //self.cTable = 'calc_my_' + self.idefix
       var q = `select json_pretty(obsah) as vypis from ${self.cTable} where idefix= ${self.IDEFIX}`
       var atmp= (await Q.all(self.idefix,q)).data.data
       if (atmp.length>0) {
         //var vypis =
         f.Alert3("Detail",atmp[0].vypis)
       } else {
         alert('Vypis neni k dispozici')
       }


 },
  setDataDBtoForm(){
    const self=this
    if (!f.isEmpty(self.dataDB)) {  //form z db do pameti (self.form)
      Object.entries(self.dataDB).forEach(([key, val]) => {
        console.log(key); // the name of the current key.
        console.log(val); // the value of the current key.
        if (self.form.hasOwnProperty(key)) {
          self.form[key]=val
        }
      });
   }
  },
  fokus(lastFocus=''){
    const self = this
    if (self.ZobrazMenu == false)  return
    this.lastFocus=lastFocus
    var oSeznam="#"+lastFocus+"_list2"
     $(oSeznam).css("z-index",99999999999)

      $(oSeznam).show(1000)
      // $(oSeznam).hide(1000)
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

  //$(oSeznam).show(1000);

  //$(oSeznam).css("top",)
      // f.Info( pozTop+"px",pozLeft);

    } catch (e) {
      //f.Alert("Pokazena pozice")
    }


  },
  async delVL(){
    const self = this
    if (f.Confirm('Vymazat tento VL?')){
        eventBus.$emit('MenuHlavni', {key: 669, idefix: self.IDEFIX })
    }

  },



  async setVL(){
    const self=this
    if (self.IDEFIX==0){
      //f.Alert('Nelze rozbalit - neni v databazi')
      await eventBus.$emit('MenuHlavni', {key: 671, idefix: self.IDEFIX,akce:'vlozit' })
      return
    }
    await eventBus.$emit('MenuHlavni', {key: 671, idefix: self.IDEFIX })
    //f.Alert('setVL- rozbleni zabaleni', self.IDEFIX)
  },

  async copyVL(){
    const self=this
    if (self.IDEFIX==0)  {
      f.Alert2('Kalkulaci nelze zkopirovat, dokud neni ulozena')
      return
    }

    await eventBus.$emit('MenuHlavni', {key: 672, idefix: self.IDEFIX })
    //f.Alert('setVL- rozbleni zabaleni', self.IDEFIX)
  },


  async setTemplate(cItem){
    const self = this
      var neco
      var ksOrig = cItem.ks
      self.pocetVolani++
      neco=await(f.setCislo(`Pocet kusu pro kalkulaci ${self.pocetVolani}`,cItem.ks))
      //  .then((neco)=>{
      //  //  alert(neco)
      //  })
     //neco=prompt("Pocet kusu pro kalkulaci ${self.pocetVolani}")


//       alert(neco)

       //f.Alert(cItem.idefix)
       //f.Info('seek'+self.ID2)

       //return
       self.IDEFIXTEMPLATE = cItem.idefix
       self.form.idefix=cItem.idefix

       self.form.nazev=cItem.nazev
       self.form.kcks = cItem.kcks
       self.form.ks = neco
       self.form.naklad = cItem.naklad
       self.form.marze = cItem.marze
       self.form.prodej = cItem.prodej
       self.form.marze_pomer = cItem.marze_pomer
       self.form.expedice_datum = f.datum3(cItem.expedice_datum)
       self.form.expedice_cas = cItem.expedice_cas

       //Polozky pro praci
       self.form.user_update_idefix = cItem.user_update_idefix
       self.form.nazevOrig=cItem.nazev
       self.form.ID = self.ID2

      try {

       var nK= await(queryKalk.getTemplate(self.form.idefix))
       //,
       //await (f.Alert2('Ahoj //',JSON.stringify(nK[0].obsah.length) ," // ") )
       //alert('tEd ')

       // var obsah = await(self.KalkulacePrepocetKusy(nK[0].obsah,neco))
       var obsah = await(prepocty.KalkulacePrepocetKusy(nK[0].obsah,neco))

       self.form.naklad = await(prepocty.getNaklad(obsah))

       if (!f.isEmpty(self.form.expedice_cas)   ){
         self.form.expedice_cas=self.form.expedice_cas.substr(0,5)
       } else {
         self.form.expedice_cas = '08:00'
       }

       //if (f.isEmpty(self.form.expedice_datum)   ){
         if (self.form.expedice_datum.match(/Invalid/) ) {
           self.form.expedice_datum='05.07.2019'
         }


       eventBus.$emit('MenuHlavni',
        {
          //Kalkulace: cItem.obsah,
          Kalkulace: nK[0].obsah,
          key: 667,
          id2: self.ID2

        })
        } catch(e) {
          console.log('chyba prepoctu', e )
          //alert('chyba prepoctu' )
        }

  },
async KalkulacePrepocetKusySmazat(k, ks=1){
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
  async send(co='template'){
    const self = this
    var def= $.Deferred()
    var idefixuser=self.$store.state.idefix
    self.form.ID=self.ID2
    if (co == 'zaznam'){  //self.IDEFIX > 0 ||
      //f.Alert('Zaznam ' + self.IDEFIX )
       //await eventBus.$emit("SAVEZAZNAM",{data: self.form, idefix: self.IDEFIX })

       def.resolve( eventBus.$emit("SAVEZAZNAM",{data: self.form, idefix: self.IDEFIX }))
       return def.promise()
    }  else
    if ( co=='template') //self.IDEFIX == 0 ||
     {

       //f.Alert('B', self.IDEFIXTEMPLATE, ':: ', self.IDEFIXACTIVE )
       //await eventBus.$emit("SAVETEMPLATE",{data: self.form })
       self.form['idefixtemplate']= self.IDEFIXTEMPLATE
       var tmpform=f.Jparse(self.form)
       tmpform.idefix= self.IDEFIXTEMPLATE
        def.resolve( eventBus.$emit("SAVETEMPLATE",{data: tmpform }) )
       //def.resolve( eventBus.$emit("SAVETEMPLATE",{data: self.form }) )
       return def.promise()
    }

  },
  async jarda () {
    f.Alert('jarda')
  },
  async saveVL(question=1) { //Update
     const self = this
   if (question==0)   {
      //   await self.send('zaznam')
      return
   }
    if (question == 1 && f.Confirm('Uozit VL - update?')){
      await self.send('zaznam')
      //await self.jarda('zaznam')
      return

    var def= $.Deferred()
    var idefixuser=self.$store.state.idefix
  //  alert(self.form.ID)
    self.form.ID=self.ID2
    await eventBus.$emit('MenuHlavni', {key: 670, idefix: self.IDEFIX, data: self.form  })

    return def.promise()

    }
    //f1.Alert2('Ulozeni', IDEFIX );
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
            // $("#"+e.target.id).hide(1000)
            setTimeout(function(){
              document.getElementById(PrvekTxt).focus()
            },50)

            break;
     }
     }

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
button:focus, button:hover {
  zoom: 105%;
  opacity: 1;
}

.honza_text{
  background: #93908e;
  color: #ffffff;
  height:14px;
  font-size:14px;
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
  font-size:14px;
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

.honza_text2{
  background: #e4e4e3;
  color: #1d1d1b;
  height:14px;
  font-size:14px;
  font-weight: 900;
  opacity: 1;
  caret-color: #ffffff !important;
  padding-left:10px;
  padding-right:10px;
}

.honza_color2{
  background: #e4e4e3;
  color: #1d1d1b;
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


