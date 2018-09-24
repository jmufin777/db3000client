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
<!--
    <div style="float:left;background:white;height:250px;width:30%" id="list2-strojskup">
      Skupiny strojuxxxx
          <list2-strojskup></list2-strojskup>
      </div>




    <div style="float:left;background:white;height:250px;width:30%;;overflow:auto" id="list2-barevnost">
      Barevnost
            <list2-barevnost></list2-barevnost>
            &nbsp;</div>

    <div style="float:left;background:white;height:250px;width:30%" id="list2-potisknutelnost">
      Potisknutelnost
            <list2-potisknutelnost></list2-potisknutelnost>
       </div>
       <div style="float:left;background:white;height:250px;width:25%" id="list2-matskup">
         Skupiny materialu
            <list2-matskup></list2-matskup>
       </div>
            <div style="float:left;background:white;height:250px;width:25%" id="list2-matsirka">
              Sirky materialu
            <list2-matsirka></list2-matsirka>
       </div>


            <div style="float:left;background:white;height:250px;width:45%;overflow:auto" id="list2-matdostupnost">
              Dostupnost materialu
            <list2-matdostupnost></list2-matdostupnost>
           </div>

        <div style="float:left;background:white;height:250px;width:30%" id="list2-matdodavatel">
          Dodavatel materialu
        <list2-matdodavatel></list2-matdodavatel>
         &nbsp;</div>
        <div style="float:left;background:white;height:250px;width:30%" id="list2-matvyrobce">
          Vyrobce materialu
        <list2-matvyrobce></list2-matvyrobce>
         &nbsp;</div>
     //-->
</div>


</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import List2StrojSkup from './List2StrojSkup'
import List2StrojLaminace from './List2StrojLaminace'
import List2StrojTiskMod from './List2StrojTiskMod'
import List2MatSkup from './List2MatSkup'
import List2MatSubSkup from './List2MatSubSkup'
import List2MatSirka from './List2MatSirka.vue'
import List2BarevnostTab2 from './List2BarevnostTab2'
import List2Potisknutelnost from './List2Potisknutelnost.vue'
import List2MatVlastnosti from './List2MatVlastnosti.vue'
import List2MatDostupnost from './List2MatDostupnost.vue'
import List2MatDodavatel from './List2MatDodavatel.vue'
import List2MatVyrobce from './List2MatVyrobce.vue'

import ListStroj from './ListStroj.vue'
import ListMat from './ListMat.vue'

export default {
  components:{
  'list2-matsirka': List2MatSirka,
  'list2-matskup': List2MatSkup,
  'list2-matsubskup': List2MatSubSkup,
  'list2-strojskup': List2StrojSkup,
  'list2-strojlaminace': List2StrojLaminace,
  'list2-strojtiskmod': List2StrojTiskMod,
  'list2-barevnost': List2BarevnostTab2,
  'list2-matvlastnosti': List2MatVlastnosti,
  'list2-potisknutelnost': List2Potisknutelnost,
  'list2-matdostupnost': List2MatDostupnost,
  'list2-matdodavatel': List2MatDodavatel,
  'list2-matvyrobce': List2MatVyrobce,

  'list-stroj': ListStroj,
  'list-mat': ListMat,
  'list2-strojlaminace': List2StrojLaminace,
  },
  data: () => {
    return {
      c33: 33,
      compa2:
        [

          ['list-mat','Materialy',100],
          ['list2-matvyrobce','Presne oznaceni - vyrobce',50],
          ['list2-matvlastnosti','Vlastnost',50],

          ['list2-matsubskup', "Podskupina Materialy",50],

          ['list2-matdostupnost','Dostupnost',50],
          ['list2-matskup', "Skupina Materialy",33],

          ['list2-matdodavatel','Dodavatel materialu',100],

          ['list2-strojskup', "Skupina Stroje",33],
          ['list2-strojlaminace', "Stroje - Laminace",33],
          ['list2-strojtiskmod', "Stroje - Tisk Mod",33],
          ['list2-barevnost', "Barevnost",33],

          ['list2-potisknutelnost', "Postiknutelnost",33],

          ['list2-matsirka', "Sirka",33],


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
