<template>
<v-flex lg text-lg-right class="white elevation-20"  >

  <div>
    Server : {{ server }}

   </div>
      <slot>
        No slot content defined.
      </slot>

 </v-flex>
</template>

<script>
import { eventBus } from '@/main.js'
import testy from '.././_Testy/testy'
import ListUsers from '../ListUsers'

export default {
  props: [
    'title',
    'klik'
  ],
  components: {
    'testy': testy,
    'set-users': ListUsers

    },
  data: () => {
    return {
      server: null
    }
  },
  created () {
  // Using the service bus
    eventBus.$on('menu_switch', (server) => {
       this.server = server
  })
 }
}

</script>

<style scoped>
</style>
