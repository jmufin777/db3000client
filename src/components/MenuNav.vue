<template>
     <v-list   dense class="pa-8 ma-8 elevation-20" style="opacity:1" >
    <v-list-tile >
     <v-list-tile-content>
       <v-list-tile-title>
         <el-input prefix-icon="el-icon-search" autofocus clearable size="mini" v-model="search" placeholder="Hledat v menu">
       </el-input>
       </v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
    <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Home</v-list-tile-title>
      </v-list-tile>

       <div style='display:none'>{{ xmenu2 = this.$store.state.xMenuMain }}</div>
      <div class="span_hide" v-for="(ym0, k ) in xmenu2" :key="k" v-model="xmenu2"   >

      <v-list-group   v-if="ym0[9]=='Group'"  value="true"    :prepend-icon="ym0[1]" class="">
      <v-list-tile slot="activator">
      <v-list-tile-title class="font-weight-black">
        {{ ym0[0] }}
        </v-list-tile-title>
      </v-list-tile><!-- Sem dalsi //-->

        <div class="span_hide" v-for="(ym1, k1 ) in ym0[10]" :key="k1"  v-model="ym0[10]"    >

        <v-list-group v-if="ym1[9]=='Group'"   no-action sub-group   :prepend-icon="ym1[1]" class="light-blue lighten-5">
        <v-list-tile slot="activator">
        <v-list-tile-title class="font-weight-black">{{ ym1[0] }}</v-list-tile-title>
        </v-list-tile><!-- Sem dalsi //-->
            <div class="span_hide" v-for="(ym2, k2 ) in ym1[10]" :key="k2"  v-model="ym1[10]"    >

            <v-list-group v-if="ym2[9]=='Group'"  no-action sub-group   :prepend-icon="ym2[1]" class="cyan lighten-5">
            <v-list-tile slot="activator">
            <v-list-tile-title class="font-weight-black">{{ ym2[0] }}X1</v-list-tile-title>
            </v-list-tile><!-- Sem dalsi //-->

              <div class="span_hide" v-for="(ym3, k3 ) in ym2[10]" :key="k3"  v-model="ym2[10]"    >

              <v-list-group v-if="ym3[9]=='Group'"   no-action sub-group   :prepend-icon="ym3[1]" class="light-blue lighten-5">
              <v-list-tile slot="activator">
              <v-list-tile-title class="font-weight-black">{{ ym3[0] }}</v-list-tile-title>
              </v-list-tile><!-- Sem dalsi //-->

                    <div class="span_hide" v-for="(ym4, k4 ) in ym3[10]" :key="k4"  v-model="ym3[10]"    >

                    <v-list-group v-if="ym4[9]=='Group'"  no-action sub-group   :prepend-icon="ym4[1]" class="cyan lighten-5">
                    <v-list-tile slot="activator">
                    <v-list-tile-title class="font-weight-black">{{ ym4[0] }}</v-list-tile-title>
                    </v-list-tile><!-- Sem dalsi //-->
                          <div class="span_hide" v-for="(ym5, k5 ) in ym4[10]" :key="k5"  v-model="ym4[10]"    >

                          <v-list-group v-if="ym5[9]=='Group'"  no-action sub-group   :prepend-icon="ym5[1]" class="light-blue lighten-5">
                          <v-list-tile slot="activator">
                          <v-list-tile-title class="font-weight-black">{{ ym5[0] }}</v-list-tile-title>
                          </v-list-tile><!-- Sem dalsi //-->

                            <div class="span_hide" v-for="(ym6, k6 ) in ym5[10]" :key="k6"   v-model="ym5[10]"    >

                            <v-list-group v-if="ym6[9]=='Group'"   no-action  sub-group   :prepend-icon="ym6[1]" class="cyan lighten-5">
                            <v-list-tile slot="activator">
                            <v-list-tile-title class="font-weight-black">{{ ym6[0] }}</v-list-tile-title>
                            </v-list-tile><!-- Sem dalsi //-->
                              <div class="span_hide"  v-for="(ym7, k7 ) in ym6[10]" :key="k7"  v-model="ym6[10]"    >
                              <v-list-group v-if="ym7[9]=='Group'"   no-action sub-group   :prepend-icon="ym7[1]" class="light-blue lighten-5">
                              <v-list-tile slot="activator">
                              <v-list-tile-title class="font-weight-black">{{ ym7[0] }}</v-list-tile-title>
                              </v-list-tile><!-- Sem dalsi //-->
                              </v-list-group>
                              <v-list-tile v-if="ym7[9]=='Item'  && ym7[0]!=='Aplikace'" @click="menu_switch(ym7)" class="cyan lighten-5"
                              v-bind:class="{JsemVidet: search <' ' || ym7[0].replace(RegExp(search,'i'),'')!==ym7[0], NejsemVidet:  search >' ' && ym7[0].replace(RegExp(search,'i'),'')==ym7[0]}"
                              >
                              <v-list-tile-action v-if="ym7[8]=='left'"><v-icon small style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                              <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 70" :key="y22">&nbsp;</span>{{ ym7[0] }}</v-list-tile-title></v-list-tile-content>
                              <v-list-tile-action v-if="ym7[8]=='right' ||  ym7[8]== ''"><v-icon style="height:10px">{{ym7[1]}}</v-icon></v-list-tile-action>
                              </v-list-tile>
                              </div>

                            </v-list-group>
                            <v-list-tile v-if="ym6[9]=='Item'  && ym6[0]!=='Aplikace'" @click="menu_switch(ym6)" class=""
                            v-bind:class="{JsemVidet: search <' ' || ym6[0].replace(RegExp(search,'i'),'')!==ym6[0], NejsemVidet:  search >' ' && ym6[0].replace(RegExp(search,'i'),'')==ym6[0]}"
                            >
                            <v-list-tile-action v-if="ym6[8]=='left'"><v-icon  small style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                            <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 60" :key="y22">&nbsp;</span>{{ ym6[0] }}</v-list-tile-title></v-list-tile-content>
                            <v-list-tile-action v-if="ym6[8]=='right' ||  ym6[8]== ''"><v-icon style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                            </v-list-tile>
                            </div>

                          </v-list-group>
                          <v-list-tile v-if="ym5[9]=='Item'  && ym5[0]!=='Aplikace'" @click="menu_switch(ym5)" class=""
                          v-bind:class="{JsemVidet: search <' ' || ym5[0].replace(RegExp(search,'i'),'')!==ym5[0], NejsemVidet:  search >' ' && ym5[0].replace(RegExp(search,'i'),'')==ym5[0]}"
                          >
                          <v-list-tile-action v-if="ym5[8]=='left'"><v-icon  small  style="height:10px">{{ym5[1]}}</v-icon></v-list-tile-action>
                          <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 50" :key="y22">&nbsp;</span>{{ ym5[0] }}</v-list-tile-title></v-list-tile-content>
                          <v-list-tile-action v-if="ym5[8]=='right' ||  ym5[8]== ''"><v-icon style="height:10px">{{ym5[1]}}</v-icon></v-list-tile-action>
                          </v-list-tile>
                          </div>

                    </v-list-group>
                    <v-list-tile v-if="ym4[9]=='Item'  && ym4[0]!=='Aplikace'" @click="menu_switch(ym4)" class=""
                    v-bind:class="{JsemVidet: search <' ' || ym4[0].replace(RegExp(search,'i'),'')!==ym4[0], NejsemVidet:  search >' ' && ym4[0].replace(RegExp(search,'i'),'')==ym4[0]}"
                    >
                    <v-list-tile-action v-if="ym4[8]=='left'"><v-icon  small  style="height:10px">{{ym4[1]}}</v-icon></v-list-tile-action>
                    <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 40" :key="y22">&nbsp;</span>{{ ym4[0] }}</v-list-tile-title></v-list-tile-content>
                    <v-list-tile-action v-if="ym4[8]=='right' ||  ym4[8]== ''"><v-icon style="height:10px">{{ym4[1]}}</v-icon></v-list-tile-action>
                    </v-list-tile>
                    </div>

              </v-list-group>
              <v-list-tile v-if="ym3[9]=='Item'  && ym3[0]!=='Aplikace'" @click="menu_switch(ym2)" class=""
              v-bind:class="{JsemVidet: search <' ' || ym3[0].replace(RegExp(search,'i'),'')!==ym3[0], NejsemVidet:  search >' ' && ym3[0].replace(RegExp(search,'i'),'')==ym3[0]}"
              >
              <v-list-tile-action v-if="ym3[8]=='left'"><v-icon  small  style="height:10px">{{ym3[1]}}</v-icon></v-list-tile-action>
              <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 30" :key="y22">&nbsp;</span>{{ ym3[0] }}</v-list-tile-title></v-list-tile-content>
              <v-list-tile-action v-if="ym3[8]=='right' ||  ym3[8]== ''"><v-icon style="height:10px">{{ym3[1]}}</v-icon></v-list-tile-action>
              </v-list-tile>
              </div>

            </v-list-group>
            <v-list-tile v-if="ym2[9]=='Item'  && ym2[0]!=='Aplikace'" @click="menu_switch(ym2)" class=""
            v-bind:class="{JsemVidet: search <' ' || ym2[0].replace(RegExp(search,'i'),'')!==ym2[0], NejsemVidet:  search >' ' && ym2[0].replace(RegExp(search,'i'),'')==ym2[0]}"
            >
            <v-list-tile-action v-if="ym2[8]=='left'"><v-icon  small  style="height:10px">{{ym2[1]}}</v-icon></v-list-tile-action>
            <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 20" :key="y22">&nbsp;</span>{{ ym2[0] }}</v-list-tile-title></v-list-tile-content>
            <v-list-tile-action v-if="ym2[8]=='right' ||  ym2[8]== ''"><v-icon style="height:10px">{{ym2[1]}}</v-icon></v-list-tile-action>
            </v-list-tile>
            </div>
        </v-list-group>
        <v-list-tile v-if="ym1[9]=='Item' && ym1[0]!=='Aplikace'" @click="menu_switch(ym1)" class=""
        v-bind:class="{JsemVidet: search <' ' || ym1[0].replace(RegExp(search,'i'),'')!==ym1[0], NejsemVidet:  search >' ' && ym1[0].replace(RegExp(search,'i'),'')==ym1[0]}"
        >
        <v-list-tile-action v-if="ym1[8]=='left'"><v-icon  small  style="height:10px">{{ym1[1]}}</v-icon></v-list-tile-action>
        <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 10" :key="y22">&nbsp;</span>{{ ym1[0] }}</v-list-tile-title></v-list-tile-content>
        <v-list-tile-action v-if="ym1[8]=='right' ||  ym1[8]== ''"><v-icon style="height:10px">{{ym1[1]}}</v-icon></v-list-tile-action>
        </v-list-tile>
        </div>

      </v-list-group>
      <v-list-tile  v-if="ym0[9]=='Item' && ym0[0]!=='Aplikace'" @click="menu_switch(ym0)" class=""
                    v-bind:class="{JsemVidet: search <' ' || ym0[0].replace(RegExp(search,'i'),'')!==ym0[0], NejsemVidet:  search >' ' && ym0[0].replace(RegExp(search,'i'),'')==ym0[0]}"
      >
      <v-list-tile-action v-if="ym0[8]=='left'"><v-icon  small  style="height:10px">{{ym0[1]}}</v-icon></v-list-tile-action>
      <v-list-tile-content ><v-list-tile-title   ><span v-for="y220 in 0" :key="y220">&nbsp;</span>{{ ym0[0] }}</v-list-tile-title></v-list-tile-content>
      <v-list-tile-action v-if="ym0[8]=='right' || ym0[8]=='' "><v-icon style="height:10px">{{ym0[1]}}</v-icon></v-list-tile-action>
      </v-list-tile>
      <v-spacer></v-spacer>
      </div>
     <v-list-tile @click="logout">
     <v-list-tile-action>
       <v-icon>directions_run</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Odhlasit</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>
   <v-list-tile @click="appCheck">
     <v-list-tile-action>
       <v-icon>directions_run</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Kontrola Aplikace</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

    </v-list>
</template>

<script>
/* eslint-disable */
import _ from 'lodash'
import _f from '@/funkce/Desktop_switch.js'
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default {
  props: {
      xmenu: {
         type: Array,
         required: false
      },
      xgroup: {
          type: String,
          required: true
      }
  },
  data: () => {
    return {
      search:'',
      xmenu2: [],
      server: null
    }
  },
  computed: {
    ...mapState([
      'xMenuMain'
      ])

  },
  created () {
    eventBus.$off('Menuf')
    eventBus.$on('Menuf', (pole) => {
    // alert('Emil prisel ???'+ pole )
      this.xmenu2 = []
      pole.forEach((ele) => {
    //    this.xmenu2.push(ele)
      })

    })

  },
  methods: {
    menu_switch: function (par) {
      eventBus.$emit('menu_switch', par)
    },
    logout () {
      eventBus.$emit('logout')
    }
    ,appCheck: function () {
      eventBus.$emit('appCheck')


    }
  }
}
</script>
<style scoped>
.span_hide {
  visibility: visible;

}

</style>
