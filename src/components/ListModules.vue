<template>
    <div id="m001" style="overflow:scroll" >
    <el-row  :gutter="0" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:1px" class="blue">
       
       <el-col :span="14" >
        <el-input prefix-icon="el-icon-search" clearable size="mini" v-model="search" placeholder="Moduly">
       </el-input>
       </el-col>
    
     <el-col :span="2" :offset="0" >
      <el-tooltip content="Vlozi novy modul do databaze" placement="top" effect="light">
      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newModule(-1)"
    ></el-button>
      </el-tooltip>
    </el-col>

    <el-col :span="2" :offset="3" >
      <el-tooltip content="Ulozi moduly v zobrazenem poradi" placement="top" effect="light">
    <el-button  :disabled="IsWaiting" type="success" icon='el-icon-success'  size="mini" class="elevation-0"
        @click="setModules(1)"
    ></el-button>
      </el-tooltip>
    </el-col>

    </el-col>
      
   </el-row>
    <div style="max-height:80%;overflow:scroll" v-bind:class="{Makam: IsWaiting}">
    <el-row :gutter="0" style="margin-top:12px">
     <draggable v-model="tableShow"  :options="{group:{ name:'people',  pull:'clone' }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col v-if="item[9]=='Item' ||  true" :span="24" v-for="(item,idb) in tableShow" :key="idb"
      v-bind:class="{green: item[9]=='Group', used: modUsed(item[3]) ,
      JsemVidet: search <' ' || item[0].replace(RegExp(search,'i'),'')!==item[0], NejsemVidet:  search >' ' && item[0].replace(RegExp(search,'i'),'')==item[0]}"
      class="people pa-0   blue ruka"  :id="'b' + idb"
      style="margin-top :1px" @click="centerDialogVisible= true"
      >
        <el-col :span=3
            @click="editModule(item,idb)"><v-icon  @dblclick="editModule(item,idb)" small left >{{item[1]>''?item[1]:'code'}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{item[0]}}</el-col>
   </el-col>

    </draggable>


    <draggable v-if="tableData.length==0 " v-model="menu_set_3"  :options="{group:{ name:'people',  pull:'clone' }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >

    <el-col :span="24" v-for="(element,i) in menu_set_3" :key="i" class="people pa-0   blue ruka"  :id="'b' + i"
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
    </el-row>
    </div>
    <hr>
    <div style="max-height:19%;overflow:scroll">
    <el-row :gutter="0">

    <el-col style="position:absolute;bottom:2px" :span=24 >Kos</el-col>
    <draggable v-model="menu_trash"  :options="{group:{ name: 'people'   }}"
     @start="drag=true" @end="drag=false" :move="chooseItem" >
    <el-col :span=24 v-for="(element,i) in menu_trash" :key="i" class="people pa-0 grey" :id="'a' + i"
    style="margin-top :1px"
      >
        <el-col :span=3><v-icon small left @click="Alert" >{{element[1]}}</v-icon></el-col>
        <el-col :span=12 :push="1" style="text-align:left">{{element[0]}}</el-col>
    </el-col>
    </draggable>

        <el-col :span=24 class="red">
        {{error}}
    </el-col>
    </el-row>

    </div>

    <el-col :span=24 class="green" style="display:none">

        Help: {{ tableHelp.data }}
        Show {{ tableShow }}
        DataRes {{ tableData }} / {{ isUserLoggedIn }} /{{  user }} / [ {{ info }} ]
    </el-col>


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
        <el-col :span="4"><v-icon v-if="form.Ikona >''" color="red">{{form.Ikona}}</v-icon></el-col>
        <el-col :span="8">
        Definice  {{ form.Nazev >'' ? 'modulu ' + form.Nazev : 'noveho modulu' }}
        </el-col>
      </el-card>
      </span>
    <span>
<el-form ref="form" :model="form" label-width="0px">
  <el-row :gutter="0">
   <el-col :span="7">
<v-text-field
            label="Nazev"
            hint="Nazev  modulu v menu"
            class="caption"
            v-model="form.Nazev"
            autofocus
     ></v-text-field>

  </el-col>
<el-col :span="7" :offset="1">
  <v-text-field
            label="Ikona"
            hint="Ikona modulu"
            class="caption"
            v-model="form.Ikona"
     ></v-text-field>
</el-col>
<el-col :span="7" :offset="1">
   <v-text-field
            label="Modul"
            hint="Modul v aplikaci"
            class="caption"
            v-model="form.Modul"
     ></v-text-field>
</el-col>
 </el-row>
 <el-row :gutter="0">
 <el-col :span="7">
   <v-text-field
            label="Spoustec"
            hint="Trigger"
            class="caption"
            v-model="form.Trigger"
     ></v-text-field>
</el-col>
<el-col :span="7" :offset="1">
 <v-select
          :items="form.win_tems"
          label="Kde ?"
          hint="Kde se modul spusti?"
          class="caption"
          dense
          background-color="white"
          :value="form.WindowShow"
          v-model="form.WindowShow"
          solo
          z-index="2000000"
        ></v-select>
