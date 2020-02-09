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
        <!-- <div slot="hlavninew" style="position:relative;top:0px;left:10px;background:#fdf0f7;text-align:left;width:100%">   -->
        <div>
          <input type="hidden" id="Zmenad" value="0" class="black black--text" style="width:100px" />
          <work-but-menu
            :ID="ID"
            ref="w1"
            :obrazovka_zak="c1.obrazovka_zak"
            :obrazovka_nab="c1.obrazovka_nab"
          >
            <span slot="tlacitkazakazky"  >
              <button
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="Nova()"
                :style="c1.aktivni_zak>0?'color:green':''"
                :title="c1.status_zak +'/'+ c1.aktivni_zak"
              >
                Nova
                {{c1.IDEFIXACTIVELAST}}
              </button>
              <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="Ulozit()">Ulozit</button>
              <button
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="Nova(true)"
                :disabled="(c1.MAINMENULAST=='zakazky' && c1.status_zak==1) || (c1.MAINMENULAST=='kalkulace' && c1.status_nab==1)"
                :class="{'white elevation-0': (c1.MAINMENULAST=='zakazky' && c1.status_zak==1) || (c1.MAINMENULAST=='kalkulace' && c1.status_nab==1)}"
              >Nova upravou</button>
              <button class="px-4 tlacitkoMenu elevation-2 hoVer">Smazat</button>
              <button
                v-if="c1.MAINMENULAST=='kalkulace'"
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="Ulozit('z')"
              >Ulozit jako zakazku</button>
              <button
                v-if="c1.MAINMENULAST=='zakazky'"
                class="px-4 tlacitkoMenu elevation-2 hoVer"
                @click="Ulozit('n')"
              >Ulozit jako nabidku</button>
              <button>Aktivni zak {{c1.aktivni_zak}} {{c1.aktivni_zak_short}}</button>
            </span>
          </work-but-menu>
        </div>
        <span v-if="false">
          {{ KalkulaceThis}} /Last {{ c1.KalkulaceLast }}
          {{ $store.state.KalkulaceThis }} {{ c1.TestRend }}
        </span>
        <!-- <menu-left slot="menuleft"></menu-left>
        <menu-hlavni></menu-hlavni>-->
      </div>

      <div
        v-if="c1.obrazovka_zak==1 && c1.MAINMENULAST=='zakazky'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%;max-height:600px"
        id="obalKalkulace"
        class="stred"
      >
        <div v-if="false" style="position:fixed; top:30em;right:8%;opacity:0.5;z-index:99999999">
          <span style="color:red; font-size:10em">1Z</span>
        </div>
        <div class="leva blue lighten-5" :style="f.pof( c1.Sirka,98)" style="position:relative;">
          <div style="position:relative;font-size:110%">
            <button
              class="px-4 tlacitkoMenu elevation-2 hoVer"
              @click="to2Z(c1.polozka_zak)"
              v-if="!f.isEmpty(c1.polozka_zak)"
            >Polozky 2Z OK</button>
            <button
              class="px-4 tlacitkoMenu elevation-2 hoVer"
              @click="to3Z(c1.polozka_zak,1)"
              v-if="!f.isEmpty(c1.polozka_zak)"
            >3Z A</button>

            <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
            <span
              class="elevation-0 ml-4 pr-2 pb-0 pt-0"
              style="position:absolute;border-radius:0px 0px 0px 0px;background:#e4eff8;left:10%;"
            >
              <span>
                Rok:
                <input
                  v-model="c1.search_zak_rok"
                  type="number"
                  class="white px-0"
                  style="height:15px;font-size:12px;background:white !important;width:4em;border: solid 1px black;font-size:110%"
                  @keyup="Seznam('zak')"
                />
                Cislo:
                <input
                  v-model="c1.search_zak_cislo"
                  type="text"
                  class="white px-2"
                  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black;font-size:110%"
                  @keyup="Seznam('zak')"
                />
                <input
                  v-model="c1.search_zak_cislo2"
                  type="hidden"
                  class="white px-2"
                  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black;font-size:110%"
                />
                Neco:
                <input
                  v-model="c1.search_zak"
                  type="text"
                  class="white px-2"
                  style="height:15px;font-size:12px;background:white !important;width:20em;border: solid 1px black;font-size:110%"
                  @keyup="Seznam('zak')"
                />

                <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                  <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
                </span>
                <button
                  style="border-radius::0px 10px 10px 0px;"
                  @click="c1.seek_zak_moje=!c1.seek_zak_moje;Seznam('zak')"
                  title="Moje zakazky"
                >
                  <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                    <i
                      class="el-icon-user-solid d3"
                      :class="{'green--text': c1.seek_zak_moje , 'orange--text': !c1.seek_zak_moje }"
                      style="font-weight:bold;height:15px;color:#89a4b3"
                    ></i>
                  </span>
                </button>
                <button
                  style="border-radius::0px 10px 10px 0px;"
                  @click="c1.search_zak_cislo='';c1.search_zak_cislo2='';c1.search_zak=''
                          c1.seek_zak_obchodnik=false;
                          c1.seek_zak_firma=false;
                          c1.seek_zak_stav=false;
                          ;Seznam('zak')"
                  v-if="c1.search_zak_cislo>'' || c1.search_zak>''|| c1.search_zak_cislo2>''"
                >
                  <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                    <i
                      class="el-icon-close d3 red--text"
                      style="font-weight:bold;height:15px;color:#89a4b3"
                    ></i>
                  </span>
                </button>
              </span>

              <span>
                Naklad: {{f.getCisloInt(c1.seznam_zak_sum[0].naklad)}}
                Prodej: {{f.getCisloInt(c1.seznam_zak_sum[0].prodej)}}
                Zisk: {{f.getCisloInt(c1.seznam_zak_sum[0].zisk)}}
                Marze: {{f.getCislo(c1.seznam_zak_sum[0].marze)}}
                Pocet: {{f.getCisloInt(c1.seznam_zak_sum[0].pocet)}}
                Od: {{f.obdobi(c1.seznam_zak_sum[0]._od)}}-{{f.obdobi(c1.seznam_zak_sum[0]._do)}}
                <table>
                  <thead>
                    <th>Pocet</th>
                    <th>{{c1.seznam_zak_sum[0].pocet}}</th>
                    <th>Naklad</th>
                    <th>{{c1.seznam_zak_sum[0].naklad}}</th>
                  </thead>
                </table>
              </span>
            </span>
          </div>
        </div>

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
                    @click="Seznam('zak','','cislozakazky')"
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
                          @click="Seznam('zak','','firma')"
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
                        <input type="checkbox" v-model="c1.seek_zak_firma" @change="Seznam('zak')" />
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
                          @click="Seznam('zak','','nazev')"
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
                        <input type="checkbox" v-model="c1.seek_zak_nazev" @change="Seznam('zak')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka,  8)">
                  <button
                    type="button"
                    @click="Seznam('zak','','datumzadani')"
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
                    @click="Seznam('zak','','time_update')"
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
                  <button type="button" @click="Seznam('zak','','nakladsum')" style="color:#818185">
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
                <th :style="f.pof(c1.Sirka,  8)" @click="Seznam('zak','','prodejsum')">
                  <button type="button" @click="Seznam('zak','','prodejsum')" style="color:#818185">
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
                    @click="Seznam('zak','','(prodejsum-nakladsum)')"
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
                          @click="Seznam('zak','','obchodnik')"
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
                        <input type="checkbox" v-model="c1.seek_zak_obchodnik" @change="Seznam('zak')" />
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
                          @click="Seznam('zak','','stav')"
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
                        <input type="checkbox" v-model="c1.seek_zak_stav" @change="Seznam('zak')" />
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
                @dblclick="to2Z(polozka);"
                @click="FillFormWait(polozka);c1.aktivni_zak=polozka.idefix"
                style="cursor:pointer"
                :id="'trz_'+polozka.idefix"
                class="hoVer2"
              >
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo}"
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
                  <button @click="FillFormWait(polozka,true)">
                    <i
                      class="el-icon-plus black--text d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                </td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                >{{polozka.cislozakazky}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.firma}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.nazev}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.datumzadani)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.time_update)}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.nakladsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.prodejsum}}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="prava pr-4"
                >{{polozka.prodejsum - polozka.nakladsum }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.obchodnik }}</td>
                <td
                  :class="{'blue lighten-5 elevation-1': polozka.cislozakazky==$refs.w1.form.cislo  , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="leva pl-2"
                >{{polozka.stav }}</td>
              </tr>
            </tbody>
          </table>
        </ta-ble3>
      </div>

      <div
        v-if="c1.obrazovka_zak==2 && c1.MAINMENULAST=='zakazky'  && !f.isEmpty(c1.polozka_zak)"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
        class="stred"
      >
        <!-- {{c1.polozky_zak}} -->
        <div v-if="false" style="position:fixed; top:30em;right:30%;opacity:0.5">
          <span style="color:red; font-size:10em">2Z</span>
        </div>
        <div class="leva pt-0 pb-0">
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="to1Z()">Kniha 1Z</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="to3Z(c1.polozka_zak,1)"
            v-if="!f.isEmpty(c1.polozka_zak)"
          >3Z A</button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
        </div>

        <table style="width:90%;border: solid 1px silver;border-bottom:none">
          <thead>
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
          <tbody>
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
              <td

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
                    @click="polozka2.vzor==0?to3Z(polozka2,2):ZalozitZobrazit(polozka2)"
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
                v-if="false"
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

              <td
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
                        <td style="width:90%">
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
                        <td style="width:10%;text-align:right">
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
              <td
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
              <td
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
              <td
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
              <td
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
              <td
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
              <!--<td class="rborder pr-2">{{polozka2.marze}}</td>!-->
              <td
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

      <div
        v-if="c1.obrazovka_nab==1 && c1.MAINMENULAST=='kalkulace'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
      >
        <!-- Seznam N {{c1.MAINMENULAST}}
        Seznam Z {{c1.MAINMENULAST}}-->
        <div v-if="false" style="position:fixed; top:30em;right:8%;opacity:0.5;z-index:99999999;">
          <span style="color:red; font-size:10em;">1N</span>
        </div>

        <div class="leva cyan lighten-5" :style="f.pof( c1.Sirka,98)" style="position:relative;">
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="to2N(c1.polozka_nab)"
            v-if="!f.isEmpty(c1.polozka_nab)"
          >Polozky 2N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="to3N(c1.polozka_nab,1)"
            v-if="!f.isEmpty(c1.polozka_nab)"
          >3N A</button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
          <span
            class="elevation-0 ml-4 pr-2 pb-0 pt-0"
            style="position:absolute;border-radius:0px 0px 0px 0px;background:#e4eff8;left:10%;"
          >
            <span>
              Rok:
              <input
                v-model="c1.search_nab_rok"
                type="number"
                class="white px-0"
                style="height:15px;font-size:12px;background:white !important;width:4em;border: solid 1px black;font-size:110%"
                @keyup="Seznam('nab')"
              />
              Cislo:
              <input
                v-model="c1.search_nab_cislo"
                type="text"
                class="white px-2"
                style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black;font-size:110%"
                @keyup="Seznam('nab')"
              />
              <input
                v-model="c1.search_nab_cislo2"
                type="hidden"
                class="white px-2"
                style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black;font-size:110%"
              />
              Neco:
              <input
                v-model="c1.search_nab"
                type="text"
                class="white px-2"
                style="height:15px;font-size:12px;background:white !important;width:20em;border: solid 1px black;font-size:110%"
                @keyup="Seznam('nab')"
              />
              <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
              </span>

              <button
                style="border-radius::0px 10px 10px 0px;"
                @click="c1.seek_nab_moje=!c1.seek_nab_moje;Seznam('nab')"
                title="Moje nabazky"
              >
                <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                  <i
                    class="el-icon-user-solid d3"
                    :class="{'green--text': c1.seek_nab_moje , 'orange--text': !c1.seek_nab_moje }"
                    style="font-weight:bold;height:15px;color:#89a4b3"
                  ></i>
                </span>
              </button>
              <button
                style="border-radius::0px 10px 10px 0px;"
                @click="c1.search_nab_cislo='';c1.search_nab_cislo2='';c1.search_nab=''
              c1.seek_nab_obchodnik=false;
              c1.seek_nab_firma=false;
              c1.seek_nab_stav=false;
              ;Seznam('nab')"
                v-if="c1.search_nab_cislo>'' || c1.search_nab>''|| c1.search_nab_cislo2>''"
              >
                <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                  <i
                    class="el-icon-close d3 red--text"
                    style="font-weight:bold;height:15px;color:#89a4b3"
                  ></i>
                </span>
              </button>
            </span>

            <span>
              Naklad: {{f.getCisloInt(c1.seznam_nab_sum[0].naklad)}}
              Prodej: {{f.getCisloInt(c1.seznam_nab_sum[0].prodej)}}
              Zisk: {{f.getCisloInt(c1.seznam_nab_sum[0].zisk)}}
              Marze: {{f.getCislo(c1.seznam_nab_sum[0].marze)}}
              Pocet: {{f.getCisloInt(c1.seznam_nab_sum[0].pocet)}}
              Od: {{f.obdobi(c1.seznam_nab_sum[0]._od)}}-{{f.obdobi(c1.seznam_nab_sum[0]._do)}}
              <table>
                <thead>
                  <th>Pocet</th>
                  <th>{{c1.seznam_nab_sum[0].pocet}}</th>
                  <th>Naklad</th>
                  <th>{{c1.seznam_nab_sum[0].naklad}}</th>
                </thead>
              </table>
            </span>
          </span>
          <!-- <span class="elevation-0 ml-4 pr-2 pb-0 pt-0 " style="position:absolute;border-radius:0px 0px 0px 0px;background:#e4eff8;right:30%">
          {{c1.seznam_nab_sum}}
           Rok:<input    v-model="c1.search_nab_rok"   type="number" class="white px-0 "  style="height:15px;font-size:12px;background:white !important;width:4em;border: solid 1px black"  @keyup="Seznam('nab')">
           Cislo:<input v-model="c1.search_nab_cislo" type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black" @keyup="Seznam('nab')">
            : <input v-model="c1.search_nab_cislo2" type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black" >
           Neco:<input  v-model="c1.search_nab"       type="text" class="white px-2 "  style="height:15px;font-size:12px;background:white !important;width:20em;border: solid 1px black" @keyup="Seznam('nab')" >


           <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
           <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
           </span>

          </span>-->
        </div>

        <ta-ble3
          v-cloak
          :h="'530px;'+f.pof( c1.Sirka,98.1)+';top:0px'"
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
                <th :style="f.pof(c1.Sirka,  4.9)">Ikony</th>
                <th :style="f.pof(c1.Sirka,  4.82)">
                  <button
                    type="button"
                    @click="Seznam('nab','','cislonabidky')"
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
                    Č.nabazky
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
                          @click="Seznam('nab','','firma')"
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
                        <input type="checkbox" v-model="c1.seek_nab_firma" @change="Seznam('nab')" />
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
                          @click="Seznam('nab','','nazev')"
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
                        <input type="checkbox" v-model="c1.seek_nab_nazev" @change="Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
                <th :style="f.pof(c1.Sirka,  8)">
                  <button
                    type="button"
                    @click="Seznam('nab','','datumzadani')"
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
                    @click="Seznam('nab','','time_update')"
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
                  <button type="button" @click="Seznam('nab','','nakladsum')" style="color:#818185">
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
                <th :style="f.pof(c1.Sirka,  8)" @click="Seznam('nab','','prodejsum')">
                  <button type="button" @click="Seznam('nab','','prodejsum')" style="color:#818185">
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
                    @click="Seznam('nab','','(prodejsum-nakladsum)')"
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
                          @click="Seznam('nab','','obchodnik')"
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
                        <input type="checkbox" v-model="c1.seek_nab_obchodnik" @change="Seznam('nab')" />
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
                          @click="Seznam('nab','','stav')"
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
                        <input type="checkbox" v-model="c1.seek_nab_stav" @change="Seznam('nab')" />
                      </td>
                    </tr>
                  </table>
                </th>
              </tr>
            </thead>
          </table>
          <table slot="body" :style="f.pof(c1.Sirka,98.1)">
            <tbody>
              <tr
                v-for="(polozka,idx) in c1.seznam_nab"
                :key="idx"
                @dblclick="to2N(polozka);"
                @click="FillFormWait(polozka);c1.aktivni_nab=polozka.idefix"
                style="cursor:pointer"
                :id="'trn_'+polozka.idefix"
                class="hoVer2"
              >
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo}"
                  :style="f.pof(c1.Sirka, 5)"
                >
                  <button @click="delnab(polozka)">
                    <i
                      class="el-icon-delete black--text d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button @click="FillFormWait(polozka,true)">
                    <i
                      class="el-icon-plus black--text d3"
                      style="font-weight:bold;height:25px;zoom:100%;"
                    ></i>
                  </button>
                </td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                >{{polozka.cislonabidky}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.firma}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.nazev}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.datumzadani)}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="stred pl-2"
                >{{f.datum3(polozka.time_update)}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.nakladsum}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 8)"
                  class="prava pr-4"
                >{{polozka.prodejsum}}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="prava pr-4"
                >{{polozka.prodejsum - polozka.nakladsum }}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka,15)"
                  class="leva pl-2"
                >{{polozka.obchodnik }}</td>
                <td
                  :class="{'green lighten-5 elevation-2': polozka.cislonabidky==$refs.w1.form.cislo , 'sedadel': polozka.nazev=='[[STORNO]]'}"
                  :style="f.pof(c1.Sirka, 5)"
                  class="leva pl-2"
                >{{polozka.stav }}</td>
              </tr>
            </tbody>
          </table>
        </ta-ble3>
      </div>
      <div
        v-if="c1.obrazovka_nab==2 && c1.MAINMENULAST=='kalkulace'"
        slot="kalkulace"
        style="position:fixed;width:100%;top:24em;overflow:scroll;height:70%"
        id="obalKalkulace"
        class="stred"
      >
        <!-- {{c1.polozky_zak}} -->
        <div v-if="false" style="position:fixed; top:30em;right:30%;opacity:0.3">
          <span style="color:red; font-size:10em">2N</span>
        </div>
        <div class="leva pt-0 pb-0">
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" @click="to1N()">Kniha 1N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            @click="to3N(c1.polozka_nab,1)"
            v-if="!f.isEmpty(c1.polozka_nab)"
          >3N A</button>
          <button class="px-4 tlacitkoMenu elevation-2 hoVer" style="visibility:hidden">NICKA</button>
        </div>

        <table
          v-cloak
          style="width:90%;border: solid 1px silver;border-bottom:none"
          :style="f.pof(c1.Sirka,98.1)"
        >
          <thead>
            <tr>
              <th style="width:3em">Ikony</th>
              <th v-if="false" style="width:20em">Text na faktuře</th>
              <th style="width:20em">Práce</th>
              <th style="width:20em">Dodavatel</th>
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
              <th style="width:">{{f.getCisloInt(c1.nab_naklady)}}</th>
              <th style="width:">{{f.getCisloInt(c1.nab_marze)}}</th>
              <th style="width:">{{f.getCisloInt(c1.nab_prodej)}}</th>
              <!-- <th style="width:">Sloupec</th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(polozka2,idx2) in c1.polozky_nab"
              :key="idx2"
              style="cursor:pointer; height:30px; border-bottom:dotted 0px;"
              class="hoVer2"
              @click="polozka2.vzor>-999?c1.aktivni_polozka_nab=polozka2.idefix:false"
              :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999
              ,'ramspodni': polozka2.idefix!==c1.aktivni_polozka_nab && polozka2.vzor >-999
              ,'nerusit': polozka2.nazev.match(/^Pr.zdn.*$/) && c1.aktivni_polozka_nab!==polozka2.idefix
      }"

              :style="polozka2.vzor>-999?'cursor:pointer; height:30px; border-bottom:solid 1px #cccccc;':'height:3px'"
            >
              <!-- :class="{
         'blue lighten-5 ': (polozka2.vzor==2 ) || ( polozka2.vzor==0 && !f.isEmpty(polozka2.obsah) ),
         'green lighten-5 ': (polozka2.vzor==1 && polozka2.idefix_dod==c1.idefix_vlastnik ) || (polozka2.vzor==0 && polozka2.idefix_dod==c1.idefix_vlastnik && f.isEmpty(polozka2.obsah) )
              }"-->
              <td
                :key="'nab'+c1.klikynab+''+idx2"
                class="pl-1"
                style="border-bottom:none"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <div
                  v-else
                  style="height:100%; width:80%%;border-bottom:dotted 1px"
                  class="stred mx-1 pt-4"
                >
                  <span
                    v-if="!f.isEmpty(polozka2.obsah) "
                    class="black--text d3"
                    style="font-weight:bold;height:20px;zoom:100%;"
                    @click="polozka2.vzor==0?to3N(polozka2,2):ZalozitZobrazit(polozka2)"
                  >K</span>
                  <span
                    v-else
                    class="black--text d3"
                    style="font-weight:bold;height:20px;zoom:100%;"
                  >&nbsp;</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <i
                    v-if="polozka2.vzor==0"
                    class="el-icon-delete black--text d3"
                    style="font-weight:bold;height:25px;zoom:100%;"
                    @click="deleteItem('nab',polozka2)"
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
                </div>
              </td>
              <td
                v-if="false"
                class="rborder leva pl-2 pr-2"
                style="border-bottom:none"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="text"
                  v-model="polozka2.nazev"
                  @change="ZmenPolozku('nab',polozka2)"
                  style="height:100%; border-bottom:dotted 0px;"
                  :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                  @focus="c1.aktivni_polozka_nab=polozka2.idefix"
                />
              </td>
              <td
                class="rborder pr-0 pt-1 pl-2 pr-1"
                style="border-bottom:none"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor >-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>

                <div
                  v-else-if="c1.cis_prace.length>=0 && f.isEmpty(polozka2.obsah)"
                  :style="'position:relative;top:1px;left:0em;width:100%;height:100%;border-bottom: dotted 1px silver'"
                  class="leva pl-0"
                >
                  <span style="float: left;width:100%">
                    <table border="0" style="border: solid 0px black;width:100%">
                      <tr>
                        <td style="width:90%">
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
                ;;ZmenPolozku('nab',polozka2)"
                            :disabled="c1.polozka_nab.zamek"
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
                        <td style="width:10%;text-align:right">
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
                        <!-- @change="false?ZmenPolozku('nab',polozka2):true" -->
                        <input
                          type="text"
                          v-model="polozka2.nazev"
                          @change="ZmenPolozku('nab',polozka2)"
                          @focus="c1.aktivni_polozka_nab=polozka2.idefix"
                          style="height:25px; border:dotted 1px silver;font-size:13px"
                          placeholder="Text na fakturu"
                          :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                          class="elevation-0"
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
                        <input
                          type="text"
                          v-model="polozka2.nazev"
                          @change="false?ZmenPolozku('nab',polozka2):true"
                          @focus="c1.aktivni_polozka_nab=polozka2.idefix"
                          style="height:25px; border:dotted 1px silver;font-size:13px"
                          placeholder="Text na fakturu"
                          :style="polozka2.nazev.match(/^Pr.zdn.*$/)?'color:#ccceee':''"
                          class="elevation-0"
                        />
                      </div>
                    </div>
                  </span>
                </div>
              </td>

              <td
                class="rborder pr-0 pt-1 pl-2 pr-1"
                style="border-bottom:none"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <div v-else>
                  <el-select
                    v-model="polozka2.idefix_dod"
                    v-if="c1.cis_dod.length>=0 && f.isEmpty(polozka2.obsah)"
                    filterable
                    no-match-text="Nenalezeno"
                    no-data-text="Cekam na data"
                    default-first-option
                    size="mini"
                    class="pb-0 pl-0 pa-0 ma-0"
                    :style="'position:relative;top:1px;left:1em;width:100%;height:100%'"
                    popper-class="silver lighten-5"
                    placeholder="Dodavatel"
                    @focus="c1.nab_item_active=polozka2"
                    @change="polozka2.vse==1&& polozka2.idefix_dod>0?Sparuj(polozka2):false; polozka2.vse=0
              ;ZmenPolozku('nab',polozka2)"
                    :disabled="c1.polozka_nab.zamek"
                  >
                    <!--
               remote
              :remote-method="CisDodAll"
                    :c1.loading="c1.loading"-->
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
                      >{{ item02.pocet_praci}}</span>
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
                      @keyup="($event.keyCode==13 || $event.keyCode==9 )?ZmenPolozku('nab',polozka2):false"
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
              <td
                class="rborder pr-2"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="number"
                  v-bind:readonly="false && !f.isEmpty(polozka2.obsah)"
                  v-model="polozka2.kcks"
                  @change="polozka2.naklad=polozka2.kcks * polozka2.ks;ZmenPolozku('nab',polozka2,0)"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  @focus="polozka2.vse=0"
                />
              </td>
              <td
                class="rborder pr-2"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="number"
                  v-model="polozka2.ks"
                  @change="polozka2.naklad=polozka2.kcks * polozka2.ks"
                  style="height:100%; border-bottom:dotted 1px;;font-size:120%"
                  class="prava"
                />
                <!-- {{polozka2.ks}} -->
              </td>
              <td
                class="rborder pr-2"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>

                <input
                  v-else
                  type="number"
                  v-model="polozka2.naklad"
                  :readonly="false"
                  style="height:100%; border-bottom:dotted 1px;font-size:120%"
                  class="prava"
                  @change="
          polozka2.kcks=(polozka2.ks>0?polozka2.naklad / polozka2.ks:polozka2.kcks).toFixed(2);
          ZmenPolozku('nab',polozka2,0)"
                />
              </td>
              <td
                class="rborder pr-2"
                :class="{'green lighten-5 elevation-2': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <span v-else>
                  <!-- {{polozka2.prodej - polozka2.naklad}} -->
                  <input
                    type="number"
                    :readonly="true"
                    :value="(polozka2.prodej - polozka2.naklad)"
                    style="height:100%; border-bottom:dotted 1px;font-size:120%"
                    class="prava"
                  />
                </span>
              </td>
              <!--<td class="rborder pr-2">{{polozka2.marze}}</td>!-->
              <td
                class="rborder pr-2"
                :class="{'green lighten-5 elevation-0 ramspodni': polozka2.idefix==c1.aktivni_polozka_nab && polozka2.vzor>-999 , 'black1': polozka2.vzor==-999}"
              >
                <div v-if="polozka2.vzor==-999"></div>
                <input
                  v-else
                  type="number"
                  v-model="polozka2.prodej"
                  style="height:100%; border-bottom:dotted 1px;;font-size:120%"
                  class="prava"
                  @change="ZmenPolozku('nab',polozka2,0)"
                  @focus="c1.aktivni_polozka_nab=polozka2.idefix"
                />
              </td>
            </tr>
          </tbody>
        </table>
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
            @click="to1N()"
          >Kniha 1N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='zakazky'"
            @click="to1Z()"
          >Kniha 1Z</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='kalkulace' && !f.isEmpty(c1.polozka_nab)"
            @click="to2N(c1.polozka_nab)"
          >2N</button>
          <button
            class="px-4 tlacitkoMenu elevation-2 hoVer"
            v-if="c1.MAINMENULAST=='zakazky' && !f.isEmpty(c1.polozka_zak)"
            @click="to2Z(c1.polozka_zak)"
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
                v-if="c1.zobrazit==true || true"
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
          <!--
    <hr>


    <work-but  :ID="'DX_'+10" style="position:relative;left:4px" ></work-but>
    <hr>
    HUHU

    <work-but  :ID="'EE_'+9" style="position:relative;left:4px" ></work-but>
    <hr>
    <work-but  :ID="'FF_'+8" style="position:relative;left:4px" ></work-but>
    <hr>
          //-->
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
import Central from './CalcCentral.js'; // Prehledova dole

