<template >
  <v-app id="inspire">
    <v-navigation-drawer v-if="true"
      v-model="drawer"
      fixed
      app
      clipped
      light
      stateless
    >
     <menu-nav :xmenu="xMenuFinal" :xgroup="people1001"></menu-nav>
    </v-navigation-drawer>
      <v-toolbar app fixed clipped-left >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="pa-0 ma-0">
        <v-card class="pa-0 ma-0">
          <v-card-text class="px-1 mx-1 elevation-2" style="background:#f5f5f5">
            DB 3000&nbsp;&nbsp;&nbsp;&nbsp;
          </v-card-text>
        </v-card>
      </v-toolbar-title>


    <!-- <el-checkbox label="Kontejner" v-model="contain" border size="mini" ></el-checkbox>
    <el-checkbox label="MujObal" v-model="mujdiv" border size="mini" ></el-checkbox> -->
     <!-- <el-checkbox label="WinPar" v-model="winpar" border size="mini" ></el-checkbox> -->







  <!-- <el-radio-group v-if="radio2===20 " v-model="radio3" size="mini">
     <el-radio-button v-for="(compD,i) in compa" :key="'c'+i"
        :label="compD[0].modul"
      >{{compD[0].title}}</el-radio-button>
  </el-radio-group> -->

<!-- Original Menu rozbalovaci
  <el-dropdown v-if="this.compa.length>0" @command="radio3_a" >
    <el-badge :value="compa.length" class="item ">
      <el-button size="small" class="el-icon-upload2">{{radio3}}</el-button>
    </el-badge>
  <el-dropdown-menu v-if="this.compa.length>0" slot="dropdown" >
     <el-dropdown-item v-for="(compaE, iE) in compa " :key="iE" :command="compaE[0].modul">{{ compaE[0].title }}</el-dropdown-item>
      <el-dropdown-item v-if="this.compa.length>0" command="CloseAllWin">Zavrit vse</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
 EOF Menu original rozbalovaci  -->


<!-- <div v-if="this.compa.length>0" style="background:f5f5f5;max-width:50%;border:solid 0px;border-color:white" class="ml-4 px-2 elevation-1"> -->
<div v-if="this.compa.length>0" style="background:f5f5f5;max-width:50%;border:none" class="ml-4 px-2 elevation-0">
<el-tabs v-model="radio3t"  @tab-click="radio3_atab" closable @tab-remove="removeCompa"  style="background:f5f5f5" lazy>
  <el-tab-pane v-for="(compaE, iE) in compa " :key="iE" :name="compaE[0].modul" :label="compaE[0].title"></el-tab-pane>
    <!-- <el-tab-pane label="Vse"   :name="'CloseAllWin'"  ></el-tab-pane> -->
 </el-tabs>
</div>


<v-spacer></v-spacer>

<el-dropdown v-if="this.openWins.length>0" @command="winFocus">
    <el-badge :value="openWins.length" class="item ">
      <el-button size="small" class="el-icon-upload2"></el-button>
    </el-badge>
  <el-dropdown-menu slot="dropdown">
     <el-dropdown-item  command="FindAllWin">Ukazat vse</el-dropdown-item>
     <el-dropdown-item v-for="(openWin, iO) in openWins" :key="iO" :command="openWin">{{openWin.name}}</el-dropdown-item>
     <el-dropdown-item  command="CloseAllWin">Zavrit vse 2</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

  <!-- <v-btn @click="closeTest">CloseAll</v-btn> -->
<v-spacer></v-spacer>

<!-- <router-link :to="{name: 'desktop', params: { ktery: 'old-1' } }" >old_1</router-link>
Test2:
<router-link :to="{name: 'desktop', params: {ktery: 'menu-schema'}}">MenuSchema</router-link>
Moduly:
<router-link :to="{name: 'desktop', params: {ktery: 'list-modules'}}">Moduly</router-link> -->
<div class="mx-4"><div class="mx-4">
 <db-status></db-status>

