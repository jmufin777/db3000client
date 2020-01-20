<template>
  <div
  title="title"
  :visible.sync="dialog"
  width="800"
  style="width:210mm;height:325mm;position:fixed;right:15%;opacity:1;top:10%;overflow:scroll"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="true"
  :modal="false"
  class="elevation-12 white"
  @mouseenter="eBus.$emit(eventName+'Open')"
  center>
  <!-- @click="dialog=false;show=false" -->
 <button style="width:10%;height:24px;float:right"  @click="eBus.$emit(eventName+'Close')">X</button>

    <!-- OUTPUT -->
    <button @click="print">TISKNI {{odkaz}}</button>


<!-- <iframe name="fff" src="http://localhost:3009/?#/vl/14078920"> -->
<div id="printMe">

    <vl v-if="odkaz>0" :IDEFIX_ITEM="odkaz" :key="odkaz"></vl>
<!-- <v-card v-for="ixxx in 1" :key="ixxx" style="height:290mm">
<v-card-text>
<iframe name="fff" :src="'#/vl/'+odkaz" style="width:100%;height:290mm"   @mouseleave="zobr(2)">
</iframe>
</v-card-text>
</v-card> -->

  </div>

    <slot name="nahled"></slot>
    <!-- {{ dialog}} {{show}} {{odkaz}} -->
  </div>


</template>


<script>
  import f from '@/services/fce'
  import VL from '../Calc/VLIndex.vue'
  import { eventBus } from '@/main.js'
  export default {
     components: {
    'vl': VL
    // 'menu-hlavni': MenuHlavni,
 },
    props:{
    title: {
      type: String,
      default: '',
      required: false
    },
    show: {
      type: Boolean,
      default:false,
      required: false
    },
    pre: {
      type: Boolean,
      default:false,
      required: false
    },
    odkaz: {
      type: String,
      default: '',
      required: false
    },
    eventName: {
      type: String,
      default: '',
      required: false
    }
    }
   ,
    data () {
      return {
        dialog: false,
        f:f,
        eBus: eventBus

      }
    },
    methods: {
      zobr(xx) {
        console.log("ZOBR FRAME ", xx)
      },
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    }
    },
    // let route = this.$router.resolve({ name: 'vl' , params: { id: self.IDEFIX_VL } })
    //       // let route = this.$router.resolve('/link/to/page'); // This also works.
    //   window.open(route.href, 'vl_'+ self.IDEFIX_VL,  'width=1000,height=500')
    updated(){


         if (this.show) {
           this.dialog= true
         } else {
           this.dialog= false
         }



    },
    mounted() {
         if (this.show) {
          this.dialog= true
        }
      // alert('DLG' + this.title )
    }
  }
</script>
<style>
.list-enter,
.list-leave-to {
  visibility: hidden;
  height: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
</style>
