  <template>
<div id="m201" style="overflow:scroll;width:750px" class="pa-2" >
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

   <el-table
    id="t201"
    :data="list"
    style="width:100%"
    size="mini"
    height="90%"


    max-height="90%"
    ref="tableColors"
    highlight-current-row
    @current-change="handleCurrentChange"
    @selection-change="handleSelectionChange">
    >
    <el-table-column
      fixed
      type="selection"
      width="55"
      >
    </el-table-column>
    <el-table-column
      fixed
      prop="id"
      label="Id"
      width="100"
      sortable
      >

    </el-table-column>
    <el-table-column
      prop="kod"
      label="Kod"
      width="120"

      select=""
      >
      <template slot-scope="scope">

        <div v-if="currId === scope.row.id ">
          <el-input autofocus v-model="scope.row.kod" type="text" :value="scope.row.kod"  size="mini">{{ scope.row.kod}}</el-input>
          {{ scope.row.kod }} i1: {{ scope.row.index  }}
        </div>
        <div v-else >
            {{ scope.row.kod }} i2: {{ scope.row.index  }}
        </div>

      </template>
    </el-table-column>
    <el-table-column
      prop="nazev"
      label="Nazev"
      width="150">
      <template slot-scope="scope">
        <div v-if="currId === scope.row.id ">
          <el-input v-model="scope.row.nazev" type="text" :value="scope.row.naze"  size="mini">{{ scope.row.nazev}}</el-input>
        </div>
        <div v-else >
            {{ scope.row.nazev }}
        </div>

      </template>
    </el-table-column>


    <el-table-column
      fixed="right"
      label="Akce"
      width="120">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.id > 0"
          @click.native.prevent="deleteRow(scope.$index, list)"
          type="text"
          size="mini"
          >
          Vymaz

        </el-button>
          <el-button
          v-else
          @click.native.prevent="appendRow(scope.$index, list)"
          type="text"
          size="mini"
          >
          Pridej
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <hr>
<div>
  {{ aInfo}}
  <hr>
  {{ info }}
</div>

</div>

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
      headers: [
        {
          text: 'Id',
          align: 'center',
          sortable: true,
          value: 'id'
        },
        { text: 'Kod', value: 'kod' },
        { text: 'Name', value: 'name' }
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

    // document.getElementById("m221").style.height=Math.round(window.innerHeight - 150)  + "px"
  },100)

  window.addEventListener('resize', (function() {
    document.getElementById("m201").style.height=Math.round(window.innerHeight - 110)  + "px"
    document.getElementById("t201").style.height=Math.round(window.innerHeight - 140)  + "px"
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
