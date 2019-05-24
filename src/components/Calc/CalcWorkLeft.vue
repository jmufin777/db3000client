<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
    <!-- <v-hover> -->
     <div style="font-size:100%; min-height:120px;widht:100%;border: solid 20px black"
     class="white lighten-5 pt-0 px-0 " v-if="$store.state.Kalkulace && $store.state.Kalkulace.length >0 "
     v-on:mouseover="active=true" v-bind:class="{'JsemVidet': active, 'JsemVidetMalo': !active }"
     v-on:mouseleave="active=false;MenuShowLeave()"
     @click="setKalk(kalkulaceid)"
     >
     <table cols="20">
       <tr><td v-for="n in 20" :key="n" style="font-size:1px">&nbsp;</td></tr>
       <tr>
<td colspan="2">
     <slot name="akce">
      Slota akce
   <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="1==1" ><i class="el-icon-delete" size="mini"></i></button>
   </slot>
</td>

<td colspan="18" >

<!-- Vychozi - Mody stroju //-->

  <div v-if="!MenuShow || true" style="width:100%;text-align:left" ref="menu1main" :id="'menu1main'+ID">

     <table style="width:100%" cols=2 >
       <tr v-for="(itemStroj, iStroj) in aStroj" :key="iStroj" v-if="idefixVidet == 0 || idefixVidet == itemStroj.idefix">
       <td style="width:80%">
         <v-card :class="{'grey lighten-2': $store.state.KalkulaceThis== kalkulaceid }"><v-card-text>
         <span @click="SelectStroj(itemStroj.idefix,itemStroj.idefix_mod )" style="width:80%;border:20px;cursor:pointer" class="neco">


           <!-- {{ itemStroj.idefix }} : {{ idefixClick }} : {{ idefixVidet }} -->
           {{ itemStroj.stroj }} {{ idefixVidet>0?getStrojMod():'' }}
             <!-- HUHU2 {{ idefixVidet }} {{ itemStroj.idefix_mod }} -->

           <!-- : {{idefixVidet>0 ? itemStroj.stroj + ' ' + itemStroj.nazev : itemStroj.stroj }}
           :: [ {{$store.state.Kalkulace[k_id()].data.Menu1Value}} ] -->

        </span>
       </v-card-text></v-card>
       </td>
      <td style="width:20%">
        <span @click="idefixClick=itemStroj.idefix; MenuShow1(MenuShow, $event )">
                 <!-- <span @click="MenuFormatShow1(MenuFormatShow, $event )"> -->
    <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light" style="cursor:pointer"></i>

    </span>
       </td>
     </tr>
    </table>

 <table style="width:100%;position:absolute;z-index:10000;border:solid 1px #DDDDDD"  ref="menu1" :id="'menu1'+ID"  class="neco"
 @mouseleave="MenuShowLeave()" @mouseover="MenuShowIn()"
 >
     <tr v-if="MenuShow" ><td colspan="2" border="0" style="border: solid 0px black" >
   <ta-ble3  :h="'350px'" :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'"

   >
         <table slot="head" style="width:100%" >
            <thead  >

              <tr>
                <th>Mod stroje </th>
              </tr>
            </thead>
          </table>
                   <table slot="body" style="width:100%">
            <thead  >
              <tr v-for="(m1, i1) in $store.state.Kalkulace[k_id()].data.Menu2" :key="i1" v-if="m1.idefix == idefixClick">

              <td class="leva pl-2" @click="setMenu1Value(m1.idefix_mod)" >
                <button v-if="$store.state.Kalkulace[k_id()].data.Menu1Value == m1.idefix_mod" ref="menu1focus"  :id="'menu1focus'+ID" class="leva  elevation-1" style="width:90%;"
                v-on:keyup.27="MenuShow1(MenuShow,$event)"

                >
                 {{m1.stroj +' ' + m1.nazev }}
                </button >
                <button v-else  style="width:90%" class=" leva "
                v-on:keyup.27="MenuShow1(MenuShow,$event)"

                >
                 {{m1.stroj +' ' + m1.nazev }}

                </button >
                 </td>
              </tr>
            </thead>
         </table>
   </ta-ble3>
   </td></tr>
 </table>

    <!-- {{ $store.state.Kalkulace[k_id()].data.Menu1Value}} -->
 </div>

    </td></tr>
    <tr v-if="form.MenuRet > 0 ||  true "><td colspan="20">

