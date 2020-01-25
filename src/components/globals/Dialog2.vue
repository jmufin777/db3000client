<template>
  <div
    title="title"
    :visible.sync="dialog"
    v-if="dialog && show"
    width="800"
    style="width:800px;height:600px;position:fixed;right:15%;opacity:1;top:10%"
    size="mini"
    :close-on-press-escape="true"
    :close-on-click-modal="true"
    :modal="false"
    @click="dialog=false;show=false"
    @mouseleave="dialog=false"
    class="elevation-12"
    center
  >
    <span slot="title" size="mini" class="blue">{{title}}</span>
    <slot name="nahled"></slot>
    <!-- {{ dialog}} {{show}} {{odkaz}} -->
    <img v-if="odkaz >''" :src="odkaz" style="height:600px; width:800px" />
  </div>
</template>

<script>
import f from "@/services/fce";
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: false
    },
    show: {
      type: Boolean,
      default: false,
      required: false
    },
    pre: {
      type: Boolean,
      default: false,
      required: false
    },
    odkaz: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      dialog: false,
      f: f
    };
  },
  updated() {
    if (this.show) {
      this.dialog = true;
    } else {
      this.dialog = false;
    }
  },
  mounted() {
    if (this.show) {
      this.dialog = true;
    }
    // alert('DLG' + this.title )
  }
};
</script>
