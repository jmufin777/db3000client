<template>
<div >
<keep-alive>
<draggable v-model="compa2"  :options="{group: 'SoloSeparate'}" @start="drag=true" @end="drag=false"  :drag-handle="'.drag00'">
    <div  v-for="(c,i) in compa2" :key="i" :style="'float:left;background:white;height:250px;width:'+c[2]+'%'" :id="c[0]">
      {{c[1]}}
      <div>

          <component :is="c[0]"></component>

      </div>
      <br><br>
   </div>
</draggable>
</keep-alive>

</div>


</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import List2StrojSkup from './List2StrojSkup'
import List2StrojLaminace from './List2StrojLaminace'
import List2StrojTiskMod from './List2StrojTiskMod'
import List2Prace from './List2Prace'
import List2Jednotka from './List2Jednotka'


import ListStroj from './ListStroj.vue'
// import ListMat from './ListMat.vue'

export default {
  components:{

  'list2-strojskup': List2StrojSkup,
  'list2-strojlaminace': List2StrojLaminace,
  'list2-strojtiskmod': List2StrojTiskMod,
  'list2-jednotka': List2Jednotka,
  'list2-prace': List2Prace,

  'list-stroj': ListStroj,
  // 'list-mat': ListMat,

  },
  data: () => {
    return {
      c33: 33,
      compa2:
        [

          // ['list-mat','Materialy',100],
          ['list2-prace', "Prace - hlavne stroje",66],
          ['list2-strojskup', "Skupina Stroje",33],
          ['list2-strojlaminace', "Stroje - Laminace",33],
          ['list2-strojtiskmod', "Stroje - Tisk Mod",33],
          ['list2-jednotka', "Jednotky kalkulaci",33],

          ['list-stroj','Stroje',100],



        ]


    }

  },
  mounted () {
      if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  computed: {

    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
    ])
  }
}



</script>
<style scoped>
</style>
