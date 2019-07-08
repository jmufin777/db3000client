<template>
  <div style="height:400px" class="obal">
    <!-- Link:
  <router-link :to="{name: 'col', params: {ktery: 1 }}">Moduly</router-link> -->
    <my-layout>
      <div slot="hlavninew" style="position:fixed;top:4.8em;left:10px;background:#fdf0f7;text-align:left;width:100%" id="hlavninabidka" class="HlavniNabidka">
    <!-- <div slot="hlavninew" style="position:relative;top:0px;left:10px;background:#fdf0f7;text-align:left;width:100%">   -->
     <div >
      <work-but-menu></work-but-menu>
     </div>

    <span v-if="false">

      {{ KalkulaceThis}} /Last {{ KalkulaceLast }}
      {{ $store.state.KalkulaceThis }} {{ TestRend }}
    </span>
      <!-- <menu-left slot="menuleft"></menu-left>
         <menu-hlavni></menu-hlavni> -->

    </div>
    <!-- {{aKalkulace}} -->
<div  slot="kalkulace" style="position:fixed;width:100%;top:22em;overflow:scroll;height:70%" id="obalKalkulace">
<div v-for="idxK in 1" :key="idxK" slot="kalkulace" >
      <work slot="kalkulace" :typid="1" :kalkulkaceid="iKalk.kalkulkaceid"  v-for="(iKalk ,iK) in aKalkulace" :key="iK" class="myska">
        <span v-if="iK==0"  slot="tlacitka" style="position:relative;left:4px">
         <work-but  :ID="'A_'+iK"  ></work-but>
        </span>
        <span v-else style="position:relative;left:30px" slot="tlacitka" >
        <work-but-plus  :ID="iK"> </work-but-plus>
        </span>
        <span slot="leva" :key="'L'+ TestRend" style="position:relative;left:30px" >
        <work-left :typid="1" :ID2="ID" :kalkulaceid="iKalk.kalkulaceid">
              <button slot="akce" type="button" style="height:16px" class="white  px-0 cell pr-1 pl-1"
              :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
               @click="removeKalk(iKalk.kalkulaceid)"
                >
                <a :name="iKalk.kalkulaceid"></a>
                  <i class="el-icon-delete white" size="mini"
                  :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  ></i>
                </button>
               <button slot="add" type="button" style="height:16px" class="white  px-0 cell pr-1 pl-1"
                :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                @click="copyKalk(iK)"
              >
                  <a :name="iKalk.kalkulaceid"></a>
                  <i class="el-icon-plus white" size="mini"
                  :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  ></i>
                </button>
        </work-left>
        </span>

        <div  v-for="(iSloupec,i) in iKalk.sloupecid" :key="i" :slot="'sloupec'+(i+1)"  :ref="iSloupec" :style="'backgroundcolor:blue;display:block;position:relative;left:30px'"  >
            <!-- {{iKalk.sloupecid}} -->
            <work-col :typid="1" :kalkulaceid="iKalk.kalkulaceid" :sloupecid="iSloupec.id"  v-if="zobrazit==true || true" :key="TestRend" style="z-index:889977">
                <button slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalkCol(iKalk.kalkulaceid, iSloupec)" ><i class="el-icon-delete" size="mini"></i>
                </button>
            </work-col>
        </div>
      <div slot="mezera" class="red">&nbsp;</div>
     </work>
