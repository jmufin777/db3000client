  <template>
<el-row id="m201" style="overflow:scroll"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>
  <el-row  :gutter="20">
  <el-col :span="4" :offset="0" style="margin-top:5px;padding-left:10px" >
  <el-input prefix-icon="el-icon-search" :id="objSearchBar" autofocus clearable size="mini" v-model="search" placeholder="Prohledat tabulku">
  </el-input>
  </el-col>
  <el-col :span="1" :offset="0" style="margin-top:5px;padding-left:10px" >
    <el-badge :value="list.length">
    <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newLine(-1)"
    ></el-button>
    </el-badge>
  </el-col>

  <el-col :span="1" :offset="0" style="margin-top:5px;padding-left:10px" >
    <el-badge :value="listEdits.length" v-if="listEdits.length>0">
    <el-button  v-if="listEdits.length>0"  type="warning" icon='el-icon-back'  size="mini" class="elevation-0"
        @click="backLines()"
    ></el-button>

    </el-badge>
  </el-col>
  <el-col :span="1" :offset="0" style="margin-top:5px;padding-left:10px" >

    <el-button  v-if="listEdits.length==0"   size="mini"
       class="elevation-0 " type="success" icon='el-icon-success'
        @click="saveLines(0)"
    ></el-button>
        <el-button  v-if="listEdits.length>0"   size="mini" class="elevation-0 " type="danger" icon='el-icon-success'
        @click="saveLines(0)"
    ></el-button>
</el-col>



    <el-col :span="2" :offset="0" style="margin-top:5px;padding-left:10px" >
        <!-- <el-checkbox v-model="saveNow" label="Ukladat prubezne"  size='mini'></el-checkbox> -->
  </el-col>
  </el-row>
<div>

</div>

<div style="height:100%;overflow:scroll" class="mt-0" id="t201">

<el-row    style="backgroud: white">
  <el-col :span="2" class="mth">
   Akce
 </el-col>


 <el-col :span="22">
  <el-col v-for="( col, i0 ) in cols" :key="col.id" :span="col.span" class="mth"
  v-bind:class="{'green--text': lastSort[0]==col.id }"
  v-show="col.props.visible=='yes'"
  >

        {{col.title}}
    <i v-if="col.sort && col.sort=='asc'"    @click="sortByKey(col.id,'desc')" class="el-icon-upload2"   ></i>
    <i v-if="!col.sort || col.sort=='desc'"  @click="sortByKey(col.id,'asc')" class="el-icon-download"  ></i>

    <!-- <button v-if="col.sort && col.sort=='asc'" type="button" style="width:10px;height:18px" class="white  px-0 cell" @click="sortByKey(col.id,'desc')" ><i class="el-icon-upload2" size="medium"></i></button>
    <button v-if="!col.sort || col.sort=='desc'" type="button" style="width:10px;height:8px" class="white  px-0 cell" @click="sortByKey(col.id,'asc')" ><i class="el-icon-download" size="medium"></i></button> -->
      </el-col>
 <el-col :span="2" class="mth">
   X
 </el-col>
 </el-col>
 </el-row>

