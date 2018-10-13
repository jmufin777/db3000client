<template>

<v-dialog v-model="$store.state.showEdit" max-width="500px" scrollable  @keydown.esc="konec2">
  <div style="opacity:1; background:white;width:100%; " class="white" id="de821xx" >
    <panel2 :title="$store.state.showModuleTitle" >
    <v-spacer></v-spacer>
                <v-btn slot="action" color="primary" flat @click="konec" :id="btn_konec"> Zavrit</v-btn>

  </panel2>
          <div  style="float:left;background:white;height:350px;width:500px" :id="$store.state.showModule">
            <component v-bind:is="$store.state.showModule"></component>
          </div>
  </div>

      </v-dialog>


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
import ListStroj from './ListStrojShort.vue'
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

  'list-stroj': ListStroj,
  // 'list-mat': ListMat,
  'list2-strojlaminace': List2StrojLaminace,
},
  data: ()  =>{
    return {
      dialog: true,
      btn_konec: 'btn_konec',
      comp:''

    }

  },
  created() {
    const self = this
    eventBus.$on('edit_run', ( dlgPar ) => {
      self.btn_konec = 'btn_konec_'+self.$store.state.showModule
      self.comp = self.$store.state.showModule


        //alert('Vracim parametry' + JSON.stringify(dlgPar))
    })
  },
  methods: {
    konec(){
      this.$store.dispatch('setshowEdit', false)
      eventBus.$emit('edit')

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
      'setshowModuleTitle'


    ])

  }

}

</script>