</div>
</div>

   <div style="right:1%;;top:216px;z-index:99999;" class="plovouci  grey lighten-1 pt-2 pb-2"  slot="Plovouci2" id="plovoucimapa11">
     <!--2 = prepinac -->
       <v-btn @click="panel(2,$event)" small class="yellow">MAPA</v-btn><br>
       <v-btn @click="panelPrehled(2,$event)" small class="yellow">Kalkulace</v-btn><br>
             <el-dropdown split-button size="small" trigger="click" @command="zmenaType"  :key="$store.state.KalkulaceThis"  class="px-1">
              Typ sloupce
              {{  $store.state.KalkulaceThis }}
            <el-dropdown-menu slot="dropdown" class="grey lighten-5" >
              <el-dropdown-item  :command="'Mat1'">Materialy</el-dropdown-item>
              <el-dropdown-item  :command="'Laminace'">Laminace</el-dropdown-item>
              <el-dropdown-item  :command="'Kasir'">Kasir</el-dropdown-item>
              <el-dropdown-item  :command="'Rezani'">Rezani</el-dropdown-item>
              <el-dropdown-item  :command="'Baleni'">Baleni</el-dropdown-item>
              <el-dropdown-item  :command="'Jine'">Jine</el-dropdown-item>
              <el-dropdown-item  :command="'Externi'">Externi</el-dropdown-item>
              <el-dropdown-item  :command="'DTP'">DTP</el-dropdown-item>
             </el-dropdown-menu>
            </el-dropdown>
   </div>

  <transition name="fade" slot="PlovouciObsah" >
     <vue-draggable-resizable  class="grey lighten-2 pa-0 elevation-12" style="opacity:1;max-width:2000px;max-height:550px"
     :h="20" :w="1000" :x="-1000"
     :parent="false"
     :drag-handle="'.drag00'"
     :handles="[]"
      v-if="zobrazitPanel"

      >
      <div class="drag00 blue lighten-4" style="cursor:pointer;height:20px" :key="'M'+ TestRend">
      <div style="width:10%;float:left" >
        <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button></div>
      <div style="width:70%;float:left" >{{StatusMapy}}</div>
      <div style="width:19%;float:right;text-align:right" >
        <button class="mybutton pr-3 stred pl-3" @click="zobrazitPanel=!zobrazitPanel">x</button>
        </div>
      </div>
      <div class="pa-0 pt-1" style="width:100%;max-height:550px;overflow-y:auto">
        <v-card><v-card-text class="grey  pa-0">
          <draggable v-model="aKalkulace"  :options="{group: 'people2' }"
          @start="pripravRadky2()"
          @end="drag=false;chooseRadky2()"
          :move="chooseRadky"
          style="min-width:500px;">

          <div v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;float:none" class="grey lighten-2 pl-1 pt-1"

               >
              <div style="float:left;border:4px solid #eeeeee"

              >
              <!-- @click="setKalk2(i);f.Alert2('klik2')" -->
               <!-- @mouseover="setKalk2(i)"  -->
               <!-- @mouseenter="setKalk(iK.kalkulaceid)" -->
                <v-card
                 @click="setKalk(iK.kalkulaceid)"
                 ><v-card-text style="width:15em;font-size:12px;min-height:29px;cursor:pointer;text-align:left" class="pb-0 pt-0 grey lighten-3"
                :class="{'green lighten-1': $store.state.KalkulaceThis*1 == iK.kalkulaceid*1 }"
                 >
                 <a :href="'#'+iK.kalkulaceid" @click="setKalk(iK.kalkulaceid)"   :ref="'ref_'+iK.kalkulaceid" :id="'ref_'+iK.kalkulaceid + ID">

                 <span class="pr-2" > {{iK.kalkulaceid}}</span>
                 </a>
                 <span class="pl-0 "
                 >{{Kalkulace[i].data.txtStroj}}</span></span>
                  <span style="position:absolute;top:0px;right:1px" ><button type="button" class="elevation-1 mybutton"   @click="removeKalkAccId(i)">x</button></span>
                  <span style="position:absolute;bottom:0px;left:1px" class="elevation-1 mybutton" ><button type="button" @click="copyKalk(i)" >+</button></span>
                 </v-card-text></v-card>
              </div>
              <!-- <draggable v-model="iK.sloupecid"  :options="{group: 'people11' }"  @start="drag=true" @end="drag=false" :move="chooseSloupce" > -->
                <draggable v-model="iK.sloupecid"  :options="{group: 'people11' }"
                @start="pripravRadky2()"
                @end="drag=false;chooseRadky2()"
                :move="chooseSloupce" >
                <div v-for="(sl, iSloupcex ) in iK.sloupecid" :key="iSloupcex" style="float:left;border:2px solid white;width:8em;text-align:center" >
                  <!-- <v-card><v-card-text style="font-size:12px;height:28px" class="pb-1 pt-1" -->
                  <v-card><v-card-text style="font-size:12px;height:28px" class="pb-1 pt-1"
                  :class="{
                    'blue lighten-4': $store.state.KalkulaceColThis==sl.id,
                    'brown lighten-3': sl.type=='Mat1','green lighten-1': sl.type=='Laminace','orange lighten-1': sl.type=='Kasir','yellow lighten-2': sl.type=='Rezani','   lighten-2': sl.type=='Rezani'
                    , 'pink lighten-5': sl.type =='Baleni', 'red lighten-2': sl.type=='Jine'
                    , 'cyan lighten-3': sl.type =='DTP' , 'lime lighten-3': sl.type =='Externi'

                    }"

                  ><span
                  :class="{'elevation-12':$store.state.KalkulaceColThis==sl.id}"
                  >{{sl.type}} </span>
                  <span style="position:absolute;top:0px;right:1px" ><button type="button" class="elevation-1 mybutton" @click="deleteCol(i, iSloupcex)">x</button></span>
                  <span style="position:absolute;bottom:0px;left:1px" class="elevation-1 mybutton" @click="copyCol(i, iSloupcex)">
                    <button type="button" >+</button></span>
                  </v-card-text>
                  </v-card>
                </div>

              </draggable>
              <div style="width:10%;font-size:1px" >&nbsp;</div>
          </div>
         </draggable>
        </v-card-text></v-card>

      </div>

     </vue-draggable-resizable>
 </transition>

    <!-- <div style="position:absolute;top:20%;right:5%;z-index:99999;overflow:scroll;height:500px;border:solid 2px black" class="grey lighten-5" slot="obsah" v-if="zobrazitPanel" >  -->
  <transition name="fade" slot="PlovouciObsah2">
     <vue-draggable-resizable  class="grey lighten-2 pa-0 elevation-12" style="opacity:1;max-width:2000px;max-height:550px;z-index:1000"
     :h="20" :w="1000" :x="-1000"
     :parent="false"
     :drag-handle="'.drag00'"
     :handles="[]"
      v-if="zobrazitPrehled"
      >
      <div class="drag00 teal lighten-4" style="cursor:pointer;height:20px">
      <div style="width:10%;float:left" >
        <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button>
      </div>
      <div style="width:70%;float:left" >Kalkulace</div>
      <div style="width:19%;float:right;text-align:right" >
        <button class="mybutton pr-3 stred pl-3" @click="zobrazitPrehled=!zobrazitPrehled">x</button>
        </div>
      </div>
      <div class="pink" style="height:800px">
          <v-card v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;position:relative;">
                <v-card style="width:20%;float:auto">
                  <v-card-title style="font-size:12px;height:14px">{{iK.data.txtStroj}}</v-card-title>
                <v-card-text>
                <table>
                  <tr>
                    <td>Format</td><td>{{iK.data.txtFormat}}</td>
                  </tr>
                  <tr>
                    <td>Kusu</td><td>{{iK.data.FormatNakladKs}}</td>
                  </tr>
                </table>
                </v-card-text>
                </v-card>
                <v-card  style="width:60%;float:left">
                <v-card-title>
                  Detail
                </v-card-title>
                <v-card-text>
                <table><tr>
                  <td v-for="(Sloupec, idSloupce) in iK.sloupecid" :key="idSloupce">
                    {{Sloupec.type}}
                  </td>
                  </tr>
                </table>
                </v-card-text>
                </v-card>
            </v-card>
    </div>
     </vue-draggable-resizable>
  </transition>