</div></div>
<el-tooltip  placement="bottom" effect="light">

      <div slot="content">


     <!-- <el-checkbox label="Demo2" v-if="level==3" v-model="demo2" border size="mini" ></el-checkbox> -->
     <el-checkbox label="MenuAdmin" v-if="level==3"  v-model="demo" border size="mini" ></el-checkbox>

   <el-radio-group v-model="radio2" size="mini" style="background:white">
    <!-- <el-radio-button :label="1">Okna</el-radio-button> -->


    <el-radio-button :label="20" size="mini">Plocha</el-radio-button>
    <el-radio-button :label="10" size="mini">Karty</el-radio-button>
  </el-radio-group>
   <el-input-number v-if="radio2==10" size="mini" :max="24" :min="-1" v-model="myFlex"></el-input-number>




     <span class="ma-2 pa-2 blue"> level: {{ level }} id: {{idefix}} login: {{ $store.state.user }}</span>
</div>

      <v-btn
        v-if="$store.state.isUserLoggedIn"
        class="yellow accent-12 elevation-10"
        light
        small
        absolute
        right
        middle
        fab
        ripple
        @click="logout"
      >
     <v-icon>directions_run</v-icon>
      </v-btn>

      </el-tooltip>

    </v-toolbar>

    <v-content v-if="cont" style="padding-top: 10px">

   <v-container grid-list-md >
    <v-layout v-if="lay" row wrap>
   <div style="position:absolute;top:0px;left:0px;height:100%;width:99%;background-color:#f5f5f5;opacity:1">

      <p v-for="(r, i ) in $route.path" :key="'zzz' + i">{{r.name}}</p>
<!-- :sticks="['tm','bm','ml','mr']
  {{compa}} [{{ openWins.join(',') }}]
:isActive="true"
:isDraggable="false"
:isResizable="false"
:parentLimitation="true"
:aspectRatio="false" - skusit, proporce
:minw
:minh

@activated
@deactivated
@resizing

 @resizestop
 @dragging
 @dragstop -->

<menu-admin v-if="demo"></menu-admin>
<win-dow v-if="radio2===1" v-for="(comp,i) in compa" :key="'c'+i"
    :id="comp[0].modul "
    :title="comp[0].title"
    :x="200+(20 * i)"
    :w="700"
    :y="10 * i "
    :z="90"
    :h="351"
    :parent="true"
    :maximize="false"
    :demo="demo2"
 >
<el-button slot="c1" type="warning" icon='el-icon-upload2'  size="mini" class="elevation-20"
  @click="moveModuleToWin(comp[0].modul,1)"
 ></el-button>
 <el-button slot="c1" type="error" icon="el-icon-close"  size="mini" class="elevation-20"
  @click="closeModule(comp[0].modul)" ></el-button>
    <keep-alive>
    <component v-bind:is="comp[0].modul" ></component>
    </keep-alive>
</win-dow>

  <el-row v-if=" radio2==10" :gutter=0 >
    <draggable v-model="compa"  :options="{group:{ name:'app_move' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
      <el-col v-for="(comp_app, iapp) in compa" :key="iapp" :span="myFlex || 24/ compa.length">
    <el-card shadow="hover">
        <el-tooltip  placement="bottom" effect="light" >
        <div slot="content">Vytvori nezavislou kopii v samostatne okne</div>
        <el-button   v-if="radio3>'' && radio2==10" type="error" icon="el-icon-upload2"  size="mini" class="elevation-20"
        @click="moveModuleToWin(comp_app[0].modul,1)"
        ></el-button>
        </el-tooltip>
        <el-tooltip  placement="bottom" effect="light">
        <div slot="content">Ukonci praci s touto obrazovkou</div>
      <el-button v-if=" radio2==10 " type="error" icon="el-icon-close"  size="mini" class="elevation-20"
        @click="closeModule(comp_app[0].modul)" >
    </el-button>
    </el-tooltip>
      <keep-alive>
        <component v-bind:is="comp_app[0].modul" ></component>
      </keep-alive>
  </el-card>
  </el-col>
  </draggable>
 </el-row>

   <el-row   v-if="radio2==20 && this.compa.length>0" :gutter=0 style="background:#FFFFFF">
     <!-- plocha  -->
      <el-col  :span="23" >
       <el-button   v-if="radio3>'' && radio2==20" type="error" icon="el-icon-upload2"  size="mini" class="elevation-20"
      @click="moveModuleToWin(radio3,1)"
      > {{ radio3 }}</el-button>
     <el-button v-if="radio3>'' && radio2==20 " type="error" icon="el-icon-close"  size="mini" class="elevation-20"
      @click="closeModule(radio3)" >
  </el-button>
   <keep-alive >
       <component v-bind:is="radio3" ></component>
    </keep-alive>
  </el-col>
 </el-row>


