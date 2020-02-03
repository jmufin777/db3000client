<template >
  <transition name="fade" slot="PlovouciObsah" v-if="zobrazitPanel  && aKalkulace2.length>0">
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
      <div class="drag00 blue lighten-4" style="cursor:pointer;height:28px" :key="'M'+ TestRend">
        <div style="width:10%;float:left">
          <button class="mybutton pr-3 stred pl-3" @click="TestRend=TestRend+1">&nbsp;</button> <!--{{TestRend}} Infomrace o prekreslovani, ted ni treba, bude zrejme smazano//-->
        </div>
        <div style="width:70%;float:left"><button @click="NaplnKalkulaci()" class="green px-4">{{StatusMapy}}</button> <span style="float:right">
          <el-checkbox size="medium" type="danger" v-model="neprekresluj"
          >{{neprekresluj?'Neaktualizuji':'Aktualizuji'}}</el-checkbox>
          <el-button v-if="neprekresluj" @click="mywatch()" size="mini" type="warning">Aktualizace</el-button>
          </span></div>
        <div style="width:19%;float:right;text-align:right">
          <button class="mybutton pr-3 stred pl-3" @click="zobrazitPanel=!zobrazitPanel;">x</button>
        </div>
      </div>
      <div class="pa-0 pt-1" style="width:100%;max-height:550px;overflow-y:auto">
        <v-card>
          <v-card-text class="grey pa-0">
            <draggable
              v-model="aKalkulace2"
              :options="{group: 'people222' }"
              @start="pripravRadky2()"
              @end="drag=false;chooseRadky2()"
              :move="chooseRadky"
              style="min-width:500px;"
            >
              <div
                v-for="(iK,i) in aKalkulace2"
                :key="i"
                style="width:100%;float:none"
                class="grey lighten-2 pl-1 pt-1"
              >
                <div style="float:left;border:4px solid #eeeeee">
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
                      <span class="pl-0">{{aKalkulace2[i].data.txtStroj}}</span>
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

                <draggable
                  v-model="iK.sloupecid"
                  :options="{group: 'people11' }"
                  @start="pripravRadky2()"
                  @end="drag=false;chooseSloupce2()"
                  :move="chooseSloupce"
                >
                  <div
                    v-for="(sl, iSloupcex ) in iK.sloupecid"
                    :key="iSloupcex"
                    style="float:left;border:2px solid white;width:8em;text-align:center"
                  >
                    <v-card>
                      <v-card-text
                        style="font-size:12px;height:28px;cursor:pointer"
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
import _ from 'lodash';
import f from '@/services/fce';
import { resolve } from 'url';


