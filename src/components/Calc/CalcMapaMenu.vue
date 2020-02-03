<template>
<div v-if="Kalkulace.length>0">
  <div
    style="right:10%;;top:-56px;z-index:99999;border-radius:20px !important"
    class="plovouci grey lighten-1 pt-2 pb-2"
    id="plovoucimapa11"
  >
    <v-btn @click="panel(2,$event)" small class="yellow">MAPA </v-btn>
    <br />
    <v-btn @click="panelPrehled(2,$event)" small class="yellow">Kalkulace</v-btn>
    <br />
    <el-dropdown
      split-button
      size="small"
      trigger="click"
      @command="zmenaType"
      :key="$store.state.KalkulaceThis"
      class="px-1"
    >
      Typ sloupce

      {{ $store.state.KalkulaceThis }}
      <el-dropdown-menu slot="dropdown" class="grey lighten-5">
        <el-dropdown-item :command="'Mat1'">Materialyos</el-dropdown-item>
        <el-dropdown-item :command="'Laminace'">Laminace</el-dropdown-item>
        <el-dropdown-item :command="'Kasir'">Kasir</el-dropdown-item>
        <el-dropdown-item :command="'Rezani'">Rezani</el-dropdown-item>
        <el-dropdown-item :command="'Baleni'">Baleni</el-dropdown-item>
        <el-dropdown-item :command="'Jine'">Jine</el-dropdown-item>
        <el-dropdown-item :command="'Externi'">Externi</el-dropdown-item>
        <el-dropdown-item :command="'DTP'">DTP</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>

  <span >
  <mapa :ID="'mapa_'+ID" ref="mapa"
  ></mapa>
  <prehled :ID="'prehled_'+ID" ref="prehled"
  ></prehled>
  </span>

</div>

</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/main.js";
import { setTimeout, clearInterval, setInterval } from "timers";
import Mapa     from './CalcMapa'
import Prehled     from './CalcMapaPrehled'
import Q from "@/services/query";
import f from '@/services/fce';


export default {
  props: {

  },
  components: {
         'mapa': Mapa,
         'prehled':Prehled,
  },
  data() {
    return {
      aKalkulace:[],
      zobrazitPanel:false,
      ID:0,
      aVars:[],
    }
  },
  watch: {},
  created() {
    const self=this
    // Nacist kalkulaci
    eventBus.$off("KalkulaceRead");
    eventBus.$on("KalkulaceRead", server=>{

      // self.$refs.mapa.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      alert('read')
    });


  },
  mounted() {
    const self=this
    this.ID = Math.round(Math.random() * 19834581377);
    let nTest=0

  },
  methods: {
    panel(zobraz = 1, e = 0) {
      const self = this;
      switch (zobraz) {
        case 1:
          this.$refs.mapa.zobrazitPanel = true;
          self.$refs.mapa.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
          break;
        case 0:
          this.$refs.mapa.zobrazitPanel = false;
          self.$refs.mapa.aKalkulace2 = []
          break;
        case 2:
          f.log("LLL 2", self.$refs.mapa.zobrazitPanel)
          self.$refs.mapa.zobrazitPanel = !self.$refs.mapa.zobrazitPanel
          if (self.$refs.mapa.zobrazitPanel) {
              eventBus.$emit('NaplnKalkulaci')
          }
          break;
      }
    },
    panelPrehled(zobraz = 1, e = 0) {
      const self = this;
      switch (zobraz) {
        case 1:
          f.log("LLL 1", self.$refs.prehled.zobrazitPrehled)
          self.$refs.prehled.zobrazitPrehled = true;
          break;
        case 0:
          f.log("LLL 0", self.$refs.prehled.zobrazitPrehled)
          self.$refs.prehled.zobrazitPrehled = false;

          break;
        case 2:
          f.log("LLL 2", self.$refs.prehled.zobrazitPrehled)
          self.$refs.prehled.zobrazitPrehled = !self.$refs.prehled.zobrazitPrehled;
          if (self.$refs.prehled.zobrazitPrehled){
            eventBus.$emit('NaplnKalkulaciPrehledu')
          }
          break;
      }
    },
    zmenaType(cSloup = "") {  //Jedina funkce ktere meni primo vuex, nesuvisi s mapou, ale aktualizuje ji
      const self = this;
      /// f.Alert('a')
      //self.KalkulaceThis = self.$store.state.KalkulaceThis;

      var idK = self.KalkulaceThis - 1;

      var idK = this.k_id();

      self.$store.dispatch("addColMat2", {
        kalkulaceid: idK,
        type: cSloup,
        id: Math.random()
      });
      f.log(self.$refs.mapa.zobrazitPanel)
      if (self.$refs.mapa.zobrazitPanel) {  //When Mapa is Open
        eventBus.$emit('NaplnKalkulaci')
      }
      eventBus.$emit('Rend')

      //eventBus.$emit('mywatch')

      return
      self.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.$store.dispatch("saveKalkCela", { data: self.aKalkulace });
      self.TestRend++;
    },
    k_id() {
      var kRet = this.$store.getters.getId(this.KalkulaceThis);
      return kRet;
    },
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
      'user',
    ]),

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
</style>
