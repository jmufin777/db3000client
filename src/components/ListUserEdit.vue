<template>
<el-dialog
  :visible.sync="centerDialogVisible"
  width="800px"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="false"
  :close="endDlg"
  id="dialog004"

  >

  <span slot="title" size="mini" class="blue" style="height:14px">
    <div v-if="form.idefix>0 "size="mini" class="blue--text">{{form.login }}  {{form.idefix}}  zmena {{info}} </div>
    <div v-if="form.idefix==-1 "size="mini" class="blue--text">Novy uzivatel {{info}}</div>
  </span>

<el-form   ref="form" :model="form" label-width="70px" :label-position="labelPosition" :rules="rules2" class="demo-ruleForm is-success">

<el-row><el-col :span="24" class="ma-0 pa-0" prop="zobraz">
  <el-col :span="3" >
      <label class="el-form-item__label">
    <el-checkbox v-model="form.zobraz" id="form_zobraz" size="mini" border label="Zobraz" ></el-checkbox>
      </label>
 </el-col>

 <el-col :span="3" >
      <label class="el-form-item__label">
    <el-checkbox v-model="form.plati"  size="mini" border label="Plati"></el-checkbox>
      </label>
</el-col>

<el-col :span="3" >
  <label class="el-form-item__label" >
    <el-checkbox v-model="form.level"  size="mini" border label="Level" ></el-checkbox>
  </label>
</el-col>

<el-form-item label="Plati Od">
    <el-col :span="5">
      <el-date-picker v-if="centerDialogVisible" format="dd.MM.yyyy" type="date" placeholder="Plati od" v-model="form.plati_od" size="mini" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="1">Do</el-col>
    <el-col :span="5">
      <el-date-picker  v-if="centerDialogVisible"  format="dd.MM.yyyy" type="date" placeholder="Plati do" size="mini" v-model="form.plati_do" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
 </el-col></el-row>

 <el-row :gutter="0" class="ma-0 pa-0" ><el-col :span="24" class="ma-0 pa-0">
    <el-col :span="10">
    <el-form-item label="Email">
      <el-input  v-model="form.email" autofocus ref="email"  size="mini" placeholder="Email" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="7">
    <el-form-item label="Tel1:">
      <el-input v-model="form.telefon" ref=""  size="mini" placeholder="Telefon" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="7">
    <el-form-item label="Tel2:">
      <el-input v-model="form.telefon2" ref="telefon2"  size="mini" placeholder="Telefon2" ></el-input>
    </el-form-item>
    </el-col>
</el-col></el-row>

<el-row><el-col :span="24" class="ma-0 pa-0">
    <el-col :span="8" class="ma-0 pa-0">
    <el-form-item label="Login" prop="login">
      <el-input v-model="form.login" ref="login"  size="mini" placeholder="Login" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Heslo" prop="heslo">
      <el-input v-model="form.heslo" ref="heslo" size="mini" placeholder="Heslo" type="password" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="8">
    <el-form-item label="Overeni" prop="heslo2">
      <el-input v-model="form.heslo2" ref="heslo2"  size="mini" placeholder="Overeni hesla" type="password" auto-complete="off" ></el-input>
    </el-form-item>
    </el-col>
</el-col></el-row>

<el-row class="ma-0 pa-0"><el-col :span="24" class="ma-0 pa-0">
    <el-col :span="6">
    <el-form-item label="Titul" class="ma-0 pa-0">
      <el-input v-model="form.titul" ref="titul"  size="mini" placeholder="Titul" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="7">
    <el-form-item label="Jmeno" prop="jmeno">
      <el-input v-model="form.jmeno" ref="jmeno"  size="mini" placeholder="jmeno" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="11">
    <el-form-item label="Prijmeni">
      <el-input v-model="form.prijmeni" ref="prijmeni"  size="mini" placeholder="Prijmeni" ></el-input>
    </el-form-item>
    </el-col>
</el-col></el-row>

<el-row class="ma-0 pa-0"><el-col :span="24" class="ma-0 pa-0">
    <el-col :span="11">
    <el-form-item label="Ulice" class="ma-0 pa-0">
      <el-input v-model="form.ulice" ref="ulice"  size="mini" placeholder="Ulice" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="7">
    <el-form-item label="obec">
      <el-input v-model="form.obec" ref="obec" size="mini" placeholder="Obec" ></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="5">
    <el-form-item label="Psc">
      <el-input v-model="form.psc" ref="psc"  size="mini" placeholder="Psc" ></el-input>
    </el-form-item>
    </el-col>
