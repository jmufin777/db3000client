<template>
<el-row :id="'m'+objId1" style="overflow:scroll"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>


<div style="height:100%;overflow:scroll;text-align:left;width:100%" class="mt-0 px-2 white" :id="'t' + objId1">

  <el-col :span="6" style="text-align:left;top:-30px" class="mx-1 mt-0 ">

 <!-- <el-col :span="12" :offset="0" style="margin-top:5px;padding-left:10px" > -->

 <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="Role"  name="R"><el-input class="my-0" prefix-icon="el-icon-search"  style='width:300px;' autofocus clearable size="mini" v-model="searchR" placeholder="Prohledat Role" @change="addWhere"></el-input></el-tab-pane>
    <el-tab-pane label="Desky" name="D"><el-input prefix-icon="el-icon-search"  style='width:300px;' autofocus clearable size="mini" v-model="searchD" placeholder="Prohledat Desky" @change="addWhere"></el-input></el-tab-pane>
    <el-tab-pane label="Archy" name="A"><el-input prefix-icon="el-icon-search"  style='width:300px;' autofocus clearable size="mini" v-model="searchA" placeholder="Prohledat Archy" @change="addWhere"></el-input></el-tab-pane>
    <el-tab-pane label="Vse"   name="V"><el-input prefix-icon="el-icon-search"  style='width:300px;' autofocus clearable size="mini" v-model="searchV" placeholder="Prohledat Vse" @change="addWhere"></el-input></el-tab-pane>
 </el-tabs>
 </el-col>


<v-spacer></v-spacer><br>
  <el-col :span="4" class="mx-1 mt-4" style="position:relative;top:9px">
  <el-select v-model="search_dodavatel"
            filterable
            multiple

            default-first-option
            @change="addWhere"
            placeholder="Dodavatele"

            style="width:100%;"
            size="mini">
            <el-option
            v-for="item8 in enum_dodavatel"
            :key="item8.idefix*1"
            :label="item8.nazev"
            :value="item8.idefix*1"
            >{{item8.nazev}} </el-option>
  </el-select>
  </el-col>
  <el-col :span="4" class="mx-1 mt-4" style="position:relative;top:9px">
   <el-select v-model="search_vyrobce"
            filterable
            multiple

            default-first-option
            @change="addWhere"
            placeholder="Vyrobci"
            style="width:100%;"
            size="mini">
            <el-option
            v-for="item6 in enum_vyrobce"
            :key="item6.idefix*1"
            :label="item6.nazev"
            :value="item6.idefix*1"

            >{{item6.nazev}} </el-option>
  </el-select>
  </el-col>


 <!-- </el-col> -->

  <div>

    <br><br>

<!-- <el-checkbox-group v-model="checkedList" @change="handleCheckedListChange"> -->
<table slot="activator" style="width:100%">
<thead>
<th style="width:5%">
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
<th style="width:23%">Material</th>
<th style="width:8%" v-if="activeName=='R' || activeName=='V'">Sire mm</th>
<th style="width:8%" v-if="activeName=='D' || activeName=='A'">Rozmer m</th>
<th style="width:5%" v-if="activeName=='R' || activeName=='V'">Navin bm</th>
<th style="width:5%" v-if="activeName=='D' ">Tloustka mm</th>
<th style="width:5%">Cena za m2</th>

<th syle="width:12%">Technologie</th>
<th >Vyrobce</th>
<th >Dodavatel</th>
<th style="width:3%">Vymazat</th>
</thead >
<tbody>