<!--Formaty -->
<!-- $store.state.Kalkulace[k_id()].type==2 &&  -->
    <div v-if="true" style="width:95%;text-align:left" ref="menuformat1main" :id="'menuformat1main'+ID" class="ml-4">
     <table style="width:100%; position:relative;left:17px" cols=2><tr>
       <td style="width:80%">
         <div @click="MenuFormatShow1(MenuFormatShow, $event )" style="width:100%;postion:relative;left:80px;font-size:100%">
        <!-- {{ form.Format }} -->
        <input type="text" v-model="form.Format" size="mini"  style="width:100%; height:25px" class="tdl tdn elevation-1" :placeholder="'Format'"
                @focus="MenuFormatShow=true"  :id="'seek'+ID">
      <!-- A {{ getFormat() }} -->
     </div>
       </td>


      <td style="width:20%">
<!--
      <span @click="MenuFormatShow1(MenuFormatShow, $event )">
      <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light" style="cursor:pointer"></i>
      </span>
//-->
       </td>
     </tr>
    </table>

      <div style="max-height:250px;overflow-y:scroll;position:absolute;z-index:1000"  v-if="MenuFormatShow" class="elevation-12 yellow"
        :style="'top:'+ getBottom('seek'+ID,250)+'px;width:'+getWidth('seek'+ID,20)+'px;left:'+getLeft('seek'+ID,50)+'px'" >
        <!-- {{ filtrData()}} -->
          <table  width="100%" v-if="MenuFormatShow" >
              <tr v-for="(m1b, i1b) in $store.state.Kalkulace[k_id()].data.Format.filter(el => (el.nazev.toUpperCase().match(FormatSearch.toUpperCase()) || (el.sirka+'').match(FormatSearch) || (el.vyska+'').match(FormatSearch)) || FormatSearch==''  )" :key="i1b" >
              <td >
              <v-card class="silver" style="width:95%;" >
                <a>
                <table style="width:100%"><tr><td style="width:70%">
                <v-card-text style="font-size:80%;text-align:left;width:100%"  @click="setMenuFormat1Value(m1b.idefix)"
                >
                 <!-- {{ item['sub'] }}  -->
                 {{ m1b['nazev']}}
                 </v-card-text>
                 </td><td style="width:30%;height:100">
                 <v-card-text style="font-size:80%;text-align:left;width:100%;height:100%"  @click="setMenuFormat1Value(m1b.idefix)"
                >
                 {{ m1b['sirka']*1}}&nbsp;x&nbsp;{{ m1b['vyska']*1}}
                 </v-card-text>
                 </td>
                 </tr></table>
              </a>
              </v-card>
              </td>
            </tr>
          </table>
        </div>

<!--
 <table style="width:100%;position:absolute;z-index:10000;border:solid 1px #DDDDDD"  ref="menuformat1" :id="'menuformat1'+ID"  class="neco">
