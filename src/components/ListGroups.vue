<template>
    <div id="m002" style="overflow:scroll" >
     <el-row  :gutter="0">
    <el-col :span="17" :offset="0" style="margin-top:5px;padding-left:10px" class="blue">
        Skupiny {{ info }}

    </el-col>

    <el-col :span="2" :offset="0" >
      <el-tooltip content="Vlozi novou skupinu   do databaze" placement="top" effect="light">
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newGroup()"
    ></el-button>
      </el-tooltip>
    </el-col>

    <el-col :span="2" :offset="0" >
      <el-tooltip content="Ulozi skupiny v zobrazenem poradi" placement="top" effect="light">
    <el-button  :disabled="IsWaiting" type="success" icon='el-icon-success'  size="mini" class="elevation-0"
        @click="setGroups(1)"
    ></el-button>
    </el-tooltip>
    </el-col>
    </el-row>
    <hr><hr><hr><hr><hr><hr>
    <draggable v-model="tableShow"  :options="{group:{ name:'peopleUsers',  pull:'clone' }}">
    <el-row v-for="(element, i ) in tableShow" :key="i" :gutter="0">
    <el-col :span="7" :offset="0"  class="peopleUsers teal  pa-0   ruka"   style="margin-top :1px">
      <el-col :span="14">
        {{element.nazev}}
      </el-col>
      <el-col :span="5">
             <button :disabled="IsWaiting"  style="width:100%" class="info"  @click="EditGroup(element.id)" ><i class="el-icon-edit"></i></icon></button>
      </el-col>
      <el-col :span="5">
             <button :disabled="IsWaiting"  style="width:100%" class="warning" @click="onSubmitDelete(element.id)" ><i class="el-icon-delete"></i></button>
      </el-col>
    </el-col>
    </el-row>
    </draggable>
    <el-row  :gutter="0">
    <el-col :span="17" :offset="0" style="margin-top:5px;padding-left:10px" class="blue">
      Infi {{ tableShow }} data : {{tableData}}
     </el-col>
    </el-row>


<!-- Dialog -->
   <el-dialog
  title=""
  :visible.sync="centerDialogVisible"
  width="30%"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="false"
  center>

    <span slot="title" size="mini" class="blue">
      <el-card>

        <el-col :span="8">
         Menu {{IsNewGroup?'Nove  ': 'Uprava skupiny ' + form.Nazev }}
        </el-col>
      </el-card>
      </span>
    <span>
<v-form ref="form" :model="form" label-width="0px">
  <el-row :gutter="0">
   <el-col :span="20">

<v-text-field
            label="Nazev"
            hint="Nazev  skupiny"
            class="caption"
            v-model="form.Nazev"
            :rules="NazevRules"
            autofocus
     ></v-text-field>
    <v-textarea
            solo
            label="Popis"
            hint="Vas popis pro lepsi orinetaci"
            class="caption"
            v-model="form.Popis"
            required
            autofocus
     ></v-textarea>
  </el-col>

  <el-col :span="3">
    <el-col :span="24" :offset="1">

    <el-button v-if="!IsNewGroup" type="primary" @click="onSubmitEdit" size="mini" style="width:100%" >{{ IsNewGroup? 'Vytvorit':'Ulozit'}}</el-button>
    <el-button v-if="IsNewGroup"  type="primary" @click="onSubmit" size="mini" style="width:100%" >{{ IsNewGroup? 'Vytvorit':'Ulozit'}}</el-button>
    </el-col>
    <el-col :span="24" :offset="1">
    <el-button @click="centerDialogVisible=false"  size="mini" style="width:100%">Cancel</el-button>
    </el-col>
  </el-col>
  </el-col>
  </el-row>
</v-form>
    </span>
