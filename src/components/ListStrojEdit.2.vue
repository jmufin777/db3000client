<template>
 <win-dow :title="'events'" :id="`events`"

    :x="xMyska"
    :w="1024"
    :y="100"
    :z="1"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="true"
    :forgetWH="false"
    :forgetAll="true"
    v-if="IsDialog1 && list && list.data && list.data.stroj && list.data.stroj[0]"
    >
<!-- <span slot="a1">A1</span>
<span slot="a2">A2</span>
<span slot="a3">A3</span> -->


<div slot="b1" class="green" style="height:40px;font-size:18px">{{ stepInfo}}</div>
<!-- <span slot="b3">B3</span> -->
<span slot="c1" style="height:40px;font-size:18px">
        <el-button @click="cancelForm" id="btn_cancel_submit8210" size="mini" style="height:40px;font-size:18px">Zavrit</el-button>
</span>

 <el-row slot="b22" style="height:20px;font-size:14px;">

 <el-tabs v-model="step2" @tab-click="handleClick" class="mx-4">
        <el-tab-pane label=" Rozmery"  name="1"></el-tab-pane>
        <el-tab-pane label=" Priprava, mod "  name="2"></el-tab-pane>
        <el-tab-pane label=" Inkousty "  name="3"></el-tab-pane>
        <el-tab-pane label=" Ceny "  name="4"></el-tab-pane>
        <el-tab-pane label=" Prace, ceny "  name="5"></el-tab-pane>
      </el-tabs>
  </el-row>
  <span slot="a2" style="height:20px;font-size:18px">



      &nbsp;
  </span>

<!-- <span slot="c3">C3</span> -->
 <div
        persistent
        max-width="900px"
        style="position:absolute;top:30px;left:0px;height:100%;width:100%;background:white"
        scrollable
        v-if="IsDialog1"
    >
<v-card
      class="mx-0 my-0"
    >
      <v-card-title class="title font-weight-regular justify-space-between">



        <!-- <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="14"
          v-text="step"
        >

        </v-avatar> -->
      STEP: {{step}}
      </v-card-title>

      <v-window v-model="step">
      <el-form  id="form8210" ref="form3" :model="form3" label-width="70px" :label-position="labelPosition"
        class="demo-ruleForm is-success" >
        <v-window-item :value="1">



    <el-row class="ma-2">
     <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >
    <el-row class="ma-2">
     <el-col :span="2">Nazev </el-col>
     <el-col :span="5">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.stroj[0].nazev"
      :fetch-suggestions="querySearch1"
      placeholder="Nazev stroje"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
     </el-col>
     <el-col :span="3">Technologie </el-col>
     <el-col :span="4">
      <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.stroj[0].nazev_text"
      :fetch-suggestions="querySearch2"
      placeholder="Technologie"
      @select="handleSelect"
      size="mini"
    ></el-autocomplete>
    </el-col>
    <el-col :span="3"><el-button size ="mini" @click="edit_vlastnosti('list2-strojskup','Skupiny Stroju')" style="width:90%">Skupina stroje:</el-button> </el-col>
     <el-col :span="4" >

       <select v-model="list.data.stroj[0]['idefix_strojskup']"
        default-first-option

         size="mini"  class="pt-1 pl-1">
            <option
            v-for="item8 in list.data.enum_strojskup"
            :key="item8.idefix*1"
            :label="item8.nazev"
            :value="item8.idefix*1"
           >{{item8.nazev}} </option>
       </select>

     </el-col>
    </el-row>
    <el-row class="ma-2">
      <el-col :span="24"><hr></el-col>
    </el-row>
    <el-row class="ma-2">
     <el-col :span="6">max šířka materiálu mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_mat_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">max délka materiálu mm</el-col>

     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_mat_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">max šířka tisku mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_tisk_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">max délka tisku mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_tisk_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
<!--//
    <el-row class="ma-2">

     <el-col :span="6">max šířka laminace mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].sirka_lam_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">max délka laminace mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].delka_lam_max_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