<tr v-if="MenuFormatShow" @mouseleave="MenuFormatShow = false"><td colspan="2">
   <ta-ble3  :h="'350px'" :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'"   >
         <table slot="head" style="width:100%">
            <thead  >
              <tr>
              <th style="width:60%"> Format
                <input v-model="FormatSearch" size="mini"  style="width:40%" class="tdl tdn bila" placeholder="format">
                </th><th style="width:20%">Sirka</th><th style="width:20%">Vyska</th>
              </tr>

            </thead>
         </table>
         <table slot="body" style="width:100%">
            <thead  >
              <tr v-for="(m1b, i1b) in $store.state.Kalkulace[k_id()].data.Format.filter(el => (el.nazev.toUpperCase().match(FormatSearch.toUpperCase()) || (el.sirka+'').match(FormatSearch) || (el.vyska+'').match(FormatSearch)) || FormatSearch==''  )" :key="i1b" >
              <td style="width:60%" class="leva pl-2" @click="setMenuFormat1Value(m1b.idefix)" >
                <v-card><v-card-text>
                <button v-if="$store.state.Kalkulace[k_id()].data.FormatValue == m1b.idefix" ref="menuformat1focus"  :id="'menuformat1focus'+ID" class="leva  elevation-1" style="width:90%;"
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)"
                >
                 {{m1b.nazev }}
                </button >
                <button v-else  style="width:90%" class=" leva "
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)">
                 {{ m1b.nazev }}
                </button >
                </v-card-text>
                </v-card>
                 </td >
                 <td style="width:30%">{{m1b.sirka}}/</td><td style="width:20%">{{m1b.vyska}}</td>
              </tr>
            </thead>
         </table>
   </ta-ble3>
   </td></tr>
 </table>
//-->
 </div>

<!--Formaty -->


    </td></tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value >''" >
      <td colspan="20"><hr></td>
   </tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value>''">
    <td colspan="20" >
    <table>
      <tr>
     <td style="font-size:90%;text-align:left;border-bottom:0px solid;text-align:right;width:20%" class="pl-1">A x B</td>
      <td  style="text-align:center;width:17%">
        <input type="text"   v-model="form.sirka" style="text-align:right;width:90%;height:80%" class="tdl tdn elevation-1 pr-1" placeholder="A"  @focus="$event.target.select()" @change="getFormatName()">
      </td>
      <td style="width:3%">x</td>
      <td style="width:17%">
        <input type="text"   v-model="form.vyska" style="text-align:right;width:90%;height:80%" class="tdl tdn elevation-1 pr-1" @focus="$event.target.select()" @change="getFormatName()">
      </td>

      <td colspan="2" style="width:30%;">
        <select v-model="form.tisk" @change="getFormatName()" style="text-align:right;width:80%;height:90%;font-size:90%" class="tdl tdn elevation-1 pr-1 green lighten-2  pl-1 pr-2"
        >
                <option v-for="(a,b ) in Tisk"
                    :key="a.val"
                    :label="a.txt"
                    :value="a.val"
                >
                  {{ a.txt }}
                </option>
        </select>
      </td>
      </tr>
      <tr>
        <td style="width:20%;font-size:90%;pl-4">Panelovat</td>
        <td style="width:5%"><input type="checkbox" value="0" v-model="form.panelovat" :checked="(form.panelovat==1)" style="text-align:right;width:100%" class="tdl tdn elevation-0 pr-0" @change="getFormatName()"></td>
        <td style="width:10%;font-size:90%;">Po</td>
        <td style="width:20%">
          <input type="text"   v-model="form.sirkaPanel" style="text-align:right;width:80%;height:80%" class="tdl tdn elevation-1 pr-1"  @focus="$event.target.select()" @change="getFormatName();sirkaP()">
        </td>
        <td  style="width:10%;font-size:90%;" class="pl-1">Naklad&nbsp;ks:</td>
        <td  style="width:25%;text-align:right">
        <input type="text"   v-model="form.nakladks" style="text-align:right;width:80%;height:80%" class="tdl tdn elevation-1 pr-1" @focus="$event.target.select()" @change="ks();getFormatName()">
        </td>
      </tr>
    </table>
    </td>

    </tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value>''"><td colspan="20" style="text-align:left">
     <label class="custom-file-upload" style="height:25px;width:150px ">
            <input type="file" style="float:left"/>
      </label>



      <!-- upload-demo -->
     <!-- <el-upload
  class="el-upload-dragger1 upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  drag
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="form.filelist">

  <el-button size="small" type="primary" style="position:relative;left:-0%;top:10%">Data</el-button>
  <div slot="tip" class="el-upload__tip " >Prilohy</div>