<tr v-for="(item1, irow1) in list" :key="irow1.idefix">
  <td style="width:7%">
  <div class='dcellx mx-1'  style="width:10% ; background:white;float:left" >
  <input style="height:14px;width:14px" type="checkbox" :id="'check_'+objId1+'_'+item1['idefix']" :value="item1['idefix']" @change="chekListUpdate(irow1)">
  </div>
  <div class='dcellx'  style="width:80% ; background:white;float:right"
    v-bind:class="{bila: irow1 % 2 ==0 , bila:  irow1 % 2 >0}"
  >
     <el-tooltip  placement="left-start" effect="light">
      <div slot="content">{{ item1['popis'] }}</div>
       <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="showPopis(irow1)" ><i class="el-icon-question" size="mini"></i></button>
     </el-tooltip>
       <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="copyLineToForm(irow1)" ><i class="el-icon-document" size="mini"></i></button>
       <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="editLineToForm(irow1)" ><i class="el-icon-edit" size="mini"></i></button>
   </div>
   <!-- <el-checkbox :id="'check2_'+objId1+'_'+item1['idefix']" :label="item1['idefix']">{{item1['idefix']}}</el-checkbox> -->
  </td>
  <td style='text-align:left;width:23%' class="px-2">
    <div style="color:#950008; font-weight:bold;background: #FFFFFF;opacity:0.7;position:relative;top:-4px;left:0px;width:100%" v-if="lastsub(irow1)">{{item1['podskupina']}}</div>
     {{item1['nazev1']}} {{item1['nazev2']}} {{item1['nazev3']}}
  </td>

  <td v-if="item1['mattyp']=='R'" style="width:8%">
    <table >
      <tr v-if="item1['sirkys']>''"><td style="border:none">S:&nbsp;{{item1['sirkys']}}</td></tr>
      <tr v-if="item1['sirkyo']>''"><td style="border:none">O:&nbsp;{{item1['sirkyo']}}</td></tr>
    </table></td>
  <td v-else-if="item1['mattyp']=='D'">
    <table >
      <tr v-if="item1['sirkys']>''"><td>S:&nbsp;{{item1['rozmers']}}</td></tr>
      <tr v-if="item1['sirkyo']>''"><td>O:&nbsp;{{item1['rozmero']}}</td></tr>
   </table>
  </td>
   <td v-else-if="item1['mattyp']=='A'">
    <table >
      <tr v-if="item1['sirkys']>''"><td>S:&nbsp;{{item1['rozmers']}}</td></tr>
      <tr v-if="item1['sirkyo']>''"><td>O:&nbsp;{{item1['rozmero']}}</td></tr>
   </table></td>

   <td style="width:8%" v-else>
    <table >
      <tr v-if="item1['sirkys']>''"><td>S:&nbsp;{{item1['rozmers']}}</td></tr>
      <tr v-if="item1['sirkyo']>''"><td>O:&nbsp;{{item1['rozmero']}}</td></tr>
   </table></td>
   <td style="width:5%" v-if="item1['mattyp']=='R'">
     {{ (item1['navins'] >0)?Math.round(item1['navins']) : Math.round(item1['navino']) }} m
   </td>
   <td style="width:5%" v-else>
     {{ item1['sila_mm']}} mm
   </td>
   <td >
     {{item1['cena_nakup_m2']}}
   </td>
   <td >
     {{ item1['technologie']}} :
     {{ item1['technologie_skup']}} :
     {{ item1['technologie_text']}}
   </td>
   <td >
     {{ item1['vyrobce']}}
   </td>
    <td  >
     {{ item1['dodavatel']}}
   </td>


  <td >
     <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow1)" ><i class="el-icon-delete" size="mini"></i></button>
  </td>

</tr>


</tbody>
</table>


<!-- </el-checkbox-group> -->
<!-- <my-table :list="list"></my-table> -->



<list-mat-edit v-if="IsDialog"></list-mat-edit>

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


   <!--
  <win-dow :title="'events'" :id="`events`"
    :x="200"
    :w="700"
    :y="100"
    :z="90"
    :h="351"
    :parent="false"
    :maximize="false"
    >
  i: {{ cols }}

  </win-dow>
  //-->


</div>

</el-col>
</el-row>

</template>

<script>
const listOptions = [4728];
const self = this

import { mapState } from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import ListMat from '@/services/ListMatService'
import ListMatEdit from './ListMatEdit'

import f from '@/services/fce'

// import List2StrojSkupVue from './List2MatSubSkup.vue';