<div style="height:100%;overflow:scroll" class="mt-0" id="t202">
  <form id="f201">

  <el-row v-for="( item, irow ) in list" :key="item.id"
      v-bind:class="{  JsemVidet: groupFind(item) || item.id < 0, NejsemVidet:  item.id > 0 && !groupFind(item)   }"
      :id="'d202_r_'+irow"
        style="backgroud: white"
  >


  <el-col :span="2" >


    <div class='dcell'  style="width::100% ; background:white"
    v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
    >
       <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="copyLine(irow)" ><i class="el-icon-document" size="mini"></i></button>
       <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="editLine(irow)" ><i class="el-icon-edit" size="mini"></i></button>

   </div>
  </el-col>


  <el-col :span="22"


  >
    	<el-col v-for="(col,icol) in cols"
			:key="col.id"
      :span="col.span"
      v-show="col.props.visible=='yes'"
      >
      <div :id="'d202_r_'+irow+'_c_'+icol"  class='dcell' >

        <input type="number" v-if="col.type =='number'"
        class=" px-4 cell " :id="'c202_r_'+irow+'_c_'+icol"
        :value="item[col.id]" style="width:100%;border:none;height:100%" readonly
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"


        >
        <input type="text" v-else
        class=" px-4 cell " :id="'c202_r_'+irow+'_c_'+icol"
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
        :value="item[col.id]"  style="width:100%;border:none;height:100%;text-align:left" readonly

        >
        <input type="date" v-if="col.type =='datetime-local' && false"
        class="white px-4 cell seda" :id="'c202_r_'+irow+'_c_'+icol"
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
        :value="item[col.id]" style="width:100%;border:none;height:100%" readonly

        min="2007-06-01T08:30" max="2020-06-30T16:30"
        >
        <select  v-if="col.type =='select'  && false "
        class=" px-4 cell" :id="'c202_r_'+irow+'_c_'+icol"
         style="width:100%;border:none;height:100%" readonly
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"

        >
        <option :value="item[col.id]" selected >{{ item[col.id] }}</option>
        <option :value="2" >2</option>
        </select>
      </div>

    	</el-col>
     <el-col :span="2" >
      <div class='dcell'  style="width::100% ; background:white"
      v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
      >
         <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow)" ><i class="el-icon-delete" size="mini"></i></button>
      </div>
     </el-col>
  </el-col>
  </el-row>
  </form>

  <div>
    <br><br>

    <!-- <table>
      <tr v-for="(i1, idx) in list" :key="i1.idx" v-if="idx==0">
         <td v-for="(i1 ,idyz) in i1" :key="idyz">{{ idyz }}</td>
      </tr>
      <tr v-for="(i1, idx) in list" :key="idx">

        <td v-for="(i2 ,idy) in i1" :key="idy">{{ i2 }} </td>
      </tr>
    </table>
<br>
<table>
      <tr v-for="(ie1, iedx) in listEdits" :key="ie1.idx" v-if="iedx==0">
         <td v-for="(ie1 ,iedyz) in ie1" :key="iedyz">{{ iedyz }}</td>
      </tr>
      <tr v-for="(ie1, iedx) in listEdits" :key="iedx">

        <td v-for="(ie2 ,iedy) in ie1" :key="iedy">{{ ie2 }} </td>
      </tr>
    </table> -->

  </div>
  </div>
  </div>

  <!-- <hr> -->
<!-- <div>
  <win-dow :title="'events'" :id="`events`"
    :x="200"
    :w="700"
    :y="100"
    :z="90"
    :h="351"
    :parent="false"
    :maximize="false"
    >
  i: {{ info }}
  ai: {{ aInfo}}
  </win-dow>
  <hr> -->

</div>

</el-col>
</el-row>

</template>

<script>

import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import List2Barevnost from '@/services/List2BarevnostService'

import f from '@/services/fce'
// import List2BarevnostVue from './List2Barevnost.vue';



