<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
    <!-- <v-hover> -->
     <div style="font-size:100%; min-height:120px;widht:100%;border: solid 20px black"
     class="white lighten-5 pt-0 px-0 " v-if="$store.state.Kalkulace && $store.state.Kalkulace.length >0 "
     v-on:mouseover="active=true" v-bind:class="{'JsemVidet': active, 'JsemVidetMalo': !active }"
     v-on:mouseout="active=false"
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

   <div v-if="!MenuShow || true" style="width:100%;text-align:left" ref="menu1main" id="menu1main">
     <table style="width:100%" cols=2><tr>
       <td style="width:80%">
         <span @click="MenuShow1(MenuShow, $event )" style="width:80%;border:20px">
      {{ getStrojMod() }}
     </span>
       </td>
      <td style="width:20%">
        <span @click="MenuShow1(MenuShow, $event )">
    <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light"></i>
    </span>
       </td>
     </tr>
    </table>

 <table style="width:100%;position:absolute;z-index:10000;border:solid 1px #DDDDDD"  ref="menu1" id="menu1"  class="neco">
     <tr v-if="MenuShow" ><td colspan="2">
   <ta-ble3  :h="'350px'" :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'"       v-if="MenuShow" >
         <table slot="body" style="width:100%">
            <thead  >
              <tr v-for="(m1, i1) in $store.state.Kalkulace[k_id()].data.Menu2" :key="i1">
              <td class="leva pl-2" @click="setMenu1Value(m1.idefix_mod)" >
                <button v-if="$store.state.Kalkulace[k_id()].data.Menu1Value == m1.idefix_mod" ref="menu1focus"  id="menu1focus" class="leva  elevation-1" style="width:90%;"
                v-on:keyup.27="MenuShow1(MenuShow,$event)"
                >
                 {{m1.stroj +' ' + m1.nazev }}
                </button >
                <button v-else  style="width:90%" class=" leva "
                v-on:keyup.27="MenuShow1(MenuShow,$event)">
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
<div v-if="true" style="width:95%;text-align:left" ref="menuformat1main" id="menuformat1main" class="ml-4">
     <table style="width:100%" cols=2><tr>
       <td style="width:80%">
         <span @click="MenuFormatShow1(MenuFormatShow, $event )" style="width:80%;border:20px">
      {{ getFormat() }}
     </span>
       </td>
      <td style="width:20%">
        <span @click="MenuFormatShow1(MenuFormatShow, $event )">
    <i aria-hidden="true" class="v-icon mdi mdi-menu-down theme--light"></i>
    </span>
       </td>
     </tr>
    </table>

 <table style="width:100%;position:absolute;z-index:10000;border:solid 1px #DDDDDD"  ref="menuformat1" id="menuformat1"  class="neco">
<tr v-if="MenuFormatShow" ><td colspan="2">
   <ta-ble3  :h="'350px'" :Sirka="1000" :Leva="'0%'" :Prava="'0%'" :Stred="'100%'"   >
         <table slot="head" style="width:100%">
            <thead  >
              <th style="width:60%"> Format</th><th style="width:20%">Sirka</th><th style="width:20%">Vyska</th>
            </thead>
         </table>
         <table slot="body" style="width:100%">
            <thead  >
              <tr v-for="(m1, i1) in $store.state.Kalkulace[k_id()].data.Format" :key="i1" >
              <td style="width:60%" class="leva pl-2" @click="setMenuFormat1Value(m1.idefix)" >
                <button v-if="$store.state.Kalkulace[k_id()].data.FormatValue == m1.idefix" ref="menuformat1focus"  id="menuformat1focus" class="leva  elevation-1" style="width:90%;"
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)"
                >
                 {{m1.nazev }}
                </button >
                <button v-else  style="width:90%" class=" leva "
                v-on:keyup.27="MenuFormatShow1(MenuFormatShow,$event)">
                 {{ m1.nazev }}
                </button >
                 </td >
                 <td style="width:20%">{{m1.sirka}}</td><td style="width:20%">{{m1.vyska}}</td>
              </tr>
            </thead>
         </table>
   </ta-ble3>
   </td></tr>
 </table>
     <!-- {{ $store.state.Kalkulace[k_id()].data.Menu1Value}} -->
 </div>

