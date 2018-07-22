<template>
  <vue-draggable-resizable  :parent="false" :z="z" :x="x" :y="y" :h="h" :w="w" :isActive="false" :isResizable="false" style="border: 0px solid white" :drag-handle="'.drag00'">
    <div class="drag00 elevation-20"
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
         {{ w_zindex }}


       <slot></slot>
       </div>

  </vue-draggable-resizable>

</template>

<script>
import { mapState } from 'vuex'
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
        },
    },
  data: ()  => {
    return {
      zIndexs: {
        z1: 1,
        z2: 2,
        z3: 3

      }
    }
  },
  created () {
    this.$store.dispatch('setWin', [this.w, this.y])
    this.$store.dispatch('setTxt', 15)
  },
  computed:  {
      ...mapState([
      'isUserLoggedIn'
    ])
  },
  methods: {
    w_zindex: function(){
      console.log('Click na tlacitko')
    }



    }
  }
</script>

<style scoped>
</style>



