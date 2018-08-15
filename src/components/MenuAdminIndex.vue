<template>
<div >
  <el-row :gutter="0" >

  <el-col :span="9" class="pa-0 ma-0" style="background:#BDE7F6">
    <el-col :span="24" :offset="0">
    <div style="float:right;background:white;height:100%;width:1px">&nbsp;</div>

          <menu-schema></menu-schema>
    </el-col>

  </el-col>
  <el-col :span="3" :offset="0" style="background:#ADE7F6;">
    <el-col :span="24" :offset="0">
      <div style="float:right;background:white;height:100%;width:1px">&nbsp;</div>
            <list-modules></list-modules>

    </el-col>
  </el-col>
  <el-col :span="6" :offset="0" style="background:#ADE7F6;">
    <el-col :span="24" :offset="0">
      <div style="float:right;background:white;height:100%;width:1px">&nbsp;</div>
            <list-groups></list-groups>
     </el-col>
  </el-col>
  <el-col :span="6" :offset="0" style="background:#ADE7F6">
   <el-col :span="24">
     <el-col :span="24">
       <div style="float:right;background:white;height:100%;width:1px">&nbsp;</div>
              <list-users></list-users>


     </el-col>
   </el-col>
  </el-col>
  </el-row>
</div>


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
