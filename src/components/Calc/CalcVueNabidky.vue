<template>
<ta-ble3
          v-cloak
          :h="'530px;'+f.pof( c1.Sirka,98.1)+';top:1px'"
          :Sirka="1000"
          :Leva="'0%'"
          :Prava="'0%'"
          :Stred="'100%'"
          :TopA="'top:28px'"
          :TopB="'height:28px'"
          :id="'tab_'+ID"
        >
          <table slot="head" :style="f.pof(c1.Sirka,98.1)">
            <thead class="c-1 tdline">
              <tr>
                <th :style="f.pof(c1.Sirka,  4.9)">
                  <button @click="vl_viewlist(c1.aktivni_nab)">VL tisk {{c1.vllist.split(',').length}}</button>
                </th>
                <th :style="f.pof(c1.Sirka,  4.82)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('nab','','cislonabidky')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='cislonabidky' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='cislonabidky' && c1.desc_nab>''"
                    ></i>
                    Č.nabidky
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka, 14.8)">
                  <table
                    border="0"
                    style="width:100%;border:none;background:#f7f8fb"
                    bgcolor="#f7f8fb"
                  >
                    <tr style="border:none;">
                      <td style="width:80%;border:none;background:#f7f8fb">
                        <button
                          type="button"
                          @click="fceSeznam.Seznam('nab','','firma')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_nab=='firma' && c1.desc_nab==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_nab=='firma' && c1.desc_nab>''"
                          ></i>
                          Klient
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_nab_firma" @change="fceSeznam.Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka, 14.9)">
                  <table border="0" style="width:100%;border:none">
                    <tr style="border:none;">
                      <td style="width:80%;border:none;background:#f7f8fb">
                        <button
                          type="button"
                          @click="fceSeznam.Seznam('nab','','nazev')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_nab=='nazev' && c1.desc_nab==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_nab=='nazev' && c1.desc_nab>''"
                          ></i>
                          Název
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_nab_nazev" @change="fceSeznam.Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka,  8)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('nab','','datumzadani')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='datumzadani' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='datumzadani' && c1.desc_nab>''"
                    ></i>
                    Vytvoření
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  7.5)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('nab','','time_update')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='time_update' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='time_update' && c1.desc_nab>''"
                    ></i>
                    Změna
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  7.5)">
                  <button type="button" @click="fceSeznam.Seznam('nab','','nakladsum')" style="color:#818185">
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='nakladsum' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='nakladsum' && c1.desc_nab>''"
                    ></i>
                    Nákladová cena
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  8)" @click="fceSeznam.Seznam('nab','','prodejsum')">
                  <button type="button" @click="fceSeznam.Seznam('nab','','prodejsum')" style="color:#818185">
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='prodejsum' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='prodejsum' && c1.desc_nab>''"
                    ></i>
                    Prodej
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  5.5)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('nab','','(prodejsum-nakladsum)')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_nab=='(prodejsum-nakladsum)' && c1.desc_nab==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_nab=='(prodejsum-nakladsum)' && c1.desc_nab>''"
                    ></i>
                    Zisk
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka, 14.8)">
                  <table border="0" style="width:100%;border:none">
                    <tr style="border:none;">
                      <td style="width:80%;border:none;background:#f7f8fb">
                        <button
                          type="button"
                          @click="fceSeznam.Seznam('nab','','obchodnik')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_nab=='obchodnik' && c1.desc_nab==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_nab=='obchodnik' && c1.desc_nab>''"
                          ></i>
                          Obchodnik
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_nab_obchodnik" @change="fceSeznam.Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka,  5)">
                  <table border="0" style="width:100%;border:none">
                    <tr style="border:none;">
                      <td style="width:80%;border:none;background:#f7f8fb">
                        <button
                          type="button"
                          @click="fceSeznam.Seznam('nab','','stav')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_nab=='stav' && c1.desc_nab==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_nab=='stav' && c1.desc_nab>''"
                          ></i>
                          Stav
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_nab_stav" @change="fceSeznam.Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
              </tr>
            </thead>
          </table>
          <table v-cloak slot="body" :style="f.pof(c1.Sirka,98.1)">
            <tbody>

              <tr
                v-for="(polozka,idx) in c1.seznam_nab"
                :key="idx"
                @dblclick="fceSwitch13N.to2N(polozka);"
                @click="fceFillForm.FillFormWait(polozka);c1.aktivni_nab=polozka.idefix"
                style="cursor:pointer"
                :id="'trz_'+polozka.idefix"
                class="hoVer2"
              >

                <td colspan="100" v-if="false">

                  {{c1.aktivni_nab}} {{polozka.cislonabidky}}
                  ==<br>
                  {{c1.tmp.cislo}}
                  -----
                </td>


                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo}"
                  :style="f.pof(c1.Sirka, 5)"
                >
                  <button v-if="polozka.zamek" @click="f.Alert2('Uzmaceno')" style="zoom:70%">
                    <v-icon size="medium" class="red--text">fa-lock</v-icon>
                  </button>
                  <button v-else @click="false" style="zoom:70%;opacity:0.1">
                    <v-icon size="medium" class="white--text">fa-unlock</v-icon>
                  </button>
                  &nbsp;
                  <button @click="fceSeznam.delnab(polozka)">
                    <i
                      class="el-icon-delete black--text darken-4 d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button @click="fceFillForm.FillFormWait(polozka,true)">
                    <i
                      class="el-icon-plus black--text d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                </td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                >{{polozka.cislonabidky}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.firma}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.nazev}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.datumzadani)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.time_update)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.nakladsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.prodejsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="prava pr-4"
                >{{polozka.prodejsum - polozka.nakladsum }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.obchodnik }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislonabidky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="leva pl-2"
                >{{polozka.stav }}</td>
              </tr>
            </tbody>
          </table>
        </ta-ble3>
</template>

<script>
import { eventBus } from "@/main.js";
import f from '@/services/fce';
import c1 from './CalcCentral.js'; // Prehledova dole
import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam
import fceFillForm from './CalcFceFillForm.js'; // Funkce seznam
import fceSwitch13N from './CalcFceSwitch13N.js'; // Prehledova dole


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
      fceSwitch13N:fceSwitch13N,

    }
  },
  mounted() {
    eventBus.$emit('w1setvar', {})

  }


}
</script>>
