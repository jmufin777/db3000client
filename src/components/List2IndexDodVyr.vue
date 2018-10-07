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


import List2MatDodavatel from './List2MatDodavatel.vue'
import List2MatVyrobce from './List2MatVyrobce.vue'

import ListStroj from './ListStroj.vue'
// import ListMat from './ListMat.vue'

export default {
  components:{

  'list2-matdodavatel': List2MatDodavatel,
  'list2-matvyrobce': List2MatVyrobce,


  },
  data: () => {
    return {
      c33: 33,
      compa2:
        [
          // ['list-mat','Materialy',100],
          ['list2-matvyrobce','Presne oznaceni - vyrobce',50],
          ['list2-matdodavatel','Dodavatel materialu',100],

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
