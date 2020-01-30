<template>
  <transition name="fade" slot="PlovouciObsah2">
<vue-draggable-resizable
      class="grey lighten-2 pa-0 elevation-12"
      style="opacity:1;max-width:2000px;max-height:550px;z-index:1000"
      :h="20"
      :w="1000"
      :x="-1000"
      :parent="false"
      :drag-handle="'.drag00'"
      :handles="[]"
      v-if="zobrazitPrehled && aKalkulace.length>0"
    >
      <div class="drag00 teal lighten-4" style="cursor:pointer;height:20px">
        <div style="width:10%;float:left">
          <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button>
        </div>
        <div style="width:70%;float:left">Kalkulace</div>
        <div style="width:19%;float:right;text-align:right">
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
                  <td>Format</td>
                  <td>{{iK.data.txtFormat}}</td>
                </tr>
                <tr>
                  <td>Kusu</td>
                  <td>{{iK.data.FormatNakladKs}}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
          <v-card style="width:60%;float:left">
            <v-card-title>Detail</v-card-title>
            <v-card-text>
              <table>
                <tr>
                  <td v-for="(Sloupec, idSloupce) in iK.sloupecid" :key="idSloupce">{{Sloupec.type}}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-card>
      </div>
    </vue-draggable-resizable>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/main.js";
import { getters } from 'vuex';
import { mutations } from 'vuex';
import { setTimeout, clearInterval, setInterval } from "timers";
import f from '@/services/fce';

export default {

  props: {
    ID: {
      required: true
    }
    }  ,
  data() {
    return {
      aKalkulace:[],
      nC:0,
      TestRend:1,
      StatusMapy: "Prehled",
      zobrazitPanel:false,
      zobrazitPrehled:false,
      f:f
    }

  },
  mounted(){
    const self=this
    self.nC=0
    setInterval(function(){
      self.nC= self.nC+1
      self.TestRend= self.nC+1
      self.aKalkulace=[]
      self.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.TestRend= self.nC+1
      //console.log('nC ', self.nC, f.Jstr(self.aKalkulace))
    },2000)

  },
  methods: {
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
    async chooseRadky(event, bEvent) {
      const self = this;
      return;
    },
    async removeKalkAccId(idK) {
      const self = this;
      if (!confirm("Smazat radek")) return;
      //await self.pripravRadky2()
      $(".obal").animate({ opacity: 0.7 }, 200);
      self.$store.dispatch("removeKalkAccId", {
        kalkulaceid: idK
      });
      setTimeout(function() {
        self.aKalkulace = JSON.parse(
          JSON.stringify(self.$store.state.Kalkulace)
        );
        setTimeout(function() {
          self.TestRend++;
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
      var tmpKalk = JSON.parse(JSON.stringify(self.aKalkulace));
      tmpKalk.forEach((el, idx) => {
        tmpKalk[idx].kalkulaceid = idx + 1;
        // el.kalkulaceid =idx +1
      });
      //f.Alert2(tmpKalk[idx].kalkulaceid)
      self.$store.dispatch("saveKalkCela", { data: tmpKalk });
      self.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.TestRend++;
    },
    async pripravRadky2() {
      const self = this;
      self.aKalkulace = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
      self.drag = true;
      return;
    },
    k_id() {
      var kRet = this.$store.getters.getId(this.KalkulaceThis);
      return kRet;
    },

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

}
</script>

