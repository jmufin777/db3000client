<template>
  <div style="height:400px" class="obal">
    <!-- Link:
    <router-link :to="{name: 'col', params: {ktery: 1 }}">Moduly</router-link>-->
    <my-layout>

      <div
        slot="hlavninew"
        style="position:fixed;top:4.8em;left:10px;background:#ffffff;text-align:left;width:100%"
        id="hlavninabidka"
        class="HlavniNabidka"
      >
        <div>
          <input type="hidden" id="Zmenad" value="0" class="black black--text" style="width:100px" />
          <work-but-menu
            :ID="ID"
            ref="w1"
            :obrazovka_zak="c1.obrazovka_zak"
            :obrazovka_nab="c1.obrazovka_nab"
          >
            <span slot="tlacitkazakazky"  >
              <CalcVueZ13Buttons :ID="ID"></CalcVueZ13Buttons>
              <!-- <component :is="'CalcVueZ13Buttons'"></component> -->
            </span>
          </work-but-menu>
        </div>

      </div>

      <div
        v-if="c1.obrazovka_zak==1 && c1.MAINMENULAST=='zakazky'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%;max-height:600px"
        id="obalKalkulace"
        class="stred"
      >
        <div  class="leva blue lighten-5" :style="f.pof( c1.Sirka,98)" style="position:relative;">
          <CalcVueFirmySeekBAr></CalcVueFirmySeekBAr>
        </div>
          <CalcVueZakazky :ID="ID"></CalcVueZakazky>

      </div>

      <div
        v-if="c1.obrazovka_zak==2 && c1.MAINMENULAST=='zakazky'  && !f.isEmpty(c1.polozka_zak)"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
        class="stred"
      >
      <CalcVueZakazkyPolozky></CalcVueZakazkyPolozky>
      </div>
      <div
        v-if="c1.obrazovka_nab==1 && c1.MAINMENULAST=='kalkulace'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
      >
        <div v-if="false" style="position:fixed; top:30em;right:8%;opacity:0.5;z-index:99999999;">
          <span style="color:red; font-size:10em;">1N</span>
        </div>
        <div class="leva cyan lighten-5" :style="f.pof( c1.Sirka,98)" style="position:relative;">
          <CalcVueFirmySeekBArN></CalcVueFirmySeekBArN>
        </div>
       <CalcVueNabidky :ID="ID"></CalcVueNabidky>
      </div>
      <div
        v-if="c1.obrazovka_nab==2 && c1.MAINMENULAST=='kalkulace'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
        class="stred"
      >
        <CalcVueNabidkyPolozky></CalcVueNabidkyPolozky>
      </div>
      <div
        v-if=" ((c1.obrazovka_nab==3 && c1.MAINMENULAST=='kalkulace')  || (c1.obrazovka_zak==3 && c1.MAINMENULAST=='zakazky'))"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
      >
        <div class="leva pt-0 pb-2">
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='kalkulace'"
            @click="fceSwitch13N.to1N()"
          >Kniha 1N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='zakazky'"
            @click="fceSwitch13Z.to1Z()"
          >Kniha 1Z</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='kalkulace' && !f.isEmpty(c1.polozka_nab)"
            @click="fceSwitch13N.to2N(c1.polozka_nab)"
          >2N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='zakazky' && !f.isEmpty(c1.polozka_zak)"
            @click="fceSwitch13Z.to2Z(c1.polozka_zak)"
          >2Z</button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="beforeArray()">
            <!-- 1.JARDA //-->
            Obnovit
          </button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="sendAllVLDraw()">
            <!-- 1.JARDA //-->
            Odeslat Vse
          </button>

          <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
        </div>

        <div v-if="false" style="position:fixed; top:30em;right:30%;opacity:0.5">
          <span
            v-if="c1.MAINMENULAST=='zakazky'   && c1.obrazovka_zak == 3"
            style="color:red; font-size:10em"
          >3Z</span>
          <span
            v-if="c1.MAINMENULAST=='kalkulace' && c1.obrazovka_nab == 3"
            style="color:red; font-size:10em"
          >3N</span>
        </div>

        <div v-cloak v-for="idxK in 1" :key="'x'+idxK" slot="kalkulace">
          <!--//CHYBA 1 //-->
          <work
            v-cloak
            slot="kalkulace"
            :typid="1"
            :kalkulkaceid="iKalk.kalkulkaceid"
            :Poradi="0"
            v-for="(iKalk ,iK) in c1.bKalkulace"
            :key="iK"
            class="myska"
          >
            <span v-if="iK==0" slot="tlacitka" style="position:relative;left:4px">
              <!-- nejsou zadne radky - zakladam uplne novou kalkulaci ||  c1.IDEFIXACTIVE==0 -->
              <work-but
                v-cloak
                v-if="c1.aKalkBefore.length==0 || (c1.IDEFIXACTIVE == 0 && c1.bKalkulace.length >0 ) "
                :ID="'AB_'+iK"
                :ID2="ID+999666"
                :ZobrazMenu="true"
                :isOpen="true"
                :key="'AWC_'+iK+''+c1.idRend"
                :IDEFIXACTIVE="c1.IDEFIXACTIVE"
                :IDEFIXACTIVELAST="c1.IDEFIXACTIVELAST"
                :cTable="c1.cTable"
                :MAINMENULAST="c1.MAINMENULAST"
              ></work-but>

              <!-- Aktivni - rozalena radka && e.idefix==c1.IDEFIXACTIVE -->
              <work-but
                v-cloak
                v-for="(aBefore1,iBefore1 ) in c1.aKalkBefore.filter(e=>{return e.active==true   })"
                :ID="'AC_'+aBefore1.idefix"
                :ID2="ID+999666"
                :IDEFIX="+aBefore1.idefix"
                :IDEFIXACTIVE="c1.IDEFIXACTIVE"
                :IDEFIXACTIVELAST="c1.IDEFIXACTIVELAST"
                :MAINMENULAST="c1.MAINMENULAST"
                :dataDB="aBefore1"
                :ZobrazMenu="true"
                :isOpen="true"
                :key="'AWD_'+iBefore1+''+c1.idRend+''+900000"
                :cTable="c1.cTable"
              ></work-but>
              <!-- NAD {{c1.IDEFIXACTIVE}} {{ c1.NAZEVACTIVE }} -->
            </span>

            <span v-else style="position:relative;left:30px" slot="tlacitka">
              <!-- <work-but-plus  :ID="iK" :ID2="ID+999666"></work-but-plus> -->
              <work-but-plus
                v-cloak
                :ID="iK"
                :ID2="ID+999666"
                :IDEFIX="c1.IDEFIXACTIVE"
                :IDEFIXACTIVE="c1.IDEFIXACTIVE"
              ></work-but-plus>
            </span>
            <span slot="leva" :key="'L'+ c1.TestRend" style="position:relative;left:30px">
              <work-left
                v-cloak
                v-for="(aBefore1,iBefore1 ) in c1.aKalkBefore.filter(e=>{return e.active==true  })"
                :key="'WORKLEFT_'+iBefore1"
                :typid="1"
                :ID2="ID"
                :kalkulaceid="iKalk.kalkulaceid"
                :IDEFIX="c1.IDEFIXACTIVE"
                :MENU="c1.MAINMENULAST"
                :IDEFIX_ZAK="c1.aktivni_zak"
                :IDEFIX_NAB="c1.aktivni_nab"
                :ITEM1="aBefore1"
                :CISLO="c1.MAINMENULAST=='zakazky'?c1.aktivni_zak_short:c1.aktivni_nab_short"
                :ROK="c1.MAINMENULAST=='zakazky'?c1.aktivni_zak_rok:c1.aktivni_nab_rok"
              >
              <span slot="akce">
                <span style='display:none'>
                JARDA {{'AWC_'+iK+''+c1.idRend}}
                </span>
              </span>
                <button
                  slot="akce"
                  type="button"
                  style="height:16px"
                  class="white px-0 cell pr-1 pl-1"
                  :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  @click="removeKalk(iKalk.kalkulaceid)"
                  :disabled="aBefore1.status==1"
                >
                  <a :name="iKalk.kalkulaceid"></a>
                  <i
                    class="el-icon-delete white"
                    size="mini"
                    :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  ></i>
                </button>
                <button
                  slot="add"
                  type="button"
                  style="height:16px"
                  class="white px-0 cell pr-1 pl-1"
                  :class="{'blue lighten-4 elevation-0': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  @click="copyKalk(iK)"
                  :disabled="aBefore1.status==1"
                >
                  <a :name="iKalk.kalkulaceid"></a>
                  <i
                    class="el-icon-plus white"
                    size="mini"
                    :class="{'blue lighten-4': $store.state.KalkulaceThis == iKalk.kalkulaceid }"
                  ></i>
                </button>
              </work-left>
            </span>
            <!--CHYBA 2 //-->
            <div
              v-cloak
              v-for="(iSloupec,i) in iKalk.sloupecid"
              :key="i"
              :slot="'sloupec'+(i+1)"
              :ref="iSloupec"
              :style="'backgroundcolor:blue;display:block;position:relative;left:30px'"
            >
              <!-- {{iKalk.sloupecid}} -->
              <work-col
                v-cloak
                :typid="1"
                :kalkulaceid="iKalk.kalkulaceid"
                :sloupecid="iSloupec.id"
                v-if=" (c1.zobrazit==true || true)"
                :key="c1.TestRend"
                :ITEM1="c1.ITEM1"
                style="z-index:889977"
              >
                <button
                  v-cloak
                  slot="akce"
                  type="button"
                  style="width:30%;height:16px"
                  class="white px-0 cell"
                  @click="removeKalkCol(iKalk.kalkulaceid, iSloupec)"
                >
                  <i class="el-icon-delete" size="mini"></i>
                </button>
              </work-col>
            </div>
            <div slot="mezera" class="red">&nbsp;</div>
          </work>
        </div>
        <!-- Vsechny zabalene radky CHYBA 2 //-->
        <div
          v-cloak
          v-for="(aBefore,iBefore ) in c1.aKalkBefore.filter(e=>{return e.active==false && (e.idefix<c1.IDEFIXACTIVE || c1.IDEFIXACTIVE==0) })"
          :key="iBefore"
          slot="kalkulace"
          style="position:relative;width:100%;top:0em;overflow:scroll"
          id="obalKalkulace2b"
        >
          <!-- Zabalena radka //-->
          <work-but
            :ID="'A_'+aBefore.idefix"
            :dataDB="aBefore"
            :ID2="ID+iBefore"
            :IDEFIX="+aBefore.idefix"
            :IDEFIXACTIVELAST="c1.IDEFIXACTIVELAST"
            :MAINMENULAST="c1.MAINMENULAST"
            :key="'AWB_'+iBefore+''+c1.idRend"
            style="position:relative;left:4px"
            :cTable="c1.cTable"
          ></work-but>

          <!-- / {{aBefore.idefix }} -->
        </div>
        <!--CHYBA 3 //-->
        <div
          v-for="(aBefore2,iBefore2 ) in c1.aKalkBefore.filter(e=>{return e.active==false && (e.idefix>c1.IDEFIXACTIVE && c1.IDEFIXACTIVE>0 )})"
          :key="iBefore2+15000"
          slot="kalkulace"
          style="position:relative;width:100%;top:0em;overflow:scroll"
          id="obalKalkulace3b"
        >
          <work-but
            :ID="'A_'+aBefore2.idefix"
            style="position:relative;left:4px"
            :dataDB="aBefore2"
            :ID2="ID+iBefore2"
            :IDEFIX="+aBefore2.idefix"
            :IDEFIXACTIVE="c1.IDEFIXACTIVE"
            :IDEFIXACTIVELAST="13629473"
            :key="'AWE_'+iBefore2+''+c1.idRend"
            :cTable="c1.cTable"
            :MAINMENULAST="c1.MAINMENULAST"
          ></work-but>
          <!-- POD {{c1.IDEFIXACTIVE}} / {{aBefore2.idefix }} -->
        </div>
        <div style="z-indeX:999999;background:black">

        </div>
      </div>
      <!--MAPA Menu//-->
      <mapa-menu
      v-if="true || (c1.obrazovka_nab==3 && c1.MAINMENULAST=='kalkulace')|| (c1.MAINMENULAST=='zakazky' && c1.obrazovka_zak==3)"
      slot="Plovouci2"
      :ID="ID"
      >
      </mapa-menu>
       <span slot="prehled" v-if="true"  >
         <CalcPrehledSlot></CalcPrehledSlot>
       </span>

      <!-- <div style="position:absolute;top:20%;right:5%;z-index:99999;overflow:scroll;height:500px;border:solid 2px black" class="grey lighten-5" slot="obsah" v-if="c1.zobrazitPanel" >  -->

      <div slot="PlovouciOdkazy" v-if="c1.bKalkulace.length>0 && false" > <!-- Funkcni odkazy //-->
      <CalcOdkazy :ID="ID"></CalcOdkazy>
      </div>
    </my-layout>


    <transition name="list1122">
      <dia-frame
        v-show=" c1.nahled && c1.odkaz>''"
        :show="c1.nahled"
        @mouseleave="c1.nahled=false"
        :odkaz="c1.odkaz"
        title
        style="z-index:1000000000;left:350px"
        eventName="VLshow"
        :id="'vlview'+ID"
      >
        <div slot="nahled"></div>
      </dia-frame>
    </transition>
    <!-- VL //-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getters } from 'vuex';
