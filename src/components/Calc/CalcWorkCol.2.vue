<template>
  <!-- <tr style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
     <div style="font-size:100%; min-height:20px;border:1px solid black" class="pt-0 pl-0 ml-1 pb-1 "
     :class="{'brown lighten-3': getType()=='Mat1','green lighten-1': getType()=='Laminace','orange lighten-1': getType()=='Kasir','yellow lighten-2': getType()=='Rezani','   lighten-2': getType()=='Rezani'
     , 'green lighten-2': getType()=='Baleni', 'red lighten-2': getType()=='Jine'}"
     @click="setKalk(kalkulaceid)"
     >
     <!--- aboslutne pozicivany nabidky !-->
    <span v-if="kalkulaceid==KalkulaceThis">
      <win-dow v-if="false && getType()=='Baleni'"
          id="a"
          :id="'id_'+getIndex()+'_id'"
          :title="getType()"
          :x="200 * getIndex()"
          :w="400"
          :y="300 + 30* getIndex()"
          :z="0"
          :h="251"
          :parent="false"
          :maximize="false"
          :demo="false"
          >
        <div>OKNO {{getType()}} / {{getId()}} {{ kalkulaceid}}</div>
        <div>budik {{ info }}</div>
        <div>s2: {{ filtrDataStro1 }}</div>
      </win-dow>