</div>
</v-layout>
</v-container>

  </v-content>
  <v-footer app fixed>
      <span>&copy; db3000 2018</span>
     [ {{ StartRight }} ]
  </v-footer>
  </v-app>

</template>
<style>

</style>


<script>
// import Api from '@/services/Api'
// {{ xm0[10].length == 0 ? "---G0 - NULL ---" : null }}
import _ from 'lodash'
import _f from '@/funkce/Desktop_switch.js'
import { eventBus } from '@/main.js'
import AuthService from '@/services/AuthService'


import hw from './Blank.vue'
import testy from './_Testy/testy'
import formFX from './_Testy/formFX'

import DevDoc from './dev/DevDoc'
import DevDocUITab from './dev/DevDocUITab'
import DevPP from './dev/DevPP'
import DevPPKalc from './dev/DevPPKalc'
import old1 from './dev/Old_1'
import testPet from './dev/testPet.vue'

import TestMenu from './_Testy/TestMenu.vue'

import MenuNav from './MenuNav'
import MenuSchema from './MenuSchema'
import MenuAdminIndex from './MenuAdminIndex'



import ListUsers from './ListUsers'
import ListModules from '@/components/ListModules.vue'
import ListGroups from '@/components/ListGroups.vue'

//Havni seznamy - provoz
import ListStrojOld from './ListStroj'
import ListStroj from './ListStrojView'
import ListMat from './ListMatView'
import ListFirma from './ListFirmaView'


//Doplnky a seznamy - provoz
import List2Index from './List2Index'
import List2IndexDodVyr from './List2IndexDodVyr'
import List2IndexMat from './List2IndexMat'
import List2IndexStroj from './List2IndexStroj'
import List2StrojSkup from './List2StrojSkup'
import List2StrojLaminace from './List2StrojLaminace'

import List2MatSubSkup from './List2MatSubSkup'
import List2MatDostupnost from './List2MatDostupnost'

import List2MatBarevnost from './List2MatBarevnost'
import List2MatPotisknutelnost from './List2MatPotisknutelnost.vue'
import List2MatDodavatel from './List2MatDodavatel.vue'


import DBsystem from './DBsystem'


import SetWidth from './SetWidth'
import SetMaterial from './SetMaterial'

import draggable from 'vuedraggable'
import vuedraggableresizable from 'vue-draggable-resizable'

// import VueSpreadsheetLite from "@/components/List2BarevnostTab4";

//Kontrola a sprava
import DbStatus from  '@/components/globals//DbStatus'

import Calc from '../components/Calc/CalcIndex.vue'


// import {ServerTable, ClientTable, Event} from 'vue-tables-2'
// npm install --save vue-tables-2

// Old


import {mapState} from 'vuex'



