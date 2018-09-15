<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      clipped
    >
<div>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">expand</el-radio-button>
  <el-radio-button :label="true">collapse</el-radio-button>
    <el-radio-button :label="4">Jarda</el-radio-button>
</el-radio-group>
<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse"
  background-color="#ffffff"
  text-color="#000000"
  mode="vertical"
>
  <el-submenu index="1">
    <template slot="title">
      <v-icon>account_circle</v-icon>
      <span slot="title">Navigator One</span>
    </template>
    <el-menu-item-group>
      <span slot="title">Group One</span>
      <el-menu-item index="1-1">item one</el-menu-item>
      <el-menu-item index="1-2">item two</el-menu-item>
      <el-menu-item v-for="(menu_set,iprehled) in menu_set_prehledy" :key="iprehled" @click="menu_switch(menu_set)" index="i">

             {{menu_set[0]}}

      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    <el-submenu index="1-4">
      <span slot="title">item four</span>
      <el-menu-item index="1-4-1">item one</el-menu-item>
    </el-submenu>
  </el-submenu>
  <el-menu-item index="2">
    <i class="el-icon-menu"></i>
    <span slot="title">Navigator Two</span>
  </el-menu-item>
  <el-menu-item index="3" disabled>
    <i class="el-icon-document"></i>
    <span slot="title">Navigator Three</span>
  </el-menu-item>
  <el-menu-item index="4">
    <i class="el-icon-setting"></i>
    <span slot="title">Navigator Four</span>
  </el-menu-item>
</el-menu>


</div>
<v-list  dense  >

    <v-list-tile  @click="menu_switch(menu_solo_1 )" >
     <v-list-tile-action >
       <v-icon>{{ menu_solo_1[1] }}</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title class="caption ">{{ menu_solo_1[0] }}</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

   <v-list-tile  @click="menu_switch(menu_solo_2 )">
     <v-list-tile-action >
       <v-icon>{{ menu_solo_2[1] }}</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title class="caption">{{ menu_solo_2[0] }}</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

   <v-list-tile  @click="menu_switch(menu_solo_3 )">
     <v-list-tile-action >
       <v-icon>{{ menu_solo_3[1] }}</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title class="caption">{{ menu_solo_3[0] }}</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

    <v-list-group
        prepend-icon="pie_chart"
        value=""
    >
      <v-list-tile slot="activator">
          <v-list-tile-title class="font-weight-black">Prehledy</v-list-tile-title>
      </v-list-tile>

      <v-list-tile  v-for="(menu_set,iprehled) in menu_set_prehledy" :key="iprehled" @click="menu_switch(menu_set )">
     <v-list-tile-content >
       <v-list-tile-title  class="caption">{{ menu_set[0] }}</v-list-tile-title>
     </v-list-tile-content>
     <v-list-tile-action >
       <v-icon>{{ menu_set[1] }}</v-icon>
     </v-list-tile-action>
    </v-list-tile>
    </v-list-group>

    <v-list-group
        prepend-icon="people_outline"
        value="true"
        sub-group
    >
      <v-list-tile slot="activator">
          <v-list-tile-title class="font-weight-black">Administrace</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        value="true"
        sub-group
        prepend-icon="memory"
      >
      <v-list-tile slot="activator">
          <v-list-tile-title class="font-weight-black">Technologie</v-list-tile-title>

      </v-list-tile>
      <v-list-tile  v-for="(menu_set,iprehled) in menu_set_firma" :key="iprehled" @click="menu_switch(menu_set )">
     <v-list-tile-content >
       <v-list-tile-title  class="caption"><span v-for="i in 20" :key="i" >&nbsp;</span>  {{ menu_set[0] }}</v-list-tile-title>
     </v-list-tile-content>
     <v-list-tile-action >
       <v-icon>{{ menu_set[1] }}</v-icon>
     </v-list-tile-action>
    </v-list-tile>
    </v-list-group>

    <v-list-group
        value=""
        sub-group
    >
      <v-list-tile slot="activator">
          <v-list-tile-title class="font-weight-black">Aplikace</v-list-tile-title>
          <v-icon red>computer</v-icon>
      </v-list-tile>
     <v-list-tile  v-for="(menu_set,iprehled) in menu_set_aplikace" :key="iprehled" @click="menu_switch(menu_set )">
     <v-list-tile-content >
       <v-list-tile-title  class="caption">{{ menu_set[0] }}</v-list-tile-title>
     </v-list-tile-content>
     <v-list-tile-action >
       <v-icon>{{ menu_set[1] }}</v-icon>
     </v-list-tile-action>
    </v-list-tile>
    </v-list-group>
    </v-list-group>

