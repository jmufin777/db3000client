<template>
 <v-dialog
      v-model="IsDialog"
        persistent
        max-width="900px"
        scrollable
    >


  >
<div style="opacity:1; background:white;width:100% " class="white" id="de821">
  <slot name="a1" :sm="8" :md="8" :lg="8" :xl="8"></slot>
<el-row> <el-col :span="24">
</el-col></el-row>
<el-form  id="form821" ref="form2" :model="form2" label-width="70px" :label-position="labelPosition" :rules="rules2" class="demo-ruleForm is-success">



 <el-row>
<el-form-item>
    <el-button type="primary" id="btn_user_submit821" @click="submitForm('form')" size="mini"
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
import ListMat from '@/services/ListMatService'
import { setTimeout, clearInterval } from 'timers'

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
      list: [],
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
    eventBus.$on('dlg821', ( dlgPar ) => {
      //alert('modulik')
      self.IsDialog = true
      //alert(JSON.stringify(dlgPar))
      self.getData(dlgPar)


  })
          setTimeout(function(){
//          alert(document.getElementById("dialog004"))
       // this.$nextTick(() => this.$refs.email.focus())
//       document.getElementById("form_zobraz9901").focus()
      //document.getElementById("form9901first").focus()

       document.getElementById("de821").addEventListener('keyup', (function(e) {

         if (e.keyCode == 13) {
           alert('13')
           document.getElementById('btn_user_submit821').focus()
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

    // alert('M')
  },

  methods: {
    async getData(dlgPar) {
          const self = this
          //alert(JSON.stringify(dlgPar)+ "/" + dlgPar.Id)
          if (dlgPar.Id > 0 ){

            self.list = (await ListMat.one(this.user,dlgPar.Id))
          //alert(JSON.stringify(dlgPar))
          }
          //self.list = (await ListMat.one(this.user,dlgPar.id))
          //alert(JSON.stringify(self.list))
    },
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
