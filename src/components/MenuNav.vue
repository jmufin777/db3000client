<template>
<v-navigation-drawer
      v-model="drawer"
      fixed
      app
      clipped
      light

    >
     <v-list   dense class="pa-8 ma-8 elevation-20" style="opacity:1" >
      <span  v-for="(ym0, k ) in xmenu2" :key="k" v-model="xmenu2"   >
      <v-list-group   v-if="ym0[9]=='Group'"  value="1"    :prepend-icon="ym0[1]" class="">
      <v-list-tile slot="activator">
      <v-list-tile-title class="font-weight-black">
        {{ ym0[0] }}
        </v-list-tile-title>
      </v-list-tile><!-- Sem dalsi //-->

        <span v-for="(ym1, k1 ) in ym0[10]" :key="k1"  v-model="ym0[10]"    >

        <v-list-group v-if="ym1[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym1[1]" class="">
        <v-list-tile slot="activator">
        <v-list-tile-title class="font-weight-black">{{ ym1[0] }}</v-list-tile-title>
        </v-list-tile><!-- Sem dalsi //-->
            <span v-for="(ym2, k2 ) in ym1[10]" :key="k2"  v-model="ym1[10]"    >

            <v-list-group v-if="ym2[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym2[1]" class="">
            <v-list-tile slot="activator">
            <v-list-tile-title class="font-weight-black">{{ ym2[0] }}</v-list-tile-title>
            </v-list-tile><!-- Sem dalsi //-->

              <span v-for="(ym3, k3 ) in ym2[10]" :key="k3"  v-model="ym2[10]"    >

              <v-list-group v-if="ym3[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym3[1]" class="">
              <v-list-tile slot="activator">
              <v-list-tile-title class="font-weight-black">{{ ym3[0] }}</v-list-tile-title>
              </v-list-tile><!-- Sem dalsi //-->

                    <span v-for="(ym4, k4 ) in ym3[10]" :key="k4"  v-model="ym3[10]"    >

                    <v-list-group v-if="ym4[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym4[1]" class="">
                    <v-list-tile slot="activator">
                    <v-list-tile-title class="font-weight-black">{{ ym4[0] }}</v-list-tile-title>
                    </v-list-tile><!-- Sem dalsi //-->

                          <span v-for="(ym5, k5 ) in ym4[10]" :key="k5"  v-model="ym4[10]"    >

                          <v-list-group v-if="ym5[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym5[1]" class="">
                          <v-list-tile slot="activator">
                          <v-list-tile-title class="font-weight-black">{{ ym5[0] }}</v-list-tile-title>
                          </v-list-tile><!-- Sem dalsi //-->

                            <span v-for="(ym6, k6 ) in ym5[10]" :key="k6"   v-model="ym5[10]"    >

                            <v-list-group v-if="ym6[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym6[1]" class="">
                            <v-list-tile slot="activator">
                            <v-list-tile-title class="font-weight-black">{{ ym6[0] }}</v-list-tile-title>
                            </v-list-tile><!-- Sem dalsi //-->
                              <span  v-for="(ym7, k7 ) in ym6[10]" :key="k7"  v-model="ym6[10]"    >
                              <v-list-group v-if="ym7[9]=='Group'"  value="true"  sub-group   :prepend-icon="ym7[1]" class="">
                              <v-list-tile slot="activator">
                              <v-list-tile-title class="font-weight-black">{{ ym7[0] }}</v-list-tile-title>
                              </v-list-tile><!-- Sem dalsi //-->
                              </v-list-group>
                              <v-list-tile v-if="ym7[9]=='Item'" @click="menu_switch(ym7)" class="">
                              <v-list-tile-action v-if="ym7[8]=='left'"><v-icon style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                              <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 70" :key="y22">&nbsp;</span>{{ ym7[0] }} : {{ k7 }}</v-list-tile-title></v-list-tile-content>
                              <v-list-tile-action v-if="ym7[8]=='right' ||  ym7[8]== ''"><v-icon style="height:10px">{{ym7[1]}}</v-icon></v-list-tile-action>
                              </v-list-tile>
                              </span>

                            </v-list-group>
                            <v-list-tile v-if="ym6[9]=='Item'" @click="menu_switch(ym6)" class="">
                            <v-list-tile-action v-if="ym6[8]=='left'"><v-icon style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                            <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 60" :key="y22">&nbsp;</span>{{ ym6[0] }} : {{ k6 }}</v-list-tile-title></v-list-tile-content>
                            <v-list-tile-action v-if="ym6[8]=='right' ||  ym6[8]== ''"><v-icon style="height:10px">{{ym6[1]}}</v-icon></v-list-tile-action>
                            </v-list-tile>
                            </span>

                          </v-list-group>
                          <v-list-tile v-if="ym5[9]=='Item'" @click="menu_switch(ym5)" class="">
                          <v-list-tile-action v-if="ym5[8]=='left'"><v-icon style="height:10px">{{ym5[1]}}</v-icon></v-list-tile-action>
                          <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 50" :key="y22">&nbsp;</span>{{ ym5[0] }} : {{ k5 }}</v-list-tile-title></v-list-tile-content>
                          <v-list-tile-action v-if="ym5[8]=='right' ||  ym5[8]== ''"><v-icon style="height:10px">{{ym5[1]}}</v-icon></v-list-tile-action>
                          </v-list-tile>
                          </span>

                    </v-list-group>
                    <v-list-tile v-if="ym4[9]=='Item'" @click="menu_switch(ym4)" class="">
                    <v-list-tile-action v-if="ym4[8]=='left'"><v-icon style="height:10px">{{ym4[1]}}</v-icon></v-list-tile-action>
                    <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 40" :key="y22">&nbsp;</span>{{ ym4[0] }} : {{ k4 }}</v-list-tile-title></v-list-tile-content>
                    <v-list-tile-action v-if="ym4[8]=='right' ||  ym4[8]== ''"><v-icon style="height:10px">{{ym4[1]}}</v-icon></v-list-tile-action>
                    </v-list-tile>
                    </span>

              </v-list-group>
              <v-list-tile v-if="ym3[9]=='Item'" @click="menu_switch(ym2)" class="">
              <v-list-tile-action v-if="ym3[8]=='left'"><v-icon style="height:10px">{{ym3[1]}}</v-icon></v-list-tile-action>
              <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 30" :key="y22">&nbsp;</span>{{ ym3[0] }} : {{ k3 }}</v-list-tile-title></v-list-tile-content>
              <v-list-tile-action v-if="ym3[8]=='right' ||  ym3[8]== ''"><v-icon style="height:10px">{{ym3[1]}}</v-icon></v-list-tile-action>
              </v-list-tile>
              </span>

            </v-list-group>
            <v-list-tile v-if="ym2[9]=='Item'" @click="menu_switch(ym2)" class="">
            <v-list-tile-action v-if="ym2[8]=='left'"><v-icon style="height:10px">{{ym2[1]}}</v-icon></v-list-tile-action>
            <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 20" :key="y22">&nbsp;</span>{{ ym2[0] }} : {{ k2 }}</v-list-tile-title></v-list-tile-content>
            <v-list-tile-action v-if="ym2[8]=='right' ||  ym2[8]== ''"><v-icon style="height:10px">{{ym2[1]}}</v-icon></v-list-tile-action>
            </v-list-tile>
            </span>
        </v-list-group>
        <v-list-tile v-if="ym1[9]=='Item'" @click="menu_switch(ym1)" class="">
        <v-list-tile-action v-if="ym1[8]=='left'"><v-icon style="height:10px">{{ym1[1]}}</v-icon></v-list-tile-action>
        <v-list-tile-content ><v-list-tile-title   ><span v-for="y22 in 10" :key="y22">&nbsp;</span>{{ ym1[0] }} : {{ k1 }}</v-list-tile-title></v-list-tile-content>
        <v-list-tile-action v-if="ym1[8]=='right' ||  ym1[8]== ''"><v-icon style="height:10px">{{ym1[1]}}</v-icon></v-list-tile-action>
        </v-list-tile>
        </span>

      </v-list-group>
      <v-list-tile  v-if="ym0[9]=='Item'" @click="menu_switch(ym0)" class="">
      <v-list-tile-action v-if="ym0[8]=='left'"><v-icon style="height:10px">{{ym0[1]}}</v-icon></v-list-tile-action>
      <v-list-tile-content ><v-list-tile-title   ><span v-for="y220 in 0" :key="y220">&nbsp;</span>{{ ym0[0] }} : {{ k }}</v-list-tile-title></v-list-tile-content>
      <v-list-tile-action v-if="ym0[8]=='right' || ym0[8]=='' "><v-icon style="height:10px">{{ym0[1]}}</v-icon></v-list-tile-action>
      </v-list-tile>
      <v-divider></v-divider>
      </span>
      <v-list-tile @click="logout">
     <v-list-tile-action>
       <v-icon>directions_run</v-icon>
     </v-list-tile-action>
     <v-list-tile-content>
       <v-list-tile-title>Odhlasit</v-list-tile-title>
     </v-list-tile-content>
   </v-list-tile>

    </v-list>
    </v-navigation-drawer>

</template>

<script>
import _ from 'lodash'
import _f from '@/funkce/Desktop_switch.js'
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'

export default {
    props: {
        xmenu: {
           type: Array,
           required: true
        },
        xgroup: {
            type: String,
            required: true
        }
    },
   data: () => {
       return {
          drawer: true,
          props: {
          source: String
        },
           xmenu2: [],
           server: null
       }
   },
   created () {
       eventBus.$on('Menuf', ( pole ) => {
           // alert('Emil prisel ???'+ pole )
              this.xmenu2=[]
           pole.forEach((ele ) => {
              this.xmenu2.push(ele)
           })
       })
   },
   methods: {
    menu_switch: function(par) {
   //       alert(par)
          eventBus.$emit('menu_switch', par);
    },

    logout () {

      eventBus.$emit('logout');
    }
   }


}
</script>
<style scoped>
</style>
