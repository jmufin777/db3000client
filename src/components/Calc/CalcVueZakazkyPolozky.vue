<template>
<div>
        <div class="leva pt-0 pb-0"  >
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="fceSwitch13Z.to1Z()">Kniha 1Z</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="fceSwitch13Z.to3Z(c1.polozka_zak,1)"
            v-if="!f.isEmpty(c1.polozka_zak)"
          >3Z A</button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
        </div>

        <table style="width:90%;border: solid 1px silver;border-bottom:none" >
          <thead >
            <tr>
              <th style="width:2em">
                <button @click="vl_viewlist(c1.aktivni_zak)">VL tisk {{c1.vllist.split(',').length}}</button>
              </th>
              <th v-if="false" style="width:20em">Text na faktuře</th>
              <th style="width:30em">Práce</th>
              <th style="width:30em">Dodavatel</th>
              <th style="width:">Kč/ks</th>
              <th style="width:">ks</th>
              <th style="width:">Naklady celkem</th>
              <th style="width:">Marze</th>
              <th style="width:">Prodej</th>
              <!-- <th style="width:">Sloupec</th> -->
            </tr>
            <tr style="zoom:120%">
              <th style="width:3em;border:none" class="nb">&nbsp;</th>
              <th style="width:20em;border:none" class="nb">&nbsp;</th>
              <th style="width:20em;border:none" class="nb">&nbsp;</th>
              <th style="width:20em;border:none" class="nb">&nbsp;</th>
              <th style="width:;border:none" class="nb">&nbsp;</th>
              <!-- <th style="width:;border:none" class="nb">&nbsp;</th> -->
              <th style="width:">{{f.getCisloInt(c1.zak_naklady)}} Kč</th>
              <th style="width:">{{f.getCisloInt(c1.zak_marze)}} Kč</th>
              <th style="width:">{{f.getCisloInt(c1.zak_prodej)}} Kč</th>
              <!-- <th style="width:">Sloupec</th> -->
            </tr>
          </thead>
          <tbody >
            <tr
              v-for="(polozka2,idx2) in c1.polozky_zak"
              :key="idx2"
              class="hoVer2"
              @click="polozka2.vzor>-999?c1.aktivni_polozka_zak=polozka2.idefix:false"
              :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999 ,'ramspodni': polozka2.idefix!==c1.aktivni_polozka_zak && polozka2.vzor >-999
                ,'nerusit': polozka2.nazev.match(/^Pr.zdn.*$/) && c1.aktivni_polozka_zak!==polozka2.idefix
                }"
              :style="polozka2.vzor>-999?'cursor:pointer; height:30px; border-bottom:solid 1px #cccccc;':''"
            >
              <td v-if="true"
                :key="'zak'+c1.klikyzak+''+idx2"
                class="pl-1"
                style="border-bottom:none"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <div
                  v-else
                  style="height:100%; width:80%%;border-bottom:dotted 1px"
                  class="stred mx-1 pt-4"
                >
                  <!-- @mouseenter="odkaz=polozka2.idefix_vl;nahledView()"
                  @mouseleave="nahledCancel()"-->
                  <span
                    v-if="polozka2.idefix_vl>0"
                    @click="vl_view(polozka2.idefix_vl);c1.nahled=false"
                  >
                    <span
                      v-if="polozka2.status==1 || polozka2.status>2"
                      class="red--text"
                    >{{polozka2.vl_znacka}}&nbsp;&nbsp;</span>
                    <span v-else class="green--text">{{polozka2.vl_znacka}}&nbsp;&nbsp;</span>
                  </span>

                  <span
                    v-if="!f.isEmpty(polozka2.obsah) "
                    class="black--text d3"
                    style="font-weight:bold;height:20px;zoom:100%;"
                    @click="polozka2.vzor==0?fceSwitch13Z.to3Z(polozka2,2):ZalozitZobrazit(polozka2)"
                  >
                    <!-- <v-icon v-if="polozka2.c1.status==1 || polozka2.c1.status>2"
        size="small"   class="red--text"
        >fa-lock</v-icon>
        <v-icon v-else
        size="medium"   class="green--text"
                    >fa-unlock</v-icon>-->
                    &nbsp;&nbsp;&nbsp;
                    K
                  </span>

                  <span
                    v-else
                    class="black--text d3"
                    style="font-weight:bold;height:20px;zoom:100%;"
                  >&nbsp;</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i
                    v-if="polozka2.vzor==0 && polozka2.status!==1"
                    class="el-icon-delete black--text d3"
                    style="font-weight:bold;height:25px;zoom:100%;"
                    @click="deleteItem('zak',polozka2)"
                  ></i>
                  <i
                    v-else
                    class="el-icon-minus black--text d3"
                    style="font-weight:bold;height:25px;zoom:100%;"
                  ></i>
                  &nbsp;&nbsp;&nbsp;
                  <button @click="copyRadek(polozka2.idefix)">
                    <i
                      class="el-icon-plus black--text d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                  <!-- <span  class="black--text d3" style="font-weight:bold;height:20px;zoom:100%;" @click="ZmenPolozku('zak',polozka2)">S</span> -->
                </div>
              </td>
              <td

                v-if="true"
                class="rborder leva pl-2 pr-2"
                style="border-bottom:none"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="text"
                  v-model="polozka2.nazev"
                  @change="false?ZmenPolozku('zak',polozka2):true"
                  @focus="c1.aktivni_polozka_zak=polozka2.idefix"
                  style="height:100%; border-bottom:dotted 0px;"
                  :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                  class="elevation-0"
                  v-bind:readonly="c1.polozka_zak.zamek"
                />
              </td>

              <td v-if="true"
                class="rborder pr-0 pt-1 pl-2 pr-1"
                style="border-bottom:none"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>

                <!--zakazka!-->
                <div
                  v-else-if="c1.cis_prace.length>=0 && f.isEmpty(polozka2.obsah)"
                  :style="'position:relative;top:1px;left:0em;width:100%;height:100%;border-bottom: dotted 1px silver'"
                  class="leva pl-0"
                >
                  <span style="float: left;width:100%">
                    <table border="0" style="border: solid 0px black;width:100%">
                      <tr>
                        <td v-if="true" style="width:90%">
                          <el-select
                            v-model="polozka2.idefix_prace"
                            filterable
                            no-match-text
                            no-data-text
                            default-first-option
                            size="mini"
                            class="pb-0 pl-0 pa-0 ma-0"
                            :style="'position:relative;top:1px;left:1em;width:100%;height:100%'"
                            popper-class="silver lighten-5"
                            placeholder="Prace"
                            @change="(polozka2.idefix_prace>0 && (polozka2.nazev=='' ||polozka2.nazev.match(/^Pr.zdn.*$/) ) )?polozka2.nazev=(c1.cis_prace.filter(el => {
                  return el.idefix_prace==polozka2.idefix_prace
                }))[0].text_na_fakturu:''
                ;ZmenPolozku('zak',polozka2)
                "
                            :disabled="c1.polozka_zak.zamek"
                          >
                            <!-- x.filter(c1.cis_prace, function(o){ return true || filterPrace(polozka2,o) }) -->
                            <el-option
                              v-for="item01 in c1.cis_prace.filter(el=>{ return    true || el.pocet_dod > 0 || el.idefix_prace*1==polozka2.idefix_prace*1   })"
                              :key="item01.idefix_prace"
                              :label="item01.prace"
                              :value="item01.idefix_prace"
                              style="font-size:13px"
                            >
                              <span style="float: left">{{item01.prace}}</span>
                              <span
                                style="float: right; color: #8492a6; font-size: 13px"
                              >{{item01.pocet_dod}}</span>
                            </el-option>
                          </el-select>
                        </td>
                        <td v-if="true" style="width:10%;text-align:right">
                          <span
                            style="float: right; color: #8492a6; font-size: 13px"
                            @click="polozka2.vse=(polozka2.vse==0?1:0)"
                          >
                            <i
                              v-if="polozka2.vse==0"
                              class="el-icon-plus black--text d3"
                              style="font-weight:bold;height:15px;zoom:100%;"
                            ></i>
                          </span>
                          <span
                            style="float: right; color: #8492a6; font-size: 13px"
                            @click="polozka2.vse=(polozka2.vse==0?1:0)"
                          >
                            <i
                              v-if="polozka2.vse==1"
                              class="el-icon-plus orange--text d3"
                              style="font-weight:bold;height:15px;zoom:100%;"
                            ></i>
                          </span>
                        </td>
                      </tr>
                    </table>

                    <div v-if="polozka2.vzor==-999"></div>
                    <div
                      v-else
                      class="pt-1 pb-1"
                      style="height:39px;width:100%; border-bottom: solid silver 0px;"
                    >
                      <!-- <div style="float:left;width:30%;height:39px;" class="pt-2 pl-3 ma-0 leva"> Text:</div> -->
                      <div style="float:right;width:100%;" class="elevation-0 pt-1">
                        <input
                          type="text"
                          v-model="polozka2.nazev"
                          @change="ZmenPolozku('zak',polozka2)"
                          @focus="c1.aktivni_polozka_zak=polozka2.idefix"
                          style="height:25px; border:dotted 1px silver;font-size:13px"
                          placeholder="Text na fakturu"
                          :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                          class="elevation-0"
                          :readonly="c1.polozka_zak.zamek"
                        />
                      </div>
                    </div>
                  </span>
                </div>
                <div
                  v-else
                  :style="'position:relative;top:1px;left:0em;width:100%;height:100%;border-bottom: dotted 1px silver'"
                  class="leva pl-1"
                >
                  <span>
                    {{ (c1.cis_prace.filter(el=>{
                    return el.idefix_prace*1==c1.idefix_vlastnikPrace*1
                    }) )[0]['prace']}}
                    <div v-if="polozka2.vzor==-999"></div>
                    <div
                      v-else
                      class="pt-1 pb-1"
                      style="height:39px;width:100%; border-bottom: solid silver 0px;"
                    >
                      <!-- <div style="float:left;width:30%;height:39px;" class="pt-2 pl-3 ma-0 leva"> Text:</div> -->
                      <div style="float:right;width:100%;" class="elevation-0 pt-1">
                        <!-- @change="false?ZmenPolozku('zak',polozka2):true"    -->
                        <input
                          type="text"
                          v-model="polozka2.nazev"
                          @change="ZmenPolozku('zak',polozka2)"
                          @focus="c1.aktivni_polozka_zak=polozka2.idefix"
                          style="height:25px; border:dotted 1px silver;font-size:13px"
                          placeholder="Text na fakturu"
                          :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                          class="elevation-0"
                          :readonly="c1.polozka_zak.zamek"
                        />
                      </div>
                    </div>
                  </span>
                </div>
              </td>
              <td v-if="true"

                class="rborder pr-0 pt-1 pl-2 pr-1"
                style="border-bottom:none"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>

                <div v-else>
                  <!-- {{polozka2.idefix_dod}} -->
                  <el-select
                    v-model="polozka2.idefix_dod "
                    v-if="c1.cis_dod.length>=0 && f.isEmpty(polozka2.obsah)"
                    filterable
                    no-match-text
                    no-data-text="Cekam na data"
                    default-first-option
                    size="mini"
                    class="pb-0 pl-0 pa-0 ma-0"
                    :style="'position:relative;top:1px;left:1em;width:100%;height:100%'"
                    popper-class="silver lighten-5"
                    placeholder="Prace"
                    @focus="c1.zak_item_active=polozka2;"
                    @change="polozka2.vse==1&& polozka2.idefix_dod>0?Sparuj(polozka2):false; polozka2.vse=0
                ;ZmenPolozku('zak',polozka2)
                "
                    :disabled="c1.polozka_zak.zamek"
                  >
                    <!--
                remote
                :remote-method="CisDodAll"
                :c1.loading="c1.loading"
                    -->
                    <!-- x.filter(c1.cis_dod, function(o){ return filterDod(polozka2, o) }) -->
                    <el-option
                      v-if="polozka2.vse==0"
                      v-for="item02 in x.filter(c1.cis_dod, function(o){ return filterDod(polozka2, o) })"
                      :key="item02.idefix_firma"
                      :label="item02.firma"
                      :value="item02.idefix_firma"
                      style="font-size:13px"
                    >
                      <span style="float: left">{{item02.firma}}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                      >{{item02.pocet_praci}}</span>
                    </el-option>
                    <el-option
                      v-if="polozka2.vse==1"
                      v-for="item02 in c1.cis_dod_all"
                      :key="item02.idefix_firma"
                      :label="item02.firma"
                      :value="item02.idefix_firma"
                      style="font-size:13px"
                    >
                      <span style="float: left">{{item02.firma}}</span>
                      <span
                        style="float: right; color: #8492a6; font-size: 13px"
                      >{{item02.pocet_praci}}</span>
                    </el-option>
                  </el-select>
                  <div
                    v-else
                    :style="'position:relative;top:1px;left:0em;width:100%;height:100%;border-bottom: dotted 1px silver'"
                    class="leva pl-3"
                  >
                    {{ (c1.cis_dod_vlastnik.filter(el=>{
                    return el.idefix_firma*1==c1.idefix_vlastnik*1
                    }) )[0]['firma']}}
                  </div>
                </div>

                <div v-if="polozka2.vzor==-999"></div>
                <div
                  v-else-if="polozka2.idefix_dod!=c1.idefix_vlastnik"
                  class="pt-1 pb-1"
                  style="height:39px;width:100%; border-bottom: solid silver 0px;"
                >
                  <div
                    style="float:left;width:30%;height:39px;"
                    class="pt-2 pl-3 ma-0 leva"
                  >Faktura:</div>
                  <div style="float:right;width:70%;" class="elevation-0 pt-1">
                    <input
                      type="text"
                      :disabled="polozka2.nazev.match(/^Pr.zdn.*$/)"
                      v-model="polozka2.faktura"
                      @keyup="($event.keyCode==13 || $event.keyCode==9 )?ZmenPolozku('zak',polozka2):false"
                      style="height:22px; border:dotted 1px silver;"
                      class="stred"
                    />
                  </div>
                </div>
                <div
                  v-else
                  class="pt-1 pb-1 pl-0"
                  style="height:39px;width:100%; border-bottom: solid silver 0px;"
                >
                  <div
                    style="float:left;width:100%;height:39px;"
                    class="pt-2 pl-2 ma-0 leva grey--text lighten-5"
                  >&nbsp;</div>
                </div>
              </td>
              <td v-if="false"
                class="rborder pr-2 pl-1"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <!-- {{polozka2.kcks}} -->
                <!-- ||!f.isEmpty(polozka2.obsah) -->
                <input
                  v-else
                  type="number"
                  :readonly="c1.polozka_zak.zamek  "
                  v-model="polozka2.kcks"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  @focus="polozka2.vse=0;c1.aktivni_polozka_zak=polozka2.idefix"
                  @change="polozka2.naklad=polozka2.kcks * polozka2.ks;ZmenPolozku('zak',polozka2,0)"
                />
              </td>
              <td v-if="false"
                class="rborder pr-2"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <!-- ||!f.isEmpty(polozka2.obsah)  -->
                <input
                  v-else
                  type="number"
                  :readonly="c1.polozka_zak.zamek "
                  v-model="polozka2.ks"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  @change="
        polozka2.naklad=polozka2.kcks * polozka2.ks;
        ZmenPolozku('zak',polozka2,0)
        "
                />
                <span
                  style="visibility:hidden"
                >{{c1.polozka_zak.zamek }} {{ !f.isEmpty(polozka2.obsah) }}</span>
                <!-- {{polozka2.ks}} -->
              </td>
              <td v-if="false"
                class="rborder pr-2 pl-1"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <!--||!f.isEmpty(polozka2.obsah) //-->
                <input
                  v-else
                  type="number"
                  v-model="polozka2.naklad"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  v-bind:readonly="c1.polozka_zak.zamek"
                  @change="
      polozka2.kcks=(polozka2.ks>0?polozka2.naklad / polozka2.ks:polozka2.kcks).toFixed(2);
      ZmenPolozku('zak',polozka2,0)"
                />
              </td>
              <td v-if="false"
                class="rborder pr-2"
                style="border-bottom: solid 1px silver"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <span v-else>
                  <input
                    readonly
                    type="number"
                    :value="(polozka2.prodej - polozka2.naklad)"
                    style="height:100%; border-bottom:dotted 1px;font-size:120%"
                    class="prava"
                    @change="ZmenPolozku('zak',polozka2,0)"
                    v-bind:readonly="c1.polozka_zak.zamek"
                  />
                  <!-- {{polozka2.prodej - polozka2.naklad}} -->
                </span>
              </td>
              <!--<td v-if="false" class="rborder pr-2">{{polozka2.marze}}</td>!-->
              <td v-if="false"
                class="rborder pr-2 pl-1 pb-0"
                :class="{'blue lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_zak && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="number"
                  v-model="polozka2.prodej"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  @change="ZmenPolozku('zak',polozka2,0)"
                  @focus="c1.aktivni_polozka_zak=polozka2.idefix"
                />
              </td>
            </tr>
          </tbody>
        </table>
</div>

</template>

<script>
import { eventBus } from "@/main.js";
import f from '@/services/fce';
import c1 from './CalcCentral.js'; // Prehledova dole
import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam
import fceFillForm from './CalcFceFillForm.js'; // Funkce seznam
import fceSwitch13Z from './CalcFceSwitch13Z.js'; // Prehledova dole


export default {
  props: {
    ID:0
  },
  data() {
    return {
      f: f,
      c1:c1,
      fceSeznam: fceSeznam,
      fceFillForm:fceFillForm,
      fceSwitch13Z:fceSwitch13Z,

    }
  },
  mounted() {
    eventBus.$emit('w1setvar', {})

  },
  methods: {
    filterDod(polozka, radekDod) {  //Vyresit!!!!!
      const self = this;
      var lRet = false;

      if (polozka.idefix_prace == 0) {
        lRet = true;
      }
      // console.log('Radek',radekDod)
      if (polozka.idefix_prace > 0) {
        // console.log(radekDod.prace_seznam)
        radekDod.prace_seznam.forEach(el2 => {
          if (el2 == polozka.idefix_prace) {
            lRet = true;
            return;
          }
        });
      }
      return lRet;
    },
  }



}
</script>>