export default {
//  props: ['server'],
  components: {

    'db-status': DbStatus,
    'db-system': DBsystem,
    'menu-nav': MenuNav,

    'menu-admin': MenuAdminIndex,
    'menu-schema': MenuSchema,

    'dev-doc': DevDoc,
    'dev-pp': DevPP,
    'dev-doc-ui-tab': DevDocUITab,

    'dev-pp-kalc': DevPPKalc,
    'test-pet': testPet,



    'form-helper': hw,
    'testy': testy,
    'test-menu': TestMenu,
    'list2-index': List2Index,
    'list2-index-mat': List2IndexMat,
    'list2-matsubskup': List2MatSubSkup,
    'list2-matpotisknutelnost': List2MatPotisknutelnost,
    'list2-matdostupnost': List2MatDostupnost,
    'list2-matbarevnost': List2MatBarevnost,

    'list2-index-dodvyr': List2IndexDodVyr,
    'list2-index-stroj': List2IndexStroj,
    'list2-strojskup': List2StrojSkup,
    'list2-strojlaminace': List2StrojLaminace,


    'list-users': ListUsers,
    'list-modules': ListModules,
    'list-groups': ListGroups,
    'list-stroj': ListStroj,
    'list-stroj-old': ListStrojOld,
    'list-mat': ListMat,
    'list-firma': ListFirma,
    'list-dodavatel': List2MatDodavatel,


    'set-width': SetWidth,
    'set-material': SetMaterial,
    'form-fx': formFX,
    'old-1': old1,
    'draggable': draggable,
    'vue-draggable-resizable': vuedraggableresizable,


    'calc': Calc
  },

  computed: {

    xMenuEmpty2: function(){
      if (this.xMenuEmpty.length==0){
        this.xMenuEmpty.push(this.Add())
      }
    },
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore'
    ]),
  },

  watch: {
    compa: function(){

      if (this.compa.length==1){
        this.myFlex=24
      } else {
        this.myFlex=12
      }
      //
      try {
        this.$store.dispatch('addCompaStore', this.compa)

        //this.$store.commit('SETCOMPASTORE', this.compa )
      } catch (e) {
        console.log('Err jarda: ', e )
      }



    },

    radio2: function() {
      if (this.radio2==1){
    //    this.compa = this.compaDesk
      }
    },
    xMenuEmptyx: function() {
        this.xMenuEmpty.push(this.Add())
    },
    '$route' (desktop) {

     const  atmp=this.xMenu.join('~').split(',')
     const idx = atmp.findIndex(function(el){

       return el == desktop.params.ktery
     })
      if (idx > 0 ){
        alert('ktery '+atmp[idx]+' '+atmp[idx-3]+' '+atmp[idx+2])
      } else {
        alert('Modul ' + desktop.params.ktery + ' neni dostupny v menu ')
        return
      }



         //this.compa.push([{modul: atmp[idx], title: atmp[idx - 3], where: atmp[idx+2]}])
         this.compa.unshift([{modul: atmp[idx], title: atmp[idx - 3], where: atmp[idx+2]}])


         this.$router.push({
          name: 'desktop',
          path: '/desktop/'

          })

      //   alert(this.compa)
    },
    xMenu: function() {
      var lCountGroups = false
      if (this.xMenu.length == 0){
       this.AddDefault()
      } else {
          lCountGroups = this.xMenu.some(function (aItem) {
            return aItem[9]=='Group'
          })
       if (lCountGroups === false) {
         this.xMenu.push(this.AddEmptyGroup())

       }

      }

    }
  },
  data: () => {
    return {
      drawer: false,
      // Zobrazeni - checkboc
      checkDesk: [],
      cont: true,
      lay: true,
      demo: false,
      demo2: false,
      winpar: true,

      // Zobrazeni - checkboc


      select: 'Modul',
      comp_list: ['form-helper', 'testy', 'test-menu', 'list2-barevnost2', 'list-users', 'set-width', 'set-material', 'form-fx', 'old-1'],
      activeName: 'first', // tabs pro el
      isCollapse: true,
      myFlex: -1,
      radio2: 20,
      radio3: '',
      radio3t:'',
      openWins: [],

      informace: '',
      component: '',
      compa: [],

      compaWin: [],
      compaDesk: [],

      aMenu: [],
      xMenu:[],
      // xMenuFinal: [['Muj přehled', 'trending_up', 'menu_switch', 'set-my-overview', 'true','','','','right','Item',[] ]],
      xMenuFinal: [],
      xMenuEmpty: [],
      xMenuCopy: [],
      people1001: "aaaaa",
      menu_solo_1: [['Muj přehled', 'trending_up', 'menu_switch', 'set-my-overview', 'true','','','','right','Item',[] ]],
      menu_solo_2: [['Kalkulace', 'iso', 'menu_switch', 'set-calc', 'true','','','','right','Item',[]] ],
      menu_solo_3: [['Zakazky', 'shopping_cart', 'menu_switch', 'set-zakazky', 'true','','','','right','Item',[]] ],

      // menu_solo_4: [{
      //   Nadpis: 'Muj přehled',
      //   Icona: 'trending_up',
      //   Akce: 'set-my-overview'
      // }],
      menu_set_1: [
        ['Prehledy', 'sort', 'menu_switch', 'prehled', 'true','','','','right','Item',[]],
        ['Stara DB', 'accessible', 'menu_switch', 'old-1', 'true', 'xxxxxxx','','','','Item',[]]
        // ['FX', 'accessible', 'menu_switch', 'form-fx', 'true']
      ],
      menu_set_2: [
        ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost2', 'true','','','','','Item',[]],
        ['Sirky', 'code', 'menu_switch', 'set-width', 'true','','','','','Item',[]],
        ['Materiály', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]],
        ['Stroje', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]]
      ],
      menu_set_3: [
        ['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
        ['Moduly', 'view_module', 'menu_switch', 'moduly', 'true','','','','','Item',[]],

      ],

    }
  },



  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    range: _.range,
    radio3_a: function (a) {
      if (a === "CloseAllWin" && confirm('Ukoncit vsechny aplikace ?')) {
        this.compa= []
      }
      this.radio3 = a
    },

    radio3_atab: function () {
    //  alert(this.radio3t)
      if (this.radio3t === "CloseAllWin" && confirm('Ukoncit vsechny aplikace ?')) {
        this.compa= []
      }
        this.radio3 = this.radio3t
    },
    removeCompa( targetName ){
      let tabs = this.compa
      let activeName = this.radio3t
      var idx=-1
      tabs.forEach((tab, index) =>{
      //  alert(JSON.stringify(tab))
        if (tab[0].modul == targetName) {
          idx = index
          return
        }
      })
      if (idx > -1){
        this.compa.splice(idx,1)
        if (this.compa.length>0){
          this.radio3t = this.compa[0][0].modul;
          this.radio3  = this.compa[0][0].modul;
        }

      }

    },
    removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },

    closeAllWin: function () {
      const res = confirm('Zavrit vsechna externi okna aplikace?')
      if (res === false ) {

        return false
      }

      this.openWins.forEach( function (el) {
        setTimeout(function(){
           el.focus()
           setTimeout(function(){
           el.close()

          },500)

        },500)
        //el.focus()
      } )
      return true
    },

    findAllWin: function () {
      const aCopyWins=this.openWins
      this.openWins.forEach( function (el,idx) {
          if (el.name > '' ) {
            el.focus()
          } else {
            aCopyWins.splice(idx,1)
          }
      })
       this.openWins = aCopyWins
    },
    winFocus: function (winObj) {
      if (winObj === "CloseAllWin") {
        if (this.closeAllWin()){
            this.openWins = []
        }
      }
      if (winObj === "FindAllWin") {
        this.findAllWin()
      }

      this.openWins.forEach( function (el) {
        //el.close()
        if (winObj.name==el.name){
          el.focus()
        }
      } )

    },


    Alert: function(par) {
      alert(par)
    },
    handleResize(event) {
      this.StartRight = window.innerWidth
    },

    Status: function () {
      alert('status')
    },
    MenuF: function () {
      // alert('emil')
    //    if ( ! store._modulesNamespaceMap['plugins/sub/']) {
    //        store.registerModule(['plugins', 'sub'], {
    //     namespaced: true
    //   })
    // }
      if (!this.$store.state.xMenuMain) {
        this.$store.dispatch('setMenuMain',  this.xMenu )
        eventBus.$emit('Menuf', this.xMenu )
      }
    },
    MenuFinal() {
      this.xMenuFinal=Array()
      this.xMenu.forEach((ele) => {
      this.xMenuFinal.push(ele)
      })
      alert('Prirazeno')
    },

    onActivated: function (a) {

    },
    onDragAll: function (newRect) {
      // this.width = newRect.width;
      // this.height = newRect.height;
      // this.top = newRect.top;
      // this.left = newRect.left;
    },
    AddDefault: function () {
      var aEmpty = Array(11)

      this.xMenu.push( this.menu_solo_1[0])
      this.xMenu.push( this.menu_solo_2[0])
      this.xMenu.push( this.menu_solo_3[0])

      aEmpty[0] = 'Přehledy'
      aEmpty[1] = 'pie_chart'
      aEmpty[2] = ''
      aEmpty[8] = 'left'
      aEmpty[9] = 'Group'
      aEmpty[10]=[]
      aEmpty[10].push(['Muj přehled', 'trending_up', 'menu_switch', 'set-my-overview', 'true', '', '', '', 'right', 'Item', []])
      aEmpty[10].push(['Stara DB', 'accessible', 'menu_switch', 'old-1', 'true', 'windowxx','','','','Item',[]])
      this.xMenu.push( aEmpty)
      var aEmpty  = Array(11)
      var aEmpty2 = Array(11)
      var aEmpty3 = Array(11)

      aEmpty[0] = 'Administrace'
      aEmpty[1] = 'people_outline'
      aEmpty[2] = ''
      aEmpty[8] = 'left'
      aEmpty[9] = 'Group'
      aEmpty[10]=[]
      aEmpty2 = ['Menu Schema', 'texture', 'menu_switch', 'menu-schema', 'true','','','','','Item',[]]
      aEmpty[10].push(aEmpty2)
      aEmpty2=['Materiály', 'texture', '', '', 'true','','','','','Group',[]]
      aEmpty2[10].push(['Potisknutelnost', 'texture', 'menu_switch', 'material-potisknutelnost', 'true','','','','','Item',[]])
      aEmpty2[10].push(['Rozmery', 'texture', 'menu_switch', 'material-rozmery', 'true','','','','','Item',[]])
      aEmpty2[10].push(['Typ', 'texture', 'menu_switch', 'material-typ', 'true','','','','','Item',[]])
      aEmpty3 = ['Barevnosti', 'texture', 'menu_switch', 'stroje-barevnost2', 'true','','','','','Item',[]]
      aEmpty2[10].push(['Stroje', 'texture', '', '', 'true','','','','','Group',[]])

      aEmpty[10].push(aEmpty2)
      this.xMenu.push( aEmpty)


      // this.xMenu.push(this.Add(this.menu_solo_2[0]))
      // this.xMenu.push(this.Add(this.menu_solo_3[0]))
    },

    Add: function () {
      var aEmpty = Array(11)
      var aEmpty2 = Array(11)
      aEmpty[0] = 'Skupina'
      aEmpty[1] = 'wc'
      aEmpty[2] = ''
      aEmpty[8] = 'left'
      aEmpty[9] = 'Group'
      aEmpty[10] = []
      aEmpty2 = Array(11)

      aEmpty2[0] = 'Aplikace'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Item'
      aEmpty2[10] = []
      aEmpty[10].push(aEmpty2)
      return aEmpty
    },

    Add2: function () {
      this.xMenu.push(this.Add())
      this.xMenuEmpty.push(this.Add())
    },
    AddEmptyItem: function () {
      var aEmpty2 = Array(11)
      aEmpty2[0] = 'Aplikace'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Item'
      aEmpty2[10] = []
      return aEmpty2;
    },
    AddEmptyGroup: function () {
      var aEmpty2 = Array(11)
      aEmpty2[0] = 'Skupina'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Group'
      aEmpty2[10] = []
      return aEmpty2;
    },
    chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
    testy () {
      this.$router.push({
        name: 'testy'
      })
    },
    getMenu () {
      this.aMenu.push({'menu_set1': this.menu_set_1})
    },
    menu_switch (par) {
      if (par.length >= 6) {
        if (par[5] === 'window') {
          let route = this.$router.resolve({ name: par[3] })
          // let route = this.$router.resolve('/link/to/page'); // This also works.
          this.openWins.push(window.open(route.href, par[3],  'width=400,height=400'))
          return
        }
      }
      const ind = this.compa.findIndex(function(el){
        return el[0].modul == par[3]
      })
     // alert(ind)

      if (ind < 0) {
        // this.compa.push([{modul: par[3], title: par[0], where: par[5]}])
        this.compa.unshift([{modul: par[3], title: par[0], where: par[5]}])
        this.radio3= par[3]
        this.compa = _.uniqBy(this.compa)

      } else {
          this.radio3 = par[3]
      }
    },
    closeModule: function (ktery) {

      const ind = this.compa.findIndex(function(el){
        return el[0].modul == ktery
      })
      if (ind >= 0) {
        this.compa.splice(ind,1)
        this.radio3=''
      }
    },
    moveModuleToWin: function (ktery, presun) {
      //const  atmp=this.xMenu.join('~').split(',')
      const  atmp=this.$store.state.xMenuMain.join('~').split(',')

      const idx = atmp.findIndex(function(el){
        return el == ktery
     })
     //alert(this.$store.state.xMenuMain)

      const ind = this.compa.findIndex(function(el){
        return el[0].modul == ktery
      })
      const indD = this.compaDesk.findIndex(function(el){
        return el[0].modul == ktery
      })
      //alert(idx + '/' + ind + '/' + presun + '/'+ ktery +'/'+atmp)
      if (idx >= 0 && ind >= 0 && presun == 1) {
        this.compaWin.push(this.compa[ind])
        let route = this.$router.resolve({ name: atmp[idx] })
        var  zzznewWin = window.open(route.href, atmp[idx],  'width=400,height=400')
        zzznewWin.name = ktery
        zzznewWin.title = ktery
        const n = this.openWins.findIndex(function(el){
          return el.name === ktery
        })
        // alert(n+ '/' + ktery)
        if ( n == -1 ) {
          this.openWins.push(zzznewWin)
        }
        const nLen = this.compaWin.length
      }
      if (idx >= 0 && ind >= 0 && presun == 2) {
        this.compaDesk=this.compa
        this.radio2 = ktery
        this.compa=[]
      }
    },
    moveModuleToDesk: function (ktery, presun) {
      const  atmp=this.xMenu.join('~').split(',')
      const idx = atmp.findIndex(function(el){
        return el == ktery
     })
      const ind = this.compa.findIndex(function(el){
        return el[0].modul == ktery
      })
      if (idx >= 0 && ind >= 0) {
        this.compaWin.push(this.compa[ind])
        let route = this.$router.resolve({ name: atmp[idx] })
        window.open(route.href, atmp[idx],  'width=400,height=400')
        const nLen = this.compaWin.length

        this.compa.splice(ind,1)


      }
    },

    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    add () {
      alert('111')
      this.getMenu()
    },
 async  logout () {

   try{

         const response = await AuthService.logout({
          idefix: this.idefix
        })

        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setLevel', null)
        this.$router.push({ name: 'login' })
} catch (err){
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setLevel', null)
      this.$store.dispatch('setIdefix', null)
      this.$router.push({ name: 'login' })

}

      /*
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$store.dispatch('setLevel', null)
      this.$router.push({ name: 'login' })
      */
    }
  },
  mounted () {
    const self = this

    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
    }
    //alert('Des'+ $this.hasClass.hasClass('aaa'))
    //self.$store.replaceState({})

    this.xMenuCopy = this.xMenu
    // alert(this.xMenu)

    this.AddDefault()
    this.MenuF()
    if (this.$store.state.user=='host') {
      setTimeout(function(){
        self.drawer =  false
        self.compa.unshift([{modul: 'test-pet', title: 'F', where: 'par[5]'}])

      },500)


    } else {
      if (self.$store.state.compaStore) {
        self.$store.state.compaStore.forEach(el=>{
          self.compa.push(el)
        })
      }
    }
    if (self.compa.length>0){
      self.radio3t = self.compa[0][0].modul
      self.radio3  = self.compa[0][0].modul
      //alert(self.radio3)
      // alert(JSON.stringify(self.compa[0][0].modul))
    }



    window.addEventListener('resize', this.handleResize)

  },
  created () {
    eventBus.$off('menu_switch')
    eventBus.$off('logout')
    eventBus.$off('appCheck')
    eventBus.$off('Alert')
    eventBus.$off('myzole')
    eventBus.$on('menu_switch', (server) => {
       this.menu_switch(server)
       // alert("jsme tu")
    })
    eventBus.$on('logout', () => {
       this.logout()
       // alert("jsme tu")
    })
    eventBus.$on('appCheck', () => {
       // this.compa.push('appCheck')
       alert('Jsem Zde - evenBus appCheck')
       // alert("jsme tu")
    })
    eventBus.$on('Alert', (server) => {
       this.Alert(server)
       // alert("jsme tu")
    })
    eventBus.$on('myzole',(req)=>{

    })
    this.StartRight=window.innerWidth - 50


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus">
  #example-custom-transition
    .fade
      &-enter-active, &-leave-active, &-leave-to
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0
      &-enter, &-leave, &-leave-to
        opacity: 0
</style>
<style>
.list-complete-item {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
  transition: all 1s;
}

.list-complete-enter, .list-complete-leave-active {
  opacity: 0;
}


</style>
