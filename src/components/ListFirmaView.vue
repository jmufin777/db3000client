
<template>
<el-row :id="'m'+objId1" :style="'overflow:scroll;min-height:'+thisHeight+'px'"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>



<div style="height:100%;overflow:scroll;text-align:left;width:100%" class="mt-0 px-2 white" :id="'t' + objId1" ref="sirka">

  <el-col :span="12" style="text-align:left;top:-30px" class="mx-1 mt-0 ">
     <!-- //AAAAAAAA {{ $route.params }} -->
 <!-- <el-col :span="12" :offset="0" style="margin-top:5px;padding-left:10px" > -->

 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Firmy"  name="F"><el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchF" placeholder="Vse" @change="addWhere"></el-input></el-tab-pane>
    <el-tab-pane label="Klienti"  name="K"><el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchK" placeholder="KLienti" @change="addWhere"></el-input></el-tab-pane>
    <el-tab-pane label="Dodavatele"  name="D"><el-input class="my-0" prefix-icon="el-icon-search"  style='width:80%' autofocus clearable size="mini" v-model="searchD" placeholder="Dodavatele" @change="addWhere"></el-input></el-tab-pane>

 </el-tabs>
 </el-col>


<v-spacer></v-spacer><br>


  <el-col :span="7" class="mx-1 mt-4" style="position:relative;top:9px">

  </el-col>

 <!-- </el-col> -->

  <div >

<ta-ble3  :h="'660px;'+pof(Sirka,99)+';top:80px'"  :Sirka="1000" :Leva="'8%'" :Prava="'6%'" :Stred="'90%'" :TopA="'top:58px'" :TopB="'height:58px'">
<table slot="head"  :style="pof(Sirka*SirkaStred,85)">
<!-- <ta-ble3 v-if="true"  :h="'650px;width:100%'" :stylet1="'width:800px'" :stylet2="'width:100%'" :autosize="true" > -->
 <thead >
   <tr>
<th  :style="pof(Sirka*SirkaStred,80)" class="stred grey--text" colspan="106" style="background:#ffffff;opacity:1;z-index:100000;border:none">

<span class="elevation-0 px-2 pt-1 pb-1 blue--text"> Strana </span>
   <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="Stranka=1"                 ><i class="el-icon-d-arrow-left" size="mini"></i></button>
   <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="Stranka=(Stranka>1)?Stranka - 1:1" ><i class="el-icon-arrow-left" size="mini"></i></button>


        <input type="number" v-model="Stranka" size="18"  @mouseup="Sirka--" @keyup="Sirka--"  @blur="Sirka--" :max="Math.ceil(list.length / Zobrazit)" :min="1" class="elevation-0 pr-0 tdl tdn prava" style="width:3em"

        >
        <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="StrankaNext()"                 ><i class="el-icon-arrow-right" size="mini"></i></button>
         <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="StrankaEnd()"                 ><i class="el-icon-d-arrow-right" size="mini"></i></button>


        <span class="elevation-0 pa-1 blue--text">Zobrazeno&nbsp;</span>
        <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="Zobrazit=(Zobrazit<list.length)?Zobrazit+1:list.length" ><i class="el-icon-arrow-up" size="mini"></i></button>
        <input type="number" v-model="Zobrazit" :min="1" :max="list.length"  @mouseup="Sirka--" @keyup="Sirka--"  @blur="Sirka--" @change="Stranka=1;setStrana()" size="6" class="prava elevation-0 pr-0 tdl tdn  " style="width:4em"

        >
        <button type="button" style="width:18px;height:18px;border:none" class="white blue--text px-0 cell" @click="Zobrazit=(Zobrazit>1)?Zobrazit-1:1" ><i class="el-icon-arrow-down" size="mini"></i></button>


  <span class="elevation-0 px-2 pt-1 pb-1 blue--text"> z  {{ list.length }} </span>


  <!-- <el-input-number v-model="Stranka" size="mini" @blur="Sirka--" :max="Math.ceil(list.length / Zobrazit)" :min="1"></el-input-number> -->
  <span class="elevation-0 px-2 pt-1 pb-1 blue--text"> z {{ Math.ceil(list.length / Zobrazit) }}</span>