<!---Materialy - rezani nema k dispozici !!!1//-->
     <div style="max-height:250px;overflow-y:scroll;position:absolute;z-index:1000"  v-if="form.showtxt && (getType()=='Mat1'  || getType()=='Laminace' || getType()=='Kasir'  )
            && (filtrData().length>1 || (filtrData().length==1 && filtrData()[0].nazev!=form.txt) )
        " class="elevation-12 yellow"
        :style="'top:'+ getBottom('seek1_'+ID)+'px;width:'+getWidth('seek1_'+ID,20)+'px;left:'+getLeft('seek1_'+ID,-5)+'px'" >
        <!-- {{ filtrData()}} -->
          <table  width="100%" v-if="form.showtxt &&  (getType()=='Mat1'  || getType()=='Laminace' || getType()=='Kasir' )" >
             <tr class="mt-1 green" v-for="(item, i) in filtrData()" :key="i" >
              <td >
              <v-card class="silver" style="width:95%;" >
                <a>
                <table style="width:100%"><tr><td style="width:80%">
                <v-card-text style="font-size:80%;text-align:left;width:100%" @click="form.txt= item['nazev']; form.showtxt=false; setCol(item)"
                :class="{'blue lighten-5':item['poradi']==1, 'orange lighten-5':item['poradi']>1}"
                >
                 {{ item['nazev']}} {{ getType()}}
                 </v-card-text>
                 </td><td style="width:20%;height:100">
                 <v-card-text style="font-size:80%;text-align:left;width:100%;height:100%" @click="form.txt= item['nazev']; form.showtxt=false; setCol(item)"
                 :class="{'blue lighten-5':item['poradi']==1, 'orange lighten-5':item['poradi']>1}"
                >
                 <!-- {{item['sirka_mm']}} x {{ item['vyska_mm']}} -->
                 {{item['zkratka']}}
                 </v-card-text>
                 </td></tr></table>
              </a>
              </v-card>
              </td>
            </tr>
          </table>
        </div>
        <!--Materilay EOF//-->

        <!--LAMINACE, rezani, baleni - stroj mody!!!//-->
        <!--    // && ( filtrDataStroj().length>1|| (filtrDataStroj().length==1 && filtrDataStroj()[0].nazev!=form.txtStroj) //-->
        <div style="min-height:5px;max-height:250px;overflow-y:scroll;position:absolute;z-index:51001"
        v-if="form.showtxtStroj && (getType()=='Laminace' || getType()=='Kasir' ||  getType()=='Rezani' || getType()=='Baleni') && filtrDataStro.length > 0" class="elevation-12 teal"
          :style="'top:'+ getBottom('seek2_'+ID)+'px;width:'+getWidth('seek2_'+ID,20)+'px;left:'+getLeft('seek2_'+ID,-5)+'px'">
          <span style="display:none">FF {{ filtrDataStro.length}}</span>
        <span style="display:none">
         {{ filtrDataStro}}
         <!-- {{ getBottom('seek2_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtStroj && (getType()=='Laminace' || getType()=='Kasir' ||  getType()=='Rezani' || getType()=='Baleni') " >
             <tr class="mt-1 green" v-for="(item1, i1) in filtrDataStro" :key="i1" >
              <td >
              <v-card class="silver" style="width:95%;" >
                <a>
                <table style="width:100%"><tr><td style="width:100%">
                <v-card-text style="font-size:80%;text-align:left;width:100%" @click="form.txtStroj= item1['nazev']; form.showtxtStroj=false; setColStroj(item1)"
                :class="{'blue lighten-5':1==1, 'orange lighten-5':1>1}"
                >
                  {{ item1['nazev'] }}
                 </v-card-text>
                 </td></tr></table>
                </a>
              </v-card>
              </td>
            </tr>
          </table>
        </div>
      <!--LAMINACE//-->

      <!--Jen stroj - stroj//-->
        <!--    // && ( filtrDataStroj().length>1|| (filtrDataStroj().length==1 && filtrDataStroj()[0].nazev!=form.txtStroj) //-->
        <div style="min-height:5px;max-height:250px;overflow-y:scroll;position:absolute;z-index:510015"
        v-if="form.showtxtStroj1 && ( getType()=='Rezani' ) && filtrDataStro1.length > 0 "  class="elevation-0 blue"
        :style="'top:'+ getBottom('seek3_'+ID)+'px;width:'+getWidth('seek3_'+ID,20)+'px;left:'+getLeft('seek3_'+ID,-5)+'px'">
         <span style="display:none">FF {{ filtrDataStro1.length}}</span>
        <span style="display:none">
         {{ filtrDataStro1}}
         <!-- {{ getBottom('seek2_'+ID) }} {{ Col.dataStroj}} -->
        </span>
          <table  width="100%" v-if="form.showtxtStroj1 && (  getType()=='Rezani' || getType()=='Baleni') " >
             <tr class="mt-1 green" v-for="(item1, i1) in filtrDataStro1" :key="i1" >
              <td >
              <v-card class="silver" style="width:95%;" >
                <a>
                <table style="width:100%"><tr><td style="width:100%">
                <v-card-text style="font-size:80%;text-align:left;width:100%" @click="form.txtStroj1= item1['nazev_stroj']; form.showtxtStroj1=false; setColStroj1(item1)"
                :class="{'blue lighten-5':1==1, 'orange lighten-5':1>1}"
                >
                   {{ item1['nazev_stroj'] }}
                 </v-card-text>
                 </td></tr></table>
                </a>
              </v-card>
              </td>
            </tr>
          </table>
        </div>
      <!--Jen stroj - stroj//-->
     </span>
     <!--- aboslutne pozicivany nabidky !-->
    <form >
        <!-- jen rezani - je nehore, nebor stroj je prvni v nabicce je li pozadavekem//-->
          <v-card style="width:100%;float:none" class="pa-0 ma-0" v-if="getType()!='Jine' && getType().match(/Rez/)">
          <v-card-text style="width:100%;z-index:900000" class="pa-1" >
            <input type="text" v-model="form.txtStroj1" size="mini"  style="width:100%; height:15px" class="tdl tdn elevation-0" :placeholder="'Hledani Stroj1'+ getType()+ ' '+ID"
                @focus="fokus('stroj1')"
                @click="fokus('stroj1')"
                @keydown="fokus('stroj1');filtrDataStroj1()"
                :id="'seek3_'+ID">
         </v-card-text>
         </v-card>
          <!-- jen rezani //-->
         <v-card style="width:100%;float:none" class="pa-0" v-if="getType()!='Jine' && !getType().match(/Mat/)">
         <v-card-text style="width:100%;" class="pa-1" >
            <input type="text" v-model="form.txtStroj" size="mini"  style="width:100%; height:15px" class="tdl tdn elevation-0" :placeholder="'Hledani Stroj'+ getType()+ ' '+ID"
                @focus="fokus('stroj')"
                @click="fokus('stroj')"
                @keydown="fokus('stroj');filtrDataStroj()"
                :id="'seek2_'+ID">
         </v-card-text>
         </v-card>
         <v-card style="width:100%;float:none" class="pa-0"  v-if="getType()!='Jine' && !getType().match(/Rez/) && !getType().match(/Baleni/)" >
            <v-card-text style="width:100%;" class="pa-1" >
              <input type="text" v-model="form.txt" size="mini"
              style="width:100%; height:15px" class="tdl tdn elevation-0"
              :placeholder="'Hledani Mat'+ getType()+ ' '+ID"
              @focus="fokus('mat');form.showtxt=true"
              @click="fokus('mat');form.showtxt=true"
              @keydown="fokus('mat');form.showtxt=true"
              :id="'seek1_'+ID" >
                <!-- {{ getBottom2('seek2_'+ID) }} / {{ getBottom('seek1_'+ID) }} -->
                <!-- {{ filtrDataStroj() }} -->
            </v-card-text>
         </v-card>
         <v-card style="width:100%;float:none" class="pa-0"  v-if="getType()!='Jine' && !getType().match(/Rez/)  && !getType().match(/Baleni/)" >
          <v-card-text style="width:80%;" class="pa-0" >
          <select v-if="getType()!=='Mat1'" v-model="form.tisk"  @change="saveVuexData(); classJarda('sel1_'+ID)" :id="'sel1_'+ID"       @keydown="classJarda('sel1opt_'+ID+'_'+form.tisk)">
            <option v-for="(a,b ) in Tisk"
                :key="a.val"
                :label="a.txt"
                :value="a.val"
                :id="'sel1opt_'+ID+'_'+a.val"
              >
              {{ a.txt }}
            </option>
          </select>
          </v-card-text>
        </v-card>
        <div v-if="getType().match(/Baleni/)">
        <v-card style="width:100%;" class="pa-0"  v-if="getType().match(/Baleni/)" >
          <v-card-text style="width:100%;text-align:left" class="pa-0 pl-0" >
          <select v-if="true || getType().match(/Baleni/)" v-model="form.baleni"  @change="saveVuexData(); classJarda('sel2_'+ID)" :id="'sel2_'+ID"       @keydown="classJarda('sel2opt_'+ID+'_'+form.Baleni)" style="width:40%">
            <option v-for="(c,d ) in Baleni"
                :key="c.val"
                :label="c.txt"
                :value="c.val"
                :id="'sel2opt_'+ID+'_'+c.val"
              >
              {{ c.txt }}
            </option>

          </select>
          <span style="width:50%" v-if="form.baleni==0">
            Cena&nbsp;:&nbsp;<input type="number" v-model="form.naklad_mody" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </span>
          <span style="width:50%" v-if="form.baleni==1">
            Po&nbsp;:&nbsp;<input type="number" v-model="form.naklad_po" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </span>
          <span style="width:50%" v-if="form.baleni==2">
            Pocet&nbsp;:&nbsp;<input type="number" v-model="form.naklad" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </span>
          <span style="width:50%" v-if="form.baleni==3">
            Cena&nbsp;:&nbsp;<input type="number" v-model="form.naklad_cena" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </span>
          </v-card-text>
          </v-card>
          <v-card style="width:40%;float:left" class="pa-0"  v-if="getType().match(/Baleni/)" >
          <v-card-text style="width:100%;text-align:left" class="pa-0 pl-0" >
              Naklad&nbsp;:&nbsp;<input type="number" v-model="form.naklad" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </v-card-text>
          </v-card>

          </div>


        <v-card style="width:100%;float:none" v-if="!getType().match(/Baleni/)">
          <v-card-text style="text-align:left;width:100%;" class="pa-0">
            Naklad&nbsp;:&nbsp;<input type="number" v-model="form.naklad" size="mini"  style="width:30%; height:15px; text-align:right" class="tdl tdn elevation-1 pr-1"  @change="saveVuexData()">
          </v-card-text>
        </v-card>
        <v-card style="width:20%;float:left;display;none" >
          <v-card-text style="text-align:left;width:100%;" class="pa-0">
            <button type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="1==1" ><i class="el-icon-delete" size="mini"></i></button>
          </v-card-text>
        </v-card>
        <v-card class="pa-0">
          <v-card-text style="text-align:left" class="pa-0">
            <input type="text" v-model="form.poznamka"   style="width:85%; height:20px" class="tdl tdn elevation-0 pa-0"  placeholder="Poznamka" @change="saveVuexData()">
          </v-card-text>
        </v-card>

        <slot name="obsah">
         <!-- Slot Menu Leve -->
       </slot>

       </form>
      </div>

  <!-- </div> -->
</template>


<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'

import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import ListStroj from '../../services/ListStrojService'
import SQL from '../../services/fcesql'
import Q from '../../services/query'
import f from '../../services/fce'
import { stringify } from 'querystring';



//enum_strojmod_text

export default {
    props: {
    kalkulaceid: {
      type : Number,
      required: true
    } ,
    sloupecid: {
      type : Number,
      required: false
    },
    typid: {
      type : Number,
      required: true
    },
    neco: {
      type : Number,
      required: false
    }

  },
 data () {

   return {
     //soubory:
        dialogImageUrl: '',
        dialogVisible: false,
        info:'info',
     //soubory
      MenuLeft: [
     ],
     MenuLeftJoin: [
       {key: 0 , text: 'Druh tisku'},
       {key: 1 , text: 'Velkoploch'},
       {key: 2 , text: 'Archovy'},
     ],

     Format: [],

     FormatJoin: [],

      enum_up: [],
      enum_mod:[],
      enum_mod_full:[],

     Tisk: [
       {val:0,txt:'Jednostranny'},
       {val:1,txt:'Oboustranny'},
       {val:2,txt:'Oboustranny ruzny'},
       {val:3,txt:'Bez tisku'},
     ],

     Baleni: [
       {val:0,txt:'Mody'},
       {val:1,txt:'Balit Po'},
       {val:2,txt:'Pocet Baliku'},
       {val:3,txt:'Je mi to jedno'},

     ],


     //

     form: {
       MenuRet :0,
       sirka: 0,
       vyska: 0,
       Format: '',
       nakladks: 0,
       filelist:[],
       tisk:0,
       baleni:0,   //Vyber nabidky


       txt: '',  //polozka hledaniho textu 1,  je vztazena k typu sloupce
       txtStroj1:'',
       txtStroj:'',

       showtxt: true,
       showtxtStroj: true,  //mody stroje
       showtxtStroj1: true, //Jen stroj
       naklad:0,
       //Baleni - polozku naklad

       naklad_mody:0,
       naklad_po:0,
       naklad_cena:0,

       poznamka:'',

       itemSelectedStroj: {},
       itemSelectedStroj1: {},
       itemSelectedMat: {},

       stroj: ''
     },

     ID:0,
     SirkaLast:0,
     VyskaLast:0,

     Interval:0,

     countZmen:0,

     //vuex - odkazy
     Kalk: [],
     Cols: [],
     Col:  [],
     Mat:  [],
     MatVolba: 0,
     filtrDat:[],
     filtrDataStro:[],
     filtrDataStro1:[], //Nazby strrojiu pro rezani


   }
 },
 async mounted () {
   const self = this
     this.ID = Math.round(Math.random() * 198345813)
       //self.Kalk.push(  f.cp(self.Kalkulace[self.k_id()]) )
       //self.Kalk=  f.cp(self.Kalkulace[self.k_id()])
       var neco=JSON.stringify(self.Kalkulace[self.k_id()])
       self.Kalk=JSON.parse(neco)
       self.readVuexData()

       //return;
     // console.log('tagtagtagtagtagtagtagtag',neco )
     // console.log("COL ", JSON.stringify(self.Kalk[0].sloupecid))
     // return
     // self.Kalk.push([self.Kalkulace[self.k_id()]] )  //Nacteni kalkulace
     //self.Cols.push(self.Kalk[0].sloupecid) // Sloupce do samostany promenny abych se neposral z tech tecek
     //self.Cols=self.Kalk[0].sloupecid // Sloupce do samostany promenny abych se neposral z tech tecek
      self.Cols=self.Kalk.sloupecid // Sloupce do samostany promenny abych se neposral z tech tecek
     //self.Col.push( self.Cols);
      self.Col=self.Cols[self.getIndex()] ;

     //console.log("COL 2", JSON.stringify(self.Kalk[0].sloupecid))
     console.log("COL 3", JSON.stringify(self.Col))
  var nNic=0;
  var nNic2=0;

  self.Interval= setInterval(function()  {

     if (nNic2<20){
      nNic++;
      try{


     document.getElementById('seek'+nNic+'_'+self.ID).focus()
     // document.getElementById('seek'+nNic+'_'+self.ID).change()

      var pressthiskey = "q"

      var e = new Event("keydown");
      e.key = pressthiskey;
      e.keyCode = e.key.charCodeAt(0);
      e.which = e.keyCode;
      e.altKey = false;
      e.ctrlKey = false;
      e.shiftKey = false;
      e.metaKey = false;
      e.bubbles = true;
  //    document.dispatchEvent(e);
      document.getElementById('seek'+nNic+'_'+self.ID).dispatchEvent(e)


    } catch(e){

    }
      // document.getElementById('seek'+nNic+'_'+self.ID).dispatchEvent(new KeyboardEvent('keydown',{'key':'a'}));
      if (nNic>=3) nNic = 0;
      nNic2++;
     }
    if (self.getType()!=="Mat1"){
      if (self.filtrDataStro1.length==0 && self.txtStroj1==''){
          self.filtrDataStroj1()
      }
    }
    if (self.getType()=="Rezani"){
        if (self.filtrDataStro.length==0 && self.txtStroj==''){
          self.filtrDataStroj()
        }

    }
    if (self.getType() == "Baleni"){
       self.form.naklad = self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs
    }

  },1500 )

  setTimeout(function()  {
    // alert(self.getType())

      var atmp=[]


      // self.info=self.Kalkulace[self.k_id()].data.FormatSirka
      if (
        self.SirkaLast!=self.Kalkulace[self.k_id()].data.FormatSirka  ||
        self.VyskaLast!=self.Kalkulace[self.k_id()].data.FormatVyska
       ) {
        if (self.Kalkulace[self.k_id()].data.FormatSirka == 0 || self.Kalkulace[self.k_id()].data.FormatVyska == 0 ) {
          return
        }
        self.countZmen++;
        // alert('COL 44 ' + JSON.stringify(self.Col)+" / "+ self.getIndex())

        self.info="zmena " + self.countZmen;
        self.SirkaLast = self.Kalkulace[self.k_id()].data.FormatSirka // this.$store.state.Kalkulace[self.k_id()].data.FormatSirka
        self.VyskaLast = self.Kalkulace[self.k_id()].data.FormatVyska // this.$store.state.Kalkulace[self.k_id()].data.FormatSirka
        //self.info+=self.idefix+"juzr"
        ///self.Col=self.Kalk[self.k_id()][0].sloupecid[self.getIndex()]

        // console.log("COL ", JSON.stringify(self.Col[0].sloupecid))
        console.log("COL 4", JSON.stringify(self.Col))

        var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
        self.q(q1)
        var q2=SQL.getStroj(self.getType())
        if (q2>""){
          //alert(q2)
          self.qStroj(q2)
        }
        //alert("Q#")
        var q3=SQL.getStroj1(self.getType())
        //alert("Q#"+ q3)
        if (q3>""){
          //alert(q3)
          self.qStroj1(q3)

        }

      }


  },1500)


   return


 },




computed: {
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',
      'KalkulaceThis',
      'user',
    ]),

},

 methods: {

   fokus(kdezejsem) {
     const self = this
     console.log("Fokus ", kdezejsem ," ? ")
     //alert('a')
     self.filtrDataStroj();
   },
   async q(qq) {
     const self = this
     var atmp=[]
     // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        //self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.data=atmp;
      } catch(e){
        console.log(e)
      }
   },
   async qStroj(qq) {
     const self = this
     var atmp=[]
      // self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        //self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.dataStroj=atmp;

        console.log("DATA STROJ" , JSON.stringify(self.Col.dataStroj))

        //self.$store.dispatch('saveCols', {id: idK,data: self.Cols })
        //self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'sloupecid['+idCol+'].data' , value: 8822 })

          // self.Kalkulace.push({"a" : 778899})
//        self.Col.data=atmp;

        //self.info = self.Col.data
        //self.Mat=atmp;

      } catch(e){
        console.log(e)
      }

   },
    async qStroj1(qq) { //Jen stroj
     const self = this
     var atmp=[]
      self.info = qq
      try {
       atmp=(await Q.all(self.idefix,qq)).data.data
        //self.info = atmp
        var idCol = self.getIndex()
        var idK = self.k_id()
        self.Col.dataStroj1=atmp; //Jen Stroj
        self.form.dataStro1 = atmp;

        //self.info=atmp;
        console.log("DATA STROJ" , JSON.stringify(self.Col.dataStroj1))

      } catch(e){
        console.log(e)
      }

   },
   classJarda(xId){

     var neco = document.getElementById(xId)
     neco.className="jarda"
     //alert(neco)
   },
   saveVuexData(aa) {
     const self = this



     self.$store.dispatch('replaceKalkCol',{kalkulaceid: self.k_id(), idxCol: self.getIndex(),
     data: {
       mat: self.form.itemSelectedMat,
       stroj: self.form.itemSelectedStroj,
       stroj1: self.form.itemSelectedStroj1,
       naklad: self.form.naklad,
       naklad_mody: self.form.naklad_mody, //Baleni
       naklad_po: self.form.naklad_po,  //Baleni
       naklad_cena: self.form.naklad_cena, //Baleni

       tisk: self.form.tisk,
       baleni: self.form.baleni,
       poznamka: self.form.poznamka
        }} )

   },
   readVuexData() {
     const self = this
     var neco = self.$store.state.Kalkulace[self.k_id()].sloupecid[self.getIndex()]
     self.form.itemSelectedStroj = neco.data.stroj
     self.form.itemSelectedStroj1 = neco.data.stroj1
     self.form.itemSelectedMat   = neco.data.mat
     self.form.naklad           = neco.data.naklad
     self.form.naklad_mody      = neco.data.naklad_mody //Baleni
     self.form.naklad_po        = neco.data.naklad_po //Baleni
     self.form.naklad_cena      = neco.data.naklad_cena //Baleni
     self.form.tisk             = neco.data.tisk
     self.form.baleni           = neco.data.baleni
     self.form.poznamka       = neco.data.poznamka
     if (self.getType() == "Baleni"){
       self.form.naklad = self.$store.state.Kalkulace[self.k_id()].data.FormatNakladKs
     }

     try  {
       self.form.txt       = neco.data.mat.nazev
       //alert( JSON.stringify(neco.data.mat.nazev))
     } catch(e) {
       //alert('nei nazev Matrose')
     }

     try  {
       self.form.txtStroj       = neco.data.stroj.nazev
       //self.form.txtStroj = "ahokj"
       //alert( JSON.stringify(neco.data.stroj) + " / " + neco.data.stroj.nazev)
     } catch(e) {
       console.log('nei nazev stroje ve sloupci ' + self.getType())
     }
     try  {
      self.form.txtStroj1       = neco.data.stroj1.nazev_stroj
       //self.form.txtStroj = "ahokj"
       //alert( JSON.stringify(neco.data.stroj1) + " / " + neco.data.stroj1.nazev_stroj)
     } catch(e) {
       console.log('nei nazev stroje ve sloupci ' + self.getType())
     }

   },
   setCol(itemSelected){
     const self = this
     var aTmp={}
      //alert("Materila " + self.getIndex())
      self.form.itemSelectedMat = itemSelected;
     if (self.getType()=='Mat1' || true ){
       self.saveVuexData();
       // alert("k_id: mators "+ self.getType() +  ' ' +self.k_id())
       return
     }
   },
   setColStroj(itemSelected){

     const self = this
      self.form.itemSelectedStroj = itemSelected;

     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return

     }
   },
   setColStroj1(itemSelected){

     const self = this
      self.form.itemSelectedStroj1 = itemSelected;

     if (self.getType()!=='Mat1'){
         self.saveVuexData();
      return

     }
   },
   filtrData() {
      const self = this
      var neco =[]
      try {
      neco = self.Col.data.filter(el => (
          (
          (el.nazev).toUpperCase().match(self.form.txt.toUpperCase())  || self.form.txt ==''
                ||
          (el.sub).toUpperCase().match(self.form.txt.toUpperCase())  || self.form.txt ==''  )
          ))

       } catch (e) {
         console.log("Asi cekam na materialy")
         var q1=SQL.getMatList(self.Kalkulace[self.k_id()].data.Menu1Value,self.Kalkulace[self.k_id()].data.FormatSirka ,self.Kalkulace[self.k_id()].data.FormatVyska )
         self.q(q1)

       }
      return neco
   },
   filtrDataStroj() {
      const self = this
      var neco =[]
      self.filtrDataStro=[]
      self.info+="B"

      console.log('dataStroj')
      if (self.Col.hasOwnProperty('dataStroj')){
          self.Col.dataStroj.forEach(el=>{
              //console.log(el.nazev);
            if ( self.form.txtStroj ==''){
              neco.push(el)
              self.filtrDataStro.push(el)
              self.form.showtxtStroj=true
            } else
            if (self.form.txtStroj > '' &&  el.nazev== self.form.txtStroj) {
              self.form.showtxtStroj=true
              console.log("Stejny " + self.form.txtStroj + " // " + el.nazev )
              neco=[]
              self.filtrDataStro=[]
              //return ;
            } else
            if (self.form.txtStroj > '' && (el.nazev).toUpperCase().indexOf(self.form.txtStroj.toUpperCase())>=0
            // &&  (el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())
            ) {
              //self.form.showtxtStroj=true
              self.filtrDataStro.push(el)
              neco.push(el)
              //console.log("Pozice" , (el.nazev).toUpperCase().indexOf(self.form.txtStroj.toUpperCase()) , " : ",(el.nazev).toUpperCase() ,  self.form.txtStroj.toUpperCase() )
              //console.log("NECO " , neco)
            }
            //el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())  ||

          })
      //   return self.Col.dataStroj

      } else {
        var q1=SQL.getStroj(self.getType())
          self.qStroj(q1)
          return []
      }


      console.log("Delke neco " , neco.length)
      // self.filtrDataStro=neco;
      // neco = self.Col.dataStroj
      return neco
   },
   filtrDataStroj1() {
      const self = this
      var neco =[]
      self.filtrDataStro1=[]


      console.log('dataStroj1')
      if (self.Col.hasOwnProperty('dataStroj1')){
           self.info+= "A"
          self.Col.dataStroj1.forEach(el=>{

              self.info+= self.form.txtStroj1 //console.log(el.nazev);
            if ( self.form.txtStroj1 ==''){
              self.info+= el.nazev_stroj
              neco.push(el)
              self.filtrDataStro1.push(el)
              self.form.showtxtStroj1=true
            } else
            if (self.form.txtStroj1 > '' &&  el.nazev_stroj== self.form.txtStroj1) {
              self.form.showtxtStroj1=true
              console.log("Stejny " + self.form.txtStroj1 + " // " + el.nazev_stroj )
              neco=[]
              self.filtrDataStro1=[]
              //return ;
            } else
            if (self.form.txtStroj1 > '' && (el.nazev_stroj).toUpperCase().indexOf(self.form.txtStroj1.toUpperCase())>=0
            // &&  (el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())
            ) {
              //self.form.showtxtStroj=true
              self.filtrDataStro1.push(el)
              neco.push(el)
              //console.log("Pozice" , (el.nazev).toUpperCase().indexOf(self.form.txtStroj.toUpperCase()) , " : ",(el.nazev).toUpperCase() ,  self.form.txtStroj.toUpperCase() )
              //console.log("NECO " , neco)
            }
            //el.nazev).toUpperCase().match(self.form.txtStroj.toUpperCase())  ||

          })
      //   return self.Col.dataStroj

      } else {
        var q1=SQL.getStroj1(self.getType())
          self.qStroj1(q1)
          return []
      }


      console.log("Delke neco " , neco.length)
      // self.filtrDataStro=neco;
      // neco = self.Col.dataStroj
      return neco
   },

   getBottom(id,addPoz=10) {
     var neco=200
     var oNeco
     var obal= document.getElementById("obal1_kalkulace")
   //   alert('A' + neco+ " X "+ id + ":"+document.getElementById(id) )
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetTop+oNeco.offsetHeight+ addPoz
       neco = neco - obal.scrollTop
       //console.log("Parent Scroll", oNeco.parentElement.scrollTop," SCROLL 2 ", obal.scrollTop)

       //oNeco.parentElement.style.background='pink'

       //neco = oNeco.offsetTop
   //    alert(neco+ " // "+ id )

     } else {

     }

     return neco;
   },

   getLeft(id,addPoz=10) {
     var neco=500
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetParent.offsetLeft+addPoz


     } else {
     }

     return neco;
   },
   getWidth(id,addPoz=10) {
     var neco=300
     var oNeco
     if (oNeco = document.getElementById(id)) {
       neco = oNeco.offsetWidth+addPoz

       //neco = oNeco.offsetTop
       //alert(neco)

     } else {

     }

     return neco;
   },
   querySearch501(queryString, cb) {  //Nazev
        var n1 = self.Col.Data
        var links = n1
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      handleSelect(item) {
        console.log(item)
      },
    createFilter(queryString) {
        return (link) => {
          if (link.value == null ) {
            return ''
          }
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
   async strojmod() {
     const self = this
     var atmp=[]
     var found = true

     atmp=(await ListStroj.one(this.user,-1,1041)).data.enum_strojmod_full
     self.enum_mod_full = atmp
     if (!atmp.length || atmp.length == 0)  return
     //self.enum_up=atmp
      //console.log(atmp.length)
     //return
     atmp.forEach(el => {
       //console.log(el)
       found = self.enum_up.find( el2=>{
          return el2.text == el.stroj
       })

      if (!found) {

        self.enum_up.push({'text': el.stroj})
      }

     })
      //self.enum_up=atmp
     //if (atmp.
     //this.enum_up
   //  alert(enum_up)
   },

   async matKat() {


   },
  ShowMod(a) {
     const self = this
     console.log(a)
     self.form.stroj = a
   },
   MenuRet(a,b) {
     const self = this
     console.log("a",a)
     self.MenuLeftJoin.forEach(el => {
       if (el.text == a) {
         self.form.MenuRet = el.key
         console.log("ret",self.form.MenuRet)
         return
       }
     })
     //eventBus.$emit('WorkLeft',{key: self.nRet })
     //console.log(a ,"::: ", self.nRet)

   },
   SetFormat(a,b) {
     const self = this
     console.log("a",a)
     self.FormatJoin.forEach(el => {
       if (el.text == a) {
         self.form.sirka = el.sirka*1
         self.form.vyska = el.vyska*1
         self.form.Format = el.text
         //console.log("ret",self.form.MenuRet)
         return
       }
     })
   },

   getType() {
     var cRet=   this.$store.getters.getIdColType(this.kalkulaceid,this.sloupecid)
    return cRet
     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}
   },
   getIndex() {
  //   var idK = k_id()
///     var cType = this.$store.state.Kalulace[idK].sloupecid[sloupecid]
  var kRet=   this.$store.getters.getIdCol(this.kalkulaceid,this.sloupecid)
  return kRet
     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}
   },

getId() {
  //   var idK = k_id()
///     var cType = this.$store.state.Kalulace[idK].sloupecid[sloupecid]

  return this.sloupecid

     //{{ k_id() }} {{ kalkulaceid }} {{ sloupecid }}


   },


   setKalk(idK) {
            this.$store.dispatch('setKalk',idK) //Jen nastavi KalkulaceThis
            //alert(idK)
            //self.$store.dispatch('replaceKalk',{dataAll: self.Kalk})
    },
    k_id() {
  var kRet=   this.$store.getters.getId(this.kalkulaceid)
  return kRet

 },

   //Soubory
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 3, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`renove before ${ file.name }？`);
      }

   //Soubory



 }
}

