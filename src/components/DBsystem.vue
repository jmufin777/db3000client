  <template>
<el-row id="m9901" style="overflow:scroll"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>
  <el-row  :gutter="20">
  <el-col :span="4" :offset="0" style="margin-top:5px;padding-left:10px" >
  <el-input prefix-icon="el-icon-search" id="search_9901" autofocus clearable size="mini" v-model="search" placeholder="Prohledat tabulku">
  </el-input>
  </el-col>
  <el-col :span="1" :offset="0" style="margin-top:5px;padding-left:10px" >
    <el-badge :value="list.length">
    <el-button  type="warning" icon='el-icon-plus'  size="mini" class="elevation-0"
        @click="newLine()"
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

<div style="height:100%;overflow:scroll" class="mt-0" id="t9901">

<el-row  >
  <el-col :span="2" class="mth">
   Akce
 </el-col>

 <el-col :span="22">
  <el-col v-for="( col, i0 ) in cols" :key="col.id" :span="col.span" class="mth"
  v-bind:class="{'green--text': lastSort[0]==col.id }"
  v-show="col.props.visible=='yes'"
  >

        {{col.title}}
    <i v-if="col.sort && col.sort=='asc'"    @click="sortByKey(col.id,'desc')" class="el-icon-sort-down"   ></i>
    <i v-if="!col.sort || col.sort=='desc'"  @click="sortByKey(col.id,'asc')" class="el-icon-sort-up"  ></i>

    <!-- <button v-if="col.sort && col.sort=='asc'" type="button" style="width:10px;height:18px" class="white  px-0 cell" @click="sortByKey(col.id,'desc')" ><i class="el-icon-upload2" size="medium"></i></button>
    <button v-if="!col.sort || col.sort=='desc'" type="button" style="width:10px;height:8px" class="white  px-0 cell" @click="sortByKey(col.id,'asc')" ><i class="el-icon-download" size="medium"></i></button> -->
      </el-col>
 <el-col :span="1" class="mth">
   Akce
 </el-col>
 </el-col>
 </el-row>

<div style="height:100%;overflow:scroll" class="mt-0" id="t9902">
  <form id="f9901">

  <el-row v-for="( item, irow ) in list" :key="item.id"
      v-bind:class="{  JsemVidet: groupFind(item) || item.id < 0, NejsemVidet:  item.id > 0 && !groupFind(item)   }"
      :id="'d9902_r_'+irow"
      style="backgroud: white"
  >

  <el-col :span="2" >
    <div class='dcell'  style="width::100% ; background:white"

    v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
    >

         <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="editLine(irow)" ><i class="el-icon-edit" size="mini"></i></button>

   </div>
  </el-col>

  <el-col :span="22"  >
    	<el-col v-for="(col,icol) in cols"
			:key="col.id"
      :span="col.span"
      v-show="col.props.visible=='yes'"
      >
      <div v-if="col.type=='textarea'" :id="'d9902_r_'+irow+'_c_'+icol"  class='dcell pa-0 ma-0' >
        <v-textarea
         auto-grow
         outline
         row-height="1"
         class=" pa-0 ma-0 cell "
         :id="'c9902_r_'+irow+'_c_'+icol"
        :value="item[col.id]" style="width:100%;border:none;height:100%;text-align:left" readonly
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
        ></v-textarea>
      </div>

      <div v-else-if="col.type=='textareaArray'" :id="'xxd9902_r_'+irow+'_c_'+icol"  class='dcell pa-0 ma-0' >
        <table v-if="Array.isArray(item[col.id])">
          <tr v-for="(sub1,i1) in item[col.id]" :key="i1">
            <td>
         Table     {{ item[col.id][i1] }}
              </td>
          </tr>
        </table>
      </div>



      <div v-else :id="'d9902_r_'+irow+'_c_'+icol"  class='dcell' >

        <input type="number" v-if="col.type =='number'"
        class=" px-0 cell " :id="'c9902_r_'+irow+'_c_'+icol"
        :value="item[col.id]" style="width:100%;border:none;height:100%" readonly
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"


        >

        <input type="text" v-else
        class=" px-4 cell " :id="'c9902_r_'+irow+'_c_'+icol"
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
        :value="item[col.id]"  style="width:100%;border:none;height:100%" readonly

        >
        <input type="date" v-if="col.type =='datetime-local' && false"
        class="white px-4 cell seda" :id="'c9902_r_'+irow+'_c_'+icol"
        v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
        :value="item[col.id]" style="width:100%;border:none;height:100%" readonly

        min="2007-06-01T08:30" max="99020-06-30T16:30"
        >

      </div>

    	</el-col>
     <el-col :span="1" >
      <div class='dcell'  style="width::100% ; background:white"
      v-bind:class="{seda: irow % 2 ==0 , bila:  irow % 2 >0}"
      >
         <button type="button" style="width:30%;height:8px" class="white  px-0 cell" @click="deleteLine(irow)" ><i class="el-icon-delete" size="mini"></i></button>
      </div>
     </el-col>
  </el-col>
  </el-row>
  </form>

  <db-system-edit v-if="IsDialog == true ">
    <div slot="a1" class="ma-2 pa-2">DB System {{ Info }} </div>

  </db-system-edit>

  <div>
    <br><br>

  </div>
  </div>
  </div>

  <hr>
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
  i: {{ info }}
  ai: {{ aInfo}}
  </win-dow> -->
  <hr>

