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



import List2MatSkup from './List2MatSkup'
import List2MatSubSkup from './List2MatSubSkup'
import List2MatSirka from './List2MatSirka.vue'
import List2MatBarva from './List2MatBarva.vue'

import List2MatPotisknutelnost from './List2MatPotisknutelnost'
import List2MatVlastnosti from './List2MatVlastnosti.vue'
import List2MatDostupnost from './List2MatDostupnost.vue'
import List2MatBarevnost from './List2MatBarevnost'
import ListMatProjCena from './ListMatProjCena'

// import ListMat from './ListMat.vue'

export default {
  components:{
  'list2-matsirka': List2MatSirka,
  'list2-matskup': List2MatSkup,
  'list2-matsubskup': List2MatSubSkup,
  'list2-matbarevnost': List2MatBarevnost,
  'list2-matvlastnosti': List2MatVlastnosti,
  'list2-matbarva': List2MatBarva,
  'list2-matpotisknutelnost': List2MatPotisknutelnost,
  'list2-matdostupnost': List2MatDostupnost,
  'list-matprojcena': ListMatProjCena,
  },
  data: () => {
    return {
      c33: 33,
      compa2:
        [

          // ['list-mat','Materialy',100],

          ['list2-matvlastnosti','Vlastnost',50],


          ['list2-matsubskup', "Podskupina Materialy",50],
          ['list2-matbarva','Barva',33],
          ['list2-matdostupnost','Dostupnost',33],
          ['list2-matskup', "Skupina Materialy",33],




          ['list2-matbarevnost', "Barevnost",33],

          ['list2-matpotisknutelnost', "Postisknutelnost",33],

          ['list2-matsirka', "Sirka",33],
          ['list-matprojcena', "Projektove ceny",100],






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
