
<template>
<div :style="'width:100%;max-width:2500px;position:relative;border:solid 1px #cccccc;background:white;height:'+h"  ref="obal" >

<div :style="'position:absolute;left:0px;top:0px;width:'+Leva+';max-width:2500px;background:white;overflow:auto;'" ref="d1l"  v-on:scroll="syncALeft">

    <slot name="headl">
      LH
    </slot>
</div>
<div :style="'position:absolute;top:31px;width:'+Leva+';positon:relative;overflow:auto;background:white;height:80%;'+stylet2"  ref="d2l" v-on:scroll="syncBLeft">
    <slot name="bodyl">
      BH
   </slot>
</div>

<div :style="'position:absolute;z-index:10;right:0px;top:-0px;width:'+Prava+';max-width:2500px;background:white;overflow:auto;'" ref="d1r"  v-on:scroll="syncARight">
  <slot name="headr">
  RHead
    </slot>
</div>
<div :style="'position:absolute;z-index:10;right:0px;top:31px;width:'+Prava+';overflow:auto;background:white;height:80%;'+stylet2"  ref="d2r" v-on:scroll="syncBRight">
    <slot name="bodyr">
      BH
   </slot>
</div>
<!-- Posun stredu o sirku leve //-->
<div :style="'position:absolute;left:'+Leva+';top:0px;width:'+Stred+';max-width:2500px;background:white;overflow:auto;'" ref="d1"  v-on:scroll="syncA">
    <slot name="nadpis"></slot>
    <slot name="head">
    </slot>
</div>
<div :style="'position:absolute;left:'+Leva+';top:31px;width:'+Stred+';positon:relative;overflow:auto;background:white;height:80%;'+stylet2"  ref="d2" v-on:scroll="syncB">
    <slot name="body">
   </slot>
  </div>
</div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';
import { StringDecoder } from 'string_decoder';

  export default {
    props: {
      list: {
        type: Array,
        required: false
      },
      Sirka: {
        type: Number,
        required: false
      },

       h: {
         type: String,
         required: false

       },
        stylet1: {
         type: String,
         required: false

       },

       stylet2: {
         type: String,
         required: false

       },
       Leva: {
         type: String,
         required: false
       },
       Prava: {
         type: String,
         required: false
       },
       Stred: {
         type: String,
         required: false
       },
      LevaPosun: {
         type: String,
         required: false
       },
       PravaPosun: {
         type: String,
         required: false
       },
       StredPosun: {
         type: String,
         required: false
       }

       ,autosize: true
    },
    data () {
      return {
        dialog: true,
        leftDiv: null,
        rightDiv: null,
        tOut: false,
        tOut2: false,
        tOut3: false,
        autosize1: this.autosize,
        cols: [],

      }
    },

    mounted() {
      //console.log('Auto',this.autosize1)
      if (this.autosize1) {
        this.analyze()

      }

    },

    methods: {
      analyze() {
        const self = this
//        console.log("inner",self.$refs.d1.clientWidth)

      },

      syncA() {
        const self = this
        if (self.tOut) {
          clearTimeout(self.tOut)
          self.tOut=false
        }
        self.tOut = setTimeout(function(){
          self.$refs.d2.scrollLeft = self.$refs.d1.scrollLeft
        },50)

      },

    syncALeft() {
        const self = this
        if (self.tOut2) {
          clearTimeout(self.tOut2)
          self.tOut2=false
        }

        self.tOut2 = setTimeout(function(){
            self.$refs.d2l.scrollTop = self.$refs.d2.scrollTop
        },50)
      },
      syncB() {
        const self = this
        if (self.tOut) {
          clearTimeout(self.tOut)
          self.tOut=false
        }
        self.tOut = setTimeout(function(){
          self.$refs.d1.scrollLeft = self.$refs.d2.scrollLeft
          self.$refs.d2l.scrollTop = self.$refs.d2.scrollTop
          self.$refs.d2r.scrollTop = self.$refs.d2.scrollTop
          //console.log(self.$refs.d2r.offsetHeight)


        },50)


      },
      syncBLeft() {
        const self = this
        if (self.tOut2) {
          clearTimeout(self.tOut2)
          self.tOut2=false
        }
        self.tOut2 = setTimeout(function(){

          self.$refs.d2.scrollTop = self.$refs.d2l.scrollTop
        },50)
      },


      syncARight () {
        const self = this
        if (self.tOut3) {
          clearTimeout(self.tOut2)
          self.tOut3=false
        }

        self.tOut3 = setTimeout(function(){
            self.$refs.d2r.scrollTop = self.$refs.d2.scrollTop
        },50)
      },
      syncBRight() {
        const self = this
        if (self.tOut3) {
          clearTimeout(self.tOut3)
          self.tOut3=false
        }
        self.tOut3 = setTimeout(function(){

          self.$refs.d2.scrollTop = self.$refs.d2r.scrollTop
        },50)
      }


    }
  }
</script>
