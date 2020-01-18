<template>
  <div
  title="title"
  :visible.sync="dialog"
  width="800"
  style="width:210mm;height:325mm;position:fixed;right:15%;opacity:1;top:10%"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="true"
  :modal="false"

  class="elevation-12 white"
  @mouseenter="eBus.$emit(eventName+'Open')"

  center>
  <!-- @click="dialog=false;show=false" -->
 <button style="width:10%;height:24px;float:right"  @click="eBus.$emit(eventName+'Close')">X</button>

<!-- <iframe name="fff" src="http://localhost:3009/?#/vl/14078920"> -->


<iframe name="fff" :src="odkaz" style="width:100%;height:90%"   @mouseleave="zobr(2)">
</iframe>
    <span slot="title" size="mini" class="blue">{{title}}
      14078923
    </span>
    <slot name="nahled"></slot>
    <!-- {{ dialog}} {{show}} {{odkaz}} -->
  </div>


</template>


<script>
  import f from '@/services/fce'
  import { eventBus } from '@/main.js'
  export default {
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
