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
</div>
 <div style="height:100%;overflow:scroll" class="mt-0" id="t201">
<el-row  >
  <el-col v-for="( col, i0 ) in cols" :key="col.id" :span="col.span" class="mth">
    {{col.title}}
  </el-col>
 </el-row>

<div style="height:100%;overflow:scroll" class="mt-0" id="t202">
  <el-row v-for="( item, i ) in list" :key="item.id"
      v-bind:class="{  JsemVidet: groupFind(item) , NejsemVidet:  !groupFind(item) }"
  >
  <el-col :span="24">
    	<el-col v-for="col in cols"
			class="mtd"
			:key="col.id"
      :span="col.span"
      >
      {{ item[col.id] }}
    	</el-col>
  </el-col>
  </el-row>
  </div>
  </div>

  <hr>
<div>
  {{ aInfo}}
  <hr>
  {{ info }}
</div>

</el-col>
</el-row>

</template>

<script>
import {mapState} from 'vuex'
import List2Barevnost from '@/services/List2BarevnostService'

export default {
  props: ['visible'],
  data () {
    return {
      IsWaiting: false,
      info:'',
      search:'',

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

setTimeout(function(){
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t201").style.height=Math.round(window.innerHeight - 140)  + "px"
        document.getElementById("t202").style.height=Math.round(window.innerHeight - 170)  + "px"

    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  },100)

  window.addEventListener('resize', (function() {
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t201").style.height=Math.round(window.innerHeight - 140)  + "px"
    document.getElementById("t202").style.height=Math.round(window.innerHeight - 170)  + "px"
    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  })
  )
  },
  watch: {
    pagination: {
      handler () {
        this.my_data()
        alert('watch')
      },
      deep: true
    }
  },
  beforeDestroy (){
      // alert('destory')
  },
  methods: {
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
