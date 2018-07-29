<template>
  <v-container>
    <div>
      <panel title="Nastaveni">
        <menu-schema></menu-schema>
        ahoj
      </panel>
    </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import MenuSchema from './MenuSchema'

export default {
  components:{
     'menu-schema': MenuSchema,
  }
}
</script>
<style scoped>
</style>