</div>

</el-col>
</el-row>

</template>

<script>
import {mapState} from 'vuex'
import DBsystem from '@/services/DBsystemService'
import DBsystemEdit from './DBsystemEdit'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'



function hasClass(element, cls) {
    try {
     console.log(element.hasOwnProperty('className'));
    } catch(e){
      return ''
    }
    return element.className.split(' ').indexOf(cls) > -1
}

function hasClassId(elementId, cls) {
  return document.getElementById(elementId).className.split(' ').indexOf(cls) > -1
}

function addClass(element, cls) {
  try {
     console.log(element.hasOwnProperty('className'));
    } catch(e){
      return ''
    }
  if (! hasClass(element,cls)){
    element.className+=(' ' + cls)
    element.className=element.className.trim()
  }
}

function removeClass(element, cls) {
  try {
     console.log(element.hasOwnProperty('className'));
    } catch(e){
      return ''
    }
  if ( hasClass(element,cls)){
    element.className = element.className.replace(cls,'')
  }
}

function changeClass(element,oldClass,newClass) {
          removeClass(element,oldClass)
          addClass(element,newClass)
}


function isVisible(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

export default {

  components: {
    'db-system-edit': DBsystemEdit
  },
  props: ['visible'],
  data () {
    return {
      moduleName: 'db-system',
      saveNow: false,
      IsDialog: true,

      IsWaiting: false,
      info:'',
      Info: '',

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

      aInfo: [],
      total: 0,
      pagination: {},
      form: {},
      //Moje tabule a data
      currId: null,
      currentRow: null,
      minId: 0, //Pro vklad zaporna ID
  		cols: [
				{ id: "id", title: "ID", cssClasses: "mtd" ,span: 2, isEdit: false, type: "text"  ,props:{visible: 'yes', form: 'no'}},
				{ id: "kod", title: "Kod", cssClasses: "mtd" ,span:2, isEdit: true, type: "number",props:{visible: 'yes', form: 'yes',span: 10,spanTitle: 2, newRow: 1,focus:1}},
        { id: "name", title: "Name", cssClasses: "mtd", span: 3, isEdit: true, type: "text" ,props:{visible: 'yes', form: 'yes',span: 10,spanTitle: 2, newRow: 0,focus:0}},
        { id: "struct", title: "Struktura", cssClasses: "mtd", span: 5, isEdit: true, type: "textarea" ,props:{visible: 'yes', form: 'yes' ,span: 20,spanTitle: 2, newRow: 1,focus:0}},
        { id: "index_name", title: "Index", cssClasses: "mtd", span: 5, isEdit: true, type: "textareaArray" ,props:{visible: 'yes', form: 'yes',span: 20,spanTitle: 2, newRow: 1,focus:0}},
        { id: "reindex", title: "ReInd", cssClasses: "mtd", span: 2, isEdit: true, type: "number" ,props:{visible: 'yes', form: 'yes' ,span: 20,spanTitle: 2, newRow: 1,focus:0}},
        { id: "initq", title: "Start", cssClasses: "mtd", span: 4, isEdit: true, type: "textareaArray" ,props:{visible: 'no', form: 'no',span: 20,spanTitle: 2, newRow: 1,focus:0}},
        //{ id: "time_insert", title: "CasVkladu", cssClasses: "mtd", span: 5, isEdit: false, type:"datetime-local" ,props:{visible: 'no'}},
        //{ id: "user_insert", title: "KdoVkladu", cssClasses: "mtd", span: 4, isEdit: false, type: "text" ,props:{visible: 'no'}},
			],
      list: [],
      listNewLine: [], //Prazdna radka - automaticky se vygeneruje a vymaze podle prvni nactene radky
      listEdits: [],   //Prehled zmen s prinakem edit, delete
      lastSort: ['id','asc']  //Obsahuje hodnoty klic, smer, vychozi je id , asc,nebot toto je vsude
    }
  },
  async mounted () {

//    return
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
      this.list = (await DBsystem.all(this.user,'nic')).data


      if (!this.list.length || this.list.length == 0){
        this.list =[{
          id: -1,
          kod: 100,
          name:'Nova'
        }]

        this.newLine()
        this.IsWaiting = false
        return


      }



      //this.newLine()


      this.IsWaiting = false

      //this.aInfo.push=this.list[0]
      /*
      var x

      for(x in this.list[0]) {
          this.aInfo[x]=''

      }
          this.aInfo['id']=-1
//          this.list.unshift(this.aInfo)
     */

    }

        var new_id ='c9902_r_'+0+'_c_'+1
              //alert(new_id)
        setTimeout(function(){
             var newObal= document.getElementById('d'+new_id.substring(1))
              this.isWrite =false
            //  document.getElementById(new_id).focus()
             // document.getElementById(new_id).click()
              document.getElementById(new_id).setAttribute('readonly',true)
              removeClass(document.getElementById(new_id),"bila2")
              if (!document.getElementById(new_id).type== 'number' ) {
                document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
              }

            //setTimeout(function(){


              changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()

         },200)



  },

  created () {
    var self=this

setTimeout(function(){
    document.getElementById("m9901").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t9901").style.height=Math.round(window.innerHeight - 140)  + "px"
    document.getElementById("t9902").style.height=Math.round(window.innerHeight - 270)  + "px"

    document.getElementById("t9902").addEventListener('keydown', (function(e) {

             self.obsluha(e, e.target)
      }))

    document.getElementById("t9902").addEventListener('click', (function(e) {

             self.obsluha(e, e.target)
      }))
    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  },100)

  window.addEventListener('resize', (function() {
    document.getElementById("m9901").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t9901").style.height=Math.round(window.innerHeight - 140)  + "px"
    document.getElementById("t9902").style.height=Math.round(window.innerHeight - 270)  + "px"
    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  })

  )
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
    if (document.getElementById("t9902")){
        ///nejde
      //document.getElementById("t9902").removeEventListener(document.getElementById("t9902"),'keydown')

    }
    // alert('destos'+document.getElementById("t9902"))
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
   async saveLines(id){
     //this.aInfo=[]
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
        aTmp.push({id: el.id,kod: el.kod, name: el.name,struct: el.struct,index_name: el.index_name,reindex: el.reindex, initq: el.initq })
        Posli.push(aTmp)
       }
     })

     await DBsystem.insert(this.user, {data: Posli, del: aDel })
     .then (res => {

     })
     .catch((e) =>{
       alert('Doslo k chybe pri kontrole databaze'+ e)

     })
     //return
      var neco = []

     try {
      this.list = (await   DBsystem.all(this.user,'nic')).data
        //alert(this.lastSort[0]+"/"+this.lastSort[1])
        if (this.lastSort[1]=='desc'){
           this.list = _.sortBy(this.list,this.lastSort[0]).reverse()
        } else {
          this.list = _.sortBy(this.list,this.lastSort[0])
        }

      if (isInsert == true ){
        this.list = _.sortBy(this.list,'id').reverse()

        ////
        var new_id ='c9902_r_'+0+'_c_'+1
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
              changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()
         },200)

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

   async newLine ()  {
     var x
      this.listNewLine = []

      this.Max = (await DBsystem.all(this.user,'max')).data[0].kod*1 +10
      alert(this.Max)


      for(x in this.list[0]) {
        //  this.aInfo[x]=null
          this.listNewLine[x]=null
      }
          this.minId = this.minId -1
          this.listNewLine['id']= this.minId

          this.listNewLine['kod'] = this.Max + Math.abs(this.minId)
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
              new_id ='c9902_r_'+idx+'_c_'+1
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
   deleteLine(nRow) {
     const self = this
    //  if (confirm('Vymazat zaznam? '+nRow + "  id:" +this.list[nRow].id )) {
    //    this.listEdits.push([this.list[nRow],'delete'])
    //    this.list.splice(nRow,1)
    //  }

    //  return

      var xId = this.list[nRow].id
      var tmpI = -1000000
     this.$confirm('Vymazat zaznam' + this.list[nRow].id+"/"+this.list[nRow].kod+"/"+this.list[nRow].name, '',{
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
       new_id='c9902_r_'+(self.list.length -1)+'_c_'+1
     }
     if (top == true) {
       new_id='c9902_r_'+(0)+'_c_'+1
     }

    if (next == true) {
       new_id='c9902_r_'+(nRow)+'_c_'+1
     }

        if (new_id > '')  {

            //alert(newObal + "/ " + new_id)

          setTimeout(function(){
            if (!document.getElementById(new_id)){
                alert(new_id + 'neco je sptane' + eof + "top " + top + "next "+next )
                new_id='c9902_r_'+(self.list.length -1)+'_c_'+1
            }
              var newObal= document.getElementById('d'+new_id.substring(1))

              this.isWrite =false
            //  document.getElementById(new_id).focus()
             // document.getElementById(new_id).click()
              document.getElementById(new_id).setAttribute('readonly',true)
              removeClass(document.getElementById(new_id),"bila2")
              if (!document.getElementById(new_id).type == 'number') {
                document.getElementById(new_id).selectionEnd = document.getElementById(new_id).selectionStart
              }

            //setTimeout(function(){


              changeClass(newObal,'dcell','dcell_edit')
              document.getElementById(new_id).focus()
      /*
              var e = new Event("keyup");
              // e.key="a";    // just enter the char you want to send
              //e.keyCode=e.key.charCodeAt(0);
              e.keyCode=27
              e.which=e.keyCode;
              e.altKey=false;
              e.ctrlKey=false;
              e.shiftKey=false;
              e.metaKey=false;
              //e.bubbles=true;
              //document.dispatchEvent(e);
              document.getElementById(new_id).dispatchEvent(e);
              //alert('escpe')
            //},1000)

       //       document.getElementById(new_id).select()
       */

          },200)
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
             //this.aInfo.push(el.id)
             //this.aInfo.push(this.list[k])
             return
           }

         })

       }

     }
   },
   obsluha (e)  {

     var self = this
     var rows = this.list.length - 1
     var cols = this.cols.length - 1

     const el=e.target
     if (el.type=="button" || !el.type) {

       return
     }


     var isPresun =false
     var elObalId = 'd'+ el.id.substring(1)
     var elObal = document.getElementById(elObalId)
     var aEl = el.id.split('_')
     var curRow = aEl[2]*1
     var curCol = aEl[4]*1
     var newId =  aEl[0]+'_r_'
     var isEdit = self.cols[curCol].isEdit

    var ekeyCode           = e.keyCode
    var eshiftKey          = e.shiftKey
    var keyCodes           = Array()
    var keyCodesExitSave   = Array()
    var keyCodesExitEscape = Array()

    if (e.type=='click') {
      ekeyCode = -13
    }

    keyCodesExitSave   = [13,9,-13]
    keyCodesExitEscape = [27]

    // var keyCodesExitSave =


    if (!self.isWrite && ekeyCode==13 && e.metaKey){
      //alert('Savez')
      this.saveLines(0)
      if (!el.type == 'number') {
        el.selectionEnd = el.selectionStart
      }
      return
    }

    if (!self.isWrite && (ekeyCode == 46 || ekeyCode == 8 )) {
      this.deleteLine(curRow)
      return
    }

    if (!self.isWrite && ekeyCode == 90 && e.metaKey && self.listEdits.length>0){
//       this.$alert(ekeyCode)
       this.backLines()
       return
    //  this.deleteLine(curRow)

    }

   //self.aInfo.push([ekeyCode])
   //return
    if (document.getElementById('search_9901') && ekeyCode == 114 ){
       document.getElementById('search_9901').focus()
     }
    keyCodes = keyCodes.concat([13,27,9,-13])
    keyCodes = keyCodes.concat([40,37,38,39])  //Sipky
    keyCodes = keyCodes.concat([33,34,35,36])  // PedzDaun, pedzAp. End,Home

    //
    if (self.isWrite) {
      var isReturn = true
      if (keyCodesExitSave.indexOf(ekeyCode)>-1) {
//        self.aInfo.push(["ExitSave",curCol,curRow])
        self.isWrite = false
        // this.cols[curCol].id

      if (self.list[curRow][self.cols[curCol].id]!=el.value) {
         var prev = self.list[curRow][self.cols[curCol].id]
          // alert('eee' + prev + "/ "+self.list[curRow])
          var oldRecord = Array()
          var y
          for (y in self.list[curRow]) {
              oldRecord[y] = self.list[curRow][y]
          }

          //self.listEdits.push([self.list[curRow],'edit',prev])
          //alert('tady')
          self.listEdits.push([oldRecord,'edit',prev])
          var eLen= self.listEdits.length-1

          //self.listEdits[eLen][self.cols[curCol].id] = prev

          self.list[curRow][self.cols[curCol].id]=el.value
          //self.aInfo.push(self.listEdits)
          //self.aInfo.push(oldRecord)


       }


        el.setAttribute('readonly',true)
        removeClass(el,"bila2")
        isReturn = false

      }


      if (keyCodesExitEscape.indexOf(ekeyCode)>-1) {
        self.isWrite = false
        el.setAttribute('readonly',true)
        changeClass(elObal,'dcell','dcell_edit')
        removeClass(el,"bila2")
        el.value = this.list[curRow][this.cols[curCol].id]
//        elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
        return true

        el.focus()
      }

      if (ekeyCode==13){
          ekeyCode=40
        }
        if (isReturn == true) {
          return true
        }

    }

   //self.aInfo = aEl
   //self.aInfo.push(keyCodes)
   //self.aInfo.push(ekeyCode)
   //  self.aInfo.push([rows, cols])
   //  self.aInfo.push(['Target: '+ el.id])
   //  self.aInfo.push([elObalId])
   //  self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + this.isWrite])


     this.info=rows+  "/ " +  cols

     if (Math.abs(ekeyCode) == 13 ) {
       //el.className=el.className.replace(/cell/,'cell_edit')
      if ( el.hasAttribute('readonly') && isEdit ) {
          el.removeAttribute('readonly')
          addClass(el,"bila2")
          el.select()
          ///self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + this.isWrite])
          // el.selectionEnd = el.selectionStart;
          self.isWrite = true
      }
     }

     el.onfocus = ( function () {

        // self.aInfo.push(['1. elObaId', elObalId, ' Obal ', elObal ])
        //elObal.className=elObal.className.replace(/dcell/,'dcell_edit')
        //elObal.className=elObal.className.replace(/dcell_edit/,'').trim()
        //elObal.className=elObalNew.className.replace(/dcell/,'').trim()

        el.style.color="black"
        if (!self.isWrite) {
          if(!el.type == 'number') {
            el.selectionEnd = el.selectionStart
          }

        }

     })

     el.onchange = ( function () {

        if (self.saveNow==true ){
          //alert('change' + el.id)
          self.saveLines(0)
        }



        el.style.color="green"
        return

       if (self.list[curRow][self.cols[curCol].id]!=el.value) {
          self.listEdits.push([self.list[curRow],'edit'])
          self.list[curRow][self.cols[curCol].id]=el.value
       }

       // self.listEdits.push([self.list[curRow],'edit'])
        //self.aInfo.push(self.list[curRow])


     })


     el.onblur = ( function(){
       //el.setAttribute('readonly',true)
       //el.className=el.className.replace(/cell_edit/,'cell')
       elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
       el.style.color="black"


       if ( !el.hasAttribute('readonly') && curRow < self.list.length && self.list[curRow][self.cols[curCol].id]!=el.value) {
          //alert('tady :' + el.hasAttribute('readonly'))
          self.listEdits.push([self.list[curRow],'edit'])
          self.list[curRow][self.cols[curCol].id]=el.value

       }
       el.setAttribute('readonly',true)
       removeClass(el,"bila2")
       //alert('aaa' + ekeyCode+ el.value)

     })
     switch (ekeyCode) {

       case 40: //Sipka dolu
       if (curRow < rows) {
          newId +=  (curRow + 1) + '_c_' +curCol
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          isPresun = true
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
       }
       break;
       case 34: //pgDn
        var tmpRow=curRow + 6
        var tmpNewId = newId
        newId +=  (tmpRow) + '_c_' +curCol

       while (tmpRow >= self.list.length && tmpRow>-1){
          tmpRow--
          newId = tmpNewId
          newId +=  (tmpRow ) + '_c_' +curCol

          if (document.getElementById(newId)){
            //alert(newId)
            break;
          }
        }
        setTimeout(function(){

          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          addClass(elObal,'dcell')
          addClass(newObal,'dcell_edit')


          changeClass(elObal,'dcell_edit','dcell')
          changeClass(newObal,'dcell','dcell_edit')
          removeClass(elObal,'elevation-20')
          addClass(newObal,'elevation-20')


          isPresun = true
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
         },100)

        break;
        case 33: //pgUp
        var tmpRow=curRow - 6
        var tmpNewId = newId
        newId +=  (tmpRow) + '_c_' +curCol

       while (tmpRow <0 && tmpRow<self.list.length ){
          tmpRow++
          newId = tmpNewId
          newId +=  (tmpRow ) + '_c_' +curCol

          if (document.getElementById(newId)){
            //alert(newId)
            break;
          }
        }
        setTimeout(function(){

          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          addClass(elObal,'dcell')
          addClass(newObal,'dcell_edit')


          changeClass(elObal,'dcell_edit','dcell')
          changeClass(newObal,'dcell','dcell_edit')
          removeClass(elObal,'elevation-20')
          addClass(newObal,'elevation-20')


          isPresun = true
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
         },100)

        break;
        case 38: //Sipka nehoru
       if (curRow > 0) {
          newId +=  (curRow - 1) + '_c_' +curCol
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          addClass(newObal,'elevation-20')
          removeClass(elObal,'elevation-20')

          isPresun = true
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
          // alert(document.getElementById(newId))
       }

        break;
      case 37: //Sipka left
       if (curCol > 0) {
          newId +=  (curRow ) + '_c_' +(curCol - 1)
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          addClass(newObal,'elevation-20')
          removeClass(elObal,'elevation-20')

          isPresun = true
          // alert(newId)
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
          // alert(document.getElementById(newId))
       }
//        this.aInfo.push('ESC')
        break;


      case 39: //Sipka right
       if (curCol < cols) {
          newId +=  (curRow ) + '_c_' +(curCol + 1)
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          addClass(newObal,'elevation-20')
          removeClass(elObal,'elevation-20')
          isPresun = true
          // alert(newId)
          try {
          document.getElementById(newId).focus()
          } catch(e){
            console.log('nFofus', ekeyCode)
          }
          // alert(document.getElementById(newId))
       }
        //this.aInfo.push('ESC')
        break;
    case 9: //Tabulator
       var newCol = 0
       if (!eshiftKey){
        if (curCol < cols && !eshiftKey ) {
           newCol = curCol + 1
           newId +=  (curRow ) + '_c_' +(newCol)
         }


        if (curCol == cols && !eshiftKey ) {
        if (curRow < rows) {
           newCol =  1
           newId +=  (curRow + 1) + '_c_' +(newCol)
         }
        if (curRow == rows) {
           self.newLine()
           newCol =  1
           newId +=  (curRow + 1) + '_c_'+(newCol)


           return
         }
        }
       }

       if (eshiftKey) {
        if (curCol <= cols && curCol > 0 ) {
          newCol = curCol - 1
          newId +=  (curRow ) + '_c_' +(newCol)
        }
        if (curCol == 0 && curRow>0) {
          newCol = cols - 1
          newId +=  (curRow -1 ) + '_c_' +(newCol)
        }

        if (curCol == 0 && curRow==0) {
          //newCol = colls - 1
          newId +=  (curRow  ) + '_c_' +(newCol)
        }

       }



          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          isPresun = true
          // alert(newId)

          if ( self.cols[newCol].isEdit && document.getElementById(newId).hasAttribute('readonly') ) {
          document.getElementById(newId).removeAttribute('readonly')
          document.getElementById(newId).focus()
          document.getElementById(newId).select()
          addClass(document.getElementById(newId),"bila2")

          // element.selectionEnd = element.selectionStart;


          // self.aInfo.push(["Klavesa" + e.keyCode,"IsWrite: " + this.isWrite])
          this.isWrite = true
          } else {
            document.getElementById(newId).selectionEnd = document.getElementById(newId).selectionStart;
            document.getElementById(newId).focus()
          }


        break;

       default:
        break;
     }

     if (keyCodes.indexOf(ekeyCode)>-1){
       e.preventDefault()
       e.stopPropagation()
       e.stopImmediatePropagation()
     }
/*
      if (this.isWrite == true && isPresun == true ) {
       document.getElementById(newId).className=el.className.replace(/cell/,'cell_edit')
       document.getElementById(newId).removeAttribute('readonly')
      }
*/
       // this.isWrite = true



     // 40 sipka dolu, 38 sikpa nahoru, 37 left, 39 right

     //
   },


   currid (itemId, colid) {
       this.currId = itemId
       this.colId = colid
    },
    groupFind(element){
    var lRet = false
    var elstr=''
    var seekStr=['id', 'name', 'kod','user_insert']
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
      this.list = (await DBsystem.all(this.user,nic)).data
      this.total = this.list.length
      this.IsWaiting = false
    },
    deleteRow(index, rows) {
      if (confirm('Vymazat ?')){
        rows.splice(index, 1);
      }
      },
    async appendRow(index,rows) {
       alert('Append Rows Smazat? ',index)
       //this.aInfo=rows[index]
       console.log(rows[0])
       for (var x in rows[0]){
         this.form[x] = rows[0][x]
       }
        console.log("FORM:", this.form)
      try {
        await (DBsystem.insert(this.user, this.form))

      } catch (err) {
        console.log(err)
      }

      await DBsystem.all(this.user,'nic')
      .then(res => {

        //this.info= res
        this.list = res.data

        /*
          var x
          for(x in this.list[0]) {
              this.aInfo[x]=''
          }
          this.aInfo['id']=-1

          this.list.unshift(this.aInfo)
           */

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