</el-dialog>
<win-dow  :id="'progrs'" :h="200" :w="200" :x="10" :y="100" :parent="true" v-if="IsWaiting">

      <v-progress-circular v-if="IsWaiting"
      :rotate="360"
      :size="100"
      :width="15"
      :value="nWait"
      color="teal"
    >
      {{ nWait }}
    </v-progress-circular>
    <p>
    Cekejte prosim
    </p>

    </win-dow>







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
      tableHelp:[],
      editItem: [] ,
      SelectedId: 0,

      IsNewGroup: false,
      IsWaiting: false,
      nI: {} ,
      nWait: 0,
      form: {
        Nazev: '',
        Popis: '',
        IdeFix: 0,
        Id:     0
      },
      NazevRules: [
       v => !!v || 'Nazev skupiny je vyzadovan',
       // v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
    }
  },

  created () {
   setTimeout(function() {
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
  },
  watch: {
    tableData:  function(item) {
      this.tableData.forEach(element => {
        this.tableShow.push(element)
      });

      // console.log('Zmena dat' + this.tableShow + this.menu_set_2)
    }
   } ,

  mounted () {
      if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
      }
       try {
         ListGroupsService.all(this.user, 'All')
         .then( res => {
            if (res.data.info == 0 ) {
              this.info='data skupin nejsou '+ JSON.stringify( res.data.info )
            } else {
               console.log('data Jsou '+ JSON.stringify( res.data.info ))
              this.tableData = res.data.data
            }
         })
      } catch (e) {
        this.error = e
      }

   },
   methods: {
     newGroup () {

      this.IsNewGroup=true
      this.centerDialogVisible = !this.centerDialogVisible
      this.form.Nazev       =  ''
      this.form.Popis       =  ''
      this.form.IdeFix      =  0

      try {
      this.loading = true

      } catch ( error ){
        this.error = error.response.status
        console.log( error  )

      }
    },
    async onSubmitDelete (id) {
      await ListGroupsService.delete(this.user,id)
      .then (res =>{
        ListGroupsService.all(this.user,'All')
        .then(res =>{
          this.tableShow =[]
          this.tableData = res.data.data
        })
      })

    },
    async onSubmit() {

      console.log(this.form)
      await  ListGroupsService.init(this.user, this.form, 'one' )
      .then (res => {
         ListGroupsService.all(this.user,'Col')
               .then (res => {
                 this.tableShow = []
                 this.tableData = res.data.data
                 this.nWait = 100
                 this.IsWaiting=false
                 this.centerDialogVisible = false
               })
      })
      .catch((e) => {
        console.log('Uprava skupin Err: '+ e)
      })
    },
    async EditGroup(id) {
      this.SelectedId  = id
      this.IsNewGroup=false

      await    ListGroupsService.all(this.user,id)
      .then( res => {
          console.log(res)
           this.tableHelp    = res.data.data
           this.form.Nazev   = res.data.data[0].nazev
           this.form.Popis   = res.data.data[0].popis
           this.form.Id      = res.data.data[0].id
           this.form.IdeFix  = res.data.data[0].idefix
           this.centerDialogVisible = true


      })
      .catch((e) => {
        console.log(`Zaznam ${id} asi neni nebo co`)
      })
    },
    async onSubmitEdit() {
        await ListGroupsService.update(this.user,this.form)
        .then ( res => {
          this.tableShow =[]
          this.tableData = res.data.data
        })
        .then( res => {

          this.centerDialogVisible = false
        })
        .catch((e) => {
          console.log('Navrat dat po editu zhavaroval ')
        })



    },
    async setGroups (id) {
      console.log('set Groups')

      await  ListGroupsService.init(this.user, this.tableShow, 'all' )
      .then (res => {
         ListGroupsService.all(this.user,'Col')
               .then (res => {
                 this.tableShow = []
                 this.tableData = res.data.data
                 this.nWait = 100
                 this.IsWaiting=false
                 this.centerDialogVisible = false
               })
      })
      .catch((e) => {
        console.log('Uprava skupin Err: '+ e)
      })




    }
   }
}


</script>

<style lang="stylus" scoped>
 .v-progress-circular
    margin: 1rem
</style>
