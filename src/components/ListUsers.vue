<template>
<div id="m005" style="overflow:scroll">
    <el-row  :gutter="0">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
      <el-col :span="12" >
        <el-input prefix-icon="el-icon-search" clearable size="mini" v-model="search" placeholder="Uzivatele">
       </el-input>
      </el-col>
      <el-col :span="6" >
        <el-checkbox border  clearable size="mini" v-model="search_is" @change="setUsersCheck()">
          Neplatni
       </el-checkbox>
      </el-col>

      <el-col :span="2" :offset="0" >
      <el-tooltip content="Vlozi noveho uzivatele  do databaze" placement="top" effect="light">
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newUser()"
    ></el-button>
      </el-tooltip>
    </el-col>
    <el-col :span="2" :offset="0">
     <el-col :span="24">
      <el-tooltip content="Aktualizuje seznam z databaze" placement="top" effect="light">
    <el-button  :disabled="IsWaiting" type="success" icon='el-icon-success'  size="mini" class="elevation-0" style="margin-left:8px"
        @click="setUsers('All')"
    ></el-button>
    </el-tooltip>
    </el-col>
    </el-col>
    </el-col>
    </el-row>

    <div style="height:100%;overflow:scroll" class="mt-0">
    <el-row v-for="(element,i) in tableShow " :key="i" class="blue  pa-1 mx-0" style="margin-bottom:1px" :gutter="2"
    v-bind:class="{  JsemVidet: groupFind(element)
      , NejsemVidet:  !groupFind(element)
     }"
    >
    <el-col :span="24" class="peopleUsers   pa-0   ruka"   style="margin-top :1px">
      <el-col :span=10  style="text-align:left">
        <!-- groupCount(element.idefix) -->
    <div class=" ma-2 " >
        <el-tooltip  placement="top" effect="light">
          <div slot="content">Popis: </div>
      <el-badge :value="groupCount(element.idefix)"  class="blue item my-0" style="background-color:white;width:95%;height:100%;border-radius:0px">

        <!-- <div style="border:solid 1px;height:100%" class="white"> -->
        <div class=" ma-0 "
        v-bind:class="{blue: element.level !=3 && element.level>0, green: element.level == 3 }"
        size="mini">
          {{element.fullname}}
        </div>
       </el-badge>
        </el-tooltip>
    </div>
      </el-col>
    <el-col :span="2">
            <button  :disabled="IsWaiting"  style="width:100%" class="info"   @click="EditUser(element)" ><i class="el-icon-edit"></i></button>
     </el-col>
      <el-col :span=10 :offset=1>
        <div class=" my-1 px-0 mx-0" >
      <el-select  v-model="tableMenus[element.idefix]" clearable filterable
        no-match-text="Nenalezeno"
        no-data-text="Cekam na data"
        placeholder="Menu" size="mini"
        @change="changeMenu(element.idefix,i)"
        style="width:105%"
      >
      <el-option
      v-for="Men in Menu"
      :key="Men.idefix"
      :label="Men.Nazev"
      :value="Men.idefix"
       >
      <span style="float: left">{{ Men.Nazev }}</span>
      <span style="float: right; color: green; font-size: 13px">{{ Men.idefix }}</span>
      </el-option>
      </el-select>


    </div>

      </el-col>

    </el-col>


<!-- skupiny -->

    <el-col :span="24" :offset="0">
        <div class=" my-0 px-0 mx-0" style="width:100%">
      <draggable v-model="tableGroups[element.idefix]"  :options="{group:{ name:'peopleUsers' }}">
        <el-select  v-model="tableGroups[element.idefix]" filterable clearable multiple
        no-match-text="Nenalezeno"
        no-data-text="Cekam na data"
        placeholder="Skupiny Clenstvi" size="mini"
        @change="changeGroups(element.idefix,i)"
        style="width:95%"
        class="orange lighten-5"
        >
        <el-option
          v-for="Gr in Group"
          :key="Gr.idefix"
          :label="Gr.Nazev"
          :value="Gr.idefix">
          <span style="float: left">{{ Gr.Nazev }}</span>
          <span style="float: right; color: green; font-size: 12px">{{ Gr.idefix }}</span>
        </el-option>
  </el-select>
      </draggable>
   </div>
  </el-col>


    </el-row>
    </div>
    <list-user-edit ></list-user-edit>

  </div>
  </template>

<script>

// import virtualList from 'vue-virtual-scroll-list'
// 'virtual-list': virtualList,
import ListUserEdit from './ListUserEdit'

import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import ListUsersService from '@/services/ListUsersService'
import ListGroupsService from '@/services/ListGroupsService'
import ListMenuSchemaService from '@/services/ListMenuSchemaService'
import { setTimeout, clearInterval } from 'timers';