</el-col></el-row>

<el-form-item>
    <el-button type="primary" id="btn_user_submit" @click="submitForm('form')" size="mini">Ulozit</el-button>
    <el-button @click="resetForm('form')" size="mini">Reset</el-button>
</el-form-item>
</el-form>

</el-dialog>

</template>

<script>
import { eventBus } from '@/main.js'
import {mapState} from 'vuex'
import ListUsersService from '@/services/ListUsersService'
import { setTimeout } from 'timers';


export default {
  data()  {
    var Heslo = (rule, value, callback) => {
        if (!value.match(/.{5}/)  && this.form.idefix == -1 ) {
          callback(new Error('1Heslo povinne'))
          this.$nextTick(() => this.$refs.heslo.focus())
        } else if (!value.match(/.{5}/) && this.value > ' ' && this.heslo2 > ' ') {
            this.$nextTick(() => this.$refs.heslo.focus())
            callback(new Error('2Kravina'))
        } else if (this.form.idefix > -1 && this.form.heslo<' ' && this.form.heslo2 < ' '){
            callback()
        }

         else {
          callback()
        }
    }
    var Heslo2 = (rule, value, callback) => {

        if (value < ' ' && this.form.heslo>' ') {
          callback(new Error(' Kontrolni heslo chybi'))
          this.$nextTick(() => this.$refs.heslo2.focus())
        } else if (value !== this.form.heslo) {
          callback(new Error(' Hesla se neshoduji'  ))
          this.$nextTick(() => this.$refs.heslo.focus())
        } else if (this.form.heslo>' ' && !this.form.heslo.match(/.{5}/) ) {
            callback(new Error(' Heslo je kratke'  ))

        } else {

          callback()

        }
    }
    var Jmeno = (rule, value, callback) => {
           callback()
       }
    var LogIn = (rule, value, callback) =>{
           this.err = ''
          if (value === '' && this.form.idefix === -1){
            callback(new Error('Login povinny'))
          }  else if (this.form.idefix === -1 ) {
                this.loginExists(value)
                .then (res => {

                  if (this.loginExists(value) == true || this.err>''){
                    callback(new Error(`Login je jiz pouzit ${this.err}`))
                  } else {
                    callback()
                  }


                })

          }
          else {
          callback()
          }
    }

    return {
      centerDialogVisible: false,
      labelPosition: 'right',
      err: '',
      info: '',
      change: 0,
      form: {
        idefix: 0,
        login: '',
        heslo: '',
        heslo2: '',
        jmeno: '',
        prijmeni: '',
        ulice: '',
        obec: '',
        psc: '',
        telefon: '',
        telefon2: '',
        email:'',
        level: 0,
        zobraz: 1,
        plati: 0,
        plati_od: '',
        plati_do: ''
      },
      formBackup: {},
      formSend: {},
      rules2: {
         heslo2: [
            { validator: Heslo2, trigger: 'blur' }
         ],
         heslo: [
            { validator: Heslo, trigger: 'blur' }
         ],
         login: [
            { validator: LogIn, trigger: 'blur' }
         ],
         jmeno: [
            { required: false, message: 'Vlozte jmeno', trigger: 'blur' },

          ],
          plati: [
            { type: 'number', required: true, message: 'Stav nutno zadat', trigger: 'change' },

          ],
          plati_od: [
            { type: 'date', required: true, message: 'Zadajte pocatek platnosti', trigger: 'change' }
          ],
          plati_do: [
            { type: 'date', required: true, message: 'Zadejte konec platnosti', trigger: 'change' }
          ],
          level: [
            { type: 'number', required: true, message: 'Zvolte uroven pristupu', trigger: 'change' }
          ],
          desc: [
            { required: true, message: 'Please input activity form', trigger: 'blur' }
          ]
        }
    }
  },

  created() {
    eventBus.$on('dlg', ( dlgPar ) => {
        // alert('b')
      if (dlgPar.form.idefix !==0 ){

        this.form.idefix = dlgPar.form.idefix
        this.form.login = dlgPar.form.login
        this.form.jmeno = dlgPar.form.jmeno
        this.form.prijmeni = dlgPar.form.prijmeni
        this.form.plati_od = dlgPar.form.plati_od
        this.form.plati_do = dlgPar.form.plati_do
        this.form.zobraz = (dlgPar.form.zobraz > 0)
        this.form.plati = (dlgPar.form.plati > 0)
        this.form.level = (dlgPar.form.level == 3 )
        this.form.telefon = dlgPar.form.telefon
        this.form.telefon2 = dlgPar.form.telefon2
        this.form.email = dlgPar.form.email
        this.form.ulice = dlgPar.form.ulice
        this.form.obec = dlgPar.form.obec
        this.form.psc = dlgPar.form.psc
        this.form.heslo = ''
        this.form.heslo2 = ''

        //this.centerDialogVisible = dlgPar.dlg
        this.centerDialogVisible = true
        setTimeout(function(){
//          alert(document.getElementById("dialog004"))
       // this.$nextTick(() => this.$refs.email.focus())
       document.getElementById("form_zobraz").focus()
       document.getElementById("dialog004").addEventListener('keyup', (function(e) {
         if (e.keyCode == 13) {
           document.getElementById('btn_user_submit').focus()
         }
      }))
      },100)




        //this.$refs.heslo.focus();
        // this.$nextTick(() => this.$refs.heslo.focus())
        //alert(JSON.stringify(this.$refs))
        var x
        for (x in this.form ) {
          this.formBackup[x] = this.form[x]
        }
        //alert('Picus 0' + JSON.stringify(this.form))
      } else {
        alert('Picus 0' + JSON.stringify(this.form))

      }
         //  this.$nextTick(() => this.$refs.jmeno.focus())


      })

  //window.addEventListener('keydown', (function(e) {
  //  alert(e.keyCode)
   //}))






  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  mounted () {
 //  this.aaa()

  },
  destroyed () {
    document.getElementById("dialog004").removeEventListener('keydown')
  },
  watch: {
   form: function() {
     this.$message({
                dangerouslyUseHTMLString: true,
                message: 'Watch se ozval',
                type: 'error',
                center: true
              })
    }
  },
  methods: {
    endDlg  () {
      alert('sem close')
      return true
    },
    aaa() {
      alert('aaa')
    },

  async loginExists(clogin) {
    var lRet = false

    await ListUsersService.loginExists(this.user, clogin)
    .then (res => {
      lRet = false
      if (res.data.info == 0 ) {
        lRet = false
        return lRet
      } else {
        // alert('sem tu'+JSON.stringify(res.data.data))
        this.err =  res.data.data[0].fullname
        lRet = true
      }

    })
    .catch((err) => {
      this.err='Dostupnost loginu nezjistena'
      lRet = true
    })
    return lRet

  },
  async onSubmitSave() {

        var x
        for (x in this.form){
          if ( this.form[x] != this.formBackup[x]){

             this.formSend[x] = this.form[x]
          }
        }

    await ListUsersService.init(this.user,this.form, this.form.idefix)
    .then ( res => {
//      this.centerDialogVisible = false
          })
            .catch((e) => {
              // alert('Doslo k chybam' + e)
              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>Error pri <br> vlozeni</strong>',
                type: 'error',
                center: true
              });

       })
  },
  async submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          this.info='Cekejte prosim..'
          if (valid) {
            this.onSubmitSave()
            .then (res => {
              this.info=' Ulozeno'

              this.$message({
                dangerouslyUseHTMLString: true,
                message: '<strong>Data uspesne vlozena</strong>',
                type: 'success',
                center: true
              })

              eventBus.$emit('UserOk')
              this.centerDialogVisible = false
              for (x in this.formSend){
                  this.formBackup[x] = this.formSend[x]
               }

            })
            .catch((e) => {
              console.log(e)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
  resetForm(formName) {
//    alert(formName)
        //this.$refs[formName].resetFields()
        // alert(JSON.stringify(this.formBackup))
        var x
        for (x in this.formBackup){
          this.form[x] = this.formBackup[x]
        }
  }
  }
}
</script>
<style scoped>
@import url("//unpkg.com/element-ui@2.4.6/lib/theme-chalk/index.css");

</style>
