<template>
<div :style="'width:100%;max-width:2500px;position:relative;border:solid 1px #cccccc;background:white;height:'+h"  ref="obal" >
   <div :style="'width:100%;max-width:2500px;background:white;overflow:auto;'" ref="d1"  v-on:scroll="syncA">
    <slot name="nadpis"></slot>
    <slot name="head">
    </slot>

</div>
<div :style="'width:100%;positon:relative;overflow:auto;background:white;height:80%;'+stylet2"  ref="d2" v-on:scroll="syncB">
    <slot name="body">
   </slot>
  </div>
</div>
</template>

<script>
import { setTimeout, clearTimeout } from 'timers';

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

       }
       ,
       stylet2: {
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
        console.log("inner",self.$refs.d1.clientWidth)

      },

      syncA() {
        const self = this
        if (self.tOut) {

          clearTimeout(self.tOut)
          self.tOut=false
        }
        self.tOut = setTimeout(function(){
          self.$refs.d2.scrollLeft = self.$refs.d1.scrollLeft
        },100)


      },
      syncB() {
        const self = this
        if (self.tOut) {
          clearTimeout(self.tOut)
          self.tOut=false
        }
        self.tOut = setTimeout(function(){
          self.$refs.d1.scrollLeft = self.$refs.d2.scrollLeft
        },100)


      }

    }
  }
</script>