<!-- <prehled slot="prehled" v-for="(itemP, iP) in aKalkulace" :key="iP"> -->

 <!-- <div style="position:fixed;top:30%;right:1%;z-index:99999" class="grey lighten-5" slot="Plovouci"> -->
   <div style="right:1%;z-index:99999" class="grey lighten-5" slot="Plovouci111">
         <el-dropdown split-button size="small" trigger="click" @command="zmenaType"  :key="$store.state.KalkulaceThis" >
            Typ sloupce {{ $store.state.KalkulaceThis }}
            <el-dropdown-menu slot="dropdown" class="grey lighten-5" >
              <el-dropdown-item  :command="'Mat1'">Materialy</el-dropdown-item>
              <el-dropdown-item  :command="'Laminace'">Laminace</el-dropdown-item>
              <el-dropdown-item  :command="'Kasir'">Kasir</el-dropdown-item>
              <el-dropdown-item  :command="'Rezani'">Rezani</el-dropdown-item>
              <el-dropdown-item  :command="'Baleni'">Baleni</el-dropdown-item>
              <el-dropdown-item  :command="'Jine'">Jine</el-dropdown-item>
              <el-dropdown-item  :command="'Externi'">Externi</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
     </div>

      <span slot="prehled" >
          <!-- <v-btn-toggle v-if="showPrehled==1 && iP==0"> -->
          <v-btn-toggle >
              <v-btn flat value="vyroba">
                Vyroba
              </v-btn>
              <v-btn flat value="expedice">
                Expedice
              </v-btn>
              <v-btn flat value="data">
                Data
              </v-btn>
              <v-btn flat value="vl">
                Vl
              </v-btn>
            </v-btn-toggle>
        <draggable v-model="aKalkulace"  :options="{group: 'people2' }" @start="drag=true" @end="chooseSloupce" >
          <div v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;">
             <div style="width:2%;float:left">
               <v-card><v-card-text>
                  {{iK.kalkulaceid}}
                </v-card-text></v-card>
              </div>
              <div style="float:left">
                 <v-card><v-card-title style="font-size:12px;height:14px">{{Kalkulace[i].data.txtStroj}}</v-card-title><v-card-text>
                    <div class="white" style="float:left">Rozmer {{Kalkulace[i].data.txtFormat}}</div><div>{{Kalkulace[i].data.FormatSirka}}x{{Kalkulace[i].data.FormatVyska}}mm</div>
                    <div class="white" style="float:left">Panelovat</div><div>{{Kalkulace[i].data.FormatPanelovat}}</div>
                    <div class="white" style="float:left">Naklad</div><div>{{Kalkulace[i].data.FormatNakladKs}}</div>
                </v-card-text></v-card>
              </div>
              <draggable v-model="iK.sloupecid"  :options="{group: 'people1' }" @start="drag=true" @end="chooseSloupce" >
              <div v-for="(sl, iSloupce ) in iK.sloupecid" :key="iSloupce" style="float:left">
                 <v-card><v-card-title style="font-size:12px;height:14px">Typ: {{sl.type}}</v-card-title><v-card-text>
                    <div class="white" style="font-size:12px;height:14px">Mat11:{{ getVal(sl.data.mat,"nazev")}}</div>
                    <div class="white" style="font-size:12px;height:14px">Stroj:{{ getVal(sl.data.stroj, "nazev")}}</div>
                    <div class="white" style="float:left">Naklad:</div>
                    <div class="white" style="float:left" >{{sl.data.naklad}}</div>
                </v-card-text></v-card>
              </div>
              </draggable>
              <div style="width:1%">.</div>
          </div>
        </draggable>

        </span>
     </prehled>
     <div slot="odkazy" v-if="aKalkulace.length">
     <!-- <v-pagination
      v-model="Navigace"
      :length="aKalkulace.length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"

    ></v-pagination> -->
    <draggable  v-model="aKalkulace"  :options="{group:{ name:'Kalkulace' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
      <span  v-for="(iKalk0 ,iK0) in aKalkulace" :key="iK0">
      <div style="position:relative;float:left;border: solid 2px white;width:30px;text-align:center;" class="elevation-5">
      <a :href="'#'+iKalk0.kalkulaceid" @click="setKalk(iKalk0.kalkulaceid)" :ref="'ref_'+iKalk0.kalkulaceid" :id="'ref_'+iKalk0.kalkulaceid + ID">
        &nbsp;{{iKalk0.kalkulaceid}}
        </a>
      </div>
      </span>
     </draggable>
      <div :ref="'neco11'"></div>
     </div>
    </my-layout>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'
