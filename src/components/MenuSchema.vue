<template>
<div id="m003" style="overflow:scroll" v-bind:class="{Makam: IsWaiting}">
  <el-row :gutter=0>

  <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
 <el-col :span=10>


        <el-input prefix-icon="el-icon-search" clearable size="mini" v-model="search" placeholder="Menu System">
       </el-input>
   </el-col>
   <el-col :span=13>
   <el-col :span=24 >
   <el-row :gutter="0">
    <el-col :span=4 >
  <el-tooltip  placement="bottom" effect="light">

    <div slot="content">Originalni podoba a menu <br> Vhodne pokud se neco pokazi nebo ztrati</div>
    <el-button  @click="ResetMenu" type="primary"  icon="el-icon-back"  size="mini" class="teal elevation-0">Reset</el-button>
  </el-tooltip>
    </el-col>
    <el-col :span=4 >
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">Smaze informace o ulozeni pozic oken<br>Vhodne , pokud je aplikace neprehledna</div>
    <el-button  @click="ResetWindows" type="primary" icon="el-icon-close"  size="mini" class="teal elevation-0">Okna</el-button>
    </el-tooltip>
    </el-col>
    <el-col :span=4 >
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">Ukonci a znovu nacte  aplikaci</div>
    <el-button  @click="$router.go()" type="success" icon="el-icon-success"  size="mini" class="elevation-0">OK</el-button>
    </el-tooltip>
    </el-col>
    <el-col :span=4 >
    <el-tooltip  placement="bottom" effect="light">
    <div slot="content">{{StoreInfo}}</div>
    <el-button  @click="StoreInfo0" type="success" icon="el-icon-info"  size="mini" class="elevation-0"></el-button>
    </el-tooltip>
    </el-col>
    <el-col :span=4 >
    <el-tooltip content="Ulozi lokalne zmeny a prekresli hlavni menu, vyvola dialog pro nazev a ulozeni" placement="bottom" effect="light">

      <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="SaveMenu"
    ></el-button>
   </el-tooltip>
    </el-col>
   </el-row>
   </el-col>
   </el-col>
   </el-row>

    <!-- <el-button  @click="jarda" type="success" icon="el-icon-success"  size="mini" class="elevation-1">Jarda</el-button> -->

   <!-- <div id="m004" style="overflow:scroll"> -->


    <el-row :gutter="0" >

      <el-col :span="18">

      <ul v-show="true" >
             <v-btn
                class="orange accent-12 elevation-10"
                light
                small
                absolute
                bottom
                fab
                ripple
                @click="xMenuy1.push(AddEmptyItemG())"
                style="display:none"
                ><v-icon small left>add</v-icon></v-btn>

            <draggable v-model="xMenuy1"  :options="{group: 'people' }" @start="drag=true" @end="drag=false" :move="chooseItem" style="padding-right:20px;padding-top:10px">
            <li v-for="(xMy0, i0) in xMenuy1" :key="'x'+i0" >
                <span v-if="xMy0[10].length == 0 &&  xMy0[9]=='Group' " style='display:none'>  {{ xMy0[10] = [] }}{{ xMy0[10]=[AddEmptyItem()]}}</span>

              <div v-if="xMy0[10].length>0 || xMy0[9]=='Group'" class="g0">
                &nbsp;<v-icon small left class="gold"> {{ xMy0[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{ xMy0[0] }}
                <v-btn v-if="xMy0[10].length == 0"
                class="orange accent-12 elevation-10"
                light
                small
                absolute
                bottom
                fab
                ripple
                @click="xMy0[10]=[AddEmptyItem()]"
                 ><v-icon small left>add</v-icon></v-btn>

                <ul class="elevation-18">
                <draggable v-model="xMy0[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                <li v-for="(xMy1, i1) in xMy0[10]" :key="'x'+i1"  >
                  <span v-if="xMy1[10].length == 0 &&  xMy1[9]=='Group' " style='display:none'>  {{ xMy1[10] = [] }}{{ xMy1[10]=[AddEmptyItem()]}}</span>
                  <div v-if="xMy1[10].length>0" class="g1 elevation-18">

                    1.&nbsp;<v-icon small left>{{ xMy1[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy1[0]}}
                  <ul class="elevation-15">
                  <draggable v-model="xMy1[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                  <li v-for="(xMy2, i2) in xMy1[10]" :key="'x'+i2"  >
                    <span v-if="xMy2[10].length == 0 &&  xMy2[9]=='Group' " style='display:none'>  {{ xMy2[10] = [] }}{{ xMy2[10]=[AddEmptyItem()]}}</span>
                    <div v-if="xMy2[10].length>0" class="g2 elevation-15">

                      2.&nbsp;<v-icon small left>{{ xMy2[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy2[0]}}
                      <ul class="elevation-12">
                      <draggable v-model="xMy2[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                      <li v-for="(xMy3, i3) in xMy2[10]" :key="'x'+i3"  >
                        <span v-if="xMy3[10].length == 0 &&  xMy3[9]=='Group' " style='display:none'>  {{ xMy3[10] = [] }}{{ xMy3[10]=[AddEmptyItem()]}}</span>
                        <div v-if="xMy3[10].length>0" class="g3 elevation-12">
                          3.&nbsp;<v-icon small left>{{ xMy3[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy3[0]}}
                          <ul class="elevation-9">
                          <draggable v-model="xMy3[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                          <li v-for="(xMy4, i4) in xMy3[10]" :key="'x'+i4"  >
                            <span v-if="xMy4[10].length == 0 &&  xMy4[9]=='Group' " style='display:none'>  {{ xMy4[10] = [] }}{{ xMy4[10]=[AddEmptyItem()]}}</span>
                            <div v-if="xMy4[10].length>0" class="g4 elevation-9">
                                4.&nbsp;<v-icon small left>{{ xMy4[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy4[0]}}
                              <ul class="elevation-6">
                              <draggable v-model="xMy4[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                              <li v-for="(xMy5, i5) in xMy4[10]" :key="'x'+i5"  >
                                <span v-if="xMy5[10].length == 0 &&  xMy5[9]=='Group' " style='display:none'>  {{ xMy5[10] = [] }}{{ xMy5[10]=[AddEmptyItem()]}}</span>
                                <div v-if="xMy5[10].length>0" class="g5 elevation-6">
                                    5.&nbsp;<v-icon small left>{{ xMy5[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy5[0]}}
                                    <ul class="elevation-3">
                                    <draggable v-model="xMy5[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                    <li v-for="(xMy6, i6) in xMy5[10]" :key="'x'+i6"  >
                                      <span v-if="xMy6[10].length == 0 &&  xMy6[9]=='Group' " style='display:none'>  {{ xMy6[10] = [] }}{{ xMy6[10]=[AddEmptyItem()]}}</span>
                                      <div v-if="xMy6[10].length>0" class="g6 elevation-3">

                                        6.&nbsp;<v-icon small left>{{ xMy6[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy6[0]}}
                                          <ul class="elevation-0">
                                          <draggable v-model="xMy6[10]"  :options="{group: 'people'}" @start="drag=true" @end="drag=false" :move="chooseItem" >
                                          <li v-for="(xMy7, i7) in xMy6[10]" :key="'x'+i7"  >
                                            <span v-if="xMy7[10].length == 0 &&  xMy7[9]=='Group' " style='display:none'>  {{ xMy7[10] = [] }}{{ xMy7[10]=[AddEmptyItem()]}}</span>
                                            <div v-if="xMy7[10].length>0" class="g7 elevation-0" >

                                              7.&nbsp;<v-icon small left>{{ xMy7[1] }}</v-icon>&nbsp;&nbsp;&nbsp;{{xMy7[0]}}
                                            </div>
                                            <div v-else-if="i7 == 0  ||  xMy7.length<=1 || xMy7[0]!=='Aplikace'" class="i7 elevation-0"
                                            v-bind:class="{JsemVidet: search <' ' || xMy7[0].replace(RegExp(search,'i'),'')!==xMy7[0], NejsemVidet:  search >' ' && xMy7[0].replace(RegExp(search,'i'),'')==xMy7[0]}"
                                            >
                                              7 i - {{i7+1}}
                                              i - {{xMy7[0]}} <v-icon small left>{{ xMy7[1] }}</v-icon>
                                            </div>
                                          </li>
                                          </draggable>
                                          </ul>
                                      </div>
                                      <div v-else-if="i6 == 0  ||  xMy6.length<=1 || xMy6[0]!=='Aplikace'" class="i6 elevation-3"
                                      v-bind:class="{JsemVidet: search <' ' || xMy6[0].replace(RegExp(search,'i'),'')!==xMy6[0], NejsemVidet:  search >' ' && xMy6[0].replace(RegExp(search,'i'),'')==xMy6[0]}"
                                      >
                                        6 i - {{i6+1}}
                                        i - {{xMy6[0]}} <v-icon small left>{{ xMy6[1] }}</v-icon>
                                      </div>
                                    </li>
                                    </draggable>
                                    </ul>
                                </div>
                                <div v-else-if="i5 == 0 ||   xMy5.length<=1 || xMy5[0]!=='Aplikace'" class="i5 elevation-5"
                                v-bind:class="{JsemVidet: search <' ' || xMy5[0].replace(RegExp(search,'i'),'')!==xMy5[0], NejsemVidet:  search >' ' && xMy5[0].replace(RegExp(search,'i'),'')==xMy5[0]}"
                                >
                                  5 i - {{i5+1}}
                                  i - {{xMy5[0]}} <v-icon small left>{{ xMy5[1] }}</v-icon>
                                </div>
                              </li>
                              </draggable>
                              </ul>
                            </div>
                            <div v-else-if="i4 == 0 ||   xMy4.length<=1 || xMy4[0]!=='Aplikace'" class="i4 elevation-8"
                            v-bind:class="{JsemVidet: search <' ' || xMy4[0].replace(RegExp(search,'i'),'')!==xMy4[0], NejsemVidet:  search >' ' && xMy4[0].replace(RegExp(search,'i'),'')==xMy4[0]}"
                            >
                              4 i - {{i4+1}}
                              {{i4}} - {{xMy4[0]}} <v-icon small left>{{ xMy4[1] }}</v-icon>
                            </div>
                          </li>
                          </draggable>
                          </ul>
                        </div>
                        <div v-else-if="i3 == 0 ||  xMy3.length<=1 || xMy3[0]!=='Aplikace'" class="i3 elevation-11"
                        v-bind:class="{JsemVidet: search <' ' || xMy3[0].replace(RegExp(search,'i'),'')!==xMy3[0], NejsemVidet:  search >' ' && xMy3[0].replace(RegExp(search,'i'),'')==xMy3[0]}"
                        >
                          3 i - {{i3+1}}
                          i - {{xMy3[0]}} <v-icon small left>{{ xMy3[1] }}</v-icon>
                        </div>
                      </li>
                      </draggable>
                      </ul>

                    </div>
                    <div v-else-if="i2 == 0 ||  xMy2[0]!=='Aplikace'" class="i2 elevation-14"
                    v-bind:class="{JsemVidet: search <' ' || xMy2[0].replace(RegExp(search,'i'),'')!==xMy2[0], NejsemVidet:  search >' ' && xMy2[0].replace(RegExp(search,'i'),'')==xMy2[0]}"
                    >
                      2 i - {{i2+1}}
                      i - {{xMy2[0]}} <v-icon small left>{{ xMy2[1] }}</v-icon>
                    </div>
                  </li>
                  </draggable>
                  </ul>

                  </div>
                  <div v-else-if="i1 == 0 || xMy1[0]!=='Aplikace'" class="i1 elevation-17"
                  v-bind:class="{JsemVidet: search <' ' || xMy1[0].replace(RegExp(search,'i'),'')!==xMy1[0], NejsemVidet:  search >' ' && xMy1[0].replace(RegExp(search,'i'),'')==xMy1[0]}"
                  >
                    1 i - {{i1+1}}
                    i - {{xMy1[0]}} <v-icon small left>{{ xMy1[1] }}</v-icon>
                  </div>
                </li>
                </draggable>
                </ul>

              </div>
              <div v-else-if=" true || xMy0[0]!=='Aplikace'" class="i0 elevation-20"
                v-bind:class="{JsemVidet: search <' ' || xMy0[0].replace(RegExp(search,'i'),'')!==xMy0[0], NejsemVidet:  search >' ' && xMy0[0].replace(RegExp(search,'i'),'')==xMy0[0]}"
              >
                i - {{i0+1}}
                i - {{xMy0[0]}} <v-icon small left>{{ xMy0[1] }}</v-icon>

              </div>
            </li>
            </draggable>
         </ul>
        </el-col>


          <el-col :span="5">
          <draggable v-if="tableShow.length>0 " v-model="tableShow"  :options="{group:{ name:'peopleGroup',  pull:'clone'  }}"
          @start="drag=true" @end="drag=false" :move="chooseItem" >

        <div style="max-height:80%;overflow:scroll" v-bind:class="{Makam: IsWaiting}">

          <el-col :span=24 v-for="(element,iii) in tableShow" :key="iii" class="people pa-0 teal elevation-20" :id="'a' + iii"
            style="margin-top :1px;text-align:left"
          >
          <!-- <el-tooltip  placement="bottom" effect="light">
            <div slot="content">{{ element.popis}}</div> -->
             <button    class="yellow" size="mini" style="width:10%" @click="showUsers(element.idefix)" ><i class="el-icon-question"></i></button>
             <button :disabled="IsWaiting" style="width:50%;text-align:left" @click="setMenu(element.id)">{{ element.nazev}}</button>

            <!-- </el-tooltip> -->
             <button :disabled="IsWaiting" v-if="SelectedId == element.id" style="width:15%" class="info"  @click="EditMenu(element.id)" ><i class="el-icon-edit"></i></icon></button>
             <button :disabled="IsWaiting" v-if="SelectedId == element.id" style="width:15%" class="warning" @click="onSubmitDelete" ><i class="el-icon-delete"></i></button>

          </el-col>
          </div>
          </draggable>

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
      <el-card v-if="Error==''" class="green">
        <el-col :span="4"><v-icon v-if="form.Ikona >''" color="red">{{form.Ikona}}</v-icon></el-col>
        <el-col :span="8" v-if="Error==''">
         Menu {{IsNewMenu?'Nove  ': 'Uprava menu ' + form.Nazev }}

        </el-col>

      </el-card>
      <el-card v-if="Error>''" class="error">
        <el-col :span="4"><v-icon v-if="form.Ikona >''" color="red">{{form.Ikona}}</v-icon></el-col>
        <el-col :span="20" v-if="Error>''" class="error">
         {{ Error }}

        </el-col>
      </el-card>
      </span>
  <span>

<v-form ref="form" :model="form" label-width="0px">
  <el-row :gutter="0">
   <el-col :span="20">
<v-text-field
            label="Nazev"
            hint="Nazev  modulu v menu"
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
    <el-button v-if="!IsNewMenu" type="primary" @click="onSubmitEdit" size="mini" style="width:100%" >{{ IsNewMenu? 'Vytvorit':'Ulozit'}}</el-button>
    <el-button v-if="IsNewMenu"  type="primary" @click="onSubmit" size="mini" style="width:100%" >{{ IsNewMenu? 'Vytvorit':'Ulozit'}}</el-button>
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
import { mapState } from 'vuex'
import { eventBus } from '@/main.js'
import ListMenuSchemaService from '@/services/ListMenuSchemaService'
export default {
  props:  {
    xMenuy: {
      type: Array,
      required: false
    }
  },
  data: () => {
      return {
      nI: {} ,
      nWait: 0,
        search:'',
        IsNewMenu: false,
        IsWaiting: false,
        Error:'',
        centerDialogVisible: false,
        tableData: [],
        tableShow: [],
        tableSend: [],
        SelectedId: 0,

        form : {
          Nazev: '',
          Popis: '',
          id: 0
        },
        NazevRules: [
        v => !!v || 'Jmeno je vyzadovano',
        // v => v.length <= 10 || 'Name must be less than 10 characters'
        ],

         xMenuy1: [],
         StoreInfo: ''
        }
  },
  watch: {
    tableData:  function(item) {
      this.tableSend=[]
      this.tableShow=[]
      this.tableSend.push({idefix:-1 , Nazev: 'Nevybráno'})
      this.tableData.forEach(element => {
        this.tableShow.push(element)
        this.tableSend.push({idefix: element.idefix, Nazev: element.nazev })
      });
      eventBus.$emit('Menus', this.tableSend )
       console.log('Zmena dat' + this.tableSend)
    },
    SelectedId: function(id) {

      eventBus.$emit('UsedInMenu', this.SelectedId )
    }
  },
    mounted () {
      if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'login'
      })
      }
       this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))
       try {
         ListMenuSchemaService.all(this.user, 'Col')
         .then( res => {
            if (res.data.info == 0) {
              alert('data nejsou '+ JSON.stringify( res.data.info ))
            } else {
              // alert('data Jsou '+ JSON.stringify( res.data.info ))
              this.tableSend=[]
              this.tableData = res.data.data
              this.tableData.forEach(element => {
              this.tableShow.push(element)
              this.tableSend.push({idefix: element.idefix, Nazev: element.nazev })
              });
              eventBus.$emit('Menus', this.tableSend )
            }
         })
      } catch (e) {
        this.error = e
      }
     // eventBus.$emit('UsedInMenu', id )
   },
   computed: {
      ...mapState([
       'xMenuMain',
       'isUserLoggedIn',
       'user'
     ])
   },
  methods: {
    showUsers(idefix) {

       eventBus.$emit('showUsers', {'idefix': idefix*1, 'searchInfo': 'menu'} )

     },
    onSubmit() {

      console.log(this.form)
      this.Error=''
      ListMenuSchemaService.init(this.user,this.xMenuy1, this.form.Nazev, this.form.Popis)
      .then (res => {
        ListMenuSchemaService.all(this.user,'Col')
               .then (res => {
                 this.tableShow = []
                 this.tableData = res.data.data
                 this.nWait = 100
                 this.IsWaiting=false
               })
      })
      .catch((e) => {
        alert('Uprava menu - doslo k chybam : '+ e)
      })



    },
    onSubmitCopy() {

    },

    onSubmitDelete () {
      this.Error=''
      this.IsWaiting = true
            this.nWait=1
      this.nI = setInterval(() => {
        if (this.nWait > 200) {
          return (this.nWait = 0)
        }
        this.nWait += 15
      }, 100)
      ListMenuSchemaService.delete(this.user,this.SelectedId)
      .then( res=> {
          this.tableShow = []
          this.tableData = res.data.data

      })
      .then(res => {
        this.IsWaiting = false
      })

    },

    async onSubmitEdit () {
      this.Error=''
    //  this.IsWaiting = true
      //      this.nWait=1
      this.nI = setInterval(() => {
        if (this.nWait > 200) {
          return (this.nWait = 0)
        }
        this.nWait += 15
      }, 100)
      this.form.id = this.SelectedId
      //alert('0000')
      await ListMenuSchemaService.update(this.user, this.form, this.xMenuy1 )
      .then( res=> {
          this.tableShow = []
          this.tableData = res.data.data
          this.IsWaiting = false
          this.centerDialogVisible = false
      })
      .then(res => {
        eventBus.$emit('UsedInMenu', this.form.id )
      })
      .catch ((e)=>{
        console.log('hovono prdel sracka', JSON.stringify(e.response.data.error))
        this.Error = JSON.stringify(e.response.data.error)
      }
      )
    },
    async setMenu(id) {
      this.SelectedId= id
      this.IsWaiting = true


      try {
         await ListMenuSchemaService.all(this.user, id)
         .then( res => {
            if (res.data.info == 0) {
              alert('data nejsou '+ JSON.stringify( res.data.info ))
            } else {
              // alert('data Jsou '+ JSON.stringify( res.data.info ))
              this.IsWaiting = false
              this.form.id = res.data.data[0].id
              this.form.Nazev = res.data.data[0].nazev
              this.form.Popis = res.data.data[0].popis
              this.xMenuy1 = JSON.parse(JSON.stringify(res.data.data[0].items))

              this.$store.dispatch('setMenuMain',this.xMenuy1)
              this.$store.commit('SETMENUMAIN',this.xMenuy1)
              this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))

              // this.$store.dispatch('setMenuMain',this.xMenuy1)
              //this.$store.commit('SETMENUMAIN',this.xMenuy1)

              //this.tableData = res.data.data
            }
         })
      } catch (e) {
        this.error = e
      }


    },


    jarda: function(xpar){
      var aneco = []
      eventBus.$emit('Alert', 'Schema' )
      return xpar
    },

    async EditMenu (id) {
      this.Error=''
      this.IsNewMenu = false
      this.centerDialogVisible = true
    },
    SaveMenu() {
      this.$store.dispatch('setMenuMain',this.xMenuy1)
      this.$store.commit('SETMENUMAIN',this.xMenuy1)
      this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))
      this.centerDialogVisible = true
      this.IsNewMenu = true

    },
    StoreInfo0: function ()  {
      //alert(this.$store.state.xMenuMain.join('~'))
      this.StoreInfo = this.$store.state.xMenuMain.join('~')
      // return this.$store.state.xMenuMain.join('~')

    },

    ResetMenu() {
      this.$store.dispatch('setMenuMain',null)
      this.xMenuy1 = JSON.parse(JSON.stringify(this.$store.state.xMenuMain))

    },
    ResetWindows() {
      this.$store.dispatch('dropAllWin')
    },

    chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
  AddEmptyItem: function () {
      var aEmpty2 = Array(11)
      aEmpty2[0] = 'Aplikace'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Item'
      aEmpty2[10] = []
      return aEmpty2;
    },
    AddEmptyItemG: function () {
      var aEmpty2 = Array(11)
      aEmpty2[0] = 'Groupina'
      aEmpty2[1] = 'home'
      aEmpty2[3] = 'Spoustec'
      aEmpty2[8] = 'right'
      aEmpty2[9] = 'Group'
      aEmpty2[10] = [this.AddEmptyItem()]
      return aEmpty2;




    }


  },
  created () {
    setTimeout(function() {
     document.getElementById("m003").style.height=Math.round(window.innerHeight - 210)  + "px"
    },100)
    window.addEventListener('resize', (function() {
     document.getElementById("m003").style.height=Math.round(window.innerHeight - 210)  + "px"
    })
  )

  }



}
</script>
<style scoped>
  li  {
    list-style: none;
    border-color: white;
  }
  .g0 {
  background: #1B5E20;
  padding-left: 0px;
  margin: 2px;
  color: white;

}
.i0 {
  /* background: #81C784; */
  background: #3099f1;
  border-right: solid 1px;
  padding-left: 5px;

  color: black;
}
.g1 {
  background: #00838F;
  padding-left: 10px;
  margin: 2px;
  color: black;
}
.i1 {
  background: #80DEEA;
  border-right: solid 1px;
  padding-left: 15px;
  color: black;
}
.g2 {
  background: #827717;
  padding-left: 20px;
  margin: 2px;
}
.i2 {
  background: #D4E157;
  border-right: solid 1px;
  padding-left: 25px;

}
.g3 {
  background: #F57F17;
  padding-left: 30px;
  margin: 2px;
}
.i3 {
  background: #FFEE58;
  border-right: solid 1px;
  padding-left: 35px;
}
.g4 {
  background: #6D4C41;
  padding-left: 40px;
  margin: 2px;
}
.i4 {
  background: #8D6E63;
  border-right: solid 1px;
  padding-left: 45px;
}
.g4 {
  background: #CFD8DC;
  padding-left: 50px;
  margin: 2px;
}
.i4 {
  background: #8D6E63;
  border-right: solid 1px;
  padding-left: -55px;
}
.g5 {
  background: #5E35B1;
  padding-left: 60px;
  margin: 2px;
}
.i5 {
  background: #B39DDB;
  border-right: solid 1px;
  padding-left: 65px;
}

.g6 {
  background: #3949AB;
  padding-left: 60px;
  margin: 2px;
}
.i6 {
  background: #C5CAE9;
  border-right: solid 1px;
  padding-left: 65px;

}
.g7 {
  background: #4FC3F7;
  padding-left: 60px;
  margin: 2px;
}
.i7 {
  background: #80D8FF;
  border-right: solid 1px;
  padding-left: 65px;

}

div {
  border-color: white;
  border-radius: 0px;
  margin: 1px;
  margin-top :1px;
  font-size: 14px;


}
li {
  text-align: left;
  list-style: none;
  cursor: pointer;
}
._left {
  left: 0px;
}
._right {
  right: 0px;
}

</style>
