<template>
  <vue-draggable-resizable
    :parent="parent"
    :z="z1>=0?z1:z"
    :x="x1>=0?x1:x"
    :y="y1>=0?y1:y"
    :h="h1>=0?h1:h"
    :w="w1>=0?w1:w"

  :isActive="false" :isResizable="false"
  style="border: 0px solid white;background:white"
  :drag-handle="'.drag00'"
  :drag-cancel="'.drag01'"
  v-on:dragging="onDrag"
  v-on:dragstop="onDragstop"
  v-on:resizing="onResize"
  v-on:resizestop="onResizestop"
  v-on:activated="onActivated"
  :maximize="maximize"
  >

    <div class="drag00 elevation-20" :id="id"
      style="padding: 0px; margin: 0px;  border: 0px solid;font-size:14px
      ;font-family: Arial;background:#4FC3F7;"
      v-on:click.self="w_zindex"
      >


  <el-row  :gutter="0">
  <el-col :span="8" class="slot-a "  >
    <slot name="a1" :sm="8" :md="8" :lg="8" :xl="8"><span v-if="title > ''">&nbsp;</span></slot>
  </el-col>
  <el-col v-if="title > ''"  :span="8" class="slot-b " :sm="8" :md="8" :lg="8" :xl="8">
    <slot name="b1">{{title}}&nbsp;</slot>
  </el-col>
  <el-col  :span="8" class="slot-c " :sm="8" :md="8" :lg="8" :xl="8">

    <slot v-if="title > ''" name="c1" >&nbsp;</slot>
  </el-col>
  </el-row>

    <el-row  :gutter="0">
  <el-col :span="8" class="slot-a " :sm="4" :md="4" :lg="8" :xl="4">
    <slot name="a2"></slot>
  </el-col>
  <el-col :span="8" class="slot-b " :sm="4" :md="4" :lg="8" :xl="4">
    <slot name="b2"></slot>
  </el-col>
  <el-col :span="8" class="slot-c " :sm="4" :md="4" :lg="8" :xl="4">
    <slot name="c2"></slot>
  </el-col>
  </el-row>

  <el-row  :gutter="0">
    <el-col :span="12" class="slot-a " :sm="12" :lg="12" :md="12" :xl="12">
      <slot name="x1"></slot>
    </el-col>
    <el-col :span="12" class="slot-c " :sm="12" :lg="12" :md="12" :xl="12">
      <slot name="x2"></slot>
    </el-col>
  </el-row>
   <el-row  :gutter="0">
  <el-col :span="24" class="slot-a " :sm="24" :md="24" :lg="24" :xl="21" >
    <slot name="y1"></slot>
  </el-col>
  </el-row>
   <el-row  :gutter="0">
  <el-col :span="24" class="slot-b " :sm="24" :md="24" :lg="24" :xl="24">
    <slot name="y2"></slot>
  </el-col>
  </el-row>
   </div>

       <div class="elevation-20 drag01" style="height:97%;overflow-y:scroll; background:#E8F5E9" >
         <div v-if="demo">
         <h1>H1: {{ h1 }} H:{{ h }}</h1>
         <input type="number" v-model="h1" /> h: <input type="number" v-model="h" />
         <table border=5 >
           <thead>
           <tr><td>ID:</td>
             <td v-for="(w2,i2) in WinDows[0]" :key="i2" class="pa-2 ma-1">
               {{ i2 }}
             </td>
           </tr>
           </thead>
           <tr v-for="(w1, i ) in WinDows" :key="i" >
             <td>{{ i }} </td>
             <td v-for="(w2,i2) in w1" :key="i2" class="px-5  ma-1 " >
               <h1 v-if="active==idx && i === active " >{{w2}}/{{i}}</h1>
               <h2 v-else >{{w2}}/{{i}}</h2>
             </td>
           </tr >
         </table>
         <div>
           {{ info }} active : {{ active }} old z : {{ old_z }} z: {{ z }}  z1: {{ z1 }} zMax : {{ zMax }}
           <br>txt: <input type ="text" v-model="idx" style="background: red"/>
         </div>
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
      },
      demo: {
        type: Boolean,
        required: false
      },
      maximize: {
        type: Boolean,
        required: false
      },
      closeButton: {
        type: Boolean,
        required: false
      },

      parent:false

    },
  data: ()  => {
    return {
      z1: this.z,
      h1: this.h,
      w1: this.w,
      x1: this.x,
      y1: this.y,
      old_z: 0,
      info: 'nic',
      idx_test: 0


    }
  },
  created () {

    this.x1=this.$store.state.WinDows[this.idxx()].x
    this.y1=this.$store.state.WinDows[this.idxx()].y
    this.h1=this.$store.state.WinDows[this.idxx()].h
    this.w1=this.$store.state.WinDows[this.idxx()].w

  },
  mounted () {
     // this.$store.dispatch('setWin', {id: this.id, x: this.x, y: this.y, h: this.h, w: this.w ,z: this.z, z1: this.z1 } )
   },

  computed: {
     ...mapGetters([
       'getWinList'
       // 'getWin'
     ]),

    ...mapState([
      'isUserLoggedIn',
      'WinDows',
      'active',
      'zMax'
    ]),
    idx: function () {
      return this.idxx()
    }

  },
  methods: {

    w_zindex: function() {
//      console.log('Click na tlacitko')
    },
    idxx: function() {

      var nRet = this.WinDows.findIndex((el) => {
        return  (el.id == this.id)
      })

      return nRet
    },
    onResize: function (x1, y1, w1, h1) {
       this.x1 = x1
       this.y1 = y1
       this.h1 = h1
       this.w1 = w1
       this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: h1 , w: w1 ,z: this.z, z1: this.z1 } )
       this.z1 = this.zMax
    },
    onDrag: function (x1, y1) {
      this.info= this.id + "Drag "+ x1 +" " +y1
      this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1,h: this.h1 , w: this.w1 ,z: this.z1, z1: this.z1 } )

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
        this.$store.dispatch('setWin', {id: this.id, x: x1, y: y1, h: this.h1 , w: this.w1  ,z: this.z, z1: this.z1 } )
        this.z1 = this.zMax
    }

    }
  }
</script>


<style scoped>
  .el-row {
    margin-bottom: 0px;
    background-color: #4FC3F7;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 0px;
    background:#4FC3F7
  }
  .slot-a {
    text-align: left;
    background:#4FC3F7;
  }
  .slot-b {
    text-align: center;
    background:#4FC3F7;
  }

.slot-c {
    text-align: right;
    background: #4FC3F7;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 136px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #4FC3F7;
  }
</style>