import {mutations} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import MyLayout from './CalcMyLayout.vue'
import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue'

import Work from './CalcWork.vue'       // Pracovni cast nahore, obshahuje levou cast a sloupce
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole
import WorkBut from './CalcWorkButton.vue' // Prehledova dole
import WorkButPlus from './CalcWorkButtonPlus.vue' // Prehledova dole
import WorkButMenu from './CalcWorkButtonMenu.vue' // Prehledova dole

import ListStroj from '../../services/ListStrojService'
import f from '@/services/fce'
// import query from '../../services/query'
//import Q from '../../services/query'
import queryKalk from '../../services/fcesqlKalkulace'

//10411

import Prehled from './CalcPrehled.vue' // Prehledova dole

import JQuery from 'jquery'
let $ = JQuery

export default {

 components: {
   'prehled': Prehled,
    'menu-left': MenuLeft,
    'my-layout': MyLayout,
    'work': Work,
    'work-left': WorkLeft,
    'work-col': WorkCol,
    'work-but': WorkBut,
    'work-but-plus': WorkButPlus,
    'work-but-menu': WorkButMenu,
    'menu-hlavni': MenuHlavni,

 },
 data () {

   return {
     zobrazit:true,
     zobrazitPanel:false,
     zobrazitPrehled:false,
     StatusMapy: 'Mapa',
     Navigace: 0,
     Hlavni: 0,
     Left: 0,
     aKalkulace: [],
     lastIdK: -1,
     KalkulaceThis: -1,
     KalkulaceLast: -1,
     CalcCount: 0,
     ColCount: 0,
     showPrehled: 1,
     qtest: [],
     ID: 0,
     TestRend :0,
     timeoutDrag: null,
     $: $,
     f: f,
     drag: false
   }
 },
 watch: {
  aKalkulace :function(a) {
    console.log("Sleduji kalkulace", a)
    try {
  //    this.$store.dispatch('setKalkulace', this.aKalkulace)
    } catch(err) {
      console.log('jebka')
    }
    //alert('a')
  }
 },

 async created () {
      const self = this
//      alert('Tvorim')
     eventBus.$off('MenuHlavni')
     eventBus.$off('MenuLeft')
     eventBus.$off('SAVETEMPLATE')
     eventBus.$off('DELETETEMPLATE')
     eventBus.$on('kalkulaceDelete',(serverDel) => {
     eventBus.$off('MatCol')
     eventBus.$off('Rend')
     console.log(serverDel)
     })
     //eventBus.$off()

    eventBus.$on('MatCol', (server) => {
      console.log('Pridam jej Mt')
      setTimeout(function(){
        self.addColMat(server);
      },1000)
      //self.addColMat(server)
    })
    eventBus.$on('Rend', (server) => {

      self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      self.TestRend++
      //self.addColMat(server)
    })
     await eventBus.$on('SAVETEMPLATE', (server) => {
       if (server.data.nazev=='') {
            f.Alert2('Nazev je nutne vyplnit',self.user)
       } else {
          queryKalk.setKalk(server.data,self.aKalkulace)
       }
       //f.Alert(JSON.stringify(server))
     }),
     eventBus.$on('DELETETEMPLATE', (server) => {
       //f.Alert("SERVER ", JSON.stringify(server), " IDEFIX: ", server.idefix )
       //return
       if (server.idefix=='') {
         f.Alert2('Chyba pri pokusu o smazani',self.user)
       } else {
         // f.Alert('Template bude ulozen pod nazvem  ', server.data.nazev)
         // JSON.stringify(self.aKalkulace)
          queryKalk.deleteTemplate  (server.idefix)
       }
       return
       //f.Alert(JSON.stringify(server))
     }),
     eventBus.$on('MenuHlavni', (server) => {
      self.Hlavni=server.key
      if (server.key == 666) {  //Guma
         self.$store.dispatch('cleanKalk')
         self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
         self.KalkulaceThis = -1
         self.KalkulaceLast = -1
         setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }
      if (server.key == 667) {  //Aplikuj novy template
         self.$store.dispatch('cleanKalk')
         self.$store.dispatch('saveKalkCela', {data: server.Kalkulace })
         self.aKalkulace = server.Kalkulace
         self.KalkulaceThis = -1
         self.KalkulaceLast = -1
         setTimeout(function(){
            self.TestRend=self.TestRend+1
            eventBus.$emit('enable')

        },500)
      }

      if (server.key == 555) {  //Guma sloupce 1
        self.zobrazit=false
        self.TestRend++

      self.$store.dispatch('removeCol',{
          kalkulaceid: server.kalkulaceid,
          idxCol: server.idxCol,
        })

        self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))


        setTimeout(function(){
        self.zobrazit=true
             eventBus.$emit('enable')
         },100)
      }

      eventBus.$emit('WorkLeft',{key: self.nRet })

      if (server.key == 777) {
        //self.aKalkulace=[]
        self.showPrehled=1
        //alert("aaa")
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }

      if (server.key < 11) {
        var beforeK = self.KalkulaceLast
        self.addKalk(server.key)
        if (server.key == 3) {
          setTimeout(function(){
           self.addKalkCol("DTP")
          },500)
        }
        if (server.key == 4) {
          //setKalk(iK.kalkulaceid)

          setTimeout(function(){
           // f.Alert(self.aKalkulace.length)
           self.addKalkCol("Externi")
          },500)
        }
        //self.addKalkCol()

        var n = 0

        // setTimeout(function(){

        //   alert(self.KalkulaceLast)
        // },5000)
      }
      if (server.key == 11) {

        self.addKalkCol()
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)


        //addNew(11)
        //self.aKalkulace.push({kalkulaceid: self.aKalkulace.length+1})
      }

      //alert(self.Hlavni)
    })

     eventBus.$on('MenuLeft', (server) => {
      self.Left=server.key
      self.ColCount++
      //self.addCol(server.key)


    })

 },
 async mounted () {

/* Vzor query
    try {
    this.qtest = (await query.all(this.user,'select * from   list_dodavatel limit 100')).data
    } catch (e) {
      console.log(JSON.stringify(e.response.data.error))
    }
    if (this.qtest) {
        qtest.data - obsahuje data
        qtest.fields - obsahuje seznam fields


    }
*/
  const self=this

   this.ID = Math.round(Math.random() * 198345813)
   this.aKalkulace = this.$store.state.Kalkulace

   //$(document).on('click', function(e){
     $(document).ready(function(){

       $(document).ready(function () {
        var x;
        var y;
        $(document).mousemove(function (e) {
            x = e.pageX;
            y = e.pageY;
        });
      /*
        var $dlg=$("#plovoucimapa11").dialog({
            autoOpen: true,
            show: "blind",
            hide: "explode",
        });
      */
        $(".myska").bind("mouseenter", function () {
          return

          var idObal="obalKalkulace"
          var idVztah="hlavninabidka"

          var vztah= document.getElementById(idVztah)
          //$("#hlavninabidka").hide()
          var poz=$("#hlavninabidka").offset()
          var top=Math.ceil(poz.top)  //konec hlavninabidky
          var thistop=this.offsetTop
          var h= $("#hlavninabidka").height()
          var posun = $("#"+idObal).scrollTop()

            //+ top
            if (posun > 0){
           //   f.Alert2(top+ "  /  "+ h + " / " + (thistop + poz ) , posun )
            }

          //$("#hlavninabidka").css("border","solid 20px blue")
           $("#plovoucimapa11").css("top",(thistop  ) +"px")

        //    $dlg.dialog('open'); // open

            //  $dlg.position({
            //             my: "center",
            //             at: "center",
            //             of: window,
            //             collision: "fit",
            //             // Ensure the titlebar is always visible
            //             using: function (pos) {
            //                 var topOffset = $(this).css(pos).offset().top;
            //                 if (topOffset < 0) {
            //                     $(this).css("top", pos.top - topOffset);
            //                 }
            //             }
            //   });

            //alert(x)
        });


        $(".myska").bind("mouseleave", function () {

            //$dlg.dialog('close'); // open
        });



    });

     })

    //$("#plovoucimapa").css('top', e.pageY);
    //$("#plovoucimapa").css('left', e.pageX);
   //});


   return
   if (this.aKalkulace.length > 0 && this.aKalkulace[0].kalkulaceid >-1 ) {
     this.$store.dispatch('setKalk',this.aKalkulace[0].kalkulaceid)
     this.KalkulaceThis = this.$store.getters.getKalk
     this.KalkulaceLast = this.$store.getters.getKalkLast

     //alert(this.KalkulaceThis )

   } else {
     //alert(2)
   }
 },
 beforeEnter: (to, from, next) => {
 //  this.$destroy()
 },
 methods: {
   getVal(obj,klic) {
     var cRet =""

     if (obj){
       if (obj[klic]){
              return obj[klic]
       }
     }
     return "neni "+ klic
   },
   panel(zobraz=1,e=0){
     const self=this
     switch (zobraz){
       case 1:
        self.zobrazitPanel=true
        break;
       case 0:
        self.zobrazitPanel=false;
        break;
       case 2:
        self.zobrazitPanel=!self.zobrazitPanel;
       break;
     }
   },
  panelPrehled(zobraz=1,e=0){
      const self=this
      switch (zobraz){
        case 1:
          self.zobrazitPrehled=true
          break;
        case 0:
          self.zobrazitPrehled=false;
          break;
        case 2:
          self.zobrazitPrehled=!self.zobrazitPrehled;
        break;
      }
    },
    deleteCol(iK,iS) {
      if (!confirm('Smazat sloupec') ) return ;
      eventBus.$emit('MenuHlavni',
        {
          kalkulaceid: iK,
          idxCol: iS,
          key: 555
        })
    },
    async copyCol(iK,iS) {
      const self = this
      await self.pripravRadky2()
      .then(res=>{
        self.$store.dispatch('copyCol',{
          kalkulaceid: iK,
          sloupecid: iS,
      })
      })
      .then(res2=>{
        self.pripravRadky2()
      })
      .then(res3=>{
        self.TestRend++;
      })
      return
    },
    copyKalk(iK) {
      const self = this
      $( ".obal" ).animate({opacity: 0.7}, 200);

      self.$store.dispatch('copyKalk',{
          kalkulaceid: iK,
      })
      setTimeout(function(){

        self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

        setTimeout(function(){
          self.TestRend++;
          $( ".obal" ).animate({opacity: 1}, 200);
        },300)
      },100)

      return

    },
    async removeKalkAccId(idK) {
      const self=this
      if (!confirm('Smazat radek') ) return ;
      //await self.pripravRadky2()
      $( ".obal" ).animate({opacity: 0.7}, 200);
       self.$store.dispatch('removeKalkAccId',{
          kalkulaceid: idK,
      })
      setTimeout(function(){
        self.aKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
        setTimeout(function(){
          self.TestRend++;
          $( ".obal" ).animate({opacity: 1}, 200);
        },300)
      },100)

   },
  async chooseSloupce (event, bEvent) {
    //alert("sloupy")
    const self= this
    return
   },
    async chooseRadky2 () {
          const self= this
          var tmpKalk = JSON.parse(JSON.stringify(self.aKalkulace))
          tmpKalk.forEach((el,idx)=>{
            tmpKalk[idx].kalkulaceid = idx+1
            // el.kalkulaceid =idx +1
          })
          //f.Alert2(tmpKalk[idx].kalkulaceid)
            self.$store.dispatch('saveKalkCela', {data: tmpKalk})
            self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
            self.TestRend++

    },
    async pripravRadky2 () {
          const self= this
           self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
           self.drag=true
          return
    },
   async chooseRadky (event, bEvent) {
     const self= this
     return
    },
    async strojmod(type) {
     const self = this
     var atmp=[]
     var found = true
     var id_query = -0
//     return
     if ( type == 1 )   { id_query=10411 } //Velkoploch
     if ( type == 2 )   { id_query=10410 } //Archovy
     if ( type == 3 )   { id_query=10412 } //Nova Jina
     if ( type == 4 )   { id_query=10411 } //Nova Externi - zatim jako V , nemam zadani
     if ( type == 500 ) { id_query=500   } // Seznam formatu
     if ( type == 501 ) { id_query=501   } // Seznam formatu

    if (type < 500) {
      try {
        atmp=[]
     //   atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_strojmod_full
      //  alert(atmp[0].stroj+ ' '+ id_query )
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 1' )
        eventBus.$emit('enable')

        console.log(JSON.stringify(e.response.data.error))
        alert(JSON.stringify(e.response.data.error))
        //console.log( e)
      }
    }

    if (type == 500) {
      try {
        atmp=[]
  //      atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_format
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 2' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    if (type == 501) {
      try {
        atmp=[]
        atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_matspec
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 3' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    return 0
   },

   async addKalk (KalkType) {
     const self = this
      var newId = 1
     var tmpData = []
     var KalkulaceLast = self.KalkulaceLast
     let oData = {}
     var nTmp = -1
     if (self.aKalkulace.length > 0){
       self.aKalkulace.forEach(el => {
         if (el.kalkulaceid >= newId) {
           newId = el.kalkulaceid + 1
          }
       })
     }

     try{
       tmpData = (await (self.strojmod(KalkType)))   //MOdy pro V nebo A
       oData.Menu2 =  tmpData
       oData.Menu1 = []
       oData.Menu1Value=''
       oData.idefixVidet=0
//       alert(tmpData.length)
       tmpData.forEach((el,idx) => {
        nTmp =  _.findIndex(oData.Menu1, function (o) { return o.text +' '+o.nazev == el.stroj+ ' '+ el.nazev})
        if (nTmp == -1 ) oData.Menu1.push({'text': el.stroj + ' '+ el.nazev })
        if (idx == 0) {
         // oData.Menu1Value = el.stroj + ' '+ el.nazev
           oData.Menu1Value = el.idefix_mod
        }
       })

       try {
        //tmpData = (await (self.strojmod(500)))   //MOdy pro V nebo A


        //oData.Format      =  tmpData
        oData.Format      =  []
        oData.FormatMenu1 =  []
        oData.FormatValue =  ''
        oData.FormatSirka =  0
        oData.FormatVyska =  0
        oData.FormatTisk  =  0   //Jednostranny,oboustranny, oboustranny ruzny
        oData.FormatPanelovat =  0
        oData.FormatSirkaPanel =  0
        oData.FormatNakladKs =  0
        oData.stroj =  [],
        oData.strojmod =  [],
        oData.strojceny =  [],
        oData.ResultM2 =  0.0
        oData.ResultHod =  ''

        self.KalkulaceLast = self.$store.getters.getKalkLast
        setTimeout(function(){
          if (self.KalkulaceLast != KalkulaceLast) {
            eventBus.$emit('enable')
            self.KalkulaceThis = self.KalkulaceLast
            // self.defaultStyle(self.KalkulaceThis)
            self.setKalk(self.KalkulaceThis)
            var neco = 'ref_'+self.KalkulaceThis + self.ID
        }
        },150)
     } catch (e) {
       console.log(e)
     }

     try{

       //tmpData = (await (self.strojmod(501)))   //MOdy pro V nebo A

       //oData.Mat      =  tmpData
       oData.Mat      =  []
       oData.MatMenu1 =  []
       oData.MatValue =  ''

       self.$store.dispatch('addKalk', {kalkulaceid: newId,data: oData,type: KalkType, sloupecid:[]})

       self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

       self.setKalk(newId)
       //self.KalkulaceThis = newId
       self.KalkulaceLast = self.$store.getters.getKalkLast
       setTimeout(function(){
         if (self.KalkulaceLast != KalkulaceLast) {
          //alert("ted")
          eventBus.$emit('enable')
       }
       },500)


     } catch (e) {
       console.log(e)
     }

     } catch (e) {
       console.log(e)
     }

     console.log("tmpData ", tmpData  )
     //self.aKalkulace.push({kalkulaceid: newId,sloupecid:[]})
   },

   removeKalk (kalkulaceid) {
      const self = this
     // alert(kalkulaceid)
      self.$store.dispatch('removeKalk', kalkulaceid )
      self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      if (self.aKalkulace.length > 0 ) {
        self.setKalk(self.aKalkulace[0].kalkulaceid)
        //self.KalkulaceThis = self.aKalkulace[0].kalkulaceid
      }

   },

  k_id() {
  var kRet=   this.$store.getters.getId(this.KalkulaceThis)
  return kRet

 },
   addColMat(server) {
     const self =this
     var idK = self.KalkulaceThis-1
     var idK = this.k_id()
     //this.k_id()
      //alert("IDK :" + idK+ ' json :' + JSON.stringify(server))

      idK=server.key

  //  return
     //--self.setKalk(idK)
     //self.$store.dispatch('addColMat', {kalkulaceid: self.KalkulaceThis, type: 'Mat'})
      //self.$store.dispatch('addColMat',  {kalkulaceid: idK, type: 'Mat1'})
      if (self.aKalkulace[idK].sloupecid.length>0) return

      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Mat1', id:(Math.ceil(Math.random()*91000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Laminace', id:(Math.ceil(Math.random()*92000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Kasir', id:(Math.ceil(Math.random()*93000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Rezani', id:(Math.ceil(Math.random()*94000879))})
      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Baleni', id:(Math.ceil(Math.random()*95000879))})
     //self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Jine-Externi', id:96})
        /////self.addKalkCol("Mat");
     self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
     // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: 9999 })
     // alert("Pridma mat na prvni misto")

   },

   addKalkCol (type="X") {
     const self =this
     //alert('a - vkladam sloupec')
     self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })

     self.$store.dispatch('addKalkCol', {kalkulaceid: self.KalkulaceThis, type: type})
      setTimeout(function(){
        self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

      },1500)

     //self.aKalkulace =  self.$store.state.Kalkulace
     self.TestRend++
     return
        var newKalkColId = -1
        self.CalcCount++
   },
   removeKalkCol(kalkulaceid,sloupecid) {
     console.log('Mazu', JSON.stringify(sloupecid) )
     const self= this
     self.$store.dispatch('removeKalkCol', {kalkulaceid: kalkulaceid, sloupecid: sloupecid} )
     //self.KalkulaceThis = kalkulaceid
     self.setKalk(kalkulaceid)
   },

   dropKalk(kalkulaceid) {
     const self = this
      self.aKalkulace.forEach((element,idx) => {
       if ( element.kalkulaceid == kalkulaceid ) {
                  self.aKalkulace.splice(idx,1)
                  return
            }
       });
   },

  defaultStyle(setkalkId) {
    const self = this
    var neco
         self.aKalkulace.forEach(element => {
            neco = 'ref_'+element.kalkulaceid + self.ID
            if (document.getElementById(neco)){
              document.getElementById(neco).style.color="green"
              f.changeClass(document.getElementById(neco),"elevation-12",'elevation-0')
              //f.addClass("elevation-0",'elevation-12')
            }
         })

         if (setkalkId > 0) {

              //alert('b'+self.ID)
               neco = 'ref_'+setkalkId+self.ID
               setTimeout(function(){
               if (document.getElementById(neco)) {
                      //alert('c'+self.ID)
                 document.getElementById(neco).style.color='red'
                 f.changeClass(document.getElementById(neco),"elevation-0",'elevation-12')
                }
           },100)
         }

  },
   dropCol(kalkulaceid, sloupecid) {
     const self = this
     var ref = self.$refs[sloupecid]
  //this.items.$remove(item)
     self.aKalkulace.forEach(element => {
       if ( element.kalkulaceid == kalkulaceid ) {
          element.sloupecid.forEach((elS,idx) =>{
            if ( elS == sloupecid) {
              element.sloupecid.splice(idx,1)
              return

            }
          })
       }

     });
     //alert("drop" )

   },

   setKalk(idK) {
          this.$store.dispatch('setKalk',idK)
          this.$store.dispatch('KalkulaceColThis',0) //Jen nastavi KalkulaceThis


           var neco = 'ref_'+idK+this.ID
           //document.getElementById(neco).click()
           if (document.getElementById(neco)) {
             document.getElementById(neco).click()

           }
           //
           this.defaultStyle(idK)
          //console.log('setKalk',idK)
   },
   setKalk2(idK) {
     if (self.lastIdK==idK) return
     this.lastIdK=idK
     this.$store.dispatch('setKalk2',idK)
   },
   getKalk() {
     return this.$store.getters('getKalk')
   },


   chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
    zmenaType(cSloup=""){

      const self = this
      /// f.Alert('a')
      self.KalkulaceThis = self.$store.state.KalkulaceThis

      var idK = self.KalkulaceThis-1

      var idK = this.k_id()

      self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: cSloup, id:Math.random()})
      self.aKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      self.$store.dispatch('saveKalkCela', {data: self.aKalkulace })

      self.TestRend++


      //self.aKalkulace = []
      //self.$store.dispatch('saveKalkCela', {data: tmpKalk})
      //self.aKalkulace=JSON.parse(JSON.stringify(self.$store.state.Kalkulace))
      //self.chooseRadky2()
      //f.Alert('a')


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
      'KalkulaceThis',
      'user'



    ]),
  },

}

