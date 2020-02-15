<template>
<div v-if="true" style="position:relative;font-size:110%">
            <button
              class="px-4 tlacitkoMenu elevation-2 hoVer"
              @click="fceSwitch13N.to2N(c1.polozka_nab)"
              v-if="!f.isEmpty(c1.polozka_nab)"
            >Polozky 2Z OK</button>
            <button
              class="px-4 tlacitkoMenu elevation-2 hoVer"
              @click="fceSwitch13N.to3N(c1.polozka_nab,1)"
              v-if="!f.isEmpty(c1.polozka_nab)"
            >3Z A</button>

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
                  @keyup="fceSeznam.Seznam('nab')"
                />
                Cislo:
                <input
                  v-model="c1.search_nab_cislo"
                  type="text"
                  class="white px-2"
                  style="height:15px;font-size:12px;background:white !important;width:10em;border: solid 1px black;font-size:110%"
                  @keyup="fceSeznam.Seznam('nab')"
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
                  @keyup="fceSeznam.Seznam('nab')"
                />

                <span style="background:#d9e1e7;border-radius:0px 10px 10px 0px;" class="pr-2">
                  <i class="el-icon-search d3" style="font-weight:bold;height:15px;color:#89a4b3"></i>
                </span>
                <button
                  style="border-radius::0px 10px 10px 0px;"
                  @click="c1.seek_nab_moje=!c1.seek_nab_moje;fceSeznam.Seznam('nab')"
                  title="Moje zakazky"
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
                          ;fceSeznam.Seznam('nab')"
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

              <span v-if="c1.seznam_nab_sum.length>0">
                {{c1.seznam_nab_sum}}
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
          </div>

</template>

<script>
import f from '@/services/fce';
import c1 from './CalcCentral.js'; // Prehledova dole
import fceSwitch13N from './CalcFceSwitch13N.js'; // Prehledova dole
import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam


export default {
  data () {
    return {
      f: f,
      c1: c1,
      fceSwitch13N:fceSwitch13N,
      fceSeznam: fceSeznam,
    }
  }

}
</script>
