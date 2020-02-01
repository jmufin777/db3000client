<template>
  <div>
    <span slot="prehled">

        <!-- <v-btn-toggle v-if="showPrehled==1 && iP==0"> -->
        <v-btn-toggle>
          <v-btn flat value="vyroba">Vyroba</v-btn>
          <v-btn flat value="expedice">Expedice</v-btn>
          <v-btn flat value="data">Data</v-btn>
          <v-btn flat value="vl">Vl</v-btn>
        </v-btn-toggle>
        <draggable
          v-model="aKalkulace"
          :options="{group: 'people2' }"
          @start="drag=true"
          @end="chooseSloupce"
        >
          <div v-for="(iK,i) in aKalkulace" :key="i" style="width:100%;">
            <div style="width:2%;float:left">
              <v-card>
                <v-card-text>{{iK.kalkulaceid}}</v-card-text>
              </v-card>
            </div>
            <div style="float:left">
              <v-card>
                <v-card-title style="font-size:12px;height:14px">{{Kalkulace[i].data.txtStroj}}</v-card-title>
                <v-card-text>
                  <div class="white" style="float:left">RozmerOS {{Kalkulace[i].data.txtFormat}}</div>
                  <div>{{Kalkulace[i].data.FormatSirka}}x{{Kalkulace[i].data.FormatVyska}}mm</div>
                  <div class="white" style="float:left">Panelovat</div>
                  <div>{{Kalkulace[i].data.FormatPanelovat}}</div>
                  <div class="white" style="float:left">Naklad</div>
                  <div>{{Kalkulace[i].data.FormatNakladKs}}</div>
                </v-card-text>
              </v-card>
            </div>
            <draggable
              v-model="iK.sloupecid"
              :options="{group: 'people1' }"
              @start="drag=true"
              @end="chooseSloupce"
            >
              <div v-for="(sl, iSloupce ) in iK.sloupecid" :key="iSloupce" style="float:left">
                <v-card>
                  <v-card-title style="font-size:12px;height:14px">Typ: {{sl.type}}</v-card-title>
                  <v-card-text>
                    <div
                      class="white"
                      style="font-size:12px;height:14px"
                    >Mat11:{{ getVal(sl.data.mat,"nazev")}}</div>
                    <div
                      class="white"
                      style="font-size:12px;height:14px"
                    >Stroj:{{ getVal(sl.data.stroj, "nazev")}}</div>
                    <div class="white" style="float:left">Naklad:</div>
                    <div class="white" style="float:left">{{sl.data.naklad}}</div>
                  </v-card-text>
                </v-card>
              </div>
            </draggable>
            <div style="width:1%">.</div>
          </div>
        </draggable>
      </span>

  </div>
</template>

<script>
export default {
  data(){
    return {
      aKalkulace:[]
    }
  }
}
</script>
