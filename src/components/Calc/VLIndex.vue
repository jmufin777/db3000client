<template>
<div>
  <!-- {{f.Jstr($route.params)}} 2809105 -->
  <div v-if="VL.length==0" style="font-size:200%;font-weight:900">Neni k dispozici zadny VL</div>
   <!-- <div>Route:{{ $route.params.id }}{{$route}} </div> -->
  <!--912 1286 0.23 0.225 - vyska//-->

  <!-- <div v-for="(vl,i) in VL" :key="i" class="A4 white" style="width:210mm"> -->
<div v-for="(vl,i) in VL" :key="i" class="A4 white" style="width:210mm;padding-left:0mm;padding-top:0mm">
  <v-card><v-card-text><vl-view :vl="vl"></vl-view></v-card-text></v-card>


  {{vl}}



  </div>
 </div>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, setInterval } from 'timers'
import f from '@/services/fce'

import Q from '@/services/query'
import queryKalk from '../../services/fcesqlKalkulace'
import prepocty from '../../services/fceKalkulacePrepocty'
import fceVL from '../../services/fceVL'
import VL_view from './VL_view'



export default {
  components:{
    'vl-view': VL_view

  },
  props:{
    IDEFIX_ITEM: {  //Asi nejspis ve skutecnosti idefix_vl
      required: false,
      default:0
    }

  },
  data() {
    return {
      f: f,
      $: $,
      fceVL:fceVL,
      IDEFIX_VL_LAST:0,
      IDEFIX_VL:0,

      VL:[],
      ITEMS_LEFT:[],
      EXPEDICE:[],



    }
  },
  async mounted(){
    const self=this
    if ( self.IDEFIX_ITEM>0){
      self.getVL()
    }

    if (!f.isEmpty(self.$route.params.id)){
        self.IDEFIX_VL=self.$route.params.id

    } else
    if (!f.isEmpty(self.IDEFIX_ITEM)){
        self.IDEFIX_VL=self.IDEFIX_ITEM

    }
    //self.IDEFIX_ITEM=2809105
    // f.Alert('vl mount', self.IDEFIX_ITEM)

  },
  watch :{
  IDEFIX_VL: function(){
    this.getVL()

  },
    '$route' (to, from) {
      const self=this
      if (!f.isEmpty(to.params.id)){
        self.IDEFIX_VL=to.params.id

      }

      //f.Alert('Zmena', f.Jstr(to.params) , f.Jstr(from.params))
      // react to route changes...
    }
  },
  methods: {
    async getVL(){
      const self=this
      self.VL=[]
      var q= `select a.*,b.nazev as nazev_zak
              ,d.nazev as nazev_firmy

      ,count(*) over() as pocetxxx
      ,a.vl_znacka
      ,last.pocet
      , a.vl_znacka||' '||a.poradi2::text as _poradi
      , row_number() over( order by a.id ) as _poradixx
      from zak_t_vl_v a
              join zak_t_list b on a.idefix_zak=b.idefix
              join list_dodavatel d on a.idefix_firma=d.idefix
              join list_users u on a.idefix_obchodnik=u.idefix
              left join zak_vl_last last on a.idefix_zak=last.idefix_zak
      where a.idefix=${self.IDEFIX_VL}  order by a.id`

      q=`select lpad(a.id,10,'0') as id_bar,idefix2fullname(a.idefix_obchodnik) as obchodnik,* from (${q}) a order by a.id`
      console.log(q)
      f.log('VL VIEW ',q)
      self.VL= (await Q.all(self.idefix,q)).data.data

    //  f.Alert2(f.Jstr(self.VL))
    }

  }


}
</script>>
<style >
.black1mm {
  border-top:none;
  border-left:none;
  border-right:none;
  border-width:0px;
  border-bottom-style: groove;
  border-bottom-width: 1mm;
  border-bottom-color: black;
  color:black;
}
.half {
  border-bottom-width: 0.3mm;
}
</style>