</th>

</tr>
<tr >

<th  :style="pof(Sirka*SirkaStred,10)" class="stred">

  <i  @click="sortByKey('nazev_skup','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('nazev_skup','asc')" class="el-icon-download"  ></i>
  Ico

  </th>
<th  :style="pof(Sirka*SirkaStred,10)" class="stred">
  <i  @click="sortByKey('dic','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('dic','asc')" class="el-icon-download"  ></i>
  DIC</th>

<th  :style="pof(Sirka*SirkaStred,20)" class="stred">
  <i  @click="sortByKey('nazev','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('nazev','asc')" class="el-icon-download"  ></i>
  Nazev</th>

<th  :style="pof(Sirka*SirkaStred,20)" class="stred">
  <i  @click="sortByKey('ulice','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('ulice','asc')" class="el-icon-download"  ></i>
  Ulice</th>
<th  :style="pof(Sirka*SirkaStred,20)" class="stred">
  <i  @click="sortByKey('obec','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('obec','asc')" class="el-icon-download"  ></i>
  Obec</th>
<th  :style="pof(Sirka*SirkaStred,10)" class="stred">
  <i  @click="sortByKey('psc','desc')" class="el-icon-upload2"   ></i>
  <i  @click="sortByKey('psc','asc')" class="el-icon-download"  ></i>
  Psc</th>
</tr>


</thead >
</table>
<table slot="body"  :style="pof(Sirka*SirkaStred,85)">
<tbody  >
  <!--  || lastsub(irow1) || islastclick(item1['idefix_matsubskup']) || true //-->
  <tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="irow1  >=  ((Zobrazit*Stranka) - Zobrazit) && irow1  <=  (Zobrazit*Stranka) -1"
        :id="'RadekS_' +  irow1+''+ item1.idefix  + '' + list.length +''+ID"
        :ref="'RadekS_' + _max(irow1+''+ item1.idefix  + '' + list.length +''+ID)"
        @dblclick="editLineToForm(irow1)"
        style="cursor:pointer"
>


  <td :style="pof(Sirka*SirkaStred,10)" class="stred">

    {{item1['ico']}}

  </td>
  <td :style="pof(Sirka*SirkaStred,10)" class="stred">

    {{item1['dic']}}

  </td>
  <td :style="pof(Sirka*SirkaStred,20)" class="px-2">

    {{item1['nazev']}}

  </td>

  <td :style="pof(Sirka*SirkaStred,20)" class="px-2">
    {{item1['ulice']}}
  </td>
  <td :style="pof(Sirka*SirkaStred,20)" class="px-2">
    {{item1['obec']}}
  </td>
  <td :style="pof(Sirka*SirkaStred,10)" class="px-2 stred">
    {{ (item1['psc']>'')?item1['psc'].replace(' ','').substr(0,3)+' '+ item1['psc'].replace(' ','').substr(3,10):'' }}
  </td>


  </tr>

</tbody>
</table>

<table slot="headl" :style="pof(Sirka*SirkaLeva,100)">


 <thead >
<tr>
  <th  :style="pof(Sirka*SirkaLeva,80)" class="stred grey--text" colspan="106" style="background:#ffffff;opacity:1;z-index:100000;border:none">
    {{checkedList.length}}

</th>

</tr>
<tr>
<th style="text-align:left" class="stred">
 <!-- <div style="width:150px; text-align:center"> -->
   <div :style="pof(Sirka*SirkaLeva,80)" >
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
  </div>
</th>
</tr>
 </thead>




</table>
<table slot="bodyl"  :style="pof(Sirka*SirkaLeva,100)">

    <tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="irow1  >=  ((Zobrazit*Stranka) - Zobrazit) && irow1  <=  (Zobrazit*Stranka) -1"

        :id="'RadekL_' +  irow1+''+ item1.idefix  + '' + list.length +''+ID"
        :ref="'RadekL_' + _max(irow1+''+ item1.idefix  + '' + list.length +''+ID)"


