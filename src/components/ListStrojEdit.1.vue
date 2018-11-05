<template>
 <v-dialog
        v-model="IsDialog1"
        persistent
        max-width="900px"
        scrollable
        v-if="true"
        :nazev="name"
    >
    <panel :title="name" >

    <!-- Akce +' : ' + mastrpis +': ' + isCopy + ' '+  -->
    <!-- {{list.data.rozmer2}} / {{ idefixThis }} -->
    <div slot="title2">

      <el-button @click="cancelForm" id="btn_cancel_submit821" size="mini">Zavrit</el-button>
    </div>
    &nbsp;
  </panel>



</v-dialog>

</template>
<script>

import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListStroj from '@/services/ListStrojService'
import List2Edit from  './List2Edit.vue'

import f from '@/services/fce'
import moment from 'moment'



//import List2StrojSubSkup from '@/services/List2StrojSubSkupService'
// import List2StrojSkup from '@/services/List2StrojSkupService'

import { setTimeout, clearInterval } from 'timers'

export default {
  components: {
    'list2-edit': List2Edit,


  },
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      SendNamne: '',
      RecName: this.name,
      IsDialog1: true,
      rec: {},



    }
  },


  mounted() {

  },
  created () {
    var self=this
      eventBus.$on('dlg8210', ( dlgPar ) => {
        if (dlgPar.IsDialog==true) {
          self.IsDialog1 = true
        }
        alert(JSON.stringify(dlgPar))
        //self.getData()
                //self.getWhere()

      })

  },

  watch: {
    nazev: function() {
      alert('a')
      this.IsDialog1 = true;
      this.RecName='X'
    },



  } ,

  methods: {



    mySplit(ctxt){
      var neco=(ctxt+'')
      //alert(neco.split(",")[0] )
      return neco.split(",")
    },

    cancelForm() {

       this.IsDialog1 = false
       this.list = []


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

    ]),
    nazev () {
      alert('B')
    }

/*
    datum(){
      return Vue.filter('date')(this.value)
    }
*/

  }
}

</script>
<style>
.ok {
  background: #C5E1A5;
  color:black;

}
.bad {
  background: #FFAB40;
  color:black;


}
</style>