export default {
  components: {
    'list-user-edit': ListUserEdit

  },
  data () {
    return {
      Group: [],  //Prijem dat
      Menu: [],
      centerDialogVisible: false,
      info: '',
      error: '',
      search: '',
      search_is: false,
      searchInfo:'',
      tableData: [],
      tableShow: [] ,
      tableHelp:[],
      tableGroups: [],
      tableMenus: [],
      editItem: [] ,
      SelectedId: 0,

      IsNewGroup: false,
      IsWaiting: false,
      indextest: 0
    }
  },
  async mounted () {

    if (!this.isUserLoggedIn) {
       this.$router.push({
       name: 'login'
      })
    }
    this.updateAll('All')
      // alert(JSON.stringify(this.tableMenus)+"/"+JSON.stringify(this.Menu) +this.Menu[288])
  },

  methods: {
  setUsers(id) {

    this.updateAll(id)
  },

  setUsersCheck() {
    if (this.search_is == false) {
      this.updateAll('All')
    } else {
      this.updateAll('neplati')
    }

  },

  newUser() {
       const  formIdefix  = {}
       formIdefix.idefix = -1
       formIdefix.zobraz = 0
       formIdefix.plati = 1
       formIdefix.plati_od = '01.01.2018'
       formIdefix.plati_do = '01.01.2088'
       // alert('a')
       eventBus.$emit('dlg', {
         'form': formIdefix
      })
  },

  EditUser (formIdefix) {
      this.centerDialogVisible = true
      if (!formIdefix.idefix ) return
        eventBus.$emit('dlg', {
         'form': formIdefix
      })

  },

  groupFind(element){
    var lRet = false
    if (this.search < ' ' ) {
      return true
    }

    if (this.search > ' ' &&
    (element.login+element.fullname).replace(RegExp(this.search,'i'),'')!==(element.login+element.fullname)
    ) {
      return true
    }

    /*
    search <' ' ||  (search > ' ' &&  groupFind(element.idefix) === true ) ||
        (
          ((element.login+element.fullname).replace(RegExp(search,'i'),'')!==(element.login+element.fullname))

        )
        */
    if (this.searchInfo == 'groups')  {
    this.tableGroups[element.idefix].forEach(el =>{
      if (el == this.search){
       console.log('vynalz el:',element.idefix,  el)
       lRet = true
       return
      }
    })
    }


    if (this.searchInfo == 'menu')  {
      // console.log('menu' + JSON.stringify(this.tableMenus[element.idefix]))

      if (this.tableMenus[element.idefix] == this.search) {
        lRet = true
      }
    }



    return lRet
  },

  async updateAll(id)  {
      var i=0

      try {
        ListMenuSchemaService.all(this.user, 'Col')
        .then (res =>{
           this.Menu=[]
          res.data.data.forEach(element  => {

            this.Menu.push({idefix: element.idefix*1, Nazev: element.nazev })

          })
          this.Menu = _.uniqBy(this.Menu )

        })
      }catch(e) {
        console.log("Chyba pri nacitani polozek menu", e)
      }
      try {
       await ListGroupsService.all(this.user, 'All')
        .then(res => {
          this.Group=[]
          res.data.data.forEach(element  => {
            //console.log(`ELE<ENTO: ${element.idefix} ${element.nazev}`)
              this.Group.push({idefix:element.idefix*1, Nazev:element.nazev})
          })
               this.Group = _.uniqBy(this.Group )
        })

      } catch(e){
         console.log('Group',e)
      }


      try {
        console.log('data Jsou 1')

         await ListUsersService.all(this.user, id) // id je prikaz nebo idefix
         .then( res => {

            if (res.data.info == 0 ) {
              this.info='data uzivatelu nejsou '+ JSON.stringify( res.data.info )
            } else {
              console.log('data Jsou '+ JSON.stringify( res.data.info ))
              this.tableData = res.data.data

          this.tableData.forEach(element => {
              element.Menus1  =  ""
              element.Groups1 = []
              console.log(element)
                this.tableGroups[element.idefix] =[]
                this.tableMenus[element.idefix] =''
          });
              res.data.dataMenu.forEach((el) =>{
                this.tableMenus[el.idefix_user] = el.idefix_menu*1
              })
              res.data.dataGroups.forEach((el) =>{
                this.tableGroups[el.idefix_user].push(el.idefix_group)
              })
            }
         })
      } catch (e) {
        this.error = e

      }
      this.IsWaiting=false

  },
  groupCount(idefix){
       var nret = 0
       try {
         nret = this.tableGroups[idefix].length
       } catch (e) {
         nret = -1
       }
       return nret
       //(tableModules[element.idefix].length)?tableModules[element.idefix].length:0
     },
  emptyUser(idefix){
       var lret = true
       try {
         lret = this.tableGroups[idefix].length == 0 && this.tableMenus[idefix].length == 0
       } catch (e) {
         lRet  = true
       }
       return lret
     },
  async changeGroups(idefix, i){
       this.IsWaiting=true

       this.tableShow[i].tableGroups1= this.tableGroups[idefix]
       // alert(idefix + " / " + i + "/ "+ this.tableGroups[idefix] + this.tableShow[i])
       await ListUsersService.updateGroups(this.user,{idefix: idefix, items: this.tableGroups[idefix] })
       .then (res => {
         this.IsWaiting=false
       })
       .catch ((e) =>{

         this.IsWaiting=false
       })
       // alert(this.tableModules[idefix]+"  " + i)
     },
  async changeMenu(idefix, i) {
       this.IsWaiting=true
       this.tableShow[i].tableMenus1= this.tableMenus[idefix]
       // alert(idefix + " / " + i + "/ "+ this.tableGroups[idefix] + this.tableShow[i])
       await ListUsersService.updateMenus(this.user, {idefix: idefix, items: this.tableMenus[idefix]})
       .then (res =>{
         this.IsWaiting=false
       })
       .catch((e)=>{
         alert(er)
         this.IsWaiting=false
       })
       // alert(this.tableMenus[idefix])

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
  watch: {
    tableData:  function(item) {
      this.tableShow=[]
      this.tableData.forEach(element => {
        element.Menus1  =  ""
        element.Groups1 = []
        this.tableShow.push(element)
      });
    }
   } ,
  created () {
    eventBus.$on('Groups', (list) => {

       this.Group = list
      // alert(JSON.stringify(this.Group))
    })
    eventBus.$on('Menus', (list) => {
      this.Menu = list
    })
    eventBus.$on('showUsers', (list) => {
      this.search = list.idefix
      this.searchInfo = list.searchInfo

    })
    eventBus.$on('setUsers', (list) => {

      this.setUsers(1)
    })
    eventBus.$on('UserOk',() => {

      this.setUsers('last')

    })

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
