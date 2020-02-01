<template>
<div>
<draggable
          v-model="aKalkulace"
          :options="{group:{ name:'Kalkulace' }}"
          @start="drag=true"
          @end="drag=false"
          :move="chooseItem"
        >
          <span v-for="(iKalk0 ,iK0) in aKalkulace" :key="iK0">
            <div
              style="position:relative;float:left;border: solid 2px white;width:30px;text-align:center;"
              class="elevation-5"
            >
              <a
                :href="'#'+iKalk0.kalkulaceid"
                @click="setKalk(iKalk0.kalkulaceid)"
                :ref="'ref_'+iKalk0.kalkulaceid"
                :id="'ref_'+iKalk0.kalkulaceid + ID"
              >&nbsp;{{iKalk0.kalkulaceid}}</a>
            </div>
          </span>
  </draggable>
    <div :ref="'neco11'"></div>
</div>

</template>>


<script>
import { mapState } from 'vuex';
import { getters } from 'vuex';
import { mutations } from 'vuex';
import { eventBus } from '@/main.js';
import { setTimeout, clearInterval } from 'timers';

  export default {
  props:{
    ID:''
  },
   data() {
     return {
       aKalkulace: [],
     }
   },
   watch :{
     Kalkulace: function () {
       this.aKalkulace = []
       this.aKalkulace = JSON.parse(JSON.stringify(this.Kalkulace))
     //  alert('zmena' + this.aKalkulace.length)
     }
   },
mounted() {
  const self = this
  setInterval(function(){
      if (self.Kalkulace.length >0 && self.aKalkulace.length==0) {
        self.aKalkulace = JSON.parse(JSON.stringify(self.Kalkulace))
        //console.log('DELKAKALKULACE')
      }
  },500)
},
methods: {
  chooseItem: function(event, bEvent) {
      console.log("Choos item: ", event.draggedRect, "B", bEvent);
      // alert(Object.keys(bEvent))
    },

} ,

  computed: {
    ...mapState([
      "isUserLoggedIn",
      "xMenuMain",
      "level",
      "idefix",
      "compaStore",
      "Kalkulace",
      "KalkulaceThis",
      "user"
    ])
  }

  }
</script>
