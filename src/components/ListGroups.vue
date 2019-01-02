<template>
    <div id="m002" style="overflow:scroll" >
     <el-row  :gutter="0" >
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:0px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>

      <el-col :span="19" >
        <div style="width:100%">
        <el-input class="mx-0" prefix-icon="el-icon-search" clearable size="mini" v-model="search" placeholder="Skupiny" >
       </el-input>
       </div>
      </el-col>

      <el-col :span="2" :offset="0" >
      <el-tooltip content="Vlozi novou skupinu   do databaze" placement="top" effect="light">
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
    <div style="height:100%;overflow:scroll" class="mt-2">
    <draggable v-model="tableShow"  :options="{group:{ name:'peopleUsers',  pull:'clone' }}">
    <el-row v-for="(element, i ) in tableShow" :key="i" :gutter="30" class="blue pa-1" style="margin-bottom:1px"
    v-bind:class="{JsemVidet: search <' ' || element.nazev.replace(RegExp(search,'i'),'')!==element.nazev, NejsemVidet:  search >' ' && element.nazev.replace(RegExp(search,'i'),'')==element.nazev}"
      >
    <el-col :span="23" :offset="1"  class="peopleUsers   pa-0   ruka"   style="margin-top :1px">
      <el-row>
        <el-col :span="8" style="text-align:left" >
          <div class=" ma-2 " >
          <el-tooltip  placement="top" effect="light">
             <div slot="content">Popis: <hr>{{element.popis}}</div>
                    <el-badge :value="groupCount(element.idefix)"  class="blue item my-0" style="background-color:white;width:95%;height:100%;border-radius:0px">
                      <button    class="yellow" size="mini" @click="showUsers(element.idefix)" ><i class="el-icon-question"></i></button>
                      &nbsp;
                      {{element.nazev}}



                    </el-badge>
          </el-tooltip>
        </div>

      </el-col>
    <el-col :span="2" >
      <el-col :span="24" :offset="0" >
        <el-col :span="9" :offset="6" >
             <button  :disabled="IsWaiting"  style="width:100%" class="info"  @click="EditGroup(element.idefix)" ><i class="el-icon-edit"></i></button>
      </el-col>
      <el-col :span="9">
             <!-- <button v-if="tableMenus[element.idefix].length==0 && tableModules [element.idefix].length==0" :disabled="IsWaiting"  style="width:100%" class="warning" @click="onSubmitDelete(element.idefix)" ><i class="el-icon-delete"></i></button> -->
             <button v-if="emptyGroup(element.idefix)" :disabled="IsWaiting"  style="width:100%" class="warning" @click="onSubmitDelete(element.idefix)" ><i class="el-icon-delete"></i></button>
      </el-col>
      </el-col>
    </el-col>


    <el-col :span="13" :offset="0">
     <div class=" my-0 px-0 mx-0" >
    <el-select  v-model="tableMenus[element.idefix]" filterable clearable
    no-match-text="Nenalezeno"
    no-data-text="Cekam na data"
    placeholder="Typ Menu" size="mini"
    @change="changeMenu(element.idefix,i)"
    style="width:84%"

    >
    <el-option

      v-for="Men in Menu"
      :key="Men.idefix"
      :label="Men.Nazev"
      :value="Men.idefix">
    </el-option>
  </el-select>
   </div>
  </el-col>

      </el-row>
       <el-row>
      <el-col :span="22" :offset="0">
    <el-select  v-model="tableModules[element.idefix]" multiple filterable
    no-match-text="Nenalezeno"
    no-data-text="Cekam na data"
    placeholder="Skupiny" size="mini"
    @change="changeModules(element.idefix,i)"
    style="width:100%"
    >
    <el-option
      v-for="(Mod,iMod) in Modul"
      :key="Mod.idefix"
      :label="Mod.Nazev"
      :value="Mod.idefix">
    </el-option>
  </el-select>
   </el-col>
   </el-row>
    </el-col>
    </el-row>
    </draggable>
    </div>
    <el-row  v-if="false==true" :gutter="0">

    <el-col :span="17" :offset="0" style="margin-top:5px;padding-left:10px" class="orange lighten-5">
      {{ tableModules }} <hr> {{ tableMenus}}

      <div v-show="true">
      Infi {{ tableShow }} data : {{tableData}}
      </div>
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
         Skupina {{IsNewGroup?'Nova  ': 'Uprava skupiny ' + form.Nazev }}
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



 </div>

</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import ListModulesService from '@/services/ListModulesService'
import ListGroupsService from '@/services/ListGroupsService'
import ListMenuSchemaService from '@/services/ListMenuSchemaService'
import { setTimeout, clearInterval } from 'timers'