>

<td :style="pof(Sirka*SirkaLeva,100)" class="bila tdl" style="border-bottom: solid 1px #E3F2FD; ">

 <div style="width:120px; text-align:left"  class="bila">
  <div class='dcellx mx-1 bila'  style="width:10% ; background:white;float:left"  >
  <input style="height:14px;width:14px" type="checkbox" :id="'check_'+objId1+'_'+item1['idefix']+ID" :value="item1['idefix']" @change="chekListUpdate(irow1)">
  </div>
  <div class='dcellx bila'  style="width:80% ; background:white;float:right"
    v-bind:class="{bila: irow1 % 2 ==0 , bila:  irow1 % 2 >0}"

  >
     <el-tooltip  placement="left-start" effect="light" v-if="false">
      <div slot="content">{{ item1['popis'] }}</div>
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="showPopis(irow1)" ><i class="el-icon-question" size="mini"></i></button>
     </el-tooltip>
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="copyLineToForm(irow1)" ><i class="el-icon-document" size="mini"></i></button>
       <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="editLineToForm(irow1)" ><i class="el-icon-edit" size="mini"></i></button>
      <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow1)" ><i class="el-icon-delete bila" size="mini" ></i></button>
   </div>

   </div>
  </td>


  </tr>
</table>

<table slot="headr"  :style="pof(Sirka*SirkaPrava,1)">


<!-- <ta-ble3 v-if="true"  :h="'650px;width:100%'" :stylet1="'width:800px'" :stylet2="'width:100%'" :autosize="true" > -->
 <thead >
<tr>
  <th  :style="pof(Sirka*SirkaLeva,80)" class="stred grey--text" colspan="106" style="background:#ffffff;opacity:1;z-index:100000;border:none">
</th>

</tr> <tr>
<th :style="pof(Sirka*SirkaPrava,1)" class="stred" >
<!-- Vymazat -->
</th>
</tr>
 </thead>




</table>
<table slot="bodyr">

    <tr v-for="(item1, irow1) in list" :key="irow1.idefix" v-if="irow1  >=  ((Zobrazit*Stranka) - Zobrazit) && irow1  <=  (Zobrazit * Stranka) -1"

        :id="'RadekR_' +  irow1+''+ item1.idefix  + '' + list.length +''+ID"
        :ref="'RadekR_' + _max(irow1+''+ item1.idefix  + '' + list.length +''+ID)"
>

  <!-- <td :style="pof(Sirka*SirkaPrava,10)" class="stred bila" style="border-bottom: solid 1px #E3F2FD; "> -->
    <td :style="pof(Sirka*SirkaPrava,1)" class="stred bila" style="border-bottom: solid 1px #ffffff; ">

     <!-- <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow1)" ><i class="el-icon-delete bila" size="mini" ></i></button> -->
  </td>

  </tr>
</table>

</ta-ble3>




<!-- </el-checkbox-group> -->
<!-- <my-table :list="list"></my-table> -->



<list-firma-edit  v-if="IsDialog "></list-firma-edit>

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

//Tady maji byt seznamy firem - zacit v NEDELI !!!!!!
import ListFirma from '@/services/ListFirmaService'
import ListFirmaEdit from './ListFirmaEdit'

import f from '../services/fce'
import { stringify } from 'querystring';

// import List2StrojSkupVue from './List2MatSubSkup.vue';


