<template>
  <div
    :style="'width:100%;max-width:2500px;position:relative;border:solid 1px #cccccc;background:white;height:'+h"
    ref="obal"
  >
    <div
      :style="'width:100%;max-width:2500px;background:white;overflow:auto;'"
      ref="d1"
      v-on:scroll="syncA"
    >
      <slot name="nadpis"></slot>
      <table v-if="(list && list.length) || true " :style="'width:100%;'+stylet1">
        <slot name="head">
          <thead>
            <tr v-for="(i1, idx) in list" :key="i1.idx" v-if="idx==0">
              <th v-for="(i1 ,idyz) in i1" :key="idyz">{{ idyz }}</th>
            </tr>
          </thead>
          <!-- <tbody class="h-1b" >
     <tr v-for="(i1, idx) in list" :key="idx">
       <td v-for="(i2 ,idy) in i1" :key="idy">{{ i2 }} </td>
     </tr>
          </tbody>-->
        </slot>
      </table>
    </div>
    <div
      :style="'width:100%;positon:relative;overflow:auto;background:white;height:80%;'+stylet2"
      ref="d2"
      v-on:scroll="syncB"
    >
      <table v-if="list && list.length" style="width:100%;background:white;">
        <thead class="h-1">
          <slot name="head1">
            <tr v-for="(i1, idx) in list" :key="i1.idx" v-if="idx==0">
              <th v-for="(i1 ,idyz) in i1" :key="idyz">{{ idyz }}</th>
            </tr>
          </slot>
        </thead>
        <slot name="body">
          <tbody style="width:100%background:white;">
            <tr v-for="(i1, idx) in list" :key="idx">
              <td v-for="(i2 ,idy) in i1" :key="idy">{{ i2 }}</td>
            </tr>
          </tbody>
        </slot>
      </table>
    </div>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";

export default {
  props: {
    list: {
      type: Array,
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
    autosize: true
  },
  data() {
    return {
      dialog: true,
      leftDiv: null,
      rightDiv: null,
      tOut: false,
      autosize1: this.autosize,
      cols: []
    };
  },

  mounted() {
    //console.log('Auto',this.autosize1)
    if (this.autosize1) {
      this.analyze();
    }
  },

  methods: {
    analyze() {
      const self = this;
      console.log("inner", self.$refs.d1.clientWidth);
    },

    syncA() {
      const self = this;
      if (self.tOut) {
        clearTimeout(self.tOut);
        self.tOut = false;
      }
      self.tOut = setTimeout(function() {
        self.$refs.d2.scrollLeft = self.$refs.d1.scrollLeft;
      }, 100);
    },
    syncB() {
      const self = this;
      if (self.tOut) {
        clearTimeout(self.tOut);
        self.tOut = false;
      }
      self.tOut = setTimeout(function() {
        self.$refs.d1.scrollLeft = self.$refs.d2.scrollLeft;
      }, 100);
    }
  }
};
</script>