// import JQuery from 'jquery'
// let $ = JQuery

export default {
  components: {
    'c1': Central,
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
     'CalcOdkazy': CalcOdkazy
    // 'menu-hlavni': MenuHlavni,
  },
  data() {
    return {
      c1: Central,
      $: $,
      f: f,
      x: _,
      w1: WorkButMenu,




      // url: url,  //Nepouzito
      // dialogVL: false, //Nepouzito

      // VL_LIST: [], //Nepouzito







      aKalkulace: [],  //Pokus odtraneni - pokud pujde vymazat
      aKalkBefore: [],   //Prevedeno lec neodstarnuji zatim
      aKalkAfter: [],  //Prevedeno lec neodstarnuji zatim

      //KalkulaceThis: -1,

      ID: 0,




      /* Prevod 5
      c1.zobrazit: true,
      c1.IDEFIX_VL: 0,
      c1.odkaz: "",
      c1.Left: 0,
      c1.Sirka: 1000,
      c1.drag: false,
      c1.ID2ASK: -1, //id2 z radky z ktere prepinam, modul vrati id2 na zaklade prideleneho idefixu
      c1.MAINMENULAST: "kalkulace",
      c1.NAZEVACTIVE: "",
      c1.TestRend: 0,
      cTable: "",
      c1.ITEM1: [],
      c1.Pocet: 0,
      c1.idRend: 0,
      c1.KalkulaceLast: -1,
      c1.showPrehled: 1,
      c1.CalcCount: 0,
      c1.ColCount: 0,
      c1.aKalkBefore: [],
      c1.aKalkAfter: [],
      c1.lastIdK: -1,
      c1.Hlavni: 0,

      c1.nahledTimeOut: false,
      c1.nahled: false,

      */




/* Prevod 3
      c1.obrazovka_nab: 3,
      c1.obrazovka_zak: 1,

      c1.status: 0, //c1.status pro ulozeni 1 = nova
      c1.status_zak: 0, //c1.status pro ulozeni 1 = nova
      c1.status_nab: 0, //c1.status pro ulozeni 1 = nova

      c1.seznam_zak: [],
      c1.seznam_nab: [],
      c1.seznam_zak_sum: [],
      c1.seznam_nab_sum: [],

      c1.polozky_zak: [],
      c1.polozky_nab: [],

      c1.polozky_zak_add: [],
      c1.polozky_nab_add: [],

      c1.zak_naklady: 0,
      c1.zak_marze: 0,
      c1.zak_prodej: 0,
      c1.nab_naklady: 0,
      c1.nab_marze: 0,
      c1.nab_prodej: 0,
*/




/* prevod 1
      c1.aktivni_zak: 0,
      c1.aktivni_nab: 0,
      c1.aktivni_zak_short: "0",
      c1.aktivni_zak_rok: "0",
      c1.aktivni_nab_short: "0",
      c1.aktivni_nab_rok: "0",
      c1.aktivni_polozka_zak: 0,
      c1.aktivni_polozka_nab: 0,

      c1.polozka_zak: [],
      c1.polozka_nab: [],
      c1.zak_item_active: [],
      c1.nab_item_active: [],
      vllist: "",
    */


/*
      search_zak: "",
      search_nab: "",
      search_zak_rok: "",
      search_nab_rok: "",
      search_zak_cislo: "",
      search_nab_cislo: "",
      search_zak_cislo2: "",
      search_nab_cislo2: "",
      order_zak: "",
      order_nab: "",
      order_zak_default: "idefix",
      order_nab_default: "idefix",
      desc_zak: "",
      desc_nab: "",

      seek_zak_firma: false,
      seek_zak_nazev: false,
      seek_zak_obchodnik: false,
      seek_zak_stav: false,
      seek_zak_moje: false,

      seek_nab_firma: false,
      seek_nab_nazev: false,
      seek_nab_obchodnik: false,
      seek_nab_stav: false,
      seek_nab_moje: false,

      desc_zak_default: " desc ",
      desc_nab_default: " desc ",
      query_zak_last: "",
      query_nab_last: "",
*/




/*

      c1.cis_prace: [],
      c1.cis_dod: [],
      c1.cis_dod_all: [],

      c1.cis_prace_vlastnik: [], //asi to samy jne vlastnik bude na prvni pozici, jestli to chapu dobre
      c1.cis_dod_vlastnik: [],
      c1.idefix_vlastnik: 0,
      c1.idefix_vlastnikPrace: 0,
      c1.loading: false,
      c1.timeout: false,
      c1.timeoutDrag: null,
      c1.klikyzak: 0,
      c1.klikynab: 0,

      //Rizeni - lidi
      c1._Skupiny: "",
      c1._IsObchod: false,
      c1._IsVedeni: false,

      c1.Zacatek: 0,
      c1.StopStav: false,

      IDEFIXACTIVE: "0",
      IDEFIXACTIVELAST: 0,
      IDEFIXACTIVE_ZAK: 0,
      IDEFIXACTIVE_NAB: 0,

    */



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
      //self.setIdefixActive()
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
        self.setZabalit();

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
            self.setRozbalit(self.c1.IDEFIXACTIVE).then(() => {
              f.sleep(1500).then(() => {
                self.setIdefixActive();
                //f.Alert('Rozbalim Za')
              });
            });
          }
          if (self.c1.MAINMENULAST == "zakazky" && self.c1.IDEFIXACTIVE_ZAK > 0) {
            self.c1.IDEFIXACTIVE = self.c1.IDEFIXACTIVE_ZAK;
            self.setRozbalit(self.c1.IDEFIXACTIVE).then(() => {
              f.sleep(1500).then(() => {
                self.setIdefixActive();
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
      this.c1.vllist = await this.IDEFIXS_VL(this.c1.aktivni_zak);
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
    setInterval(function () {
      self.c1.idRend = self.c1.idRend+1
      //console.log(self.c1.idRend)
     },20000) ;
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
      self.Ulozit();
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
      f.log('saveKalkCela')
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
            self.saveZaznam(server, 1); // prepis radky
            //queryKalk.VkladUser(server.data, self.c1.bKalkulace, self.c1.cTable, "", false, server.idefix, SaveKalkulkace )
          } else if (server.idefix == self.c1.IDEFIXACTIVE && server.idefix > 0) {
            //f.Alert(server.idefix , self.c1.IDEFIXACTIVE , " - kalkulace Ano ZDE"  )
            f.log("EMIT 3 ", "SAVEZAZNAM");
            self.saveZaznam(server, 2); //prepis radky a kalkulace
            SaveKalkulkace = true;
            //queryKalk.VkladUser(server.data, self.c1.bKalkulace, self.c1.cTable, "", false, server.idefix, SaveKalkulkace )
          } else if (server.idefix == 0 && self.c1.IDEFIXACTIVE == 0) {
            //f.Alert(server.idefix , self.c1.IDEFIXACTIVE , " - kalkulace Ano , VKLAD ANO KOD 3"  )
            f.log("EMIT 4 ", "SAVEZAZNAM");
            self.saveZaznam(server, 3); //vklad radky i kalkulace
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
              self.Seznam("nab");
              self.FillFormWait(self.c1.polozka_nab);
            } else if (self.c1.MAINMENULAST == "zakazky") {
              self.c1.cTable = "calc_my_" + self.idefix + "_zak" + self.ID;
              self.Seznam("zak");
              self.FillFormWait(self.c1.polozka_zak);
            }

            $("#Zmenad").get(0).value = 0;
            self.$store.dispatch("cleanKalk");
            self.c1.bKalkulace = [];
            self.setZabalit();
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

          self.c1.KalkulaceLast = -1;

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

          f.Alert2("670", server.idefix);

          self.saveVL(server.idefix);
          //self.RozdelKalkulaci(server)
        }
        if (server.key == 671) {
          //Zabaloit polozku

          try {
            self.setVL(server.idefix); //Automaticky pozna zda jde o zabaleni ci rozbaleni podle stavu active
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
    await self.setIdefixActive();
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

      //self.mAlert('Vlezl jsem sem',1000)
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

    await self.Vlastnik();
    await self.VlastnikPrace();
    await self.Seznam("zak");
    await self.CisPraceDod();
    await self.CisDod(0);
    await self.CisDodAll(0);
    var aAkt = [];
    if (self.c1.seznam_zak.length > 0) {
      if (self.c1.aktivni_zak > 0) {
        aAkt = self.c1.seznam_zak.filter(el => {
          return el.idefix * 1 == self.c1.aktivni_zak * 1;
        });
        if (aAkt.length > 0) {
          self.c1.aktivni_zak = aAkt[0].idefix;
          await self.FillFormWait(aAkt[0]);
          if (obrazovkatmp == 2) {
            //alert('polozka zak')
            self.to2Z(self.c1.polozka_zak);
          }
          if (obrazovkatmp == 3) {
            //alert('polozka zak')
            self.to3Z(self.c1.polozka_zak);
          }
          //self.c1.obrazovka_zak=2
        } else {
          self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
          self.FillFormWait(self.c1.seznam_zak[0]);
        }
        //  self.c1.aktivni_zak=self.c1.seznam_zak[0].idefix
      } else {
        self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
        self.FillFormWait(self.c1.seznam_zak[0]);
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
        self.mAlert(
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
    async ZalozitZobrazit(polozka2) {
      const self = this;
      //to3N(polozka2,2)
      //ZmenPolozku('zak',polozka2)
      if (polozka2.nazev.match(/^Pr.zdn.*$/)) {
        polozka2.nazev = "Nova";
        self.ZmenPolozku(
          self.c1.MAINMENULAST == "zakazky" ? "zak" : "nab",
          polozka2
        );
      }
      self.mAlert("Polozka musi byt pred pristupen do kalkulace ulozena");
    },
    async seekzaknab(key, value) {
      const self = this;
      const server = { key: key, value: value };
      if (server.key == "zak") {
        self.c1.search_zak_cislo2 = server.value;
        // self.c1.search_zak_rok=''
        self.$nextTick(function() {
          self.c1.desc_zak = "desc";
          self.Seznam("zak", "", "cislozakazky desc", true).then(() => {
            if (self.c1.seznam_zak.length > 0) {
              self.$refs.w1.form.cislo = self.c1.seznam_zak[0].cislozakazky;
              self.$refs.w1.pocet_nal_zak = self.c1.seznam_zak.length;
              self.FillFormWait(self.c1.seznam_zak[0]);
              var ifx = self.c1.seznam_zak[0].idefix;
              self.c1.aktivni_zak = ifx;
              self.c1.polozky_zak = [];
              Q.all(
                self.idefix,
                `select *,0 as vse,idefix_vl(idefix) as idefix_vl from ${server.key}_t_items where idefix_${server.key}= ${ifx} order by idefix`
              ).then(res => {
                //f.Alert2(f.Jstr(res.data.data))
                self.c1.polozky_zak = res.data.data;
                self.addPol("zak", ifx);
                self.polozky_soucet("zak");
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
          self.Seznam("nab", "", "cislonabidky desc", true).then(() => {
            if (self.c1.seznam_nab.length > 0) {
              self.$refs.w1.form.cislo = self.c1.seznam_nab[0].cislonabidky;
              self.$refs.w1.pocet_nal_nab = self.c1.seznam_nab.length;
              self.FillFormWait(self.c1.seznam_nab[0]);
              var ifx = self.c1.seznam_nab[0].idefix;
              self.c1.aktivni_nab = ifx;
              self.c1.polozky_nab = [];

              Q.all(
                self.idefix,
                `select *,0 as vse,idefix_vl(idefix) as idefix_vl from ${server.key}_t_items where idefix_${server.key}= ${ifx} order by idefix`
              ).then(res => {
                //f.Alert2(f.Jstr(res.data.data))
                self.c1.polozky_nab = res.data.data;
                self.addPol("nab", ifx);
                self.polozky_soucet("nab");
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
    async copyRadek(ifx) {
      const self = this;

      var randTab = "tmp_" + Math.ceil(Math.random() * 91000879);
      var ceho = "";
      var ifx_aktivni;
      if (self.c1.MAINMENULAST == "zakazky") {
        ceho = "zak";
        ifx_aktivni = self.c1.aktivni_zak;
      } else if (self.c1.MAINMENULAST == "kalkulace") {
        ceho = "nab";
        ifx_aktivni = self.c1.aktivni_nab;
      }

      var qC = `create table ${randTab} without oids as select * from ${ceho}_t_items where idefix=${ifx}`;
      await Q.post(self.idefix, qC);

      var qU = `update ${randTab} set idefix_${ceho} = ${ifx_aktivni}, time_insert=now()
     ,time_update=now(),user_insert_idefix=${self.idefix}
     ,user_update_idefix=${self.idefix},idefix= nextval('list2_seq'::regclass),id=nextval('zak_t_items_id_seq'::regclass),status=0`;
      await Q.post(self.idefix, qU);
      var qSpoj = `insert into ${ceho}_t_items select * from ${randTab}`;
      await Q.post(self.idefix, qSpoj);
      var qOprav = `update ${ceho}_t_items set idefix_src=idefix where idefix_src is null or idefix_src!=idefix`;
      await Q.post(self.idefix, qOprav);
      // f.Alert(self.c1.cTable)

      if (self.c1.MAINMENULAST == "zakazky") {
        f.log("DROP CALC Z", self.idefix);
        await Q.create_tmp_zak(self.idefix, sef.c1.cTable, ifx_aktivni);

        //await Q.post(self.idefix,`select drop_tmp(${self.idefix});`)

        //await Q.post(self.idefix,`drop table if exists ${self.c1.cTable}`)
        //await Q.post(self.idefix,`create table  ${self.c1.cTable} without oids as select * from ${ceho}_t_items where idefix_zak=${ifx_aktivni}`)
        //await Q.post(self.idefix,`create sequence ${self.c1.cTable}_seq`)

        //await Q.post(self.idefix,`alter table  ${self.c1.cTable}  alter column id set default nextval('${self.c1.cTable}_seq'::regclass ) `)
        //await Q.post(self.idefix,`alter table  ${self.c1.cTable}  alter column idefix set default  nextval('list2_seq'::regclass) `)
        //nextval('calc_my_9_zak_seq'::regclass)
        // nextval('list2_seq'::regclass)

        self.c1.polozky_zak = (
          await Q.all(
            self.idefix,
            `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${ifx_aktivni} order by idefix`
          )
        ).data.data;
        self.addPol("zak", polozka.idefix);
        self.polozky_soucet("zak");
      } else if (self.c1.MAINMENULAST == "kalkulace") {
        await Q.post(self.idefix, `drop table if exists ${self.c1.cTable}`);
        await Q.post(
          self.idefix,
          `create table  ${self.c1.cTable} without oids as select * from ${ceho}_t_items where idefix_zak=${ifx_aktivni}`
        );
        await Q.post(
          self.idefix,
          `alter table  ${self.c1.cTable}  alter column id set default nextval('${self.c1.cTable}_seq'::regclass ) `
        );
        await Q.post(
          self.idefix,
          `alter table  ${self.c1.cTable}  alter column idefix set default  nextval('list2_seq'::regclass) `
        );

        self.c1.polozky_nab = (
          await Q.all(
            self.idefix,
            `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${ifx_aktivni} order by idefix`
          )
        ).data.data;
        self.addPol("nab", polozka.idefix);
        self.polozky_soucet("nab");
      }

      //   f.Alert2(qC)
      //     return
      //f.Alert(ifx+' 2387 ', randTab)
    },
    async Sparuj(polo) {
      const self = this;

      if (polo.idefix_prace > 0 && polo.idefix_dod > 0) {
        var qOvar = `select * from list_firmaprace  where idefix_firma=${polo.idefix_dod} and idefix_prace = ${polo.idefix_prace} `;
        var afound = (await Q.all(self.idefix, qOvar)).data.data;
        if (afound.length == 0) {
          this.$confirm("Novy vztah prace  - dodavatel ", "Vlozit ?", {
            distinguishCancelAndClose: true,
            confirmButtonText: "Ano?",
            cancelButtonText: "Ne"
          }).then(() => {
            var qInsert = `insert into list_firmaprace (idefix_firma , idefix_prace ,        time_insert        , time_update         , user_insert_idefix , user_update_idefix )
        values (
          ${polo.idefix_dod} , ${polo.idefix_prace}, now(),now(), ${self.idefix}, ${self.idefix}
        )
       `;
            Q.post(self.idefix, qInsert).then(() => {
              self.CisDod(0);
              self.CisDodAll(0);
              self.CisPraceDod();
              f.Alert("Vlozeno");
            });
          });
        }
        self.mAlert(f.Jstr(afound));
      } else {
      }

      return true;
    },
    filterPrace(polozka, radekDod) {
      const self = this;
      var lRet = false;

      if (polozka.idefix_dod == 0) {
        lRet = true;
      }
      if (polozka.idefix_dod > 0) {
        console.log(radekDod.prace_seznam);
        radekDod.dod_seznam.forEach(el2 => {
          if (el2 == polozka.idefix_dod) {
            lRet = true;
            return;
          }
        });
      }
      return lRet;
    },
    filterDod(polozka, radekDod) {
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
    async deleteItem(ceho = "zak", polozka) {
      const self = this;
      this.$confirm("Vymazat zaznam ", polozka.nazev, {
        distinguishCancelAndClose: true,
        confirmButtonText: "Ano?",
        cancelButtonText: "Ne"
      }).then(() => {
        self.deleteItemRun(ceho, polozka);
      });
    },
    async deleteItemRun(ceho = "zak", polozka) {
      const self = this;
      var idefix_ceho = ceho == "zak" ? polozka.idefix_zak : polozka.idefix_nab;
      var b = await Q.post(
        self.idefix,
        `delete from ${ceho}_t_items where idefix = ${polozka.idefix} and vzor=0`
      );
      //f.Alert2(`delete from ${ceho}_t_items where idefix = ${polozka.idefix} and vzor=0`)
      if (ceho == "zak") {
        self.c1.polozky_zak = (
          await Q.all(
            self.idefix,
            `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${idefix_ceho} order by idefix`
          )
        ).data.data;

        self.polozky_soucet("zak");

        self.c1.klikyzak++;
      }
      if (ceho == "nab") {
        self.c1.polozky_nab = (
          await Q.all(
            self.idefix,
            `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${idefix_ceho} order by idefix`
          )
        ).data.data;

        self.polozky_soucet("nab");
        self.c1.klikynab++;
      }

      await self.addPol(ceho, idefix_ceho);
      //await f.sleep(1000)
    },

    async delzak(polozka) {
      const self = this;
      if (polozka.nazev == "[[STORNO]]") {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Jiz bylo stornovano`,
          type: "error",
          offset: 100,
          duration: 5000
        });
        return;
      }
      if (!f.Confirm(`Storno pro  ${polozka.cislozakazky} ?`)) {
        return;
      }

      var q0 = `update zak_t_items set prodej = 0 where idefix_zak = ${polozka.idefix} ;`;
      var q = `${q0} ; update zak_t_list set nazev = '[[STORNO]]' where idefix = ${polozka.idefix}`;
      var b = await Q.post(self.idefix, q);

      await self.Seznam("zak");
      setTimeout(function() {
        self.$refs.w1.form.nazev = "[[STORNO]]";
      }, 500);

      this.$notify({
        title: self.c1.MAINMENULAST,
        message: `Zakazka ${polozka.cislozakazky} byla stornovana`,
        type: "error",
        offset: 100,
        duration: 5000
      });

      //f.Alert2(f.Jstr(polozka))
    },
    async delnab(polozka) {
      const self = this;
      if (polozka.nazev == "[[STORNO]]") {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Jiz bylo stornovano`,
          type: "error",
          offset: 100,
          duration: 5000
        });
        return;
      }
      if (!f.Confirm(`Storno pro  ${polozka.cislonabidky} ?`)) {
        return;
      }
      //     alert('delzak')
      var q0 = `update nab_t_items set prodej = 0 where idefix_nab = ${polozka.idefix} ;`;
      var q = `${q0} ; update nab_t_list set nazev = '[[STORNO]]' where idefix = ${polozka.idefix}`;

      var b = await Q.post(self.idefix, q);
      self.Seznam("nab");
      setTimeout(function() {
        self.$refs.w1.form.nazev = "[[STORNO]]";
      }, 500);

      this.$notify({
        title: self.c1.MAINMENULAST,
        message: `Zakazka ${polozka.cislonabidky} byla stornovana`,
        type: "error",
        offset: 100,
        duration: 5000
      });

      //f.Alert2(q, f.Jstr(polozka))
    },

    async cleanItems(polozka) {
      const self = this;
      var typ = "zak";
      var idfx = 0;

      if (self.c1.MAINMENULAST == "zakazky") {
        typ = "zak";
        idfx = polozka.idefix;
      }
      if (self.c1.MAINMENULAST == "kalkulace") {
        typ = "nab";
        idfx = polozka.idefix;
      }
      if (f.isEmpty(idfx)) {
        //alert('ted ne')
        return;
      }
      var qb = `drop table if exists ${self.c1.cTable} ;drop sequence if exists ${self.c1.cTable}_seq
         ;create sequence ${self.c1.cTable}_seq
         ;create table ${self.c1.cTable} without oids  as select * from ${typ}_t_items where idefix_${typ} = ${idfx}

         ;alter table ${self.c1.cTable} alter idefix  set default nextval('list2_seq')
         ;alter table ${self.c1.cTable} alter id set default nextval('${self.c1.cTable}_seq')
        `;
      //f.Alert2(f.Jstr(polozka))
      //var qb=`create table ${self.c1.cTable} without oids  as select * from zak_t_items where idefix_zak = ${polozka.idefix}`

      var b = await Q.post(self.idefix, qb);
    },
    async FillFormWait(polozka, nova = false) {
      const self = this;
      self.$store.dispatch("cleanKalk");
      self.c1.bKalkulace = [];
      await self.cleanItems(polozka);
      await self.FillForm(polozka);

      if (self.c1.timeout && nova == false) {
        clearTimeout(self.c1.timeout);
        self.c1.timeout = false;
        return;
      }
      self.c1.timeout = setTimeout(function() {
        self.FillForm(polozka);
        if (nova == true) {
          //nova upravou
          setTimeout(function() {
            self.Nova(true);
            if (self.c1.MAINMENULAST == "zakazky") {
              self.$notify({
                title: self.c1.MAINMENULAST,
                message: `Zalozena nova pro upravou z ${polozka.cislozakazky}`,
                type: "error",
                offset: 100,
                duration: 5000
              });
            }
            if (self.c1.MAINMENULAST == "kalkulace") {
              self.$notify({
                title: self.c1.MAINMENULAST,
                message: `Zalozena nova pro upravou z ${polozka.cislonabidky}`,
                type: "error",
                offset: 100,
                duration: 5000
              });
            }

            //f.Alert('Nova Up')
          }, 100);
        }
        //console.log("Render col ", self.c1.TestRend )
      }, 500);
    },
    async FillForm(polozka) {
      const self = this;

      self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
      //self.$refs.w1.aFirma=   await SQL.getFirmaOsoba(polozka.idefix_firma)
      self.$refs.w1.aFirma = await SQL.getFirma(
        polozka.idefix_firma,
        "",
        100000
      );

      self.$refs.w1.form.osoba = "";
      if (self.c1.MAINMENULAST == "zakazky") {
        self.$refs.w1.form.cislo = polozka.cislozakazky;

        self.c1.polozka_zak = polozka;
        //f.Alert2('A',f.Jstr(self.c1.polozka_zak.zamek))
        //return
        self.c1.status_zak = 2;
      } else if (self.c1.MAINMENULAST == "kalkulace") {
        self.$refs.w1.form.cislo = polozka.cislonabidky;
        self.c1.polozka_nab = polozka;
        self.c1.status_nab = 2;
      }

      self.$refs.w1.form.idefix = polozka.idefix;
      self.$refs.w1.form.nazev = polozka.nazev;
      self.$refs.w1.form.idefix_firma = polozka.idefix_firma;
      self.$refs.w1.form.idefix_firmaosoba = polozka.idefix_firmaosoba;
      self.$refs.w1.form.nazevfirmy = polozka.firma;
      self.$refs.w1.form.idefix_obchodnik = polozka.idefix_obchodnik;
      self.$refs.w1.form.idefix_produkce = polozka.idefix_produkce;
      self.$refs.w1.form.obchodnik = polozka.obchodnik;
      self.$refs.w1.form.produkce = polozka.produkce;
      self.$refs.w1.form.osoba = polozka.osoba;

      self.$refs.w1.form.splatnost = polozka.splatnost;
      self.$refs.w1.form.hotovost = polozka.hotovost;
      self.$refs.w1.form.stav = polozka.stav;

      self.$refs.w1.form.datumzadani = f.datum20(polozka.datumzadani);
      self.$refs.w1.form.datumexpedice = f.datum3(polozka.datumexpedice);

      self.$refs.w1.form.vyrobapopis_print = (
        polozka.vyrobapopis_print + ""
      ).replace("null", "");
      self.$refs.w1.form.poznamky = (polozka.poznamky + "").replace("null", "");

      if (self.$refs.w1.aOsoba.length > 0) {
        if (self.$refs.w1.aOsoba.length == 1) {
          self.$refs.w1.form.idefix_firmaosoba = self.$refs.w1.aOsoba[0].idefix;
          self.$refs.w1.form.osoba = self.$refs.w1.aOsoba[0].nazev;
        }
        // f.Alert(self.$refs.w1.form.idefix_firmaosoba, " ", f.Jstr(self.$refs.w1.aOsoba), f.Jstr(polozka) )
        setTimeout(function() {
          $("#" + self.$refs.w1.fields["osoba"]["nazev"]).focus();
        }, 1000);
      }
    },
    async addPol(ceho = "zak", idefix_zaknab = -1) {
      const self = this;
      var addPol = [];
      var addEmpty = {};

      addPol = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from ${ceho}_t_items where vzor>=1 order by idefix_dod desc limit 2`
        )
      ).data.data;
      //Pridatprazdnou radku

      addPol.forEach(el => {
        if (ceho == "zak") {
          el.idefix_zak = idefix_zaknab;
          if (
            _.findIndex(self.c1.polozky_zak, function(o) {
              return o.vzor == -999;
            }) == -1
          ) {
            addEmpty = f.Jparse(el);
            addEmpty.nazev = "XXXXX";
            addEmpty.idefix *= -1;
            addEmpty.obsah = [];
            //addEmpty.idefix_zak=-999
            addEmpty.idefix_dod = -999;
            addEmpty.idefix_prace = -999;
            addEmpty.vzor = -999;
            self.c1.polozky_zak.push(addEmpty);

            //f.Alert(f.Jstr(self.c1.polozky_zak))
            //f.Alert(f.Jstr(el))
          }
          if (
            _.findIndex(self.c1.polozky_zak, function(o) {
              return o.nazev == el.nazev && o.idefix_dod == el.idefix_dod;
            }) == -1
          ) {
            self.c1.polozky_zak.push(el);
          }
        } else if (ceho == "nab") {
          el.idefix_nab = idefix_zaknab;
          if (
            _.findIndex(self.c1.polozky_nab, function(o) {
              return o.vzor == -999;
            }) == -1
          ) {
            addEmpty = f.Jparse(el);
            addEmpty.nazev = "AAAAAA";
            addEmpty.idefix *= -1;
            addEmpty.obsah = [];
            //addEmpty.idefix_zak=-999
            addEmpty.idefix_dod = -999;
            addEmpty.idefix_prace = -999;
            addEmpty.vzor = -999;
            self.c1.polozky_nab.push(addEmpty);
            // f.Alert(f.Jstr(addEmpty))
            //f.Alert(f.Jstr(self.c1.polozky_zak))
            //f.Alert(f.Jstr(el))
          }
          if (
            _.findIndex(self.c1.polozky_nab, function(o) {
              return o.nazev == el.nazev && o.idefix_dod == el.idefix_dod;
            }) == -1
          ) {
            self.c1.polozky_nab.push(el);
          }
        }
      });
    },
    async to1Z() {
      const self = this;
      //f.Alert(self.c1.status_zak)
      if (
        self.$refs.w1.form.cislo > 0 &&
        self.c1.obrazovka_zak == 3 &&
        self.c1.status_zak == 2
      ) {
        await self
          .Ulozit()
          .then(() => {
            //     alert('bobry')
          })
          .catch(e => {
            f.Alert2("Chyba 1", e);
            self.c1.obrazovka_zak = 1;
          });
        //         await self.to2N(self.c1.polozka_nab)
        //       await f.sleep(3000)
      }
      if (
        self.c1.order_zak != self.c1.order_zak_default &&
        self.c1.query_zak_last > ""
      ) {
        self.c1.query_zak_last = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;
        var q = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;

        self.c1.order_zak = self.c1.order_zak_default;
        self.c1.desc_zak = self.c1.desc_zak_default;
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");

        self.c1.seznam_zak = (await Q.all(self.idefix, q)).data.data;
      }

      if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
        this.$confirm(
          "Zrusit zakladni nove zakazky ? " + self.c1.aktivni_zak,
          "",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "Ano?",
            cancelButtonText: "Ne"
          }
        ).then(() => {
          self.c1.obrazovka_zak = 1;

          eventBus.$emit("SavedZN", {
            id: self.c1.MAINMENULAST,
            // cislo: c.cislo,
            // exp: c.exp,
            // prod: self.idefix,
            // prod_txt : c.produkce,
            // zadani:c.zadani,
            status_zak: 0,
            status_nab: self.c1.status_nab
          });

          if (self.c1.aktivni_zak > 0) {
            //document.getElementById('trn_'+self.c1.aktivni_zak)
            var bck_aktivni = self.c1.aktivni_zak;
            self.c1.query_zak_last = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;
            var q = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;

            //self.c1.query_zak_last,
            //f.Alert2("1",self.c1.order_zak,q)
            self.c1.order_zak = self.c1.order_zak_default;
            self.c1.desc_zak = self.c1.desc_zak_default;
            q = q.replace("  ", "");
            q = q.replace("  ", "");
            q = q.replace("  ", "");
            q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
            //self.c1.seznam_zak = (await Q.all(self.idefix,q)).data.data
            Q.all(self.idefix, q).then(res => {
              if (!f.isEmpty(res.data.data)) {
                self.c1.seznam_zak = res.data.data;
                self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
                self.FillFormWait(self.c1.seznam_zak[0]);
              }
            });

            /*
            setTimeout(function(){
              f.Alert("huhu 2",self.c1.aktivni_zak )
              self.seekzaknab('zak', self.c1.aktivni_zak);

              return
              if ( document.getElementById('trz_'+self.c1.aktivni_zak) ){
                  document.getElementById('trz_'+self.c1.aktivni_zak).click()


                 //f.Alert('trn_'+self.c1.aktivni_zak, document.getElementById('trz_'+self.c1.aktivni_zak)  )
              }

            },1000)
          */
          }
        });
      } else {
        self.c1.obrazovka_zak = 1;
      }
    },
    async to1N() {
      const self = this;

      if (
        self.$refs.w1.form.cislo > 0 &&
        self.c1.obrazovka_nab == 3 &&
        self.c1.status_nab == 2
      ) {
        await self
          .Ulozit()
          .then(() => {
            //     alert('bobry')
          })
          .catch(e => {
            f.Alert2("hyba", e);
            self.c1.obrazovka_nab = 1;
          });
        //         await self.to2N(self.c1.polozka_nab)
        //       await f.sleep(3000)
      }

      if (self.c1.MAINMENULAST == "kalkulace" && self.c1.status_nab == 1) {
        this.$confirm("Zrusit zakladni nove kalkulace ? ", "", {
          distinguishCancelAndClose: true,
          confirmButtonText: "Ano?",
          cancelButtonText: "Ne"
        }).then(() => {
          self.c1.obrazovka_nab = 1;
          eventBus.$emit("SavedZN", {
            id: self.c1.MAINMENULAST,
            // cislo: c.cislo,
            // exp: c.exp,
            // prod: self.idefix,
            // prod_txt : c.produkce,
            // zadani:c.zadani,
            status_zak: self.c1.status_zak,
            status_nab: 0
          });

          if (self.c1.aktivni_nab > 0) {
            setTimeout(function() {
              if (document.getElementById("trn_" + self.c1.aktivni_nab)) {
                document.getElementById("trn_" + self.c1.aktivni_nab).click();
              }
            }, 1000);
          }
        });
      } else {
        self.c1.obrazovka_nab = 1;
      }
    },
    async to2Z(polozka) {
      const self = this;
      var ceho = "";
      var b = "";
      var b2 = "";
      var qoprava = "";
      var qoprava2 = "";
      self.c1.StopStav = false;
      if (self.c1.MAINMENULAST == "kalkulace") {
        ceho = "nab";
      } else if (self.c1.MAINMENULAST == "zakazky") {
        ceho = "zak";
      }

      var qoprava = `update ${self.c1.cTable} set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${self.c1.cTable} ) a where rn >1 and radek > 1 order by id
    )
    ;`;
      var b = await Q.post(self.idefix, qoprava);
      var qoprava2 = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
    )
    ;`;

      if (self.c1.obrazovka_zak == 3) {
        await self.Ulozit();
        var b2 = await Q.post(self.idefix, qoprava2);
        await f.sleep(200).then(() => {
          Q.all(
            self.idefix,
            `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix} order by idefix`
          )
            .then(res => {
              self.c1.polozky_zak = res.data.data;
              self.polozky_soucet("zak");
            })
            .then(() => {
              self.addPol("zak", polozka.idefix);
            })
            .then(() => {
              self.c1.obrazovka_zak = 2;
            });
        });

        return;
      }
      if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
        this.$confirm("Zrusit zakladni nove zakazky ? ??", "", {
          distinguishCancelAndClose: true,
          confirmButtonText: "Ano?",
          cancelButtonText: "Ne"
        }).then(() => {
          self.c1.obrazovka_zak = 1;

          eventBus.$emit("SavedZN", {
            id: self.c1.MAINMENULAST,
            // cislo: c.cislo,
            // exp: c.exp,
            // prod: self.idefix,
            // prod_txt : c.produkce,
            // zadani:c.zadani,
            status_zak: 0,
            status_nab: self.c1.status_nab
          });

          if (self.c1.aktivni_zak > 0) {
            //document.getElementById('trn_'+self.c1.aktivni_zak)
            setTimeout(function() {
              if (document.getElementById("trz_" + self.c1.aktivni_zak)) {
                document.getElementById("trz_" + self.c1.aktivni_zak).click();

                //f.Alert('trn_'+self.c1.aktivni_zak, document.getElementById('trz_'+self.c1.aktivni_zak)  )
              }
            }, 1000);
          }
        });

        return;
      } else {
        self.c1.obrazovka_zak = 1;
      }

      if (self.c1.obrazovka_zak == 3) {
        alert("Jonea neeee?");
        await self.Ulozit();
        await f.sleep(1000);
      }

      self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
      if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
        self.c1.status_zak = 2;
        self.c1.obrazovka_zak = 2;
        //update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null  where idefix in ( 67198, 67199 ) ;
        //update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null  where idefix in ( 67156, 67157 ) ;
        //update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67157 ) ;
        //update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67199 ) ;
        //update zak_t_items  set nazev='Prázdný s',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=2  where idefix in (  135369 ) ;
        //update nab_t_items  set nazev='Prázdný s',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=2  where idefix in (  135371 ) ;

        self.updateDefault(); //oprava dodavatele
        self.c1.polozky_zak = (
          await Q.all(
            self.idefix,
            `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix} order by idefix`
          )
        ).data.data;
        self.polozky_soucet("zak");
        self.addPol("zak", polozka.idefix);

        await self.FillForm(polozka);
        //self.$refs.w1.form.osoba   = polozka.idefix_firma
        //f.Alert(polozka.idefix, f.Jstr(polozka))
      } else {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Chyba pri nacteni polozek`,
          type: "error",
          offset: 100,
          duration: 5000
        });
      }
    },
    async updateDefault() {
      const self = this;
      if (self.c1.idefix_vlastnik > 0 && self.c1.idefix_vlastnikPrace > 0) {
        var q = `update zak_t_items set idefix_dod=${self.c1.idefix_vlastnik}, idefix_prace= ${self.c1.idefix_vlastnikPrace} where obsah::text  ~*  '[a-z]'
             and (idefix_dod is null  or idefix_prace!=${self.c1.idefix_vlastnikPrace} or idefix_dod!=${self.c1.idefix_vlastnik}) or idefix_prace is null    `;

        var a = await Q.post(self.idefix, q);
      }
    },

    async to3N(polozka, odkud = 1) {
      const self = this;
      var idfx = 0;
      var idfxKalkulace = 0;
      var presun = true;
      console.log("3N  ", f.Jstr(polozka));
      if (odkud == 1 && self.c1.aktivni_polozka_nab > 0) {
        //Polozka vybarna, pristup pres tlacitko nahore
        self.c1.polozky_nab.forEach(el => {
          if (el.idefix == self.c1.aktivni_polozka_nab) {
            if (el.obsah > "") {
              //f.Alert2(f.Jstr(el) ) ;
              polozka = el;
              odkud = 2;
              return;
            }
          }
        });
      }

      if (odkud == 2) {
        //f.Alert2('2 --  ',f.Jstr(polozka.idefix_dod), '::',  self.c1.idefix_vlastnik)

        if (polozka.idefix_dod == self.c1.idefix_vlastnik) {
          presun = true;
        } else if (
          polozka.idefix_dod != self.c1.idefix_vlastnik &&
          polozka.obsah.length > 0
        ) {
          polozka.idefix_dod = self.c1.idefix_vlastnik;
          presun = true;
        } else {
          presun = false;
          f.Alert(
            polozka.idefix_dod,
            self.c1.idefix_vlastnik,
            polozka.obsah.length
          );
          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Pro cizi dodavatele nejsou  kalkulacek dispozici`,
            type: "error",
            offset: 100,
            duration: 5000
          });
          return;
        }

        idfxKalkulace = polozka.idefix;
        idfx = polozka.idefix_nab;
      } else if (odkud == 1) {
        idfx = polozka.idefix;
      }
      //f.Alert('3 --  ', idfx)
      if (presun == true) {
        self.c1.obrazovka_nab = 3;
        await self.to3(polozka, "nab", idfx, idfxKalkulace);
      } else {
      }
    },

    async to3Z(polozka, odkud = 1) {
      const self = this;
      var idfx = 0;
      var idfxKalkulace = 0;
      var presun = true;
      self.c1.StopStav = false;
      if (self.c1.MAINMENULAST == "zakazky" && self.c1.aktivni_zak > 0) {
        var q = `select rok(cislozakazky) as rok,cislo(cislozakazky) as cislo, cislozakazky from zak_t_list  where idefix = ${self.c1.aktivni_zak} `;
        var aneco = (await Q.all(self.idefix, q)).data.data;
        self.c1.aktivni_zak_short = aneco[0].cislo;
        self.c1.aktivni_zak_rok = aneco[0].rok;

        //var b2 = (await Q.post(self.idefix,qoprava2))
        // f.Alert2('v poho', q, f.Jstr(aneco))
      }

      if (self.c1.MAINMENULAST == "kalkulace" && self.c1.aktivni_nab > 0) {
        var q = `select rok(cislonabidky) as rok,cislo(cislonabidky) as cislo, cislonabidky from nab_t_list  where idefix = ${self.c1.aktivni_nab} `;
        var aneco = (await Q.all(self.idefix, q)).data.data;
        self.c1.aktivni_nab_short = aneco[0].cislo;
        self.c1.aktivni_nab_rok = aneco[0].rok;
        //var b2 = (await Q.post(self.idefix,qoprava2))
        //f.Alert2('v poho', q, f.Jstr(aneco))
      }

      if (odkud == 1 && self.c1.aktivni_polozka_zak > 0) {
        //Polozka vybarna, pristup pres tlacitko nahore
        self.c1.polozky_zak.forEach(el => {
          if (el.idefix == self.c1.aktivni_polozka_zak) {
            if (el.obsah > "") {
              //f.Alert2(f.Jstr(el) ) ;
              polozka = el;
              odkud = 2;
              return;
            }
          }
        });
      }

      if (odkud == 2) {
        //Polozky
        if (polozka.idefix_dod == self.c1.idefix_vlastnik) {
          presun = true;
        } else {
          presun = false;
          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Pro cizi dodavatele nejsou  kalkulacek dispozici`,
            type: "error",
            offset: 100,
            duration: 5000
          });
          return;
        }
        idfxKalkulace = polozka.idefix;
        idfx = polozka.idefix_zak;
      } else if (odkud == 1) {
        idfx = polozka.idefix;
      }
      if (presun == true) {
        self.c1.obrazovka_zak = 3;
        await self.to3(polozka, "zak", idfx, idfxKalkulace);
      } else {
      }
    },
    async to3(polozka, typ = "zak", idfx = 0, idfxKalkulace) {
      const self = this;

      //      f.Alert('to3  ', idfx)

      //eventBus.$emit('MenuHlavni', {key: 666 })
      //if ()
      self.$store.dispatch("cleanKalk");
      self.c1.bKalkulace = [];
      self.c1.aKalkBefore = [];
      self.c1.aKalkAfter = [];
      this.$store.dispatch("setKalk", -1);
      self.c1.KalkulaceLast = -1;
      self.c1.IDEFIXACTIVE = 0;

      //eventBus.$emit(666)
      //var a = (await Q.post(self.idefix,`drop table if exists ${self.c1.cTable}`))
      //;create table ${self.c1.cTable} without oids as select * from calc_templates limit 0
      //  ;alter table ${self.c1.cTable} add poradi serial
      //  ;alter table ${self.c1.cTable} add active bool default false
      //  ;alter table ${self.c1.cTable} add idefix_src bigint default 0
      var qb = `drop table if exists ${self.c1.cTable} ;drop sequence if exists ${self.c1.cTable}_seq
         ;create sequence ${self.c1.cTable}_seq
         ;create table ${self.c1.cTable} without oids  as select * from ${typ}_t_items where idefix_${typ} = ${idfx}

         ;alter table ${self.c1.cTable} alter idefix  set default nextval('list2_seq')
         ;alter table ${self.c1.cTable} alter id set default nextval('${self.c1.cTable}_seq')
        `;
      //f.Alert2(f.Jstr(polozka))
      //var qb=`create table ${self.c1.cTable} without oids  as select * from zak_t_items where idefix_zak = ${polozka.idefix}`

      var b = await Q.post(self.idefix, qb);
      //f.Alert2( qb);
      self.c1.aKalkBefore = []; // 1.JARDA
      f.log("5 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

      //f.Alert(f.Jstr(self.c1.aKalkBefore))
      await self.setZabalit();
      if (idfxKalkulace > 0) {
        await self.setRozbalit(idfxKalkulace);
      }

      $("#Zmenad").get(0).value = 0;

      // f.Alert2('3Z?', qb)
    },

    async to2N(polozka) {
      const self = this;
      var ceho = "";
      var b = "";
      var b2 = "";
      var qoprava = "";
      var qoprava2 = "";
      if (self.c1.MAINMENULAST == "kalkulace") {
        ceho = "nab";
      } else if (self.c1.MAINMENULAST == "zakazky") {
        ceho = "zak";
      }

      var qoprava = `update ${self.c1.cTable} set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${self.c1.cTable} ) a where rn >1 and radek > 1 order by id
    )
    ;`;
      var b = await Q.post(self.idefix, qoprava);
      var qoprava2 = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
    )
    ;`;

      if (self.c1.obrazovka_nab == 3) {
        await self.Ulozit();
        var b2 = await Q.post(self.idefix, qoprava2);
        await f
          .sleep(200)

          .then(() => {
            Q.all(
              self.idefix,
              `select *,0 as vse from nab_t_items where idefix_nab= ${polozka.idefix} order by idefix`
            )
              .then(res => {
                self.c1.polozky_nab = res.data.data;
                self.polozky_soucet("nab");
              })
              .then(() => {
                self.addPol("nab", polozka.idefix);
              })
              .then(() => {
                self.c1.obrazovka_nab = 2;
                //f.Alert(self.c1.aktivni_polozka_nab)
              });
          });

        return;
      }
      self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
      //alert(self.c1.obrazovka_zak)

      if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
        self.c1.status_nab = 2;
        self.c1.obrazovka_nab = 2;

        self.c1.polozky_nab = (
          await Q.all(
            self.idefix,
            `select *,0 as vse from nab_t_items where idefix_nab= ${polozka.idefix}`
          )
        ).data.data;
        self.polozky_soucet("nab");
        self.addPol("nab", polozka.idefix);
        await self.FillForm(polozka);
        // var clean=  (await Q.post(self.idefix,`truncate table ${self.c1.cTable}`))
        // self.$store.dispatch('cleanKalk')
        // self.c1.bKalkulace=[]

        //self.$refs.w1.form.osoba   = polozka.idefix_firma
        //f.Alert(polozka.idefix, f.Jstr(polozka))
      } else {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Chyba pri nacteni polozek`,
          type: "error",
          offset: 100,
          duration: 5000
        });
      }
    },
    async Ulozit(kod = "") {
      const self = this;
      var ceho = "";
      var qoprava = "";
      var qoprava2 = "";
      var b = "";
      //return
      f.log("ULOZIT LOG 1");

      //f.Alert(self.c1.IDEFIXACTIVE, self.c1.bKalkulace.length)
      if (self.c1.MAINMENULAST == "kalkulace") {
        ceho = "nab";
      } else if (self.c1.MAINMENULAST == "zakazky") {
        ceho = "zak";
      }

      qoprava = `update ${self.c1.cTable} set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${self.c1.cTable})  a where rn >1 and radek > 1 order by id
    )
    ;`;
      b = await Q.post(self.idefix, qoprava);

      //f.Alert2(qoprava)

      qoprava2 = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
    )
    ;`;
      b = await Q.post(self.idefix, qoprava2);
      //f.Alert2(qoprava)

      var b = await Q.post(self.idefix, qoprava);
      if (self.c1.obrazovka_nab == 3 && self.c1.MAINMENULAST == "kalkulace") {
        await self.setVL(self.c1.IDEFIXACTIVE, 1);
      }
      if (self.c1.obrazovka_zak == 3 && self.c1.MAINMENULAST == "zakazky") {
        await self.setVL(self.c1.IDEFIXACTIVE, 1);
      }

      var data2 = self.$refs.w1.form;
      var q1 = "";
      var _idefix = 0;
      if (kod == "n") {
        self.c1.MAINMENULAST = "kalkulace";
        self.c1.status_nab = 1; // Save AS nb - zakazku - zmena c1.statusu na vklad
        eventBus.$emit("setmenu", { setmenu: "kalkulace" });
      } else if (kod == "z") {
        self.c1.MAINMENULAST = "zakazky";
        self.c1.status_zak = 1; // Save AS nb - zakazku - zmena c1.statusu na vklad
        eventBus.$emit("setmenu", { setmenu: "zakazky" });
      }
      this.$notify({
        title: `Kod kliku: ${kod} ${self.c1.MAINMENULAST}`,
        message: `Status kliku : Zak:   ${self.c1.status_zak} Nab:  ${self.c1.status_nab} `,
        type: "success",
        offset: 100,
        duration: 2000
      });

      if (true || self.c1.status_zak == 2) {
        if (self.c1.status_nab == 2 && self.c1.MAINMENULAST == "kalkulace") {
          //Tohle domyslet co vlastne vidim
          if (self.c1.obrazovka_nab == 2) {
            //self.mAlert('a'+ self.c1.obrazovka_nab)
            return;
          }

          //self.$refs.w1.form.cislo
          //        f.Alert2(`select * from nab_t_list where cislonabidky= ${self.$refs.w1.form.cislo}`, ' :: ', self.c1.status_zak, ' :: ',self.c1.status_nab)
          var c = (
            await Q.all(
              self.idefix,
              `select * from nab_t_list where cislonabidky= ${self.$refs.w1.form.cislo}`
            )
          ).data.data[0];

          var qset = await self.UpdateSet(data2);
          if (!self.ZpravaValidace(data2)) {
            return;
          }
          var q = `update nab_t_list ${qset} where idefix = ${c.idefix}`;
          var d = await Q.post(self.idefix, q);
          var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
          //f.Alert('ZakTus' ,dporadi)
          var uporadi = await Q.post(self.idefix, dporadi);

          var iset = await self.InsertSet(c.idefix);
          var del = await Q.post(
            self.idefix,
            `delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`
          );

          var qitems = `insert into nab_t_items
             ${iset}
             from ${self.c1.cTable} where obsah::text >''
           `;
          qitems = qitems.replace("idefix_zak", "idefix_nab");
          //f.Alert2(qitems)

          var e = await Q.post(self.idefix, qitems);
          var pomocIdefix = await Q.post(
            self.idefix,
            `update nab_t_items set idefix = idefix_src where idefix_src>0 and idefix_nab = ${c.idefix}`
          );

          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Zmeneno 1  ${c.cislonabidky}`,
            type: "success",
            offset: 100,
            duration: 5000
          });

          self.Seznam("nab");

          self.c1.status_nab = 2;
        }
        if (self.c1.status_zak == 2 && self.c1.MAINMENULAST == "zakazky") {
          if (self.c1.obrazovka_zak == 2) {
            //self.mAlert('a'+ self.c1.obrazovka_nab)
            return;
          }

          //self.$refs.w1.form.cislo = c.cislo

          var c = (
            await Q.all(
              self.idefix,
              `select * from zak_t_list where cislozakazky= ${self.$refs.w1.form.cislo}`
            )
          ).data.data[0];
          if (!self.ZpravaValidace(data2)) {
            return;
          }
          var qset = await self.UpdateSet(data2);
          var q = `update zak_t_list ${qset} where idefix = ${c.idefix}`;
          var d = await Q.post(self.idefix, q);
          //Vlozit (zmenit ) polozky z kalkulace
          // f.Alert(self.c1.cTable)
          var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
          //f.Alert('ZakTus' ,dporadi)
          var uporadi = await Q.post(self.idefix, dporadi);
          var iset = await self.InsertSet(c.idefix);
          var del = await Q.post(
            self.idefix,
            `delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`
          );

          var qitems = `insert into zak_t_items
            ${iset}
            from ${self.c1.cTable} where obsah::text >''
          `;
          //f.Alert2(qitems)
          //var pomocIdefix=(await Q.post(self.idefix,`update ${self.c1.cTable} set idefix = idefix_src where idefix_src>0`))

          var e = await Q.post(self.idefix, qitems);
          var pomocIdefix = await Q.post(
            self.idefix,
            `update zak_t_items set idefix = idefix_src where idefix_src>0 and idefix_zak = ${c.idefix}`
          );
          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Zmeneno 1   ${c.cislozakazky}`,
            type: "success",
            offset: 100,
            duration: 5000
          });
          self.Seznam("zak");
          self.c1.status_zak = 2;
        }
      }
      if (true || self.c1.status == 1) {
        if (self.c1.status_nab == 1 && self.c1.MAINMENULAST == "kalkulace") {
          //f.Alert('Vlozim novou', self.c1.MAINMENULAST )
          data2.idefix_obchodnik = this.idefix;
          if (f.isEmpty(data2.idefix_firma)) {
            data2.idefix_firma = 0;
          }

          q1 = `select * from nab_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `;
          if (!self.ZpravaValidace(data2)) {
            return;
          }

          // f.Alert2(q1)
          // return
          var c = (await Q.all(self.idefix, q1)).data.data[0];

          self.$refs.w1.form.cislo = c.cislo;
          //self.$refs.w1.form.cislo
          //f.Alert("NAB", f.Jstr(c));
          var qset = await self.UpdateSet(data2);
          var q = `update nab_t_list ${qset} where idefix = ${c.idefix}`;
          var d = await Q.post(self.idefix, q);
          var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
          //f.Alert('ZakTus' ,dporadi)
          var uporadi = await Q.post(self.idefix, dporadi);

          var iset = await self.InsertSet(c.idefix, "idefix_nab");

          var del = await Q.post(
            self.idefix,
            `delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`
          );
          var qitems = `insert into nab_t_items
          ${iset}
          from ${self.c1.cTable} where obsah::text >''
        `;
          var e = await Q.post(self.idefix, qitems);
          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Ulozeno ${c.cislo}`,
            type: "success",
            offset: 100,
            duration: 5000
          });
          self.c1.status_nab = 2;
          eventBus.$emit("SavedZN", {
            id: self.c1.MAINMENULAST,
            // cislo: c.cislo,
            // exp: c.exp,
            // prod: self.idefix,
            // prod_txt : c.produkce,
            // zadani:c.zadani,
            status_zak: self.c1.status_zak,
            status_nab: self.c1.status_nab
          });
          self.Seznam("nab");

          //Vlozit polozky z kalkulace
        } else if (self.c1.status_zak == 1 && self.c1.MAINMENULAST == "zakazky") {
          q1 = `select * from zak_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `;
          //f.Alert2(q1)
          //return

          if (!self.ZpravaValidace(data2)) {
            return;
          }
          var c = (await Q.all(self.idefix, q1)).data.data[0]; //Pouziju polozky idefix, splatnost, zbytek by mel byt ve formulari spravne
          self.$refs.w1.form.cislo = c.cislo;
          var qset = await self.UpdateSet(data2);
          var q = `update zak_t_list ${qset} where idefix = ${c.idefix}`;
          q = q.replace("'undefined'", "''");

          var d;
          try {
            d = await Q.post(self.idefix, q);
          } catch (e) {
            this.$notify({
              title: `ERROR ${e}`,
              message: `${q}`,
              type: "error",
              offset: 100,
              duration: 5000
            });
            f.Alert2(
              `${q}`,
              data2.idefix_obchodnik,
              parseInt(data2.idefix_obchodnik),
              data2.idefix_obchodnik * 1
            );
            return;
          }

          //Vlozit (zmenit ) polozky z kalkulace
          //f.Alert(self.c1.cTable)
          var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
          //f.Alert('ZakTus' ,dporadi)
          var uporadi = await Q.post(self.idefix, dporadi);
          var iset = await self.InsertSet(c.idefix);
          var del = await Q.post(
            self.idefix,
            `delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`
          );
          var qitems = `insert into zak_t_items
          ${iset}
          from ${self.c1.cTable} where obsah::text >''
        `;
          var e = await Q.post(self.idefix, qitems);
          this.$notify({
            title: self.c1.MAINMENULAST,
            message: `Ulozeno  ${c.cislo}`,
            type: "success",
            offset: 100,
            duration: 5000
          });
          self.c1.status_zak = 2;
          eventBus.$emit("SavedZN", {
            id: self.c1.MAINMENULAST,
            // cislo: c.cislo,
            // exp: c.exp,
            // prod: self.idefix,
            // prod_txt : c.produkce,
            // zadani:c.zadani,
            status_zak: self.c1.status_zak,
            status_nab: self.c1.status_nab
          });

          self.Seznam("zak");

          //Zmena c1.statusu

          //f.Alert2(d)

          //f.Alert("ZAK", f.Jstr(c));
        }

        //f.Alert2(f.Jstr(data2))

        //    var necox = {"cislo":"1900900016","vl_rozsah":"","idefix_firma":"13464","idefix_firmaosoba":0,
        //    "nazev":"neco je to","cisloobjednavky":"petka","datumzadani":"18.08.2019 06:32:21",
        //    "datumexpedice":"28.08.2019","datumsplatnosti":null,"vyrobapopis":"","naklad":0,
        //    "poznamky":"rychle hlavne mez to uvidis to zaplat","zamknuto":null,"idefix_user_lock":0,
        //    "odemknuto":null,"idefix_user_unlock":0,"zamek":false,"uct_rok":2019,"login":"",
        //    "vyrobapopis_print":"uriznout tak aby ve skladu zbylo na dalsi","cislofaktury":"","idefix_obchodnik":0,
        //    "idefix_produkce":"9","idefix_last":0,"idefix_nabidka":0,"dodak0":"","objednavka0":"",
        //    "pdf0":"","informace":"",
        //    "nazevfirmy":"AbbVie s.r.o.",
        //    "osoba":"Belasová Iva","obchodnik":"","produkce":"mares mares "}
      }
    },
    ZpravaValidace(data2) {
      var zpravatxt = "";

      if (this.c1.MAINMENULAST == "kalkulace") {
        return true;
      }
      //if (f.isEmpty(data2.nazevfirmy)) {
      if (f.isEmpty(data2.idefix_firma)) {
        zpravatxt += ", Firma ";
        eventBus.$emit("Focus", { pole: "firma" });
      }

      if (f.isEmpty(data2.idefix_obchodnik)) {
        zpravatxt += ", Obchodnik ";
      }
      if (f.isEmpty(data2.idefix_produkce)) {
        zpravatxt += ", Produkce";
      }
      if (f.isEmpty(data2.nazev)) {
        zpravatxt += ", Nazev zakazky (nabidky) ";
      }
      if (f.isEmpty(data2.poznamky)) {
        data2.poznamky = "";
      }
      if (f.isEmpty(data2.vyrobapopis_print)) {
        data2.vyrobapopis_print = "";
      }
      if (zpravatxt > "") {
        //this.$notify( { title: 'Upozorneni',  message: `Tyto povinne polozky nejsou vyplneny : ${zpravatxt}`, type: 'error', offset: 100, duration: 5000 })
        f.Alert2(`Tyto povinne polozky nejsou vyplneny : `, `${zpravatxt}`);

        return false;
      }
      return true;
    },
    async InsertSet(idefix_zak, itemIdName = "idefix_zak") {
      const self = this;

      var creturn = `(
            kod,
            nazev,
            obsah,
            kcks,
            ks,
            naklad,
            marze,
            prodej,
            marze_pomer,
            expedice_datum,
            expedice_cas,
            datum,
            poradi,

            id_src,
            active,
            idefix_src,
            ${itemIdName},
            user_insert_idefix,
            user_update_idefix,
            idefix_dod,
            idefix_prace,
            status,vl_id,vl_znacka,poradi2

        )

            select
            kod,
            nazev,
            obsah,
            kcks,
            ks,
            naklad,
            marze,
            prodej,
            marze_pomer,
            expedice_datum,
            expedice_cas,
            datum,
            poradi,


            id,
            active,
            idefix,
            ${idefix_zak},
            ${self.idefix},
            ${self.idefix},
            idefix_dod,
            idefix_prace,
            status,vl_id,vl_znacka,poradi2
            `;

      return creturn;
    },
    async UpdateSet(data2) {
      const self = this;
      var qset = `set `;
      if (self.c1.MAINMENULAST == "zakazky") {
        //             qset+=`cislozakazky        =  ${data2.cislo},`
      } else if (self.c1.MAINMENULAST == "kalkulace") {
        //           qset+=`cislonabidky        =  ${data2.cislo},`
      }

      qset += `vl_rozsah           =  '',`; // vymenit za funkci
      qset += `idefix_firma        =  ${data2.idefix_firma},`; // pujde ci nepujde menit ?
      qset += `idefix_firmaosoba   =  coalesce(${data2.idefix_firmaosoba},0),`; // pujde ci nepujde menit ?
      qset += `nazev               =  '${data2.nazev}',`; // pujde ci nepujde menit ?
      qset += `cisloobjednavky     =  '${data2.cisloobjednavky}',`; // pujde ci nepujde menit ?
      qset += `cislofaktury        =  '${data2.cislofaktury}',`; // pujde ci nepujde menit ?
      //qset+=`datumzadani         =  '${data2.datumzadani}',`  // nebude - je jen proi vlozeni!!!!
      qset += `datumexpedice       =  '${data2.datumexpedice}',`; // pujde ci nepujde menit ?
      //qset+=`datumsplatnosti     =  '${data2.datumsplatnosti}',`  // na starem datum studio, co to vlastneje
      qset += `vyrobapopis         =  '${data2.vyrobapopis}',`; // pujde ci nepujde menit ?
      qset += `odemknuto           =   null,`; // !!!!DULEZITE   - pri zmene zamku
      qset += `zamknuto            =   null,`; // !!!!DULEZITE   - pri zmene zamku
      qset += `idefix_user_unlock  =  '${data2.idefix_user_unlock}',`; // !!!!DULEZITE
      qset += `zamek               =  '${data2.zamek}',`; // pujde ci nepujde menit ?
      qset += `login               =   idefix2login(${self.idefix}),`; // pujde ci nepujde menit ?
      qset += `vyrobapopis_print   =  '${data2.vyrobapopis_print}',`; // pujde ci nepujde menit ?
      qset += `poznamky            =  '${data2.poznamky}',`; // pujde ci nepujde menit ?
      qset += `idefix_obchodnik    =  '${data2.idefix_obchodnik}',`; // !!!!DULEZITE
      qset += `idefix_produkce     =  '${data2.idefix_produkce}',`; // !!!!DULEZITE
      qset += `idefix_last         =  '${data2.idefix_last}',`; // !!!!DULEZITE  - nova uprvou - originalni zakazka
      qset += `idefix_nabidka      =  '${data2.idefix_nabidka}',`; // !!!!DULEZITE  - Vychozi nabidka (zakazka)
      qset += `dodak0              =  '${data2.dodak0}',`; // !!!!DULEZITE  PRILOHY
      qset += `objednavka0         =  '${data2.objednavka0}',`; // !!!!DULEZITE  PRILOHY
      qset += `pdf0                =  '${data2.pdf0}' `; // !!!!DULEZITE  PRILOHY
      return qset;
    },
    async CisPrace(query = "") {
      const self = this;
      var qPrace = SQL.getPraceAll(0, query);

      f.log("GETPRACEALL::: ", qPrace);

      self.c1.loading = true;
      try {
        self.c1.cis_prace = (await Q.all(self.idefix, qPrace)).data.data;
        self.c1.cis_prace_vlastnik = self.c1.cis_prace.filter(el => {
          return (
            _.findIndex(el.dod_seznam, function(o) {
              return o * 1 == self.c1.idefix_vlastnik * 1;
            }) > -1
          );
          // return true
        });
        //f.Alert(f.Jstr(self.c1.cis_prace_vlastnik), self.c1.idefix_vlastnik )
        self.c1.loading = false;
      } catch (e) {
        console.log(e);
      }
    },
    async CisDod(idefix_prace = 0) {
      const self = this;
      console.log("start");
      var qDod = SQL.getDod(idefix_prace);
      f.log("CISDOD ");
      //console.log("end", qDod);
      self.c1.loading = true;
      //await self.Vlastnik()
      try {
        self.c1.cis_dod = (await Q.all(self.idefix, qDod)).data.data;
        self.c1.cis_dod_vlastnik = self.c1.cis_dod.filter(el => {
          return el.idefix_firma == self.c1.idefix_vlastnik;
        });

        // f.Alert(f.Jstr(self.c1.cis_dod_vlastnik), self.c1.idefix_vlastnik)
        self.c1.loading = false;
      } catch (e) {
        console.log(e, qDod);
      }
    },
    async CisDodAll(idefix_prace = 0) {
      const self = this;
      console.log(
        "Hyr: ",
        idefix_prace,
        self.c1.MAINMENULAST,
        " ",
        f.Jstr(self.c1.zak_item_active)
      );
      //console.log("start");
      //return

      var qDod = SQL.getDodAll(idefix_prace);

      //console.log("end", qDod);
      self.c1.loading = true;
      //await self.Vlastnik()
      try {
        self.c1.cis_dod_all = (await Q.all(self.idefix, qDod)).data.data;
        self.c1.cis_dod_vlastnik = self.c1.cis_dod_all.filter(el => {
          return el.idefix_firma == self.c1.idefix_vlastnik;
        });

        // f.Alert(f.Jstr(self.c1.cis_dod_vlastnik), self.c1.idefix_vlastnik)
        self.c1.loading = false;
      } catch (e) {
        console.log(e, qDod);
      }
    },
    async Vlastnik() {
      const self = this;
      var qVlastnik = `select idefix from list_dodavatel where vlastnik = 1 order by time_update  desc limit 10 ;`;
      var aRet = [];

      try {
        aRet = (await Q.all(self.idefix, qVlastnik)).data.data;
        if (aRet.length == 0) {
          f.Alert("Vlastnik neni definovan");
        } else if (aRet.length == 1) {
          self.c1.idefix_vlastnik = aRet[0].idefix;
        } else if (aRet.length > 1) {
          self.c1.idefix_vlastnik = aRet[0].idefix;
          f.Alert(
            "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
          );
        }
        //f.Alert(self.c1.idefix_vlastnik)
      } catch (e) {
        console.log(e);
      }
    },
    async VlastnikPrace() {
      const self = this;
      var qVlastnik = `select * from list_firmaprace where vlastnik = 1 limit 2`;
      var aRet = [];

      try {
        aRet = (await Q.all(self.idefix, qVlastnik)).data.data;
        if (aRet.length == 0) {
          f.Alert("Vlastnik neni definovan");
        } else if (aRet.length == 1) {
          self.c1.idefix_vlastnikPrace = aRet[0].idefix_prace;
        } else if (aRet.length > 1) {
          self.c1.idefix_vlastnikPrace = aRet[0].idefix_prace;
          f.Alert(
            "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
          );
        }
        //f.Alert(self.c1.idefix_vlastnik)
      } catch (e) {
        console.log(e);
      }
    },

    async CisPraceDod() {
      const self = this;
      await self.CisDod();
      await self.CisPrace();
    },
    async ZmenPolozku(ceho = "zak", polozka, ev = 1) {
      const self = this;
      var lRet = false;
      if (self.c1.timeout) {
        clearTimeout(self.c1.timeout);
        //this.$notify( { title: self.c1.MAINMENULAST,  message: `Cancel timout ${self.c1.timeout}` , type: 'error', offset: 100, duration: 500 })
        self.c1.timeout = false;
      }

      self.c1.timeout = setTimeout(function() {
        self.ZmenPolozku0(ceho, polozka, ev);
      }, 100);
    },
    async ZmenPolozku0(ceho = "zak", polozka, ev = 1) {
      const self = this;
      var q = "";
      var idefix_ceho = ceho == "zak" ? polozka.idefix_zak : polozka.idefix_nab;
      var isInsert = false;

      if (polozka.vzor == 0) {
        q = `update  ${ceho}_t_items a set
          idefix_prace = ${polozka.idefix_prace} ,
          idefix_dod =   ${polozka.idefix_dod},
          user_update_idefix =   ${self.idefix},
          time_update = now(),
          nazev      =   trim('${polozka.nazev}'),
          ks        =   ${polozka.ks},
          kcks        =   ${polozka.kcks},
          naklad    =   ${polozka.naklad},
          prodej    =   ${polozka.prodej}
          where idefix = ${polozka.idefix}`;
      }

      // marze              | 0.00

      //nextval('list2_seq'::regclass)

      if (polozka.vzor >= 1 && !polozka.nazev.match(/^Pr.zdn.*$/)) {
        //
        if (!f.isEmpty(polozka.obsah)) {
          polozka.obsah = f.Jstr(polozka.obsah);
          //f.Alert(polozka.obsah)
        }

        var qCols = `(
       nazev
      ,obsah
      ,kcks
      ,ks
      ,naklad
      ,marze
      ,prodej
      ,marze_pomer
      ,poradi
      ,idefix_tmp
      ,idefix_${ceho}
      ,idefix_src
      ,id_src
      ,active
      ,time_insert
      ,time_update
      ,user_insert_idefix
      ,user_update_idefix
      ,idefix_dod
      ,idefix_prace
      ,d_fak
      ,faktura
      ,vzor
      ,expedice_datum
      ,expedice_cas
      ,datum

       ) `;

        var qVals = `(
       '${polozka.nazev}'
      ,'${polozka.obsah}'
      ,'${polozka.kcks}'
      ,'${polozka.ks}'
      ,'${polozka.naklad}'
      ,'${polozka.marze}'
      ,'${polozka.prodej}'
      ,'${polozka.marze_pomer}'
      ,'${polozka.poradi}'
      ,'${polozka.idefix_tmp}'
      ,'${idefix_ceho}'
      ,'${polozka.idefix_src}'
      ,'${polozka.id_src}'
      ,'${polozka.active}'
      ,now()
      ,now()
      ,'${self.idefix}'
      ,'${self.idefix}'
      ,'${polozka.idefix_dod}'
      ,'${polozka.idefix_prace}'
      ,'${polozka.d_fak}'
      ,'${polozka.faktura}'
      ,0
      ,now()::date
      ,now()::time
      ,now()

      ) `;
        qVals = qVals.replace(/'null'/g, "null");

        var q = `insert into ${ceho}_t_items ${qCols} values ${qVals}`;
        ev = 1;
        isInsert = true;
      } else if (polozka.vzor >= 1 && polozka.nazev.match(/^Pr.zdn.*$/)) {
        f.Alert("Nedelam nic");
        return;
      }
      if (polozka.vzor == -999) {
        f.Alert("Nedelam nic -999");
        return;
      }

      // f.Alert2("VKLAD", q)

      var qoprava = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
    )
    ;`;

      try {
        /*
      var qoprava=`update zak_t_item set idefix=nextval('list2_seq'::regclass) where id in (
    select id from (select count(*) over(partition by idefix) as rn ,
     row_number() over(partition by idefix order by id) as radek
    , id, idefix from zak_t_items ) a where rn >1 and radek > 1 order by id
    )
    ;`
*/

        var b = await Q.post(self.idefix, q);

        //ev =1
        //self.mAlert(q,10000)
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Polozka ulozena  ${polozka.vzor}  ${polozka.idefix}`,
          type: "success",
          offset: 100,
          duration: 1000
        });
        polozka.vzor = 0;
      } catch (e) {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Doslo k chybe pri ulozeni `,
          type: "error",
          offset: 100,
          duration: 5000
        });

        f.Alert2("ERROR polozky ", q, f.Jstr(polozka));
      }
      try {
        var boprava = await Q.post(self.idefix, qoprava);
      } catch (e) {
        this.$notify({
          title: self.c1.MAINMENULAST,
          message: `Doslo k chybe 2 pri ulozeni `,
          type: "error",
          offset: 100,
          duration: 5000
        });

        f.Alert2("ERROR polozky ", qoprava, f.Jstr(polozka));
      }

      // await self.DocasneReseni()
      if (ceho == "zak") {
        if (ev == 1) {
          self.c1.polozky_zak = (
            await Q.all(
              self.idefix,
              `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix_zak} order by idefix`
            )
          ).data.data;
          if (self.c1.polozky_zak.length > 0) {
            self.c1.aktivni_polozka_zak =
              self.c1.polozky_zak[self.c1.polozky_zak.length - 1].idefix;
          }

          //f.Alert("Insert")
        }

        self.polozky_soucet("zak");

        //f.Alert(ev)
        if (ev == 1) {
          self.addPol("zak", polozka.idefix_zak);
        }
      } else if (ceho == "nab") {
        if (ev == 1) {
          self.c1.polozky_nab = (
            await Q.all(
              self.idefix,
              `select *,0 as vse,idefix_vl(idefix) as idefix_vl from nab_t_items where idefix_nab= ${polozka.idefix_nab} order by idefix`
            )
          ).data.data;
          if (self.c1.polozky_nab.length > 0) {
            self.c1.aktivni_polozka_nab =
              self.c1.polozky_nab[self.c1.polozky_nab.length - 1].idefix;
          }
        }
        await self.polozky_soucet("nab");

        if (ev == 1) {
          self.addPol("nab", polozka.idefix_nab);
        }
      }
    },
    mAlert(txt, dur = 5000) {
      this.$notify({
        title: self.c1.MAINMENULAST,
        message: `${txt}`,
        type: "error",
        offset: 100,
        duration: 5000
      });
    },
    async polozky_soucet(ceho = "zak") {
      const self = this;
      if (ceho == "nab") {
        self.c1.nab_naklady = 0;
        self.c1.nab_marze = 0;
        self.c1.nab_prodej = 0;
        self.c1.polozky_nab.forEach(el => {
          self.c1.nab_naklady += el.naklad * 1;
          self.c1.nab_prodej += el.prodej * 1;
          self.c1.nab_marze += self.c1.nab_prodej - self.c1.nab_naklady;
        });
      }
      if (ceho == "zak") {
        self.c1.zak_naklady = 0;
        self.c1.zak_marze = 0;
        self.c1.zak_prodej = 0;
        self.c1.polozky_zak.forEach(el => {
          self.c1.zak_naklady += el.naklad * 1;
          self.c1.zak_prodej += el.prodej * 1;
          self.c1.zak_marze += self.c1.zak_prodej - self.c1.zak_naklady;
        });
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
    async Seznam(ceho = "zak", where = "", orderby = "", add = false) {
      const self = this;
      var desc = "";

      var cWhereRow = "";
      var cWhereCislo = "";
      var cWhereRok = "";
      var cislo = "";
      var qadd = "";
      var q = `select a.*,b.nazev as firma,b.splatnost,b.hotovost,b.vlastnik,c.*, osoba( coalesce(o.idefix,0)) as osoba

            , coalesce(o.idefix,0) as idefix_osoba
            , 'F,N,KOSIK'::text as  stav
            ,zamek

          from ${ceho}_t_list a
          left join list_dodavatel b on a.idefix_firma= b.idefix
          left join list_firmaosoba o on a.idefix_firmaosoba = o.idefix

          left join (
      	  select idefix_${ceho}, sum(naklad) as nakladsum, sum(prodej) as prodejsum from ${ceho}_t_items  group by idefix_${ceho}
      ) c on a.idefix = c.idefix_${ceho}`;

      //order by a.idefix desc limit 100 `

      // 2 as kategorie,

      if (ceho == "zak") {
        cislo = "cislozakazky";
        if (self.c1.search_zak > "") {
          cWhereRow = self.c1.search_zak;
        }
        if (self.c1.search_zak_rok > "") {
          cWhereRok = self.c1.search_zak_rok;
        }
        if (self.c1.search_zak_cislo > "") {
          cWhereCislo = self.c1.search_zak_cislo;
        }
        if (f.isEmpty(orderby) && self.c1.order_zak > "") {
          //f.Alert2("TED",self.c1.order_zak, ' b: ', orderby )
          orderby = self.c1.order_zak;
          desc = self.c1.desc_zak;
        } else if (self.c1.order_zak == orderby) {
          if (self.c1.desc_zak == "") {
            self.c1.desc_zak = "desc";
          } else {
            self.c1.desc_zak = "";
          }
        } else {
          self.c1.order_zak = orderby;
          self.c1.desc_zak = "";
        }

        desc = self.c1.desc_zak;
      }
      if (ceho == "nab") {
        //where podmninka
        cislo = "cislonabidky";
        if (self.c1.search_nab > "") {
          cWhereRow = self.c1.search_nab;
        }
        if (self.c1.search_nab_rok > "") {
          cWhereRok = self.c1.search_nab_rok;
        }
        if (self.c1.search_nab_cislo > "") {
          cWhereCislo = self.c1.search_nab_cislo;
        }
        if (f.isEmpty(orderby) && self.c1.order_nab > "") {
          //f.Alert2("TED",self.c1.order_zak, ' b: ', orderby )
          orderby = self.c1.order_nab;
          desc = self.c1.desc_nab;
        } else if (self.c1.order_nab == orderby) {
          if (self.c1.desc_nab == "") {
            self.c1.desc_nab = "desc";
          } else {
            self.c1.desc_nab = "";
          }
        } else {
          self.c1.order_nab = orderby;
          self.c1.desc_nab = "";
        }

        desc = self.c1.desc_nab;
      }

      //where to_aascii(row(a.*)::text)  ilike '%ruzi%'

      // f.Alert2(orderby)
      if (add && self.c1.search_zak_cislo2 > 0 && ceho == "zak") {
        cislo = "cislozakazky";

        qadd = `select  *
                    , idefix2fullname(idefix_obchodnik) as obchodnik
                    , idefix2fullname(idefix_produkce)  as produkce
             from (${q}) a    where datumexpedice>=now()::date +'-365 days'::interval and right(${cislo},5)::bigint = right(${self.c1.search_zak_cislo2},5)::bigint`;
      } else if (add && self.c1.search_nab_cislo2 > 0 && ceho == "nab") {
        cislo = "cislonabidky";
        qadd = `select  *
                    , idefix2fullname(idefix_obchodnik) as obchodnik
                    , idefix2fullname(idefix_produkce)  as produkce
             from (${q}) a    where datumexpedice>=now()::date +'-365 days'::interval and right(${cislo},5)::bigint = right(${self.c1.search_zak_cislo2},5)::bigint`;
      }
      if (ceho == "zak" && self.c1.seek_zak_moje && !self.c1.search_nab_cislo2 > 0) {
        q = `select * from (${q}) a  where a.idefix_obchodnik  = ${self.idefix}`;
      }
      if (ceho == "nab" && self.c1.seek_nab_moje && !self.c1.search_nab_cislo2 > 0) {
        q = `select * from (${q}) a  where a.idefix_obchodnik  = ${self.idefix}`;
      }
      if (cWhereRok > "") {
        /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
        q = `select * from (${q}) a  where left(${cislo},2) = right(${cWhereRok},2)`;
        //f.Alert2(q)
      }
      if (cWhereCislo > "") {
        /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
        q = `select * from (${q}) a  where right(${cislo},5)::bigint = right(${cWhereCislo},5)::bigint`;
        // f.Alert2(q)
      }
      if (cWhereRow > "") {
        if (ceho == "zak") {
          var cWhereCol = [];
          if (
            !self.c1.seek_zak_firma &&
            !self.c1.seek_zak_nazev &&
            !self.c1.seek_zak_obchodnik &&
            !self.c1.seek_zak_stav
          ) {
            q = `select * from (${q}) a  where to_aascii(row(a.*)::text)  ilike '%${cWhereRow}%'`;
          } else {
            if (self.c1.seek_zak_firma) {
              cWhereCol.push(
                `to_aascii(a.firma::text)  ilike '%${cWhereRow}%'`
              );
            }
            if (self.c1.seek_zak_nazev) {
              cWhereCol.push(
                `to_aascii(a.nazev::text)  ilike '%${cWhereRow}%'`
              );
            }

            if (self.c1.seek_zak_obchodnik) {
              //                 select idefix from list_users where to_aascii(idefix2fullname(idefix)) ilike '%${cWhereRow}%'
              //cWhereCol.push(`to_aascii(a.obchodnik::text)  ilike '%${cWhereRow}%'`)
              cWhereCol.push(`a.idefix_obchodnik   in (
                   select idefix_obchodnik from list_users where to_aascii(idefix2fullname(idefix_obchodnik)) ilike '%${cWhereRow}%'
                  )`);
            }
            if (self.c1.seek_zak_stav) {
              cWhereCol.push(`to_aascii(a.stav::text)  ilike '%${cWhereRow}%'`);
            }
            var cPomoc = cWhereCol.join(" or ");
            q = `select * from (${q}) a  where ${cPomoc}`;

            //f.Alert(cPomoc)
          }
        }
        if (ceho == "nab") {
          var cWhereCol = [];
          if (
            !self.c1.seek_nab_firma &&
            !self.c1.seek_nab_nazev &&
            !self.c1.seek_nab_obchodnik &&
            !self.c1.seek_nab_stav
          ) {
            q = `select * from (${q}) a  where to_aascii(row(a.*)::text)  ilike '%${cWhereRow}%'`;
          } else {
            if (self.c1.seek_nab_firma) {
              cWhereCol.push(
                `to_aascii(a.firma::text)  ilike '%${cWhereRow}%'`
              );
            }
            if (self.c1.seek_nab_nazev) {
              cWhereCol.push(
                `to_aascii(a.nazev::text)  ilike '%${cWhereRow}%'`
              );
            }
            if (self.c1.seek_nab_obchodnik) {
              //                 select idefix from list_users where to_aascii(idefix2fullname(idefix)) ilike '%${cWhereRow}%'
              //cWhereCol.push(`to_aascii(a.obchodnik::text)  ilike '%${cWhereRow}%'`)
              cWhereCol.push(`a.idefix_obchodnik   in (
                   select idefix_obchodnik from list_users where to_aascii(idefix2fullname(idefix_obchodnik)) ilike '%${cWhereRow}%'
                  )`);
            }
            if (self.c1.seek_nab_stav) {
              cWhereCol.push(`to_aascii(a.stav::text)  ilike '%${cWhereRow}%'`);
            }
            var cPomoc = cWhereCol.join(" or ");
            q = `select * from (${q}) a  where ${cPomoc}`;
            //f.Alert(cPomoc)
          }
        }
        /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`

        //f.Alert2(q)
      }
      var qsubSum = q;
      self.Skupiny();
      if (self.c1._IsObchod) {
        qsubSum = `select * from (${q}) a where idefix_obchodnik=${self.idefix}`;
        // f.Alert2(qsubSum)
      } else if (!self.c1._IsObchod && self.c1._IsVedeni) {
        qsubSum = `select * from (${q}) a `;
        // f.Alert2(qsubSum)
      } else {
        qsubSum = `select * from (${q}) a limit 1 `;
      }
      //f.Alert( self.c1._IsObchod , self.c1._IsVedeni, self.c1._Skupiny )

      var qsum = `select count(*) as pocet, min(datumexpedice::date)::text as _od, max(datumexpedice::date)::text as _do ,sum(prodejsum) as prodej,sum(nakladsum) as naklad  from ( ${qsubSum} ) a`;

      qsum = `select *, prodej - naklad as zisk, (prodej/nullif(naklad,0))::numeric(15,2) as marze from (${qsum}) a `;

      q = `select *
            , idefix2fullname(idefix_obchodnik) as obchodnik
            , idefix2fullname(idefix_produkce)  as produkce
         from (${q}) a  `; // c1.seznam_zak
      var orderbyfull = "";
      if (orderby > "") {
        if (orderby == "cislozakazky" || orderby == "cislonabidky") {
          orderbyfull = ` right(${orderby},5) ${desc} `;
          f.Alert2(orderbyfull, q); //JARDA
          q = `select * from (${q}) a order by right(${orderby},5) ${desc} limit 105`;
        } else {
          orderbyfull = `${orderby} ${desc}  `;
          q = `select * from (${q}) a  order by ${orderby} ${desc}  `;
        }
      } else {
        orderbyfull = ` a.idefix desc   `;
        // f.Alert2(q)
      }
      if (add && qadd > "") {
        q = `select 1 as kategorie, * from (${qadd}) a  union select * from (select 2 as kategorie, * from (${q} ) a order by ${orderbyfull} limit 105) a  `;
      } else {
        q = `select 2 as kategorie, * from (${q} ) a   order by ${orderbyfull} limit 105`;
      }
      //f.Alert2(q)
      q = `select * from (${q}) a  order by kategorie , ${orderbyfull}`;

      // f.Alert2(q)
      if (ceho == "zak") {
        try {
          q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
          //q=q.replace('cislozakazky  desc', 'right(cislozakazky,5) desc')
          //q=q.replace('cislozakazky', 'right(cislozakazky,5)')
          // q=''
          //f.Alert2(q)

          self.c1.query_zak_last = q;
          // if (self.c1.seek_zak_obchodnik){
          // f.Alert2(q)
          // }

          self.c1.seznam_zak = (await Q.all(self.idefix, q)).data.data;
          self.c1.seznam_zak_sum = (await Q.all(self.idefix, `${qsum}`)).data.data;
        } catch (e) {
          console.log("EROROR : ", q);
        }
      }
      if (ceho == "nab") {
        try {
          q = q.replace("cislonabidky desc", "right(cislonabidky,5) desc");
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("cislonabidky desc", "right(cislonabidky,5) desc");
          self.c1.query_nab_last = q;
          self.c1.seznam_nab = (await Q.all(self.idefix, q)).data.data;
          self.c1.seznam_nab_sum = (await Q.all(self.idefix, `${qsum}`)).data.data;
        } catch (e) {
          console.log("EROROR : ", q);
        }
      }
    },

    async Nova(upravou = false) {
      const self = this;
      var c = 0;
      if (self.c1.MAINMENULAST == "zakazky" && self.c1.aktivni_zak < 1) {
        f.Alert("Pro kopii musi být zakazka vybrána", self.c1.aktivni_zak);
        return;
      }
      if (self.c1.MAINMENULAST == "kalkulace" && self.c1.aktivni_nab < 1) {
        f.Alert("Pro kopii musi být nabidka vybrána");
        return;
      }

      self.c1.bKalkulace = [];
      self.$store.dispatch("cleanKalk");
      //await queryKalk.setActive(0,self.c1.cTable,0)  //tj.vypne vse, nezalezina idefixu
      //self.setIdefixDeActive()
      var c = await Q.post(self.idefix, `delete from  ${self.c1.cTable}`);
      //await queryKalk.setActive(0,self.c1.cTable,0)  //tj.vypne vse, nezalezina idefixu
      self.c1.aKalkBefore = [];
      self.c1.aKalkAfter = [];
      // f.Alert(self.c1.cTable)

      //self.cleanItems

      if (self.c1.MAINMENULAST == "zakazky") {
        if (upravou == false) {
          self.c1.status_zak = 1;
          self.c1.obrazovka_zak = 2;
        }
        var cisti = await Q.post(
          self.idefix,
          `delete from zak_t_items where user_insert_idefix = ${self.idefix} and idefix_zak=-100`
        );

        var c = (
          await Q.all(
            self.idefix,
            `select newzak(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce`
          )
        ).data.data[0];
        if (upravou == false) {
          self.c1.polozky_zak = [];

          self.addPol("zak", -100);
          self.polozky_soucet("zak");
        }
        // `select newzak(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce`
      }
      if (self.c1.MAINMENULAST == "kalkulace") {
        if (upravou == false) {
          self.c1.status_nab = 1;
          self.c1.obrazovka_nab = 3;
        }
        var cisti = await Q.post(
          self.idefix,
          `delete from nab_t_items where user_insert_idefix = ${self.idefix} and idefix_nab=-100`
        );

        if (upravou == false) {
          if (upravou == false) {
            self.c1.polozky_nab = [];
            self.addPol("nab", -100);
            self.polozky_soucet("nab");
          }
        }

        var c = (
          await Q.all(
            self.idefix,
            `select newnab(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce `
          )
        ).data.data[0];
        //select newnab(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce
      }
      //f.Alert('A',f.Jstr(c));
      c.exp = f.datum3(c.exp);
      c.zadani = f.datum20(c.zadani);

      //f.Alert('B',f.Jstr(c));
      if (upravou == false) {
        eventBus.$emit("NovaZN", {
          id: self.c1.MAINMENULAST,
          cislo: c.cislo,
          exp: c.exp,
          prod: self.idefix,
          prod_txt: c.produkce,
          zadani: c.zadani,
          status_zak: self.c1.status_zak,
          status_nab: self.c1.status_nab
        });
      } else if (upravou == true) {
        if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
          f.Alert("Nelze zakladat novou upravou , pokud todlencto");
          return;
        }
        this.$confirm(
          self.c1.MAINMENULAST == "kalkulace"
            ? "Nabidka"
            : "Zakazka" + " bude zalozena ?",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "Ano?",
            cancelButtonText: "Ne"
          }
        ).then(() => {
          eventBus.$emit("NovaZNU", {
            id: self.c1.MAINMENULAST,
            cislo: c.cislo,
            exp: c.exp,
            prod: self.idefix,
            prod_txt: c.produkce,
            zadani: c.zadani,
            status_zak: self.c1.status_zak,
            status_nab: self.c1.status_nab
          });
          if (self.c1.MAINMENULAST == "kalkulace") {
            self.c1.status_nab = 1;
            self.c1.obrazovka_nab = 2;
          } else if (self.c1.MAINMENULAST == "zakazky") {
            self.c1.status_zak = 1;
            self.c1.obrazovka_zak = 2;
          }
          var cT1 = self.c1.cTable + "_1";
          var cT2 = self.c1.cTable + "_2";
          var qU1 = "";
          var qCopy1 = `create `;
          //          f.Alert('Zalozim zakazku nobou', c.cislo, self.c1.aktivni_zak, self.c1.cTable)
          if (self.c1.MAINMENULAST == "zakazky") {
            qCopy1 = `create table ${cT1} without oids as select * from zak_t_list where idefix = ${self.c1.aktivni_zak};
                  create table ${cT2} without oids as select * from zak_t_items where idefix_zak = ${self.c1.aktivni_zak} order by idefix`;

            Q.post(
              self.idefix,
              `drop table if exists ${cT1}; drop table if exists ${cT2};`
            ).then(() => {
              Q.post(self.idefix, `${qCopy1}`).then(() => {
                qU1 = `begin ;
                  update ${cT1} set idefix = nextval('list2_seq'::regclass ),id=nextval('zak_t_list_id_seq'::regclass) , idefix_last = ${self.c1.aktivni_zak}
                  , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
                  , datumzadani=now()
                  , cislozakazky = ${c.cislo}
                  ,idefix_produkce=${self.idefix}, datumexpedice='${c.exp}'
                  ,zamek=false
                  ,zamknuto=null
                  ,idefix_user_lock=0
                  ,odemknuto=null
                  ,idefix_user_unlock =0
                  `;
                qU1 += `;update ${cT2} set idefix = nextval('list2_seq'::regclass ),id=nextval('zak_t_items_id_seq'::regclass)
                  , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()

                  ,idefix_zak=(select max(idefix) from ${cT1})`;

                qU1 += `;update ${cT2} set idefix_src=idefix,  status=0`;

                qU1 += `;insert into zak_t_list (select * from ${cT1} );`;
                qU1 += `;insert into zak_t_items (select * from ${cT2});`;
                qU1 += `;update zak_t_list set datumsplatnosti = splatnost(idefix) where idefix  =(select max(idefix) from ${cT1} )`;
                qU1 += `;commit`;
                //Vymazat

                //f.Alert2(c.cislo, f.Jstr(c) , " > ",qU1)
                Q.post(self.idefix, `${qU1} `).then(() => {
                  self.c1.order_zak == "cislozakazky";
                  self.c1.desc_zak = " desc ";
                  //self.Seznam('zak', '','cislozakazky')
                  self
                    .Seznam("zak")

                    .then(() => {
                      var ifx = 0;
                      Q.all(
                        self.idefix,
                        `select max(idefix) from ${cT1} `
                      ).then(resx => {
                        self.c1.aktivni_zak = resx.data.data[0].max;
                        //f.Alert(f.Jstr(resx.data.data))
                        Q.all(
                          self.idefix,
                          `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak =${self.c1.aktivni_zak} order by idefix `
                        ).then(res => {
                          //f.Alert(self.c1.aktivni_zak)
                          //f.Alert2(f.Jstr(res.data.data))
                          self.c1.polozky_zak = [];
                          self.c1.polozky_zak = res.data.data;
                          self.addPol("zak", self.c1.aktivni_zak);
                          self.polozky_soucet("zak");
                          self.c1.status_zak = 2;
                          if (self.c1.polozky_zak.length > 0) {
                            self.c1.status_zak = 2;
                            var naklad = 0;
                            ///
                            self.c1.polozky_zak.forEach(el => {
                              naklad = 0;
                              //f.Alert(f.Jstr(el.obsah)=='null')
                              //queryKalk.setKorekce(el.obsah )
                              queryKalk
                                .setKorekceAndPrilohy(el.obsah)

                                .then(() => {
                                  prepocty.getNaklad(el.obsah).then(n => {
                                    naklad = n;
                                    //f.Alert(naklad)
                                    //f.Alert2(f.Jstr(el.obsah))
                                    //polozka.obsah=f.Jstr(polozka.obsah)
                                    var obsah = f.Jstr(el.obsah);
                                    if (obsah.length > 100) {
                                      var _qsetitem = `update zak_t_items set obsah = '${obsah}'::jsonb, naklad=${naklad} where idefix = ${el.idefix}`;
                                      //f.Alert(_qsetitem)
                                      Q.post(self.idefix, _qsetitem).then(
                                        () => {
                                          el.naklad = naklad;
                                        }
                                      );
                                    }
                                  });
                                });
                            });
                            ///

                            //self.to3N(self.c1.polozky_zak[0],2)
                          }
                        });
                      });
                    });

                  //f.Alert(f.Jstr('part 1 ok'))
                });
              });
            });
          }
          //////////////////

          if (self.c1.MAINMENULAST == "kalkulace") {
            qCopy1 = `create table ${cT1} without oids as select * from nab_t_list where idefix = ${self.c1.aktivni_nab};
                  create table ${cT2} without oids as select * from nab_t_items where idefix_nab = ${self.c1.aktivni_nab} order by idefix`;

            Q.post(
              self.idefix,
              `drop table if exists ${cT1}; drop table if exists ${cT2};`
            ).then(() => {
              Q.post(self.idefix, `${qCopy1}`).then(() => {
                qU1 = `begin ;
                  update ${cT1} set idefix = nextval('list2_seq'::regclass ),id=nextval('nab_t_list_id_seq'::regclass) , idefix_last = ${self.c1.aktivni_nab}
                  , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
                  , datumzadani=now()
                  , cislonabidky = ${c.cislo}
                  ,idefix_produkce=${self.idefix}, datumexpedice='${c.exp}'`;
                qU1 += `;update ${cT2} set idefix = nextval('list2_seq'::regclass ),id=nextval('nab_t_items_id_seq'::regclass)
                  , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
                  ,idefix_nab=(select max(idefix) from ${cT1})`;

                qU1 += `;insert into nab_t_list (select * from ${cT1} );`;
                qU1 += `;insert into nab_t_items (select * from ${cT2});`;
                qU1 += `;update nab_t_list set datumsplatnosti = splatnost(idefix) where idefix  =(select max(idefix) from ${cT1} )`;
                qU1 += `;commit`;

                //f.Alert2(c.cislo, f.Jstr(c) , " > ",qU1)
                Q.post(self.idefix, `${qU1} `).then(() => {
                  self.c1.order_nab == "cislonabidky";
                  self.c1.desc_nab = " desc ";
                  //self.Seznam('nab', '','cislonabidky')
                  self
                    .Seznam("nab")

                    .then(() => {
                      var ifx = 0;
                      Q.all(
                        self.idefix,
                        `select max(idefix) from ${cT1} `
                      ).then(resx => {
                        self.c1.aktivni_nab = resx.data.data[0].max;
                        //f.Alert(f.Jstr(resx.data.data))
                        Q.all(
                          self.idefix,
                          `select *,0 as vse from nab_t_items where idefix_nab =${self.c1.aktivni_nab} order by idefix `
                        ).then(res => {
                          //f.Alert(self.c1.aktivni_nab)
                          //f.Alert2(f.Jstr(res.data.data))
                          self.c1.polozky_nab = [];
                          self.c1.polozky_nab = res.data.data;
                          self.addPol("nab", self.c1.aktivni_nab);
                          self.polozky_soucet("nab");
                          self.c1.status_nab = 2;
                          if (self.c1.polozky_nab.length > 0) {
                            self.c1.status_nab = 2;
                            var naklad = 0;
                            self.c1.polozky_nab.forEach(el => {
                              naklad = 0;
                              queryKalk.setKorekce(el.obsah).then(() => {
                                prepocty.getNaklad(el.obsah).then(n => {
                                  naklad = n;
                                  //f.Alert(naklad)
                                  //f.Alert2(f.Jstr(el.obsah))
                                  //polozka.obsah=f.Jstr(polozka.obsah)
                                  var obsah = f.Jstr(el.obsah);
                                  if (obsah.length > 100) {
                                    var _qsetitem = `update nab_t_items set obsah = '${obsah}'::jsonb, naklad=${naklad} where idefix = ${el.idefix}`;
                                    //f.Alert(_qsetitem)
                                    Q.post(self.idefix, _qsetitem).then(() => {
                                      el.naklad = naklad;
                                    });
                                  }
                                });
                              });
                            });
                            //self.to3N(self.c1.polozky_nab[0],2)
                          }
                        });
                      });
                    });
                  //f.Alert(f.Jstr('part 1 ok'))
                });
              });
            });
          }
          ////////nabidky///nab////////
        });
      }

      //await self.setVL(self.c1.IDEFIXACTIVE,1)

      //f.Alert('Nova ', self.c1.MAINMENULAST )
    },
    async setIdefixActive() {
      const self = this;
      self.c1.aKalkBefore.forEach(el => {
        if (el.active == true) {
          self.c1.IDEFIXACTIVE = el.idefix;
          self.c1.NAZEVACTIVE = el.nazev;
          if (self.c1.MAINMENULAST == "zakazky") {
            if (el.idefix_src > 0) {
              self.c1.aktivni_polozka_zak = el.idefix_src;
            }
          }
          if (self.c1.MAINMENULAST == "kalkulace") {
            if (el.idefix_src > 0) {
              self.c1.aktivni_polozka_nab = el.idefix_src;
            }
          }

          return;
        }
      });
    },
    async setIdefixDeActive() {
      const self = this;
      self.c1.aKalkBefore.forEach(el => {
        if (el.active == true) {
          self.c1.IDEFIXACTIVE = 0;

          self.c1.NAZEVACTIVE = "";
          el.active = false;
          return;
        }
      });
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
      self.setIdefixActive();
      setTimeout(function() {
        self.c1.idRend++;
      }, 500);
      //f.Alert2("BEF", f.Jstr(self.c1.aKalkBefore))

      // setTimeout(function(){
      //   self.c1.idRend++
      // },500)
      //f.Alert(server.id2, $("#seek"+server.id2).val())
    },
    async setRender() {
      const self = this;
      f.log("7 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

      try {
        await self.setIdefixActive();
      } catch (e) {
        f.Alert("Chyba ACTIVE");
        console.log("Chyba ACTIVE");
      }
      await f.sleep(500);
      //setTimeout(function(){
      self.c1.idRend++;
      return self.c1.aKalkBefore.length;
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
        await self.setRender();
        //    alert('Vyazano')
        return;
      } catch (e) {
        f.Alert("Dell Er");
        return;
      }
    },

    async copyVL(idefix) {
      const self = this;

      await queryKalk.CopyUser(idefix, self.c1.cTable);

      self.c1.aKalkBefore = []; // 1.JARDA
      f.log("8 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);
      await self.setZabalit();

      return;

      setTimeout(function() {
        self.c1.idRend++;
        self.c1.TestRend++;
      }, 500);
    },
    async saveZaznam(server, kod) {
      const self = this;
      var SaveKalkulkace = false;

      f.log(" SAVE ZAZNAM");
      if (kod == 1) {
        SaveKalkulkace = false; //Ulozeni radky zavrene kalkulace
        //f.Alert('kod 1 - prepis bez Kalk')
        //saveZaznam(server,SaveKalkulace,1)
        await queryKalk.VkladUser(
          server.data,
          self.c1.bKalkulace,
          self.c1.cTable,
          "",
          false,
          server.idefix,
          SaveKalkulkace
        );

        //f.Alert(kod," : ", self.c1.IDEFIXACTIVE)
      }
      if (kod == 2) {
        SaveKalkulkace = true; //Ulozeni otevrene kalkulace
        //f.Alert('kod 2 - prepis - otevrena Kalkulace')
        //saveZaznam(server,SaveKalkulace,1)
        await queryKalk.VkladUser(
          server.data,
          self.c1.bKalkulace,
          self.c1.cTable,
          "",
          false,
          server.idefix,
          SaveKalkulkace
        );
      }
      if (kod == 3) {
        //saveZaznam(server,SaveKalkulace,3)
        // f.Alert('kod 3 - Vklad - otevrenakalkulace')
        SaveKalkulkace = true;
        await queryKalk
          .VkladUser(
            server.data,
            self.c1.bKalkulace,
            self.c1.cTable,
            "",
            true,
            server.idefix,
            SaveKalkulkace
          )
          .then(res => {
            this.$message({
              message: "Vlozeno",
              type: "error",
              center: true,
              duration: 5000
            });
          });
      }
      if (kod == 4) {
        f.Alert("kod 4 - prepis - en kalkulace ne datova radka");
        //Pri prepnuti ulozit kalkulaci a data v radce ponechat
        SaveKalkulkace = true;
        await queryKalk.VkladUser(
          server.data,
          self.c1.bKalkulace,
          self.c1.cTable,
          "",
          false,
          server.idefix,
          SaveKalkulkace,
          false
        );
      }
      return;
      $("#Zmenad").get(0).value = 0;
      //var nK=            await(queryKalk.getTemplateUser(idefix,self.c1.cTable))
      f.log("9 getTemplatesUser");
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);
      await self.setIdefixActive();
      // alert(self.c1.IDEFIXACTIVE)

      //self.c1.bKalkulace=[]
      //self.c1.bKalkulace =  f.Jparse(nK[0].obsah)
      //self.c1.bKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      //await  self.$store.dispatch('saveKalkCela', {data: self.c1.bKalkulace })

      if (self.c1.IDEFIXACTIVE > 0) {
        //AAAAAAA
        self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
      }

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
        await self.setRozbalit(idefixActive);
        await self.setZabalit();
        await self.addKalk(1);
        await self.setRender();
        await f.sleep(500);
        objFiluta = f.getElByIdefix("seek", 0);
        if (objFiluta) {
          objFiluta.focus();
        }

        return;
      }

      if (idefixActive == 0 && self.c1.bKalkulace.length > 0) {
        // f.Alert('Nova sada = kdyz uz je jedna otevrena')
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
            self.saveZaznam({ idefix: 0, data: resolve }, 3).then(() => {
              self
                .setRender()
                .then(() => {
                  self.c1.aKalkBefore = []; // 1.JARDA
                  self.setZabalit();
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
    async SaveAll(idefix = 0, PreskocChybu = 0) {
      const self = this;
      var dataRadka = {};

      var idefixActive = self.c1.IDEFIXACTIVE;
      var neco = $("#Zmenad").get(0).value;
      var neco = false;
      //$('div').css({opacity:'0.8'})

      if (neco < 0) {
        //neuklada
        return;
      }
      self.c1.Pocet = 0;

      //while(self.Z)
      await f.asyncForEach(self.c1.aKalkBefore, async el => {
        if (el.idefix > 0) {
          dataRadka = f.dataRadka(el.idefix);
          if (f.isEmpty(dataRadka.nazev)) {
            dataRadka.nazev = "-";
          }

          if (f.isEmpty(dataRadka.nazev)) {
            dataRadka.nazev += " ERROR (1) ";
            alert("Error" + dataRadka.nazev);
            var objFiluta = f.getElByIdefix("seek", el.idefix);
            objFiluta.focus();
            self.c1.Pocet = -1;
            if (PreskocChybu == 0) {
              return;
            }
          } else if (
            self.c1.bKalkulace.length > 0 &&
            self.c1.IDEFIXACTIVE == el.idefix
          ) {
            f.log("EMIT 7 ", "SAVEZAZNAM");
            await self
              .saveZaznam({ idefix: el.idefix, data: dataRadka }, 2)
              .then(res => {
                self.c1.Pocet++;
              });
          } else {
            neco = true;
            self.c1.Pocet++;

            // f.log("EMIT 8 ", "SAVEZAZNAM");
            //await self.saveZaznam({idefix: el.idefix, data: dataRadka   },1)
            // await f.sleep(1).then(res => {
            //   self.c1.Pocet++;
            // });
          }
          //f.Alert(f.Jstr(dataRadka))
        }
      });
      if (self.c1.Pocet == -1) {
        f.Alert("Pochybeni");
        return -1;
      }
      if (
        idefixActive == 0 &&
        self.c1.bKalkulace.length > 0 &&
        f.getElByIdefix("seek", "0")
      ) {
        //alert('1 Vklad by idefix - zabalit Active 0' )
        dataRadka = f.dataRadka(idefix);
        try {
          f.log("EMIT 9 ", "SAVEZAZNAM");
          await self.saveZaznam({ idefix: idefixActive, data: dataRadka }, 3);
          await self.setRender();
          self.c1.aKalkBefore = []; // 1.JARDA
          await self.setZabalit();
          // f.Alert('Vkladam prvni')
          self.c1.Pocet++;
        } catch (e) {
          f.Alert("Vklad selhal", e);
        }
      }
      $("#Zmenad").get(0).value = 0;
      //alert('Pocet ' + self.c1.Pocet)
      return 0;
    },
    async setRozbalit(idefix) {
      const self = this;
      f.log("1", "Rozbalit");
      //funkce serveru
      //1 onzacit active
      //2 vratit aktualni viditelnou kalkulaci
      //3

      //--await queryKalk.setActive(idefix, self.c1.cTable);
      f.log("2", "setActive");
      var qAct = queryKalk.setActiveQ(idefix, self.c1.cTable);
      var qnK = queryKalk.getTemplateUserIdefixQ(idefix, self.c1.cTable);
      var qBef = queryKalk.getTemplatesUserQ(self.c1.cTable);

      var qTest = await Q.Q2(self.idefix, {
        a1: qAct,
        a2parse: qnK,
        a3: qBef
      });
      if (!f.isEmpty(qTest.data.data)) {
        f.log("12 QQQQQ OK", "setActive"); //,f.Jstr(qTest.data.data.a2)
      } else {
        f.log("12 QQQQQ ERR", "setActive", f.Jstr(qTest));
      }

      f.log("12A", "setActive");

      self.c1.bKalkulace = qTest.data.data.a2parse[0].obsah;
      f.log("12C PARSE END", "setActive");
      self.c1.aKalkBefore = qTest.data.data.a3;
      f.log("12B", "setActive");

      self.c1.IDEFIXACTIVE = idefix;
      f.log("14", "setActive");
      await self.$store.dispatch("saveKalkCela", { data: self.c1.bKalkulace });
      f.log("5", "SaveKalk ok");
      await self.setIdefixActive();
      f.log("6", "Active OK");

      if (self.c1.IDEFIXACTIVE > 0) {
        //AAAAAAA
        self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
      }
      setTimeout(function() {
        self.c1.idRend++;
        self.c1.TestRend++;
      }, 100);
    },
    async setZabalit() {
      const self = this;
      f.log("ZAB 0:");
      self.c1.bKalkulace = [];
      self.$store.dispatch("cleanKalk");
      if (self.c1.IDEFIXACTIVE > 0) {
        //AAAAAAA
        self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
      }
      //return
      f.log("ZAB 1:");
      //Kolekce
      var kolekce = {
        Active: queryKalk.setActiveQ(0, self.c1.cTable, 0),
        Abefore: queryKalk.getTemplatesUserQ(self.c1.cTable)
      };
      f.log("KOLEKCE 1:", f.Jstr(kolekce));
      var aKolekce = await Q.Q2(self.idefix, kolekce);
      //console.log(f.Jstr(kolekce))

      self.c1.IDEFIXACTIVE = 0; //nahrazuje funckci deactive
      self.c1.NAZEVACTIVE = ""; //nahrazuje funckci deactive
      f.log("KOLEKCE 2 TEST", self.c1.aKalkBefore == aKolekce.data.data.Abefore);
      self.c1.aKalkBefore = [];
      try {
        aKolekce.data.data.Abefore.forEach((el, id) => {
          self.c1.aKalkBefore.push(el);
          //f.log("KOLEKCE 2 PUSH")
        });
      } catch (e) {
//        f.log('Kolekce ma potize 1',e)
  //       f.log('Kolekce ma potize 2',f.Jstr(kolekce))
        console.log("Kolekce ma potize 1");

      }

      //self.c1.aKalkBefore = aKolekce.data.data.Abefore;
      //await self.beforeArray(aKolekce.data.data.Abefore); //2.JARDA
      f.log("KOLEKCE 2: Return test", self.c1.TestRend, self.c1.IDEFIXACTIVELAST);

      self.c1.idRend++;
      self.c1.TestRend++;

      //return;

      //queryKalk.getTemplatesUser(self.c1.cTable);
      /*
      try {
        await queryKalk.setActive(0, self.c1.cTable, 0); //tj.vypne vse, nezalezina idefixu
        f.log('ZAB 2:')
      } catch (e) {
        console.log("1: ", e);
      }

      try {
        await self.setIdefixDeActive();
        f.log('ZAB 3:')
      } catch (e) {
        console.log("2: ", e);
      }
      try {
        await self.beforeArray(); //2.JARDA
        f.log('ZAB 4:')
      } catch (e) {
        console.log("3 ", e);
      }
      */
    },
    async setVL(idefix, jenUloz = 0) {
      const self = this;
      var idefixActive = self.c1.IDEFIXACTIVE;
      var neco = $("#Zmenad").get(0).value;
      f.log("1", "setVL", idefix, idefixActive);
      document.getElementById("obalKalkulace").style.opacity = 0.5;

      if (self.c1.StopStav) {
        self.mAlert("Cekam", 2000);
        f.log("2", "setVL");

        setTimeout(function() {
          //self.c1.StopStav=false
          f.log("3", "setVL");
        }, 2000);
        return;
      }
      self.c1.StopStav = true;

      if (idefixActive == 0 && self.c1.bKalkulace.length > 0 && idefix > 0) {
        alert("0. Je  treba ulozit neulozenou");
        f.log("4", "setVL");
        var dataRadka = f.dataRadka(0);

        try {
          f.log("EMIT 10 ", "SAVEZAZNAM");
          f.log("5", "setVL");
          await self.saveZaznam({ idefix: 0, data: dataRadka }, 3);
          f.log("6", "setVL");
          await self.setRender();
          f.log("7", "setVL");
          await self.setZabalit();
          f.log("8", "setVL");

          self.c1.Pocet++;
        } catch (e) {
          f.Alert("Vklad selhal");
        }
        //        alert('Bylo  treba ulozit neulozenou')
        //      return
      }
      var necoSave = 0;
      f.log("9", "setVL");
      necoSave = await self.SaveAll(idefix);
      if (jenUloz == 1) {
        f.log("10", "setVL");
        await self.setZabalit();
        f.log("11", "setVL");
        self.c1.StopStav = false;
        document.getElementById("obalKalkulace").style.opacity = 1;
        f.log("12", "setVL");
        return;
      }
      //alert("Save Result " + necoSave)
      if (necoSave < 0) {
        self.c1.StopStav = false;
        f.log("13", "setVL");
        document.getElementById("obalKalkulace").style.opacity = 1;
        f.log("14", "setVL");
        return;
      }

      if (idefixActive == 0 && idefix > 0) {
        f.log("15", "setVL");
        await self.setRozbalit(idefix);
        f.log("16", "setVL");
        self.c1.StopStav = false;
        document.getElementById("obalKalkulace").style.opacity = 1;
        f.log("17", "setVL");
        return;
      }
      if (idefixActive > 0 && idefix == idefixActive) {
        f.log("18", "setVL");
        await self.setRozbalit(idefix);
        f.log("19", "setVL");
        await self.setZabalit(idefix);
        f.log("20", "setVL");
        self.c1.StopStav = false;
        document.getElementById("obalKalkulace").style.opacity = 1;
        f.log("21", "setVL");
        return;
        //await self.setRozbalit(idefix)
      }
      if (idefixActive > 0 && idefix != idefixActive && idefix > 0) {
        f.log("22", "setVL");
        //alert('C Prebalit')
        await self.setZabalit();
        f.log("23", "setVL");
        await self.setRozbalit(idefix);

        f.log("24", "setVL");
        self.c1.StopStav = false;

        document.getElementById("obalKalkulace").style.opacity = 1;
        f.log("25", "setVL");
        return;
      }

      return;

      self.c1.bKalkulace = [];
      self.$store.dispatch("cleanKalk");
      await queryKalk.setActive(0, self.c1.cTable, 0); //tj.vypne vse, nezalezina idefixu
      self.setIdefixDeActive();
    },

    async setVLOld(idefix) {
      const self = this;
      var idefixActive = self.c1.IDEFIXACTIVE;

      await self.SaveAll(idefix);
      //  return

      //       eventBus.$emit('AskID2',{idefix:idefix})

      //return
      // alert('setVL '+ idefix)

      var neco = $("#Zmenad").get(0).value;
      if (idefixActive == 0 && self.c1.bKalkulace.length > 0) {
        // await self.addVL()
        f.Alert("Pridat novou kalkulaci!!!");
        return;
      }

      return;

      if (neco * 1 >= 0) {
        //self.c1.ID2ASK = -2
        //  await eventBus.$emit('AskID2',{idefix: idefixActive})

        //alert('Answer Index 2A: \n' + idefix + ' \n / Active :'+ idefixActive )
        //var dataRadka= f.dataRadka(self.c1.ID2ASK)

        var dataRadka1 = f.dataRadka(idefix);
        var dataRadka2 = f.dataRadka(idefixActive);

        if (self.c1.bKalkulace.length > 0) {
          if (idefixActive == 0) {
            //                 alert('kalkulace otevrena - vlozit novy')
          } else {
            //                alert('kalkulace otevrena - update pro '+ self.c1.IDEFIXACTIVE)
            f.log("EMIT 11 ", "SAVEZAZNAM");
            self.saveZaznam({ idefix: self.c1.IDEFIXACTIVE, data: dataRadka2 }, 2);
            if (idefix == self.c1.IDEFIXACTIVE) {
              //                alert('stejne, druhou nedelam')
            } else {
              f.log("EMIT 12 ", "SAVEZAZNAM");
              self.saveZaznam({ idefix: idefix, data: dataRadka1 }, 1);
            }
          }
          $("#Zmenad").get(0).value = 0;
        } else {
          alert("bez kalkulace");
          //self.saveZaznam({idefix: idefix, data: dataRadka1   },1)   //obe bez kalkulace
          //self.saveZaznam({idefix: idefix, data: dataRadka2   },1)
          $("#Zmenad").get(0).value = 0;

          //return
        }
      }

      if (idefix == idefixActive) {
        self.c1.bKalkulace = [];
        self.$store.dispatch("cleanKalk");
        await queryKalk.setActive(0, self.c1.cTable, 0); //tj.vypne vse, nezalezina idefixu
        self.setIdefixDeActive();
        return;
      }

      //&&  self.c1.IDEFIXACTIVELAST>0

      await queryKalk.setActive(idefix, self.c1.cTable);
      // return
      self.c1.IDEFIXACTIVE = idefix;
      //self.c1.IDEFIXACTIVE =  (await queryKalk.getActive(self.c1.cTable))
      // f.Alert2("RETAC", self.c1.IDEFIXACTIVE)
      var nK = await queryKalk.getTemplateUserIdefix(idefix, self.c1.cTable); //Aktualni kalulkulace

      //self.c1.aKalkBefore=[]
      self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable); //Vsechny kalkulace - c1.seznam

      //self.c1.bKalkulace=[]
      self.c1.bKalkulace = f.Jparse(nK[0].obsah);
      //self.c1.bKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
      await self.$store.dispatch("saveKalkCela", { data: self.c1.bKalkulace });
      self.setIdefixActive();

      if (self.c1.IDEFIXACTIVE > 0) {
        //AAAAAAA
        self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
      }
      setTimeout(function() {
        self.c1.idRend++;
        self.c1.TestRend++;
      }, 500);

      // self.KalkulaceThis = -1
      // self.c1.KalkulaceLast = -1
      return;
    },

    async saveVL(idefix) {
      const self = this;
      f.Alert("Uloz - update saveVL ", idefix);
      //var nK= await(queryKalk.getTemplate(self.form.idefix))
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

    deleteColxxx(iK, iS) {
      if (!confirm("Smazat sloupec")) return;
      eventBus.$emit("MenuHlavni", {
        kalkulaceid: iK,
        idxCol: iS,
        key: 555
      });
    },
    async copyColxxx(iK, iS) {
      const self = this;
      await self
        .pripravRadky2()
        .then(res => {
          self.$store.dispatch("copyCol", {
            kalkulaceid: iK,
            sloupecid: iS
          });
        })
        .then(res2 => {
          self.pripravRadky2();
        })
        .then(res3 => {
          self.c1.TestRend++;
        });
      return;
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
    async removeKalkAccIdXXXXX(idK) {
      const self = this;
      if (!confirm("Smazat radek")) return;
      //await self.pripravRadky2()
      $(".obal").animate({ opacity: 0.7 }, 200);
      self.$store.dispatch("removeKalkAccId", {
        kalkulaceid: idK
      });
      setTimeout(function() {
        self.c1.bKalkulace = JSON.parse(
          JSON.stringify(self.$store.state.Kalkulace)
        );
        setTimeout(function() {
          self.c1.TestRend++;
          $(".obal").animate({ opacity: 1 }, 200);
        }, 300);
      }, 100);
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
          oData.Formatc1.Sirka = 0;
          oData.FormatVyska = 0;
          oData.FormatTisk = 0; //Jednostranny,oboustranny, oboustranny ruzny
          oData.FormatPanelovat = 0;
          oData.Formatc1.SirkaPanel = 0;
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
            if (self.c1.KalkulaceLast != c1.KalkulaceLast) {
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
            if (self.c1.KalkulaceLast != c1.KalkulaceLast) {
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
      // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'Formatc1.Sirka' , value: 9999 })
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
