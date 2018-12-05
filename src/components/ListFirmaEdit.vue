<template>
 <win-dow :title="'events'" :id="`events`"

    :x="xMyska"
    :w="1024"
    :y="100"
    :z="0"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="true"
    :forgetWH="true"
    :forgetAll="true"
    v-if="IsDialog1 && list && list.data && list.data.firma && list.data.firma[0]"

    >



<div slot="b1" class="green elevation-2" style="height:40px;font-size:18px">{{ stepInfo}}</div>

<div slot="a1" style="height:40px;font-size:18px;" class="px-2 green elevation-2" >
{{ ((isCopy ==false )?'Zmena':'Nova polozka ') +' ' + list.data.firma[0].nazev  }}
</div>
<div slot="c1" style="height:40px;font-size:18px" class="green elevation-2">
      <el-button v-if="isCopy == false " type="primary" id="btn_user_new_submit8310" @click="submitForm('formnew')" size="mini"> Novy Upravou</el-button>
      <el-button v-if="isCopy" type="primary" id="btn_user_submit8310" @click="submitForm('form')" size="mini"
        >Vlozit </el-button>
       <el-button v-else type="primary" id="btn_user_submit8310" @click="submitForm('formstep0')" size="mini"
        >Ulozit</el-button>
      <el-button v-if="isCopy" @click="resetForm('form')" id="btn_cancel_submit8310" size="mini">Zrusit</el-button>
      <el-button v-else @click="resetForm('form')" id="btn_cancel_submit8310" size="mini">Zavrit</el-button>

</div>

 <el-row slot="b22" style="height:20px;font-size:14px;">

 <el-tabs v-model="step2" @tab-click="handleClick" class="mx-4">
        <el-tab-pane label=" Adresy"  name="1"></el-tab-pane>
        <el-tab-pane label=" Kontakty "  name="2"></el-tab-pane>
        <el-tab-pane label=" Provozovny"  name="3" ></el-tab-pane>
        <el-tab-pane label=" Prace"  name="4" ></el-tab-pane>
        <el-tab-pane label=" Planovani "  name="5"></el-tab-pane>

      </el-tabs>
  </el-row>
  <span slot="a2" style="height:20px;font-size:18px">
      &nbsp;
  </span>
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

        <!-- Step: {{step2}} / {{ step }}  /{{ idefixThis }} -->


      </v-card-title>

       <v-window v-model="step">


      <form  id="form8310" ref="form3" :model="form3" label-width="70px" :label-position="labelPosition"
        class="demo-ruleForm is-success" >


  <v-window-item :value="1">

        <v-card v-show="step2=='1'"><v-card-text>


    <el-row class="ma-1">
     <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >

    <el-row class="ma-2">
      <el-col :span="24"><hr></el-col>
    </el-row>
    <el-row class="ma-2">
      <el-col :span="10" style="text-align:left">
       <el-input v-model="list.data.firma[0].nazev" size="mini"  style="width:97%; ">
        <template slot="prepend">Nazev</template>
       </el-input>
    </el-col>

     <el-col :span="5">
     <el-input  v-model="list.data.firma[0].ico" size="mini"  style="width:98%">
        <el-button slot="prepend"  style="color:white" size="mini" type="primary" v-bind:class="{'success': IsIco==1,'info': IsIco==0, 'warning': IsIco==2 }" class="elevation-15" @click="firma_ares(list.data.firma[0].ico)" icon="el-icon-search" >Ico:</el-button>
     </el-input>
     </el-col>

     <el-col :span="5">
     <el-input v-model="list.data.firma[0].dic" size="mini"  style="width:95%">
       <template slot="prepend">DIC</template>

     </el-input>
     </el-col>



    </el-row>
    <el-row class="ma-2">


        <el-col :span="10">
          <el-input v-model="list.data.firma[0].ulice" size="mini"  style="width:100%">
            <template slot="prepend">
              <b>Sidlo&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
              Ulice</template>

          </el-input>
        </el-col>


        <el-col :span="7">
          <el-input v-model="list.data.firma[0].obec" size="mini"  style="width:95%">
              <template slot="prepend">Obec</template>
           </el-input>
        </el-col>

        <el-col :span="4">
          <el-input v-model="list.data.firma[0].psc" size="mini"  style="width:95%">
              <template slot="prepend">Psc</template>
           </el-input>

        </el-col>
        <el-col :span="1">
        <el-button size ="mini" @click="firma_copy" type="primary" class="elevation-15" >= </el-button>
        </el-col>

    </el-row>



    <el-row class="ma-2">
      <el-col :span="2" > </el-col>

        <el-col :span="10">
          <el-input v-model="list.data.firma[0].ulice2" size="mini"  style="width:100%">
            <template slot="prepend" >
            <b>Kancelar :</b>&nbsp;
            Ulice
            </template>
          </el-input>
        </el-col>

        <el-col :span="7">
          <el-input v-model="list.data.firma[0].obec2" size="mini"  style="width:95%">
              <template slot="prepend">Obec</template>
           </el-input>
        </el-col>

        <el-col :span="4">
          <el-input v-model="list.data.firma[0].psc2" size="mini"  style="width:95%">
              <template slot="prepend">Psc</template>
           </el-input>
        </el-col>
    </el-row>
    <el-row class="ma-2">


        <el-col :span="6">
          <el-input v-model="list.data.firma[0].tel" size="mini"  style="width:100%" suffix-icon="el-icon-phone">
            <template slot="prepend">Mobil</template>
          </el-input>
        </el-col>

        <el-col :span="12">
          <el-input v-model="list.data.firma[0].tel2" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
            <template slot="prepend">Tel</template>
          </el-input>
        </el-col>
        </el-row>
        <el-row class="ma-2">

        <el-col :span="9">
          <el-input v-model="list.data.firma[0].mail" size="mini"  style="width:100%" suffix-icon="el-icon-message">
            <template slot="prepend" >Email</template>
          </el-input>
        </el-col>

        <el-col :span="12">
          <el-input v-model="list.data.firma[0].www" size="mini"  style="width:95%" type="url">
             <template slot="prepend">Http://</template>
          </el-input>
        </el-col>

    </el-row>

