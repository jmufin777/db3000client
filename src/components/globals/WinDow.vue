<template>
  <vue-draggable-resizable  :parent="false" :z="z0" :x="x0" :y="y0" :h="h0" :w="w0" :isActive="false" :isResizable="false" style="border: 0px solid white" :drag-handle="'.drag00'">
    <div class="drag00 elevation-20"
      style="padding: 0px; margin: 0px;  border: 0px solid;height:20px;font-size:12px;background:#4FC3F7"
      v-on:click.self="w_zindex"
      >{{title}}
      <slot name="action-left" />
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <slot name="action" />

      <slot></slot>

  </div>
  </vue-draggable-resizable>

</template>

<script>
  import  g  from '@/funkce/global.js'

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
          id0: {
            type: String,
            required: false
        },
          z0: {
            type: String,
            required: false
        },
          x0: {
            type: String,
            required: false
        },
          y0: {
            type: String,
            required: false
        },
          h0: {
            type: String,
            required: false
        },
          w0: {
            type: String,
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
    g.z_count()
    g.w_create('a')


  },
  methods: {
    w_zindex() {
       g.z_count()
       g.w_zindex(this.id0)
    }
  }
}
</script>

<style scoped>
</style>



