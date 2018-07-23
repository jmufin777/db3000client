<template>
  <vue-draggable-resizable  :parent="false" :z="z" :x="x" :y="y" :h="h" :w="w" :isActive="false" :isResizable="false"
  style="border: 0px solid white" :drag-handle="'.drag00'"
  v-on:dragging="onDrag"
  v-on:resizing="onResize"

  >
    <div class="drag00 elevation-20" :id="id"
      style="padding: 0px; margin: 0px;  border: 0px solid;height:20px;font-size:12px;background:#4FC3F7"
      v-on:click.self="w_zindex"
      >{{title}}
      <slot name="action-left" />
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <slot name="action" />
     </div>
     <div class="drag00 elevation-20"
      style="padding: 0px; margin: 0px;  border: 0px solid;height:20px;font-size:12px;background:#4FC3F7"
      v-on:click.self="w_zindex"
      >
      <slot name="action-menu" />
     </div>
       <div class="elevation-20 " style="height:90%;overflow-y:scroll; background:white" >
         {{ getWinList }}

       <slot></slot>
       </div>

  </vue-draggable-resizable>

</template>

<script>
// https://medium.com/wdstack/vue-vuex-getting-started-f78c03d9f65
// https://libraries.io/npm/vue-draggable-resizable
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {

  props: {
        xmenu: {
           type: Array,
           required: false
        },
        title: {
            type: String,
            required: false
        },
          id: {
            type: String,
            required: false
        },
          z: {
            type: Number,
            required: false
        },
          x: {
            type: Number,
            required: false
        },
          y: {
            type: Number,
            required: false
        },
          h: {
            type: Number,
            required: false
        },
          w: {
            type: Number,
            required: false
        }

    },
  data: ()  => {
    return {

    }
  },
  created () {
     // this.$store.dispatch('dropWin', this.id )
     this.$store.dispatch('setWin', {id: this.id, x: this.x, y: this.y,h: this.h, w: this.w,z: this.z } )
     // this.$store.dispatch('setTxt', 15)
   },
  //computed:  {
  //    ...mapState([
    //  'isUserLoggedIn',
//    ])
  //},
  computed: {
    ...mapGetters([
      'getWinList',
    ])
  },

  methods: {
    w_zindex: function() {
      console.log('Click na tlacitko')
    },
    onResize: function (x1, y1, w1, h1) {
      this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: h1 , w: w1 ,z: this.z } )
      // this.x = x
      // this.y = y
      // this.w = width
      // this.ht = height
    },
    onDrag: function (x1, y1) {
       this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h:this. h , w: this.w ,z: this.z } )
      // this.x = x1
      // this.y = y1
    }



    }
  }
</script>

<style scoped>
</style>