</el-col>
<el-col :span="7" :offset="1">
 <v-select
          :items="form.type_items"
          label="Typ"
          hint="Typ=Skupina, polozka ?"
          class="caption"
          dense
          background-color="white"
          :value="form.Typ"
          v-model="form.Typ"
          solo
          z-index="2000000"
        ></v-select>
</el-col>
 </el-row>

  <el-form-item>
   <el-col :span="7" :offset="0">
 <v-select
          :items="form.poz_tems"
          label="Pozice"
          hint="Ikona pozice"
          class="caption"
          dense
          background-color="white"
          :value="form.IkonaPozice"
          v-model="form.IkonaPozice"
          solo
          z-index="2000000"
        ></v-select>
</el-col>
<el-col :span="12" :offset="1">
    <el-button v-if="IsNewModule" type="primary" @click="onSubmit" size="mini">Vytvorit</el-button>
    <el-button v-if="!IsNewModule" type="primary" @click="onSubmit"  size="mini">Upravit</el-button>
    <el-button v-if="!IsNewModule" type="primary" @click="onSubmitCopy"  size="mini">Kopie</el-button>

    <el-button @click="centerDialogVisible=false"  size="mini">Cancel</el-button>
</el-col>
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
import { setTimeout, clearInterval } from 'timers';


