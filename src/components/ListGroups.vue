<template>
    <div style="height:400px" slot="activator">
    <el-row  :gutter="0">
    <el-col :span="7" :offset="0" style="margin-top:5px;padding-left:10px" class="blue">
        Skupiny
    </el-col>
    </el-row>

 </div>

</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import ListGroupsService from '@/services/ListGroupsService'
import { setTimeout, clearInterval } from 'timers';


export default {
  components:{

    // 'menu-schema': MenuSchema,
  },
  data: () => {
    return {


      centerDialogVisible: false,
      info: '',
      error: '',
      tableData: [],
      tableShow: [] ,
      editItem: [] ,

      IsNewModule: false,
      IsWaiting: false,
      nI: {} ,
      nWait: 0,
      form: {

      }
    }
  },


  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'xMenuMain'
    ])
  }
  }
</script>

<style lang="stylus" scoped>
 .v-progress-circular
    margin: 1rem
</style>
