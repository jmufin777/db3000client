<template>
<el-row :id="'m'+objId1" :style="'overflow:scroll;min-height:'+thisHeight+'px'"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>


<div style="height:100%;overflow:scroll;text-align:left;width:100%" class="mt-0 px-2 white" :id="'t' + objId1" ref="sirka">

  <el-col :span="4" style="text-align:left;top:-30px" class="mx-1 mt-0 ">


 <!-- <el-col :span="12" :offset="0" style="margin-top:5px;padding-left:10px" > -->

 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Stroje"  name="S"><el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchS" placeholder="Stroje" @change="addWhere"></el-input></el-tab-pane>

 </el-tabs>
 </el-col>


<v-spacer></v-spacer><br>
  <el-col :span="7" class="mx-1 mt-4" style="position:relative;top:9px;">

  <el-select v-model="search_nazev_text"
            filterable
            multiple

            default-first-option
            @change="addWhere"
            placeholder="Nazev technologie"

            style="width:90%;"
            size="mini">
            <el-option
            v-for="item8 in enum_nazev_text"
            :key="item8.value"
            :label="item8.value"
            :value="item8.value"
            >{{item8.value}} </el-option>
  </el-select>
  </el-col>

  <el-col :span="7" class="mx-1 mt-4" style="position:relative;top:9px">
  <el-select v-model="search_strojskup"
            filterable
            multiple

            default-first-option
            @change="addWhere"
            placeholder="Skupina stroju"

            style="width:90%;"
            size="mini">
            <el-option
            v-for="item9 in enum_strojskup"
            :key="item9.idefix*1"
            :label="item9.nazev"
            :value="item9.idefix*1"
            >{{item9.nazev}} </el-option>
  </el-select>
  </el-col>

 <!-- </el-col> -->

  <div>
        <!-- <div  ref="seznam"  class="grid-content" style="height:500px"> -->
<!-- <ta-ble3  :h="pof(Sirka,99)" :Sirka="1000" :Leva="'10%'" :Prava="'5%'" :Stred="'90%'" :TopA="'top:50px'" :TopB="'height:50px'"> -->
<ta-ble3  :h="'660px;'+pof(Sirka,99)+';top:100px'" style="height:690px" :Sirka="1000" :Leva="'10%'" :Prava="'5%'" :Stred="'90%'" :TopA="'top:50px'" :TopB="'height:50px'">
   <table slot="head" :style="pof(Sirka*SirkaStred,100)">
        <thead  style="height:50px" >


<th :style="pof(Sirka*SirkaStred,15)">
  <i  @click="sortByKey('nazev','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('nazev','asc')"  class="el-icon-download"  ></i>

  Stroj</th>
<th :style="pof(Sirka*SirkaStred,15)">
  <i  @click="sortByKey('nazev_skup','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('nazev_skup','asc')" class="el-icon-download"  ></i>
  Skupina</th>
<th :style="pof(Sirka*SirkaStred,10)">
  <i  @click="sortByKey('nazev_text','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('nazev_text','asc')" class="el-icon-download"  ></i>
  Technologie</th>
<th :style="pof(Sirka*SirkaStred,6)">
  <i  @click="sortByKey('typ_kalkulace','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('typ_kalkulace','asc')" class="el-icon-download"  ></i>

  Kalkulace</th>
  <th :style="pof(Sirka*SirkaStred,5)">    <!--51 //-->
  <i  @click="sortByKey('tisk','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('tisk','asc')" class="el-icon-download"  ></i>

    Tisk</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">priprava cas minuta</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">Priprava celkem naklad</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">priprava celkem prodej</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">sirka mat<br> max mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">delka mat<br>max mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">sirka tisk<br>max mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">delka tisk<br>max mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">tech okraj<br>strana mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">tech okraj<br>start mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">tech okraj<br>spacecopy mm</th>
<th :style="pof(Sirka*SirkaStred,4)" style="font-size:80%">tech okraj<br>spacejobs mm</th>
<th :style="pof(Sirka*SirkaStred,5)" style="font-size:80%">&nbsp;</th>

  </thead>
</table>

<table slot="body" :style="pof(Sirka*SirkaStred,100)">

<tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="lastsub(irow1) || islastclick(item1['idefix_matsubskup']) || true"

        :id="'RadekS_' + irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID"
        :ref="'RadekS_' + _max(irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID)"
        @dblclick="editLineToForm(irow1)"
        title="Dvojklik"
        style="cursor:pointer"