export default {
  props: ['visible'],
  components: {
    'list-mat-edit': ListMatEdit
  },
  data () {
    return {
      moduleName: 'list-mat',
      saveNow: false,

      IsDialog: true,

      IsWaiting: false,
      info:'',
      search:'',
      searchR:'',
      searchD:'',
      searchA:'',
      searchV:'',

      objId1: '821',
      objId2: '822',
      objSearchBar: 'search_821',

      aInfo: [],
      total: 0,
      pagination: {},
      activeName:'R',
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
      enum_dodavatel: [],
      search_dodavatel: [],
      enum_vyrobce: [],
      search_vyrobce: [],
      enum_vyrobce: [],
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
        { title:'Vymazat oznacene' ,akce: 'del'},
        { title:'Neco jeste nevim' ,akce: 'nevim'},
        ],


      lastSort: ['kod','asc']  //Obsahuje hodnoty klic, smer, vychozi je id , asc,nebot toto je vsude
    }
  },
  async mounted () {
    const self = this
    var tmp2
//    return
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
        this.getWhere()
              try {
                  tmp2 =  ( await ListMat.one(this.user,this.idefixThis ,8,''))
                  self.enum_dodavatel = tmp2.data.enum_dodavatel
                  //alert(JSON.stringify(self.enum_dodavatel))
                } catch(e0){
                  alert(e0)
                }
               try {
                  var tmp3 =  ( await ListMat.one(this.user,this.idefixThis ,6,''))
                  self.enum_vyrobce = tmp3.data.enum_matvyrobce
                  // alert(JSON.stringify(self.enum_vyrobce))
                } catch(e1){
                  alert(e1)
                }
      //this.list = (await ListMat.all(this.user,`${self.where}`)).data
        this.IsWaiting = false
        return
    }

  },

  created () {
    var self=this
      eventBus.$on('dlg821rec', ( dlgPar ) => {
        //self.getData()
                self.getWhere()

      })


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
handleCheckAllChange(val) {
  const self = this

  var neco=''

  this.list.forEach((el,idx) => {
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
    //    alert(JSON.stringify(self.checkedList))

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
handleSubMenu(e) {

  if (e== 'del' && this.checkedList.length>0 ){
    alert('Vymazu zaznamy ' + JSON.stringify(this.checkedList))
    //this.checkedList
    this.deleteLinesSelected()
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
  if (self.activeName == 'V') {
    self.where = 'true'
  } else {
   self.where = ` mattyp ='${this.activeName}'`
  }

  this.getWhere()

 } ,
 async getWhere (){
   const self= this
   var search = ''
 if (self.activeName == 'V') {
    self.where = 'true'
    search = self.searchV
  } else {
   self.where = ` mattyp ='${this.activeName}'`
   if (self.activeName == 'A') {
     search = self.searchA
   }
   if (self.activeName == 'D') {
     search = self.searchD
   }
   if (self.activeName == 'R') {
     search = self.searchR
   }

  }
  var ctmp=''
  if (self.search_dodavatel.length>0){
    ctmp=self.search_dodavatel.join(',')
    self.where += ` and idefix_dodavatel in ( ${ctmp} )`
  }
  if (self.search_vyrobce.length>0){
    ctmp=self.search_vyrobce.join(',')
    self.where += ` and idefix_vyrobce in ( ${ctmp} )`
  }
  if (search > '') {
       self.where += ` and (nazev1 ~* '${search}' or nazev2 ~* '${search}' or nazev3 ~* '${search}')`
  }
      this.IsWaiting = true
        this.list = (await ListMat.all(this.user,self.where )).data
        if (!this.list.length){
          this.list=[]
        }
        this.IsWaiting = false


 },
editLine(nRow) {   //Dulezita.bez ni nejdou dialogy v editu
     const self = this
     self.IsDialog = true
     self.Info = nRow
     eventBus.$emit('dlg821', {
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

copyLinex(nRow) {

     const self = this
     self.IsDialog = true
     self.Info = nRow

     self.newLine(nRow)






   },


copyLineToForm(nRow) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     self.IsDialog = true
     self.Info = nRow
     eventBus.$emit('dlg821', {
           'IsDialog': self.IsDialog,
           'Akce' : 'copy' ,
           'Idefix' :  self.list[nRow]["idefix"]
      })

     //alert(nRow+ self.list[nRow]["id"] + " Copy")
     //self.newLine(nRow)
   },
editLineToForm(nRow) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     self.IsDialog = true
     self.Info = nRow
     // alert('aaaa')
     eventBus.$emit('dlg821', {
           'IsDialog': self.IsDialog,
           'Akce' : 'edit' ,
           'Idefix' :  self.list[nRow]["idefix"]
      })

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

     await ListMat.insert(this.user, {data: Posli, del: aDel })
     .then (res => {

     })
     .catch((e) =>{
       alert('Doslo k chybe pri kontrole databaze'+ e)

     })
     //return
      var neco = []

     try {
      //this.list = (await   ListMat.all(this.user,'nic')).data
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
      //this.list = (await   ListMat.all(this.user,'nic')).data

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
      this.list = _.sortBy(this.list,ckey)
        this.cols.forEach((el, k ) => {
          if (el.id==ckey){
            this.cols[k]["sort"]="asc"
            this.lastSort[0] =ckey
            this.lastSort[1] ="asc"
            return
          }
      })
      //this.cols[ckey]['sort']="asc"
    }
    if (ascdesc == 'desc') {
      this.list = _.sortBy(this.list,ckey).reverse()
         this.cols.forEach((el, k ) => {
          if (el.id==ckey){
            this.cols[k]["sort"]="desc"
            this.lastSort[0] =ckey
            this.lastSort[1] ="desc"
            return
          }
      })
      //this.cols[id]['sort']="desc"
    }

   },

   async newLinex (nRow)  {
     var x
      const self = this
      this.listNewLine = []

      this.Max = (await ListMat.all(this.user,'max')).data[0].kod*1 +10


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



    if (confirm('Vymazat poloku materialu ' + self.list[nRow].nazev1 )) {
      this.IsWaiting =true
      var prd= (await ListMat.delete(self.user,self.list[nRow].idefix))
        self.getWhere()
       //self.list = (await ListMat.all(self.user,` ${where} `)).data
       this.IsWaiting =false
    }



   },

   async deleteLinesSelected() {
     const self = this

    // self.list[nRow].nazev1
    if (confirm('Vymazat poloky materialu ' )) {
      this.IsWaiting =true
      await this.checkedList.forEach(idefix => {
        var prd= (ListMat.delete(self.user,idefix))
        self.getWhere()
      });
      this.handleUnCheckAllChange()

       this.IsWaiting =false

       //self.list = (await ListMat.all(self.user,` ${where} `)).data

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
      this.list = (await ListMat.all(this.user,nic)).data
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
    }
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
<style scoped>
</style>
