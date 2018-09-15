<template>
<div id="m201" style="overflow:scroll" >

   <el-table
    :data="list"
    style="width:480px"
    size="mini"
    max-height="250"
    >
    <el-table-column
      fixed
      prop="id"
      label="Id"
      width="100">
    </el-table-column>
    <el-table-column
      prop="kod"
      label="Kod"
      width="120">
    </el-table-column>
    <el-table-column
      prop="nazev"
      label="Nazev"
      width="150">
    </el-table-column>

    <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, list)"
          type="text"
          size="small">
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>

 <div style="width:480px">
  <table width="100%">
    <thead>
      <tr>
      <th style="width:25%">Id</th><th style="width:25%">Kod</th><th style="width:50%">Nazev</th>
      </tr>
      </thead>
  </table>
 </div>

<div id="m221" style="overflow:scroll;width:480px" >

  <table width="100%">
    <tr v-for="(item,i) in list" :key="i">
      <td style="width:25%" @click.self="Alert(item.id)">{{ item.id}}</td>
      <td style="width:25%">{{ item.kod}}</td>
      <td style="width:50%">{{ item.nazev}}</td>

    </tr>
  </table>
  </div>

</div>

</template>

<script>
import {mapState} from 'vuex'
import List2Barevnost from '@/services/List2BarevnostService'

export default {
  props: ['visible'],
  data () {
    return {
      valueDeterminate: 65,
      loading: false,
      total: 0,
      pagination: {},
      headers: [
        {
          text: 'Id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        { text: 'Kod', value: 'kod' },
        { text: 'Name', value: 'name' }
      ],
      list: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.list = (await List2Barevnost.all()).data
    }
  },

  created () {

setTimeout(function(){
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  },100)

  window.addEventListener('resize', (function() {
   document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  })







  )




  },
  watch: {
    pagination: {
      handler () {
        this.my_data()
        alert('watch')
      },
      deep: true
    }
  },
  beforeDestroy (){
      // alert('destory')
  },
  methods: {
    async my_data () {
      this.loading = true
      this.list = (await List2Barevnost.all()).data
      this.total = this.list.length
      this.loading = false
    },
    deleteRow(index, rows) {
        rows.splice(index, 1);
      },
    Alert(txt) {
      alert(txt)

    },
    close () {

    },
    open () {

    },
    cancel () {

    },
    save () {

    },
    my_data1 () {
      console.log('my data 1')
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
<style scoped>
</style>
