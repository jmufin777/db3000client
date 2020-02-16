<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
  <!-- <v-hover> -->
  <div
    style="position:relative;font-size:100%; min-height:120px;widht:100%;border: solid 1px black"
    class="white lighten-2 pt-0 px-0"
    v-if="$store.state.Kalkulace && $store.state.Kalkulace.length >0 "
    v-on:mouseover="active=true"
    v-bind:class="{'JsemVidet': active, 'JsemVidetMalo': !active }"
    :class="{'blue lighten-2': $store.state.KalkulaceThis== kalkulaceid }"
    v-on:mouseleave="active=false;MenuShowLeave()"
    @click="setKalk(kalkulaceid);setID()"
  >
    <table style="width:100%;height:18em;;border:none">
      <tr>
        <td style="width:20%;height:100%" class="white pr-1 pt-0">
          <v-card
            style="position:relative;top:0px;height:18em;width:100%;border: solid 1px silver"
            :class="{'blue lighten-4': $store.state.KalkulaceThis== kalkulaceid }"
            class="pa-0 pr-1 elevation-0"
          >
            <v-card-text>
              <slot name="add"></slot>
            </v-card-text>
            <v-card-text style="font-size:200%;font-weight:800">{{ k_id() + 1 }}</v-card-text>
            <v-card-text style="font-size:80%;font-weight:800">
              <v-progress-circular v-if="progres" :value="uploadPercentage"></v-progress-circular>
              {{ $store.state.Kalkulace.length}}
              Slozka:
              <br />
              {{ ROK}}/{{ CISLO }}
              <!-- {{IDEFIX}}
            {{MENU}}

              N{{IDEFIX_NAB}}-->
            </v-card-text>
            <v-card-text>
              <slot name="akce">
                <!-- <button type="button" style="width:30%;height:16px" class="white  px-0 " @click="1==1" ><i class="el-icon-delete " style="color:green" size="mini" ></i></button> -->
                <!-- <button type="button" style="width:30%;height:106px" class="white  px-0 " @click="1==1" >X</button> -->
              </slot>
            </v-card-text>
          </v-card>
        </td>
        <td style="width:80;height:100%">
          <p
            style="display:none"
          >{{StrojeMenu.length}} {{ $store.state.Kalkulace[k_id()].type}} {{idefixVidet}} {{$store.state.Kalkulace[k_id()].data.stroj}}</p>
          <p style="display:none">
            {{StrojeMenu}} {{qStroje("V")}} {{initVar}}
            <!-- {{ $store.state.Kalkulace[k_id()].type}} {{idefixVidet}}  {{aStroj}} :: {{form.stroj[0] }} :: {{initVar}} / {{k_id()}} -->
          </p>
          <v-card
            style="position:relative;top:0px;height:18em;width:100%"
            class="white elevation-0"
          >
            <v-card
              style="position:absolute;top:0px;height:3em;text-align:left;width:100%;border: none"
              class="white elevation-0"
              :style="(idefixVidet>0)?'height:3em':'height:'+((aStroj.length)*2.6)+'em'"
            >
              <!-- || idefixVidet == itemStroj.idefix  -->
              <v-card
                v-for="(itemStroj, iStroj) in aStroj"
                :key="iStroj"
                v-if="idefixVidet == 0 || idefixVidet == itemStroj.idefix "
                style="position:relative;text-align:left;z-index:10"
                class="elevation-0"
              >
                <v-card-text
                  class="pa-0 ma-0 pl-0 pr-1"
                  style="position:relative;z-index:1;height:2.6em"
                >
                  <v-card style="position:relative;z-index:1" class="elevation-0">
                    <v-card-text
                      class="pa-0 ma-0 pl-1 pr-1 pb-1 pt-1"
                      style="position:relative;z-index:1;border:none"
                    >
                      <!-- KARTA stroje //-->
                      <table style="width:100%;z-index:1;">
                        <tr>
                          <td
                            style="width:90%;cursor:pointer;"
                            @click="k_id()>0 || ITEM1.status==1?false:SelectStroj(itemStroj.idefix,itemStroj.idefix_mod )"
                          >{{ITEM1.status}}:{{ itemStroj.stroj }} {{ idefixVidet>0?getStrojMod():'' }}</td>
                          <!-- @mouseenter="idefixClick=itemStroj.idefix;MenuShow1(MenuShow, $event ); -->
                          <td
                            style="width:10%;cursor:pointer"
                            @click="
              ITEM1.status==1?false:idefixClick=itemStroj.idefix;
              ITEM1.status==1?false:MenuShow1(MenuShow, $event );
            "
                          >
                            <i
                              aria-hidden="true"
                              class="v-icon mdi mdi-menu-down theme--light"
                              style="cursor:pointer"
                            ></i>
                          </td>
                        </tr>
                      </table>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card>

            <v-card
              v-if="idefixVidet>0"
              :class="{'grey lighten-2': $store.state.KalkulaceThis== kalkulaceid }"
              class="white pa-0 elevation-0"
              style="position:absolute;top:3em;height:15em;z-index:9;width:100%"
            >
              <v-card-text class="pa-0">
                <table style="width:100%" class="pink pa-0">
                  <tr>
                    <td style="width:40%">
                      <!-- @blur="MenuFormatOpust()" -->
                      <v-card
                        @click="ITEM1.status==1?false:MenuFormatShow1(MenuFormatShow, $event )"
                        style="width:100%;position:relative;left:0px;font-size:100%;;height:100%"
                        class="elevation-0"
                      >
                        <v-card-text class="pa-0" style="height:100%">
                          <input
                            type="text"
                            v-model="form.Format"
                            size="mini"
                            style="width:100%; height:25px;"
                            class="tdl tdn elevation-0 pl-1"
                            :placeholder="'Format'+ ' seek'+ID"
                            @focus="fokus('seek'+ID);setID();MenuFormatShow=true"
                            :id="'seek'+ID"
                            @blur="MenuFormatOpust()"
                            @click="MenuFormatShow=true"
                            @keydown="MenuFormatShow=true;seznam('seek'+ID+'_list_'+0,1,$event)"
                            :disabled="ITEM1.status==1"
                          />
                          <!-- FORMATY {{ID}} {{f.getBottom('seek'+ID)}} {{f.getWidth('seek'+ID)}} {{f.getLeft('seek'+ID)}} -->
                          <!-- </div> -->
                        </v-card-text>
                      </v-card>
                    </td>
                    <td style="width:60%" class="pa-0">
                      <v-card
                        style="width:100%;position:relative;left:0px;font-size:100%;height:100%"
                        class="pa-0 elevation-0"
                      >
                        <v-card-text class="pa-0 pt-0" style="height:100%">
                          <input
                            type="number"
                            :disabled="ITEM1.status==1"
                            v-model="form.sirka"
                            style="text-align:right;width:40%;height:90%"
                            class="tdl tdn elevation-0 pr-1 pt-1"
                            placeholder="A"
                            @focus="fokus('sirka'+ID);$event.target.select()"
                            @change="getFormatName()"
                          />
                          x
                          <input
                            type="number"
                            :disabled="ITEM1.status==1"
                            v-model="form.vyska"
                            style="text-align:right;width:40%;height:90%"
                            class="tdl tdn elevation-0 pr-1 pt-1"
                            placeholder="B"
                            @focus="fokus('vyska');$event.target.select()"
                            @change="getFormatName()"
                          />
                        </v-card-text>
                      </v-card>
                    </td>
                  </tr>
                </table>
                <!-- <v-card> -->
                <v-card
                  style="width:100%;position:relative;left:0px;font-size:100%;height:100%"
                  class="pa-0 elevation-0"
                >
                  <!-- <v-card-text> -->
                  <v-card-text class="pa-0 pt-0" style="height:100%">
                    <table style="width:100%;font-size:12px">
                      <tr>
                        <!-- <td style="width:15%">Panelovat</td>
                        <td style="width:10%"><input type="checkbox" value="0" v-model="form.panelovat" :checked="(form.panelovat==1)" style="text-align:right;width:100%" class="tdl tdn elevation-0 pr-0" @change="getFormatName()"></td>-->

                        <td style="width:25%">
                          <label :for="'panelovat'+ID" style="cursor:pointer">
                            <span></span>Panelovat&nbsp;
                          </label>
                          <input
                            type="checkbox"
                            value="0"
                            v-model="form.panelovat"
                            :checked="(form.panelovat==1)"
                            :id="'panelovat'+ID"
                            :disabled="ITEM1.status==1"
                            class="tdl tdn elevation-0 pr-0"
                            @change="getFormatName()"
                          />
                        </td>
                        <td style="width:10%">Po</td>
                        <td style="width:25%">
                          <input
                            type="number"
                            :disabled="ITEM1.status==1"
                            v-model="form.sirkaPanel"
                            style="text-align:right;width:80%;height:80%"
                            class="tdl tdn elevation-0 pr-1"
                            @focus="$event.target.select()"
                            @change="getFormatName();sirkaP()"
                          />
                        </td>
                        <td style="width:15%">Naklad&nbsp;ks</td>
                        <td>
                          <input
                            type="number"
                            :disabled="ITEM1.status==1"
                            v-model="form.nakladks"
                            style="text-align:right;width:80%;height:80%"
                            class="tdl tdn elevation-0 pr-1"
                            @focus="$event.target.select()"
                            @change="ks();getFormatName()"
                          />
                        </td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>

                <v-card
                  style="width:100%;position:relative;left:0px;font-size:100%;height:100%"
                  class="pa-0 pt-1 elevation-0"
                >
                  <v-card-text class="pa-0 pt-0" style="height:100%">
                    <table style="width:100%;">
                      <tr>
                        <td style="width:40%" class="pl-0">
                          <select
                            v-model="form.tisk"
                            @change="getFormatName()"
                            style="text-align:right;width:80%;height:90%;font-size:90%"
                            class="white tdl tdn elevation-0 pr-1 pl-0 pr-2"
                          >
                            <option
                              v-for="(a,b ) in Tisk"
                              :key="a.val"
                              :label="a.txt"
                              :value="a.val"
                            >{{ a.txt }}</option>
                          </select>
                        </td>
                        <td style="width:10%" class="brown lighten-5">m2</td>
                        <td
                          style="width:15%"
                          class="brown lighten-5"
                        >{{l.round($store.state.Kalkulace[k_id()].data.ResultM2,2)}}</td>
                        <td style="width:15%" class="brown lighten-5">Hodiny</td>
                        <td
                          style="width:20%"
                          class="brown lighten-5"
                        >{{$store.state.Kalkulace[k_id()].data.ResultHod}}</td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>

                <v-card
                  style="width:100%;position:relative;left:0px;font-size:100%;height:8.5em"
                  class="pa-0 pt-0 elevation-0"
                >
                  <v-card-text class="pa-0 pt-0" style="height:100%">
                    <table style="width:100%;">
                      <!-- <tr>
              <td style="text-align:left;font-size:10%" colspan="4" class="pl-2" >&nbsp;</td>
                      </tr>-->
                      <tr>
                        <td style="text-align:left;font-size:50%" colspan="4" class="pl-2">&nbsp;</td>
                      </tr>
                      <tr>
                        <td
                          v-for="idx in 1"
                          :key="idx"
                          class="pb-1 pt-0 mt-1 pl-0 silver lighten-4"
                          style="text-align:left;"
                        >
                          <!-- <label :for="'file_' + idx" style="cursor:pointer"><span></span>P{{idx}}&nbsp;</label> -->
                          <!-- <input type="file" :id="'file_' + idx" @change="odesli()" multiple/> -->
                          <!-- <input type="file" :id="'file_' + idx" ref="file" v-on:change="odesli()"/> -->
                          <!-- <div class="container green" > -->
                          <!-- <div class="large-12 medium-12 small-12 cell" > -->
                          <button
                            v-if="form.Priloha1Txt>'' && idx==1"
                            @click="delPriloha(1)"
                            :disabled="ITEM1.status==1"
                          >
                            <i
                              class="el-icon-delete black--text darken-4 d3"
                              style="font-weight:bold;height:25px;zoom:100%;"
                            ></i>
                            {{form.Priloha1Txt}}
                          </button>
                          <br v-if="form.Priloha1Txt>'' &&form.Priloha1Idefix>0" />
                          <img
                            v-if="form.Priloha1Txt>'' &&form.Priloha1Idefix>0  && idx==1"
                            :src="url.url()+'obrazek_small/'+form.Priloha1Idefix"
                            height="70px"
                            @mouseenter="odkaz=url.url()+'obrazek/'+form.Priloha1Idefix;nahled=true"
                            @mouseleave="nahled=false"
                            :title="form.Priloha1Idefix"
                          />
                          <label v-if="form.Priloha1Txt=='' && idx==1">
                            <span
                              style="position:relative;left:30px;top:25px"
                              title="Nahrat soubor do zakazky"
                            >
                              <!-- <i class="el-icon-upload black--text darken-4 d3" style="font-weight:bold;height:25px;zoom:200%;;cursor:pointer"></i> -->
                              <i
                                class="el-icon-upload silver--text lighten-4"
                                style="font-weight:bold;height:25px;zoom:250%;;cursor:pointer"
                              ></i>
                              <input
                                :disabled="ITEM1.status==1"
                                type="file"
                                :id="'file'"
                                ref="file"
                                v-on:change="handleFileUpload($event);setPriloha($event, idx)"
                              />
                            </span>
                          </label>
                          <!-- <button v-on:click="submitFile();form.Priloha1Txt='nazdarek'">Submit</button> -->
                          <!-- </div> -->
                          <!-- </div> -->
                        </td>
                      </tr>
                    </table>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-card>
        </td>
      </tr>
    </table>

    <dia-log2
      v-if="nahled && odkaz>''"
      :show="nahled"
      @mouseleave="nahled=false"
      :odkaz="odkaz"
      title
      style="z-index:1000000000;left:550px"
    >
      <div slot="nahled"></div>
    </dia-log2>
    <!-- <dia-log2 v-if="true" :show="true"  @mouseleave="nahled=false" :odkaz="odkaz" title="">
   <div slot="nahled">

    </div>
    </dia-log2>-->

    <!---nabidka stroj mod //-->
    <!-- :style="'left:'+clickX+'px'" -->
    <!-- :style="'top:'+ getBottom('seek'+ID)+'px;width:'+getWidth('seek'+ID,8)+'px;left:'+getLeft('seek'+ID,0)+'px'" -->
    <v-card
      v-if="MenuShow && clickYN"
      class="white elevation-1"
      style="position:absolute;width:20em;left:20em;top:1em;z-index:1000010;max-height:14em"
      :style="'left:'+clickX+'px'"
      @mouseleave="MenuShowLeave()"
      @mouseover="MenuShowIn()"
    >
      <!-- <v-card v-for="(m1, i1) in $store.state.Kalkulace[k_id()].data.Menu2" :key="i1" v-if="m1.idefix == idefixClick" style="border:none"> -->
      <!-- {{ StrojeMenu }} -->
      <v-card
        v-for="(m1, i1) in StrojeMenu"
        :key="i1"
        v-if="m1.idefix == idefixClick"
        style="border:none"
      >
        <v-card-text
          @click="setMenu1Value(m1.idefix_mod)"
          class="pa-0 pt-1 elevation-0"
          style="border:solid 0px silver"
        >
          <button
            v-if="$store.state.Kalkulace[k_id()].data.Menu1Value == m1.idefix_mod"
            ref="menu1focus"
            :id="'menu1focus'+ID"
            class="leva"
            style="width:90%;"
            v-on:keyup.27="MenuShow1(MenuShow,$event)"
          >
            <b>{{m1.stroj +' ' + m1.nazev }}</b>
          </button>
          <button
            v-else
            style="width:90%"
            class="leva"
            v-on:keyup.27="MenuShow1(MenuShow,$event)"
          >{{m1.stroj +' ' + m1.nazev }}</button>
        </v-card-text>
      </v-card>
    </v-card>

    <!---nabidka stroj mod //-->

    <!--manidka formaty //-->
    <!-- :style="'left:'+(clickX+100)+'px'" -->
    <!-- width:20em;left:20em;top:1em; -->

    <div
      style="position:absolute;z-index:90010;overflow:scroll;max-height:14em"
      :style="'top:'+ f.getBottom('seek'+ID,40)+'px;width:'+f.getWidth('seek'+ID,80)+'px;left:'+f.getLeft('seek'+ID, 88)+'px'"
      v-if="MenuFormatShow"
      class="elevation-2 blue lighten-4 pl-0 pr-0"
    >
      <!-- $store.state.Kalkulace[k_id()].data.Format. -->
      <table width="100%" v-if="MenuFormatShow" class="pa-2">
        <tr
          v-for="(m1b, i1b) in
              $store.state.KalkulaceFormat.filter(
                el => (
                  //el.nazev.toUpperCase().match(FormatSearch.toUpperCase()) || (el.sirka+'').match(FormatSearch) || (el.vyska+'').match(FormatSearch)) || FormatSearch==''
                  ( el.nazev.toUpperCase().match((form.Format+'').toUpperCase())
                  || (el.sirka+'').match(form.Format+'')
                  || (el.vyska+'').match(form.Format+''))
                  || form.Format=='')  && (el.nazev+'') !== (form.Format+'')

                )"
          :key="i1b"
        >
          <td class="pa-0">
            <v-card class="silver pa-0" style="width:95%;">
              <a
                :href="'#'"
                :id="'seek'+ID+'_list_'+i1b"
                @keydown="seznam('seek'+ID+'_list_'+i1b,1,$event)"
                @click="setMenuFormat1Value(m1b.idefix);MenuFormatShow=false"
                @focus="fokus('seek'+ID)"
              >
                <table style="width:100%">
                  <tr>
                    <td style="width:70%">
                      <v-card-text
                        style="font-size:90%;text-align:left;width:100%"
                        @click="setMenuFormat1Value(m1b.idefix)"
                        class="pa-0 pt-1"
                      >{{ m1b['nazev']}}</v-card-text>
                    </td>
                    <td style="width:30%;height:100" class="pa-0">
                      <v-card-text
                        style="font-size:90%;text-align:left;width:100%;height:100%"
                        @click="setMenuFormat1Value(m1b.idefix)"
                        class="pa-0 pt-1"
                      >{{ m1b['sirka']*1}}&nbsp;x&nbsp;{{ m1b['vyska']*1}}</v-card-text>
                    </td>
                  </tr>
                </table>
              </a>
            </v-card>
          </td>
        </tr>
      </table>
    </div>
    <slot name="obsah">
      <!-- Slot Menu Leve -->
    </slot>
  </div>
  <!-- </v-hover> -->
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import { getters } from "vuex";
import { eventBus } from "@/main.js";
import { setTimeout, clearInterval, clearTimeout } from "timers";
import f from "@/services/fce";
//import queryKalk from '../../services/fcesqlKalkulace' //neni potreba
import Q from "@/services/query";
import ListStroj from "../../services/ListStrojService";