<v-divider></v-divider>
       <v-list-group
        sub-group
        value=""
        >
        <v-list-tile slot="activator">
          <v-list-tile-title>Testy </v-list-tile-title>
          <v-icon red>block</v-icon>
        </v-list-tile>

   <v-list-tile @click="compa.push('form-helper')">
     <v-list-tile-action>
       <v-icon>settings</v-icon>
     </v-list-tile-action>
     <v-list-tile-content >
       <v-list-tile-title >Nastaveni 0</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

  <v-list-group
        prepend-icon="account_circle"
        value=""
        sub-group
        >
        <v-list-tile slot="activator">
          <v-list-tile-title>Nastaveni3</v-list-tile-title>
        </v-list-tile>

   <v-list-tile @click="compa.push('testy')">
     <v-list-tile-action>
       <v-icon>wb_sunny</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Testy</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
</v-list-group>

    </v-list-group>
    <v-divider></v-divider>
       <v-list-tile @click="logout">
     <v-list-tile-action>
       <v-icon>directions_run</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Odhlasit</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

</v-list>
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
       <el-radio-group v-model="radio2">
  <el-radio :label="1">A</el-radio>
  <el-radio :label="2">B</el-radio>
  <el-radio :label="3">C</el-radio>
  <el-radio :label="4">D</el-radio>
  <el-radio :label="5">E</el-radio>
  <el-radio :label="6">F</el-radio>
</el-radio-group>
<v-spacer></v-spacer>
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
    <v-content>
    <!-- <v-container fluid fill-height>
        <v-layout justify-center align-top> -->

<template v-if="radio2==1">
  <v-container grid-list-md text-xs-center align-start>
  <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane v-for="(comp, i) in compa" :key="i"
     :label="comp"
     :name="comp">
     <div style="height:800px">
       <panel xs12 md12 lg12>
                 <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>
               <div style="position:absolute;top:48px;botom:100px;heigth:50px;width:50%">
               <component v-bind:is="comp"></component>
               </div>
              </panel>
     </div>
    </el-tab-pane>

  </el-tabs>
  </v-container>
</template>

<v-container  v-if="radio2==2" grid-list-md text-xs-center align-start>
  <v-tabs
    color="green"
    dark
    next-icon="mdi-arrow-right-bold-box-outline"
    prev-icon="mdi-arrow-left-bold-box-outline"
    show-arrows
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab
      v-for="(comp, i) in compa" :key="i"

      :href="'#tab-' + i"

    >
      {{ comp }} {{ i }}
    </v-tab>

    <v-tabs-items>
      <v-layout row wrap align-start>
      <v-tab-item xs12 md6 lg3
        v-for="(comp, i) in compa" :key="i"
        :id="'tab-' + i"
      >
           <div style="height:800px">
              <panel>
               <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>
               <div style="position:absolute;top:48px;botom:100px;heigth:50px;width:50%">
               <component v-bind:is="comp"></component>
               </div>
             </panel>
              </div>

      </v-tab-item>
      </v-layout>
    </v-tabs-items>
  </v-tabs>
  </v-container>

<v-container  v-if="radio2==3" grid-list-md text-xs-center align-start>
    <v-carousel hide-controls
    reverse-transition="fade"
    transition="fade"
    :interval="86400"
    >
    <v-carousel-item v-for="(comp, i) in compa" :key="i" >
                <keep-alive>
               <panel>
                 <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>
               <div style="position:absolute;top:48px;botom:100px;heigth:50px;width:50%">
               <component v-bind:is="comp"></component>
               </div>
              </panel>
              </keep-alive>

    </v-carousel-item>
    </v-carousel>
 </v-container>

     <v-container  v-if="radio2 == 4" grid-list-md text-xs-center align-start>
      <el-carousel  trigger="click"  height="900px" :autoplay="false" type="card">
      <el-carousel-item v-for="(comp, i) in compa" :key="i" >

              <keep-alive>
               <panel>
                 <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>

               <component v-bind:is="comp"></component>
              </panel>
              </keep-alive>

        </el-carousel-item>
      </el-carousel>
     </v-container>

       <v-container  v-if="radio2==5" grid-list-md text-xs-center align-start>
         <v-layout row wrap align-start>

         <v-flex xs12   v-for="(comp, i) in compa" :key="i" offset-xs{i}>

            <panel slot="title1" comp >
              <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>
              <keep-alive>
               <component v-bind:is="comp"></component>
              </keep-alive>
              </panel>

      </v-flex>

      </v-layout>
      </v-container>

        <v-container  v-if="radio2==6" grid-list-md text-xs-center align-start>
         <v-layout row wrap align-start>

         <v-flex xs6   v-for="(comp, i) in compa" :key="i" offset-xs{i}>

            <panel slot="title1" comp >
              <button slot="action" @click="compa.splice(i,1)"
              class="silver elevation-1 pa-8 mr-8"
              light
              small
              relative
              right
              middle
              fab
              ripple
              >
              <v-icon small ripple>clear</v-icon></button>
              <keep-alive>
               <component v-bind:is="comp"></component>
              </keep-alive>
              </panel>

      </v-flex>

      </v-layout>
      </v-container>

    </v-content>
    <v-footer app fixed>
      <span>&copy; db3000 2018</span>
    </v-footer>
  </v-app>
