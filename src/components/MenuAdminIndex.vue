<template>
<el-row :gutter="0">
<el-col :span="9" class="pa-0 ma-0" style="background:#BDE7F6;">
        <menu-schema></menu-schema>
</el-col>
<el-col :span="4" class="pa-0 ma-0" style="background:#ADE7F6;">
          <list-modules></list-modules>
</el-col>
</el-row>

</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import MenuSchema from './MenuSchema'
import ListModules from './ListModules'

export default {
  components:{
     'menu-schema': MenuSchema,
     'list-modules': ListModules,
  }
}
</script>
<style scoped>
</style>