>


  <td  :style="pof(Sirka*SirkaStred,15)" class="pl-2">
    {{item1['nazev']}}
  </td>
  <td  :style="pof(Sirka*SirkaStred,15)+';text-align:left'" class="px-2">
    {{item1['nazev_skup']}}
  </td>
    <td  :style="pof(Sirka*SirkaStred,10)+';text-align:left'" class="px-2">
    {{item1['nazev_text']}}
  </td>
    <td  :style="pof(Sirka*SirkaStred,6)+';text-align:left'" class="px-2">
    {{ item1['typ_kalkulace'] }}
  </td>
  <td :style="pof(Sirka*SirkaStred,5)" class="stred">
        {{item1['tisk']?'Ano':'Ne'}}
  </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['priprava_cas_minuta']}}</td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['priprava_celkem_naklad']}}</td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['priprava_celkem_prodej']}}</td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['sirka_mat_max_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['delka_mat_max_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['sirka_tisk_max_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['delka_tisk_max_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['tech_okraj_strana_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['tech_okraj_start_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['tech_okraj_spacecopy_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,4)" class="prava pr-2">{{ item1['tech_okraj_spacejobs_mm'] }} </td>
<td :style="pof(Sirka*SirkaStred,5)" class="prava pr-2">&nbsp;</td>
      <!-- item1['technologie']: item1['technologie_skup'] -->
 <!-- <td :style="pof(sirka*SirkaStred,5)" style="font-size:80%">&nbsp;</td>
  <td :style="pof(sirka*SirkaStred,5)" style="font-size:80%">&nbsp;</td> -->


</tr>
</table>
<table slot="headl" :style="pof(Sirka*SirkaLeva,100)">
        <thead  style="height:50px" >

<th :style="pof(Sirka*SirkaLeva,99)+';height:50px'">
&nbsp;<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" ></el-checkbox>
&nbsp;&nbsp;&nbsp;&nbsp;<v-menu
      v-model="showSubMenu"
      absolute
      offset-y
      style="max-width: 3600px;text-align:left"
     >
     <span slot="activator" class="blue--text">Akce</span>
    <v-list>
        <v-list-tile
          v-for="(item, index) in SubMemuItems"
          :key="index"
          @click="handleSubMenu(item.akce)"
        >
      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
    </v-menu>

</th>

<!-- <th :style="pof(Sirka*SirkaLeva,0.3)"> -->






  </thead>
</table>

<table slot="bodyl" :style="pof(Sirka*SirkaLeva,100)">

<tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="lastsub(irow1) || islastclick(item1['idefix_matsubskup']) || true"
:id="'RadekL_' + irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID"
:ref="'RadekL_' + _max(irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID) "
>
  <td :style="pof(Sirka*SirkaLeva,100)"  class="bila" style="border-bottom: solid 1px #E3F2FD; ">
  <div class='dcellx mx-1 bila'  style="width:10% ; background:white;float:left" >
  <input style="height:14px;width:14px" type="checkbox" :id="'check_'+objId1+'_'+item1['idefix']" :value="item1['idefix']" @change="chekListUpdate(irow1)">
  </div>
  <div class='dcellx bila'  style="width:80% ; background:white;float:right"
    v-bind:class="{bila: irow1 % 2 ==0 , bila:  irow1 % 2 >0}"
  >
     <!-- <el-tooltip  placement="left-start" effect="light">
      <div slot="content">{{ item1['popis'] }}</div>
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="showPopis(irow1)" ><i class="el-icon-question" size="mini"></i></button>
     </el-tooltip> -->
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="copyLineToForm(irow1)" ><i class="el-icon-document" size="mini"></i></button>
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="editLineToForm(irow1)" ><i class="el-icon-edit" size="mini"></i></button>
   </div>
   <!-- <el-checkbox :id="'check2_'+objId1+'_'+item1['idefix']" :label="item1['idefix']">{{item1['idefix']}}</el-checkbox> -->
  </td>
<!-- <td :style="pof(Sirka*SirkaLeva,0.3)"> -->




</tr>
</table>

<!---Prava //-->
 <table slot="headr" :style="pof(Sirka*SirkaPrava,100)">
        <thead  >

<th :style="pof(Sirka*SirkaPrava,100)+';height:50px'" >Vymazat</th>
  </thead>
</table>

<table slot="bodyr" :style="pof(Sirka*SirkaPrava,100)">

<tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="lastsub(irow1) || islastclick(item1['idefix_matsubskup']) || true"
:id="'RadekR_' + irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID"
:ref="'RadekR_' + _max(irow1+''+ item1.idefix + '' + item1.idefix+ '' + '' + list.length +''+ID)"


>

      <!-- item1['technologie']: item1['technologie_skup'] -->
  <td :style="pof(Sirka*SirkaPrava,100)" class="bila stred" style="border-bottom: solid 1px #E3F2FD; ">
     <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow1)" ><i class="el-icon-delete" size="mini"></i></button>
  </td>


</tr>
</table>

</ta-ble3>
 <!-- </div> -->








<!-- </el-checkbox-group> -->
<!-- <my-table :list="list"></my-table> -->



<list-stroj-edit  v-if="IsDialog"></list-stroj-edit>

  </div>
  </div>
    <dia-log :title="nadpisInfo" :show="IsShowPopis" v-if="IsShowPopis"><div slot="title2">{{popisInfo}}</div>
     <v-btn slot="tlacitko"
            color="primary"
            flat
            @click="IsShowPopis = false"
          >
            OK
          </v-btn>
  </dia-log>

  <!-- <hr> -->
 <div>

  <!-- <win-dow :title="'events'" :id="`events`"
    :x="200"
    :w="700"
    :y="100"
    :z="90"
    :h="351"
    :parent="false"
    :maximize="false"
    >
  i: {{ list }}
  </win-dow> -->



</div>

</el-col>
</el-row>

</template>

<script>
const listOptions = [4728];
const self = this

import { mapState } from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval, clearTimeout } from 'timers'
import ListStroj from '../services/ListStrojService'
import ListStrojEdit from './ListStrojEdit'

import f from '@/services/fce'

// import List2StrojSkupVue from './List2MatSubSkup.vue';


export default {
  props: ['visible'],
  components: {
    'list-stroj-edit': ListStrojEdit
  },
  data () {
    return {
      moduleName: 'list-stroj',
      saveNow: false,
      show: true,

      IsDialog: false,
      SendName: "NIC",

      IsWaiting: false,
      info:'',
      search:'',
      searchS:'',
      thisHeight: 800,

      lastClick: [],
      allTrue: false, //pokud se vyplni prohledavaci pole , bude true = tedy skupiny materialu se nebudou omezovat

      objId1: '8210',
      objId2: '8220',
      objSearchBar: 'search_8210',

      aInfo: [],
      total: 0,
      pagination: {},
      activeName:'S',
      activeNameLast:'',
      where: 'true' ,

      //Popisek materialu
      IsShowPopis: false,
      popisInfo: 'Ne',
      nadpisInfo: 'Ne',
      //Moje tabule a data
      currId: null,
      currentRow: null,
      currentOrigValue: null,
      lastSubSkup:'' , // pro vykreslovani - zmena subskup
      lastId: '',
      enum_strojskup: [],
      enum_nazev_text: [],

      search_nazev_text: [],
      search_strojskup: [],

      minId: 0, //Pro vklad zaporna ID

      list: [],
      //ChekBox
       checkAll: false,
       checkedList: [],
       //cities: cityOptions,
       isIndeterminate: true,
      //CheckBox
      //SubMenu
      showSubMenu: true,
      SubMemuItems: [
        { title:'Oznacit jako tiskove' ,akce: 'T1'},
        { title:'Zrusit jako tiskove' ,akce: 'T2'},
        { title:'Vymazat oznacene' ,akce: 'del'},

        ],


      lastSort: ['kod','asc'] , //Obsahuje hodnoty klic, smer, vychozi je id , asc,nebot toto je vsude
      timeout: false,
      Sirka : 0,
      SirkaLeva : 0.1,
      SirkaStred : 1.3,
      SirkaPrava : 0.05,
      LastColHeight: '',
      CitacHeight: 0,
      ID: 0,
      TestovaciCislo: 0 ,

    }

  },
  async mounted () {
    const self = this
    var tmp2
    self.ID = Math.round(Math.random() * 1987458)
    self.objId1+=''+self.ID
    self.objId2+=''+self.ID
    self.objSearchBar+=''+self.ID

    console.log('ahoj 3 - Testovaci Cislo ', ++this.TestovaciCislo , self.ID, self.objId1, self.objId2,self.objSearchBar)
    self.handleResize()



//    return
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
        await this.getWhere()
        await  this.getEnums()
         /*
              try {
                  tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,101,''))
                  self.enum_nazev_text = tmp2.data.enum_nazev_text
                  //alert(JSON.stringify(self.enum_nazev_text))
                } catch(e0){
                  alert(e0)
                }
               try {
                  var tmp3 =  ( await ListStroj.one(this.user,this.idefixThis ,10,''))
                  self.enum_strojskup = tmp3.data.enum_strojskup
  //                 alert(JSON.stringify(self.enum_strojskup))
                } catch(e1){
                  alert("Chyba Vyrobce "+ e1)
                }
           */
      //this.list = (await ListStroj.all(this.user,`${self.where}`)).data
      this.IsWaiting = false
        if (false) {
        setTimeout(() => {
          self.editLineToForm(6)
        }, 1600);

        }
        console.log("Interval")
    var interv =setInterval(function() {
       self.sirka("sirka")
       // self.TestovaciCislo++
//       alert(self.Sirka)
    },500)

    // return
    var objlist = []
/*
  setTimeout(function(){
    alert('aa')
      self.searchS="xxx"
      self.getWhere()
      setTimeout(function() {
         self.searchS=""
         self.getWhere()
      },120)
    },650)
   */
        return
    }
  },

  created () {
    const self=this
      eventBus.$off('dlg8210rec')
      eventBus.$on('dlg8210rec', ( dlgPar ) => {

        //self.getData()
       setTimeout(function() {
         self.getWhere()
         //alert('a')
       },1000)

       self.getEnums()

      })
    window.addEventListener('resize', self.handleResize)



  },
  beforeDestroy () {



  },
  destroyed () {


  },
  beforeUpdate () {

    // console.log('ahoj 2', ++this.TestovaciCislo )
  },
  beforeEnter: (to, from, next) => {
//    console.log('ahoj 1', ++this.TestovaciCislo )
  //  alert('a')
    // ...
  },


  watch: {

  },


methods: {
  handleResize () {
    this.thisHeight = f.wyska(0.88)
  },
async getEnums() {
  const self= this
  var tmp2, tmp3
   self.enum_nazev_text = []
   self.enum_strojskup  = []
    try {
       tmp2 =  ( await ListStroj.one(this.user,this.idefixThis ,101,''))
       self.enum_nazev_text = tmp2.data.enum_nazev_text

    } catch(e0){
       alert(e0)
    }
    try {
       var tmp3 =  ( await ListStroj.one(this.user,this.idefixThis ,10,''))
       self.enum_strojskup = tmp3.data.enum_strojskup

    } catch(e1){
       alert("Chyba Vyrobce "+ e1)
    }

},

lastsub(idx)   {
  var lret = false
  if (idx == 0) {
    return true
  }
  if (idx > 0 ) {
    if (this.list[idx]['podskupina'] == this.list[idx-1]['podskupina']) {
      return false
    }
  }
  return true
},
lastclick(idxsub)   {
  var lret = false
  var idx2 = -1
  const self = this
  //alert(idxsub)

  self.lastClick.forEach( (el,idx) => {
    if (el == idxsub){  //skupina
        lret = true
        idx2 = idx  ///Index pole
        return
    }

  })

  if (!lret){
        self.lastClick.push(idxsub)   //Vlozi index pskupiny

  } else {
        self.lastClick.splice(idx2,1) //Vymaze podskupinu dle indexu pole
  }

  return lret
},

islastclick(idxsub)   {
  var lret = false
  const self = this
  self.lastClick.forEach(el => {
    if (idxsub == el) {
      lret = true
      return
    }
  })

  return lret  || self.allTrue
},
handleCheckAllChange(val) {
  const self = this

  var neco=''
//console.log(self.list)
//return
  self.list.forEach((el,idx) => {
    neco='check_'+self.objId1+'_'+el['idefix']
    if (document.getElementById(neco)){
      if (val){
        document.getElementById(neco).checked=true
        self.checkedList.push(document.getElementById(neco).value)
      } else {
        document.getElementById(neco).checked=false
      }
    }
  })
        self.isIndeterminate = false;
        if (!val){
          self.checkedList=[];
        }
  return true;
},
handleUnCheckAllChange() {
  const self = this

  var neco=''

  this.list.forEach((el,idx) => {
    neco='check_'+self.objId1+'_'+el['idefix']
    if (document.getElementById(neco)){
        document.getElementById(neco).checked=false
    }
  })
  self.isIndeterminate = false;
  self.checkedList=[];

  return true;
},
chekListUpdate(idx) {
  const self = this


    var neco='check_'+self.objId1+'_'+self.list[idx]['idefix']
    var objneco

    if (document.getElementById(neco)){
        objneco = document.getElementById(neco)
        if (objneco.checked){
          self.checkedList.push(objneco.value)
        } else {

          self.checkedList.forEach((el, idx2) =>{
            if (el == self.list[idx]['idefix']){
              self.checkedList.splice(idx2,1)
              return
            }
          })
        }
    }

},

handleCheckedListChange(value) {   //je mi to asi na hovno zda se
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.list.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length;
},
async handleSubMenu(e) {
  const self = this

  if (e== 'del' && this.checkedList.length>0  && confirm('Vymazat oznacena zaznamy ?') ){

    //this.checkedList
    this.deleteLinesSelected()
  }  else if (e== 'T1') {
       if (confirm('Oznacit jako Tisk ?' )) {
      this.IsWaiting =true
      try {
      await this.checkedList.forEach(idefix => {
        var prd= (ListStroj.setTisk(self.user,idefix,'A'))


      });
      this.handleUnCheckAllChange()
      } catch (e) {
        console.log(e)
      }
      setTimeout(function() {
        self.getWhere()
        this.IsWaiting =false
      },1000)

    }
    //setTisk
  } else if (e== 'T2') {
      if (confirm('Zrusit oznaceni Tisk ?' )) {
      this.IsWaiting =true
      try {
      await this.checkedList.forEach(idefix => {
        var prd= (ListStroj.setTisk(self.user,idefix,'N'))
        self.getWhere()
      });
      this.handleUnCheckAllChange()
      } catch (e) {
        console.log(e)
      }
      setTimeout(function() {
        self.getWhere()
        this.IsWaiting =false
      },1000)

    }
    //setTisk
  }

  else {
   // alert("Neni zasrktnutu,nedelam nic")
  }

},

async    handleClick(tab, event) {
        const self = this
        self.handleUnCheckAllChange()
      if ((this.activeNameLast == this.activeName) == false) {
            this.getWhere()
      }

      //console.log(tab, event);
    },
async  addWhere() {
  const self = this

  if (self.activeName == 'S') {

    self.where = 'true'
  } else {
   alert('Neco jineho')
  }

  this.getWhere()

 } ,
 async getWhere (){
   const self= this
   var search = ''
   self.allTrue =false

    self.where = 'true'
    search = self.searchS

    self.where = ` true`



  var ctmp=''
  if (self.search_nazev_text.length>0){
    self.search_nazev_text.forEach(el=>{
      if (ctmp>'') ctmp+=','
      ctmp+=`'${el}'`
    })

//    ctmp=self.search_nazev_text.join(',')

    self.where += ` and nazev_text in ( ${ctmp} )`
    //alert(self.where)
  }
  if (self.search_strojskup.length>0){
    ctmp=self.search_strojskup.join(',')
    self.where += ` and idefix_strojskup in ( ${ctmp} )`
  }
  if (search > '') {
       self.where += ` and (a.nazev ~* '${search}' )`
       self.allTrue =true
  }

      this.IsWaiting = true

        this.list = (await ListStroj.all(this.user,self.where )).data
        if (!this.list.length){
          this.list=[]
        }
        this.IsWaiting = false
        // alert('jsem zde'+ list.data.stroj.length)


 },
editLine(nRow) {   //Dulezita.bez ni nejdou dialogy v editu
     const self = this
     self.IsDialog = true
     self.Info = nRow

     eventBus.$emit('dlg8210', {
           'IsDialog': self.IsDialog,
           'cols': self.cols,
           'record': self.list[nRow],
           'nRow': nRow
      })
   },

 showPopis(nRow) {
   const self = this
   this.popisInfo = this.list[nRow].popis
   this.IsShowPopis = true
   setTimeout(function(){
     self.IsShowPopis = false
   },12000)
   this.nadpisInfo = 'Informace o materialu'
   //alert(this.list[nRow].popis)
 },




copyLineToForm(nRow) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     self.IsDialog = true
     self.Info = nRow


    //alert('copy')
    if (self.timeout) {
      clearTimeout(self.timeout)
      self.timeout =false

     // alert('copy bezi')
      //return
    }

    self.timeout =  setTimeout(function() {
     eventBus.$emit('dlg8210', {
           'IsDialog': self.IsDialog,
           'Akce' : 'copy' ,
           'Idefix' :  self.list[nRow]["idefix"],
           'typ_kalkulace' :  self.list[nRow]["typ_kalkulace"],


      })
    },100)

     //alert(nRow+ self.list[nRow]["id"] + " Copy")
     //self.newLine(nRow)
   },
editLineToForm(nRow) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     self.IsDialog = true
     self.Info = nRow
     //alert('eeeee' + self.IsDialog )
     //alert(self.IsDialog)
     //self.SendName="AAAX "+Math.random()
     //alert(self.list[nRow])
     // alert('aaaa')
     if (self.timeout) {
      clearTimeout(self.timeout)
      self.timeout =false

     // alert('copy bezi')
      //return
    }
     self.timeout = setTimeout(function() {


     eventBus.$emit('dlg8210', {
           'IsDialog': self.IsDialog,
           'Akce' : 'edit' ,
           'Idefix' :  self.list[nRow]["idefix"],
           'typ_kalkulace' :  self.list[nRow]["typ_kalkulace"],
      })
     },100)

     //alert(nRow+ self.list[nRow]["id"] + " Copy")
     //self.newLine(nRow)
   },

   async saveLines(id){
     return
     this.aInfo=[]
     var Posli=Array()
     var  aTmp= {}
     var aDel= []
     var aZmenySend=[]

      this.listEdits.forEach((el)=>{
        //console.log(el[1])
        if (el[1]=='delete'){
          aDel.push(el[0].id)
        }
       if (el[1]=='edit'){
          aZmenySend.push(el[0].id)
        }
      })

     var isInsert=false
     this.list.forEach((el,idx) => {
       aTmp=Array()
       if (  (id <= 0 || (id != 0 && id == el.id ) ) && _.indexOf(aZmenySend,el.id)>-1 ) {
         if (el.id < 0 && el.kod >''){
           isInsert=true
         }
        aTmp.push({id: el.id
         ,kod : el.kod
         ,idefix_matskup : el.idefix_matskup
         ,idefix_matsubskup: el.idefix_matsubskup
         ,idefix_vyrobce: el.idefix_vyrobce
         ,nazev1: el.nazev1
         ,nazev2: el.nazev2
         ,nazev3: el.nazev3
         ,popis: el.popis
         ,idefix_dodavatel: el.idefix_dodavatel
         ,sila_mm: el.sila_mm
         ,vaha_gm2: el.vaha_gm2
         ,sirka_mm_zbytek: el.sirka_mm_zbytek
         ,vyska_mm_zbytek: el.vyska_mm_zbytek
         ,cena_nakup_m2: el.cena_nakup_m2
         ,koef_naklad: el.koef_naklad
         ,koef_prodej: el.koef_prodej
         ,cena_nakup_kg: el.cena_nakup_kg
         ,cena_nakup_arch: el.cena_nakup_arch
         ,cena_naklad_arch: el.cena_naklad_arch
         ,cena_naklad_m2: el.cena_naklad_m2
         ,cena_prodej_m2: el.cena_prodej_m2
         ,cena_prodej_arch: el.cena_prodej_arch

        })
        Posli.push(aTmp)
       }
     })

     await ListStroj.insert(this.user, {data: Posli, del: aDel })
     .then (res => {

     })
     .catch((e) =>{
       alert('Doslo k chybe pri kontrole databaze'+ e)

     })
     //return
      var neco = []

     try {
      //this.list = (await   ListStroj.all(this.user,'nic')).data
        getWhere()
        //alert(this.lastSort[0]+"/"+this.lastSort[1])
        if (this.lastSort[1]=='desc'){
           this.list = _.sortBy(this.list,this.lastSort[0]).reverse()
        } else {
          this.list = _.sortBy(this.list,this.lastSort[0])
        }

      if (isInsert == true ){
        this.list = _.sortBy(this.list,'id').reverse()

        ////
        var new_id ='c' + this.objId2 + '_r_'+0+'_c_'+1
              //alert(new_id)
        setTimeout(function(){
             var newObal= document.getElementById('d'+new_id.substring(1))
              this.isWrite =false
            //  document.getElementById(new_id).focus()
             // document.getElementById(new_id).click()
              document.getElementById(new_id).setAttribute('readonly',true)
              if (!document.getElementById(new_id).type == 'number') {
                document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
              }
            //setTimeout(function(){
              f.changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()
         },50)

        /////


      }
      if (id > -999999) {
        this.listEdits = []
      }


      //console.log("Prislo",neco)
     }
     catch(e) {
       alert('Chyba pri zmenach'+ e )
     }

   },
   async getData() {
     // alert('getData')
     try {
      //this.list = (await   ListStroj.all(this.user,'nic')).data

        self.getWhere()

        //alert(this.lastSort[0]+"/"+this.lastSort[1])
        if (this.lastSort[1]=='desc'){
           this.list = _.sortBy(this.list,this.lastSort[0]).reverse()
        } else {
          this.list = _.sortBy(this.list,this.lastSort[0])
        }
     } catch(e)  {
       console.log('Funkce getdata vratila chybu')
     }

   },
   sortByKey(ckey, ascdesc) {
     //alert('sort'+ ckey)
    if (ascdesc == 'asc') {
      this.list = _.sortBy(this.list,['nazev_skup', ckey])
        /*
        this.cols.forEach((el, k ) => {
          if (el.id==ckey){
            this.cols[k]["sort"]="asc"
            this.lastSort[0] =ckey
            this.lastSort[1] ="asc"
            return
          }
      })
      */
      //this.cols[ckey]['sort']="asc"
    }
    if (ascdesc == 'desc') {
      //this.list = _.sortBy(this.list,ckey).reverse()
      this.list = _.sortBy(this.list,['nazev_skup', ckey]).reverse()
        /*
        this.cols.forEach((el, k ) => {
          if (el.id==ckey){
            this.cols[k]["sort"]="desc"
            this.lastSort[0] =ckey
            this.lastSort[1] ="desc"
            return
          }
      })
      */

      //this.cols[id]['sort']="desc"
    }

   },

   async newLinex (nRow)  {
     var x
      const self = this
      this.listNewLine = []

      this.Max = (await ListStroj.all(this.user,'max')).data[0].kod*1 +10


      for(x in this.list[0]) {
          this.aInfo[x]=null
          this.listNewLine[x]=null
          if (nRow >0)    {
               this.listNewLine[x]= this.list[nRow][x]
          }
      }

          this.minId = this.minId -1
          this.listNewLine['id']= this.minId

          if (nRow >0)    {
            this.listNewLine['kod'] = this.list[nRow]['kod']
          } else {
            this.listNewLine['kod'] = this.Max + Math.abs(this.minId)
          }
          this.list.push(this.listNewLine)

        //  this.aInfo.push(this.Max)
          /*
          if (this.lastSort[1]=="asc") {
            this.list = _.sortBy(this.list,this.lastSort[0])
          } else {
            this.list = _.sortBy(this.list,this.lastSort[0]).reverse()
          }
          */

          var new_id=""
          this.list.forEach((el,idx) => {
            if  (el.id == this.minId){
              //var new_id = 'c'
              new_id ='c' + self.objId2 +'_r_'+idx+'_c_'+1
              return
              //alert(new_id)
            }
          })
          setTimeout(function(){
            document.getElementById(new_id).focus()
            document.getElementById(new_id).click()
            document.getElementById(new_id).removeAttribute('readonly')
            if (!document.getElementById(new_id).type.match(/select/g)){
              document.getElementById(new_id).select()
            }
         },100)
   },
   async deleteLine(nRow) {
     const self = this

    if (confirm('Vymazat kompletni stroj ? ' + self.list[nRow].idefix )) {
      this.IsWaiting =true


      var prd= (await ListStroj.delete(self.user,self.list[nRow].idefix))
        self.getWhere()
       //self.list = (await ListStroj.all(self.user,` ${where} `)).data
       this.IsWaiting =false
    }



   },

   async deleteLinesSelected() {
     const self = this

    // self.list[nRow].nazev1
    if (confirm('Vymazat kompletne oznacene stroje ? ' )) {
      this.IsWaiting =true
      await this.checkedList.forEach(idefix => {
        var prd= (ListStroj.delete(self.user,idefix))
        self.getWhere()
      });
      this.handleUnCheckAllChange()

       this.IsWaiting =false

       //self.list = (await ListStroj.all(self.user,` ${where} `)).data

    }



   },

   deleteLinex(nRow) {
     const self = this
    //  if (confirm('Vymazat zaznam? '+nRow + "  id:" +this.list[nRow].id )) {
    //    this.listEdits.push([this.list[nRow],'delete'])
    //    this.list.splice(nRow,1)
    //  }

    //  return

      var xId = this.list[nRow].id
      var tmpI = -1000000
     this.$confirm('Vymazat zaznam ' + this.list[nRow].id+"/"+this.list[nRow].kod+"/"+this.list[nRow].nazev1, '',{
       distinguishCancelAndClose: true,
       confirmButtonText: 'Ano?',
       cancelButtonText: 'Ne'
     })
     .then(()=>{
       var eof = false
       var top = false
       var next = false
       self.list.forEach((el,i)=>{
         if (xId == el.id){
           tmpI = i
           return
         }
       })

     if (self.list[tmpI].id>0){
       if (tmpI==this.list.length -1){
         eof = true
         //alert('Sup na konec')
       }
       if (nRow==0){
         top = true
         //alert('Sup na konec')
       }
       if (nRow>0 && nRow<this.list.length){
         next = true
         //alert('Sup na konec')
       }
       //self.listEdits.push([this.list[nRow],'delete'])

     }

     var new_id=""
      if (tmpI > -1000){
        self.listEdits.push([self.list[tmpI],'delete'])
        self.list.splice(tmpI,1)
        //return
       }
     //self.list.splice(nRow,1)
     if (eof == true) {
       new_id='c'+ self.objId2 +'_r_'+(self.list.length -1)+'_c_'+1
     }
     if (top == true) {
       new_id='c'+self.objId2+ '_r_'+(0)+'_c_'+1
     }

    if (next == true) {
       new_id='c'+self.objId2 + '_r_'+(nRow)+'_c_'+1
     }

        if (new_id > '')  {

            //alert(newObal + "/ " + new_id)

          setTimeout(function(){
            if (!document.getElementById(new_id)){
                // alert(new_id + 'neco je sptane' + eof + "top " + top + "next "+next )
                new_id='c'+self.objId2+ '_r_'+(self.list.length -1)+'_c_'+1
                if (!document.getElementById(new_id)){
                  // alert(new_id + 'neco je sptane 2 Sakris' + eof + "top " + top + "next "+next )
                } else {
                  // alert('Trefil jsem se')
                  setTimeout(function() {
                    self.isWrite =false
                    var newObal= document.getElementById('d'+new_id.substring(1))
                    document.getElementById(new_id).focus()
                    document.getElementById(new_id).setAttribute('readonly',true)

                   f.removeClass(document.getElementById(new_id),"bila2")
                   if (!document.getElementById(new_id).type == 'number') {
                     document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
                   }
                  f.changeClass(newObal,'dcell','dcell_edit')
                  document.getElementById(new_id).focus()

                  },100)


                }

                //new_id='c812_r_'+ (0) +'_c_'+1
            }


          },100)
         }


     })
     .catch( action =>{
       this.$message({
         type: 'info',
         message: 'Ponechano'

       })

     })
     //alert(nRow)
   },
   backLines(){
     var eDelka = this.listEdits.length -1
     var x
     var id = 0
     if (eDelka>-1){
//       this.aInfo.push(this.listEdits[eDelka][1])

       if (this.listEdits[eDelka][1] == 'delete'){
           this.list.push(this.listEdits[eDelka][0])
           this.list = _.sortBy(this.list,'id')
           this.listEdits.splice(eDelka,1)

           eDelka = this.listEdits.length -1
           return
       }

       if (this.listEdits[eDelka][1] == 'edit'){
         id = this.listEdits[eDelka][0].id
         this.list.forEach((el, k) => {
           if (el.id == id){
             this.list[k] = this.listEdits[eDelka][0]
             this.listEdits.splice(eDelka,1)
             this.aInfo.push(el.id)
             this.aInfo.push(this.list[k])
             return
           }

         })

       }

     }
   },

    obsluha (e) {
     f.obsluha2(e,  this)
   },

   currid (itemId, colid) {
       this.currId = itemId
       this.colId = colid
    },
    groupFind(element){
    var lRet = false
    var elstr=''
    var seekStr=['id', 'nazev1', 'nazev2','nazev3','user_insert']
    for ( var x  in element){
      if (seekStr.indexOf(x) >-1 )   elstr+= element[x]
    }

    if (this.search < ' ' ) {
      return true
    }
      if (this.search > ' ' &&
      (elstr).replace(RegExp(this.search,'i'),'')!==(elstr)
      ) {
        return true
      }
    },
    async my_data () {
      this.IsWaiting = true
      this.list = (await ListStroj.all(this.user,nic)).data
      this.total = this.list.length
      this.IsWaiting = false
    },
    deleteRow(index, rows) {
      if (confirm('Vymazat ?')){
        rows.splice(index, 1);
      }
      },

    Alert(txt) {
      alert(txt)

    },
    close () {

    },
    open () {

    },
    cancel () {

    },
    save () {

    },
    my_data1 () {
      console.log('my data 1')
    },


   _max(iporadi) {
      const self = this
      var neco1 = document.getElementById('RadekS_'+iporadi+'')
      var neco2 = document.getElementById('RadekL_'+iporadi+'')
      var neco3 = document.getElementById('RadekR_'+iporadi+'')
      var newH = ''
      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }


    setTimeout(function(){

      try {
        if (neco1 ) {
        newH = ''+Math.max(neco1.offsetHeight,neco2.offsetHeight,neco3.offsetHeight)+'px'

        neco1.style.height = newH
        neco2.style.height = newH
        neco3.style.height = newH
        }

      } catch (e) {
        console.log('Chybka','Poradi', iporadi,e)
        setTimeout(function() {
          self._max(iporadi)
        },500)

      }

      },100)
      //Math.max()
      return 47
    },

   pof(max, proc) {
      var neco = Math.round(max* proc/100) +''
      neco = `width:${neco}px`
      return neco

      //alert(neco)
    },
    _rand(iporadi) {
      var neco = iporadi + '_' +( Math.round(Math.random() *Math.random() * 100000000)) + ''
      return neco
      //console.log(neco)
    },
    sirka(ref) {
      const self= this
      var nret = 0
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          if (nret != self.Sirka) {
            self.Sirka = nret
            self.TestovaciCislo++
          }

          //alert(nret)
        } catch(e) {
          return 11
        }

        //alert(nret)
        //alert(self.$refs.seznam)
      }, 100)

      return nret
    },

  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'xMenuMain',
      'level',
      'idefix',
    ])

  }
}


</script>
<style scoped >
th {
  height:51px;
}

table tr:nth-child(odd) td{
  background:white;
  border-top:white;
  border-bottom:white;
}
table tr:nth-child(even) td{
  background: #E3F2FD;
  border-top:#E3F2FD;
  border-bottom:#E3F2FD;
}
</style>
