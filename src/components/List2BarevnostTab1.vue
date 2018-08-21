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

<el-row><el-col :span="24">
  tohle je rychly ale ma to mouchy
</el-col></el-row>


<div class="box" id="t201" >
						<vue-scrolling-table
							:scroll-horizontal="scrollHorizontal"
							:scroll-vertical="scrollVertical"
							:sync-header-scroll="syncHeaderScroll"
							:sync-footer-scroll="syncFooterScroll"
							:include-footer="includeFooter"
							:dead-area-color="deadAreaColor"
							:class="{ freezeFirstColumn:freezeFirstColumn }">
							<template slot="thead">
								<tr>
									<th v-for="col in columns"
									:class="col.cssClasses"
									:key="col.id">{{ col.title }}</th>
                  <th>Akce</th>

								</tr>
							</template>
							<template slot="tbody" >
								<tr v-for="item in items" :key="item.id"
                v-bind:class="{  JsemVidet: groupFind(item) , NejsemVidet:  !groupFind(item) }"
                >
									<td v-for="col in columns"
										:class="col.cssClasses"
										:key="col.id">
                    <div v-if="currId === item.id && col.id == colId" >
                      <el-input  :value="item[col.id]" class="pa-1" :id="'bar_col'+item.id+col.id" size="mini" ></el-input>
                    </div>
                    <div v-else-if="currId === item.id && col.id != colId" >
                      <el-input  :value="item[col.id]" center size="mini" ></el-input>
                    </div>
                    <div v-else @click.self="currid(item.id, col.id)">
                    {{ item[col.id] }}
                    </div>
                    </td>
                    <td @click.self="currid(item.id,'x')">x</td>

								</tr>
							</template>
							<template slot="tfoot">
								<tr><th colspan="2" ><div class="white black--text">
                  neco<br>neco<br>neco<br>neco<br>neco<br>
                  </div></th></tr>
							</template>
						</vue-scrolling-table>
					</div>

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
      colId: null,
      scrollVertical: true,
			scrollHorizontal: true,
			syncHeaderScroll: true,
			syncFooterScroll: true,
			includeFooter: true,
			deadAreaColor: "#DDDDDD",
			maxRows: 100,
			freezeFirstColumn: false,
			columns: [
				{ id: "id", title: "ID", cssClasses: "" },
				{ id: "kod", title: "Kod", cssClasses: "" },
				{ id: "nazev", title: "Nazev", cssClasses: "w2" },
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
    currid (itemId, colid) {
       this.currId = itemId
       this.colId = colid
    },
    deleteRow(index, rows) {
      if (confirm('Vymazat ?')){
        rows.splice(index, 1);
      }
      },
    async appendRow(index,rows) {

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
		items() {
			return this.list.slice(0, this.maxRows)
		},
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])

  }
}

</script>
<style scoped>
table.scrolling .w2 {
	width: 20em;
	min-width: 20em;
	max-width: 20em;
}
table.scrolling tfoot tr th {
	width: 130em;
	min-width: 130em;
	max-width: 130em;
}
table.freezeFirstColumn thead tr,
table.freezeFirstColumn tbody tr {
	display: block;
	width: min-content;
}
table.freezeFirstColumn thead td:first-child,
table.freezeFirstColumn tbody td:first-child,
table.freezeFirstColumn thead th:first-child,
table.freezeFirstColumn tbody th:first-child {
	position: sticky;
	position: -webkit-sticky;
	left: 0;
}
* {
	font-family: sans-serif;
}
.box {
	clear: both;
	padding: 0;
	min-height: 300px;
	height: 40vh;
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
}

</style>