-->
    <el-row class="ma-2">

     <el-col :span="6">technologický okraj strana mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_strana_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">technologický okraj začátek mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_start_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">technologická mezera mezi kopiema mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_spacecopy_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">technologická mezera mezi jobama mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_spacejobs_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
    </el-row>
    <el-row class="ma-2">

     <el-col :span="6">technologický okraj konec mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].tech_okraj_end_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">bezokrajový tisk</el-col>
     <el-col :span="3">
     <input style="height:14px;width:14px" type="checkbox" @change="changeBezOkraj" name="bezOkraje" value="1"  :checked="(list.data.stroj[0].bez_okraj==1)?true:false">
     <!-- <el-input-number v-model="list.data.stroj[0].bez_okraj" size="mini"  style="width:100%"></el-input-number> -->
     </el-col>
     </el-row>
    <el-row class="ma-2">

     <el-col :span="6">velikost spadávky pro technologii mm</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].spadavka_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">prostor pro strojové ořezové značky - mm?</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].space_znacky_mm" size="mini"  style="width:100%"></el-input-number>
     </el-col>
    </el-row>




       <!-- <el-input  v-model="list.data.mat[0].nazev1" size="mini"></el-input> -->

     </el-col>
    </el-row>
              <span class="caption grey--text text--darken-1">
                Polozky stroje zakladni
              </span>
        </v-window-item>

   <v-window-item :value="2">

     <el-row class="ma-2">
     <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >

      <el-row class="ma-2">

     <el-col :span="6">Priprava stroje - minuty</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_cas_minuta" size="mini"  style="width:100%"></el-input-number>
     </el-col>
      </el-row>
      <el-row class="ma-2">
     <el-col :span="6">Priprava minuta - Naklad</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_minuta_naklad" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col :span="6">Priprava minuta - Prodej</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_minuta_prodej" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     </el-row>
      <el-row class="ma-2">


     <el-col :span="6">Priprava Celkem - Naklad</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_celkem_naklad" size="mini"  style="width:100%"></el-input-number>
     </el-col>
     <el-col :span="6">Priprava Celkem - Prodej</el-col>
     <el-col :span="3">
     <el-input-number v-model="list.data.stroj[0].priprava_celkem_prodej" size="mini"  style="width:100%"></el-input-number>
     </el-col>



    </el-row>

    <el-row class="ma-2 mt-4">
     <el-col style="border:solid 0px" :span="3">Prace</el-col>
     <el-col style="border:solid 0px" :span="4">Nazev</el-col>
     <el-col style="border:solid 0px" :span="4">Rozliseni</el-col>
     <el-col style="border:solid 0px" :span="3" >Rychlost</el-col>
     <el-col style="border:solid 0px" :span="2" >Jednotka</el-col>

     <el-col style="border:solid 0px" :span="3" >
      Akce
     </el-col>
     </el-row>

    <el-row class="ma-2 mt-0">
      <el-col style="border:solid 0px" :span="3">
      <select v-model="strojmod.idefix_prace"
        default-first-option
        size="mini"  class="pt-1 pl-1"
        >
            <option
            v-for="item82 in list.data.enum_prace"
            :key="item82.idefix*1"
            :label="item82.nazev"
            :value="item82.idefix*1"
            >{{item82.nazev}} </option>
       </select>
      </el-col>

     <el-col style="border:solid 0px" :span="4">
      <el-autocomplete
        class="inline-input mr-1"
        v-model="strojmod.nazev"
        :fetch-suggestions="querySearch3"
        placeholder="Nazev tisk.modu"
        @select="handleSelect"
        size="mini"
        style="width:90%"
      ></el-autocomplete>
    </el-col>
    <el-col style="border:solid 0px" :span="3">
     <el-autocomplete
      class="inline-input mr-1"
      v-model="strojmod.nazev_text"
      :fetch-suggestions="querySearch4"
      placeholder="Popis modu "
      @select="handleSelect"
      size="mini"
      style="width:90%"
     ></el-autocomplete>
    </el-col>

     <el-col style="border:solid 0px" :span="3" >
       <el-input-number v-model="strojmod.rychlost" size="mini"  style="width:100%"></el-input-number>
    </el-col>

     <el-col style="border:solid 0px" :span="2" >
      <select v-model="strojmod.idefix_jednotka"
        default-first-option
        size="mini"  class="pt-1 pl-1 ml-2"
        >
            <option
            v-for="item83 in list.data.enum_jednotka"
            :key="item83.idefix*1"
            :label="item83.nazev"
            :value="item83.idefix*1"
            >{{item83.nazev}} </option>
       </select>


     </el-col>

     <el-col style="border:solid 0px;position:relative;top:-20px;left:20px" :span="6" class="mb-0" >
      <v-combobox
    v-model="strojmod.strojmodbarevnost"
    :items="barevnostNazev"
    :search-input.sync="search"
    hide-selected
    hint=""
    label=""
    multiple
    persistent-hint
    small-chips
    class="mb-0"
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Data nejsou k dispozici
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>

      <!-- <select v-model="strojmod.strojmodbarevnost" multiple
        default-first-option
        @change="changeBarevnost"
        style="width:100%;z-index:100000" size="2">
            <option
            v-for="item81 in list.data.enum_barevnost"
            :key="item81.idefix*1"
            :label="item81.nazev"
            :value="item81.idefix*1"
            >{{item81.nazev}} </option>
       </select> -->
     </el-col>
     <el-col style="border:solid 0px" :span="3" >
     <button  type="button" style="width:30%;height:26px" class="px-0 " @click="insertMod" ><i class="el-icon-plus" size="mini"></i></button>
     </el-col>
    </el-row>


    <el-row  v-for="(itemmod, imod) in list.data.strojmod" :key="itemmod.idefix" class="ma-2 mt-0">

     <el-col style="border:solid 0px" :span="7">
      <el-autocomplete
        class="inline-input mr-1"
        v-model="list.data.strojmod[imod].nazev"
        :fetch-suggestions="querySearch3"
        placeholder="Nazev tisk.modu"
        @select="handleSelect"
        size="mini"
        style="width:90%"
      ></el-autocomplete>
    </el-col>
    <el-col style="border:solid 0px" :span="3">
     <el-autocomplete
      class="inline-input mr-1"
      v-model="list.data.strojmod[imod].nazev_text"
      :fetch-suggestions="querySearch4"
      placeholder="Popis modu "
      @select="handleSelect"
      size="mini"
      style="width:90%"
     ></el-autocomplete>
    </el-col>

     <el-col style="border:solid 0px" :span="3" v-if="typKalkulace=='V'">
       <el-input-number v-model="list.data.strojmod[imod].rychlost_minuta_m2" size="mini"  style="width:100%"></el-input-number>

     </el-col>
     <el-col style="border:solid 0px" :span="3" v-if="typKalkulace=='A'" >
       <el-input-number v-model="list.data.strojmod[imod].rychlost_minuta_pocet" size="mini"  style="width:100%"></el-input-number>
     </el-col>

     <el-col style="border:solid 0px;position:relative;top:-20px;left:20px" :span="6" class="mb-0" >
      <v-combobox
    v-model="list.data.strojmod[imod].strojmodbarevnost"
    :items="barevnostNazev"
    :search-input.sync="search"
    hide-selected
    hint=""
    label=""
    multiple
    persistent-hint
    small-chips
    class="mb-0"
  >
    <template slot="no-data">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            Data nejsou k dispozici
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-combobox>
     </el-col>



     <el-col style="border:solid 0px" :span="3" >
     <button  type="button" style="width:30%;height:26px" class="px-0 " @click="deleteMod(imod)" ><i class="el-icon-delete" size="mini"></i></button>
     </el-col>



    </el-row>

    </el-col>
    </el-row>

        </v-window-item>

        <v-window-item :value="3">

          <el-row class="ma-2">
          <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >

      <el-row class="ma-2">
     <el-col :span="6">Inkousty</el-col>
      </el-row>

        inkoust CMYK 1 m2 - náklad / Prodej / Barevnosti <br>
        inkoust White 1 m2 - - náklad / Prodej / Barevnosti

       <div style="opacity:1; background:yellow;width:100%; " class="yellow" >
      <el-col :span="4">
              <el-select v-model="strojmod.idefix_prace"


            style="width:100%;" size="mini">
                <el-option style="z-index:100000"
                v-for="item82 in list.data.enum_prace"
                :key="item82.idefix*1"
                :label="item82.nazev"
                :value="item82.idefix*1"
                >{{item82.nazev}} </el-option>
          </el-select>
      </el-col>
