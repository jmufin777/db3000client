<template>
 <win-dow :title="$store.state.showModule+'x'" :id="$store.state.showModule+'x'"


    :x="xMyska"
    :w="650"
    :y="100"
    :z="90"
    :h="510"
    :parent="false"
    :maximize="false"
    :forget="true"
    :forgetWH="false"
    :forgetAll="true"
    v-if="$store.state.showEdit"


    >
<!-- @keydown.esc="konec2" -->

  <div slot="b1" class="pt-1 blue lighten-4" style="height:30px;font-size:14px" >{{$store.state.showModuleTitle}}</div>
  <div slot="c1" style="height:30px;font-size:18px;" class="blue lighten-4">
                <v-btn slot="action" style="height:18px;font-size:12px"  class="blue  lighten-4 elevation-1" flat @click="konec" :id="btn_konec"> Zavrit</v-btn>
   </div>
   <div slot="a1" class="blue lighten-4" style="height:30px;font-size:14px">&nbsp;</div>



  <div style="opacity:1; background:white;width:650px " class="blue lighten-4 " :id="'de821xx'+ID" >

          <div  style="float:left;background:white;height:510px;width:100%;" :id="$store.state.showModule + ID" class="pl-0 pr-0 mr-0 ">
            <component v-bind:is="$store.state.showModule"></component>
          </div>
  </div>

 </win-dow>


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
import List2MatBarevnost from './List2MatBarevnost.vue'
import List2MatPotisknutelnost from './List2MatPotisknutelnost.vue'
import List2MatVlastnosti from './List2MatVlastnosti.vue'
import List2MatBarva from './List2MatBarva.vue'
import List2MatDostupnost from './List2MatDostupnost.vue'
import List2MatDodavatel from './List2MatDodavatelShort.vue'
import List2MatVyrobce from './List2MatVyrobce.vue'
import List2Prace from './List2Prace.vue'
import List2Jednotka from './List2Jednotka.vue'
import ListStroj from './ListStrojShort.vue'
import ListMatProjCena from './ListMatProjCena.vue'



import { setTimeout } from 'timers';

export default {
  components: {
  'list2-matsirka': List2MatSirka,
  'list2-matskup': List2MatSkup,
  'list2-matsubskup': List2MatSubSkup,
  'list2-strojskup': List2StrojSkup,
  'list2-strojlaminace': List2StrojLaminace,
  'list2-strojtiskmod': List2StrojTiskMod,
  'list2-matbarevnost': List2MatBarevnost,
  'list2-matvlastnosti': List2MatVlastnosti,
  'list2-matbarva': List2MatBarva,
  'list2-matpotisknutelnost': List2MatPotisknutelnost,
  'list2-matdostupnost': List2MatDostupnost,
  'list2-matdodavatel': List2MatDodavatel,
  'list2-matvyrobce': List2MatVyrobce,
  'list2-prace': List2Prace,
  'list2-jednotka': List2Jednotka,


  'list-stroj': ListStroj,
  // 'list-mat': ListMat,
  'list2-strojlaminace': List2StrojLaminace,
  'list-mat-projcena': ListMatProjCena,
},
  data: ()  =>{
    return {
      dialog: true,
      btn_konec: 'btn_konec',
      xMyska: 100,
      comp:'',
      status: 0, // 1 = material, 2 = stroj
      ID: 0,

    }

  },
  created() {
    const self = this
    eventBus.$off('edit_run')
    eventBus.$off('edit_run_stroj')

    eventBus.$on('edit_run', ( dlgPar ) => {
      self.btn_konec = 'btn_konec_'+self.$store.state.showModule
      self.comp = self.$store.state.showModule
      self.status  = 1
        //alert('Vracim parametry' + JSON.stringify(dlgPar))
    })
    eventBus.$on('edit_run_stroj', ( dlgPar ) => {
      self.btn_konec = 'btn_konec_'+self.$store.state.showModule
      self.comp = self.$store.state.showModule
      self.status  = 2
        //alert('Vracim parametry' + JSON.stringify(dlgPar))
    })


  },
  mounted() {
    const self = this
    self.ID = Math.round(Math.random() * 1983458)
    this.btn_konec=this.btn_konec + this.ID

  },
  methods: {
    konec(){
      this.$store.dispatch('setshowEdit', false)
      if (this.status == 1) {
          eventBus.$emit('edit')
      }
      if (this.status == 2) {
          eventBus.$emit('edit_stroj')
      }


    },
    konec2(){
      const self = this
      return
      setTimeout(function(){
        document.getElementById(self.btn_konec).focus()
      },2000)

    },



  },
computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'level',
      'idefix',
      'showEdit',
      'setshowModule',
      'setshowModuleTitle',
      'setshowIdefix',

    ])

  }

}

</script>
