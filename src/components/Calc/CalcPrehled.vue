<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
  <div style="max-height:400px; overflow:auto;font-size:70%" class="orange lighten-5 pt-1">
    <slot name="obsah">Zde budoou kalkulace az budoou</slot>
  </div>

  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import { eventBus } from "@/main.js";
import { setTimeout, clearInterval } from "timers";

export default {
  props: {},
  data() {
    return {};
  }
};
</script>


<style scoped>
</style>