</div>


      </el-col>
          </el-row>



        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-3 mt-4 text-xs-center" style="width:100%">
            <pre>
            tisk 1 hodina kč - náklad
            tisk čas prvních 20 min - Kč/hod prodej
            tisk čas druhých 20 min - Kč/hod prodej
            tisk čas třetích 20 min - Kč/hod prodej
            tisk druhá a další hodina - Kč/hod prodej

            průjezd strojem CMYK arch náklad Kč/arch
            průjezd strojem CMYK arch naklad / prodej - prvních 25 archů
            průjezd strojem CMYK arch naklad / prodej - 26-50 archů
            průjezd strojem CMYK arch naklad / prodej - 51-100 archů
            průjezd strojem CMYK arch naklad / prodej - 101-250 archů
            průjezd strojem CMYK arch naklad / prodej - 251-500 archů
            průjezd strojem CMYK arch naklad / prodej - více než 500 archů

            průjezd strojem Black arch náklad Kč/arch
            průjezd strojem Black arch naklad / prodej - prvních 25 archů
            průjezd strojem Black arch naklad / prodej - 26-50 archů
            průjezd strojem Black arch naklad / prodej - 51-100 archů
            průjezd strojem Black arch naklad / prodej - 101-250 archů
            průjezd strojem Black arch naklad / prodej - 251-500 archů
            průjezd strojem Black arch naklad / prodej - více než 500 archů
            </pre>

          </div>
        </v-window-item>

        <v-window-item :value="5">
          <div class="pa-3 mt-4 text-xs-center" style="width:100%">
            <pre>
          práce	stroj	jednotka	cena příprava náklad	cena příprava prodej	cena jednotka náklad	cena jednotka prodej
          tisk	EFI, ...	hodina	100	150	500	2000
          laminování velko
          laminování arch
          bigování
          falcování
          vazba V1	šička V1
            </pre>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>

        <v-window-item :value="6">
          <div class="pa-3 mt-4 text-xs-center" style="width:100%">
            {{ list }}

            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
        </el-form>
      </v-window>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :disabled="step === 1"
          flat
          color="primary"
          @click="step--"
        >
          Zpet
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 8"
          color="primary"
          depressed
          @click="step++"
        >
          Dalsi
        </v-btn>
      </v-card-actions>
    </v-card>


