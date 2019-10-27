<template>
  <div class="A4">
    Ahoj {{ IDEFIX_ITEM}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, setInterval } from 'timers'
import f from '@/services/fce'

import Q from '@/services/query'
import queryKalk from '../../services/fcesqlKalkulace'
import prepocty from '../../services/fceKalkulacePrepocty'
import fceVL from '../../services/fceVL'



export default {
  components:{

  },
  props:{
    IDEFIX_ITEM: {
      required: false,
      default:0
    }

  },
  data() {
    return {
      f: f,
      $: $,
      fceVL:fceVL,


    }
  },
  async mounted(){

  },
  methods: {

  }


}
</script>>