export default {
  // props: ['visible'],
  IDEFIX: {
      type: Number,
      default:0,
      required: false
    },
  components: {
    'list-firma-edit': ListFirmaEdit
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
      search:'se',
      searchF:'se',
      searchD:'',
      searchK:'',
      thisHeight: 800,

      lastClick: [],
      allTrue: false, //pokud se vyplni prohledavaci pole , bude true = tedy skupiny materialu se nebudou omezovat

      objId1: '8310',
      objId2: '8320',
      objSearchBar: 'search_8310',

      aInfo: [],
      total: 0,
      pagination: {},
      activeName:'F',
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
       Zobrazit: 25,
       Zobrazit1: 15,

       Stranka: 1,

       //cities: cityOptions,
       isIndeterminate: true,
      //CheckBox
      //SubMenu
      showSubMenu: false,
      SubMemuItems: [
        { title:'Vymazat oznacene' ,akce: 'del'},
        { title:'Neco jeste nevim' ,akce: 'nevim'},
        ],


      lastSort: ['kod','asc'] , //Obsahuje hodnoty klic, smer, vychozi je id , asc,nebot toto je vsude
      timeout: false,
      citac: 0,

      Sirka : 0,
      SirkaLeva : 0.1,
      SirkaStred : 1,
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
    self.ID = Math.round(Math.random() * 1983458)
    self.objId1+=''+self.ID
    self.objId2+=''+self.ID
    self.objSearchBar+=''+self.ID
    self.getStrana()


    //alert('zdar')


    var interv =setInterval(function() {
       self.sirka("sirka")
       // self.TestovaciCislo++
//       alert(self.Sirka)
    },500)
    self.handleResize()



/*
    setTimeout(function(){
      self.editLineToForm(0)
      //alert("menim")
    },1500)
*/


//    return
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
        this.getWhere()
        this.getEnums()
        //self.editLineToForm(self.list[0]);
   if (false) {
     setTimeout(function(){
      self.editLineToForm(0,5);
    },1000)
   }




        this.IsWaiting = false
        return
    }
    // await self.ZobrazJednu()

  },

  created () {
    var self=this
      eventBus.$off('dlg8310rec')
      eventBus.$on('dlg8310rec', ( dlgPar ) => {
        //self.getData()
       self.getWhere()
       self.getEnums()
      })
    window.addEventListener('resize', self.handleResize)

  },
  beforeDestroy () {



  },
  destroyed () {


  },
  beforeUpdate () {


  },
  watch: {

  },


