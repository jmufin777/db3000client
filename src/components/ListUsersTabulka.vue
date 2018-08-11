<template>
<div id="m005" style="overflow:scroll">

     <el-row  :gutter="10">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" class="blue">
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
      <el-col :span="18" >
        <el-input prefix-icon="el-icon-search" clearable size="mini" v-model="search" placeholder="Uzivatele">
       </el-input>
      </el-col>

      <el-col :span="2" :offset="0" >
      <el-tooltip content="Vlozi noveho uzivatele  do databaze" placement="top" effect="light">
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newGroup()"
    ></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="2" :offset="0">
     <el-col :span="24">

      <el-tooltip content="Ulozi skupiny v zobrazenem poradi" placement="top" effect="light">
    <el-button  :disabled="IsWaiting" type="success" icon='el-icon-success'  size="mini" class="elevation-0" style="margin-left:8px"
        @click="setGroups(1)"
    ></el-button>
    </el-tooltip>
    </el-col>
    </el-col>
    </el-col>
    </el-row>
  <el-table
    :data="tableData"
    height="700"
     style="width: 100%;height:100% "
     size="mini"
     border
     :default-sort = "{prop: 'login', order: 'descending'}"
     :row-key="rowindex"
      >
      <el-table-column
       type="index"

      >

      </el-table-column>

    <el-table-column
      fixed
      prop="fullname"
      label="Jmeno"
      width="180"
      sortable
      >
    </el-table-column>
      <el-table-column
      fixed
      prop="idefix"
      label="Idefix"
      width="180"
      sortable
      >

    </el-table-column>

    </el-table-column>
    <el-table-column
      prop="login"
      label="Login"
       size="mini"
       sortable
      >
    </el-table-column>
    <el-table-column
      prop="level"
      label="Level"
       size="mini"
       sortable
      draggable
      >
          <template slot-scope="scope">
            <div>
            aa {{ scope.$index }}
            </div>
          </template>


    </el-table-column>
    <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          Remove
        </el-button>
      </template>
    </el-table-column>

    <el-table-column
      width="200"
      label="Zmeny"
       size="mini"
      draggable
     >



    <template slot-scope="scope">
      <draggable v-model="tableData" :options="{group:{ name:'peopleUsers',  pull:'clone' }}">
        <el-button
         size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          type="danger"
           size="mini"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
         </draggable>
      </template>

    </el-table-column>
  </el-table>
  </div>
  </template>

<script>

// import virtualList from 'vue-virtual-scroll-list'
// 'virtual-list': virtualList,

import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import ListUsers from '@/services/ListUsersService'
import ListGroupsService from '@/services/ListGroupsService'
import ListMenuSchemaService from '@/services/ListMenuSchemaService'
import { setTimeout, clearInterval } from 'timers';

export default {
  components: {



  },
  data () {
    return {
     Group: [],  //Prijem dat
      Menu: [],
      centerDialogVisible: false,
      info: '',
      error: '',
      search: '',
      tableData: [],
      tableShow: [] ,
      tableHelp:[],
      tableModules: [],
      tableMenus: [],
      editItem: [] ,
      SelectedId: 0,

      IsNewGroup: false,
      IsWaiting: false,
      indextest: 0
    }
  },
  async mounted () {

    if (this.isUserLoggedIn) {
      await ListUsers.all(this.user,'All')
      .then(res => {
          this.tableData = res.data.data

      })
      .catch((e) => {
        alert('podivny')
      })

    }
  },

  methods: {
    rowindex(nrow) {
      console.log(nrow)
      return ++this.indextest
    },
     deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    async my_data () {
     return ;
      this.loading = true
      const tableData  = (await ListUsers.all()).data
      this.total = this.tableData
      return tableData
    },

    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  },

  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  created () {
   setTimeout(function() {
    document.getElementById("m005").style.height=Math.round(window.innerHeight - 110)  + "px"
  },100)
  window.addEventListener('resize', (function() {
   document.getElementById("m005").style.height=Math.round(window.innerHeight - 110)  + "px"
  })
  )
  }
}
</script>