import axios from "axios";
import upload0 from "../../services/upload0";
import url from "@/services/url";
import obrazek from "../../services/ObrazekService";
import { resolve } from "url";
import c1 from './CalcCentral.js';

export default {
  props: {
    kalkulaceid: {
      type: Number,
      required: true
    },
    typid: {
      type: Number,
      required: true
    },
    ID2: {
      type: Number,
      required: true
    },
    IDEFIX: {
      //type : String,
      required: false,
      default: "0"
    },
    IDEFIX_ZAK: {
      //type : String,
      required: false,
      default: 0
    },
    IDEFIX_NAB: {
      //type : String,
      required: false,
      default: 0
    },
    MENU: {
      type: String,
      required: false,
      default: ""
    },
    CISLO: {
      //type: String,
      required: false,
      default: ""
    },
    ROK: {
      //type: String,
      required: false,
      default: ""
    },
    ITEM1: {
      //type: Array,
      required: false,
      default: { status: 0 }
    }
  },
  data() {
    return {
      //files:
      nahled: true,
      dialog: false,
      uploadPercentage: 0,
      progres: false,
      odkaz: "",
      url: url,
      //files
      active: false,
      dialogImageUrl: "",
      dialogVisible: false,
      nTimer: false,
      clickX: 0,
      clickY: 0,
      clickYN: false,
      f: f,
      l: _,
      c1: c1,
      timeout: 0, //tOpusteni:0,
      lastFocus: "",

      //files
      MenuLeft: [],
      MenuLeftJoin: [
        { key: 0, text: "Druh tisku" },
        { key: 1, text: "Velkoploch" },
        { key: 2, text: "Archovy" }
      ],

      FormatSearch: "",
      Format: [],

      FormatJoin: [],

      aKalk: {}, //
      MenuShow: false,
      MenuFormatShow: false,
      aStroj: [],
      Tisk: [
        { val: 0, txt: "Jednostranny" },
        { val: 1, txt: "Oboustranny" },
        { val: 2, txt: "Oboustranny ruzny" },
        { val: 3, txt: "Bez tisku" }
      ],

      form: {
        MenuRet: 0,
        sirka: 0,
        vyska: 0,
        tisk: 0,
        sirkaPanel: 0,
        panelovat: 0,

        Format: "",
        nakladks: 0,
        ResultM2: 0,
        ResultHod: "",

        filelist: [],

        stroj: [],
        strojmod: [],
        strojceny: [],

        Priloha1Idefix: 0,
        Priloha1Txt: "",
        Priloha2Idefix: 0,
        Priloha2Txt: "",
        Priloha3Idefix: 0,
        Priloha3Txt: "",
        Priloha4Idefix: 0,
        Priloha4Txt: "",
        Priloha5Idefix: 0,
        Priloha5Txt: ""
      },
      last: {
        sirka: 0,
        vyska: 0
      },

      Kalk: [],

      ID: 0,
      idefixVidet: 0, //Nasypat do vuexu idefixVidet
      idefixClick: 0,
      StrojeMenu: [], // Nacte menu stroju v zavislosti na typu z vuexu
      initVar: 0,

      file: "A",
      infoLocal: "",
      IDEFIX_LAST: 0
    };
  },

  async mounted() {
    const self = this;
    //f.logreset()


    self.k_id();
    self.initVar = self.k_id();
    self.ID = Math.round(Math.random() * 1983458) + self.k_id();
    //var neco=JSON.stringify(self.Kalkulace[self.k_id()])
    var neco  = JSON.stringify(self.$store.state.Kalkulace[self.k_id()]);
    self.Kalk = JSON.parse(neco);
    //f.Alert(self.$store.state.Kalkulace.length)

    //for (var ii = 0; ii < self.$store.state.Kalkulace.length; ii++) {
    for (var ii = self.initVar; ii <=self.initVar; ii++) {
      if (f.isEmpty(self.$store.state.Kalkulace[ii].data.Priloha1Txt)) {
        //console.log('Prazdna aaaa AAAAAAAA', self.$store.state.Kalkulace[ii].data.Priloha1Txt)
        self.$store.dispatch("editKalk", {
          kalkulaceid: ii,
          key: "Priloha1Txt",
          value: ""
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: ii,
          key: "Priloha1Idefix",
          //value: 13629510
          value: 0
        });
      }
    }

    // alert(self.k_id())


    self.MenuStroj();  //Zde jen vyber, natezeno v created CalcIndex stejnou funkcni z c1

    self.readVuexData();

    setInterval(function() {
      self.hideAll();
    }, 500);
    setTimeout(function() {
      if (document.getElementById("seek" + self.ID)) {
        //f.Alert('Jo ',document.getElementById('seek'+self.ID),'seek'+self.ID)
        // document.getElementById('seek'+self.ID).focus()
      } else {
        //f.Alert('Ne ',document.getElementById('seek'+self.ID),'seek'+self.ID)
      }
    }, 500);

    self.$store.dispatch("setFormat");
    return;
  },
  watch: {
    IDEFIX: async function() {
      const self = this;
      self.infoLocal = this.MENU + " " + self.IDEFIX_ZAK;

      console.log(this.MENU);

      //var cislo = await Q.query()

      //f.Alert('Zmena', this.IDEFIX)
    }
  },
  methods: {
    handleFileUpload(evt) {
      self.file = evt.target.files[0]; // FileList object
      //this.file = this.$refs.file.files[0];
    },
    submitFile() {
      return;
    },
    async delPriloha(n) {
      const self = this;
      var idK = self.k_id();
      var z = false;
      var ifx = self.form.Priloha1Idefix;

      if (n == 1) {
        z = await f.Confirm2("Vymazat prilohu  ?", self.form.Priloha1Txt);
        if (z) {
          self.form.Priloha1Txt = "";
          self.form.Priloha1Idefix = 0;

          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "Priloha1Txt",
            value: self.form.Priloha1Txt
          });
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "Priloha1Idefix",
            value: self.form.Priloha1Idefix
          });
          self.smazObrazek(ifx);
        }
      }
    },

    async setPriloha(evt, poradi = -1) {
      const self = this;
      var idK = self.k_id();
      var file = evt.target.files[0]; // FileList object
      var nazev = "";
      //var nazev=file.name

      self.progres = true;
      nazev = file.name;
      var res1 = await upload0.all(self.idefix, nazev, {
        size: file.size,
        zmena: file.lastModifiedDate,
        cislo: self.CISLO,
        rok: self.ROK
      });
      self.nahled = false;
      //f.Alert3(res1)
      if (res1.data.a > 0) {
        //f.Alert3('1 nalezeno na serveru',res1.data.obrazek, res1.data.files)
        self.form.Priloha1Idefix = res1.data.obrazek;
        self.form.Format = res1.data.format;
        self.form.sirka = res1.data.sirka;
        self.form.vyska = res1.data.vyska;
      } else {
        var idefix_obr = await self.poslatnew(file);
        //f.Alert3('2 nahrano  ',idefix_obr.data.obrazek,res1.data, res1.data.files)
        self.form.Priloha1Idefix = idefix_obr.data.obrazek;
        self.form.Format = idefix_obr.data.format;
        self.form.sirka = idefix_obr.data.sirka;
        self.form.vyska = idefix_obr.data.vyska;
      }
      //f.Alert(self.form.Format)
      switch (poradi) {
        case 1:
          self.form.Priloha1Txt = file.name;
          //f.Alert(poradi)
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "Priloha1Txt",
            value: self.form.Priloha1Txt
          });
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "Priloha1Idefix",
            value: self.form.Priloha1Idefix
          });
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "txtFormat",
            value: self.form.Format
          });
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "FormatSirka",
            value: self.form.sirka
          });
          self.$store.dispatch("editKalk", {
            kalkulaceid: idK,
            key: "FormatVyska",
            value: self.form.vyska
          });
          self.progres = false;
      }

      return;
      self.odkaz = url.url() + "obrazek/" + idefix_obr;

      //self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: self.form.sirka })
    },
    async poslatnew(soubor) {
      const self = this;
      let formData = new FormData();
      formData.append("file", soubor);
      formData.append("idefix", self.idefix);
      formData.append("cislo", self.CISLO);
      formData.append("rok", self.ROK);
      console.log(">> formData >> ", formData);
      this.uploadPercentage = 0;
      var res = 0;
      self.progres = true;
      self.odkaz = url.url() + "obrazek/" + 13629494;

      // You should have a server side REST API
      //axios.post('http://78.102.17.162:3003/upload',
      await axios
        .post(`${url.url()}upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function(progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this)
        })
        .then(function(neco) {
          self.progres = false;
          res = neco;
          console.log("SUCCESS!!");
          //f.Alert3("NECO", neco.data)
        })
        .catch(function(err) {
          console.log("FAILURE!!", err);
        });
      return res;
    },
    smazObrazek(obrazek_id) {
      const self = this;
      //Q.all(self.idefix,`delete from prilohy_prijem where idefix=${obrazek_id}`)
      //return;
      obrazek.del(self.idefix, obrazek_id);
    },

    readVuexData() {
      const self = this;

      self.form.nakladks =
        self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs;
      self.form.sirka =
        self.$store.state.Kalkulace[self.k_id()].data.FormatSirka;
      self.form.vyska =
        self.$store.state.Kalkulace[self.k_id()].data.FormatVyska;
      self.form.panelovat =
        self.$store.state.Kalkulace[self.k_id()].data.FormatPanelovat;
      self.form.sirkaPanel =
        self.$store.state.Kalkulace[self.k_id()].data.FormatSirkaPanel;
      self.form.tisk = self.$store.state.Kalkulace[self.k_id()].data.FormatTisk;
      self.idefixVidet =
        self.$store.state.Kalkulace[self.k_id()].data.idefixVidet;
      //  this.$store.dispatch('setKalk',this.aKalkulace[0].kalkulaceid)

      self.form.vyska =
        self.$store.state.Kalkulace[self.k_id()].data.FormatVyska;
      self.form.Format =
        self.$store.state.Kalkulace[self.k_id()].data.txtFormat;

      self.form.ResultHod =
        self.$store.state.Kalkulace[self.k_id()].data.ResultHod;
      self.form.ResultM2 =
        self.$store.state.Kalkulace[self.k_id()].data.ResultM2;
      self.form.stroj = self.$store.state.Kalkulace[self.k_id()].data.stroj;
      self.form.strojmod =
        self.$store.state.Kalkulace[self.k_id()].data.strojmod;
      self.form.strojceny =
        self.$store.state.Kalkulace[self.k_id()].data.strojceny;

      self.form.Priloha1Idefix =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha1Idefix;
      self.form.Priloha1Txt =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha1Txt;
      self.form.Priloha2Idefix =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha2Idefix;
      self.form.Priloha2Txt =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha2Txt;
      self.form.Priloha3Idefix =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha3Idefix;
      self.form.Priloha3Txt =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha3Txt;
      self.form.Priloha4Idefix =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha4Idefix;
      self.form.Priloha4Txt =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha4Txt;
      self.form.Priloha5Idefix =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha5Idefix;
      self.form.Priloha5Txt =
        self.$store.state.Kalkulace[self.k_id()].data.Priloha5Txt;
      //if (self.form.Priloha1Txt>''){
      if (self.IDEFIX_LAST != self.idefix) {
        self.IDEFIX_LAST = self.IDEFIX;
        //  var q=
        //Q.post(0,q)

        //f.Alert('a'+self.form.Priloha1Txt+' '+self.form.Priloha1Idefix, self.IDEFIX_LAST, self.IDEFIX )
      }

      if (self.form.Format == undefined) self.form.Format = "";

      // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'txtFormat' , value: self.form.Format })
    },
    ks() {
      this.form.nakladks = f.cislo(this.form.nakladks);
    },
    sirkaP() {
      this.form.sirkaPanel = f.cislo(this.form.sirkaPanel);
    },
    onoff() {
      this.active = !this.active;
      //  alert(this.active)
    },
    getBottom(id, addPoz = 10) {
      var neco = -1000;
      var oNeco;
      var obal = document.getElementById("obal1_kalkulace");
      //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
      if ((oNeco = document.getElementById(id))) {
        neco = oNeco.offsetParent.offsetTop + oNeco.offsetHeight + addPoz;
        neco = neco - obal.scrollTop;
        //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

        //oNeco.parentElement.style.background='pink'

        //neco = oNeco.offsetTop
        //    alert(neco+ " // "+ id )
      } else {
      }

      return neco;
    },

    getLeft(id, addPoz = 10) {
      var neco = -1000;
      var oNeco;
      if ((oNeco = document.getElementById(id))) {
        neco = oNeco.offsetParent.offsetLeft + addPoz;
      } else {
      }
      return neco;
    },
    getWidth(id, addPoz = 10) {
      var neco = -1000;
      var oNeco;
      if ((oNeco = document.getElementById(id))) {
        neco = oNeco.offsetWidth + addPoz;

        //neco = oNeco.offsetTop
        //alert(neco)
      } else {
      }

      return neco;
    },
    MenuShowLeave() {
      const self = this;

      if (self.nTimer == false) {
        self.nTimer = setTimeout(function() {
          self.MenuShow = false;
        }, 600);
      } else {
        self.MenuShow = false;
        clearTimeout(self.nTimer);
        self.nTimer = false;
      }
    },
    MenuShowIn() {
      const self = this;
      //  alert("Zjeveni")
      if (self.nTimer == false) {
        self.nTimer = setTimeout(function() {
          self.MenuShow = true;
          //f.Alert("Zjeveni")
        }, 500);
      } else {
        clearTimeout(self.nTimer);
        self.nTimer = false;
      }
    },
    MenuShow1(yesno, e) {
      const self = this;
      self.clickYN = false;
      self.clickX = 0;
      self.clickY = 0;

      if (yesno == 0) {
        this.MenuShow = true;
      }
      if (yesno == 1) {
        this.MenuShow = false;
      }
      try {
        setTimeout(function() {
          self.clickX = e.clientX;
          self.clickY = e.clientY;
          self.clickYN = true;
          setTimeout(function() {
            if (document.getElementById("menu1focus" + self.ID)) {
              document.getElementById("menu1focus" + self.ID).focus();
              //f.Alert("chybka")
            }
          }, 100);
        }, 200);
      } catch (e) {
        alert("chybka");
        return 0;
      }
      return 0;
    },
    fokus(lastFocus = "") {
      this.lastFocus = lastFocus;
    },
    MenuFormatOpust() {
      const self = this;
      //  var x = document.activeElement.tagName

      //console.log(x)
      setTimeout(function() {
        //f.Alert(self.lastFocus)
        if (self.lastFocus.substr(0, 4) == "seek") {
          self.MenuFormatShow = true;
        } else {
          self.MenuFormatShow = false;
        }
      }, 100);

      return;

      if (self.getID() !== self.ID) {
        self.MenuFormatShow = false;
      }

      //return
      if (self.timeout > 0) {
        clearTimeout(self.timeout);
        self.timeout = 0;
        self.MenuFormatShow = true;
        return;
      }
      self.timeout = setTimeout(function() {
        self.MenuFormatShow = false;
        //    f.Alert("Opust")
      }, 1000);
    },

    MenuFormatShow1(yesno, e) {
      const self = this;
      self.clickYN = false;
      self.clickX = 0;
      self.clickY = 0;

      $("#seek" + self.ID).trigger("blur");
      f.sleep(100);
      $("#seek" + self.ID).trigger("focus");

      if (yesno == 0) {
        this.MenuFormatShow = true;

        //f.Alert2("200")

        self.MenuShow = false;

        setTimeout(function() {
          if (document.getElementById("menuformat1focus" + self.ID)) {
            document.getElementById("menuformat1focus" + self.ID).focus();
            //alert('prdel3 OK')
          } else {
            //alert('prdel3 BAD')
          }
        }, 200);
      }
      if (yesno == 1) {
        this.MenuFormatShow = false;

        //alert("300")
      }

      try {
        setTimeout(function() {
          self.clickX = e.clientX;
          self.clickY = e.clientY;
          self.clickYN = true;
          setTimeout(function() {
            if (document.getElementById("menuformat1focus" + self.ID)) {
              document.getElementById("menuformat1focus" + self.ID).focus();
            }
          }, 100);
        }, 200);
      } catch (e) {
        alert("chybka");
        return 0;
      }
      return 0;
    },

    MenuFormatShow1_old(yesno, e) {
      const self = this;

      if (yesno == 0) {
        this.MenuFormatShow = true;
        document.getElementById("menuformat1" + self.ID).style.left =
          e.clientX - 300 + "px";
        document.getElementById("menuformat1" + self.ID).style.top =
          e.clientY - 50 + "px";
        self.MenuShow = false;

        setTimeout(function() {
          document.getElementById("menuformat1" + self.ID).style.width =
            document.getElementById("menuformat1main" + self.ID).offsetWidth +
            "px";
          document.getElementById("menuformat1" + self.ID).style.left =
            document.getElementById("menuformat1main" + self.ID).offsetLeft +
            100 +
            "px";
          if (document.getElementById("menu1focus" + self.ID)) {
            document.getElementById("menuformat1focus" + self.ID).focus();
            //alert('prdel3 OK')
          } else {
            //alert('prdel3')
          }
        }, 200);
      }
      if (yesno == 1) {
        this.MenuFormatShow = false;
      }
    },
    SelectStroj(idefixVidet, idefix_mod) {
      const self = this;
      if (self.idefixVidet == 0) {
        self.idefixVidet = idefixVidet;
        self.setMenu1Value(idefix_mod);
        // f.Alert(1,idefixVidet, idefix_mod )

        //alert('vide')
      } else {
        self.idefixVidet = 0;
        self.form.stroj = [];
        self.form.strojmod = [];
        self.form.strojceny = [];
        //alert('vide  2')
      }
    },

    qStroje(cType = "V") {
      if (cType == "A" || cType == "V") {
        return `select a.idefix ,b.idefix as idefix_mod,a.nazev as stroj,b.nazev,b.nazev_text, b.mod_priorita from list_stroj a join list_strojmod b on a.idefix=b.idefix_stroj
       where a.idefix in (select a.idefix  from list_stroj a join list2_strojskup b on a.idefix_strojskup = b.idefix  where b.typ_kalkulace ~ '${cType}' and tisk )
      order by case when b.mod_priorita then 1 else 2 end`;
      } else if (cType == "Jine") {
        return `select a.idefix ,b.idefix as idefix_mod,a.nazev as stroj,b.nazev,b.nazev_text, b.mod_priorita from list_stroj a join list_strojmod b on a.idefix=b.idefix_stroj
       where a.idefix in (select a.idefix  from list_stroj a join list2_strojskup b on a.idefix_strojskup = b.idefix  where a.nazev_text like 'DTP' ) `;
      }
    },
    async MenuStroj() {
      const self = this;
      var nTmp;
      var q = "";

      // self.$store.state.Kalkulace[self.k_id()].data.Menu2.forEach(el => {
      //    f.Alert('Nactu - stvorim')
      // self.idefixVidet == 0 ||

      if (self.StrojeMenu.length == 0) {
        if (self.Kalkulace[self.k_id()].type == 1) {
          //self.$store.dispatch('setStrojeV')
          //self.StrojeMenu=(await ListStroj.one(this.user,-1, 10411)).data.enum_strojmod_full
          //q = self.qStroje("V");
          self.StrojeMenu = c1.StrojeMenuV
          //self.StrojeMenu = (await Q.all(self.idefix, q)).data.data;
          //   self.initVar = "V : " +q + JSON.stringify(self.StrojeMenu[0])
          //self.StrojeMenu = JSON.parse(JSON.stringify(self.$store.state.KalkulaceStrojeV))
        } else if (self.Kalkulace[self.k_id()].type == 2) {
          //self.$store.dispatch('setStrojeA')
          //q = self.qStroje("A");
          //self.StrojeMenu = (await Q.all(self.idefix, q)).data.data;
          self.StrojeMenu = c1.StrojeMenuA
          //self.StrojeMenu=(await ListStroj.one(this.user,-1, 10410)).data.enum_strojmod_full
          self.initVar = "A";
          //self.StrojeMenu = JSON.parse(JSON.stringify(self.$store.state.KalkulaceStrojeA))
        } else if (self.Kalkulace[self.k_id()].type == 3) {
          //self.StrojeMenu=(await ListStroj.one(this.user,-1, 10412)).data.enum_strojmod_full
          //q = self.qStroje("Jine");
          //self.StrojeMenu = (await Q.all(self.idefix, q)).data.data;
          self.StrojeMenu=c1.StrojeMenuJine
          //self.$store.dispatch('setStrojeJine')
          //self.StrojeMenu = JSON.parse(JSON.stringify(self.$store.state.KalkulaceStrojeJine))
        } else if (self.Kalkulace[self.k_id()].type == 4) {
          //self.$store.dispatch('setStrojeExterni')
          //self.StrojeMenu=(await ListStroj.one(this.user,-1, 10411)).data.enum_strojmod_full
          self.StrojeMenu=c1.StrojeMenuV4
          //q = self.qStroje("V");
          //self.StrojeMenu = (await Q.all(self.idefix, q)).data.data;
          //self.StrojeMenu = JSON.parse(JSON.stringify(self.$store.state.KalkulaceStrojeExterni))
        } else if (self.Kalkulace[self.k_id()].type == 5) {
          //self.$store.dispatch('setStrojeExterni')
          //self.StrojeMenu=(await ListStroj.one(this.user,-1, 10411)).data.enum_strojmod_full
          //q = self.qStroje("V");
          self.StrojeMenu=c1.StrojeMenuV5
          //self.StrojeMenu = (await Q.all(self.idefix, q)).data.data;
          //self.StrojeMenu = JSON.parse(JSON.stringify(self.$store.state.KalkulaceStrojeExterni))
        }
        // f.Alert('Nactu - stvorim', JSON.stringify(self.StrojeMenu))
      }

      //  f.Alert('MenuStroj', JSON.stringify(self.StrojeMenu), self.$store.state.Kalkulace[self.k_id()].type)
      self.StrojeMenu.forEach(el => {
        nTmp = _.findIndex(self.aStroj, function(o) {
          return o.idefix == el.idefix;
        });
        if (nTmp < 0) {
          self.aStroj.push({
            idefix: el.idefix,
            stroj: el.stroj,
            idefix_mod: el.idefix_mod,
            nazev: el.nazev
          });
        }
        // console.log(self.aStroj)
      });
    },

    async setMenu1Value(a, b) {
      const self = this;
      var idK = this.k_id();
      self.setKalk(idK);
      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "Menu1Value",
        value: a
      }); //stroj mod
      //f.Alert(JSON.stringify(self.StrojeMenu))
      self.MenuShow1(1, 0);
      // var nTmp =  _.findIndex(self.$store.state.Kalkulace[self.k_id()].data.Menu2, function (o) { return o.idefix_mod  == a })
      var nTmp = _.findIndex(self.StrojeMenu, function(o) {
        return o.idefix_mod == a;
      });
      if (nTmp > -1) {
        // self.idefixVidet=self.$store.state.Kalkulace[self.k_id()].data.Menu2[nTmp].idefix
        self.idefixVidet = self.StrojeMenu[nTmp].idefix;
        self.Kalk.data.txtStroj =
          self.StrojeMenu[nTmp].stroj + " " + self.StrojeMenu[nTmp].nazev;
        // self.Kalk.data.txtStroj = self.Kalk.data.Menu2[nTmp].stroj + ' '+ self.Kalk.data.Menu2[nTmp].nazev
        // {{ itemStroj.stroj }} {{ idefixVidet>0?getStrojMod():'' }}
      }
      //f.Alert(self.idefix)
      var qtmp = `select * from list_stroj where idefix = ${self.idefixVidet}`;
      var aStroj = (await Q.all(self.idefix, qtmp)).data.data;
      var qtmp = `select * from list_strojmod where idefix = ${a}`;
      var aMod = (await Q.all(self.idefix, qtmp)).data.data;
      var qtmp = `select * from list_strojceny where idefix_stroj = ${self.idefixVidet} order by kod`;
      var aCeny = (await Q.all(self.idefix, qtmp)).data.data;

      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "stroj",
        value: aStroj
      });
      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "strojmod",
        value: aMod
      });
      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "strojceny",
        value: aCeny
      });

      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "idefixVidet",
        value: self.idefixVidet
      });
      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "txtStroj",
        value: self.Kalk.data.txtStroj
      });

      // self.setKalk(idK)

      // f.Alert(2,a,b)

      //self.Kalk.data.txtStroj="NAZDARBAZAR"
      //self.$store.dispatch('setKalk',self.k_id())
      //alert('memik ' + self.idefixVidet + '  ) ')
    },
    setMenuFormat1Value(a, b) {
      const self = this;
      var idK = this.k_id();
      self.setKalk(idK);
      // console.log("FORMAT VALUE ", a , idK, this.$store.state.Kalkulace[this.k_id()].data.FormatValue )
      // return

      self.$store.dispatch("editKalk", {
        kalkulaceid: idK,
        key: "FormatValue",
        value: a
      });
      if (self.form.sirka > 0 && self.form.vyska > 0) {
        //alert('aaaaa')
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatSirka",
          value: self.form.sirka
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatVyska",
          value: self.form.vyska
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatTisk",
          value: self.form.tisk
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatPanelovat",
          value: self.form.panelovat
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatSirkaPanel",
          value: self.form.sirkaPanel
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatNakladKs",
          value: self.form.nakladks
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "idefixVidet",
          value: self.idefixVidet
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "txtFormat",
          value: self.form.Format
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "ResultM2",
          value:
            (self.form.sirka / 1000) *
            (self.form.vyska / 1000) *
            self.form.nakladks
        });
        $("#Zmenad").get(0).value++;
      }

      // alert("sypu 1")

      // var thisItem = self.$store.state.Kalkulace[this.k_id()].data.Menu1Value
      var thisItem = a;
      //alert(thisItem);
      // self.$store.state.Kalkulace[self.k_id()].data.Format.forEach((el, idx) => {
      self.$store.state.KalkulaceFormat.forEach((el, idx) => {
        if (idx == 0) {
          //self.form.sirka = el.sirka
          //self.form.vyska = el.vyska
        }

        if (el.idefix == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          var necoSirka = el.sirka;
          var necoVyska = el.vyska;
          if (el.kod == 9999) {
            self.form.sirka = self.last.sirka * 1;
            self.form.vyska = self.last.vyska * 1;
          } else {
            self.form.sirka = necoSirka * 1;
            self.form.vyska = necoVyska * 1;
          }
          self.form.Format = el.nazev;
          self.getFormatName();
          return;
        }
      });

      // console.log("FORMAT VALUE ", a , idK, this.$store.state.Kalkulace[this.k_id()].data.FormatValue )
      self.MenuFormatShow1(1, 0);
      //this.Kalkulace = []
      //this.$store.state.Kalkulace[this.k_id()].data.Menu1Value = a
    },

    neco(a, b) {
      console.log("neco A:", a, "B:", b, "C:", a.target);
    },
    MenuRet(a, b) {
      const self = this;
      console.log("a", a);

      //alert(1)
      self.MenuLeftJoin.forEach(el => {
        if (el.text == a) {
          self.form.MenuRet = el.key;
          console.log("ret", self.form.MenuRet);
          return;
        }
      });

      //eventBus.$emit('WorkLeft',{key: self.nRet })
      //console.log(a ,"::: ", self.nRet)
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
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`pred presunem souboru ${file.name}？`);
    },

    /*
      var el = this.$el.getElementsByClassName("actual-month")[0];
  el.scrollIntoView()
  */

    //Soubory
    //store a indexy
    k_id() {
      var kRet = this.$store.getters.getId(this.kalkulaceid);
      return kRet;
    },

    setKalk(idK) {
      //Je potreba prevzit ID z CalcIndex
      const self = this;
      //f.Alert(self.$store.state.KalkulaceThis, idK)
      if (self.$store.state.KalkulaceThis !== idK) {
        this.$store.dispatch("KalkulaceColThis", 0); //Jen nastavi KalkulaceThis
      }

      this.$store.dispatch("setKalk", idK);

      var neco = "ref_" + idK + this.ID2;
      this.defaultStyle(idK);
    },
    defaultStyle(setkalkId = -1) {
      const self = this;
      var neco;
      self.$store.state.Kalkulace.forEach(element => {
        neco = "ref_" + element.kalkulaceid + self.ID2;
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
        neco = "ref_" + setkalkId + self.ID2;
        setTimeout(function() {
          if (document.getElementById(neco)) {
            //alert('b'+self.ID2)
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
    setKalk1(idK) {
      this.$store.dispatch("setKalk", idK);
      console.log("setKalk", idK);
    },
    getStrojMod() {
      //return 'ahoj'
      const self = this;
      var thisItem = self.$store.state.Kalkulace[this.k_id()].data.Menu1Value;
      var cRet = "";
      var cDefRet = "";
      var FinalRet = "";
      self.StrojeMenu.forEach((el, idx) => {
        // self.$store.state.Kalkulace[self.k_id()].data.Menu2.forEach((el, idx) =>{
        if (idx == 0) {
          //     cDefRet = el.stroj +' ' + el.nazev
          cDefRet = el.nazev;
        }
        if (el.idefix_mod == thisItem) {
          //console.log(el.nazev, el.idefix_mod)
          //cRet = el.stroj +' ' + el.nazev
          cRet = el.nazev;
        }
      });
      FinalRet = cRet > "" ? cRet : cDefRet;
      if (FinalRet == "") FinalRet = "XX";
      //FinalRet='XXXX'
      return FinalRet;
      //return this.$store.state.Kalkulace[this.k_id()].data.Menu1Value
    },

    SetFormat(a, b) {
      const self = this;
      console.log("XXXXXXXXXretFormat", self.form.MenuRet);
      self.FormatJoin.forEach(el => {
        if (el.text == a) {
          self.form.sirka = el.sirka;
          self.form.vyska = el.vyska;
          self.form.Format = el.text;
          console.log("XXXXXXXXXretFormat", self.form.MenuRet);
          return;
        }
      });
    },

    getFormatName() {
      const self = this;
      var idK = self.k_id();
      var nTmp = -1;

      //self.form.sirka= (self.form.sirka+'').replace(/,/,".")
      //self.form.vyska= (self.form.vyska+'').replace(/,/,".")
      self.form.sirka = f.cislo(self.form.sirka);
      self.form.vyska = f.cislo(self.form.vyska);

      if (self.form.vyska > 0 && self.form.vyska > 0) {
        console.log(self.form.vyska);

        //&& o.vyska*1 == self.form.vyska*1) || (o.sirka*1 == self.form.vyska*1 && o.vyska*1 == self.form.sirka*1)
        // nTmp =  _.findIndex(self.$store.state.Kalkulace[idK].data.Format, function (o) { return
        // (o.sirka*1 == self.form.sirka*1 )
        // })
        // self.$store.state.Kalkulace[idK].data.Format.forEach((el,idx) => {
        self.$store.state.KalkulaceFormat.forEach((el, idx) => {
          if (
            self.form.sirka * 1 == el.sirka * 1 &&
            self.form.vyska * 1 == el.vyska * 1
          ) {
            nTmp = idx;
            return;
            // console.log(el.sirka*1, el.vyska*1);
            // alert("Ok 11 - nazev "+ el.nazev+ " / "+(el.vyska*1))
          }

          if (
            self.form.vyska * 1 == el.sirka * 1 &&
            self.form.sirka * 1 == el.vyska * 1
          ) {
            nTmp = idx;
            return;
            // console.log(el.sirka*1, el.vyska*1);
            // alert("Ok 11 - nazev "+ el.nazev+ " / "+(el.vyska*1))
          }
        });

        if (nTmp > -1) {
          // self.form.Format = self.$store.state.Kalkulace[idK].data.Format[nTmp].nazev
          // self.form.sirka  = self.$store.state.Kalkulace[idK].data.Format[nTmp].sirka*1
          // self.form.vyska  = self.$store.state.Kalkulace[idK].data.Format[nTmp].vyska*1
          self.form.Format = self.$store.state.KalkulaceFormat[nTmp].nazev;
          self.form.sirka = self.$store.state.KalkulaceFormat[nTmp].sirka * 1;
          self.form.vyska = self.$store.state.KalkulaceFormat[nTmp].vyska * 1;
        } else {
          self.last.sirka = f.cislo(self.form.sirka);
          self.last.vyska = f.cislo(self.form.vyska);
          self.form.Format = "Vlastní";
        }

        if (self.form.sirka * 1 > self.form.vyska * 1) {
          console.log(
            "getFormatName 3 : ",
            self.form.sirka,
            "/",
            self.form.sirka
          );
          setTimeout(function() {
            var neco = self.form.sirka;
            //            self.form.sirka = self.form.vyska
            //          self.form.vyska = neco
          }, 2000);
        }
        //self.getFormat(1)
      }

      //console.log("Pridam jej")
      if (self.form.sirka > 0 && self.form.vyska > 0) {
        //alert(idK)

        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatSirka",
          value: self.form.sirka
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatVyska",
          value: self.form.vyska
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatTisk",
          value: self.form.tisk
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatPanelovat",
          value: self.form.panelovat
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatSirkaPanel",
          value: self.form.sirkaPanel
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "FormatNakladKs",
          value: self.form.nakladks
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "txtFormat",
          value: self.form.Format
        });
        self.$store.dispatch("editKalk", {
          kalkulaceid: idK,
          key: "ResultM2",
          value:
            (self.form.sirka / 1000) *
            (self.form.vyska / 1000) *
            self.form.nakladks
        });
        //self.Kalk.data.txtFormat = self.form.Format
        //self.$store.dispatch('setKalk',self.Kalk)
        //self.$store.dispatch('setKalk',idK)
        //self.$store.dispatch('replaceKalk',self.Kalk)
        // alert(self.Kalk.data.txtFormat)
        // alert("sypu 2 idK : "+ idK )
        //return
        //alert(" LEFT " + idK )
        eventBus.$emit("MatCol", { key: idK });
      }
    },
    setID(val = "") {
      const self = this;
      self.$store.dispatch("setID", {
        ID: val > "" ? val : self.ID
      });
    },
    getID() {
      const self = this;
      return self.$store.state.KalkulaceID;
    },
    hideAll() {
      const self = this;
      if (self.getID() != self.ID) {
        //f.Alert('Schovam' , self.getID() , self.ID )
        //      console.log("Schovam ", self.ID)

        if (self.MenuFormatShow) self.MenuFormatShow = false;
        if (self.form.showtxt) self.form.showtxt = false;
        if (self.form.showtxt) self.form.showtxt = false;
        if (self.form.showtxtStroj) self.form.showtxtStroj = false;
        if (self.form.showtxtStroj1) self.form.showtxtStroj1 = false;
      } else {
        // console.log("drzim ", self.ID)
      }
    },
    seznam(id, kod, e, obsah = "") {
      const self = this;
      var i = 0;
      var aPrvek = id.split("_");

      var nKey = e.keyCode;
      var obj1 = e.target; //kde stojim
      var objSeznam = "";
      var delka = aPrvek.length;
      var idPoz = aPrvek[delka - 1];
      var PrvekBase = "";
      var PrvekNext = "";
      var PrvekBefore = "";
      var tmp = 0;

      var PrvekTxt = "";
      console.log("Seznam ", nKey, " ID: ", id);

      // self.info=aPrvek
      // self.info.push({dele: aPrvek.length })

      for (i = 0; i < delka - 1; i++) {
        if (i < delka - 2) {
          if (PrvekTxt > "") PrvekTxt += "_";
          PrvekTxt += aPrvek[i];
        }
        PrvekBase += aPrvek[i] + "_";
        //self.info.push(PrvekBase)
      }
      //self.info.push({"PrvekTxt": PrvekTxt })
      //self.info.push({"Pozice": idPoz })
      //self.info.push({"base": PrvekBase })

      tmp = idPoz * 1;
      if (idPoz > 0) {
        tmp = tmp - 1;
        PrvekBefore = PrvekBase + tmp;
      }
      tmp = idPoz * 1;
      tmp = tmp + 1;
      PrvekNext = PrvekBase + tmp;

      var status = false;

      if (document.getElementById(id)) {
        //Id odkazuje na prvni radku seznamu = pokud existuje
        status = true;
        objSeznam = document.getElementById(id);
        //  self.info.push("OK")
      }

      //self.info.push(e.keyCode)
      switch (nKey) {
        case 27:
          setTimeout(function() {
            self.MenuFormatShow = false;

            document.getElementById(PrvekTxt).focus();

            setTimeout(function() {
              self.MenuFormatShow = false;
            }, 100);
          }, 100);

          //alert('nevidim jej')
          //f.stopka(e)
          //return true
          break;
      }
      if (kod == 0) {
        switch (nKey) {
          case 9:
            setTimeout(function() {
              self.form.showtxt = false;
              self.form.showtxtStroj = false;
              self.form.showtxtStroj1 = false;
              self.form.showtxtDod = false;
              self.form.showtxtPrace = false;
            }, 100);

            //alert('nevidim jej')
            //f.stopka(e)
            //return true
            break;
          case 40:
            f.stopka(e);

            if (status) {
              objSeznam.focus();
              // self.info.push(objSeznam.id)
            } else {
              return;
            }
        }
      }
      if (kod == 1) {
        switch (nKey) {
          case 38:
            f.stopka(e);
            if (PrvekBefore > "" && document.getElementById(PrvekBefore)) {
              document.getElementById(PrvekBefore).focus();
              break;
            }
          case 40:
            f.stopka(e);
            if (PrvekNext > "" && document.getElementById(PrvekNext)) {
              document.getElementById(PrvekNext).focus();
              break;
            }
          case 36: //Houm
            f.stopka(e);
            PrvekNext = PrvekBase + "0";

            if (PrvekNext > "" && document.getElementById(PrvekNext)) {
              document.getElementById(PrvekNext).focus();
              break;
            }

          case 35: //End
            f.stopka(e);
            tmp = idPoz * 1;
            while (PrvekNext > "" && document.getElementById(PrvekNext)) {
              tmp = tmp + 1;
              PrvekNext = PrvekBase + tmp;
            }
            PrvekNext = PrvekBase + (tmp - 1);

            if (PrvekNext > "" && document.getElementById(PrvekNext)) {
              document.getElementById(PrvekNext).focus();
              break;
            }
          case 34: //PejdzDaun
            f.stopka(e);
            tmp = idPoz * 1;
            PrvekNext = PrvekBase + tmp;
            for (i = 1; i < 8; i++) {
              if (PrvekNext > "" && document.getElementById(PrvekNext)) {
                tmp = tmp + 1;
                PrvekNext = PrvekBase + tmp;
              } else {
                if (!document.getElementById(PrvekNext)) {
                  PrvekNext = PrvekBase + (tmp - 1);
                }
                break;
              }
            }
            if (PrvekNext > "" && document.getElementById(PrvekNext)) {
              document.getElementById(PrvekNext).focus();
              break;
            }
          case 33: //PejdzAp
            f.stopka(e);
            tmp = idPoz * 1;
            PrvekNext = PrvekBase + tmp;
            for (i = 1; i < 8; i++) {
              if (PrvekNext > "" && document.getElementById(PrvekNext)) {
                tmp = tmp - 1;
                if (tmp <= 0) {
                  PrvekNext = PrvekBase + "0";
                  break;
                }
                PrvekNext = PrvekBase + tmp;
              } else {
                if (!document.getElementById(PrvekNext)) {
                  PrvekNext = PrvekBase + (tmp + 1);
                }
                break;
              }
            }
            if (PrvekNext > "" && document.getElementById(PrvekNext)) {
              document.getElementById(PrvekNext).focus();
              break;
            }
          case 37: //sipa vleft
            setTimeout(function() {
              document.getElementById(PrvekTxt).focus();
            }, 50);
            break;
          case 39: //sipa vright
            setTimeout(function() {
              //e.target.click()
              f.stopka(e);
              e.target.click();
              document.getElementById(PrvekTxt).focus();
              document.getElementById(PrvekTxt).change;
            }, 100);
            //f.stopka(e)
            break;

          case 13:
            //f.stopka(e)
            e.target.click;
            setTimeout(function() {
              document.getElementById(PrvekTxt).focus();
            }, 50);

            break;
        }
      }

      //el.selectionEnd = el.selectionStart
    },

    //--Values
    Menu1() {
      return this.$store.Kalulace[this.k_id()].data.Menu1;
    }
  },
  computed: {
    ...mapState([
      "isUserLoggedIn",
      "xMenuMain",
      "level",
      "idefix",
      "compaStore",
      "Kalkulace"
    ])
  }
};
</script>

<style>
.v-list__tile
  .v-list__tile--link
  .v-list__tile--active
  .theme--light
  .primary--text {
  z-index: 1000000 !important;
  opacity: 0.5;
  background: black !important;
}
textarea:focus,
input:focus {
  outline: 1px dashed;
}
input:focus,
input:focus {
  zoom: 105%;
}

td th {
  font-size: 12px;
}
</style>
<style scoped>
a:focus {
  outline: 0px solid;
}

input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 6px;
  cursor: pointer;
}

::-webkit-file-upload-button1 {
  background: yelllow;
  color: red;
  padding: 0em;
}

select:focus,
option:focus {
  color: black;
  /* font-weight: 600; */
}

table tr td {
  border: none;
}

input {
  border: none;
}

input[type="number"] {
  border-bottom: dotted 1px black;
}

.el-upload-dragger1 {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 98%;
  height: 80px;
  text-align: left;
  position: relative;
  overflow: hidden;
}
button:focus,
input:focus {
  outline: none;
  font-weight: bold;
}
button:focus {
  font-weight: bold;
  color: #616266;
}
button {
  color: #616266;
}
button:hover {
  font-weight: bold;
}

.neco {
  transition: left 0.4s cubic-bezier(0.42, -0.3, 0.78, 0.25),
    top 0.4s cubic-bezier(0.42, -0.3, 0.78, 0.25);
}

.em1 {
  height: 1em;
}
.em2 {
  height: 2em;
}
.em3 {
  height: 3em;
}
.em4 {
  height: 4em;
}
.em5 {
  height: 5em;
}
.em6 {
  height: 7em;
}
.em7 {
  height: 7em;
}
.em8 {
  height: 8em;
}
</style>