export default {
  components:{

    // 'menu-schema': MenuSchema,
  },
  data: () => {

    return {
      Modul: [],  //Prijem dat
      Menu: [],


      centerDialogVisible: false,
      info: '',
      error: '',
      search: '',
      tableData: [],
      tableShow: [] ,
      tableSend: [] ,
      tableHelp:[],
      tableModules: [],
      tableMenus: [],
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
    //Smazat
    //Smazat
    }

  },

  created () {
    eventBus.$off('Modules')
    eventBus.$off('Menus')

    eventBus.$on('Modules', (list) => {
      this.Modul = list
    })
    eventBus.$on('Menus', (list) => {
      this.Menu = list

    })
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
      this.tableShow=[]
      this.tableSend=[]

      this.tableData.forEach(element => {
        element.Menus1  =  ""
        element.Modules1 = []
        this.tableShow.push(element)
        this.tableSend.push({idefix: element.idefix, Nazev: element.nazev})

      });
      eventBus.$emit('Groups', this.tableSend )

    }
   } ,
  async mounted () {
    this.IsWaiting=true
      if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
      }
      var i=0
      try {

        ListMenuSchemaService.all(this.user, 'Col')
        .then (res =>{
           this.Menu=[]
          res.data.data.forEach(element  => {

            this.Menu.push({idefix: element.idefix, Nazev: element.nazev })

          })
          this.Menu = _.uniqBy(this.Menu )


        })
      }catch(e) {

        console.log("Cghyba pri nacitani polozek menu", e)


      }

      try {
       await ListModulesService.all(this.user, 'All')
        .then(res => {
          this.Modul=[]
          res.data.data.forEach(element  => {
            if (element.items[3] >' '){
              this.Modul.push({idefix:element.idefix, Nazev:element.items[0]})
            }
          })
          this.Modul = _.uniqBy(this.Modul )
        })

      } catch(e){
          console.log(e)

      }

       try {
         await ListGroupsService.all(this.user, 'All')
         .then( res => {
            if (res.data.info == 0 ) {
              this.info='data skupin nejsou '+ JSON.stringify( res.data.info )
            } else {
              console.log('data Jsou '+ JSON.stringify( res.data.info ))
              this.tableData = res.data.data
              this.tableData.forEach(element => {
              element.Menus1  =  ""
              element.Modules1 = []
              console.log(element)
                this.tableModules[element.idefix] =[]
                this.tableMenus[element.idefix] =''
          });
              res.data.dataMenu.forEach((el) =>{
                this.tableMenus[el.idefix_group] = el.idefix_menu
              })
              res.data.dataModules.forEach((el) =>{
                this.tableModules[el.idefix_group].push(el.idefix_module)
              })
            }
         })
      } catch (e) {
        this.error = e

      }
      this.IsWaiting=false

   },
   methods: {
     //informace
     showUsers(idefix) {

       eventBus.$emit('showUsers', {'idefix': idefix*1, 'searchInfo': 'groups'} )

     },
     groupCount(idefix){
       var nret = 0
       try {
         nret = this.tableModules[idefix].length
       } catch (e) {
         nret = -1
       }
       return nret
       //(tableModules[element.idefix].length)?tableModules[element.idefix].length:0
     },

     emptyGroup(idefix){
       var lret = true

       try {
         lret = this.tableModules[idefix].length == 0 && this.tableMenus[idefix].length == 0
       } catch (e) {
         lret  = true
         console.log('Err - empty', e)
       }
       return lret
     },


     //informace
     async changeModules(idefix, i){
       this.IsWaiting=true
       this.tableShow[i].tableModules1= this.tableModules[idefix]
       await ListGroupsService.updateModules(this.user,{idefix: idefix, items: this.tableModules[idefix] })
       .then (res => {
         this.IsWaiting=false

       })
       .catch ((e) =>{
         alert(e)
         this.IsWaiting=false
       })
       // alert(this.tableModules[idefix]+"  " + i)
     },
     async changeMenu(idefix, i) {
       this.IsWaiting=true
       this.tableShow[i].tableMenus1= this.tableMenus[idefix]
       await ListGroupsService.updateMenus(this.user, {idefix: idefix, items: this.tableMenus[idefix]})
       .then (res =>{
         this.IsWaiting=false

       })
       .catch((e)=>{
         alert(er)
         this.IsWaiting=false
       })
       // alert(this.tableMenus[idefix])

     },
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
      this.IsWaiting=true
      await ListGroupsService.delete(this.user,id)
      .then (res =>{
        ListGroupsService.all(this.user,'All')
        .then(res =>{
          this.tableShow =[]
          this.tableData = res.data.data
          this.IsWaiting=false
          eventBus.$emit('setUsers',1)
        })
      })
    },
    async onSubmit() {
      this.IsWaiting=true
      await ListGroupsService.init(this.user, this.form, 'one' )
      .then (res => {
         ListGroupsService.all(this.user,'Col')
               .then (res => {
                 this.tableShow = []
                 this.tableData = res.data.data
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
      this.IsWaiting=true
      await    ListGroupsService.all(this.user,id)
      .then( res => {
          console.log("[ " + JSON.stringify(this.tableModules[id])+ "]")
           this.tableHelp    = res.data.data
           this.form.Nazev   = res.data.data[0].nazev
           this.form.Popis   = res.data.data[0].popis
           this.form.Id      = res.data.data[0].id
           this.form.IdeFix  = res.data.data[0].idefix
           // this.form.tableMenus1   = res.data.data[0].tableMenus1
           // this.form.tableModules1 = res.data.data[0].tableModules1
           this.centerDialogVisible = true
           this.IsWaiting=false
           // alert(JSON.stringify(this.form.tableMenus1 ))
           // alert(this.form.tableModules1)
      })
      .catch((e) => {
        console.log(`${e} Zaznam ${id} asi neni nebo co`)
      })
    },
    async onSubmitEdit() {
        this.IsWaiting=true
        await ListGroupsService.update(this.user,this.form)
        .then ( res => {
          this.tableShow =[]
          this.tableData = res.data.data
        })
        .then( res => {

          this.centerDialogVisible = false
          this.IsWaiting=false
        })
        .catch((e) => {
          console.log('Navrat dat po editu zhavaroval ')
        })

    },
    async setGroups (id) {
      console.log('set Groups')
      this.IsWaiting=true
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


