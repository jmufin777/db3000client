<template>
  <!-- <tr style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
     <div style="font-size:100%; min-height:120px" class="white lighten-5 pt-0 px-0 "
     @click="setKalk(kalkulaceid)"
     >
    <form>
     <table cols="20">
       <tr><td v-for="n in 20" :key="n" style="font-size:1px">&nbsp;</td></tr>
       <tr>
    <td colspan="2" style="border-left: solid 1px">
    <slot name="akce">
      Slota akce
    <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="1==1" ><i class="el-icon-delete" size="mini"></i></button>
    </slot>
    </td>
      <td colspan="18" class="pl-1 sloupec" style="border-right: solid 1px silver;" >
     <v-overflow-btn slot="obsah"
      :items="enum_up"
      hide-details
      class="px-1"
      overflow
      @change="ShowMod"
      value=""
      editable

    ></v-overflow-btn>
    {{ kalkulaceid}} / {{sloupecid}} / {{ neco }}
      </td>
    </tr>
    <tr ><td colspan="20" class="pl-1  pa-1">
      <table width="100%" >
        <tr class="mt-1 green" v-for="(item, i) in enum_mod_full.filter(el => form.stroj == el.stroj) " :key="i">
          <td >
          <a >
           <v-card class="silver ">
             <v-card-text style="font-size:80%;text-align:left" >
             {{ item['nazev']+' '+item['nazev_text'] }}

           </v-card-text>
           </v-card>
          </a>
          </td>
        </tr>
      </table>

    </td></tr>


<tr><td colspan="20" style="border-bottom: dotted 1px silver" >&nbsp;</td></tr>
    </table>

        <slot name="obsah">
         <!-- Slot Menu Leve -->
       </slot>
       </form>
      </div>

  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import ListStroj from '../../services/ListStrojService'
//enum_strojmod_text

export default {
    props: {

    kalkulaceid: {
      type : Number,
      required: true
    } ,
    sloupecid: {
      type : Number,
      required: true
    },
    typid: {
      type : Number,
      required: true
    },
    neco: {
      type : Number,
      required: false
    }

  },
 data () {

   return {
     //soubory:
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
      {key: 999 , text: "Vlastni"             ,sirka:   0.00 ,vyska:   0.00 }
      ],
      enum_up: [],
      enum_mod:[],
      enum_mod_full:[],





     //

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,
       Format: '',
       nakladks: 0,
       filelist:[],

       stroj: ''
     }



   }
 },
 mounted () {
   const self = this
   return
   self.FormatJoin.forEach(element => {
     self.Format.push({text: element.text})
   });

     self.MenuLeftJoin.forEach(element => {
     self.MenuLeft.push({text: element.text})
   });

   console.log('COL')
   this.strojmod();

 },

 methods: {
   async strojmod() {
     const self = this
     var atmp=[]
     var found = true
     atmp=(await ListStroj.one(this.user,-1,1041)).data.enum_strojmod_full
     self.enum_mod_full = atmp
     if (!atmp.length || atmp.length == 0)  return
     //self.enum_up=atmp
     //console.log(atmp.length)
     //return


     atmp.forEach(el => {
       //console.log(el)
       found = self.enum_up.find( el2=>{
          return el2.text == el.stroj
       })

      if (!found) {

        self.enum_up.push({'text': el.stroj})
      }

     })
      //self.enum_up=atmp
     //if (atmp.
     //this.enum_up
   //  alert(enum_up)
   },

   ShowMod(a) {
     const self = this
     console.log(a)
     self.form.stroj = a
   },
   MenuRet(a,b) {
     const self = this
     console.log("a",a)
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
   setKalk(idK) {
            this.$store.dispatch('setKalk',idK)
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
        return this.$confirm(`确定移除 ${ file.name }？`);
      }

   //Soubory



 }
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
</style>
<style scoped>
.sloupec {
  vertical-align: text-top;
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


</style>