import { mutations } from 'vuex';
import { eventBus } from '@/main.js';
import { setTimeout, clearInterval } from 'timers';
import MyLayout from './CalcMyLayout.vue';
//import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue';

import Work from './CalcWork.vue'; // Pracovni cast nahore, obshahuje levou cast a sloupce
import WorkLeft from './CalcWorkLeft.vue'; // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue'; // Prehledova dole
import WorkBut from './CalcWorkButton.vue'; // Prehledova dole
import WorkButPlus from './CalcWorkButtonPlus.vue'; // Prehledova dole
import WorkButMenu from './CalcWorkButtonMenu.vue'; // Prehledova dole

import ListStroj from '../../services/ListStrojService';
import f from '@/services/fce';
// import query from '../../services/query'
import Q from '../../services/query';
import queryKalk from '../../services/fcesqlKalkulace';
import prepocty from '../../services/fceKalkulacePrepocty';
import SQL from '../../services/fcesql';
import fceVL from '../../services/fceVL';
// VL
import VL from './VLIndex.vue';

//10411

import Prehled from './CalcPrehled.vue'; // Prehledova dole
import { stringify } from 'querystring';

import _ from 'lodash';
import { forEach } from 'p-iteration';

// import url from '@/services/url';

import MapaMenu from './CalcMapaMenu'  //Tlacitka pro zobrazebi mapy
import CalcPrehledSlot from './CalcPrehledSlot' // Puvodni rozhrani prehedu pod kalkulaci, nejpsis nebudepotreba, otestuji zde vymenu promene c1.bKalkulace
import CalcOdkazy from './CalcOdkazy'

//NOve 202002 - pokus o prevod a sdileni hlavnich promennych do samostatneho modulu  pro moduly Kalkulaci
//import Central from './CalcCentral.vue'; // Prehledova dole
//import Central from './CalcCentral.js'; // Prehledova dole
import c1 from './CalcCentral.js'; // Prehledova dole
import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam
import fceSave from './CalcFceSave.js'; // Funkce seznam
import fceNova from './CalcFceNova.js'; // Funkce seznam


//Nove moduly Vue

import CalcVueZ13Buttons from './CalcVueZ13Buttons.vue'; // Funkce seznam
import CalcVueFirmySeekBAr from './CalcVueFirmySeekBAr.vue'; // Funkce seznam
import CalcVueFirmySeekBArN from './CalcVueFirmySeekBArN.vue'; // Funkce seznam
import fceSwitch13Z from './CalcFceSwitch13Z.js'; // Funkce seznam
import fceSwitch13N from './CalcFceSwitch13N.js'; // Funkce seznam
import CalcVueZakazky  from './CalcVueZakazky.vue'; // Seznam zakazek
import CalcVueNabidky  from './CalcVueNabidky.vue'; // Seznam zakazek

import CalcVueZakazkyPolozky  from './CalcVueZakazkyPolozky.vue'; // Polozky zakazek 2Z
import CalcVueNabidkyPolozky  from './CalcVueNabidkyPolozky.vue'; // Polozky zakazek 2Z



import fceFillForm from './CalcFceFillForm.js'; // Funkce seznam
import fceCiselniky from './CalcFceCiselniky.js'; // Funkce pro polozky
import fceVL2  from './VLFce.js'; // Funkce pro polozky



// import JQuery from 'jquery'
// let $ = JQuery

