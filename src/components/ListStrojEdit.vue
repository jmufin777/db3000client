<template>
 <win-dow :title="'events'" :id="`events`"
    :x="xMyska"
    :w="1024"
    :y="100"
    :z="90"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="true"
    :forgetWH="false"
    :forgetAll="true"
    v-if="IsDialog1"
    >

<!-- <span slot="a1">A1</span>
<span slot="a2">A2</span>
<span slot="a3">A3</span> -->

<div slot="b1" class="green" style="height:40px;font-size:18px">{{ stepInfo}}</div>
<!-- <span slot="b3">B3</span> -->
<span slot="c1" style="height:40px;font-size:18px">
        <el-button @click="cancelForm" id="btn_cancel_submit821" size="mini" style="height:40px;font-size:18px">Zavrit</el-button>
  </span>

<!-- <span slot="c3">C3</span> -->
 <div

        persistent
        max-width="900px"
        style="position:absolute;top:10%;left:0px;height:100%;width:100%;background:white"
        scrollable
        v-if="IsDialog1"
        :nazev="name"
    >

<v-card
      class="mx-auto"

    >
      <v-card-title class="title font-weight-regular justify-space-between">
        <span></span>
        <v-avatar
          color="primary lighten-2"
          class="subheading white--text"
          size="14"
          v-text="step"
        ></v-avatar>



      </v-card-title>

      <v-window v-model="step">
            <el-form  id="form8210" ref="form3" :model="form3" label-width="70px" :label-position="labelPosition"

        class="demo-ruleForm is-success" >
        <v-window-item :value="1">

    <el-row class="ma-2">
            <el-col :span="24" class="pa-3 mt-4 text-xs-center" style="width:100%" >

              <el-row class="ma-2">
     <el-col :span="3">Nazev </el-col>
     <el-col :span="4">

       <!-- <el-input  v-model="list.data.mat[0].nazev1" size="mini"></el-input> -->

     <v-autocomplete
      class="inline-input mr-1"
      v-model="strojNazev"
      :fetch-suggestions="querySearch1"
      placeholder="nazev"
      size="mini"

    ></v-autocomplete>



     </el-col>
    </el-row>





              <span class="caption grey--text text--darken-1">
                This is the email you will use to login to your Vuetify account
              </span>
            </el-col>
    </el-row>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <span class="caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-3 mt-4 text-xs-center" style="width:100%">
            <v-img
              class="mb-3"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>

        <v-window-item :value="4">
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
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="step === 7"
          color="primary"
          depressed
          @click="step++"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>


</div>
 </win-dow>

</template>
<script>

import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListStroj from '@/services/ListStrojService'
import List2Edit from  './List2Edit.vue'

import f from '@/services/fce'
import moment from 'moment'



//import List2StrojSubSkup from '@/services/List2StrojSubSkupService'
// import List2StrojSkup from '@/services/List2StrojSkupService'

import { setTimeout, clearInterval } from 'timers'

export default {
  components: {
    'list2-edit': List2Edit,

  },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      xMyska: 350,
      rec: {},
      length: 4,
      window: 0,
      step: 1,
      //stepInfo: 'Resim co jako',
      idefixThis:0,
      list:[],
      list0:{},
      labelPosition: 'right',
      strojNazev:'',

      // links: [],
      form3: {

      },

// --  10   enum_strojskup
// -- 101   enum_nazev_text
// -- 102   enum_nazev
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
      eventBus.$on('dlg8210', ( dlgPar ) => {
            self.rec = dlgPar
            self.xMyska = event.screenX - 200

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
    },



  } ,

  methods: {

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
              //alert(self.list.data.newId)
              //alert(self.idefixThis)

            }
            if (dlgPar.Akce=='edit'){
              self.isCopy=false
              self.list = (await ListStroj.one(this.user,dlgPar.Idefix, -1,'edit'))
              self.idefixThis = self.list.data.stroj0[0].idefix
              self.strojNazev =self.list.data.stroj0[0].nazev

            }
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

    querySearch1(queryString, cb) {

        var n1 = this.list.data.enum_nazev
        //console.log(":N1:", n1)
        //return
        var links = n1

        //alert(links)

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
        case 1: return 'Zakladni udaje '
        case 2: return 'Rozmery'
        case 3: return 'Cenove slozky'
        case 4: return 'Inkousty a barevnosti'
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
</style>
