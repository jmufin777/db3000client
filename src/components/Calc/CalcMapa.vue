<template >
  <transition name="fade" slot="PlovouciObsah" v-if="zobrazitPanel && aKalkulace.length>0">
    <vue-draggable-resizable
      class="grey lighten-2 pa-0 elevation-12"
      style="opacity:1;max-width:2000px;max-height:550px"
      :h="20"
      :w="1000"
      :x="-1000"
      :parent="false"
      :drag-handle="'.drag00'"
      :handles="[]"
    >

      <div class="drag00 blue lighten-4" style="cursor:pointer;height:20px" :key="'M'+ TestRend">
        <div>
        SSS {{ TestRend }} {{ID}} {{zobrazitPanel}}
        </div>
        <div style="width:10%;float:left">
          <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">{{TestRend}}</button>
        </div>
        <div style="width:70%;float:left">{{StatusMapy}}</div>
        <div style="width:19%;float:right;text-align:right">
          <button class="mybutton pr-3 stred pl-3" @click="zobrazitPanel=!zobrazitPanel;f.Alert(zobrazitPanel)">x</button>
        </div>
      </div>
      <div class="pa-0 pt-1" style="width:100%;max-height:550px;overflow-y:auto">
        <v-card>
          <v-card-text class="grey pa-0">
            <draggable
              v-model="aKalkulace"
              :options="{group: 'people2' }"
              @start="pripravRadky2()"
              @end="drag=false;chooseRadky2()"
              :move="chooseRadky"
              style="min-width:500px;"
            >
              <div
                v-for="(iK,i) in aKalkulace"
                :key="i"
                style="width:100%;float:none"
                class="grey lighten-2 pl-1 pt-1"
              >
                <div style="float:left;border:4px solid #eeeeee">
                  <!-- @click="setKalk2(i);f.Alert2('klik2')" -->
                  <!-- @mouseover="setKalk2(i)"  -->
                  <!-- @mouseenter="setKalk(iK.kalkulaceid)" -->
                  <v-card @click="setKalk(iK.kalkulaceid)">
                    <v-card-text
                      style="width:15em;font-size:12px;min-height:29px;cursor:pointer;text-align:left"
                      class="pb-0 pt-0 grey lighten-3"
                      :class="{'green lighten-1': $store.state.KalkulaceThis*1 == iK.kalkulaceid*1 }"
                    >
                      <a
                        :href="'#'+iK.kalkulaceid"
                        @click="setKalk(iK.kalkulaceid)"
                        :ref="'ref_'+iK.kalkulaceid"
                        :id="'ref_'+iK.kalkulaceid + ID"
                      >
                        <span class="pr-2">{{iK.kalkulaceid}}</span>
                      </a>
                      <span class="pl-0">{{Kalkulace[i].data.txtStroj}}</span>
                      <span style="position:absolute;top:0px;right:1px">
                        <button
                          type="button"
                          class="elevation-1 mybutton"
                          @click="removeKalkAccId(i)"
                        >x</button>
                      </span>
                      <span
                        style="position:absolute;bottom:0px;left:1px"
                        class="elevation-1 mybutton"
                      >
                        <button type="button" @click="copyKalk(i)">+</button>
                      </span>
                    </v-card-text>
                  </v-card>
                </div>
                <!-- <draggable v-model="iK.sloupecid"  :options="{group: 'people11' }"  @start="drag=true" @end="drag=false" :move="chooseSloupce" > -->
                <draggable
                  v-model="iK.sloupecid"
                  :options="{group: 'people11' }"
                  @start="pripravRadky2()"
                  @end="drag=false;chooseRadky2()"
                  :move="chooseSloupce"
                >
                  <div
                    v-for="(sl, iSloupcex ) in iK.sloupecid"
                    :key="iSloupcex"
                    style="float:left;border:2px solid white;width:8em;text-align:center"
                  >
                    <!-- <v-card><v-card-text style="font-size:12px;height:28px" class="pb-1 pt-1" -->
                    <v-card>
                      <v-card-text
                        style="font-size:12px;height:28px"
                        class="pb-1 pt-1"
                        :class="{
                    'blue lighten-4': $store.state.KalkulaceColThis==sl.id,
                    'brown lighten-3': sl.type=='Mat1','green lighten-1': sl.type=='Laminace','orange lighten-1': sl.type=='Kasir','yellow lighten-2': sl.type=='Rezani','   lighten-2': sl.type=='Rezani'
                    , 'pink lighten-5': sl.type =='Baleni', 'red lighten-2': sl.type=='Jine'
                    , 'cyan lighten-3': sl.type =='DTP' , 'lime lighten-3': sl.type =='Externi'

                    }"
                      >
                        <span
                          :class="{'elevation-12':$store.state.KalkulaceColThis==sl.id}"
                        >{{sl.type}}</span>
                        <span style="position:absolute;top:0px;right:1px">
                          <button
                            type="button"
                            class="elevation-1 mybutton"
                            @click="deleteCol(i, iSloupcex)"
                          >x</button>
                        </span>
                        <span
                          style="position:absolute;bottom:0px;left:1px"
                          class="elevation-1 mybutton"
                          @click="copyCol(i, iSloupcex)"
                        >
                          <button type="button">+</button>
                        </span>
                      </v-card-text>
                    </v-card>
                  </div>
                </draggable>
                <div style="width:10%;font-size:1px">&nbsp;</div>
              </div>
            </draggable>
          </v-card-text>
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
      StatusMapy: "Mapa",
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