export default {
  props: ['visible'],
  data () {
    return {
      moduleName: 'barevnost2',
      saveNow: false,

      IsDialog: true,

      IsWaiting: false,
      info:'',

      isWrite: false,
      infoStatus: {
        isFocus: null,
        lastkey: 0,
        blurKey: 0,
        lastFocus: 0,
      },
      search:'',
      //event
      //event
      objSearchBar: 'search_201',
      aInfo: [],
      total: 0,
      pagination: {},
      form: {},
      //Moje tabule a data
      currId: null,
      currentRow: null,
      minId: 0, //Pro vklad zaporna ID
  		cols: [
				{ id: "id", title: "ID", cssClasses: "mtd" ,span: 4, isEdit: false, type: "text"  ,props:{visible: 'no'}},
				{ id: "kod", title: "Kod", cssClasses: "mtd" ,span:5, isEdit: true, type: "number",props:{visible: 'yes'}},
        { id: "nazev", title: "Nazev", cssClasses: "mtd", span: 12, isEdit: true, type: "text" ,props:{visible: 'yes'}},
        //{ id: "time_insert", title: "CasVkladu", cssClasses: "mtd", span: 5, isEdit: false, type:"datetime-local" ,props:{visible: 'no'}},
        //{ id: "user_insert", title: "KdoVkladu", cssClasses: "mtd", span: 4, isEdit: false, type: "text" ,props:{visible: 'no'}},
			],
      list: [],
      listNewLine: [], //Prazdna radka - automaticky se vygeneruje a vymaze podle prvni nactene radky
      listEdits: [],   //Prehled zmen s prinakem edit, delete
      lastSort: ['kod','asc']  //Obsahuje hodnoty klic, smer, vychozi je id , asc,nebot toto je vsude
    }
  },
  async mounted () {

//    return
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
      this.list = (await List2Barevnost.all(this.user,'nic')).data


      if (!this.list.length || this.list.length == 0){
        this.list =[{
          id: -1,
          kod: 100,
          nazev:'Nova'
        }]

        this.newLine(-1)
        this.IsWaiting = false
        return


      }



      //this.newLine()


      this.IsWaiting = false

      //this.aInfo.push=this.list[0]
      var x

      for(x in this.list[0]) {
          this.aInfo[x]=''

      }
          this.aInfo['id']=-1
//          this.list.unshift(this.aInfo)

    }
        var new_id ='c202_r_'+0+'_c_'+1
              //alert(new_id)
        setTimeout(function(){
             var newObal= document.getElementById('d'+new_id.substring(1))
              this.isWrite =false
            //  document.getElementById(new_id).focus()
             // document.getElementById(new_id).click()
              document.getElementById(new_id).setAttribute('readonly',true)
              f.removeClass(document.getElementById(new_id),"bila2")
              if (!document.getElementById(new_id).type== 'number' ) {
                document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
              }

            //setTimeout(function(){


              f.changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()

         },50)



  },

  created () {
    var self=this

setTimeout(function(){
  var tmpObj=''
  var _obj1 ='m201'
  var _obj2 ='t201'
  var _obj3 ='t202'
  var moduleName = 'list2-barevnost'
  f.setUp(_obj1,_obj2,_obj3,self,moduleName)

  },100)


  },
  beforeDestroy () {


     if (this.listEdits.length>0) {
       //alert('beforeDestroy')
       if (confirm('Ulozit zmeny ?')){
          this.saveLines(0)
       }
     }

  },
  destroyed () {
    if (document.getElementById("t202")){
        ///nejde
      //document.getElementById("t202").removeEventListener(document.getElementById("t202"),'keydown')

    }
    // alert('destos'+document.getElementById("t202"))
  },
  beforeUpdate () {


  },
  watch: {
    pagination: {
      handler () {
        this.my_data()
        alert('watch')
      },
      deep: true,
    }
  },

  methods: {


editLine(nRow) {
     const self = this
     self.IsDialog = true
     self.Info = nRow
     eventBus.$emit('dlg9901', {
           'IsDialog': self.IsDialog,
           'cols': self.cols,
           'record': self.list[nRow],
           'nRow': nRow



      })

   },

copyLine(nRow) {

     const self = this
     self.IsDialog = true
     self.Info = nRow

     self.newLine(nRow)






   },


   async saveLines(id){
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
        aTmp.push({id: el.id,kod: el.kod, nazev: el.nazev })
        Posli.push(aTmp)
       }
     })

     await List2Barevnost.insert(this.user, {data: Posli, del: aDel })
     .then (res => {

     })
     .catch((e) =>{
       alert('Doslo k chybe pri kontrole databaze'+ e)

     })
     //return
      var neco = []

     try {
      this.list = (await   List2Barevnost.all(this.user,'nic')).data
        //alert(this.lastSort[0]+"/"+this.lastSort[1])
        if (this.lastSort[1]=='desc'){
           this.list = _.sortBy(this.list,this.lastSort[0]).reverse()
        } else {
          this.list = _.sortBy(this.list,this.lastSort[0])
        }

      if (isInsert == true ){
        this.list = _.sortBy(this.list,'id').reverse()

        ////
        var new_id ='c202_r_'+0+'_c_'+1
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

   async newLine (nRow)  {
     var x
      this.listNewLine = []

      this.Max = (await List2Barevnost.all(this.user,'max')).data[0].kod*1 +10


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
              new_id ='c202_r_'+idx+'_c_'+1
              return

              //alert(new_id)
            }
          })
          setTimeout(function(){
            document.getElementById(new_id).focus()
            document.getElementById(new_id).click()
            document.getElementById(new_id).removeAttribute('readonly')
            document.getElementById(new_id).select()
         },100)



   },
   deleteLine(nRow) {
     const self = this
    //  if (confirm('Vymazat zaznam? '+nRow + "  id:" +this.list[nRow].id )) {
    //    this.listEdits.push([this.list[nRow],'delete'])
    //    this.list.splice(nRow,1)
    //  }

    //  return

      var xId = this.list[nRow].id
      var tmpI = -1000000
     this.$confirm('Vymazat zaznam' + this.list[nRow].id+"/"+this.list[nRow].kod+"/"+this.list[nRow].nazev, '',{
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
       new_id='c202_r_'+(self.list.length -1)+'_c_'+1
     }
     if (top == true) {
       new_id='c202_r_'+(0)+'_c_'+1
     }

    if (next == true) {
       new_id='c202_r_'+(nRow)+'_c_'+1
     }

        if (new_id > '')  {

            //alert(newObal + "/ " + new_id)

          setTimeout(function(){
            if (!document.getElementById(new_id)){
                alert(new_id + 'neco je sptane' + eof + "top " + top + "next "+next )
                new_id='c202_r_'+(self.list.length -1)+'_c_'+1
            }
              var newObal= document.getElementById('d'+new_id.substring(1))

              this.isWrite =false
            //  document.getElementById(new_id).focus()
             // document.getElementById(new_id).click()
              document.getElementById(new_id).setAttribute('readonly',true)
              f.removeClass(document.getElementById(new_id),"bila2")
              if (!document.getElementById(new_id).type == 'number') {
                document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
              }

            //setTimeout(function(){


              f.changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()
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
     f.obsluha2(e, this.objSearchBar, this)
   },


   currid (itemId, colid) {
       this.currId = itemId
       this.colId = colid
    },
    groupFind(element){
    var lRet = false
    var elstr=''
    var seekStr=['id', 'nazev', 'kod','user_insert']
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
      this.list = (await List2Barevnost.all(this.user,nic)).data
      this.total = this.list.length
      this.IsWaiting = false
    },
    deleteRow(index, rows) {
      if (confirm('Vymazat ?')){
        rows.splice(index, 1);
      }
      },
    async appendRow(index,rows) {
       alert(index)
       this.aInfo=rows[index]
       console.log(rows[0])
       for (var x in rows[0]){
         this.form[x] = rows[0][x]
       }
        console.log("FORM:", this.form)
      try {
        await (List2Barevnost.insert(this.user, this.form))

      } catch (err) {
        console.log(err)
      }

      await List2Barevnost.all(this.user,'nic')
      .then(res => {

        //this.info= res
        this.list = res.data


          var x
          for(x in this.list[0]) {
              this.aInfo[x]=''
          }
          this.aInfo['id']=-1
          this.list.unshift(this.aInfo)

      })

    } ,
     setCurrent(row) {  //Zavolat s cislem radky,treba tlacitkem,ted j nepotrenuju
        this.$refs.tableColors.setCurrentRow(row);
      },
      handleCurrentChange(val) {

         this.currentRow = val;
         this.aInfo = val
         if (val) {
           this.info = val.id
           this.currId = val.id
         } else {
           this.info = 'Del'
         }


      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
