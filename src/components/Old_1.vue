<template>
<div>
  <el-table
    :data="tableData4"
    height="700"
     style="width: 80% "
     size="mini">

    <el-table-column v-for="(pol, i ) in Object.keys(tableData4[1])" :key="i"
      :prop="pol"
      :label="pol + ' a '+ i "
      width="200"
       >
      <template slot-scope="scope">
         {{ tableData4[scope.$index][pol] }}
      </template>
    </el-table-column>

  </el-table>
  <div>
    x: {{ Object.keys(tableData4[1])}}
  </div>

  </div>
  </template>

<script>
import {mapState} from 'vuex'
import Old1 from '@/services/Old1Service'
import virtualList from 'vue-virtual-scroll-list'
import  g  from '@/funkce/global.js'

export default {
  components: {
    'virtual-list': virtualList
  },
  data () {
    return {
      tableData4: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.tableData4 = (await Old1.all()).data
      window.document.title = 'Old-1'
    } else {
      window.close()
    }
    g.z_count()
  },

  methods: {
    async my_data () {
      this.loading = true
      const tableData4 = (await Old1.all()).data
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
