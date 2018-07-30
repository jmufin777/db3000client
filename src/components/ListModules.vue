<template>

    <div >
    <el-row  :gutter="0">
    <el-col :span="4" :offset="0" style="margin-top:5px;padding-left:20px">
        Modulos
    </el-col>

    <el-col :span="4" :offset="16" >
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-20"
        @click="newModule()"
    ></el-button>
    </el-col>
    </el-row>
    <el-row :gutter="0" style="margin-top:12px">

    <draggable v-model="menu_set_3"  :options="{group:{ name:'people',  pull:'clone' }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >

    <el-col :span="24" v-for="(element,i) in menu_set_3" :key="i" class="people pa-0   blue"  :id="'b' + i"
      style="margin-top :1px"
      >
        <el-col :span=3 ><v-icon small left >{{element[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
   </el-col>
    </draggable>



    <draggable v-model="menu_set_2"  :options="{group:{ name:'people',  pull:'clone'  }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span=24 >Pouzite</el-col>
    <el-col :span=24 v-for="(element,i) in menu_set_2" :key="i" class="people pa-0 teal" :id="'a' + i"
    style="margin-top :1px"
      >
      <el-col :span=3><v-icon small left >{{element[1]}}</v-icon></el-col>
      <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
    </el-col>
    </draggable>

    <el-col :span=24 >Kos</el-col>
    <draggable v-model="menu_trash"  :options="{group:{ name:'people'  }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span=24 v-for="(element,i) in menu_trash" :key="i" class="people pa-0 teal" :id="'a' + i"
    style="margin-top :1px"
      >
        <el-col :span=3><v-icon small left >{{element[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
    </el-col>

    </draggable>
        <el-col :span=24 class="red">
        {{error}}
    </el-col>
    <el-col :span=24 class="green">
        DataRes {{ tableData }} / {{ isUserLoggedIn }} /{{  user }}
    </el-col>
    </el-row>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'

import ListModulesService from '@/services/ListModulesService'
import { setTimeout } from 'timers';


export default {
  components:{
    // 'menu-schema': MenuSchema,
  },
  data: () => {
    return {
      info: '',
      error: '',
      tableData: [],
      menu_set_2: [
        ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]],
        ['Sirky', 'code', 'menu_switch', 'set-width', 'true','','','','','Item',[]],
        ['Materiály', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]],
        ['Stroje', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]]
      ],
      menu_set_3: [
        ['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
        ['Moduly', 'view_module', 'menu_switch', 'list-modules', 'true','','','','','Item',[]],
        ['Admin komplet', 'build', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],

      ],
      menu_trash: [['Kos', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],
       ['----', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],
       ['----', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]]]

    }
  },
  computed: {
    ...mapState([
      'user',
      'isUserLoggedIn',
      'xMenuMain'
    ])
  },

  async created () {
    if (this.isUserLoggedIn) {
      try {
        this.tableData = (await ListModulesService.all(this.user))
      } catch (error) {
        this.error = error.response.status
      }
      if (this.error == 433) {
          this.initModule(this.menu_set_2)
          this.initModule(this.menu_set_3)

      }
    } else {
      this.tableData.push(['Prihlaseni error'])
    }
  },

  async mounted () {
    if (this.isUserLoggedIn) {
      try {
        this.tableData = (await ListModulesService.all(this.user))
      } catch (error) {
        this.error = error.response
      }
    }
  },

  methods: {
    chooseItem() {
      return true
    },
    async getData() {
      var neco
      try {
          neco = (await  ListModulesService.all(this.user))
          alert('aaaaa')
          return  neco
      } catch (e) {
          this.tableData = ['errorek']


      }
    },
    async initModule (adata) {
         try {
          await ListModulesService.init(this.user, adata)
         } catch (e) {
           this.error = 'Vklad modulu zhavaroval'
         }
    },
    async newModule () {
      try {
      this.loading = true
      //this.tableData = (await ListModulesService.init(this.user,this.menu_set_2))
      } catch ( error ){
        this.error = error.response.status

        console.log( error  )


      }
    },

    xnewModule: function () {

      alert('ahoj')
    }
  }



}
</script>
<style scoped>
</style>
