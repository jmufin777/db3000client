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
          <v-card-text class="pa-0 ma-0">
            DB 3000
          </v-card-text>
        </v-card>
      </v-toolbar-title>
  <v-spacer></v-spacer>

    <!-- <el-checkbox label="Kontejner" v-model="contain" border size="mini" ></el-checkbox>
    <el-checkbox label="MujObal" v-model="mujdiv" border size="mini" ></el-checkbox> -->
     <!-- <el-checkbox label="WinPar" v-model="winpar" border size="mini" ></el-checkbox> -->
     <el-checkbox label="Demo2" v-model="demo2" border size="mini" ></el-checkbox>
     <el-checkbox label="MenuAdmin" v-model="demo" border size="mini" ></el-checkbox>


    <v-spacer></v-spacer>
   <el-radio-group v-model="radio2" size="mini">
    <el-radio-button :label="1">Okna</el-radio-button>
    <el-radio-button :label="10">Karty</el-radio-button>

    <el-radio-button :label="20">Plocha</el-radio-button>
  </el-radio-group>
  <el-input-number size="mini" :max="24" :min="-1" v-model="myFlex"></el-input-number>

  <!-- <el-radio-group v-if="radio2===20 " v-model="radio3" size="mini">
     <el-radio-button v-for="(compD,i) in compa" :key="'c'+i"
        :label="compD[0].modul"
      >{{compD[0].title}}</el-radio-button>
  </el-radio-group> -->

<el-dropdown @command="radio3_a">
    <el-badge :value="compa.length" class="item ">
      <el-button size="small" class="el-icon-upload2">{{radio3}}</el-button>
    </el-badge>
  <el-dropdown-menu slot="dropdown" style="z-index:2000000">
     <el-dropdown-item v-for="(compaE, iE) in compa " :key="iE" :command="compaE[0].modul">{{ compaE[0].title }}</el-dropdown-item>
      <el-dropdown-item  command="CloseAllWin">Zavrit vse</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<v-spacer></v-spacer>

<el-dropdown @command="winFocus">
    <el-badge :value="openWins.length" class="item ">
      <el-button size="small" class="el-icon-upload2"></el-button>
    </el-badge>

  <el-dropdown-menu slot="dropdown">

     <el-dropdown-item  command="FindAllWin">Ukazat vse</el-dropdown-item>
     <el-dropdown-item v-for="(openWin, iO) in openWins" :key="iO" :command="openWin">{{openWin.name}}</el-dropdown-item>
     <el-dropdown-item  command="CloseAllWin">Zavrit vse</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

  <!-- <v-btn @click="closeTest">CloseAll</v-btn> -->

<v-spacer></v-spacer>


<router-link :to="{name: 'desktop', params: { ktery: 'old-1' } }" >old_1</router-link>
Test2:
<router-link :to="{name: 'desktop', params: {ktery: 'menu-schema'}}">MenuSchema</router-link>
Moduly:
<router-link :to="{name: 'desktop', params: {ktery: 'list-modules'}}">Moduly</router-link>
<v-spacer></v-spacer>
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
    </v-toolbar>

    <v-content v-if="cont" style="padding-top: 10px">

   <v-container grid-list-md >
    <v-layout v-if="lay" row wrap>
   <div style="position:absolute;top:0px;left:0px;height:100%;width:99%;background-color:#E1F5FE;opacity:1">

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
     <el-button v-if="radio3>'' && radio2==10 " type="error" icon="el-icon-close"  size="mini" class="elevation-20"
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

   <el-row v-if="radio2==20" :gutter=0 >
     <!-- plocha  -->
      <el-col  :span="23">
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
import { g } from '@/funkce/global.js'
import hw from './Blank.vue'
import testy from './_Testy/testy'
import formFX from './_Testy/formFX'

import DevDoc from './dev/DevDoc'
import DevPP from './dev/DevPP'
import DevPPKalc from './dev/DevPPKalc'

import TestMenu from './_Testy/TestMenu'

import MenuNav from './MenuNav'

import MenuSchema from './MenuSchema'
import MenuAdminIndex from './MenuAdminIndex'


import ListUsers from './ListUsers'
import ListModules from '@/components/ListModules.vue'
import ListGroups from '@/components/ListGroups.vue'

import List2Barevnost from './List2Barevnost'
import SetWidth from './SetWidth'
import SetMaterial from './SetMaterial'

import draggable from 'vuedraggable'
import vuedraggableresizable from 'vue-draggable-resizable'





// import {ServerTable, ClientTable, Event} from 'vue-tables-2'
// npm install --save vue-tables-2

// Old
import old1 from './Old_1'

import {mapState} from 'vuex'

export default {
//  props: ['server'],
  components: {
    'menu-nav': MenuNav,

    'menu-admin': MenuAdminIndex,
    'menu-schema': MenuSchema,

    'dev-doc': DevDoc,
    'dev-pp': DevPP,
    'dev-pp-kalc': DevPPKalc,




    'form-helper': hw,
    'testy': testy,
    'test-menu': TestMenu,
    'list2-barevnost': List2Barevnost,
    'list-users': ListUsers,
    'list-modules': ListModules,
    'list-groups': ListGroups,

    'set-width': SetWidth,
    'set-material': SetMaterial,
    'form-fx': formFX,
    'old-1': old1,
    'draggable': draggable,
    'vue-draggable-resizable': vuedraggableresizable
  },

  computed: {

    xMenuEmpty2: function(){
      if (this.xMenuEmpty.length==0){
        this.xMenuEmpty.push(this.Add())
      }
    },
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain'

    ]),
  },

  watch: {

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



         this.compa.push([{modul: atmp[idx], title: atmp[idx - 3], where: atmp[idx+2]}])

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
      drawer: true,
      // Zobrazeni - checkboc
      checkDesk: [],
      cont: true,
      lay: true,
      demo: false,
      demo2: false,
      winpar: true,

      // Zobrazeni - checkboc


      select: 'Modul',
      comp_list: ['form-helper', 'testy', 'test-menu', 'list2-barevnost', 'list-users', 'set-width', 'set-material', 'form-fx', 'old-1'],
      activeName: 'first', // tabs pro el
      isCollapse: true,
      myFlex: -1,
      radio2: 20,
      radio3: '',
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
        ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]],
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
      aEmpty3 = ['Barevnosti', 'texture', 'menu_switch', 'stroje-barevnost', 'true','','','','','Item',[]]
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
        this.compa.push([{modul: par[3], title: par[0], where: par[5]}])
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
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'login' })
    }
  },
  mounted () {
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
    }

    this.xMenuCopy = this.xMenu
    // alert(this.xMenu)

    this.AddDefault()
    this.MenuF()


    window.addEventListener('resize', this.handleResize)

  },
  created () {
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