</el-upload> -->
      </td></tr>
      <!-- <tr><td colspan="20" style="border-bottom: dotted 1px silver" >&nbsp;</td></tr> -->

    </table>

        <slot name="obsah">
         <!-- Slot Menu Leve -->
       </slot>
      </div>
<!-- </v-hover> -->
  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, clearTimeout } from 'timers'
import f from '@/services/fce'


export default {
  props: {

    kalkulaceid: {
      type : Number,
      required: true
    } ,

    typid: {
      type : Number,
      required: true
    },
   ID2: {
      type : Number,
      required: true
    }

  },
 data () {
   return {
     //soubory:
        active: false ,
        dialogImageUrl: '',
        dialogVisible: false,
        nTimer: false,
     //soubory
      MenuLeft: [

     ],
     MenuLeftJoin: [
       {key: 0 , text: 'Druh tisku'},
       {key: 1 , text: 'Velkoploch'},
       {key: 2 , text: 'Archovy'},
     ],

     FormatSearch: '' ,
     Format: [],

     FormatJoin: [


      ],


     aKalk: {},   //
     MenuShow: false,
     MenuFormatShow: false,
     aStroj: [],
     Tisk: [
       {val:0,txt:'Jednostranny'},
       {val:1,txt:'Oboustranny'},
       {val:2,txt:'Oboustranny ruzny'},
       {val:3,txt:'Bez tisku'},

     ],

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,
       tisk:0,
       sirkaPanel: 0,
       panelovat:0,

       Format: '',
       nakladks: 0,
       filelist:[]

     },
     last: {
       sirka: 0,
       vyska: 0
     },

     Kalk:[],


    ID: 0,
    idefixVidet: 0,  //Nasypat do vuexu idefixVidet
    idefixClick: 0,

   }
 },

 mounted () {
   const self = this

   self.k_id()
   self.ID = Math.round(Math.random() * 1983458)+self.k_id()
   var neco=JSON.stringify(self.Kalkulace[self.k_id()])
   self.Kalk=JSON.parse(neco)
   // alert(self.k_id())




   console.log("MenuStroj TOP")
   self.MenuStroj()
   console.log("MenuStroj EOF")
   self.readVuexData()

   return

   /*
   self.FormatJoin.forEach(element => {
     self.Format.push({text: element.text})
   });

    self.MenuLeftJoin.forEach(element => {
     self.MenuLeft.push({text: element.text})
   });
   */



 },
 methods: {
   readVuexData(){
     const self=this
     self.form.nakladks = self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs
     self.form.sirka = self.$store.state.Kalkulace[self.k_id()].data.FormatSirka
     self.form.vyska = self.$store.state.Kalkulace[self.k_id()].data.FormatVyska
     self.form.panelovat = self.$store.state.Kalkulace[self.k_id()].data.FormatPanelovat
     self.form.sirkaPanel = self.$store.state.Kalkulace[self.k_id()].data.FormatSirkaPanel
     self.form.tisk = self.$store.state.Kalkulace[self.k_id()].data.FormatTisk
     self.idefixVidet = self.$store.state.Kalkulace[self.k_id()].data.idefixVidet
   //  this.$store.dispatch('setKalk',this.aKalkulace[0].kalkulaceid)

    self.form.vyska = self.$store.state.Kalkulace[self.k_id()].data.FormatVyska


   },
   ks() {
     this.form.nakladks = f.cislo(this.form.nakladks)
   },
   sirkaP() {
     this.form.sirkaPanel = f.cislo(this.form.sirkaPanel)
   },
   onoff() {
     this.active = !this.active
   //  alert(this.active)
   },
   getBottom(id,addPoz=10) {
     var neco=-1000
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

   getLeft(id,addPoz=10) {
     var neco=-1000
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetLeft+addPoz


     } else {
     }

     return neco;
   },
   getWidth(id,addPoz=10) {
     var neco=-1000
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetWidth+addPoz

       //neco = oNeco.offsetTop
       //alert(neco)

     } else {

     }

     return neco;
   },
  MenuShowLeave() {
    const self = this

    if (self.nTimer == false) {

    self.nTimer = setTimeout(function(){
       self.MenuShow = false
       // alert("Mizim")
    },300)

    } else {
      self.MenuShow = false
      clearTimeout(self.nTimer)
      self.nTimer=false


    }
  },
    MenuShowIn() {
    const self = this
  //  alert("Zjeveni")
    if (self.nTimer == false) {
    self.nTimer = setTimeout(function(){
       self.MenuShow = true
    //  alert("Zjeveni")
    },300)
    } else {
      clearTimeout(self.nTimer)
      self.nTimer=false
    }
  },
   MenuShow1(yesno,e) {

    const self = this

     if (yesno== 0) {
       this.MenuShow = true

        document.getElementById("menu1"+self.ID).style.left =(e.clientX - 300) +'px'
        document.getElementById("menu1"+self.ID).style.top  =(e.clientY + 0) +'px'
        self.MenuFormatShow = false;
        setTimeout(function() {

          document.getElementById("menu1"+self.ID).style.width = document.getElementById("menu1main"+self.ID).offsetWidth +'px'
          document.getElementById("menu1"+self.ID).style.left = (document.getElementById("menu1main"+self.ID).offsetLeft + 100) + 'px'
          if (  document.getElementById("menu1focus"+self.ID) )  {
            document.getElementById("menu1focus"+self.ID).focus()
            //alert('prdel2 OK')
          } else {
            // alert('prdel2')
          }
        },200)

     }
     if (yesno==1) {
       this.MenuShow = false

     }

   },
    MenuFormatShow1(yesno,e) {
    const self = this

     if (yesno== 0) {
       this.MenuFormatShow = true
         document.getElementById("menuformat1"+self.ID).style.left = (e.clientX - 300) +'px'
         document.getElementById("menuformat1"+self.ID).style.top =  (e.clientY -50) +'px'
         self.MenuShow = false;

        setTimeout(function() {

          document.getElementById("menuformat1"+self.ID).style.width = document.getElementById("menuformat1main"+self.ID).offsetWidth +'px'
          document.getElementById("menuformat1"+self.ID).style.left = (document.getElementById("menuformat1main"+self.ID).offsetLeft + 100) + 'px'
          if (  document.getElementById("menu1focus"+self.ID) )  {
          document.getElementById("menuformat1focus"+self.ID).focus()
          //alert('prdel3 OK')
         } else {
            //alert('prdel3')
          }
        },200)
     }
     if (yesno==1) {
       this.MenuFormatShow = false
     }

   },
   SelectStroj(idefixVidet,idefix_mod) {
     const self = this
     if (self.idefixVidet == 0) {
     self.idefixVidet = idefixVidet
     self.setMenu1Value(idefix_mod)
     //alert('vide')


     } else {
       self.idefixVidet =0
       //alert('vide  2')
     }
   },