export default {

  props: {
    ID: {
      required: true
    }
    }  ,
  data() {
    return {
      aKalkulace2:[],
      aKalkulace:[],
      nC:0,
      TestRend:1,
      StatusMapy: "Mapa",
      zobrazitPanel:false,
      neprekresluj: false,
      zobrazitPrehled:false,
      f:f
    }
  },
  watch: {
 aKalkulace2: function() {
   if (!this.neprekresluj) {
     this.mywatch()  //Kod pro ulozeni, nekera operace watch neregistruje, napri. kopie sloupce, je proto volana po akci
   }
  },
zobrazitPanel: function() {
  if (!this.zobrazitPanel) {
    this.aKalkulace2=[]
  }
}

  },
 mounted(){
  const self=this
    self.nC=0
    eventBus.$off('mywatch') ;
    eventBus.$on('mywatch',server =>{
         self.$store.dispatch("saveKalkCela", { data: JSON.parse(JSON.stringify(self.aKalkulace2)) });
         eventBus.$emit('Rend')
      //self.mywatch()
    })

    eventBus.$off('NaplnKalkulaci') ;
    eventBus.$on('NaplnKalkulaci',server =>{
        if (!self.zobrazitPanel)    {
          // f.log('Delka ',self.aKalkulace2.length)
          return
        }
            self.NaplnKalkulaci()
            if (self.aKalkulace2.length > 3 ) {
              self.neprekresluj = true
            }
            //self.aKalkulace2 = _.filter(self.$store.state.Kalkulace, function(){ return true})
            //alert('Plnim')
    })
    setInterval(function(){
         if (!self.aKalkulace2[0]==null && self.aKalkulace2[0].hasOwnProperty('kalkulaceid')) {
           f.log('Stejn 11 y', f.Jstr(self.aKalkulace2[0].kalkulaceid))
         }
    },1000)
  },
  methods: {
    mywatch(){  //Sloupce nevyvolaji akci watch pri zmenach , je proto volana z  mist kde watch nezabere
       const self = this
      if (this.aKalkulace2.length>0 &&  ! _.isEqual(this.aKalkulace2, this.Kalkulace)) {
         self.$store.dispatch("saveKalkCela", { data: JSON.parse(JSON.stringify(self.aKalkulace2)) });
         eventBus.$emit('Rend')
      }
    },
    NaplnKalkulaci(){
          const self = this
          self.aKalkulace2 = JSON.parse(JSON.stringify(self.$store.state.Kalkulace));
          self.chooseRadky2()
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
    async chooseRadky(event, bEvent) {
      const self = this;
      return;
    },
    async removeKalkAccId(idK) {
      const self = this;
      if (!confirm("Smazat radek")) return;
      self.aKalkulace2.splice(idK,1)
      self.chooseRadky2()
      return
    },
    copyKalk (idx) {
        const self = this
        //var idx = this.getters.getId(dataAll.kalkulaceid)
        //alert(idx)
        //alert(self.aKalkulace2.length)
        return new Promise((resolve)=>{


        var neco = JSON.parse(JSON.stringify(self.aKalkulace2[idx]))
        var newId=self.aKalkulace2.length+1
        var newIdC=0
        neco.kalkulaceid = newId
        neco.data.Priloha1Txt=''
        neco.data.Priloha1Idefix=0
        neco.data.Priloha2Txt=''
        neco.data.Priloha2Idefix=0
        neco.data.Priloha3Txt=''
        neco.data.Priloha3Idefix=0
        neco.data.Priloha4Txt=''
        neco.data.Priloha4Idefix=0
        neco.data.Priloha5Txt=''
        neco.data.Priloha5Idefix=0
        if (neco.sloupecid.length>0){
            newIdC=Math.ceil(Math.random()*5587515)
            neco.sloupecid.forEach(el=>{
            el.id = newIdC++
        //    // console.log("copyKalk ", neco)
          })
        }
        self.aKalkulace2.push(neco)
        resolve(self.chooseRadky2())
        })


        //state.Kalkulace.push = dataAll
    },
    async chooseSloupce(event, bEvent) {
      return
    },
    async chooseSloupce2(event, bEvent) {
      const self = this;
      self.aKalkulace2 = JSON.parse(JSON.stringify(self.aKalkulace2));
      return;
    },
    async chooseRadky2() {  //Ocisluje id podle poradi indexu pole od 1
      const self = this;
      return new Promise((resolve)=>{
       self.aKalkulace2.forEach((el, idx) => {
         self.aKalkulace2[idx].kalkulaceid = idx+1;
       })
      resolve(1)
      return
      })
    },
    async pripravRadky2() {
      const self = this;
      self.drag = true;
      return
    },
    async copyCol(iK, iS) {
      const self = this;
      let prvek = f.Jparse(self.aKalkulace2[iK].sloupecid[iS])
        prvek.id=Math.ceil(Math.random()*55875115)
        self.aKalkulace2[iK].sloupecid.push(prvek)
        if (!self.neprekresluj) {
          this.mywatch()  //Kod pro ulozeni, nekera operace watch neregistruje, napri. kopie sloupce, je proto volana po akci
        }
      f.log(iK, iS,f.Jstr(prvek))
      return
    },

    deleteCol(iK, iS) {
      const self = this;
      if (!confirm('Smazat sloupec '+ iK + '/ ' + iS + '?')) return;
      self.aKalkulace2[iK].sloupecid.splice(iS,1)
        if (!self.neprekresluj) {
          this.mywatch()  //Kod pro ulozeni, nekera operace watch neregistruje, napri. kopie sloupce, je proto volana po akci
        }
      return ;
      eventBus.$emit("MenuHlavni", {
        kalkulaceid: iK,
        idxCol: iS,
        key: 555
      });
    },
    defaultStyle(setkalkId) {
      const self = this;
      var neco;
      self.aKalkulace2.forEach(element => {
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
<style scoped>
.custom-icon {
   font-size: 6px;
}
</style>