</template>
<script>

// import Api from '@/services/Api'
import _ from 'lodash'
import hw from './Blank.vue'
import testy from './_Testy/testy'
import formFX from './_Testy/formFX'

import TestMenu from './_Testy/TestMenu'
import List2Barevnost from './List2Barevnost'
import ListUsers from './ListUsers'
import SetWidth from './SetWidth'
import SetMaterial from './SetMaterial'

// Old
import old1 from './Old_1'

import {mapState} from 'vuex'

export default {
  components: {
    'form-helper': hw,
    'testy': testy,
    'test-menu': TestMenu,

    'set-color': List2Barevnost,
    'set-users': ListUsers,
    'set-width': SetWidth,
    'set-material': SetMaterial,
    'form-fx': formFX,

    'old-1': old1
  },

  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])

  },
  data: () => {
    return {
      drawer: true,
      props: {
        source: String
      },
      activeName: 'first', // tabs pro el
      isCollapse: true,

      radio2: 6,

      informace: '',
      component: '',
      compa: ['set-users', 'set-color'],
      menu_solo_1: ['Muj přehled', 'trending_up', 'menu_switch', 'set-my-overview', 'true'],
      menu_solo_2: ['Kalkulace', 'iso', 'menu_switch', 'set-calc', 'true'],
      menu_solo_3: ['Zakazky', 'shopping_cart', 'menu_switch', 'set-zakazky', 'true'],

      menu_set_prehledy: [
        ['Prehledy 1', 'sort', 'menu_switch', 'prehled', 'true'],
        ['Stara DB', 'accessible', 'menu_switch', 'old-1', 'true', 'window']
        // ['FX', 'accessible', 'menu_switch', 'form-fx', 'true']
      ],
      menu_set_firma: [
        ['Barevnost', 'format_color_fill', 'menu_switch', 'set-color', 'true'],
        ['Sirky', 'code', 'menu_switch', 'set-width', 'true'],
        ['Materiály', 'texture', 'menu_switch', 'set-material', 'true']
      ],
      menu_set_aplikace: [
        ['Uzivatele', 'wc', 'menu_switch', 'set-users', 'true'],
        ['Moduly', 'view_module', 'menu_switch', 'moduly', 'true']
      ]
    }
  },

  methods: {
    Status: function () {
      alert('status')
    },
    testy () {
      this.$router.push({
        name: 'testy'
      })
    },
    menu_switch (par) {
      if (par.length >= 6) {
        if (par[5] === 'window') {
          let route = this.$router.resolve({ name: par[3] })
          // let route = this.$router.resolve('/link/to/page'); // This also works.
          window.open(route.href, 'Old_1', 'width=800')
          return
        }
      }
      // return
      this.compa.push(par[3])
      this.compa = _.uniqBy(this.compa)

      this.informace = this.compa
      switch (par) {
        case 'set_calc':
          break
        case 'set_color':
          // this.component= 'set_color'
          break
        default:
          this.component = par
          break
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick (tab, event) {
      console.log(tab, event)
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-carousel__item h3 {
    /* color: #475669; */
    color: black;
    font-size: 14px;
    opacity: 0.1;
    line-height: 900px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    /* background-color: #99a9bf; */
    background-color: white;
  }

  .el-carousel__item:nth-child(2n+1) {
    /* background-color: #d3dce6; */
    background-color: white;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

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