MenuStroj() {
  const self = this
  var nTmp;

  self.$store.state.Kalkulace[self.k_id()].data.Menu2.forEach(el => {
    nTmp =  _.findIndex(self.aStroj, function (o) { return o.idefix  == el.idefix })
    if (nTmp < 0){
      self.aStroj.push({idefix: el.idefix, stroj: el.stroj,idefix_mod: el.idefix_mod, nazev: el.nazev})
    }
      // console.log(self.aStroj)
  })
},


   setMenu1Value (a, b) {
      const self = this
      var idK = this.k_id()
      self.setKalk(idK)


      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'Menu1Value' , value: a })

      self.MenuShow1(1,0)
      var nTmp =  _.findIndex(self.$store.state.Kalkulace[self.k_id()].data.Menu2, function (o) { return o.idefix_mod  == a })
      if(nTmp > -1) {
            self.idefixVidet=self.$store.state.Kalkulace[self.k_id()].data.Menu2[nTmp].idefix
            self.Kalk.data.txtStroj = self.Kalk.data.Menu2[nTmp].stroj + ' '+ self.Kalk.data.Menu2[nTmp].nazev


            // {{ itemStroj.stroj }} {{ idefixVidet>0?getStrojMod():'' }}
         }
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'idefixVidet' , value: self.idefixVidet })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'txtStroj' , value: self.Kalk.data.txtStroj })
      //self.Kalk.data.txtStroj="NAZDARBAZAR"
      self.$store.dispatch('setKalk',self.Kalk)
      //alert('memik ' + self.idefixVidet + '  ) ')
   },
  setMenuFormat1Value (a, b) {

      const self = this
      var idK = this.k_id()
      self.setKalk(idK)
      // console.log("FORMAT VALUE ", a , idK, this.$store.state.Kalkulace[this.k_id()].data.FormatValue )
      // return

      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatValue' , value: a })
      if (self.form.sirka >0 && self.form.vyska > 0 ){
        //alert('aaaaa')
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: self.form.sirka })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatVyska' , value: self.form.vyska })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatTisk' , value: self.form.tisk })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatPanelovat' , value: self.form.panelovat })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirkaPanel' , value: self.form.sirkaPanel })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatNakladKs' , value: self.form.nakladks })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'idefixVidet' , value: self.idefixVidet })
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'txtFormat' , value: self.form.Format })
      //self.Kalk.data.txtFormat =
      //self.$store.dispatch('replaceKalk',self.Kalk)
      //alert(self.Kalk.data.txtFormat)


      }

      alert("sypu 1")




      // var thisItem = self.$store.state.Kalkulace[this.k_id()].data.Menu1Value
      var thisItem = a
      //alert(thisItem);
      self.$store.state.Kalkulace[self.k_id()].data.Format.forEach((el, idx) => {
       if (idx == 0) {

         //self.form.sirka = el.sirka
         //self.form.vyska = el.vyska

       }

      if (el.idefix == thisItem) {

          //console.log(el.nazev, el.idefix_mod)
          var necoSirka = el.sirka
          var necoVyska = el.vyska
          if (el.kod ==9999) {
                      self.form.sirka = self.last.sirka*1
                      self.form.vyska = self.last.vyska*1
          } else {
          self.form.sirka = necoSirka*1
          self.form.vyska = necoVyska*1
          }
          self.form.Format=el.nazev
          self.getFormatName()
          return
      }
    })

      // console.log("FORMAT VALUE ", a , idK, this.$store.state.Kalkulace[this.k_id()].data.FormatValue )
      self.MenuFormatShow1(1,0)
     //this.Kalkulace = []
     //this.$store.state.Kalkulace[this.k_id()].data.Menu1Value = a

   },


   neco(a,b) {
     console.log("neco A:" , a,"B:",b,"C:",a.target)
   },
   MenuRet (a,b) {
     const self = this
     console.log("a",a)

     //alert(1)
     self.MenuLeftJoin.forEach(el => {
       if (el.text == a) {
         self.form.MenuRet = el.key
         console.log("ret",self.form.MenuRet)
         return
       }
     })

     //eventBus.$emit('WorkLeft',{key: self.nRet })
     //console.log(a ,"::: ", self.nRet)

   },

   //Soubory
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`pred presunem souboru ${ file.name }？`);
      },

      /*
      var el = this.$el.getElementsByClassName("actual-month")[0];
  el.scrollIntoView()
  */

   //Soubory
 //store a indexy
 k_id() {
  var kRet=   this.$store.getters.getId(this.kalkulaceid)
  return kRet


 },

 setKalk(idK) {  //Je potreba prevzit ID z CalcIndex
          this.$store.dispatch('setKalk',idK)
           var neco = 'ref_'+idK+this.ID2
           this.defaultStyle(idK)
   },
   defaultStyle(setkalkId= -1) {
    const self = this
    var neco
         self.$store.state.Kalkulace.forEach(element => {
            neco = 'ref_'+element.kalkulaceid + self.ID2
            if (document.getElementById(neco)){
              document.getElementById(neco).style.color="green"
              f.changeClass(document.getElementById(neco),"elevation-12",'elevation-0')
              //f.addClass("elevation-0",'elevation-12')
            }

         })
         if (setkalkId > 0) {

               neco = 'ref_'+setkalkId+self.ID2
               setTimeout(function(){
               if (document.getElementById(neco)) {
                 //alert('b'+self.ID2)
                 document.getElementById(neco).style.color='red'
                 f.changeClass(document.getElementById(neco),"elevation-0",'elevation-12')
                }
            },100)
            }

  },
  setKalk1(idK) {
          this.$store.dispatch('setKalk',idK)
          console.log('setKalk',idK)
  },
  getStrojMod() {
    //return 'ahoj'
    const self = this
    var thisItem = self.$store.state.Kalkulace[this.k_id()].data.Menu1Value
    var cRet =''
    var cDefRet =''
    self.$store.state.Kalkulace[self.k_id()].data.Menu2.forEach((el, idx) =>{
       if (idx == 0) {
    //     cDefRet = el.stroj +' ' + el.nazev
         cDefRet = el.nazev
       }
      if (el.idefix_mod == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          //cRet = el.stroj +' ' + el.nazev
          cRet =  el.nazev
      }
    })

    return (cRet>'')?cRet:cDefRet
    //return this.$store.state.Kalkulace[this.k_id()].data.Menu1Value
  },


