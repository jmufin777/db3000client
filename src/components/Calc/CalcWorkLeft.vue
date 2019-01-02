<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
     <div style="font-size:100%; height:400px" class="white lighten-5 pt-0 px-0 " >
     <table cols="20">
       <tr><td v-for="n in 20" :key="n" style="font-size:1px">&nbsp;</td></tr>
       <tr><td colspan="20" >

     <v-overflow-btn slot="obsah"
      :items="MenuLeft"
      hide-details
      class="px-1"
      overflow
      @change="MenuRet"
      @blur="MenuRet"
      @click="form.MenuRet =0"
      @click.native="form.MenuRet =0"
      value=""
      editable

    ></v-overflow-btn>
    </td></tr>
    <tr v-if="form.MenuRet > 0"><td colspan="20">

    <v-overflow-btn slot="obsah"
      :items="Format"
      hide-details
      class="pa-0 px-1"
      overflow
      @change="SetFormat"
      value="A4"
      editable
      placeholder="Format"
    ></v-overflow-btn>
    </td></tr>
    <tr v-if="form.MenuRet > 0" >
     <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Sirka:</td>
     <td colspan="7">
   <input type="text"   v-model="form.sirka" style="text-align:right" class="pr-2 pt-3 pb-3">
     </td>
  <td colspan="3" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Vyska:</td>
    <td colspan="7">
   <input type="text"   v-model="form.vyska" style="text-align:right" class="pr-2 py-3">
   </td>
   </tr>
    <tr v-if="form.MenuRet > 0">
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid" class="pl-1">Naklad&nbsp;ks:</td>
    <td colspan="10" style="font-size:80%;text-align:left;border-bottom:1px solid;border-right:1px solid">
    <input type="text"   v-model="form.nakladks" style="text-align:right" class="pr-2 py-3">
    </td>
    </tr>
    <tr><td colspan="20">
      <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  drag
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="form.filelist">
  <el-button size="small" type="primary">Click to upload</el-button>
  <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
</el-upload>
      </td></tr>

    </table>

        <slot name="obsah">
         <!-- Slot Menu Leve -->
       </slot>
      </div>

  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'

export default {
  props: {

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



     //

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
   self.FormatJoin.forEach(element => {
     self.Format.push({text: element.text})
   });

    self.MenuLeftJoin.forEach(element => {
     self.MenuLeft.push({text: element.text})
   });
 },
 methods: {
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


table tr td {
  border:none;
}

input {
  border:none;



}
</style>


