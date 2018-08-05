<template>
    <div id="m002" style="overflow:scroll" >
    <el-row v-for="i in 100" :key="i" :gutter="0">
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

  created () {
   setTimeout(function(){

    document.getElementById("m002").style.height=Math.round(window.innerHeight - 110)  + "px"

  },100)
  window.addEventListener('resize', (function() {
   document.getElementById("m002").style.height=Math.round(window.innerHeight - 110)  + "px"
  })
  )
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
