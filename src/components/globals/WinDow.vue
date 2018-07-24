<template>
  <vue-draggable-resizable  :parent="false" :z="z1 || z" :x="x" :y="y" :h="h" :w="w"
  :isActive="false" :isResizable="false"
  style="border: 0px solid white"
  :drag-handle="'.drag00'"
  :drag-cancel="'.drag01'"
  v-on:dragging="onDrag"
  v-on:dragstop="onDragstop"
  v-on:resizing="onResize"
  v-on:resizestop="onResizestop"
  v-on:activated="onActivated"
  >
    <div class="drag00 elevation-20" :id="id"
      style="padding: 0px; margin: 0px;  border: 0px solid;font-size:14px
      ;font-family: Arial;background:#4FC3F7"
      v-on:click.self="w_zindex"
      >{{title}}
      <slot name="action-left" />
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <slot name="action" />
    </div>

       <div class="elevation-20 drag01" style="height:90%;overflow-y:scroll; background:white" >

         <table border=5 >
           <thead>
           <tr>
             <td v-for="(w2,i2) in WinDows[0]" :key="i2" class="pa-2 ma-1">
               {{ i2 }}
             </td>
           </tr>

           </thead>
           <tr v-for="(w1, i ) in WinDows" :key="i" >
             <td v-for="(w2,i2) in w1" :key="i2" class="px-5  ma-1">
               {{w2}}
             </td>
           </tr >
         </table>
         <div>
           {{ info }} {{ active }} old z : {{ old_z }} z: {{ z }}  z1: {{ z1 }} zMax : {{ zMax }}
         </div>



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
        z: {
        type: Number,
        required: false
      }

    },
  data: ()  => {
    return {
      z1: 0,
      old_z: 0,
      info: 'nic'
    }
  },
  mounted () {
    // if (this.h == null) this.h = 501
     //if (this.y == null) this.y = 33

     // this.$store.dispatch('dropWin', this.id )
     this.$store.dispatch('setWin', {id: this.id, x: this.x, y: this.y, h: this.h, w: this.w ,z: this.z, z1: this.z1 } )
     // this.$store.dispatch('setTxt', 15)
   },

  computed: {
     ...mapGetters([
       'getWinList',
       'getWin'
     ]),

    ...mapState([
      'isUserLoggedIn',
      'WinDows',
      'active',
      'zMax'
    ])
  },

  methods: {
    w_zindex: function() {
      console.log('Click na tlacitko')
    },
    onResize: function (x1, y1, w1, h1) {
      this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: h1 , w: w1 ,z: this.z, z1: this.z1 } )
      this.z1 = this.zMax


      // this.x = x
      // this.y = y
      // this.w = width
      // this.ht = height
    },
    onDrag: function (x1, y1) {


      this.info= this.id + "Drag "+ x1 +" " +y1
      this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: this.h , w: this.w ,z: this.z, z1: this.z1 } )
      this.z1 = this.zMax


      // this.x = x1
      // this.y = y1
    },
    onActivated: function() {
        this.info= this.id + "Activated"
        this.old_z  = this.z
        this.$store.dispatch('setWin', {id: this.id, x: this.x, y: this.y, h: this.h , w: this.w ,z: this.z, z1: this.z1 } )
        this.z1 = this.zMax





    },
    onResizestop: function(x1, y1, w1, h1) {
        this.info= this.id + "resizeStop"
          this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: h1 , w: w1 ,z: this.z, z1: this.z1 } )
          this.z1 = this.zMax
    },
    onDragstop: function(x1, y1) {
        this.info= this.id + "dragStop"
        this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1, h: this.h , w: this.w ,z: this.z, z1: this.z1 } )
        this.z1 = this.zMax




    }

    }
  }
</script>

<style scoped>
</style>