SetFormat(a,b) {
     const self = this
     console.log("XXXXXXXXXretFormat",self.form.MenuRet)
     self.FormatJoin.forEach(el => {
       if (el.text == a) {
         self.form.sirka = el.sirka
         self.form.vyska =  el.vyska
         self.form.Format = el.text
         console.log("XXXXXXXXXretFormat",self.form.MenuRet)
         return
       }
     })
   },

getFormatName() {
     const self = this
      var idK = self.k_id()
      var nTmp = -1
       //self.form.sirka= (self.form.sirka+'').replace(/,/,".")
        //self.form.vyska= (self.form.vyska+'').replace(/,/,".")
          self.form.sirka = f.cislo(self.form.sirka)
          self.form.vyska = f.cislo(self.form.vyska)



     if (self.form.vyska > 0 && self.form.vyska>0){

          console.log(self.form.vyska)





//&& o.vyska*1 == self.form.vyska*1) || (o.sirka*1 == self.form.vyska*1 && o.vyska*1 == self.form.sirka*1)
        // nTmp =  _.findIndex(self.$store.state.Kalkulace[idK].data.Format, function (o) { return
        // (o.sirka*1 == self.form.sirka*1 )
        // })
        self.$store.state.Kalkulace[idK].data.Format.forEach((el,idx) => {
          if (self.form.sirka*1==el.sirka*1 && self.form.vyska*1==el.vyska*1  ) {
            nTmp=idx
            return
            // console.log(el.sirka*1, el.vyska*1);
            // alert("Ok 11 - nazev "+ el.nazev+ " / "+(el.vyska*1))
          }

          if (self.form.vyska*1==el.sirka*1  && self.form.sirka*1==el.vyska*1  ) {
            nTmp=idx
            return
            // console.log(el.sirka*1, el.vyska*1);
            // alert("Ok 11 - nazev "+ el.nazev+ " / "+(el.vyska*1))
          }


        })
        if (nTmp >-1){

          self.form.Format = self.$store.state.Kalkulace[idK].data.Format[nTmp].nazev
          self.form.sirka  = self.$store.state.Kalkulace[idK].data.Format[nTmp].sirka*1
          self.form.vyska  = self.$store.state.Kalkulace[idK].data.Format[nTmp].vyska*1


        } else {
                  self.last.sirka =  f.cislo(self.form.sirka)
                  self.last.vyska =  f.cislo(self.form.vyska)
                  self.form.Format = 'Vlastní'

        }

        //         nTmp =  _.findIndex(self.$store.state.Kalkulace[idK].data.Format, function (o) { return
        //         (o.sirka*1 == self.form.vyska*1 && o.vyska*1 == self.form.sirka*1) ||(o.sirka*1 == self.form.sirka*1 && o.vyska*1 == self.form.vyska*1)
        //         })
        //       if (nTmp >-1){
        //         self.form.Format = self.$store.state.Kalkulace[idK].data.Format[nTmp].nazev
        //         self.form.sirka = self.$store.state.Kalkulace[idK].data.Format[nTmp].sirka
        //         self.form.vyska = self.$store.state.Kalkulace[idK].data.Format[nTmp].vyska

        //       } else {
        //           self.last.sirka =  f.cislo(self.form.sirka)
        //           self.last.vyska =  f.cislo(self.form.vyska)
        //           self.form.Format = 'Vlastní'
        //       }
        // }

        if (self.form.sirka*1 > self.form.vyska*1) {
          console.log("getFormatName 3 : ", self.form.sirka,"/", self.form.sirka)
          setTimeout(function(){
            var neco = self.form.sirka
//            self.form.sirka = self.form.vyska
  //          self.form.vyska = neco
          },2000)
        }
        //self.getFormat(1)
     }
     //console.log("Pridam jej")
     if (self.form.sirka > 0 && self.form.vyska > 0 ) {

       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: self.form.sirka })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatVyska' , value: self.form.vyska })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatTisk' , value: self.form.tisk })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatPanelovat' , value: self.form.panelovat })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirkaPanel' , value: self.form.sirkaPanel })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatNakladKs' , value: self.form.nakladks })
       self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'txtFormat' , value: self.form.Format })
       //self.Kalk.data.txtFormat = self.form.Format
       //self.$store.dispatch('setKalk',self.Kalk)
       self.$store.dispatch('setKalk',idK)
       //self.$store.dispatch('replaceKalk',self.Kalk)
      // alert(self.Kalk.data.txtFormat)
        // alert("sypu 2 idK : "+ idK )
      //return
       //alert(" LEFT " + idK )
       eventBus.$emit('MatCol', {key: idK  })
     }
   },

 //--Values
 Menu1 () {
   return this.$store.Kalulace[this.k_id()].data.Menu1
 }


 },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',


    ]),
  },
}

</script>

<style>
.v-list__tile .v-list__tile--link .v-list__tile--active .theme--light .primary--text {
  z-index: 1000000 !important;
  opacity: 0.5;
  background:black !important;
}
textarea:focus, input:focus {
    outline: 1px dashed;

}
td th {
  font-size: 12px;
}
</style>
<style scoped>
input[type="file"] {
    display: block;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}

::-webkit-file-upload-button {

  background: yelllow;
  color: red;
  padding: 1em;

}

select:focus, option:focus {
    color: black;
    font-weight: 600;

}

table tr td {
  border:none;
}

input {
  border:none;
}

.el-upload-dragger1 {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 98%;
    height: 80px;
    text-align: left;
    position: relative;
    overflow: hidden;
}
button:focus, input:focus{
    outline: none;
    color: green;
}


.neco {
  transition:   left 0.4s cubic-bezier(.42,-0.3,.78,.25),
                top 0.4s cubic-bezier(.42,-0.3,.78,.25);
}











</style>


