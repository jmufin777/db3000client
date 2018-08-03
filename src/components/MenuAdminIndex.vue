<template>
<el-row :gutter="0">
<el-col :span="9" class="pa-0 ma-0" style="background:#BDE7F6;">
        <menu-schema></menu-schema>
</el-col>
<el-col :span="4" class="pa-0 ma-0" style="background:#ADE7F6;">
          <list-modules></list-modules>
</el-col>
<el-col :span="5" class="pa-0 ma-0" style="background:#ADE7F6;">
          <list-groups></list-groups>
</el-col>
<el-col :span="6" class="pa-0 ma-0" style="background:#ADE7F6;">
          <list-users></list-users>
</el-col>
</el-row>



</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import MenuSchema from './MenuSchema'
import ListModules from './ListModules'
import ListGroups from './ListGroups'
import ListUsers from './ListUsers'

export default {
  components:{
     'menu-schema': MenuSchema,
     'list-modules': ListModules,
     'list-groups': ListGroups,
      'list-users': ListUsers,
  }
}
</script>
<style scoped>
</style>
