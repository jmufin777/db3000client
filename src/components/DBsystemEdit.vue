<template>
 <v-dialog
      v-model="IsDialog"
        persistent
        max-width="900px"
        scrollable
    >
<!--
    <el-dialog
  :visible.sync="IsDialog"
  width="800px"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="false"
  :close="endDlg"
  id="dialog9004" -->

  >
<div style="opacity:1; background:white;width:100% " id="de9901">
  <slot name="a1" :sm="8" :md="8" :lg="8" :xl="8"></slot>
<el-row> <el-col :span="24">
</el-col></el-row>
<el-form  id="form9901" ref="form2" :model="form2" label-width="70px" :label-position="labelPosition" :rules="rules2" class="demo-ruleForm is-success">

  <span v-for="(col, i) in cols" :key="i" v-if="col.props.form=='yes'">
    <el-row>


       <el-col :span="4">
         {{ col.title}}
       </el-col>
       <el-col :span="10">
        <el-input  v-model="recData[col.id]" :ref="recData[col.id]"  size="mini" :placeholder="recData[col.title]"  v-if="col.type=='text'"></el-input>
        <v-textarea  v-model="recData[col.id]" :ref="recData[col.id]"  size="mini" :placeholder="recData[col.title]"  v-if="col.type=='textarea' && Array.isArray(recData[col.id])"></v-textarea>
        <table v-if="Array.isArray(recData[col.id])">
          <tr v-for="(sub1,i1) in recData[col.id]" :key="i1">
            <td>
              <el-input  v-model="recData[col.id][i1]"   size="mini"  ></el-input>
             </td>
          </tr>
        </table>

       </el-col>

   </el-row>
  </span>

 <el-row>
<el-form-item>
    <el-button type="primary" id="btn_user_submit9901" @click="submitForm('form')" size="mini"
    >Ulozit</el-button>
    <el-button @click="resetForm('form')" size="mini">Reset</el-button>
</el-form-item>
 </el-row>
</el-form>
</div>
</v-dialog>
</template>
<script>
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import DBsystemService from '@/services/DBsystemService'
import { setTimeout } from 'timers';

export default {
  props: {
    name: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      labelPosition: 'right',
      IsDialog: false,
      recData: {},
      idRecord: 0,
      form2: {

      },
      formBackup: {

      },
      cols: {},
      rules2:   {

      }

    }
  },
  created() {
    const self=this
    eventBus.$on('dlg9901', ( dlgPar ) => {
      this.IsDialog = true
      this.recData = dlgPar.record
      this.idRecord = dlgPar.nRow
      this.cols = dlgPar.cols
      var x
        for (x in this.recData ) {
          this.formBackup[x] = this.recData[x]
        }


  })
          setTimeout(function(){
//          alert(document.getElementById("dialog004"))
       // this.$nextTick(() => this.$refs.email.focus())
//       document.getElementById("form_zobraz9901").focus()
      //document.getElementById("form9901first").focus()

       document.getElementById("de9901").addEventListener('keyup', (function(e) {

         if (e.keyCode == 13) {
           alert('13')
           document.getElementById('btn_user_submit9901').focus()
         }
           if (e.keyCode == 27) {
            if (confirm('Zahodit zmeny ')) {
            //document.getElementById('btn_user_submit').focus()
              self.IsDialog=false;

            }
         }
      }))
      },100)


  },
  updated (){



  },
  mounted() {
//    alert('M')
  },

  methods: {
    submitForm(formName) {

      this.IsDialog = false
    },
    resetForm(formName) {
        var x
        for (x in this.formBackup ) {
          this.recData[x] = this.formBackup[x]
        }

    },
    async onSubmitSave(){

    },
    endDlg (){
      this.IsDialog = false


      return true
    }
  },
  beforeDestroy() {
    //alert('Destr')
  }
}

</script>