methods: {
  handleResize () {
    this.thisHeight = f.wyska(0.88)
  },

  StrankaNext(){
    const self= this
    //alert(Math.ceil(self.list.length/self.Zobrazit))


      if (self.Stranka <  Math.ceil(self.list.length/self.Zobrazit) ) {
        self.Stranka+=1
      }


  },
  setStrana(){
    const self=this;
      self.$store.dispatch('setStrana',{
       Strana: self.Zobrazit
      })
      console.log(self.Zobrazit)

  },
  getStrana() {
     const self = this
     self.Zobrazit =  self.$store.state.Strana
  },
  StrankaEnd(){
    const self= this
    //alert(Math.ceil(self.list.length/self.Zobrazit))

    setTimeout(function(){
      self.Stranka=Math.ceil(self.list.length/self.Zobrazit)

    },300)


    //this.Stranka = Math.ceil(this.list.length/this.Zobrazit)
  },

async getEnums() {
  const self= this
  var tmp2, tmp3
   self.enum_nazev_text = []
   self.enum_strojskup  = []
    try {
       tmp2 =  ( await ListFirma.one(this.user,this.idefixThis ,101,''))
       self.enum_nazev_text = tmp2.data.enum_nazev_text
       //alert(JSON.stringify(self.enum_nazev_text))
    } catch(e0){
       alert(e0)
    }
    try {
       var tmp3 =  ( await ListFirma.one(this.user,this.idefixThis ,10,''))
       self.enum_strojskup = tmp3.data.enum_strojskup
 //         alert(JSON.stringify(self.enum_strojskup))
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
  //alert(JSON.stringify(self.lastClick) + idxsub )
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

  this.list.forEach((el,idx) => {
    neco='check_'+self.objId1+'_'+el['idefix']+self.ID
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
    neco='check_'+self.objId1+'_'+el['idefix']+self.ID
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
    //    alert(JSON.stringify(self.checkedList))

    var neco='check_'+self.objId1+'_'+self.list[idx]['idefix'] + self.ID
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
handleSubMenu(e) {

  if (e== 'del' && this.checkedList.length>0 ){
    if (confirm('Vymazu zaznamy ' + JSON.stringify(this.checkedList))) {
      this.deleteLinesSelected()
    }
    //this.checkedList

  } else {
    alert("Neni zasrktnutu,nedelam nic")
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

  if (self.activeName == 'F') {

    self.where = 'true'
  } else {
//   alert('Neco jineho')
  }

  this.getWhere()

 } ,
 async getWhere (){

   const self= this
   var search = ''
   var neco = 'self.search'
   self.citac ++
   self.allTrue =false
   switch(self.citac) {
     case 1:
      search = self.$store.state.seekFirma
      console.log(search)
      self.searchF = search
      self.getWhere()
      break;


     default:

      if (self.activeName == 'F') {
          self.where = 'true'
          search = self.searchF
        } else {

      if (self.activeName == 'D') {
        search = self.searchD
      }
      else if (self.activeName == 'K') {
        search = self.searchK
      }

      else {
        neco =  'self.search' + self.activeName
        search = eval(`${neco}`)
        //  alert(eval(`neco`))

      }

      }
 }
  //alert()
  var ctmp=''
  /*
setTimeout( function(){
  //if ( self.$store.seekFirma >''  ) {
    console.log( search)
      search = self.$store.state.seekFirma
      self.searchF = search
      console.log("SEARCH FI", self.$store.state.seekFirma, "Citac: "  , self.citac )
      return
  //}

},200)
*/

      console.log("SEARCH FI 2", self.$store.state.seekFirma)
      //return


     // console.log("SEEKFI2:", self.$store.state.seekFirma)


  if (search > '') {
       //self.where += ` and (a.nazev ~* '${search}'  )`
       var atmp = search.split(',')
       ctmp =''
       atmp.forEach(ee => {
         if (ctmp>'') ctmp+=','
         ctmp +=`'%${ee}%'`

       })

       console.log("Hledam ", ctmp)
       self.where += ` and (a.nazev ilike any(array[${ctmp}]) or a.ico ilike any(array[${ctmp}]) or idefix::text  ilike any(array[${ctmp}]))
        or a.idefix in (select idefix_firma from list_firmaosoba b where prijmeni ilike any(array[${ctmp}]) or jmeno ilike any(array[${ctmp}]) )
        `
       self.allTrue =true
  }
      if (!f.isEmpty(self.$route.params.id) && self.$route.params.id != 0 )   {

          var npar= Math.abs(self.$route.params.id)
          self.where= `(true ) and a.idefix = ${npar} `
      }
      //alert(self.where)
      this.IsWaiting = true

        this.list = (await ListFirma.all(this.user,self.where )).data
        if (!this.list.length){
          this.list=[]
        } else {
          this.$store.dispatch('seekFirma', search)
        }
        this.IsWaiting = false

        if (!f.isEmpty(self.$route.params.id) && self.$route.params.id != 0)   {
        //  self.editLine(0)
          if (self.$route.params.id < 0) {
             self.editLineToForm(0,2)
          } else {
            self.editLineToForm(0,0)
          }

  //            alert('jsem zde' + JSON.stringify(this.list) )
      //        self.timeout = setTimeout(function() {
      //        eventBus.$emit('dlg8310', {
      //          'IsDialog': self.IsDialog,
      //          'Akce' : 'edit' ,
      //          'Idefix' :  self.list[0]["idefix"],
      //          'typ_kalkulace' :  self.list[0]["typ_kalkulace"],
      //      })
      //    },1000)
        }





 },
editLine(nRow) {   //Dulezita.bez ni nejdou dialogy v editu
     const self = this
     self.IsDialog = true
     self.Info = nRow

     eventBus.$emit('dlg8310', {
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
     eventBus.$emit('dlg8310', {
           'IsDialog': self.IsDialog,
           'Akce' : 'copy' ,
           'Idefix' :  self.list[nRow]["idefix"],
           'typ_kalkulace' :  self.list[nRow]["typ_kalkulace"],


      })
    },100)

     //alert(nRow+ self.list[nRow]["id"] + " Copy")
     //self.newLine(nRow)
   },
editLineToForm(nRow,step=0) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     self.IsDialog = true
     self.Info = nRow
     //alert('eeeee' + self.IsDialog )
     //alert(self.IsDialog)
     //self.SendName="AAAX "+Math.random()
     //alert(self.list[nRow])

     if (self.timeout) {
      clearTimeout(self.timeout)
      self.timeout =false

     // alert('copy bezi')
      //return
    }
     self.timeout = setTimeout(function() {

     eventBus.$emit('dlg8310', {
           'IsDialog': self.IsDialog,
           'Akce' : 'edit' ,
           'Idefix' :  self.list[nRow]["idefix"],
           'typ_kalkulace' :  self.list[nRow]["typ_kalkulace"],
           'step': step

      })
     },100)
     //alert(nRow+ self.list[nRow]["id"] + " Copy")
     //self.newLine(nRow)
   },
   async ZobrazJednu(){
    if (self.$route.params.id > 0) {
      setTimeout(function(){
        eventBus.$emit('dlg8310', {
           'IsDialog': false,
           'Akce' : 'edit' ,
           'Idefix' :  self.$route.params.id,
      })
      },2000)
    }
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
         // Doresit
        aTmp.push({id: el.id
         ,kod : el.kod
         ,nazev: nazev
         ,ulice: ulice
         ,obec: obec
         ,ico: ico
         ,dic: dic
        })
        Posli.push(aTmp)
       }
     })

     await ListFirma.insert(this.user, {data: Posli, del: aDel })
     .then (res => {

     })
     .catch((e) =>{
       alert('Doslo k chybe pri kontrole databaze'+ e)
     })
     //return
      var neco = []

     try {
      //this.list = (await   ListFirma.all(this.user,'nic')).data
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
      //this.list = (await   ListFirma.all(this.user,'nic')).data

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

      this.Max = (await ListFirma.all(this.user,'max')).data[0].kod*1 +10


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



    if (confirm('Vymazat firmu ? ' + self.list[nRow].idefix )) {
      this.IsWaiting =true


      var prd= (await ListFirma.delete(self.user,self.list[nRow].idefix))
        self.getWhere()
       //self.list = (await ListFirma.all(self.user,` ${where} `)).data
       this.IsWaiting =false
    }



   },

   async deleteLinesSelected() {
     const self = this

    // self.list[nRow].nazev1
    if (confirm('Vymazat kompletne oznacene stroje ? ' )) {
      this.IsWaiting =true
      await this.checkedList.forEach(idefix => {
        var prd= (ListFirma.delete(self.user,idefix))
        self.getWhere()
      });
      this.handleUnCheckAllChange()

       this.IsWaiting =false

       //self.list = (await ListFirma.all(self.user,` ${where} `)).data

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
    var seekStr=['id', 'nazev','user_insert']
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
      this.list = (await ListFirma.all(this.user,nic)).data
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
      var konec = false
      try {


      if (neco1) {
        neco1.style.height = "15px"
        neco2.style.height = "15px"
        neco3.style.height = "15px"
      }
      } catch (e) {
        konec = true
      }
      if (konec) {
        return
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
    sirka(ref, znovu = true) {
      const self= this
      var nret = 0
      self.Sirka = self.Sirka
      //alert(ref)
       setTimeout(function() {
        //alert(self.$refs[ref].clientWidth)
        try {
          nret = self.$refs[ref].clientWidth
          if (nret != self.Sirka || true ) {
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
      'seekFirma'
    ])

  }
}


</script>
<style scoped>
textarea:focus, input:focus {
    outline: none;


}
button:focus {
  outline: solid 2px #E3F2FD;

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
