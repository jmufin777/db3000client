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

     <table style="width:100%" cols=2>
       <tr v-for="(itemStroj, iStroj) in aStroj" :key="iStroj" v-if="idefixVidet == 0 || idefixVidet == itemStroj.idefix">
       <td style="width:80%">
         <span @click="SelectStroj(itemStroj.idefix,itemStroj.idefix_mod )" style="width:80%;border:20px;cursor:pointer" class="neco">

           <!-- {{ itemStroj.idefix }} : {{ idefixClick }} : {{ idefixVidet }} -->
           {{ itemStroj.stroj }} {{ idefixVidet>0?getStrojMod():'' }}


           <!-- : {{idefixVidet>0 ? itemStroj.stroj + ' ' + itemStroj.nazev : itemStroj.stroj }}
           :: [ {{$store.state.Kalkulace[k_id()].data.Menu1Value}} ] -->

        </span>
       </td>
      <td style="width:20%">
        <span @click="idefixClick=itemStroj.idefix; MenuShow1(MenuShow, $event )">
                 <!-- <span @click="MenuFormatShow1(MenuFormatShow, $event )"> -->
    <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light"></i>
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
     <table style="width:100%" cols=2><tr>
       <td style="width:80%">
         <span @click="MenuFormatShow1(MenuFormatShow, $event )" style="width:80%;border:20px">
        {{ form.Format }}
      <!-- A {{ getFormat() }} -->
     </span>
       </td>
      <td style="width:20%">
        <span @click="MenuFormatShow1(MenuFormatShow, $event )">
      <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light"></i>
    </span>
       </td>
     </tr>
    </table>

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
                <button v-if="$store.state.Kalkulace[k_id()].data.FormatValue == m1b.idefix" ref="menuformat1focus"  :id="'menuformat1focus'+ID" class="leva  elevation-1" style="width:90%;"
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)"
                >
                 {{m1b.nazev }}
                </button >
                <button v-else  style="width:90%" class=" leva "
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)">
                 {{ m1b.nazev }}
                </button >
                 </td >
                 <td style="width:20%">{{m1b.sirka}}</td><td style="width:20%">{{m1b.vyska}}</td>
              </tr>
            </thead>
         </table>
   </ta-ble3>
   </td></tr>
 </table>
 </div>

<!--Formaty -->


    </td></tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value >''" >
     <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Sirka:</td>
     <td colspan="7">
   <input type="text"   v-model="form.sirka" style="text-align:right" class="pr-2 pt-3 pb-3" @focus="$event.target.select()" @change="getFormatName()">
     </td>
  <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Vyska:</td>
    <td colspan="7">
   <input type="text"   v-model="form.vyska" style="text-align:right" class="pr-2 py-3" @focus="$event.target.select()" @change="getFormatName()">
   </td>
   </tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value>''">
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Naklad&nbsp;ks:</td>
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid;border-right:1px solid">
    <input type="text"   v-model="form.nakladks" style="text-align:right" class="pr-2 py-3" @focus="$event.target.select()" @change="ks()">
    </td>
    </tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value>''"><td colspan="20">
      <!-- upload-demo -->
     <el-upload
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
</el-upload>
      </td></tr>
      <tr><td colspan="20" style="border-bottom: dotted 1px silver" >&nbsp;</td></tr>

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

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,

       Format: '',
       nakladks: 0,
       filelist:[]

     },

    ID: 0,
    idefixVidet: 0,
    idefixClick: 0,

   }
 },

 mounted () {
   const self = this

   self.k_id()
   self.ID = Math.round(Math.random() * 1983458)+self.k_id()


   console.log("MenuStroj TOP")
   self.MenuStroj()
   console.log("MenuStroj EOF")

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
   ks() {
     this.form.nakladks = f.cislo(this.form.nakladks)
   },
   onoff() {
     this.active = !this.active
   //  alert(this.active)
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

          document.getElementById("menu1focus"+self.ID).focus()

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
          document.getElementById("menuformat1focus"+self.ID).focus()
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


     } else {
       self.idefixVidet =0
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
      console.log(self.aStroj)
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
        //alert(self.$store.state.Kalkulace[self.k_id()].data.Menu2[nTmp].idefix)
         self.idefixVidet=self.$store.state.Kalkulace[self.k_id()].data.Menu2[nTmp].idefix
         //alert(self.idefixVidet)
      }

      //alert(nTmp )

     //this.Kalkulace = []
     //this.$store.state.Kalkulace[this.k_id()].data.Menu1Value = a

   },
  setMenuFormat1Value (a, b) {

      const self = this
      var idK = this.k_id()
      self.setKalk(idK)
      // console.log("FORMAT VALUE ", a , idK, this.$store.state.Kalkulace[this.k_id()].data.FormatValue )
      // return
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatValue' , value: a })

      // var thisItem = self.$store.state.Kalkulace[this.k_id()].data.Menu1Value
      var thisItem = a

      self.$store.state.Kalkulace[self.k_id()].data.Format.forEach((el, idx) =>{
       if (idx == 0) {

         //self.form.sirka = el.sirka
         //self.form.vyska = el.vyska

       }
      if (el.idefix == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          var necoSirka = el.sirka
          var necoVyska = el.vyska
          self.form.sirka = necoSirka
          self.form.vyska = necoVyska
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






        nTmp =  _.findIndex(self.$store.state.Kalkulace[idK].data.Format, function (o) { return o.sirka*1 == self.form.sirka*1 && o.vyska*1 == self.form.vyska*1})
        if (nTmp >-1){
          self.form.Format = self.$store.state.Kalkulace[idK].data.Format[nTmp].nazev
          self.form.sirka = self.$store.state.Kalkulace[idK].data.Format[nTmp].sirka
          self.form.vyska = self.$store.state.Kalkulace[idK].data.Format[nTmp].vyska

        } else {
                nTmp =  _.findIndex(self.$store.state.Kalkulace[idK].data.Format, function (o) { return o.sirka*1 == self.form.vyska*1 && o.vyska*1 == self.form.sirka*1})
              if (nTmp >-1){
                self.form.Format = self.$store.state.Kalkulace[idK].data.Format[nTmp].nazev
                self.form.sirka = self.$store.state.Kalkulace[idK].data.Format[nTmp].sirka
                self.form.vyska = self.$store.state.Kalkulace[idK].data.Format[nTmp].vyska
              } else {
                   self.form.Format = 'Vlastní'
              }
        }

        if (self.form.sirka*1 > self.form.vyska*1) {
          console.log("getFormatName 3 : ", self.form.sirka,"/", self.form.sirka)

          setTimeout(function(){
            var neco = self.form.sirka
            self.form.sirka = self.form.vyska
            self.form.vyska = neco

          },2000)

        }
        //self.getFormat(1)

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


