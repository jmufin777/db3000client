<template>
<div >

    <div style="float:left;background:white;height:250px;width:30%">
      Skupiny stroju
          <list2-strojskup></list2-strojskup>
      </div>




    <div style="float:left;background:white;height:250px;width:30%;;overflow:auto">
      Barevnost
            <list2-barevnost></list2-barevnost>
            &nbsp;</div>

    <div style="float:left;background:white;height:250px;width:30%">
      Potisknutelnost
            <list2-potisknutelnost></list2-potisknutelnost>
       </div>
       <div style="float:left;background:white;height:250px;width:25%">
         Skupiny materialu
            <list2-matskup></list2-matskup>
       </div>
            <div style="float:left;background:white;height:250px;width:25%">
              Sirky materialu
            <list2-matsirka></list2-matsirka>
       </div>


            <div style="float:left;background:white;height:250px;width:45%;overflow:auto">
              Dostupnost materialu
            <list2-matdostupnost></list2-matdostupnost>
           </div>

        <div style="float:left;background:white;height:250px;width:30%">
          Dodavatel materialu
        <list2-matdodavatel></list2-matdodavatel>
         &nbsp;</div>
        <div style="float:left;background:white;height:250px;width:30%">
          Vyrobce materialu
        <list2-matvyrobce></list2-matvyrobce>
         &nbsp;</div>

</div>


</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import List2StrojSkup from './List2StrojSkup'
import List2MatSkup from './List2MatSkup'
import List2MatSirka from './List2MatSirka.vue'
import List2BarevnostTab2 from './List2BarevnostTab2'
import List2Potisknutelnost from './List2Potisknutelnost.vue'
import List2MatDostupnost from './List2MatDostupnost.vue'
import List2MatDodavatel from './List2MatDodavatel.vue'
import List2MatVyrobce from './List2MatVyrobce.vue'

export default {
  components:{
  'list2-matsirka': List2MatSirka,
  'list2-matskup': List2MatSkup,
 'list2-strojskup': List2StrojSkup,
 'list2-barevnost': List2BarevnostTab2,
 'list2-potisknutelnost': List2Potisknutelnost,
  'list2-matdostupnost': List2MatDostupnost,
  'list2-matdodavatel': List2MatDodavatel,
  'list2-matvyrobce': List2MatVyrobce,
  }
}
</script>
<style scoped>
</style>