export default {
  components: {
    //'c1': Central,
    'c1': c1,
    'prehled': Prehled,
    'menu-left': MenuLeft,
    'my-layout': MyLayout,
    'work': Work,
    'work-left': WorkLeft,
    'work-col': WorkCol,
    'work-but': WorkBut,
    'work-but-plus': WorkButPlus,
    'work-but-menu': WorkButMenu,
    'vl': VL,
     'mapa-menu': MapaMenu,
     'CalcPrehledSlot':CalcPrehledSlot,
     'CalcOdkazy': CalcOdkazy,
     'CalcVueZ13Buttons': CalcVueZ13Buttons,
     'CalcVueFirmySeekBAr': CalcVueFirmySeekBAr,
     'CalcVueFirmySeekBArN': CalcVueFirmySeekBArN,
     'CalcVueZakazky':CalcVueZakazky,
     'CalcVueNabidky':CalcVueNabidky,
     'CalcVueZakazkyPolozky':CalcVueZakazkyPolozky,  //Polozky 2Z
     'CalcVueNabidkyPolozky':CalcVueNabidkyPolozky,  //Polozky 2Z



    // 'menu-hlavni': MenuHlavni,
  },
  data() {
    return {
      //c1: Central,
      c1: c1,
      fceSeznam: fceSeznam,
      fceSave: fceSave,
      fceNova: fceNova,
      fceSwitch13Z: fceSwitch13Z,
      fceSwitch13N: fceSwitch13N,
      fceFillForm: fceFillForm ,
      fceCiselniky: fceCiselniky,
      fceVL: fceVL,


      $: $,
      f: f,
      x: _,
      w1: WorkButMenu,

      aKalkulace: [],  //Pokus odtraneni - pokud pujde vymazat
      aKalkBefore: [],   //Prevedeno lec neodstarnuji zatim
      aKalkAfter: [],  //Prevedeno lec neodstarnuji zatim

      ID: 0,
      aktivni_zak: 0,
      cTable: '',





      //naklad: 0 // CHYBA
    };
  },
  watch: {
    cTable: async function() {  //Je tu, uvidime jak na ni mrsku
      const self = this;
      self.c1.aKalkBefore = [];
      if (self.c1.cTable.match(/zak/)) {
        await Q.create_tmp_zak(self.idefix, self.c1.cTable, 0);
      }
      //f.Alert(self.c1.IDEFIXACTIVE)
      //fceSave.setIdefixActive()
      f.log("2 getTemplatesUser");
      queryKalk.getTemplatesUser(self.c1.cTable).then(res => {
        self.c1.aKalkBefore = res;
        self.$store.dispatch("cleanKalk");
        //self.$store.dispatch('saveKalkCela', {data: res })
        self.c1.bKalkulace = [];
        // self.KalkulaceThis = -1
        this.$store.dispatch("setKalk", -1);

        self.$store.dispatch("cleanKalk");
        self.c1.bKalkulace = [];
        fceSave.setZabalit();

        self.c1.KalkulaceLast = -1;

        if (self.c1.Zacatek > 0) {
          if (self.c1.IDEFIXACTIVE > 0) {
            if (self.c1.MAINMENULAST == "zakazky") {
              self.c1.IDEFIXACTIVE_NAB = self.c1.IDEFIXACTIVE;
              //f.Alert('Pamatuju KAL')
              //self.c1.IDEFIXACTIVE_ZAK =
              //self.c1.IDEFIXACTIVE
            }
            if (self.c1.MAINMENULAST == "kalkulace") {
              self.c1.IDEFIXACTIVE_ZAK = self.c1.IDEFIXACTIVE;
              //f.Alert('Pamatuju ZAK')
              //self.c1.IDEFIXACTIVE_ZAK =
              //self.c1.IDEFIXACTIVE
            }
          }
          if (self.c1.MAINMENULAST == "kalkulace" && self.c1.IDEFIXACTIVE_NAB > 0) {
            self.c1.IDEFIXACTIVE = self.c1.IDEFIXACTIVE_NAB;
            fceSave.setRozbalit(self.c1.IDEFIXACTIVE).then(() => {
              f.sleep(1500).then(() => {
                fceSave.setIdefixActive();
                //f.Alert('Rozbalim Za')
              });
            });
          }
          if (self.c1.MAINMENULAST == "zakazky" && self.c1.IDEFIXACTIVE_ZAK > 0) {
            self.c1.IDEFIXACTIVE = self.c1.IDEFIXACTIVE_ZAK;
            fceSave.setRozbalit(self.c1.IDEFIXACTIVE).then(() => {
              f.sleep(1500).then(() => {
                fceSave.setIdefixActive();
                //f.Alert('Rozbalim Za')
              });
            });
          }
        } else {
          self.c1.Zacatek++;
        }
        //f.Alert('Zmena',self.c1.cTable, f.Jstr(self.c1.aKalkBefore) )
      });
    },


   aKalkBefore: function(a) {
      const self = this;
      //return
      if (self.c1.aKalkBefore.length < 1) {
        return;
      }

      self.c1.ITEM1 = [];
      var neco = self.c1.aKalkBefore.filter(e => {
        return e.active == true;
      });
      if (neco.length > 0) {
        self.c1.ITEM1 = neco[0];
      }
      //f.Alert2(self.c1.ITEM1)
    },
    aktivni_zak: async function() {
      //c1.vllist = await this.IDEFIXS_VL(this.c1.aktivni_zak);
      c1.vllist = await fceVL2.IDEFIXS_VL(this.c1.aktivni_zak);
      f.log("ZMENA ZAK", this.c1.aktivni_zak, this.c1.vllist);
    },

    /*
    obrazovka_zak: async function() {
      this.c1.vllist = await this.IDEFIXS_VL(this.c1.aktivni_zak);
      //f.log('ZMENA ZAK' , this.c1.aktivni_zak, this.c1.vllist)
    }
    */
  },

  async created() {
    const self = this;
    //self.c1.cTable = 'calc_my_' + self.idefix
    // setInterval(function () {
    //   self.c1.idRend = self.c1.idRend+1

    //   //console.log(self.c1.idRend)
    //  },2000) ;

     setInterval(function(){
       if (self.aktivni_zak !=self.c1.aktivni_zak) {
         self.aktivni_zak =self.c1.aktivni_zak
         console.log('Zmena zak' , self.aktivni_zak)
       }
       if (self.cTable !=self.c1.cTable) {
         self.cTable =self.c1.cTable
         console.log('Zmena cTab' , self.cTable)
       }

     },500)
    c1.MenuStroj()  //PLni v c1 promenne s odpovidajicimi skupinami stroju pro work-left moduly
    eventBus.$off("MenuHlavni");
    eventBus.$off("MenuLeft");
    eventBus.$off("SAVETEMPLATE");
    //Uklada zaznam cele radky vcetne kalkulace
    eventBus.$off("SAVEZAZNAM");
    //Smaze vzor templatu kalkulace z databaze
    eventBus.$off("DELETETEMPLATE");
    eventBus.$off("AnswerID2");
    eventBus.$off("seekzaknab");
    eventBus.$off("ULOZ");
    //alert('Tvorim')
    eventBus.$on("kalkulaceDelete", serverDel => {
    eventBus.$off("MatCol");
    eventBus.$off('Rend');
    eventBus.$off("IDEFIX_VL");
    eventBus.$off("IDEFIX_VLIST");

    eventBus.$off("VLshowOpen");
    eventBus.$off("VLshowClose");

      console.log(serverDel);
    });
    eventBus.$on("ULOZ", server => {
      //f.Alert('Prisel se ul')
      fceSave.Ulozit();
    });
    eventBus.$on("IDEFIX_VL", server => {
      self.c1.IDEFIX_VL = server.IDEFIX_VL;
      //self.dialogVL=true
      let route = this.$router.resolve({
        name: "vl",
        params: { id: self.c1.IDEFIX_VL }
      });
      //let route = this.$router.resolve({ name: 'vl' , params: { id: self.c1.vllist } })
      // let route = this.$router.resolve('/link/to/page'); // This also works.
      window.open(route.href, "vl_" + self.c1.IDEFIX_VL, "width=1000,height=500");
      //self.Q(self.idefix,"")
      //self.VL_LIST =
    });
    eventBus.$on("IDEFIX_VLIST", server => {
      //self.c1.IDEFIX_VL= server.IDEFIX_VL
      //self.c1.IDEFIX_VL= server.IDEFIX_VL
      //self.dialogVL=true
      //let route = this.$router.resolve({ name: 'vl' , params: { id: self.c1.IDEFIX_VL } })
      alert('a')
      alert(self.c1.vllist)
      alert('b')
      let route = this.$router.resolve({
        name: "vl",
        params: { id: self.c1.vllist }
      });
      // let route = this.$router.resolve('/link/to/page'); // This also works.
      window.open(
        route.href,
        "vl_" + self.c1.aktivni_zak,
        "width=1000,height=500"
      );
      //self.Q(self.idefix,"")
      //self.VL_LIST =
    });
    eventBus.$on("seekzaknab", server => {
      self.seekzaknab(server.key, server.value);
      //f.Alert('seekzaknab', f.Jstr(server))
    });

    //eventBus.$off()
    eventBus.$on("AnswerID2", server => {
      self.c1.ID2ASK = server.id2;
      //f.Alert('Answer Index 1:' , self.c1.ID2ASK , ' / Active : ', self.c1.IDEFIXACTIVE )
    });
    eventBus.$on('saveKalkCela', server=> {
      f.log('saveKalkCela','prekresluji' )
      // self.c1.bKalkulace=[]
      // self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.c1.TestRend++;
    });
    eventBus.$on("MatCol", server => {
      console.log("Pridam jej Mt");
      setTimeout(function() {
        self.addColMat(server);
      }, 1000);
      //self.addColMat(server)
    });
    eventBus.$on('Rend', server => {
      self.c1.bKalkulace=[]
      self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.c1.TestRend++;
      f.log('Rend',self.c1.TestRend)
      //self.addColMat(server)
    });
    await eventBus.$on("SAVETEMPLATE", server => {
      if (server.data.nazev == "") {
        f.Alert2("Nazev je nutne vyplnit", self.user);
      } else {
        //f.Alert2('Co tu delas ?', "TEMPLATE!!!" ,server.data.idefix)
        queryKalk.setKalk(server.data, self.c1.bKalkulace);
      }
      //f.Alert(JSON.stringify(server))
    }),
      await eventBus.$on("SAVEZAZNAM", server => {
        //f.Alert2('Co tu delas ?', "DATABAZE!! " )
        f.log("EMIT 1 ", "SAVEZAZNAM");

        if (server.data.nazev == "") {
          f.Alert2("Nazev je nutne vyplnit", self.user);
        } else {
          //f.Alert2('Delka kalkulace', self.c1.bKalkulace.length)

          //queryKalk.setVkladUser(server.data,self.c1.bKalkulace,server.idefix, self.c1.cTable)
          var SaveKalkulkace = true;
          if (self.c1.bKalkulace.length < 1) {
            SaveKalkulkace = false;
          }
          if (server.idefix != self.c1.IDEFIXACTIVE) {
            //        f.Alert(server.idefix , self.c1.IDEFIXACTIVE , " - kalkulace ne"  )
            SaveKalkulkace = false;
            f.log("EMIT 2 ", "SAVEZAZNAM");
            fceSave.saveZaznam(server, 1); // prepis radky
            //queryKalk.VkladUser(server.data, self.c1.bKalkulace, self.c1.cTable, "", false, server.idefix, SaveKalkulkace )
          } else if (server.idefix == self.c1.IDEFIXACTIVE && server.idefix > 0) {
            //f.Alert(server.idefix , self.c1.IDEFIXACTIVE , " - kalkulace Ano ZDE"  )
            f.log("EMIT 3 ", "SAVEZAZNAM");
            fceSave.saveZaznam(server, 2); //prepis radky a kalkulace
            SaveKalkulkace = true;
            //queryKalk.VkladUser(server.data, self.c1.bKalkulace, self.c1.cTable, "", false, server.idefix, SaveKalkulkace )
          } else if (server.idefix == 0 && self.c1.IDEFIXACTIVE == 0) {
            //f.Alert(server.idefix , self.c1.IDEFIXACTIVE , " - kalkulace Ano , VKLAD ANO KOD 3"  )
            f.log("EMIT 4 ", "SAVEZAZNAM");
            fceSave.saveZaznam(server, 3); //vklad radky i kalkulace
            SaveKalkulkace = true;
            //queryKalk.VkladUser(server.data, self.c1.bKalkulace, self.c1.cTable, "", true, server.idefix, SaveKalkulkace )
          }
        }
        //f.Alert(JSON.stringify(server))
      }),
      eventBus.$on("DELETETEMPLATE", server => {
        //f.Alert("SERVER ", JSON.stringify(server), " IDEFIX: ", server.idefix )
        //return
        if (server.idefix == "") {
          f.Alert2("Chyba pri pokusu o smazani", self.user);
        } else {
          // f.Alert('Template bude ulozen pod nazvem  ', server.data.nazev)
          // JSON.stringify(self.c1.bKalkulace)
          queryKalk.deleteTemplate(server.idefix);
        }
        return;
        //f.Alert(JSON.stringify(server))
      }),
      eventBus.$on("MenuHlavni", server => {
        self.c1.Hlavni = server.key;
        if (server.key == 1999) {
          //Polozky hlavniho menu
          if (self.c1.MAINMENULAST == server.item) {
            // f.Alert('Porad jsem ', server.item)
          } else {
            // f.Alert('hlavni - zmena ', server.item)
            self.c1.MAINMENULAST = server.item;

            if (self.c1.MAINMENULAST == "kalkulace") {
              self.c1.cTable = "calc_my_" + self.idefix + "_nab" + self.ID;
              //alert('a'+self.ID)
              fceSeznam.Seznam("nab");
              fceFillForm.FillFormWait(self.c1.polozka_nab);
            } else if (self.c1.MAINMENULAST == "zakazky") {
              self.c1.cTable = "calc_my_" + self.idefix + "_zak" + self.ID;
              fceSeznam.Seznam("zak");
              fceFillForm.FillFormWait(self.c1.polozka_zak);
            }

            $("#Zmenad").get(0).value = 0;
            self.$store.dispatch("cleanKalk");
            self.c1.bKalkulace = [];
            fceSave.setZabalit();
          }
          return;
        }
        if (server.key == 666) {
          //Guma
          // alert(server.key)
          $("#Zmenad").get(0).value = 0;
          self.$store.dispatch("cleanKalk");
          self.c1.bKalkulace = [];

          //self.c1.bKalkulace =  JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))

          this.$store.dispatch("setKalk", -1);
          //alert(self.KalkulaceThis)
          //self.KalkulaceThis = -1
          self.c1.KalkulaceLast = -1;
          self.c1.IDEFIXACTIVE = 0;

          //f.Alert2(self.idefix)
          f.log("SMAZANI TMP 1");
          var q = `
         select drop_tmp(${self.idefix});
         drop table if exists ${self.c1.cTable} ;drop sequence if exists ${self.c1.cTable}_seq
         ;create sequence ${self.c1.cTable}_seq
         ;create table ${self.c1.cTable} without oids as select * from calc_templates limit 0
         ;alter table ${self.c1.cTable} add poradi serial
         ;alter table ${self.c1.cTable} add active bool default false
         ;alter table ${self.c1.cTable} add idefix_src bigint default 0
         ;alter table ${self.c1.cTable} alter idefix  set default nextval('list2_seq')
         ;alter table ${self.c1.cTable} alter id set default nextval('${self.c1.cTable}_seq')
         `
            .then(res => {
              // f.Alert2('Vytvorena nova databaze pro tvorbu VL', JSON.stringify(res))
              f.sleep(20) //vetez kdyby nahodou neco bylo potreba sem prdnout jeste
                //f.Alert('OK 2')
                //f.Alert2('aaa')
                .then(res => {
                  self.c1.aKalkBefore = [];
                  self.c1.aKalkAfter = [];
                  //  f.Alert2('Hotovo')
                  this.$notify({
                    title: self.c1.MAINMENULAST,
                    message: `Kalkulace vycistena`,
                    type: "warning",
                    offset: 100,
                    duration: 5000
                  });
                });
            })
            .catch(e => {
              f.Alert2("Doslo k chybal pri komunikaci s databazi", q, e);
            });

          setTimeout(function() {
            eventBus.$emit("enable");
          }, 1000);
        }
        if (server.key == 667) {
          //Aplikuj novy template
          self.$store.dispatch("cleanKalk");
          self.$store.dispatch("saveKalkCela", { data: server.Kalkulace });
          self.c1.bKalkulace = server.Kalkulace;

          // self.KalkulaceThis = -1
          this.$store.dispatch("setKalk", -1);
          fceSave.Ulozit()
            .then(()=>{
              //alert(c1.IDEFIXACTIVE)
              //fceSave.setRozbalit(c1.IDEFIXACTIVE)
            })
            return;
          self.c1.KalkulaceLast = -1;

          //alert(677)

          setTimeout(function() {
            self.c1.TestRend = self.c1.TestRend + 1;
            eventBus.$emit("enable");
            if (!f.isEmpty(server.id2)) {
              $("#seek" + server.id2).focus();
              //f.Alert2('mam ID2', server.id2)
              setTimeout(function() {
                var press = jQuery.Event("keypress");
                press.ctrlKey = false;
                press.which = 9;
                press.keyCode = 9;
                ///... any other event properties ...
                $("#seek" + server.id2).trigger(press);
              }, 200);
            }
          }, 200);
        }

        if (server.key == 668) {
          //Aplikuj novy template
          self.$store.dispatch("saveKalkCela", { data: server.Kalkulace2 });
          self.RozdelKalkulaci(server);
        }
        if (server.key == 669) {
          //Aplikuj novy template
          //f.Alert2("DELETE", server.idefix)
          try {
            self.delVL(server.idefix);
          } catch (e) {
            f.Alert("delErr");
          }

          //self.RozdelKalkulaci(server)
        }
        if (server.key == 670) {
          //Aplikuj novy template

          f.Alert2("670 START", server.idefix);

          fceSave.saveVL(server.idefix)
          .then(()=>{
            f.Alert2("670 END", server.idefix);

          })
          ;
          //self.RozdelKalkulaci(server)
        }
        if (server.key == 671) {
          //Zabaloit polozku
          try {
            f.log('671 START','fceSave.setVL(server.idefix)')
            fceSave.setVL(server.idefix) //Automaticky pozna zda jde o zabaleni ci rozbaleni podle stavu active
            .then(()=>{
                f.log('671 EOF','fceSave.setVL(server.idefix)')
            })
          } catch (e) {
            f.Alert2("HAVARIE");
          }
          //self.RozdelKalkulaci(server)
        }
        if (server.key == 672) {
          //Aplikuj novy template
          //f.Alert2("DELETE", server.idefix)
          try {
            self.copyVL(server.idefix);
          } catch (e) {
            f.Alert2("HAVARIE");
          }

          //self.RozdelKalkulaci(server)
        }

        //Ukladani - rozdelena = 668

        if (server.key == 555) {
          //Guma sloupce 1
          self.c1.zobrazit = false;
          self.c1.TestRend++;

          self.$store.dispatch("removeCol", {
            kalkulaceid: server.kalkulaceid,
            idxCol: server.idxCol
          });

          self.c1.bKalkulace = JSON.parse(
            JSON.stringify(self.$store.state.Kalkulace)
          );
          setTimeout(function() {
            self.c1.zobrazit = true;
            eventBus.$emit("enable");
          }, 100);
        }

        eventBus.$emit("WorkLeft", { key: self.nRet });

        if (server.key == 777) {
          //self.c1.bKalkulace=[]
          self.c1.showPrehled = 1;
          //alert("aaa")
          setTimeout(function() {
            eventBus.$emit("enable");
          }, 1000);
        }

        if (server.key < 11) {
          var beforeK = self.c1.KalkulaceLast;
          if (server.key == 9) {
            if (f.isZmena()) {
              alert("Ulozte neulozena data - zabaleni,rozbaleni");
              return;
            }
            self.novaSada();
            //Zabalit
          } else {
            self.addKalk(server.key);
          }

          if (server.key == 3) {
            setTimeout(function() {
              self.addKalkCol("DTP");
            }, 500);
          }
          if (server.key == 5) {
            setTimeout(function() {
              self.addKalkCol("Baleni");
            }, 500);
          }
          if (server.key == 4) {
            //setKalk(iK.kalkulaceid)

            setTimeout(function() {
              // f.Alert(self.c1.bKalkulace.length)
              self.addKalkCol("Externi");
            }, 500);
          }
          //self.addKalkCol()

          var n = 0;

          // setTimeout(function(){

          //   alert(self.c1.KalkulaceLast)
          // },5000)
        }
        if (server.key == 11) {
          self.addKalkCol();
          setTimeout(function() {
            eventBus.$emit("enable");
          }, 1000);
        }
      });

    eventBus.$on("MenuLeft", server => {
      self.c1.Left = server.key;
      self.c1.ColCount++;
      //self.addCol(server.key)
    });
    eventBus.$on("VLshowOpen", server => {
      //self.nahled=true;
      self.nahledView();
    });
    eventBus.$on("VLshowClose", server => {
      //alert('close')
      self.c1.nahled = false;
      //self.nahledCancel();
    });

    eventBus.$on("STATUS", server => {
      self.c1.aKalkBefore = [];
      f.log("3 getTemplatesUser");
      queryKalk.getTemplatesUser(self.c1.cTable).then(res => {
        self.c1.aKalkBefore = res;
        self.c1.ITEM1 = res.filter(e => {
          return e.active == true;
        });
        f.log("STATUS PRIJEM");
        setTimeout(function() {
          self.beforeArray();
        }, 500);
      });

      //self.addCol(server.key)
    });
  },
  async mounted() {
    // alert('Tvorim 22')
    //   f.Info(queryKalk)

  //  return

    const self = this;
    this.ID = Math.round(Math.random() * 19834581377);
    this.c1.bKalkulace = this.$store.state.Kalkulace;
    //f.log('2XXXXX')

    //Cteni last logu ze zakazekpodle usera
    var neco = await Q.get_zak_last(self.idefix);
    var obrazovkatmp = 0;
    if (!f.isEmpty(neco.data.data.idefix_zak)) {
      self.c1.aktivni_zak = neco.data.data.idefix_zak;

      if (neco.data.data.obrazovka > 0) {
        obrazovkatmp = neco.data.data.obrazovka; //Uplatneni obrazovkatmp nize
        //Jeste pridam polozku,lec pozdeji
      }
    }

    /* Last log pro nabidky ,dodelatpozdeji podle vzoru zakazek
  var neco2 = await Q.get_nab_last(self.idefix)
  var obrazovkatmp2=0
//  f.log('2 NAB ',f.Jstr(neco.data.data))
  if (!f.isEmpty(neco2.data.data.idefix_zak)) {
    self.c1.aktivni_nab=neco2.data.data.idefix_nab
    if (neco2.data.data.obrazovka>0){
      obrazovkatmp2=neco2.data.data.obrazovka //Uplatneni obrazovkatmp nize
      //Jeste pridam polozku,lec pozdeji

    }
  }

*/

    await self.Skupiny();

    if (self.c1.MAINMENULAST == "zakazky") {
      self.c1.cTable = "calc_my_" + self.idefix + "_zak" + self.ID;
      if (self.c1.aktivni_zak > 0) {
        //vytvorim platnou calc tabulku
        //alert(1)
        f.log("CREATETEMP", self.idefix, self.c1.cTable, self.c1.aktivni_zak);
        console.log(
          "CREATETEMPCREATETEMPCREATETEMPCREATETEMPCREATETEMPCREATETEMPCREATETEMP"
        );
        console.log(
          "CREATETEMP :: ",
          self.idefix,
          self.c1.cTable,
          self.c1.aktivni_zak
        );
        await Q.create_tmp_zak(self.idefix, self.c1.cTable, self.c1.aktivni_zak);
        //alert(2)
      } else {
        //vytvorim prazdnou calc tabulku
        await Q.create_tmp_zak(self.idefix, self.c1.cTable, 0);
      }
    }
    if (self.c1.MAINMENULAST == "kalkulace") {
      self.c1.cTable = "calc_my_" + self.idefix + "_nab" + self.ID;
    }

    // f.Alert('tab  ', self.c1.cTable, self.c1.MAINMENULAST)
    // f.Alert(self.c1.MAINMENULAST, self.c1.cTable)
    f.log("1 getTemplatesUser");
    self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

    //   self.c1.aKalkBefore = []

    self.c1.Sirka = Math.ceil(window.innerWidth * 0.9);
    await fceSave.setIdefixActive();
    // setInterval(function(){

    //     console.log('a', self.idefix, self.c1.MAINMENULAST, self.c1.aktivni_zak,self.c1.aktivni_nab,self.$refs.w1.form.cislo)
    //   },1000)
    //$("*").removeAttr('autocomplete');
    setInterval(function() {
      self.IsZmena();
      self.c1.Sirka = Math.ceil(window.innerWidth * 0.9);
      //    $(document).ready(function() {
      //$("input:text").focus(function() { $(this).select(); } )
      $("input[type=text]").on("focus", function() {
        var neco2 = this;

        $(neco2).select();
      });
      $("input[type=number]").on("focus", function() {
        var neco2 = this;

        $(neco2).select();
      });
      $("input[type=text]").removeAttr("autocomplete");
      $("input[type=text]").attr("autocomplete", "randomString");

      //this.setSelectionRange(0, 9999);


      //});
    }, 1000);
    var xd = new Date();
    self.c1.search_nab_rok = xd.getFullYear();
    self.c1.search_zak_rok = xd.getFullYear();
    /* funguje je potreba domlyslet
   $(document).on('keydown',`#tab_${self.ID} > tbody tr .num`,function (e) {
    if (e.which === 40) {
      $(this).parents("tr").next("tr").find('.num').focus();
    }
     });
*/

//Po startu se nacte c1.seznam zakazek

    await fceCiselniky.Vlastnik();
    await fceCiselniky.VlastnikPrace();
    await fceSeznam.Seznam("zak");
    await fceCiselniky.CisPraceDod();
    await fceCiselniky.CisDod(0);
    await fceCiselniky.CisDodAll(0);
    var aAkt = [];
    if (self.c1.seznam_zak.length > 0) {
      if (self.c1.aktivni_zak > 0) {
        aAkt = self.c1.seznam_zak.filter(el => {
          return el.idefix * 1 == self.c1.aktivni_zak * 1;
        });
        if (aAkt.length > 0) {
          self.c1.aktivni_zak = aAkt[0].idefix;
          await fceFillForm.FillFormWait(aAkt[0]);
          if (obrazovkatmp == 2) {
            //await f.Alert2(self.c1.polozka_zak.length, ' : ',self.c1.aktivni_zak)
            fceSwitch13Z.to2Z(self.c1.polozka_zak);
          }
          if (obrazovkatmp == 3) {
            //alert('polozka zak')
            fceSwitch13Z.to3Z(self.c1.polozka_zak);
          }
          //self.c1.obrazovka_zak=2
        } else {
          self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
          fceFillForm.FillFormWait(self.c1.seznam_zak[0]);
        }
        //  self.c1.aktivni_zak=self.c1.seznam_zak[0].idefix
      } else {
        self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
        fceFillForm.FillFormWait(self.c1.seznam_zak[0]);
      }
    }
    //f.Alert2(f.Jstr(self.c1.aktivni_zak))

    //self.c1.aktivni_zak=polozka.idefix
    /*
  f.Alert2(f.Jstr(self.x.filter(self.c1.cis_prace, function(o) {
    return o.prace=='Doprava';
  } )))
  */
    //f.Alert(f.Jstr(self.c1.cis_prace))

    //f.Alert(qDod)

    self.c1.Sirka = Math.ceil(window.innerWidth * 0.9);
    //f.Alert("1",  self.c1.cTable)

    //$(document).on('click', function(e){
    $(document).ready(function() {
      $(document).ready(function() {
        var x;
        var y;
        $(document).mousemove(function(e) {
          x = e.pageX;
          y = e.pageY;
        });
        $("#vlview" + self.ID).mouseover(function() {
          if ($(this).is(":animated")) {
            $(this)
              .stop()
              .animate({ opacity: "100" });
            self.c1.nahled = true;
          }
        });
        /*
        var $dlg=$("#plovoucimapa11").dialog({
            autoOpen: true,
            show: "blind",
            hide: "explode",
        });
      */

        $(".myska").bind("mouseenter", function() {
          return;

          var idObal = "obalKalkulace";
          var idVztah = "hlavninabidka";

          var vztah = document.getElementById(idVztah);
          //$("#hlavninabidka").hide()
          var poz = $("#hlavninabidka").offset();
          var top = Math.ceil(poz.top); //konec hlavninabidky
          var thistop = this.offsetTop;
          var h = $("#hlavninabidka").height();
          var posun = $("#" + idObal).scrollTop();

          //+ top
          if (posun > 0) {
            //   f.Alert2(top+ "  /  "+ h + " / " + (thistop + poz ) , posun )
          }

          //$("#hlavninabidka").css("border","solid 20px blue")
          $("#plovoucimapa11").css("top", thistop + "px");

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

        $(".myska").bind("mouseleave", function() {
          //$dlg.dialog('close'); // open
        });
      });
    });
    //self.c1.MAINMENULAST='kalkulace'
    //f.Alert(self.c1.MAINMENULAST, self.c1.cTable)

    //$("#plovoucimapa").css('top', e.pageY);
    //$("#plovoucimapa").css('left', e.pageX);
    //});

    return;
    if (this.c1.bKalkulace.length > 0 && this.c1.bKalkulace[0].kalkulaceid > -1) {
      this.$store.dispatch("setKalk", this.c1.bKalkulace[0].kalkulaceid);
      this.KalkulaceThis = this.$store.getters.getKalk;
      this.c1.KalkulaceLast = this.$store.getters.getKalkLast;

      //alert(this.KalkulaceThis )
    } else {
      //alert(2)
    }
  },
  beforeEnter: (to, from, next) => {
    //  this.$destroy()
  },
  methods: {
    po() {
      return "";
    },
    vl_view(_idefix_vl) {
      eventBus.$emit("IDEFIX_VL", { IDEFIX_VL: _idefix_vl });
    },
    vl_viewlist(_idefix_vl) {
      eventBus.$emit("IDEFIX_VLIST", { IDEFIX_VL: _idefix_vl });
    },
    async IDEFIXS_VL(czak) {
      const self = this;
      var seznam = await Q.vl_list(self.idefix, {
        idefix_zak: self.c1.aktivni_zak
      });

      return new Promise(resolve => {
        // f.Jstr(c1.seznam),
        f.log(
          "huhu ",
          self.c1.aktivni_zak,
          " SEZNAM ",
          f.Jstr(c1.seznam.data.vllist) + " --END"
        );
        resolve(c1.seznam.data.vllist);
      });
      //
      //f.Alert2('huhu ',self.c1.IDEFIXACTIVE_ZAK)
    },
    nahledCancel() {
      const self = this;

      if (this.c1.nahledTimeOut) {
        this.c1.nahledTimeOut = false;

        if ($("#vlview" + self.ID).is(":animated")) {
          $("#vlview" + self.ID)
            .stop()
            .animate({ opacity: "100" });
          // $("#vlview"+self.ID).stop(true,true).fadeIn();
          //alert('stopka 1')
          self.c1.nahled = true;
        }
        self.c1.nahled = true;

        return;
      }
      this.c1.nahledTimeOut = setTimeout(function() {
        $("#vlview" + self.ID).fadeOut(500, function() {
          self.c1.nahled = false;
        });
      }, 1000);
    },

    nahledView() {
      const self = this;
      $("#vlview" + self.ID).fadeIn(500, function() {
        self.c1.nahled = true;
      });
    },

    async sendAllVLDraw() {
      const self = this;
      let neco = await this.sendAllVL();
      if (neco >= 1) {
        setTimeout(function() {
          self.beforeArray();
        }, 500);
      }
    },
    async sendAllVL(ifx = 0, sendStatus = true) {
      const self = this;
      let dataTemp = {};
      let dataItem = {};
      var q = "";
      let res = [];
      let res1 = [];
      let res2 = [];
      let nRet = 0;

      if (self.c1.MAINMENULAST == "kalkulace") {
        f.mAlert(
          "V rezimu nabidek nelze zadavat praci na vyrobu, je nutne vytvorit zakazku"
        );
        return;
      }

      //f.Alert('Jeste uplnene, ale bude to v poho co nejryhleji to pujde', self.idefix)
      f.log("VL ALL 0");
      //var q=`select * from ${self.c1.cTable} where idefix = ${self.form.idefix}`
      var q = `select * from ${self.c1.cTable} where status is null or status=0 or status = 2`;
      res = await Q.all(self.idefix, q);
      f.log("VL ALL 1", q, f.Jstr(res));
      //return

      if (!f.isEmpty(res.data.data)) {
        //f.Alert('Odeslilam do vyroby vse','Uz to jede ....' )
        //f.log('VL ALL 1B', q, f.Jstr(res.data.data))
        let necores = res.data.data;
        nRet = necores.length;
        if (await self.otazka(`Odeslat ${nRet} zbyvajicich VL ?`)) {
          await f
            .asyncForEach(necores, async (dataTemp, idx) => {
              f.log("VL ALL - temp ", f.Jstr(dataTemp));
              // alert('a')
              f.log("VL ALL 1C", q, dataTemp.idefix_src);
              //dataTemp = res.data.data[0]
              if (dataTemp.idefix_src >= 0 && dataTemp.idefix_zak > 0) {
                f.log("VL ALL 1D", q, dataTemp.idefix_src);
                //Tohle prohodit - napred uspesne vlozit a pak teprv oznacit c1.status = 1 jako ze  existuje VL
                let q2 = `update zak_t_items set status = 1  where idefix = ${dataTemp.idefix_src}  and idefix_zak = ${dataTemp.idefix_zak} ;
                     update ${self.c1.cTable} set status = 1  where idefix = ${dataTemp.idefix_src}  and idefix_zak = ${dataTemp.idefix_zak};
                     update zak_t_vl_v set datumodeslani=now(),idefix_odeslal=${self.idefix},user_update_idefix=${self.idefix} where idefix_item=${dataTemp.idefix_src} ;
                   `;
                f.log("VL ALL 2 A", q2);
                res2 = await Q.post(self.idefix, q2);
                f.log("VL ALL 2 B", q2);

                await fceVL.Vklad(dataTemp.idefix_src, "", self.c1.cTable);
                f.log("VL ALL 3");
                await Q.post(
                  self.idefix,
                  `select vl_set(idefix_zak(${dataTemp.idefix_src}),-1)`
                ); //uklid
                //f.log('VL ALL 4')
              }
            })
            .then(() => {
              //Uklid presunut az po vsech
              //Q.post(self.idefix,`select vl_set(idefix_zak(${dataTemp.idefix_src}),-1)`)  //uklid
              Q.post(
                self.idefix,
                `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
              ); //uklid
              f.log(
                "VL ALL 4A ",
                `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
              );
            })
            .catch(e => {
              f.log(
                "VL ALL 4 ERR ",
                `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
              );
            });
        } else {
          nRet = -1;
        }
        //f.Alert(dataTemp.idefix_src)
      } else {
        f.Alert2("Zadne zaznamy k odeslani");
        nRet = -1;
      }
      return new Promise(resolve => {
        resolve(nRet);
      });
      //f.Alert2(f.Jstr(res), q)
    },

    async seekzaknab(key, value) {
      const self = this;
      const server = { key: key, value: value };
      if (server.key == "zak") {
        self.c1.search_zak_cislo2 = server.value;
        // self.c1.search_zak_rok=''
        self.$nextTick(function() {
          self.c1.desc_zak = "desc";
          fceSeznam.Seznam("zak", "", "cislozakazky desc", true).then(() => {
            if (self.c1.seznam_zak.length > 0) {
              self.$refs.w1.form.cislo = self.c1.seznam_zak[0].cislozakazky;
              self.$refs.w1.pocet_nal_zak = self.c1.seznam_zak.length;
              fceFillForm.FillFormWait(self.c1.seznam_zak[0]);
              var ifx = self.c1.seznam_zak[0].idefix;
              self.c1.aktivni_zak = ifx;
              self.c1.polozky_zak = [];
              Q.all(
                self.idefix,
                `select *,0 as vse,idefix_vl(idefix) as idefix_vl from ${server.key}_t_items where idefix_${server.key}= ${ifx} order by idefix`
              ).then(res => {
                //f.Alert2(f.Jstr(res.data.data))
                self.c1.polozky_zak = res.data.data;

                fceNova.addPol("zak", ifx);
                fceNova.polozky_soucet("zak");
              });
            } else {
              self.$refs.w1.pocet_nal_zak = 0;
            }
          });
        });
      } else if (server.key == "nab") {
        self.c1.search_nab_cislo2 = server.value;
        //self.c1.search_nab_rok=''
        self.$nextTick(function() {
          self.c1.desc_nab = "desc";
          fceSeznam.Seznam("nab", "", "cislonabidky desc", true).then(() => {
            if (self.c1.seznam_nab.length > 0) {
              self.$refs.w1.form.cislo = self.c1.seznam_nab[0].cislonabidky;
              self.$refs.w1.pocet_nal_nab = self.c1.seznam_nab.length;
              fceFillForm.FillFormWait(self.c1.seznam_nab[0]);
              var ifx = self.c1.seznam_nab[0].idefix;
              self.c1.aktivni_nab = ifx;
              self.c1.polozky_nab = [];

              Q.all(
                self.idefix,
                `select *,0 as vse,idefix_vl(idefix) as idefix_vl from ${server.key}_t_items where idefix_${server.key}= ${ifx} order by idefix`
              ).then(res => {
                //f.Alert2(f.Jstr(res.data.data))
                self.c1.polozky_nab = res.data.data;
                fceNova.addPol("nab", ifx);
                fceNova.polozky_soucet("nab");
              });
            } else {
              self.$refs.w1.pocet_nal_nab = 0;
            }
          });
        });
      }
    },
    async Skupiny() {
      const self = this;
      self.c1._Skupiny = await SQL.isObchod();
      self.c1._IsObchod = self.c1._Skupiny.match(/obchod/i) ? true : false;
      self.c1._IsVedeni = self.c1._Skupiny.match(/vedeni/i) ? true : false;
    },
    async beforeArray(neco = null) {
      const self = this;

      // self.c1.aKalkBefore = [];

      f.log("4 getTemplatesUser");

      if (f.isEmpty(neco)) {
        self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

        f.log("A BEFORE Z DB");
      } else {
        f.log("A BEFORE Z LOCAL");
        self.c1.aKalkBefore = neco;
      }
    },















    async DocasneReseni() {
      const self = this;
      //9015
      var qqTemp = `update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null  where idefix in ( 67272,67273 ) ;
    update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null  where idefix in ( 67156, 67157 ) ;
    update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67157 ) ;
    update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67272,67273 ) ;
    update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null,idefix_dod  = ${self.c1.idefix_vlastnik},idefix_prace=${self.c1.idefix_vlastnikPrace}  where idefix in (  67156 ) ;
    update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null,idefix_dod  =  ${self.c1.idefix_vlastnik},idefix_prace=${self.c1.idefix_vlastnikPrace}   where idefix in ( 67272 ) ;
    update zak_t_items set expedice_datum= now(), expedice_cas=now(), datum = now() where expedice_datum is null ;
    update nab_t_items set expedice_datum= now(), expedice_cas=now(), datum = now() where expedice_datum is null ;
    `;

      var b = await Q.post(self.idefix, qqTemp);
    },



    IsZmena() {
      if (!document.getElementById("Zmenad")) {
        return;
      }

      $("input[type=text]").off("change");
      $("input[type=text]").change(function() {
        //$(this).css("{background:white}")
        //this.style.color="yellow"
        // this.className="d3"
        //this.style.
        this.style.fontSize = "120%";

        //$(this).hide(1000)
        $("#Zmenad").get(0).value++;
      });

      $("input[type=checkbox]").off("change");
      $("input[type=checkbox]").change(function() {
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++;
      });
      $("input[type=radio]").off("change");
      $("input[type=radio]").change(function() {
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++;
      });

      $("input[type=number]").off("change");
      $("input[type=number]").change(function() {
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++;
      });
      $("textarea").off("change");
      $("textarea").change(function() {
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++;
      });
      $("select").off("change");
      $("select").change(function() {
        //this.style.color="yellow"
        $("#Zmenad").get(0).value++;
      });
    },

    async RozdelKalkulaci(server) {
      const self = this;
      var dataRadka = {};
      // f.Alert(server.id2)
      dataRadka = f.dataRadkaID(server.id2);
      server.data["expedice_datum"] = dataRadka.expedice_datum;
      server.data["expedice_cas"] = dataRadka.expedice_cas;
      //f.Alert('data2', self.c1.IDEFIXACTIVE)
      //f.Alert('Radka SEND: ', f.Jstr(dataRadka), 'CAS: ', f.Jstr(dataRadka.expedice_cas))

      await queryKalk.VkladUser(
        dataRadka,
        server.Kalkulace1,
        self.c1.cTable,
        dataRadka.nazev,
        false,
        self.c1.IDEFIXACTIVE
      );
      await queryKalk.VkladUser(
        server.data,
        server.Kalkulace2,
        self.c1.cTable,
        "Nová řádka",
        true,
        0
      );

      //self.c1.aKalkBefore=[]
      f.log("6 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);
      fceSave.setIdefixActive();
      setTimeout(function() {
        self.c1.idRend++;
      }, 500);
      //f.Alert2("BEF", f.Jstr(self.c1.aKalkBefore))

      // setTimeout(function(){
      //   self.c1.idRend++
      // },500)
      //f.Alert(server.id2, $("#seek"+server.id2).val())
    },

    async delVL(idefix) {
      const self = this;
      try {
        if (idefix > 0) {
          await queryKalk.delete(idefix, self.c1.cTable);
          //    alert('Vymazano 1')
        }

        if (idefix == self.c1.IDEFIXACTIVE) {
          try {
            self.c1.bKalkulace = [];
            self.$store.dispatch("cleanKalk");
          } catch (e) {
            f.Alert("err 33");
          }
        }
        //      alert('Vymazano 2')
        await fceSave.setRender();
        //    alert('Vyazano')
        return;
      } catch (e) {
        f.Alert("Dell Er", e);
        return;
      }
    },
    async copyVL(idefix) {
      const self = this;
      await queryKalk.CopyUser(idefix, self.c1.cTable);

      self.c1.aKalkBefore = []; // 1.JARDA
      f.log("8 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);
      await fceSave.setZabalit();
      return;
      setTimeout(function() {
        self.c1.idRend++;
        self.c1.TestRend++;
      }, 500);
    },

    async addVL() {
      const self = this;
      //await eventBus.$emit('AskID2',{idefix:0})
      alert(" addVL() 10");

      setTimeout(function() {
        //var dataRadka=f.dataRadka(self.c1.ID2ASK)
        var dataRadka = f.dataRadka(0);
        //        f.Alert('Answer Index 2B:' ,  ' / Active : ', self.c1.IDEFIXACTIVE, f.Jstr(dataRadka) )
        //      return
        f.log("EMIT 5 ", "SAVEZAZNAM");
        self
          .saveZaznam({ idefix: self.c1.IDEFIXACTIVE, data: dataRadka }, 3)
          .then(res => {
            //f.Alert('Vlozeno')
          });
        //      f.Alert('Answer Index 2B:' , self.c1.ID2ASK , ' / Active : ', self.c1.IDEFIXACTIVE, f.Jstr(dataRadka) )
      }, 50);

      //dataRadka=f.dataRadka(server.id2)
      // f.Alert('jsem add')
    },

    async novaSada() {
      const self = this;
      var idefixActive = self.c1.IDEFIXACTIVE;
      var objFiluta;

      if (idefixActive > 0) {
        self.c1.aKalkBefore = []; // 1.JARDA
        await fceSave.setRozbalit(idefixActive);
        await fceSave.setZabalit();
        await self.addKalk(1);
        await fceSave.setRender();
        await f.sleep(500);
        objFiluta = f.getElByIdefix("seek", 0);
        if (objFiluta) {
          objFiluta.focus();
        }

        return;
      }

      if (idefixActive == 0 && self.c1.bKalkulace.length > 0) {
         f.Alert('Nova sada = kdyz uz je jedna otevrena')
        var neco11 = new Promise((resolve, reject) => {
          var dataRadka = f.dataRadka(0);
          resolve(dataRadka);
        });
        neco11.then(resolve => {
          //f.Alert('Otevrena nova kalkulace - vlozim', f.Jstr(resolve))
          //f.sleep(1000)
          if (f.isEmpty(resolve.nazev)) {
            f.Alert("Nazev neni vyplnen, oznacuji ");
            objFiluta = f.getElByIdefix("seek", 0);
            objFiluta.focus();
            return;
          } else {
            f.log("EMIT 6 ", "SAVEZAZNAM");
            fceSave.saveZaznam({ idefix: 0, data: resolve }, 3).then(() => {
              self
                .setRender()
                .then(() => {
                  self.c1.aKalkBefore = []; // 1.JARDA
                  fceSave.setZabalit();
                })
                .then(() => {
                  self.addKalk(1);
                });
            });
          }
        });
        // self.addVL()
        //  return
      }
      if (idefixActive == 0 && self.c1.bKalkulace.length == 0) {
        await self.addKalk(1);
        await f.sleep(500);
        //alert('mam')
        objFiluta = f.getElByIdefix("seek", 0);
        if (objFiluta) {
          objFiluta.focus();
        }
      }
    },




    getVal(obj, klic) {
      var cRet = "";

      if (obj) {
        if (obj[klic]) {
          return obj[klic];
        }
      }
      return "neni " + klic;
    },



    copyKalk(iK) {
      const self = this;
      $(".obal").animate({ opacity: 0.7 }, 200);
      self.$store.dispatch("copyKalk", {
        kalkulaceid: iK
      });
      setTimeout(function() {
        self.c1.bKalkulace = JSON.parse(
          JSON.stringify(self.$store.state.Kalkulace)
        );

        setTimeout(function() {
          self.c1.TestRend++;
          $(".obal").animate({ opacity: 1 }, 200);
          eventBus.$emit('NaplnKalkulaci') //Synchronizace s mapou, mapa si sama resi zda je viditelna
        }, 300);
      }, 100);

      return;
    },

    async chooseSloupce(event, bEvent) {
      //alert("sloupy")
      const self = this;
      return;
    },
    async chooseRadky2() {
      const self = this;
      var tmpKalk = JSON.parse(JSON.stringify(self.c1.bKalkulace));
      tmpKalk.forEach((el, idx) => {
        tmpKalk[idx].kalkulaceid = idx + 1;
        // el.kalkulaceid =idx +1
      });
      //f.Alert2(tmpKalk[idx].kalkulaceid)
      self.$store.dispatch("saveKalkCela", { data: tmpKalk });
      self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.c1.TestRend++;
    },
    async pripravRadky2() {
      const self = this;
      self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.c1.drag = true;
      return;
    },

    async strojmod(type) {
      const self = this;
      var atmp = [];
      var found = true;
      var id_query = -0;
      //     return
      //f.Alert2(type) ;
      if (type == 1) {
        id_query = 10411;
      } //Velkoploch
      if (type == 2) {
        id_query = 10410;
      } //Archovy
      if (type == 3) {
        id_query = 10412;
      } //Nova Jina
      if (type == 4) {
        id_query = 10411;
      } //Nova Externi - zatim jako V , nemam zadani
      if (type == 5) {
        id_query = 10411;
      } //Nova Externi - zatim jako V , nemam zadani
      if (type == 500) {
        id_query = 500;
      } // Seznam formatu
      if (type == 501) {
        id_query = 501;
      } // Seznam formatu

      if (type < 500) {
        try {
          atmp = [];
          //   atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_strojmod_full
          //  alert(atmp[0].stroj+ ' '+ id_query )
          return atmp;
          //console.log(JSON.stringify(atmp))
        } catch (e) {
          alert("Error 1");
          eventBus.$emit("enable");
          console.log(JSON.stringify(e.response.data.error));
          alert(JSON.stringify(e.response.data.error));
          //console.log( e)
        }
      }

      if (type == 500) {
        try {
          atmp = [];
          //      atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_format
          //  alert(atmp[0].stroj+ ' '+ id_query )
          console.log(atmp);
          return atmp;
          //console.log(JSON.stringify(atmp))
        } catch (e) {
          alert("Error 2");
          eventBus.$emit("enable");
          console.log(e);
        }
      }
      if (type == 501) {
        try {
          atmp = [];
          atmp = (await ListStroj.one(this.user, -1, id_query)).data
            .enum_matspec;
          //  alert(atmp[0].stroj+ ' '+ id_query )
          console.log(atmp);
          return atmp;
          //console.log(JSON.stringify(atmp))
        } catch (e) {
          alert("Error 3");
          eventBus.$emit("enable");
          console.log(e);
        }
      }
      return 0;
    },

    async addKalk(KalkType) {
      const self = this;
      var newId = 1;
      var tmpData = [];
      var KalkulaceLast = self.c1.KalkulaceLast;
      let oData = {};
      var nTmp = -1;
      if (self.c1.bKalkulace.length > 0) {
        self.c1.bKalkulace.forEach(el => {
          if (el.kalkulaceid >= newId) {
            newId = el.kalkulaceid + 1;
          }
        });
      }
      //return ;

      try {
        tmpData = await self.strojmod(KalkType); //MOdy pro V nebo A

        oData.Menu2 = tmpData;
        oData.Menu1 = [];
        oData.Menu1Value = "";
        oData.idefixVidet = 0;
        //       alert(tmpData.length)
        tmpData.forEach((el, idx) => {
          nTmp = _.findIndex(oData.Menu1, function(o) {
            return o.text + " " + o.nazev == el.stroj + " " + el.nazev;
          });
          if (nTmp == -1) oData.Menu1.push({ text: el.stroj + " " + el.nazev });
          if (idx == 0) {
            // oData.Menu1Value = el.stroj + ' '+ el.nazev
            oData.Menu1Value = el.idefix_mod;
          }
        });

        try {
          //tmpData = (await (self.strojmod(500)))   //MOdy pro V nebo A

          //oData.Format      =  tmpData
          oData.Format = [];
          oData.FormatMenu1 = [];
          oData.FormatValue = "";
          oData.Format.Sirka = 0;
          oData.FormatVyska = 0;
          oData.FormatTisk = 0; //Jednostranny,oboustranny, oboustranny ruzny
          oData.FormatPanelovat = 0;
          oData.Format.SirkaPanel = 0;
          oData.FormatNakladKs = 0;
          (oData.stroj = []),
            (oData.strojmod = []),
            (oData.strojceny = []),
            (oData.ResultM2 = 0.0);
          oData.ResultHod = "";
          oData.Priloha1Idefix = 0;
          oData.Priloha2Idefix = 0;
          oData.Priloha3Idefix = 0;
          oData.Priloha4Idefix = 0;
          oData.Priloha5Idefix = 0;
          oData.Priloha1Txt = "";
          oData.Priloha2Txt = "";
          oData.Priloha3Txt = "";
          oData.Priloha4Txt = "";
          oData.Priloha5Txt = "";

          self.c1.KalkulaceLast = self.$store.getters.getKalkLast;
          setTimeout(function() {
            if (self.c1.KalkulaceLast != KalkulaceLast) {
              eventBus.$emit("enable");
              self.$store.dispatch("setKalk", self.c1.KalkulaceLast);
              //self.KalkulaceThis = self.c1.KalkulaceLast
              // self.defaultStyle(self.KalkulaceThis)
              self.setKalk(self.KalkulaceThis);
              var neco = "ref_" + self.KalkulaceThis + self.ID;
            }
          }, 150);
        } catch (e) {
          console.log(e);
        }

        try {
          //tmpData = (await (self.strojmod(501)))   //MOdy pro V nebo A

          //oData.Mat      =  tmpData
          //f.Alert('addKalkTYPE: ', KalkType, '  ',f.Jstr(tmpData) );
          oData.Mat = [];
          oData.MatMenu1 = [];
          oData.MatValue = "";

          self.$store.dispatch("addKalk", {
            kalkulaceid: newId,
            data: oData,
            type: KalkType,
            sloupecid: []
          });
          //f.Alert(f.Jstr(oData));

          self.c1.bKalkulace = JSON.parse(
            JSON.stringify(self.$store.state.Kalkulace)
          );

          self.setKalk(newId);
          //self.KalkulaceThis = newId
          self.c1.KalkulaceLast = self.$store.getters.getKalkLast;
          setTimeout(function() {
            if (self.c1.KalkulaceLast != KalkulaceLast) {
              eventBus.$emit("enable");

            }
            eventBus.$emit('NaplnKalkulaci') //Synchronizace s mapou, mapa si sama resi zda je viditelna
          }, 500);
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }

        console.log("tmpData ", tmpData);
      //self.c1.bKalkulace.push({kalkulaceid: newId,sloupecid:[]})
    },

    removeKalk(kalkulaceid) {  //Ok -
      const self = this;
      // alert(kalkulaceid)
      self.$store.dispatch("removeKalk", kalkulaceid);
      self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      if (self.c1.bKalkulace.length > 0) {
        self.setKalk(self.c1.bKalkulace[0].kalkulaceid);
        //self.KalkulaceThis = self.c1.bKalkulace[0].kalkulaceid
      }
      eventBus.$emit('NaplnKalkulaci') //Synchronizace s mapou, mapa si sama resi zda je viditelna
    },
    k_id() {
      var kRet = this.$store.getters.getId(this.KalkulaceThis);
      return kRet;
    },
    addColMat(server) {
      const self = this;
      var idK = self.KalkulaceThis - 1;
      var idK = this.k_id();
      //this.k_id()
      //alert("IDK :" + idK+ ' json :' + JSON.stringify(server))

      idK = server.key;

      //  return
      //--self.setKalk(idK)
      //self.$store.dispatch('addColMat', {kalkulaceid: self.KalkulaceThis, type: 'Mat'})
      //self.$store.dispatch('addColMat',  {kalkulaceid: idK, type: 'Mat1'})
      if (
        !f.isEmpty(self.c1.bKalkulace[idK].sloupecid)
        //&& self.c1.bKalkulace[idK].sloupecid.length > 0
      )
        f.log("ADDCOLMAT", self.c1.bKalkulace[idK]);
      return;

      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: "Mat1",
        id: Math.ceil(Math.random() * 91000879)
      });
      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: "Laminace",
        id: Math.ceil(Math.random() * 92000879)
      });
      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: "Kasir",
        id: Math.ceil(Math.random() * 93000879)
      });
      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: "Rezani",
        id: Math.ceil(Math.random() * 94000879)
      });
      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: "Baleni",
        id: Math.ceil(Math.random() * 95000879)
      });
      //self.$store.dispatch('addColMat2', {kalkulaceid: idK, type: 'Jine-Externi', id:96})
      /////self.addKalkCol("Mat");
      self.c1.bKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      eventBus.$emit('NaplnKalkulaci') //Synchronizace s mapou, mapa si sama resi zda je viditelna
      // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'Format.Sirka' , value: 9999 })
      // alert("Pridma mat na prvni misto")
    },

    addKalkCol(type = "X") {
      const self = this;
      //alert('a - vkladam sloupec')
      self.$store.dispatch("saveKalkCela", { data: self.c1.bKalkulace });

      self.$store.dispatch("addKalkCol", {
        kalkulaceid: self.KalkulaceThis,
        type: type
      });
      setTimeout(function() {
        self.c1.bKalkulace = JSON.parse(
          JSON.stringify(self.$store.state.Kalkulace)
        );
      }, 1500);

      //self.c1.bKalkulace =  self.$store.state.Kalkulace
      self.c1.TestRend++;

      return;
      var newKalkColId = -1;
      self.c1.CalcCount++;
    },
    removeKalkCol(kalkulaceid, sloupecid) {
      console.log("Mazu", JSON.stringify(sloupecid));
      const self = this;
      self.$store.dispatch("removeKalkCol", {
        kalkulaceid: kalkulaceid,
        sloupecid: sloupecid
      });
      //self.KalkulaceThis = kalkulaceid
      self.setKalk(kalkulaceid);
      eventBus.$emit('NaplnKalkulaci') //Synchronizace s mapou, mapa si sama resi zda je viditelna
    },

    dropKalk(kalkulaceid) {
      const self = this;
      f.log('DropKalk')
      self.c1.bKalkulace.forEach((element, idx) => {
        if (element.kalkulaceid == kalkulaceid) {
          self.c1.bKalkulace.splice(idx, 1);
          return;
        }
      });
    },

    defaultStyle(setkalkId) {
      const self = this;
      var neco;
      self.c1.bKalkulace.forEach(element => {
        neco = "ref_" + element.kalkulaceid + self.ID;
        if (document.getElementById(neco)) {
          document.getElementById(neco).style.color = "green";
          f.changeClass(
            document.getElementById(neco),
            "elevation-12",
            "elevation-0"
          );
          //f.addClass("elevation-0",'elevation-12')
        }
      });

      if (setkalkId > 0) {
        //alert('b'+self.ID)
        neco = "ref_" + setkalkId + self.ID;
        setTimeout(function() {
          if (document.getElementById(neco)) {
            //alert('c'+self.ID)
            document.getElementById(neco).style.color = "red";
            f.changeClass(
              document.getElementById(neco),
              "elevation-0",
              "elevation-12"
            );
          }
        }, 100);
      }
    },
    dropCol(kalkulaceid, sloupecid) {
      const self = this;
      var ref = self.$refs[sloupecid];
      //this.items.$remove(item)
      self.c1.bKalkulace.forEach(element => {
        if (element.kalkulaceid == kalkulaceid) {
          element.sloupecid.forEach((elS, idx) => {
            if (elS == sloupecid) {
              element.sloupecid.splice(idx, 1);
              return;
            }
          });
        }
      });
      //alert("drop" )
    },

    setKalk(idK) {
      this.$store.dispatch("setKalk", idK);
      this.$store.dispatch("KalkulaceColThis", 0); //Jen nastavi KalkulaceThis

      var neco = "ref_" + idK + this.ID;
      //document.getElementById(neco).click()
      if (document.getElementById(neco)) {
        document.getElementById(neco).click();
      }
      //
      this.defaultStyle(idK);
      //console.log('setKalk',idK)
    },
    setKalk2(idK) {
      if (self.c1.lastIdK == idK) return;
      this.c1.lastIdK = idK;
      this.$store.dispatch("setKalk2", idK);
    },
    getKalk() {
      return this.$store.getters("getKalk");
    },

    chooseItem: function(event, bEvent) {
      console.log("Choos item: ", event.c1.draggedRect, "B", bEvent);
      // alert(Object.keys(bEvent))
    },

    async otazka(txt1 = "", txt2 = "") {
      const self = this;
      return new Promise((resolve, rej) => {
        self
          .$confirm(txt1, txt2, {
            distinguishCancelAndClose: true,
            confirmButtonText: "Ano?",
            cancelButtonText: "Ne"
          })
          .then(() => {
            resolve(true);
          })
          .catch(e => {
            resolve(false);
          });
      });
    }
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "xMenuMain",
      "level",
      "idefix",
      "compaStore",
      "Kalkulace",
      "KalkulaceThis",
      "user"
    ])
  }
};
</script>

<style scoped>
button:focus {
  outline: 0px;
  color: red;
}
.plovouci {
  opacity: 0.91;
  z-index: 10;
  position: absolute;
}

.plovouci:hover {
  opacity: 1;
  z-index: 1000;
}
.mybutton:hover {
  outline: 1px;
  color: red;
  padding: 1px;
  border: 1px solid;
  box-shadow: -1px 1px #eeeeee -2px 2px #eeeeee, -3px 3px #eeeeee,
    -4px 4px #eeeeee, -5px 5px #eeeeee;
}
.v-list__tile__title {
  font-size: 13px;

  padding: 0;
}

.v-list__tile--input .v-select__selection .v-select__selection--comma {
  /*
  font-size:20px !important;
  height: 14px !important;
  */
  font-size: 100%;
}
.v-label
  .theme--light
  .v-input__slot
  .v-select__slot
  .v-label
  .theme--light
  .v-select__selections {
  font-size: 22px !important;
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
  height: 18px !important;
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
  padding: 0px 0px 0px 0px;
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
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.rborder {
  border-left: solid 1px #cccccc;
}
.black1 {
  background: white;
  font-size: 1px;
  height: 1px;
  border-top: solid #cccccc 1px;
  border-bottom: solid #cccccc 1px;
}
.ramspodni {
  border-top: dotted 1px #7c7c7c;
  border-bottom: dotted 1px #7c7c7c;
}
.nerusit {
  opacity: 0.1;
  background-color: white;
}
table {
  background-color: white;
  border: solid 1px;
}

.list1122-enter,
.list1122-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0.5;
}

.list1122-enter-active,
.list1122-leave-active {
  transition: all 1.3s;
}
</style>

<style>
</style>
