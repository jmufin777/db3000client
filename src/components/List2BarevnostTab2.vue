  <template>
<el-row id="m201" style="overflow:scroll"  class="pa-2" >
  <el-col :span="24">
  <el-row  :gutter="100">
    <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
      <v-progress-linear :indeterminate="true" v-if="IsWaiting" style="position:absolute;top:-10px"></v-progress-linear>
    </el-col>
  </el-row>
  <el-row  :gutter="20">
  <el-col :span="24" :offset="0" style="margin-top:5px;padding-left:10px" >
  <el-input prefix-icon="el-icon-search" autofocus clearable size="mini" v-model="search" placeholder="Prohledat tabulku">
   </el-input>
  </el-col>
  </el-row>
<div>
  Tohle je nejlepsi, muj grig bez tabulky, fixace scroll na divu
  zakladni konvence jarda r- radka, d obal bunky, c -sloupec
</div>
 <div style="height:100%;overflow:scroll" class="mt-0" id="t201">

<el-row  >
  <el-col v-for="( col, i0 ) in cols" :key="col.id" :span="col.span" class="mth">
    {{col.title}}
  </el-col>
 </el-row>

<div style="height:100%;overflow:scroll" class="mt-0" id="t202">
  <el-row v-for="( item, irow ) in list" :key="item.id"
      v-bind:class="{  JsemVidet: groupFind(item) , NejsemVidet:  !groupFind(item) }"
      :id="'d202_r_'+irow"

  >
  <el-col :span="24" >
    	<el-col v-for="(col,icol) in cols"

			:key="col.id"
      :span="col.span"

      >
      <div :id="'d202_r_'+irow+'_c_'+icol"  class='dcell'>

        <input type="text"
        class="white px-4 cell" :id="'c202_r_'+irow+'_c_'+icol"
        :value="item[col.id]" style="width:100%;border:0px" readonly></input>

       </div>

    	</el-col>
  </el-col>
  </el-row>
  </div>
  </div>

  <hr>
<div>
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
  <hr>

</div>

</el-col>
</el-row>

</template>

<script>
import {mapState} from 'vuex'
import List2Barevnost from '@/services/List2BarevnostService'

function hasClass(element, cls) {
    return element.className.split(' ').indexOf(cls) > -1
}

function hasClassId(elementId, cls) {
  return document.getElementById(elementId).className.split(' ').indexOf(cls) > -1
}

function addClass(element, cls) {
  if (! hasClass(element,cls)){
    element.className+=(' ' + cls)
    element.className=element.className.trim()
  }
}