</script>

<style scoped>
button:focus {
    outline: 0px;
    color: red;
}
.plovouci {
  opacity:0.91;
  z-index:10;
  position:absolute;



}

.plovouci:hover {
  opacity:1;
  z-index:1000;

}
.mybutton:hover  {
    outline: 1px;
    color: red;
    padding: 1px;
    border: 1px solid ;
    box-shadow:  -1px 1px #eeeeee
         -2px 2px #eeeeee,
         -3px 3px #eeeeee,
         -4px 4px #eeeeee,
         -5px 5px #eeeeee;
}
.v-list__tile__title {

  font-size:13px;

  padding: 0;
}

.v-list__tile--input .v-select__selection .v-select__selection--comma {
  /*
  font-size:20px !important;
  height: 14px !important;
  */

}
.v-label .theme--light .v-input__slot .v-select__slot .v-label .theme--light .v-select__selections {
  font-size:22px !important;
  height: 14px !important;

}
.v-list__tile {

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    font-weight: 100;
    height: 25px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

}
.v-overflow-btn .v-input__append-inner {
    width: 18px !important;
    height: 18px  !important;
    -ms-flex-item-align: auto;
    align-self: auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0;
    padding: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

div .v-select__slot {
  height: 22px !important;
  background: lightblue;
  padding: 0px 0px 0px 0px ;



}


input {
    width: 100%;
    height: 14px;
    font-size: 12px;

    margin: 0px;
}
.v-overflow-btn .v-select__selections {
    width: 100%;
    height: 12px;
    font-size: 12px;

    margin: 0px;
    padding: 0px;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}



</style>