<el-row><el-col :span="14">

<el-row class="ma-2">
       <el-col :span="3" >
         <div class="mini el-input-group__prepend" style="height:28px;background;width:550px">Splatnost</div>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="3" style="text-align:left">
          <el-input-number v-model="list.data.firma[0].splatnost" size="mini"  controls-position="right"  >
          </el-input-number>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
       <el-col :span="4">
         <div class="el-input-group__prepend" style="height:28px;background;width:550px">Hotovost</div>
         </el-col>

        <el-col :span="2">
          <input size="mini" style="height:28px;width:28px" type="checkbox" @change="changeHotovost" name="Hotovost" value="1"  :checked="(list.data.firma[0].hotovost==1)?true:false">
        </el-col>
        <el-col :span="4">
                   <div class="el-input-group__prepend" style="height:28px;background;width:550px">Materialy</div>
          </el-col>

        <el-col :span="2">
          <input style="height:28px;width:28px" type="checkbox" @change="changeMat" name="MatDodavatel" value="1"  :checked="(list.data.firma[0].mat==1)?true:false">
        </el-col>

    </el-row>
    <el-row class="ma-2">


        <el-col :span="11" style="text-align:left">
          <el-input suffix-icon="el-icon-date" readonly v-model="list.data.firma[0].datum_ares" size="mini" disabled style="width:90%">
             <template slot="prepend">Vypis dne</template>
          </el-input>
        </el-col>

        <el-col :span="11">
            <el-input readonly disabled v-model="list.data.firma[0].aktivni" size="mini"  style="width:100%">
             <template slot="prepend">Stav v registru</template>

            </el-input>
        </el-col>
    </el-row>
    </el-col>

    <el-col :span="10" style="text-align:left">Poznamky: {{list.data.firmanotice.length}}<hr></el-col>


    <table style="witdh:100%">
     <thead><th style="width:20%"> Datum</th><th>Text</th><th style="width:20%">Zapsal</th><th style="width:10%;text-align:center">x</th> </thead>
    <tbody>
    <tr v-for="(notice,inotice) in list.data.firmanotice" :key="inotice">
      <td>{{notice.datum}}</td><td>{{notice.txt}}</td><td>{{notice.user_txt}}</td>
      <td>?</td>
    </tr>

    <tr>
      <td>{{ firmanotice.datum }}</td>
      <td>
        <el-input type="textarea" v-model="firmanotice.txt" rows="1" autosize>
        </el-input>
      </td>
      <td>{{user}}</td>
      <td style="width:10%;text-align:left">
        <button  type="button" style="width:100%;height:26px" class="pl-0 info elevation-3"  @click="insertNotice" ><i class="el-icon-plus" size="mini"></i></button>
      </td>
    </tr>
    </tbody>
    </table>


 </el-row>





     </el-col>
    </el-row>

    </v-card-text></v-card>
    </v-window-item>

     <v-window-item :value="2">
        <v-card v-show="step2=='2'">
          <v-card-text>
            <el-row class="ma-1">
              <el-col :span="24" class="pa-3 mt-1 text-xs-center" style="width:100%" >
                <el-row class="ma-2">
                  <el-col :span="4">
                    <el-input v-model="firmaosoba.titul" size="mini"  style="width:100%" >
                      <template slot="prepend">Titul</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.jmeno" size="mini"  style="width:95%" >
                      <template slot="prepend">Jmeno</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.prijmeni" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Prijmeni</template>
                   </el-input>
                  </el-col>
                 <el-col :span="4">
                    <el-input v-model="firmaosoba.titulza" size="mini"  style="width:95%" >
                      <template slot="prepend">Titul2</template>
                   </el-input>
                  </el-col>
                </el-row>
                <el-row class="ma-2">
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.oddeleni" size="mini"  style="width:100%" >
                      <template slot="prepend">Oddeleni</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.funkce" size="mini"  style="width:95%" >
                      <template slot="prepend">Funkce</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.tel" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Mobil</template>
                   </el-input>
                  </el-col>
                  <el-col :span="6">
                    <el-input v-model="firmaosoba.tel2" size="mini"  style="width:95%" suffix-icon="el-icon-phone">
                      <template slot="prepend">Tel</template>
                   </el-input>
                  </el-col>
                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.mail" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend">Email</template>
                   </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.mail_fakt" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Fakturacni</template>
                   </el-input>
                  </el-col>




                </el-row>

                <el-row class="ma-2">
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.ulice" size="mini"  style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend" >
            <b>Kancelar :</b>&nbsp;
            Ulice
            </template>

                   </el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.obec" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Obec</template>
                   </el-input>
                  </el-col>
                  <el-col :span="5">
                    <el-input v-model="firmaosoba.psc" size="mini"  style="width:95%" suffix-icon="el-icon-message">
                      <template slot="prepend">Psc</template>
                   </el-input>
                  </el-col>

               </el-row>
               <el-row class="ma-2">
                   <el-col :span="3">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Narozeniny</div>
                  </el-col>
                  <el-col :span="4">
                    <el-date-picker v-model="firmaosoba.narozeniny" size="mini"  type="date" align="right" style="width:100%">
                  </el-date-picker>
                  </el-col>
                  <el-col :span="2">
                  <div class="el-input-group__prepend" style="height:28px;background;width:550px">Aktivni</div>
         </el-col>

        <el-col :span="2">
          <input size="mini" style="height:28px;width:28px" type="checkbox" @change="changeAktivniOsoba" name="Hotovost" value="1"  :checked="list.data.firmaosoba.aktivni">
        </el-col>
         <el-col :span="3">
                    <div class="el-input-group__prepend" style="height:28px;background;width:550px">Poznamky</div>
                  </el-col>
                  <el-col :span="8">
                    <el-input v-model="firmaosoba.poznamka" size="mini"  type="textarea" style="width:100%" suffix-icon="el-icon-message">
                      <template slot="prepend">Poznamky</template>
                   </el-input>
                  </el-col>

               </el-row>


              </el-col>
            </el-row>

                <el-row class="ma-2">
                 <el-col :span="24">
                   <el-row class="ma-1">
                     <!-- @end="chooseItemKontakt" -->
                     <draggable v-model="firmaosobapomucka"  :options="{group: 'peoplex' }" @start="drag=true"  >
                     <el-col :span=5 v-for="(it1, i) in firmaosobapomucka" :key="i"
                      v-bind:class="{ 'green lighten-5' : ( i % 2 == 0) , 'blue lighten-5' : ( i % 2 != 0)  }"
                      class="mr-1 mt-1 pl-1"
                     >
                       {{i+1}}:  {{it1.jmeno}} {{it1.prijmeni}}
                       <i class="el-icon-edit" size="mini"></i>
                       <i class="el-icon-delete" size="mini"></i>
                     </el-col>

                     </draggable>
                   </el-row>
                 </el-col>
                </el-row>


          </v-card-text>
        </v-card>
     </v-window-item>

         <v-window-item :value="3">
        <v-card v-show="step2=='3'">
          <v-card-text>
            {{ stepInfo}}
          </v-card-text>
        </v-card>
     </v-window-item>

     <v-window-item :value="4">
        <v-card v-show="step2=='4'">
          <v-card-text>
            <el-row class="ma-2">
              <el-col :span="24">
                <el-row class="ma-2 mt-4">
                  <el-col :span="20">

            <el-transfer
              v-model="value_vzor"
              :data="data_vzor"
              :titles="['Pridelene', 'Prace']"
              >
          </el-transfer>

          </el-col>
            </el-row>
              </el-col>
            </el-row>
          </v-card-text>
        </v-card>
     </v-window-item>
     <v-window-item :value="5">
        <v-card v-show="step2=='5'">
          <v-card-text>
            {{ stepInfo}}
          </v-card-text>
        </v-card>
     </v-window-item>



        </form>
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
          @click="submitForm('formstep')"
        >
          Uloz a Dalsi
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
import ListFirma from '@/services/ListFirmaService'
import Ico from '@/services/IcoService'
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
    const generateData = _ => {
        const data_vzor = [];
        for (let i = 1; i <= 15; i++) {
          data_vzor.push({
            key: i,
            label: `Option ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data_vzor;
      };

    return {
      search: '',

      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 50,
      rec: {},
      length: 4,
      window: 0,
      step: 6,
      step2: "1",
      Akce: '',
      //stepInfo: 'Resim co jako',
      idefixThis: 0,
      typKalkulace: 'N',
      list:[],
      list0:{},
      labelPosition: 'right',
      firmaNazev: '',
      firmaAres: [],

      firmaosobapomucka: [
        {jmeno: 'Prvni',prijmeni: 'Clovek'},
        {jmeno: 'Druhy',prijmeni: 'Clovek'},
        {jmeno: 'Treti',prijmeni: 'Clovek'},
        {jmeno: 'Ctrvrty',prijmeni: 'Clovek'},
        {jmeno: 'Paty',prijmeni: 'Clovek'},
        {jmeno: 'Sesty',prijmeni: 'Clovek'},
        {jmeno: 'Sedmy',prijmeni: 'Clovek'},
        {jmeno: 'Osmy ',prijmeni: 'Clovek'},
        {jmeno: 'Devaty',prijmeni: 'Clovek'},
        {jmeno: 'Desaty',prijmeni: 'Clovek'},
        ],

      firma: {
        idefix: 0,
         kod:  0,
         ico:'',
         dic: '',
         nazev: '',
         ulice: '',
         obec: '',
         psc: '',
         ulice0: '',
         obec0: '',
         cp1: '',
         cp2: '',

         nazev2: '',
         ulice2: '',
         obec2: '',
         psc2: '',
         tel: '',
         tel2: '',
         mail: '',
         www: '',
         poznamka: '',
         mat: 0,
         splatnost: 0,
         hotovost: 0,
         aktivni: ''
      },

      firmaosoba: {
        idefix: 0,
        idefix_firma: 0,
        kod: 0,
        jmeno: '',
        prijmeni: '',
        titul: '',
        titulza: '',
        funkce: '',
        oddeleni: '',
        prioritni: false,
        tel: '',
        tel2: '',
        tel3: '',
        mail: '',
        www: '',
        poznamka: '',
        narozeniny: '',
        mail_fakt: '',
        psc: '',
        obec: '',
        ulice: ''


      },

      firmaprovozovna: {
        idefix: 0,
        idefix_firma: 0,
        kod: 0,
        nazev: '',
        jmeno: '',
        prijmeni: '',
        titul: '',
        titulza: '',
        funkce: '',
        oddeleni: '',
        prioritni: false,
        tel: '',
        tel2: '',
        tel3: '',
        mail: '',
        www: '',
        poznamka: '',
        otevreno_od: '08:00',
        otevreno_do: '18:00'
      },

    firmanotice: {
        idefix: 0,
        idefix_firma: 0,
        txt: '',
        user_txt: '',
        datum: f.dnes()


      },


      //
      //

      // links: [],
      form3: {

      },
      lastTime: 0, //posledni cas prichozi udalosti v int
      IsIco: 0,

      //Vzor

        data_vzor: generateData()
      , value_vzor: [1, 4]


      //Vzor


// --  10   enum_strojskup
// --  11   enum_barevnost
// -- 101   enum_nazev_text
// -- 102   enum_nazev

// enum_strojceny_nazev
// -- 103   enum_strojmod
// -- 104   enum_strojmod_text
// -- 109   enum_strojmod_this
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
      eventBus.$on('dlg8310', ( dlgPar ) => {
        // alert('EVENT' + JSON.stringify(dlgPar ))
            self.rec = dlgPar
             // alert(JSON.stringify(dlgPar))
             try {
             // self.xMyska = event.screenX - 200
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
      //alert('x')
    },
    step: function(){
      this.step2 = this.step+''
      if (this.step>5) {
        this.step=1
      }
      if (this.step<1) {
        this.step=5
      }
    }




  } ,

  methods: {

    handleClick(tab,x) {
      this.step =   (tab.name * 1)
      //alert(tab.name)

    },
    changeHotovost(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].hotovost = 1

      } else {
        self.list.data.firma[0].hotovost = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },
    changeAktivniOsoba(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].hotovost = true

      } else {
        self.list.data.firma[0].hotovost = false
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },

     changeMat(e) {
      const self = this
      if (e.target.checked) {
        self.list.data.firma[0].mat = 1

      } else {
        self.list.data.firma[0].mat = 0
      }
      //alert(e.target.value)
      //alert(e.target.checked)
    },
    chooseItemKontakt: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.firmaosoba.forEach((el,i) =>{
            this.list.data.firmaosoba[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },
    chooseItemCeny: function (event, bEvent) {
//      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      this.list.data.firmaprovozovna.forEach((el,i) =>{
            this.list.data.firmaprovozovna[i].kod = i+1
      })

      // alert(Object.keys(bEvent))
    },
    async firma_ares(ico) {
      this.firmaAres = (await Ico.all(this.user,ico))
      if (this.firmaAres.data.err) {
        alert(JSON.stringify(this.firmaAres.data.err))
        return
      } else {
        // alert(JSON.stringify(this.firmaAres.data))
        var str1=
        this.list.data.firma[0].dic
        + this.list.data.firma[0].nazev
        + this.list.data.firma[0].ulice
        + this.list.data.firma[0].obec
        + this.list.data.firma[0].psc


        var str2=
        this.firmaAres.data.dic
        +this.firmaAres.data.nazev
        +this.firmaAres.data.ulicecela
        +this.firmaAres.data.obec
        +this.firmaAres.data.psc


        if (str2 == str1 ) {
          // alert('stejne')

          this.IsIco = 1
        } else {

          if (str1=='' && str2.replace(/null/g,'')>''){
            this.IsIco = 1


          } else {
            this.IsIco = 2

            if (!confirm('Udaje jsou zmeneny , pouzit?')) {
              return
            }

          }

        }

        this.list.data.firma[0].dic        = this.firmaAres.data.dic
        this.list.data.firma[0].nazev      = this.firmaAres.data.nazev
        this.list.data.firma[0].ulice      = this.firmaAres.data.ulicecela
        this.list.data.firma[0].obec       = this.firmaAres.data.obec
        this.list.data.firma[0].psc        = this.firmaAres.data.psc
        this.list.data.firma[0].aktivni    = this.firmaAres.data.aktivni
        this.list.data.firma[0].datum_ares = this.firmaAres.data.datumvypisu
      }


    },

    async insertNotice() {
        var lAdd = true
        const self = this

      if (this.firmanotice.txt > ''){

        this.firmanotice.idefix_firma =this.idefixThis
        this.list.data.firmanotice.forEach((el,i) =>{
          if (el.txt == this.firmanotice.txt) {
            lAdd = false
            alert('Nemeli by jste pridavat uplne stejnou poznamku ke stejne firme')
          }
        } );
        if (lAdd == true) {
          let neco= this.firmanotice
          var neco2=  (await ListFirma.saveNotice(self.user,self.idefixThis,this.firmanotice,101))
          //return


  //        alert(this.list.data.strojmod.length)
          this.firmanotice.idefix = (this.list.data.firmanotice.length +10)*-1
          this.firmanotice.kod = (this.list.data.firmanotice.length +1)
          this.firmanotice.user_txt = this.user
          // this.firmanotice.datum =
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.firmanotice.push(neco)
          var newObj = f.cp(this.firmanotice)
          this.firmanotice = newObj
          this.firmanotice.txt = ''
          this.firmanotice.datum = this.dnes()
          var neco3  = (await ListFirma.one(this.user,self.idefixThis, 101,''))
          self.list.data.firmanotice = []
          self.list.data.firmanotice =neco3.data.firmanotice
          self.list.data.firmanotice.forEach(el => {
            el.datum  = f.datum2(el.datum)
          })


          //alert(JSON.stringify(neco3.data.firmanotice))
          //alert('aaa')





        }

      }

    },

    firma_copy(){
      this.list.data.firma[0].ulice2 = this.list.data.firma[0].ulice
      this.list.data.firma[0].obec2  =this.list.data.firma[0].obec
      this.list.data.firma[0].psc2   =this.list.data.firma[0].psc
    },

    async getDataEnum(){
      const self = this
            //alert('PRED' + JSON.stringify(self.list.data.enum_strojskup))
            //ServerKlice = 7 vlastnosti
            var tmp
            var tmp2

            if (self.$store.state.showModule == 'list2-strojskup') {
              try {
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 10,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,10,''))
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
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 106,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,106,''))
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
              tmp =  ( await ListFirma.one(this.user,this.idefixThis , 107,''))
                try {
                  tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,107,''))
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
          var nT = new Date()
          var curTime= (nT.getMinutes()*60000)+(nT.getSeconds()*1000) + nT.getMilliseconds()
          if (curTime - self.lastTime <100 ) {
            console.log('1 Opacko : ' , curTime )
            // return
          }
           console.log('2 Pracuji : ' , curTime , ": " , self.lastTime ," rozdil :", (curTime - self.lastTime))
           self.lastTime = curTime

           // return
          // alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          // alert(dlgPar.Idefix)
           self.list = []



          if (dlgPar.Idefix > 0 ){
            if (dlgPar.Akce=='copy'){
              self.isCopy=true

              //alert(1)
              try {

              self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'copy'))
              //self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'copy'))
              // alert('1')
              console.log('copy 1 : ' + self.idefixThis)
              //self.idefixThis = self.list.data.mat[0].idefix
              self.idefixThis = self.list.data.newId
              console.log('copy 2 : ' + self.idefixThis)
              self.list=[]
              self.list = (await ListFirma.one(this.user,self.idefixThis, -1,'edit'))
              self.rec.Idefix = self.idefixThis
              self.firmaNazev = self.list.data.firma[0]['nazev']
              self.list.data.firmanotice.forEach(el => {
                el.datum  = f.datum2(el.datum)
              })




              } catch (e2) {
                alert('error')
              }
              //alert(self.list.data.newId)
              //alert(self.idefixThis)

            }
            if (dlgPar.Akce=='edit'){
              self.isCopy=false

              try {
                //alert("2 " + self.idefixThis )
                self.list = (await ListFirma.one(this.user,dlgPar.Idefix, -1,'edit'))
                self.idefixThis = self.list.data.firma[0].idefix
                self.firmaNazev = self.list.data.firma[0].nazev
                self.list.data.firmanotice.forEach(el => {
                  el.datum  = f.datum2(el.datum)
                })

              } catch (e) {
        //      console.log('chybka ' ,  JSON.stringify(self.list.data.stroj[0].idefix ))
        //      alert( self.list.data.stroj[0].idefix )
                self.idefixThis = self.list.data.firma[0].idefix
                self.firmaNazev = self.list.data.firma[0].nazev

              }
            }
            }

          },

    insertOsoba() {
        var lAdd = true

      if (this.firmaosoba.prijmeni > ''){
        this.firmaosoba.idefix_firma =this.idefixThis
        this.list.data.firmaosoba.forEach((el,i) =>{
          if (el.prijmeni + el.jmeno == this.firmaosoba.prijmeni + this.firmaosoba.jmeno ) {
            lAdd = false
            alert('Nelze pridat 2x stejnou osobu ')
          }
        } );
        if (lAdd == true) {
          let neco= this.firmaosoba

  //        alert(this.list.data.strojmod.length)
          this.firmaosoba.idefix = (this.list.data.firmaosoba.length +10)*-1
          this.firmaosoba.kod = (this.list.data.firmaosoba.length +1)
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.firmaosoba.push(neco)
          var newObj = f.cp(this.firmaosoba)
          this.firmaosoba = newObj
          this.firmaosoba.prioritni = false



        }

      }

    },
    insertProvozovna() {
      var lAdd = true

      if (this.firmaprovozovna.nazev > ''){
        this.firmaprovozovna.idefix_firma =this.idefixThis
        this.list.data.firmaprovozovna.forEach((el,i) =>{
          if (el.nazev == this.firmaprovozovna.nazev ) {
            lAdd = false
            alert('Nelze pridat 2x stejnou provozovnu ')
          }
        } );
        if (lAdd == true) {
          let neco= this.firmaosoba

  //        alert(this.list.data.strojmod.length)
          this.firmaosoba.idefix = (this.list.data.firmaosoba.length +10)*-1
          this.firmaosoba.kod = (this.list.data.firmaosoba.length +1)
          // this.strojmod.prio = (this.list.data.strojmod.length +1)

          this.list.data.firmaosoba.push(neco)
          var newObj = f.cp(this.firmaosoba)
          this.firmaosoba = newObj
          this.firmaosoba.prioritni = false



        }

      }

    },
    deleteOsoba(idx) {
      //alert(JSON.stringify(this.list.data.strojmod[idx]['idefix']))
      try {


      if (this.list.data.firmaosoba[idx]['idefix'] > 0 ){
        if (confirm("Smazat kontakt ?")){
            this.list.data.firmaosoba.splice(idx,1)
        }
      } else {
            this.list.data.firmaosoba.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba Osoby ',e )
      }

    },
    deleteProvozovna(idx) {
      try {
      if (this.list.data.firmaprovozovna[idx].idefix > 0 ){
        if (confirm("Smazat provozovnu ?")){
            this.list.data.firmaprovozovna.splice(idx,1)
        }
      } else {
            this.list.data.firmaprovozovna.splice(idx,1)
      }
      } catch(e) {
        console.log('jsem chyba Provozovny',e )
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

    async submitForm(formName) {
      const self = this
      // alert(formName)
      if (formName == 'formnew'){
        // alert(formName+ ' /' + self.idefixThis)
        eventBus.$emit('dlg8310', {
           'IsDialog': true,
           'Akce' : 'copy' ,
           'Idefix' :  self.idefixThis,

      })
        // return
      } else {

      this.list.data.firmaosoba.forEach((el,i) =>{
            this.list.data.firmaosoba[i].kod = i+1
      })
      // alert(JSON.stringify(self.list.data.strojceny) + " / "+ self.idefixThis )
      var neco=  (await ListFirma.saveone(self.user,self.idefixThis,{
        firma: self.list.data.firma[0],
        firmaosoba: self.list.data.firmaosoba,
        firmaprovozovna: self.list.data.firmaprovozovna,

          }))

      //    return
        if (formName=='formstep'){

          self.step++
          console.log("REC", self.rec)
          this.list = []
          self.rec.Akce ='edit'
          self.getData(self.rec)

          return

        }
        if (formName=='formstep0'){

          self.step = self.step
          console.log("REC", self.rec)
          this.list = []

          self.rec.Akce ='edit'

          self.getData(self.rec)
          return
        }
        //return
        this.list = []
        alert('aaa')
        eventBus.$emit('dlg8310rec')
        eventBus.$emit('dlg8310', {
         'IsDialog': true,
         'Akce' : 'edit' ,
         'Idefix' :  self.idefixThis
        })

        return


      }
      //this.IsDialog = false

      this.list = []
      eventBus.$emit('dlg8310rec')
    },

    cancelForm() {
     if (confirm("Zahodi zmeny ?")) {
       this.IsDialog = false
       this.list = []
     }

    },

    async resetForm(formName) {
        const self= this
        if (self.isCopy == true) {

          //
          //alert(self.idefixThis,)
          //return
          if (confirm('Zavrit bez ulozeni ?')) {
            this.list = []
            var prd= (await ListFirma.delete(self.user,self.idefixThis))
            this.IsDialog = false
            eventBus.$emit('dlg8310rec')
          } else {
            //alert('nedelam')
            return
          }


        } else {
          this.list = []
          this.IsDialog = false

        }
        // var x
        // for (x in this.formBackup ) {
        //   this.recData[x] = this.formBackup[x]
        // }


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
      querySearch5(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojceny_nazev
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch6(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch7(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      querySearch8(queryString, cb) {  //Nazev modu tisk
        var n1 = this.list.data.enum_strojmod_text
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },


     createFilter(queryString) {
        return (link) => {
          if (link.value == null ) {
            return ''
          }
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item)
      },
      dnes() {
        return f.dnes()
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
        case 1: return `Adresy a nazvy `

        case 2: return 'Kontaktni udaje'
        //case 3: return 'Inkousty a barevnosti'
        //case 4: return 'Rychlosti, prujezdy'
        case 3: return 'Provozovny'
        case 4: return 'Prace'
        case 5: return 'Planovani'
        //case 6: return 'Hotovo'

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

.cisla  {
  opacity: 1;
  font-size: 15px;

  height:90%;
  border: solid 1px;
  border-color:#AAAAAA;
  position: relative;
  top:0px;
}

select:focus  {
  opacity: 1;
  font-size: 14px;
  border: solid 0px black;
  /* box-shadow: 0 0 0pt 0pt #719ECE; */
  box-shadow: 0 0 0pt 0pt #000000;

}
ul {
  z-index: 1305000 !important;
}
li {
  z-index: 1305000 !important;
}

.el-select-dropdown {
  z-index: 1305000 !important;
}
.el-popper {
  z-index: 1305000 !important;
}

el-autocomplete-suggestion el-popper el-select-dropdown__item{
  z-index: 1305000 !important;
}

div[role="region"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
    }
 input[type="text"] {
    z-index: 3050000 !important; /*for overriding the old css styles */
   }

 .el-date-table th {

   width: 20px;
 }
 .el-year-table td  {

   width: 20px;
 }
.el-month-table td   {

   width: 48px;
 }

 .el-year-table td  .cell {

   width: 18px;
 }
 .el-month-table td .cell  {

   width: 18px;
 }
 .el-input-group__prepend {
    border-right: 1px !important;
}




</style>
