<template>
 <v-dialog
      v-model="IsDialog"
        persistent
        max-width="900px"
        scrollable
        v-if="list && list.data && list.data.mat && list.data.mat.length > 0 "
    >

  >
<!-- <div class="white" id="de821" > -->
<div style="opacity:1; background:white;width:100%; " class="white" id="de821" >
  <slot name="a1" :sm="8" :md="8" :lg="8" :xl="8"></slot>
<el-row> <el-col :span="24">
</el-col></el-row>
  <panel :title="Akce">
    &nbsp;
  </panel>
<!-- <el-row>

  <el-col :span="24">{{ Akce }}  </el-col>
</el-row> -->

<el-form  id="form821" ref="form2" :model="form2" label-width="70px" :label-position="labelPosition" :rules="rules2" class="demo-ruleForm is-success">
   <el-row class="ma-2">
     <el-col :span="3">Skupina </el-col>
     <el-col :span="4" >

       <el-select v-model="list.data.mat[0].idefix_matskup"
        filterable
        allow-create
        default-first-option

        placeholder="Hlavni skupina"
        id="start821"

       style="width:100%" size="mini">
            <el-option
            v-for="item2 in list.data.enum_matskup" :key="item2.idefix*1" :label="item2.nazev"
            :value="item2.idefix*1"
            >
          </el-option>
       </el-select>
     </el-col>
          <el-col :span="3">Upresneni</el-col>
     <el-col :span="8">

       <el-select v-model="list.data.mat[0].idefix_matsubskup"

       filterable
        allow-create
        default-first-option
        placeholder="Podskupina"

         style="width:100%" size="mini">
            <el-option
            v-for="item3 in list.data.enum_matsubskup" :key="item3.idefix" :label="item3.nazev"
            :value="item3.idefix*1"
            >{{item3.nazev}} Option </el-option>
       </el-select>
     </el-col>

   </el-row>
   <el-row class="ma-2">
     <el-col :span="3">Nazev </el-col>
     <el-col :span="4">
       <!-- <el-input  v-model="list.data.mat[0].nazev1" size="mini"></el-input> -->


     <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev1"
      :fetch-suggestions="querySearch1"
      placeholder="Please Input"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>


     </el-col>
     <el-col :span="4">
       <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev2"
      :fetch-suggestions="querySearch2"
      placeholder="Please Input"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
     </el-col>

     <el-col :span="4">
       <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.mat[0].nazev3"
      :fetch-suggestions="querySearch3"
      placeholder="Please Input"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
     </el-col>
   </el-row>



    <el-row class="ma-2">
     <el-col :span="3">Vlastnosti: </el-col>
     <el-col :span="12">
       <el-select v-model="list.data.vlastnosti" multiple filterable allow-create default-first-option style="width:100%" size="mini">
            <el-option
            v-for="item4 in list.data.enum_matvlastnosti"
            :key="item4.idefix*1"
            :label="item4.nazev"
            :value="item4.idefix*1"
            @change="changeVlastnosti(item4)"

            >{{item4.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>

     <el-row class="ma-2">
     <el-col :span="3">Vyrobce: </el-col>
     <el-col :span="12">


       <el-select v-model="list.data.mat[0].idefix_vyrobce"  filterable allow-create default-first-option style="width:100%" size="mini">
            <el-option
            v-for="item5 in list.data.enum_matvyrobce"
            :key="item5.idefix*1"
            :label="item5.nazev"
            :value="item5.idefix*1"
            @change="changeVlastnosti(item5)"

            >{{item5.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>
     <el-row class="ma-2">
     <el-col :span="3">Dodavatel: </el-col>
     <el-col :span="12">


       <el-select v-model="list.data.mat[0].idefix_dodavatel"
            filterable
            allow-create
            default-first-option
            @change="changeVlastnosti"
            style="width:100%;"
            size="mini">
            <el-option
            v-for="item6 in list.data.enum_dodavatel"
            :key="item6.idefix*1"
            :label="item6.nazev"
            :value="item6.idefix*1"


            >{{item6.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>

     <el-row class="ma-2">
     <el-col :span="3">Popis </el-col>
     <el-col :span="12">
       <el-input type="textarea" autosize  v-model="list.data.mat[0].popis" size="mini"  style="width:100%"></el-input>
     </el-col>
     </el-row>

    <el-row class="ma-2">
     <el-col :span="3">Kategorie stroju: </el-col>
     <el-col :span="12">
       <el-select v-model="list.data.strojskup" multiple filterable allow-create default-first-option style="width:100%" size="mini">
            <el-option
            v-for="item8 in list.data.enum_strojskup"
            :key="item8.idefix*1"
            :label="item8.nazev"
            :value="item8.idefix*1"
            @change="changeVlastnosti(item8)"

            >{{item8.nazev}} </el-option>
       </el-select>
     </el-col>
     </el-row>

      <el-row class="ma-2">

     <el-col :span="12">
      <el-row>
        <table >
          <tr>
            <td rowspan="1">Dostupnost</td>
            <td>Sirka</td>
            <td>Vyska</td>
            <td>Sirka Zbytek</td>
            <td>Vyska Zbytek</td>
          </tr>
          <tr>
            <td rowspan="1">
    <el-select v-model="enum_matdostupnost"

            default-first-option
            @change="changeVlastnosti"
            style="width:100%;"
            size="mini">
            <el-option
            v-for="item7 in list.data.enum_matdostupnost"
            :key="item7.idefix*1"
            :label="item7.nazev"
            :value="item7.idefix*1"


            >{{item7.nazev}} </el-option>
       </el-select>

            </td>

            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="sirka_mm"
              :fetch-suggestions="querySearch3"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>

            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="vyska_mm"
              :fetch-suggestions="querySearch3"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>
            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="sirka_mm_zbytek"
              :fetch-suggestions="querySearch3"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>
            <td>
              <el-autocomplete
              class="inline-input mr-1"
              v-model="vyska_mm_zbytek"
              :fetch-suggestions="querySearch3"
              placeholder="Please Input"
              @select="handleSelect"
              size="mini"
            ></el-autocomplete>
            </td>

          </tr>
        </table>
      </el-row>

     </el-col>
     <el-col :span="12">
       <table>
         <tr v-for="(ie1 , iedx) in list.data.rozmer2" :key="ie1.idx" v-if="iedx==0">
          <td v-for="(ie2 ,iedyz) in ie1" :key="iedyz">{{ iedyz }}</td>
         </tr>
         <tr v-for="(ie3 , iedx2) in list.data.rozmer2" :key="ie3.idx" >

          <td v-for="(ie4 ,i4) in ie3" :key="i4">{{ ie4 }}:{{i4}}</td>
         </tr>

       </table>
     </el-col>
     </el-row>

           <el-row>
        <el-col :span="3">
          Tloušťka v mm
        </el-col>
        <el-col :span="2">
          <el-input v-model="list.data.mat[0].sila_mm" size="mini"  style="width:100%"></el-input>
        </el-col>
        <el-col :span="3"> Váha v g/m2</el-col>
        <el-col :span="2">
          <el-input v-model="list.data.mat[0].vaha_gm2" size="mini"  style="width:100%"></el-input>
        </el-col>

      </el-row>
      <el-row>
        <el-col>
          barva materiálu - Zapomnel jsem - dodelat seznam(kolik barev muze mit jeden material ?)
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <pre>
         cena_nakup_m2 numeric(10,2),
         koef_naklad numeric(10,2),   --//spolecna polozka
         koef_prodej numeric(10,2),

         cena_nakup_kg numeric(10,2),   --!!!! cena za arch je různá podle gramáží papíru
         cena_nakup_arch numeric(10,2),  --výpočet z ceny za kg, formátu a gr. v db ponecham, prepoctu po ulozeni, nebo prepocitam aplikaci
         cena_naklad_arch numeric(10,2),    -- vypočteno nákupní cena x nákladový koeficient  - tedy postupne , podle zadanych hodnot

         cena_naklad_m2 numeric(10,2),    -- vypočteno nákupní cena x nákladový koeficient  - tedy postupne , podle zadanych hodnot


         cena_prodej_m2 numeric(10,2)   , -- výpočet nákladová cena x prodejní koeficient
         cena_prodej_arch numeric(10,2)  -- výpočet nákladová cena x prodejní koeficient
          </pre>
        </el-col>
      </el-row>


 <el-row class="mt-4">
<el-form-item>
    <el-button type="primary" id="btn_user_submit821" @click="submitForm('form')" size="mini"
    >Ulozit - Opravit </el-button>
    <el-button type="primary" id="btn_user_new_submit821" @click="submitForm('form')" size="mini"
    >Kopie - Novy </el-button>
    <el-button @click="resetForm('form')" size="mini">Reset</el-button>
</el-form-item>
 </el-row>
</el-form>
</div>
</v-dialog>

</template>
<script>
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListMat from '@/services/ListMatService'


//import List2MatSubSkup from '@/services/List2MatSubSkupService'
// import List2MatSkup from '@/services/List2MatSkupService'

import { setTimeout, clearInterval } from 'timers'

export default {
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      links: [],
      labelPosition: 'right',
      IsDialog: false,
      Akce: 'NICXXX',
      recData: {},
      idRecord: 0,
      list: [],
      sirka_mm: "0",
      vyska_mm: "0",
      sirka_mm_zbytek: "0",
      vyska_mm_zbytek: "0",
      enum_matdostupnost: null,
      enums:{
        skup: [],
        subskup: [],
      },
      form2: {

      },
      formBackup: {

      },
      cols: {},
      rules2:   {

      }

    }
  },

  created() {
    const self=this
    eventBus.$on('dlg821', ( dlgPar ) => {
      //alert('modulik')
      self.IsDialog = true
      self.Akce = dlgPar.Akce
      //alert(JSON.stringify(dlgPar))

      self.getData(dlgPar)
      .then (res => {
          if (document.getElementById('start821')){
            setTimeout(function(){
              document.getElementById('start821').focus()
            },200)
          }
      })



  })


  },
  updated (){
    const self = this
    if (document.getElementById("de821")){
          document.getElementById("de821").addEventListener('keydown', (function(e) {
            //alert(e.keyCode)

          if (e.keyCode == 13) {
            if (e.target.type=="textarea"){
              return true
            }
              return true
          alert(e.target.type)
              document.getElementById('btn_user_submit821').focus()


          }
            if (e.keyCode == 27) {
               e.stopPropagation()
               e.preventDefault()

              //document.getElementById('btn_user_submit').focus()
              self.cancelForm()

              //  self.IsDialog=false;

          }
        }))
    } else {
             //alert('Slyseti Jiz nebudu vice')

    }



  },
  mounted() {


     // alert('M')
  },

  methods: {
    async getData(dlgPar) {
          const self = this
          // alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          // alert(dlgPar.Idefix)
           self.list = []
          if (dlgPar.Idefix > 0 ){

            self.list = (await ListMat.one(this.user,dlgPar.Idefix, -1,''))



              // self.list.data.mat[0].idefix_matskup*=100
              //self.list.data.mat[0].idefix_matsubskup*=1




            }

          //  self.enums.skup = (await List2MatSkup.all(this.user,'nic'))


          //alert(JSON.stringify(self.enums.skup))
          },
          //self.list = (await ListMat.one(this.user,dlgPar.id))
          //alert(JSON.stringify(self.list))

    submitForm(formName) {

      this.IsDialog = false
      this.list = []
    },

    cancelForm() {
     if (confirm("Zahodi zmeny ?")) {
       this.IsDialog = false
       this.list = []
     }

    },

    resetForm(formName) {
        var x
        for (x in this.formBackup ) {
          this.recData[x] = this.formBackup[x]
        }

    },
    async onSubmitSave(){

    },
    endDlg (){
      this.IsDialog = false


      return true
    },
    //Zmeny obsahu  SELECT

    changeVlastnosti(item ) {
      //alert(item.value)
      alert(JSON.stringify(item))
    },
    changeDodavatel(item ) {
      //alert(item.value)
      alert(JSON.stringify(item))
    },
    ////Zmeny obsahu
    //Auto Komplit
    querySearch1(queryString, cb) {
        var n1 = this.list.data.enum_n1
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch2(queryString, cb) {
        var n1 = this.list.data.enum_n2
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      querySearch3(queryString, cb) {
        var n1 = this.list.data.enum_n3
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);

      },
      createFilter(queryString) {
        return (link) => {
          console.log(link)
          //return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    //Auto Komplit
  },
  beforeDestroy() {
    //alert('Destr')
  }
}

</script>
