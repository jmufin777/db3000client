<template>
<div style="width:210mm;padding-left:16mm;padding-top:22.05mm" class="grey lighten-5">
    <div class="black white--text leva pl-2 pt-1 pr-0" style="font-weight:900;position:relative;height:12mm;width:176mm">
      <span style="font-size:4.05mm;">VÝROBNÍ LIST:</span>
      <span style="font-size:6.05mm">{{vl._poradi }} </span>
      <span style="font-size:3.6mm" >/{{ vl.pocet}}</span>
      <!-- {{ cas }} -->
      <span style="font-size:7.6mm;position:absolute;left:59mm;padding-top:0.2mm;color:gold" > </span>

      <span style="position:absolute;left:120.72mm">
      <span style="font-size:4.05mm" >ZAKÁZKA:</span>
      <span style="font-size:3.6mm" > {{vl.cislozakazky.substr(0,4)}}</span>
      <span style="font-size:6.05mm" >{{vl.cislozakazky.substr(5)}}</span>
      </span>
    </div>
    <div class="black1mm leva pl-2 pt-1 pr-2" style="font-weight:normal;position:relative;width:176mm;height:12.6mm">
      <!-- <span style="position:absolute;left:137.01mm;top:-0.8mm" > -->
      <span style="position:absolute;right:0mm;top:-0.8mm" >

      <span style="font-size:2.25mm" >zadáno:</span>
      <span style="font-size:2.925mm" > {{ f.datum201(vl.time_update)}}</span>
      </span>
      <span style="position:absolute;left:0mm">
      <span style="position:absolute;font-size:2.7mm;top:5.85mm" >Termín:</span>

      <span style="font-size:3.375mm;font-weight:900;position:absolute;left:17mm;top:4.95mm" > {{ f.datum3(vl.expedice_datum)}}</span>
      <span style="font-size:3.375mm;font-weight:900;position:absolute;left:40mm;top:4.95mm" class="pl-2" > {{ vl.expedice_cas.substr(0,5)}}</span>
      </span>
    </div>
    <!--Zakaznik//-->
      <div class="black1mm half leva pl-0 pt-1 pr-2" style="font-weight:normal;position:relative;width:176mm;height:26.325mm">
          <div style="position:absolute;font-size:2.7mm;top:5.85mm;left:0mm" >Zákazník:</div>
          <div style="font-size:3.375mm;font-weight:900;position:absolute;left:17mm;top:4.95mm" > {{ vl.nazev_firmy}}</div>

          <div style="position:absolute;right:61mm;top:3mm;font-size:2.25mm"  class="white" >Obchodník:</div>
          <div style="position:absolute;right:0mm;top:3mm;font-size:2.925mm;text-align:right;font-weight:bold"  class="white" > {{ vl.obchodnik}}</div>

          <div style="position:absolute;font-size:2.7mm;top:12.15mm;left:0mm" >Název:</div>
          <div style="font-size:3.375mm;font-weight:900;position:absolute;left:17mm;top:12.15mm" > {{ vl.nazev_zak}}</div>