</script>

<style>
.v-list__tile .v-list__tile--link .v-list__tile--active .theme--light .primary--text {
  z-index: 1000000 !important;
  opacity: 0.5;
  background:black !important;
}
textarea:focus, input:focus{
    outline: 1px dashed;



}
select option div {
/*
    background: greenyellow !important;
    background-color: #fff !important;
    border: 10px dashed #d9d9d9  !important;
    border-radius: 6px !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    width: 98% !important;
    height: 80px !important;
    text-align: left  !important;
    position: relative !important;
    overflow: hidden !important;
  */
}
</style>
<style scoped>
.sloupec {
  vertical-align: text-top;
}

table tr td {
  border:none;
  border-right: solid 0px white;border-bottom: solid 0px white;
  border-collapse:collapse;
}

input {
  border:none;

}

.el-upload-dragger1 {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 98%;
    height: 80px;
    text-align: left;
    position: relative;
    overflow: hidden;
}
select option div {

  background: greenyellow !important;
    background-color: #fff !important;
    border: 1px dashed #d9d9d9  !important;
    border-radius: 6px !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    width: 98% !important;
    height: 80px !important;
    text-align: left  !important;
    position: relative !important;
    overflow: hidden !important;
}
.jarda {
    background: greenyellow !important;
}

</style>