export default {
  components:{

    // 'menu-schema': MenuSchema,
  },
  data: () => {
    return {
      Modulex: 'xxxx',
      H: window.innerHeight,
      centerDialogVisible: false,
      info: '',
      error: '',
      search: '',
      tableData: [],
      tableShow: [] ,
      tableHelp: [], //napr.pouzite moduly - seznam
      tableSend: [],
      editItem: [] ,

      IsNewModule: false,
      IsWaiting: false,
      nI: {} ,
      nWait: 0,
      form: {
        Nazev: '',
        Ikona: 'code',
        Trigger: 'menu_switch',
        Modul: '',
        WindowShow: 'plocha',
        Volna1: '',
        idefix: 0,
        IkonaPozice: 'right',
        Typ: 'Item',


        type_items: ['Item', 'Group'],
        win_tems: ['plocha', 'window'],
        poz_tems: ['left', 'right'],
        idx: -1,

        Pole: [],
        items: ['Barevnost', 'format_color_fill', 'menu_switch', 'list2-barevnost', 'true','','','','','Item',[]]
      },

      compList: [
        'menu-nav'
        ,'menu-admin'
        ,'menu-schema'
        ,'dev-doc'
        ,'dev-pp'
        ,'dev-pp-kalc'
        ,'form-helper'
        ,'testy'
        ,'test-menu'
        ,'list2-barevnost'
        ,'list-users'
        ,'list-modules'
        ,'set-width'
        ,'set-material'
        ,'form-fx'
        ,'old-1'
      ],
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
      this.tableSend=[]
      this.tableShow=[]
      this.tableData.forEach((element,i) => {
        element.items[7] = element.idefix
        this.tableShow.push(element.items)
        if (element.items[3] >' '){
          this.tableSend.push({idefix:element.idefix, Nazev:element.items[0]})
        }
      });
      this.tableSend = _.uniqBy(this.tableSend )
      eventBus.$emit('Modules', this.tableSend )
      console.log('Zmena dat' + this.tableShow + this.menu_set_2)
    },

    menu_trash: function() {
        this.menu_trash.forEach(el1 => {
          this.tableShow.forEach((el2,i) => {
            if (el1 == el2 ) {
               this.tableShow.splice(i,1)
               // alert('smazu' + i)
            }
          })
        })
    },
    xMenuMain: function() {
       // alert('aahoj')
      }
  },

created () {
  eventBus.$on('UsedInMenu', ( id ) => {
    if (id > 0 ){
      this.onRecieveFromMenu (id)
    }
  })

  setTimeout(function(){
    document.getElementById("m001").style.height=Math.round(window.innerHeight - 110)  + "px"
  },100)
  window.addEventListener('resize', (function() {
   document.getElementById("m001").style.height=Math.round(window.innerHeight - 110)  + "px"
  })
  )

},
async  mounted () {
this.IsWaiting=true
  // return
   if (this.isUserLoggedIn) {
      try {
         ListModulesService.all(this.user, 'All')
         .then( res => {
            if (res.data.info == 0) {
              alert('Data nejsou , pouziji moduly'+ JSON.stringify( res.data.info ))
              try {
              this.getData1()

              } catch (e) {
                this.error = e
              }
            } else {
       this.IsWaiting=false           
       this.tableData = res.data.data
       //doplneni idefixe a odeslani nazvu
       this.tableData.forEach((element,i) => {
        element.items[7] = element.idefix
        this.tableShow.push(element.items)
        this.tableSend = []
        if (element.items[3] >' '){
          this.tableSend.push({idefix:element.idefix, Nazev:element.items[0]})
        }
       });
      this.tableSend = _.uniqBy(this.tableSend )
              eventBus.$emit('Modules', this.tableSend )
            }
         })
       
      } catch (e) {
        this.error = e
        this.IsWaiting=false
      }
   }
   


  },
  methods: {
    modUsed (item) {

      var lRet = -1


      //console.log(JSON.stringify(this.tableHelp).replace(/\\/g,'').replace(/"/g,''))
      lRet = this.tableHelp.findIndex(el => {
         return  (item == el )

      })
      // console.log(item, ":::::", lRet)
      return lRet > -1
    },
    async onRecieveFromMenu (id) {
      await ListModulesService.usedInMenu (this.user, id)
      .then (res => {
        this.tableHelp = []

        res.data.data.forEach(el => {
          if (el.modul.match(/[a-z]/i) && !el.modul.match(/null/) ) {

            this.tableHelp.push(el.modul)
          }
        })

      })
      .then (res => {
        // alert(this.tableHelp.join('~'))

         //alert('seznam modulunacten' + JSON.stringify(this.tableHelp[0].replace('/\\/','hovnoprdelsrackatoje nase znacka')))
      })

    },
     onSubmitCopy () {
       this.IsNewModule = true
       this.onSubmit()
     },
     onSubmit() {
       const newItem = [

      this.form.Nazev
      ,this.form.Ikona
      ,this.form.Trigger
      ,this.form.Modul
      ,this.form.Volna0
      ,this.form.WindowShow
      ,''
      ,this.form.idefix
      ,this.form.IkonaPozice
      ,this.form.Typ
      ,[]
       ]


        if (newItem[9]=='Group'){
           var aEmpty2 = Array(11)
              aEmpty2[0] = 'Aplikace'
              aEmpty2[1] = 'home'
              aEmpty2[3] = 'Spoustec'
              aEmpty2[8] = 'right'
              aEmpty2[9] = 'Item'
              aEmpty2[10] = []
              newItem[10] = [aEmpty2]
              // this.$store.state.xMenuMain.push(newItem)
         }
       if (this.IsNewModule){
         newItem[7] = 0
         this.editItem.push(newItem)


         //this.setModules(-1)
         this.centerDialogVisible = false
         this.tableShow.push(newItem)
       } else {
         this.centerDialogVisible = false
         this.tableShow[this.form.idx] = newItem
         ListModulesService.update( this.user,newItem,0,this.form.idx)

       }


        console.log('submit!', this.form);
      },
    chooseItem(evt) {
      //alert(evt.draggedContext.type)

      return true
    },
    Alert() {
      alert('ikona')
    },
    setModules (del) {
      this.IsWaiting=true
      this.nWait=1
      this.nI = setInterval(() => {
        if (this.nWait > 200) {
          return (this.nWait = 0)
        }
        this.nWait += 15
      }, 100)

      ListModulesService.init(this.user,(del)?this.tableShow: this.editItem , del)
      .then(res => {
              ListModulesService.all(this.user,'All')
               .then (res => {
                 this.tableShow = []

                 this.tableData = res.data.data
                 this.nWait = 100
                 this.IsWaiting=false
               })
               .catch((e) => {
                 console.log('Moduly - chyba dotazu na seznam module '+ e )

               })

      })
      .catch((e) => {
        console.log('Moduly - chyba behem ukladani '+ JSON.stringify(e.response.data))
        this.IsWaiting=false
        this.nWait = 100

      })


    },
    getData1() {
        ListModulesService.init(this.user,this.menu_set_2, false )
      .then(res => {
          ListModulesService.init(this.user,this.menu_set_3, false)
             .then(res => {
                ListModulesService.all(this.user,'All')
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
    editModule (item, index) {
      this.centerDialogVisible=true
      if (item[5] =='' || item[5] == null ) item[5] = 'plocha'

      this.IsNewModule=false
      this.form.Nazev   = item[0]
      this.form.Ikona   = item[1]
      this.form.Trigger = item[2]
      this.form.Modul   = item[3]
      this.form.Volna0  = item[4]
      this.form.WindowShow  = item[5] == ''? 'plocha': item[5]
      this.form.Volna1  = item[6]
      this.form.idefix  = item[7]
      this.form.IkonaPozice  = item[8]
      this.form.Typ     = item[9]
      this.form.Pole    = [10]
      this.form.idx     = index







        //['Uzivatele', 'wc', 'menu_switch', 'list-users', 'true','','','','','Item',[]],
      // alert(item)

    },
    newModule () {

      this.IsNewModule=true
      this.centerDialogVisible = !this.centerDialogVisible
      this.form.Nazev       =  'Test'
      this.form.Ikona       =  ''
      this.form.Trigger     =  'menu_switch'
      this.form.Modul       =  'testy'
      this.form.Volna0      =  ''
      this.form.WindowShow  = 'plocha'
      this.form.Volna1      =  ''
      this.form.idefix      =  ''
      this.form.IkonaPozice      =  'right'
      this.form.Typ         =  'Item'
      this.form.Pole        =  ''
      this.form.idx         =  ''
      try {
      this.loading = true

      } catch ( error ){
        this.error = error.response.status
        console.log( error  )


      }
    },

  }

}
</script>
<style lang="stylus" scoped>
 .v-progress-circular
    margin: 1rem
    z-index:50000

 </style>
 <style >

 .v-icon {
    cursor: pointer
 }
 .used {
   color: gold;

 }
</style>
