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
                  <button @click="vl_viewlist(c1.aktivni_zak)">VL tisk {{c1.vllist.split(',').length}}</button>
                </th>
                <th :style="f.pof(c1.Sirka,  4.82)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('zak','','cislozakazky')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='cislozakazky' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='cislozakazky' && c1.desc_zak>''"
                    ></i>
                    Č.zakazky
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
                          @click="fceSeznam.Seznam('zak','','firma')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_zak=='firma' && c1.desc_zak==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_zak=='firma' && c1.desc_zak>''"
                          ></i>
                          Klient
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_zak_firma" @change="fceSeznam.Seznam('zak')" />
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
                          @click="fceSeznam.Seznam('zak','','nazev')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_zak=='nazev' && c1.desc_zak==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_zak=='nazev' && c1.desc_zak>''"
                          ></i>
                          Název
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_zak_nazev" @change="fceSeznam.Seznam('zak')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka,  8)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('zak','','datumzadani')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='datumzadani' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='datumzadani' && c1.desc_zak>''"
                    ></i>
                    Vytvoření
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  7.5)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('zak','','time_update')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='time_update' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='time_update' && c1.desc_zak>''"
                    ></i>
                    Změna
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  7.5)">
                  <button type="button" @click="fceSeznam.Seznam('zak','','nakladsum')" style="color:#818185">
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='nakladsum' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='nakladsum' && c1.desc_zak>''"
                    ></i>
                    Nákladová cena
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  8)" @click="fceSeznam.Seznam('zak','','prodejsum')">
                  <button type="button" @click="fceSeznam.Seznam('zak','','prodejsum')" style="color:#818185">
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='prodejsum' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='prodejsum' && c1.desc_zak>''"
                    ></i>
                    Prodej
                  </button>
                </th>
                <th :style="f.pof(c1.Sirka,  5.5)">
                  <button
                    type="button"
                    @click="fceSeznam.Seznam('zak','','(prodejsum-nakladsum)')"
                    style="color:#818185"
                  >
                    <i
                      class="el-icon-upload2 green--text"
                      v-if="c1.order_zak=='(prodejsum-nakladsum)' && c1.desc_zak==''"
                    ></i>
                    <i
                      class="el-icon-download orange--text"
                      v-if="c1.order_zak=='(prodejsum-nakladsum)' && c1.desc_zak>''"
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
                          @click="fceSeznam.Seznam('zak','','obchodnik')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_zak=='obchodnik' && c1.desc_zak==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_zak=='obchodnik' && c1.desc_zak>''"
                          ></i>
                          Obchodnik
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_zak_obchodnik" @change="fceSeznam.Seznam('zak')" />
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
                          @click="fceSeznam.Seznam('zak','','stav')"
                          style="color:#818185"
                        >
                          <i
                            class="el-icon-upload2 green--text"
                            v-if="c1.order_zak=='stav' && c1.desc_zak==''"
                          ></i>
                          <i
                            class="el-icon-download orange--text"
                            v-if="c1.order_zak=='stav' && c1.desc_zak>''"
                          ></i>
                          Stav
                        </button>
                      </td>
                      <td style="width:20%;border:none;text-align:center;background:#f7f8fb">
                        <input type="checkbox" v-model="c1.seek_zak_stav" @change="fceSeznam.Seznam('zak')" />
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
                v-for="(polozka,idx) in c1.seznam_zak"
                :key="idx"
                @dblclick="fceSwitch13Z.to2Z(polozka);"
                @click="fceFillForm.FillFormWait(polozka);c1.aktivni_zak=polozka.idefix"
                style="cursor:pointer"
                :id="'trz_'+polozka.idefix"
                class="hoVer2"
              >

                <td colspan="100" v-if="false">

                  {{c1.aktivni_zak}} {{polozka.cislozakazky}}
                  ==<br>
                  {{c1.tmp.cislo}}
                  -----
                </td>


                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo}"
                  :style="f.pof(c1.Sirka, 5)"
                >
                  <button v-if="polozka.zamek" @click="f.Alert2('Uzmaceno')" style="zoom:70%">
                    <v-icon size="medium" class="red--text">fa-lock</v-icon>
                  </button>
                  <button v-else @click="false" style="zoom:70%;opacity:0.1">
                    <v-icon size="medium" class="white--text">fa-unlock</v-icon>
                  </button>
                  &nbsp;
                  <button @click="delzak(polozka)">
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
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                >{{polozka.cislozakazky}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.firma}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.nazev}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.datumzadani)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.time_update)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.nakladsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.prodejsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="prava pr-4"
                >{{polozka.prodejsum - polozka.nakladsum }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.obchodnik }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==c1.tmp.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
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

  }


}
</script>>