<!--Formaty -->






    </td></tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value >''" >
     <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Sirka:</td>
     <td colspan="7">
   <input type="text"   v-model="form.sirka" style="text-align:right" class="pr-2 pt-3 pb-3">
     </td>
  <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Vyska:</td>
    <td colspan="7">
   <input type="text"   v-model="form.vyska" style="text-align:right" class="pr-2 py-3">
   </td>
   </tr>
    <tr v-if="$store.state.Kalkulace[k_id()].data.Menu1Value>''">
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Naklad&nbsp;ks:</td>
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid;border-right:1px solid">
    <input type="text"   v-model="form.nakladks" style="text-align:right" class="pr-2 py-3">
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
import { setTimeout, clearInterval } from 'timers'


export default {
  props: {

    kalkulaceid: {
      type : Number,
      required: true
    } ,

    typid: {
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
     //soubory
      MenuLeft: [

     ],
     MenuLeftJoin: [
       {key: 0 , text: 'Druh tisku'},
       {key: 1 , text: 'Velkoploch'},
       {key: 2 , text: 'Archovy'},
     ],

     Format: [],

     FormatJoin: [


      {key:  10 , text: "A0"                 ,sirka: 118.80 ,vyska:  84.00 },
      {key:  17 , text: "A0"                 ,sirka: 118.80 ,vyska:  84.00 },
      {key:  18 , text: "A1"                 ,sirka:  84.00 ,vyska:  59.40 },
      {key:  19 , text: "A2"                 ,sirka:  59.40 ,vyska:  42.00 },
      {key:  20 , text: "A1"                 ,sirka:  84.00 ,vyska:  59.40 },
      {key:  20 , text: "A3"                 ,sirka:  42.00 ,vyska:  29.70 },
      {key:  21 , text: "A4"                 ,sirka:  29.70 ,vyska:  21.00 },
      {key:  22 , text: "A5"                 ,sirka:  21.00 ,vyska:  14.80 },
      {key:  23 , text: "A6"                 ,sirka:  14.80 ,vyska:  10.50 },
      {key:  24 , text: "A7"                 ,sirka:  10.50 ,vyska:   7.40 },
      {key:  30 , text: "A2"                 ,sirka:  59.40 ,vyska:  42.00 },
      {key:  40 , text: "A3"                 ,sirka:  42.00 ,vyska:  29.70 },
      {key:  50 , text: "A4"                 ,sirka:  29.70 ,vyska:  21.00 },
      {key:  60 , text: "A5"                 ,sirka:  21.00 ,vyska:  14.80 },
      {key:  70 , text: "A6"                 ,sirka:  14.80 ,vyska:  10.50 },
      {key:  80 , text: "A7"                 ,sirka:  10.50 ,vyska:   7.40 },
      {key:  90 , text: "B0"                 ,sirka: 141.00 ,vyska: 100.00 },
      {key: 100 , text: "B1"                 ,sirka: 100.00 ,vyska:  70.70 },
      {key: 110 , text: "B2"                 ,sirka:  70.70 ,vyska:  50.00 },
      {key: 120 , text: "B3"                 ,sirka:  50.00 ,vyska:  35.40 },
      {key: 130 , text: "B4"                 ,sirka:  35.40 ,vyska:  25.00 },
      {key: 140 , text: "B5"                 ,sirka:  25.00 ,vyska:  17.70 },
      {key: 150 , text: "B6"                 ,sirka:  17.70 ,vyska:  12.50 },
      {key: 160 , text: "B7"                 ,sirka:  12.50 ,vyska:   8.85 },
      {key: 170 , text: "SRA 3"              ,sirka:  45.00 ,vyska:  32.00 },
      {key: 180 , text: "DL"                 ,sirka:   9.90 ,vyska:  21.00 },
      {key: 190 , text: "Citylight"          ,sirka: 175.00 ,vyska: 118.50 },
      {key: 200 , text: "Billboard EURO"     ,sirka: 238.00 ,vyska: 504.00 },
      {key: 210 , text: "Billboard AVENIR"   ,sirka: 300.00 ,vyska: 400.00 },
      {key: 220 , text: "Billboard EASTWEST" ,sirka: 320.00 ,vyska: 480.00 },
      {key: 230 , text: "Big Board"          ,sirka: 360.00 ,vyska: 960.00 },
      {key: 999 , text: "Vlastni"            ,sirka:   0.00 ,vyska:   0.00 }
      ],

     aKalk: {},   //
     MenuShow: false,
     MenuFormatShow: false,

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,
       Format: '',
       nakladks: 0,
       filelist:[]

     }

   }
 },

 mounted () {
   const self = this
   self.k_id()
   return
   self.FormatJoin.forEach(element => {
     self.Format.push({text: element.text})
   });

    self.MenuLeftJoin.forEach(element => {
     self.MenuLeft.push({text: element.text})
   });
 },
 methods: {
   onoff() {
     this.active = !this.active
   //  alert(this.active)
   },
   MenuShow1(yesno,e) {

    const self = this

     if (yesno== 0) {
       this.MenuShow = true
       this.$refs.menu1.style.left =(e.clientX - 300) +'px'
       this.$refs.menu1.style.top  =(e.clientY + 0) +'px'
       self.MenuFormatShow = false;

       //console.log("OOFFF", this.$refs.menu1focus.offsetWidth)

       //this.$nextTick(() => this.$refs.menu1focus.focus())

      //document.getElementById("menu1focus").focus()
       this.$nextTick(() => {
        //this.$refs['menu1focus'].focus()
        })
        setTimeout(function() {
          //this.$refs.menu1.style.left = (e.clientX - document.getElementById("menu1focus").offsetWidth ) +'px'
          console.log("F!",document.getElementById("menu1main").offsetWidth, document.getElementById("menu1") )
          document.getElementById("menu1").style.width = document.getElementById("menu1main").offsetWidth +'px'
          document.getElementById("menu1").style.top = document.getElementById("menu1main").style.top
          document.getElementById("menu1").style.left = (document.getElementById("menu1main").offsetLeft + 100) + 'px'
          //self.$refs.menu1focus.focus()
          document.getElementById("menu1focus").focus()

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
       this.$refs.menuformat1.style.left = (e.clientX - 300) +'px'
       this.$refs.menuformat1.style.top  = (e.clientY +   0) +'px'
       self.MenuShow = false;

       //console.log("OOFFF", this.$refs.menu1focus.offsetWidth)

       //this.$nextTick(() => this.$refs.menu1focus.focus())

      //document.getElementById("menu1focus").focus()
       this.$nextTick(() => {
        //this.$refs['menu1focus'].focus()
        })
        setTimeout(function() {
          //this.$refs.menu1.style.left = (e.clientX - document.getElementById("menu1focus").offsetWidth ) +'px'
          console.log("F!",document.getElementById("menu1main").offsetWidth, document.getElementById("menuformat1") )
          document.getElementById("menuformat1").style.width = document.getElementById("menuformat1main").offsetWidth +'px'
          document.getElementById("menuformat1").style.top = document.getElementById("menuformat1main").style.top
          document.getElementById("menuformat1").style.left = (document.getElementById("menuformat1main").offsetLeft + 100) + 'px'
          //self.$refs.menu1focus.focus()
          document.getElementById("menuformat1focus").focus()

        },200)

     }
     if (yesno==1) {
       this.MenuFormatShow = false
     }


   },
   setMenu1Value (a, b) {
      const self = this
      var idK = this.k_id()
      self.setKalk(idK)
      console.log("a",a)
      self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'Menu1Value' , value: a })
      self.MenuShow1(1,0)
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

          self.form.sirka = el.sirka
          self.form.vyska = el.vyska
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
   SetFormat(a,b) {
     const self = this
     console.log("a",a)
     self.FormatJoin.forEach(el => {
       if (el.text == a) {
         self.form.sirka = el.sirka
         self.form.vyska = el.vyska
         self.form.Format = el.text
         //console.log("ret",self.form.MenuRet)
         return
       }
     })
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
  setKalk(idK) {
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
         cDefRet = el.stroj +' ' + el.nazev
       }
      if (el.idefix_mod == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          cRet = el.stroj +' ' + el.nazev
      }
    })

    return (cRet>'')?cRet:cDefRet
    //return this.$store.state.Kalkulace[this.k_id()].data.Menu1Value
  },

    getFormat() {
    //return 'ahoj'
    const self = this
    var thisItem = self.$store.state.Kalkulace[this.k_id()].data.FormatValue
    var cRet =''
    var cDefRet =''
    self.$store.state.Kalkulace[self.k_id()].data.Format.forEach((el, idx) =>{
       if (idx == 0) {
         cDefRet =  el.nazev + 'ahoj' + thisItem
         self.form.sirka = el.sirka
         self.form.vyska = el.vyska
       }
      if (el.idefix == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          cRet =  el.nazev
          self.form.sirka = el.sirka
          self.form.vyska = el.vyska
      }
    })

    return (cRet>'')?cRet:cDefRet
    //return this.$store.state.Kalkulace[this.k_id()].data.Menu1Value
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
textarea:focus, input:focus{
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
  transition: left .5s cubic-bezier(.42,-0.3,.78,1.25),
                top .5s cubic-bezier(.42,-0.3,.78,1.25);
}


</style>


