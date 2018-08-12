<template>
<el-dialog
  title=""
  :visible.sync="centerDialogVisible"
  width="30%"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="false"
  :close="endDlg"
  >
  <el-row >
    <el-col :span=4 property="date" label="date"><el-input autofocus size="mini" placeholder="jmeno" >Jmeno</el-input></el-col>
    <el-col :span=4 property="date" label="date"><el-input size="mini" placeholder="jmeno" >Jmeno</el-input></el-col>

    <el-col width="100" property="name" label="name"></el-col>
    <el-col width="300" property="address" label="address"></el-col>
  </el-row>

</el-dialog>

</template>

<script>
import { eventBus } from '@/main.js'
export default {
  data: () => {
    return {
      centerDialogVisible: true,
      form: []
    }
  },
  created() {

    eventBus.$on('dlg', ( dlgPar ) => {
      this.centerDialogVisible = dlgPar

      })
  },
  methods: {
    endDlg:  () => {
      alert('sem close')
      return true
    }
  }
}
</script>
<style scoped>
</style>