function removeClass(element, cls) {
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
  props: ['visible'],
  data () {
    return {
      IsWaiting: false,
      info:'',

      isWrite: false,
      infoStatus: {
        isFocus: null,
        lastkey: 0,
        blurKey: 0,


      },
      search:'',
      //event
      eTabule: null,
      //event
      aInfo: [],
      total: 0,
      pagination: {},
      currentRow: null,
      form: {},
      //Moje tabule a data
      currId: null,
  		cols: [
				{ id: "id", title: "ID", cssClasses: "mtd" ,span: 4},
				{ id: "kod", title: "Kod", cssClasses: "mtd" ,span:4},
				{ id: "nazev", title: "Nazev", cssClasses: "mtd", span: 16},
			],
      list: []
    }
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      this.IsWaiting = true
      this.list = (await List2Barevnost.all()).data
      this.IsWaiting = false
      //this.aInfo.push=this.list[0]
      var x
      for(x in this.list[0]) {
          this.aInfo[x]=''
      }
          this.aInfo['id']=-1
          this.list.unshift(this.aInfo)
    }
  },

  created () {
    var self=this

setTimeout(function(){
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t201").style.height=Math.round(window.innerHeight - 140)  + "px"
    document.getElementById("t202").style.height=Math.round(window.innerHeight - 270)  + "px"

    document.getElementById("t202").addEventListener('keydown', (function(e) {
           //document.getElementById('btn_user_submit').focus()
           self.obsluha(e, e.target)
      }))



    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  },100)

  window.addEventListener('resize', (function() {
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t201").style.height=Math.round(window.innerHeight - 140)  + "px"
    document.getElementById("t202").style.height=Math.round(window.innerHeight - 270)  + "px"
    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  })

  )
  },
  beforeDestroy () {

    // alert('beforeDestroy')
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
   obsluha (e)  {
     var self = this
     var rows = this.list.length - 1
     var cols = this.cols.length - 1
     const el=e.target
     var isPresun =false
     var elObalId = 'd'+ el.id.substring(1)
     var elObal = document.getElementById(elObalId)
     var aEl = el.id.split('_')
     var curRow = aEl[2]*1
     var curCol = aEl[4]*1
     var newId =  aEl[0]+'_r_'

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

     self.aInfo = aEl
     self.aInfo.push([rows, cols])
     self.aInfo.push(['Target: '+ el.id])
     self.aInfo.push([elObalId])
     self.aInfo.push(["Klavesa" + e.keyCode])


     this.info=rows+  "/ " +  cols

     if (e.keyCode == 13 && el.hasAttribute('readonly')) {
       //el.className=el.className.replace(/cell/,'cell_edit')

       el.removeAttribute('readonly')
       this.isWrite = true
     }
     el.onfocus = ( function () {

        // self.aInfo.push(['1. elObaId', elObalId, ' Obal ', elObal ])
        //elObal.className=elObal.className.replace(/dcell/,'dcell_edit')
        //elObal.className=elObal.className.replace(/dcell_edit/,'').trim()
        //elObal.className=elObalNew.className.replace(/dcell/,'').trim()

        el.style.color="red"

     })

     el.onblur = ( function(){
       el.setAttribute('readonly',true)
       //el.className=el.className.replace(/cell_edit/,'cell')
       elObal.className=elObal.className.replace(/dcell_edit/,'dcell')
       el.style.color="black"

     })
     switch (e.keyCode) {
       case 27:
       if (this.isWrite == true){
          el.setAttribute('readonly',true)
          el.className=el.className.replace(/cell_edit/,'cell')
          elObal.className=elObal.className.replace(/dcell_edit/,'dcell')

          el.focus()
          // window.scrollTo(pageXOffset, 0);

       }
       case 40: //Sipka dolu
       if (curRow < rows) {
          newId +=  (curRow + 1) + '_c_' +curCol
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')

          isPresun = true
          document.getElementById(newId).focus()

       }
        break;
       case 34: //pgDn
       if (curRow < rows) {
         var origId=newId
         for (var i=curRow; i < rows ; i++ ){
          newId +=  (i + 1) + '_c_' +curCol
          var newObalId =  'd'+newId.substring(1)
          self.aInfo.push(["i: "+ i +" newId: " + newId])
          document.getElementById(newId).focus()



          var newObal = document.getElementById(newObalId)
          if (isVisible(newObal) ) {
            addClass(newObal,"oznac")
          //    break;
          }
          if (!isVisible(newObal) ) {
            removeClass(newObal,"oznac")
          //    break;
          }
          newId= origId
          self.aInfo.push(["videti jest? " +newObalId+" "+ isVisible(newObal)])


          /*
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')


          document.getElementById(newId).focus() */

         }
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          //document.getElementById(newId).focus()
          isPresun = true


       }
        break;
        case 38: //Sipka nehoru
       if (curRow > 0) {
          newId +=  (curRow - 1) + '_c_' +curCol
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')

          isPresun = true
          // alert(newId)
          document.getElementById(newId).focus()
          // alert(document.getElementById(newId))
       }
        this.aInfo.push('ESC')
        break;
      case 37: //Sipka left
       if (curCol > 0) {
          newId +=  (curRow ) + '_c_' +(curCol - 1)
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          isPresun = true
          // alert(newId)
          document.getElementById(newId).focus()
          // alert(document.getElementById(newId))
       }
        this.aInfo.push('ESC')
        break;

      case 39: //Sipka right
       if (curCol < cols) {
          newId +=  (curRow ) + '_c_' +(curCol + 1)
          var newObalId =  'd'+newId.substring(1)
          var newObal = document.getElementById(newObalId)
          changeClass(newObal,'dcell','dcell_edit')
          changeClass(elObal,'dcell_edit','dcell')
          isPresun = true
          // alert(newId)
          document.getElementById(newId).focus()
          // alert(document.getElementById(newId))
       }
        this.aInfo.push('ESC')
        break;
       default:
        break;
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
    var seekStr=['id', 'nazev', 'kod']
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
      this.list = (await List2Barevnost.all()).data
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

      await List2Barevnost.all()
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

        //this.info=val.kod
        //this.currId = val.id;


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
      'user'
    ])

  }
}

</script>
<style scoped>
</style>
