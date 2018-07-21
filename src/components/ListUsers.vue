<template>
<div>
  <el-table
    :data="tableData4"
    height="400"
     style="width: 100% "
     size="mini"
     border
      >
    <el-table-column
      fixed
      prop="jmeno"
      label="Jmeno"
      width="180">
    </el-table-column>
    <el-table-column
      prop="prijmeni"
      label="Prijmeni"
      width="180"
       size="mini"
      resizable
      >
    </el-table-column>
    <el-table-column
      prop="login"
      label="Login"
       size="mini"
      >
    </el-table-column>
    <el-table-column
      prop="level"
      label="Level"
       size="mini"
      draggable
      >
    </el-table-column>
    <el-table-column
      width="200"
      label="Zmeny"
       size="mini"
      draggable
      >

    <template slot-scope="scope">
      <draggable v-model="tableData4" >
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
import {mapState} from 'vuex'
import ListUsers from '@/services/ListUsersService'
import virtualList from 'vue-virtual-scroll-list'
import draggable from 'vuedraggable'

export default {
  components: {
    'virtual-list': virtualList,
    'draggable': draggable

  },
  data () {
    return {
      valueDeterminate: 50,
      tableData4: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.tableData4 = (await ListUsers.all()).data
    }
  },

  methods: {
    async my_data () {
      this.loading = true
      const tableData4 = (await ListUsers.all()).data
      this.total = this.tableData4
      return tableData4
    },
    klik () {
      alert('1111')
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
  }
}
</script>