<!--Barcode 61 s cislem//-->
          <div style="position:absolute;right:0mm;top:7.1mm;font-size:2.25mm;height:9mm"  class="white" >
            <!-- <barcode :value="'000'+vl.id" :options="{ lineColor: 'green', text: 'Scan', format: 'EAN13'}" height="14"></barcode> -->
            <barcode :value="vl.id_bar"
             format="CODE128"
             :display-value="true"
             lineColor="black"
             :text="vl.id_bar"
             font-size="10"
             width="2"
             height="35"
             style="position:absolute;right:-3mm;"

             >
             </barcode>
             <!-- format width height text font-options font text-align text-position
             text-margin font-size background lineColor margin margin-top margin-bottom
              margin-left margin-right display-value -->
            </div>


          <!--Polozka //-->
          <div style="position:absolute;font-size:2.7mm;top:19.35mm;left:0mm" >Položka:</div>
          <div style="font-size:3.375mm;font-weight:600;position:absolute;left:17mm;top:19.35mm" > {{ vl.polozka}}</div>
      </div>
      <div class="black1mm half leva pl-0 pt-1 pr-2" style="font-weight:normal;position:relative;width:176mm;height:19.8mm">
          <div style="position:absolute;font-size:2.7mm;top:5.85mm;left:0mm" >Stroj:</div>
          <div style="font-size:3.375mm;font-weight:900;position:absolute;left:17mm;top:4.95mm" > {{ vl.stroj}}</div>

          <div style="position:absolute;left:69mm;top:5.85mm;font-size:2.25mm"  class="white" >Mod:</div>
          <div style="position:absolute;left:93.6mm;top:3mm;font-size:2.925mm;text-align:right;font-weight:bold"  class="white" > {{ vl.strojmod}}</div>

          <div style="position:absolute;font-size:2.7mm;top:12.75mm;left:0mm" >Celkem ks:</div>
          <div style="font-size:3.375mm;font-weight:900;position:absolute;left:17mm;top:12.15mm" >{{ vl.celkem_ks}}</div>

          <div style="position:absolute;left:69mm;top:12.15mm;font-size:2.25mm"  class="white" >Celkem m2:</div>
          <div style="position:absolute;left:93.6mm;top:12.15mm;font-size:2.925mm;text-align:right;font-weight:bold"  class="white" > {{ vl.celkem_m2}}</div>

          <div style="position:absolute;left:122.36mm;top:12.15mm;font-size:2.25mm"  class="white" >Cas tisku:</div>
          <div style="position:absolute;left:137.54mm;top:12.15mm;font-size:2.925mm;text-align:right;font-weight:bold"  class="white" > {{ vl.cas_tisku}}&nbsp;min.</div>
      </div>
      <div class="black1mm  leva pl-0 pt-1 pr-2" style="font-weight:normal;position:relative;width:176mm;height:19.83mm">
          <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:0mm;width:24.06mm"  class="white">Material:</div>
           <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:24.37mm;width:17.71mm;background:#d2d3d4;color:black;padding-left:2mm">gramáž</div>
           <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:43.2mm;width:58.42mm;background:#d2d3d4;color:black;padding-left:2mm" >Název</div>
           <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:102.2mm;width:20.47mm;background:#d2d3d4;color:black;padding-left:2mm" >formát/šírka</div>
           <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:123.0mm;width:24.8mm;background:#d2d3d4;color:black;padding-left:2mm" >spotreba</div>
           <div style="position:absolute;font-size:2.7mm;top:1.05mm;left:148.2mm;width:27.8mm;background:#d2d3d4;color:black;padding-left:2mm" >poznámka</div>

           <div style="position:absolute;font-size:2.7mm;top:6.05mm;left:25.2mm;width:17.71mm; background:#FFFFFF;color:black;padding-left:2mm">{{vl.mat_gramaz}}</div>
           <div style="position:absolute;font-size:2.7mm;top:6.05mm;left:43.2mm;width:58.42mm; background:#FFFFFF;color:black;padding-left:2mm" >{{vl.mat_txt}}</div>
           <div style="position:absolute;font-size:2.7mm;top:6.05mm;left:102.2mm;width:20.47mm;background:#FFFFFF;color:black;padding-left:2mm" >{{vl.mat_sirka}}cm</div>
           <div style="position:absolute;font-size:2.7mm;top:6.05mm;left:123.0mm;width:24.8mm; background:#FFFFFF;color:black;padding-left:2mm" >spotreba</div>
           <div style="position:absolute;font-size:2.7mm;top:6.05mm;left:148.2mm;width:27.8mm; background:#FFFFFF;color:black;padding-left:2mm" >{{vl.mat_poznamka}}</div>


      </div>
    <!-- <div class="black1mm">

    {{vl}}
    </div> -->

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
export default {
  components:{

  },
  props:{

    vl: {
        default:[],
        required: false,
      }

  },
  data() {
    return {
      f: f,
      $: $,
      fceVL:fceVL,
      IDEFIX_VL_LAST:0,
      VL:[],
      ITEMS_LEFT:[],
      EXPEDICE:[],
      cas : '',



    }
  },
  async mounted(){
    const self=this
    var objcas = new Date()

    setInterval(function() {
      objcas = new Date()
      self.cas = 0

      self.cas = ('0'+''+objcas.getHours()).slice(-2)+':'+('0'+''+objcas.getMinutes()).slice(-2)+':'+('0'+''+objcas.getSeconds()).slice(-2)+' '+objcas.getMilliseconds()

    },21)
    // if ( self.IDEFIX_ITEM>0){
    //   self.getVL()
    // }
    // f.Alert('vl mount', self.IDEFIX_ITEM)

  },
  watch :{
    //  cas: function() {
    //    var objcas = new Date()
    //    self.cas = objcas.getHour()+':'+objcas.getMinutes()+':'+objcas.getSeconds()+' '+objcas.getMilliseconds()
    //  }
  // IDEFIX_ITEM: function(){
  //   this.getVL()

  // }
  },

  methods: {
    // async getVL(){
    //   const self=this
    //   self.VL=[]
    //   var q= `select a.*,b.nazev as nazev_zak
    //           ,d.nazev as nazev_firmy

    //   ,count(*) over() as pocet, row_number() over( order by a.id ) as _poradi from zak_t_vl_v a
    //           join zak_t_list b on a.idefix_zak=b.idefix
    //           join list_dodavatel d on a.idefix_firma=d.idefix
    //           join list_users u on a.idefix_obchodnik=u.idefix
    //   where a.idefix=${self.IDEFIX_ITEM} order by a.id`

    //   q=`select lpad(a.id,10,'0') as id_bar,idefix2fullname(a.idefix_obchodnik) as obchodnik,* from (${q}) a order by a.id`
    //   console.log(q)
    //   self.VL= (await Q.all(self.idefix,q)).data.data

    // //  f.Alert2(f.Jstr(self.VL))
    // }

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
