<template>
  <v-container>
    <div>


      <v-layout row wrap md>
      <v-flex md6 sx4 lg3>

    <draggable v-model="menu_set_3"  :options="{group:{ name:'people',  pull:'clone' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
    <v-card v-for="(element,i) in menu_set_3" :key="i" class="people pa-2 ma-2 "  :id="'b' + i" color="blue" >
        <v-card-text>{{element[0]}}
        </v-card-text>
    </v-card>
    </draggable>
    </v-flex>
      <v-flex md6 sx4 lg3>
    <draggable v-model="menu_set_2"  :options="{group:{ name:'people',  pull:'clone'  }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
    <v-card v-for="(element,i) in menu_set_2" :key="i" class="people pa-2 ma-2" :id="'a' + i" color="teal" >
        <v-card-text>{{element[0]}}</v-card-text>
    </v-card>
    </draggable>
      </v-flex>

    </v-layout>
        ahoj

    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import ListModulesService from '@/services/ListModulesService'


export default {
  components:{
    // 'menu-schema': MenuSchema,
  },
  data: () => {
    return {
      tableData: [],
      menu_set_2: [
        ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]],
        ['Sirky', 'code', 'menu_switch', 'set-width', 'true','','','','','Item',[]],
        ['Materiály', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]],
        ['Stroje', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]]
      ],
      menu_set_3: [
        ['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
        ['Moduly', 'view_module', 'menu_switch', 'moduly', 'true','','','','','Item',[]],

      ]

    }
  },
  computed: {
    ...mapState[
      'user',
      'isUserLoggedIn',
      'xMenuMain'
    ]
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.tableData = (await ListModulesService.all()).data
      window.document.title = 'ListModules'
    } else {
      window.close()
    }
  },



}
</script>
<style scoped>
</style>
