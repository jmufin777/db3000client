<template>

    <div style="height:400px" slot="activator">
    <el-row  :gutter="0">
    <el-col :span="7" :offset="0" style="margin-top:5px;padding-left:10px" class="blue">
        Moduly
    </el-col>


    <el-col :span="2" :offset="5" >
      <el-tooltip content="Vlozi novy modul do databaze" placement="top" effect="light">
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newModule()"
    ></el-button>
      </el-tooltip>
    </el-col>

    <el-col :span="2" :offset="2" >
      <el-tooltip content="Ulozi modulyv zobrazenem poradi" placement="top" effect="light">
    <el-button  type="success" icon='el-icon-success'  size="mini" class="elevation-0"
        @click="setModules()"
    ></el-button>
      </el-tooltip>
    </el-col>

    <el-col :span="2" :offset="2" >
      <el-button  type="warning" icon='el-icon-minus'  size="mini" class="elevation-10"
        @click="showData()"
    ></el-button>
    </el-col>
   </el-row>

    <el-row :gutter="0" style="margin-top:12px">
     <draggable v-model="tableShow"  :options="{group:{ name:'people',  pull:'clone' }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span="24" v-for="(item,idb) in tableShow" :key="idb" class="people pa-0   blue"  :id="'b' + idb"
      style="margin-top :1px" @click="centerDialogVisible= true"
      >
        <el-col :span=3 ><v-icon  @dblclick="editModule(item)" small left >{{item[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{item[0]}}</el-col>
   </el-col>
    </draggable>

    <draggable v-if="tableData.length==0 " v-model="menu_set_3"  :options="{group:{ name:'people',  pull:'clone' }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >

    <el-col :span="24" v-for="(element,i) in menu_set_3" :key="i" class="people pa-0   blue"  :id="'b' + i"
      style="margin-top :1px"
      >
        <el-col :span=3 ><v-icon small left >{{element[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
   </el-col>
    </draggable>



    <draggable v-if="tableData.length==0 " v-model="menu_set_2"  :options="{group:{ name:'people',  pull:'clone'  }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span=24 >Pouzite</el-col>
    <el-col :span=24 v-for="(element,i) in menu_set_2" :key="i" class="people pa-0 teal" :id="'a' + i"
    style="margin-top :1px"
      >
      <el-col :span=3><v-icon small left >{{element[1]}}</v-icon></el-col>
      <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
    </el-col>
    </draggable>

    <el-col :span=24 >Kos</el-col>
    <draggable v-model="menu_trash"  :options="{group:{ name:'people'  }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span=24 v-for="(element,i) in menu_trash" :key="i" class="people pa-0 teal" :id="'a' + i"
    style="margin-top :1px"
      >
        <el-col :span=3><v-icon small left >{{element[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
    </el-col>

    </draggable>
        <el-col :span=24 class="red">
        {{error}}
    </el-col>
    <el-col :span=24 class="green">
        Show {{ tableShow }}
        DataRes {{ tableData }} / {{ isUserLoggedIn }} /{{  user }} / [ {{ info }} ]
    </el-col>
    </el-row>

   <el-dialog
  title=""
  :visible.sync="centerDialogVisible"
  width="30%"
  size="mini"
  :close-on-press-escape="true"
  :close-on-click-modal="false"
  center>

    <span slot="title" size="mini">aaaaa</span>
    <span>
<el-form ref="form" :model="form" label-width="50px">

  <el-form-item label="Nazev" size="mini">
   <el-input  v-model="form.Nazev" size="mini" resize autosize></el-input>
  </el-form-item>
  <el-form-item label="Ikona" size="mini">
   <el-input v-model="form.Ikona" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="Spustec" size="mini" style="width:2000">
   <el-input v-model="form.Trigger" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="Modul" size="mini">
   <el-input v-model="form.Modul" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="Okno?" size="mini">
   <el-input v-model="form.WindowShow" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="N1" size="mini">
   <el-input v-model="form.Volna1" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="N2" size="mini">
   <el-input v-model="form.Volna2" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="N3" size="mini">
   <el-input v-model="form.Volna3" size="mini" resize ></el-input>
   </el-form-item>
   <el-form-item label="Typ" size="mini">

   <el-select v-model="value" placeholder="Select" size="mini">
    <el-option   v-for="(Typ, i) in (form.Typ)" :key="i" :label="Typ"   :value="i"></el-option>
  </el-select>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">Create</el-button>
    <el-button @click="centerDialogVisible=false">Cancel</el-button>
  </el-form-item>

</el-form>
  </span>

</el-dialog>



    </div>



</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'


import ListModulesService from '@/services/ListModulesService'
import { setTimeout } from 'timers';


export default {
  components:{
    // 'menu-schema': MenuSchema,
  },
  data: () => {
    return {
      Modulex: 'xxxx',
      centerDialogVisible: false,
      info: '',
      error: '',
      tableData: [],
      tableShow: [] ,
      form: {
        Nazev: '',
        Ikona: 'code',
        Trigger: 'menu_switch',
        Modul: '',
        WindowShow: true,
        Volna1: '',
        Volna2: '',
        Volna3: '',
        Typ: ['tetsik','Item','Group'],
        Pole: [],
        items: ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]]
      },
      menu_set_2: [
        ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]],
        ['Sirky', 'code', 'menu_switch', 'set-width', 'true','','','','','Item',[]],
        ['Materiály', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]],
        ['Stroje', 'texture', 'menu_switch', 'set-material', 'true','','','','','Item',[]]
      ],
      menu_set_3: [
        ['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
        ['Moduly', 'view_module', 'menu_switch', 'list-modules', 'true','','','','','Item',[]],
        ['Admin komplet', 'build', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],

      ],
      menu_trash: [['Kos', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],
       ['----', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]],
       ['----', 'delete_foreve', 'menu_switch', 'menu-admin', 'true','','','','','Item',[]]]

    }
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
        this.tableShow.push(element.items)
      });


      console.log('Zmena dat' + this.tableShow + this.menu_set_2)
    }
  },
async  mounted () {
   if (this.isUserLoggedIn) {
      try {
        //initModule(this.menu_set_2)
         ListModulesService.all(this.user)
         .then( res => {
            if (res.data.info == 0) {
              alert('data nejsou '+ JSON.stringify( res.data.info ))
              try {
              this.getData1()

              } catch (e) {
                this.error = e
              }
            } else {
              this.tableData = res.data.data
            }
         })

      } catch (e) {
        this.error = e
      }
   }
  },
  methods: {
     onSubmit() {
        console.log('submit!');
      },
    chooseItem(evt) {
      //alert(evt.draggedContext.type)

      return true
    },
    setModules () {
      ListModulesService.init(this.user,this.tableShow)
      .then(res => {

        alert('Moduly byly uspesne vlozeny'+ res.data.info)
      })
      .catch((e) => {
        alert('Moduly se nejak pojebly')
      })
    },
    getData1() {
        ListModulesService.init(this.user,this.menu_set_2)
      .then(res => {
          ListModulesService.init(this.user,this.menu_set_3)
             .then(res => {
                ListModulesService.all(this.user)
               .then (res => {
                 this.tableData = res.data.data
               })

             })
             .catch((e) => {
               alert('ERR 1'+e)
             })
      })
      .catch((e) => {
          alert('ERR 2' )
      })
    },
    showData() {

      //   alert(this.tableData[0].items[0])
    },
    editModule (item) {
      this.centerDialogVisible=true
      this.form.Nazev = item[0]
      this.form.Ikona = item[1]
      this.form.Trigger = item[3]
      this.form.Modul = item[4]
      this.form.Window = item[5]
      this.form.Volna1 = item[6]
      this.form.Volna2 = item[7]
      this.form.Volna3 = item[8]
      this.form.Typ = item[9]
      this.form.Pole = [10]

        //['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
      alert(item)

    },
    async newModule () {
      this.centerDialogVisible = !this.centerDialogVisible
      try {
      this.loading = true
      //this.tableData = (await ListModulesService.init(this.user,this.menu_set_2))
      } catch ( error ){
        this.error = error.response.status
        console.log( error  )


      }
    },

  }



}
</script>
<style scoped>
</style>