</div>
<list2b-edit></list2b-edit>
 </win-dow>


</template>
<script>

import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListStroj from '@/services/ListStrojService'
import List2bEdit from  './List2bEdit.vue'

import f from '@/services/fce'
import moment from 'moment'



//import List2StrojSubSkup from '@/services/List2StrojSubSkupService'
// import List2StrojSkup from '@/services/List2StrojSkupService'

import { setTimeout, clearInterval } from 'timers'

export default {
  components: {
    'list2b-edit': List2bEdit,
  },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      search: '',
      barevnostNazev: [],
      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 350,
      rec: {},
      length: 4,
      window: 0,
      step: 6,
      step2: "6",
      //stepInfo: 'Resim co jako',
      idefixThis: 0,
      typKalkulace: 'N',
      list:[],
      list0:{},
      labelPosition: 'right',
      strojNazev: '',


      strojmod: {
        idefix: 0,
        idefix_stroj: 0,
        idefix_prace: 0,
        nazev: '',
        nazev_text: '',
        rychlost: 0,
        idefix_jednotka: 0,
        rychlost_minuta_m2: 0,
        rychlost_minuta_pocet: 0,

        strojmodbarevnost: []

      },

      strojinkoust: {
        idefix: 0,
        idefix_stroj: 0,
        nazev: '',
        nazev_text: '',
        cena_naklad_m2: 0,
        cena_prodej_m2: 0,
        strojinkoustbarevnost: []
      },

      //
      //

      // links: [],
      form3: {

      },

// --  10   enum_strojskup
// --  11   enum_barevnost
// -- 101   enum_nazev_text
// -- 102   enum_nazev


// -- 103   enum_strojmod
// -- 104   enum_strojmod_tex
// -- 105   enum_strojinkoust
// -- 106   enum_prace
// -- 107   enum_jednotka
// -- 106   enum_inkoust

// -- 200   dotaz_list_strojmod
// -- 201   dotaz_list_strojmodbarevnost
// -- 202   dotaz_list_strojinkoust
// -- 203   dotaz_list_strojinkoustbarevnost
// -- 204   dotaz_list_strojceny

    }
  },


  mounted() {


  },
  created () {
    var self=this
    eventBus.$on('edit_stroj', ( dlgPar ) => {
      self.citac++
      self.getDataEnum()

    })
      eventBus.$on('dlg8210', ( dlgPar ) => {
            self.rec = dlgPar
             try {
             self.xMyska = event.screenX - 200
             } catch(e) {
               //alert('Mysku nelze')
             }


            //alert(event.pageX)

            //console.log(event)
        if (dlgPar.IsDialog==true) {
          //if (!self.IsDialog1){
            self.IsDialog1 = true
            // self.IsDialog1 = !self.IsDialog1
            if (self.IsDialog1 && dlgPar.Idefix > 0) {
              self.step=1

              self.getData(dlgPar)



            }


          //}


        }
        //alert(JSON.stringify(dlgPar))
        //self.getData()
                //self.getWhere()

      })

  },

  watch: {
    nazev: function() {
      this.IsDialog1 = true;
      this.RecName='X'
      alert('x')
    },



  } ,

  methods: {
    handleClick(tab,x) {
      this.step =   (tab.name * 1)
      //alert(tab.name)

    },
    changeBezOkraj(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.stroj[0].bez_okraj = 1

      } else {
        self.list.data.stroj[0].bez_okraj = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },

    async getDataEnum(){
      const self = this
            //alert('PRED' + JSON.stringify(self.list.data.enum_strojskup))
            //ServerKlice = 7 vlastnosti
            var tmp
            var tmp2
            if (self.$store.state.showModule == 'list2-strojskup') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 10,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,10,''))
                  self.list.data.enum_strojskup = tmp2.data.enum_strojskup
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }

            if (self.$store.state.showModule == 'list2-prace') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 106,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,106,''))
                  self.list.data.enum_prace = tmp2.data.enum_prace
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }
          if (self.$store.state.showModule == 'list2-jednotka') {
              try {
              tmp =  ( await ListStroj.one(this.user,this.idefixThis , 107,''))
                try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,107,''))
                  self.list.data.enum_jednotka = tmp2.data.enum_jednotka
                  //alert(JSON.stringify(self.list.data.enum_stroj))
                } catch(e0){
                  alert( "X 1" + e0)
                }
              } catch(e) {
               alert("X 2" + e)
              }
            }
    },

    async getData(dlgPar) {
          const self = this
          // alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          // alert(dlgPar.Idefix)
           self.list = []


          if (dlgPar.Idefix > 0 ){
            if (dlgPar.Akce=='copy'){
              self.isCopy=true
              //alert(1)
              self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'copy'))

              //alert(2)
              //self.idefixThis = self.list.data.mat[0].idefix
              self.idefixThis = self.list.data.newId
              self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']
              self.barevnostNazev = []
               self.list.data.enum_barevnost.forEach(el =>{
                  self.barevnostNazev.push(el.nazev)
              })





              //alert(self.list.data.newId)
              //alert(self.idefixThis)

            }
            if (dlgPar.Akce=='edit'){
              self.isCopy=false

              try {
                self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'edit'))
                self.idefixThis = self.list.data.stroj[0].idefix
                self.strojNazev = self.list.data.stroj[0].nazev
                self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']

                self.barevnostNazev = []
                self.list.data.enum_barevnost.forEach(el =>{
                  self.barevnostNazev.push(el.nazev)
                })

              } catch (e) {
        //      console.log('chybka ' ,  JSON.stringify(self.list.data.stroj[0].idefix ))
        //      alert( self.list.data.stroj[0].idefix )
                self.idefixThis = self.list.data.stroj[0].idefix
                self.strojNazev = self.list.data.stroj[0].nazev
                self.typKalkulace = self.list.data.stroj[0]['typ_kalkulace']

               self.barevnostNazev = []
                self.list.data.enum_barevnost.forEach(el =>{
                  self.barevnostNazev.push(el.nazev)
                })


              }
            }
            }

          },

    insertMod() {
        var lAdd = true
      if (this.strojmod.nazev > ''){
        this.strojmod.idefix_stroj =this.idefixThis
        this.list.data.strojmod.forEach((el,i) =>{
          if (el.nazev == this.strojmod.nazev) {
            lAdd = false
            alert('Nelze pridat modstejneho nazvu ke stejnu stroji')
          }
        } );
        if (lAdd == true) {
          var neco= this.strojmod
          this.list.data.strojmod.push(neco)

        this.strojmod= {
        idefix: 0,
        idefix_stroj: 0,
        nazev: '',
        nazev_text: '',
        rychlost_minuta_m2: 0,
        rychlost_minuta_pocet: 0,
        strojmodbarevnost: []

      }

        }

      }

    },
    deleteMod(idx) {
      if (this.list.data.strojmod[idx].idefix > 0 ){
        if (confirm("Smazat tento mod ?")){
            this.list.data.strojmod.splice(idx,1)
        }
      } else {
            this.list.data.strojmod.splice(idx,1)
      }





    },

    mySplit(ctxt){
      var neco=(ctxt+'')
      //alert(neco.split(",")[0] )
      return neco.split(",")
    },

    cancelForm() {
       this.IsDialog1 = false
       this.list = []
    },


    querySearch1(queryString, cb) {  //Nazev
        var n1 = this.list.data.enum_nazev
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

    querySearch2(queryString, cb) {  //Nazev 2
        var n1 = this.list.data.enum_nazev_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

      querySearch3(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

      querySearch4(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },

     createFilter(queryString) {
        return (link) => {
//          console.log(link)
          //return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
          //alert(link.value)
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item)
      },
      datum(value) {
        return moment(String(value)).format('MM/DD/YYYY')
      }
      ,edit_vlastnosti(cmodul,ctitle){

      const self  = this
      if ( !this.$store.state.showEdit==true ){

        this.$store.dispatch('setshowEdit', true)
        this.$store.dispatch('setshowModule', cmodul)
        this.$store.dispatch('setshowIdefix', self.idefixThis)
        this.$store.dispatch('setshowModuleTitle', ctitle)
        eventBus.$emit('edit_run_stroj')
      } else {
        // alert("Zahadne Zmiznu")
        this.$store.dispatch('setshowEdit', false)
      }
    },
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'level',
      'idefix',
      'showEdit',
      'setshowModule',
      'setshowModuleTitle',
      'setshowIdefix',

    ]),
    currentTitle () {
      switch (this.step) {
        case 1:   return 'Sign-up'
        case 2:   return 'Create a password'
        default:  return 'Account created'
      }
    },
    stepInfo () {
      switch (this.step) {
        //case 1: return `Zakladni udaje a rozmery, polozky : ${this.list.data.stroj[0]['typ_kalkulace']}`
        case 1: return `Zakladni udaje a rozmery, polozky : ${this.typKalkulace}`


        case 2: return 'Cenove slozky'
        case 3: return 'Inkousty a barevnosti'
        case 4: return 'Rychlosti, prujezdy'
        case 5: return 'Prace ceny'
        case 6: return 'Hotovo'

        default: return 'Hotovo'
      }

    }

/*
    datum(){
      return Vue.filter('date')(this.value)
    }
*/

  }
}

</script>
<style>
.ok {
  background: #C5E1A5;
  color:black;

}
.bad {
  background: #FFAB40;
  color:black;
}

select  {
  opacity: 1;
  font-size: 14px;
  width:100%;
  height:100%;
  border: solid 1px;
  border-color:#AAAAAA;
  position: relative;
  top:2px;
}

select:focus  {
  opacity: 1;
  font-size: 14px;
  border: solid 0px black;
  /* box-shadow: 0 0 0pt 0pt #719ECE; */
  box-shadow: 0 0 0pt 0pt #000000;

}


</style>
