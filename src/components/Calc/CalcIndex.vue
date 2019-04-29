<template>
  <div style="height:400px">
    <!-- Link:
  <router-link :to="{name: 'col', params: {ktery: 1 }}">Moduly</router-link> -->
    <my-layout>

    <div slot="hlavni">
      {{ KalkulaceThis}} {{ this.$store.state.KalkulaceThis }} /Last {{ KalkulaceLast }}
      <menu-hlavni>

      </menu-hlavni>
    </div>

    <menu-left slot="menuleft"></menu-left>

      <work slot="kalkulace" :typid="1" :kalkulkaceid="iKalk.kalkulkaceid"  v-for="(iKalk ,iK) in aKalkulace" :key="iK" >

     <!-- <work slot="kalkulace" v-for="na in (2 ,20) " :key="na"> -->
        <span slot="leva" >

          <work-left :typid="1" :ID2="ID" :kalkulaceid="iKalk.kalkulaceid">

              <button slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalk(iKalk.kalkulaceid)" >
                <a :name="iKalk.kalkulaceid"></a>
                <i class="el-icon-delete" size="mini"></i></button>
          </work-left>

        </span>
       <!-- <draggable  v-model="iKalk.sloupecid"  :options="{group:{ name:'sloupce' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" > -->
        <div  v-for="(iSloupec,i) in iKalk.sloupecid" :key="i" :slot="'sloupec'+(i+1)"  :ref="iSloupec" :style="'backgroundcolor:blue;display:block'">

            <work-col :typid="1" :kalkulaceid="iKalk.kalkulaceid" :sloupecid="iSloupec.id" >
                <button slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalkCol(iKalk.kalkulaceid, iSloupec)" ><i class="el-icon-delete" size="mini"></i></button>
            </work-col>

        </div>
       <!-- </draggable> -->


     </work>



      <prehled slot="prehled" v-for="(itemP, iP) in aKalkulace" :key="iP">

        <span slot="obsah" >
          <v-btn-toggle v-if="showPrehled==1 && iP==0">
              <v-btn flat value="vyroba">
                Vyroba
              </v-btn>
              <v-btn flat value="expedice">
                Expedice
              </v-btn>
              <v-btn flat value="data">
                Data
              </v-btn>
              <v-btn flat value="vl">
                Vl
              </v-btn>
            </v-btn-toggle>
          <v-card>
            <v-card-text>
              {{(2==2)? itemP.sloupecid: 'prdel1'}} {{ KalkulaceThis  }}
              {{ $store.state.Kalkulace[k_id()].data.Menu2 }}
              {{ $store.state.Kalkulace[k_id()].data.Menu1Value }}<hr>
              {{ $store.state.Kalkulace[k_id()] }}
            </v-card-text>
          </v-card>

        </span>
     </prehled>
     <div slot="odkazy" v-if="aKalkulace.length">
     <!-- <v-pagination
      v-model="Navigace"
      :length="aKalkulace.length"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"

    ></v-pagination> -->
    <draggable  v-model="aKalkulace"  :options="{group:{ name:'Kalkulace' }}"  @start="drag=true" @end="drag=false" :move="chooseItem" >
      <span  v-for="(iKalk0 ,iK0) in aKalkulace" :key="iK0">
      <div style="position:relative;float:left;border: solid 2px white;width:30px;text-align:center;" class="elevation-5">
      <a :href="'#'+iKalk0.kalkulaceid" @click="setKalk(iKalk0.kalkulaceid)" :ref="'ref_'+iKalk0.kalkulaceid" :id="'ref_'+iKalk0.kalkulaceid + ID">

        &nbsp;{{iKalk0.kalkulaceid}}



        </a>
             </div>

      </span>
     </draggable>
      <div :ref="'neco11'"></div>
     </div>
    </my-layout>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getters} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import MyLayout from './CalcMyLayout.vue'
import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue'

import Work from './CalcWork.vue'       // Pracovni cast nahore, obshahuje levou cast a sloupce
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole
import ListStroj from '../../services/ListStrojService'
import f from '@/services/fce'
import query from '../../services/query'
//10411


import Prehled from './CalcPrehled.vue' // Prehledova dole

export default {

 components: {
   'prehled': Prehled,
    'menu-left': MenuLeft,
    'my-layout': MyLayout,
    'work': Work,
    'work-left': WorkLeft,
    'work-col': WorkCol,
    'menu-hlavni': MenuHlavni,

 },
 data () {

   return {
     Navigace: 0,
     Hlavni: 0,
     Left: 0,
     aKalkulace: [],
     KalkulaceThis: - 1,
     KalkulaceLast: - 1,
     CalcCount: 0,
     ColCount: 0,
     showPrehled: 0,
     qtest: [],
     ID: 0,
   }
 },
 watch: {
  aKalkulace :function(a) {
    console.log(a)
    try {
  //    this.$store.dispatch('setKalkulace', this.aKalkulace)
    } catch(err) {
      console.log('jebka')
    }
    //alert('a')
  }
 },

 async created () {
      const self = this
//      alert('Tvorim')
     eventBus.$off('MenuHlavni')
     eventBus.$off('MenuLeft')
     eventBus.$on('kalkulaceDelete',(serverDel) => {
     eventBus.$off('MatCol')
     console.log(serverDel)

     })
     //eventBus.$off()

    eventBus.$on('MatCol', (server) => {
      //alert("Prodam sloupec s materialem")
      console.log('Pridam jej Mt')
      //alert(self.KalkulaceThis)
      //self.$store.dispatch('removeKalkColID', {kalkulaceid: 1, sloupecid: 91} )
      //self.removeKalkCol(0,0)
      setTimeout(function(){
        self.addColMat(server);
      },1000)
      //self.addColMat(server)



    })
     eventBus.$on('MenuHlavni', (server) => {
      self.Hlavni=server.key
      if (server.key == 666) {  //Guma
         self.$store.dispatch('cleanKalk')
         self.aKalkulace = self.$store.state.Kalkulace
         self.KalkulaceThis = -1
         self.KalkulaceLast = -1
         setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }

      if (server.key == 777) {
        //self.aKalkulace=[]
        self.showPrehled=1
        //alert("aaa")
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)
      }

      if (server.key < 11) {
        var beforeK = self.KalkulaceLast
        self.addKalk(server.key)
        //self.addKalkCol()

        var n = 0

        // setTimeout(function(){

        //   alert(self.KalkulaceLast)
        // },5000)
      }
      if (server.key == 11) {

        self.addKalkCol()
        setTimeout(function(){
            eventBus.$emit('enable')
        },1000)


        //addNew(11)
        //self.aKalkulace.push({kalkulaceid: self.aKalkulace.length+1})
      }

      //alert(self.Hlavni)
    })

     eventBus.$on('MenuLeft', (server) => {
      self.Left=server.key
      self.ColCount++
      //self.addCol(server.key)

    })

 },
 async mounted () {

/* Vzor query
    try {
    this.qtest = (await query.all(this.user,'select * from   list_dodavatel limit 100')).data
    } catch (e) {
      console.log(JSON.stringify(e.response.data.error))
    }
    if (this.qtest) {
        qtest.data - obsahuje data
        qtest.fields - obsahuje seznam fields


    }
*/
   this.ID = Math.round(Math.random() * 198345813)
   this.aKalkulace = this.$store.state.Kalkulace
   if (this.aKalkulace.length > 0 && this.aKalkulace[0].kalkulaceid ) {
     this.$store.dispatch('setKalk',this.aKalkulace[0].kalkulaceid)
     this.KalkulaceThis = this.$store.getters.getKalk
     this.KalkulaceLast = this.$store.getters.getKalkLast


//     alert(this.KalkulaceThis )

   }
 },
 beforeEnter: (to, from, next) => {
 //  this.$destroy()
 },
 methods: {
    async strojmod(type) {
     const self = this
     var atmp=[]
     var found = true
     var id_query = -0
//     return
     if ( type == 1 )   { id_query=10411 } //Velkoploch
     if ( type == 2 )   { id_query=10410 } //Archovy
     if ( type == 500 ) { id_query=500   } // Seznam formatu
     if ( type == 501 ) { id_query=501   } // Seznam formatu

    if (type < 500) {
      try {
        atmp=[]
        atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_strojmod_full
      //  alert(atmp[0].stroj+ ' '+ id_query )
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 1' )
        eventBus.$emit('enable')

        console.log(JSON.stringify(e.response.data.error))
        alert(JSON.stringify(e.response.data.error))
        //console.log( e)
      }
    }

    if (type == 500) {
      try {
        atmp=[]
        atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_format
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 2' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    if (type == 501) {
      try {
        atmp=[]
        atmp=(await ListStroj.one(this.user,-1, id_query)).data.enum_matspec
      //  alert(atmp[0].stroj+ ' '+ id_query )
        console.log(atmp)
        return atmp
        //console.log(JSON.stringify(atmp))
      } catch (e) {
        alert('Error 3' )
        eventBus.$emit('enable')
        console.log( e)
      }
    }
    return 0
  //return

   },

   async addKalk (KalkType) {
     const self = this
      var newId = 1
     var tmpData = []
     var KalkulaceLast = self.KalkulaceLast
     let oData = {}
     var nTmp = -1
     if (self.aKalkulace.length > 0){
       self.aKalkulace.forEach(el => {
         if (el.kalkulaceid >= newId) {
           newId = el.kalkulaceid + 1
          }
       })
     }

     try{
       tmpData = (await (self.strojmod(KalkType)))   //MOdy pro V nebo A
       oData.Menu2 =  tmpData
       oData.Menu1 = []
       oData.Menu1Value=''
//       alert(tmpData.length)
       tmpData.forEach((el,idx) => {
        nTmp =  _.findIndex(oData.Menu1, function (o) { return o.text +' '+o.nazev == el.stroj+ ' '+ el.nazev})
        if (nTmp == -1 ) oData.Menu1.push({'text': el.stroj + ' '+ el.nazev })
        if (idx == 0) {
         // oData.Menu1Value = el.stroj + ' '+ el.nazev
           oData.Menu1Value = el.idefix_mod
        }
       })


       try {
       tmpData = (await (self.strojmod(500)))   //MOdy pro V nebo A
       oData.Format      =  tmpData
       oData.FormatMenu1 =  []
       oData.FormatValue =  ''
       oData.FormatSirka =  0
       oData.FormatVyska =  0
       oData.FormatTisk  =  0   //Jednostranny,oboustranny, oboustranny ruzny



       /*
       tmpData.forEach((el,idx) => {
        nTmp =  _.findIndex(oData.FormatMenu1, function (o) { return o.nazev == el.nazev})
        if (nTmp == -1 ) oData.FormatMenu1.push({'text': el.nazev })
        if (idx == 0) oData.FormatValue =  el.idefix
       })
       */

      //  self.$store.dispatch('addKalk', {kalkulaceid: newId,data: oData,type: KalkType, sloupecid:[]})
      //  self.aKalkulace = self.$store.state.Kalkulace
      //  self.setKalk(newId)
       //self.KalkulaceThis = newId
       self.KalkulaceLast = self.$store.getters.getKalkLast
       setTimeout(function(){
         if (self.KalkulaceLast != KalkulaceLast) {

           eventBus.$emit('enable')
           self.KalkulaceThis = self.KalkulaceLast
           // self.defaultStyle(self.KalkulaceThis)
           self.setKalk(self.KalkulaceThis)
            var neco = 'ref_'+self.KalkulaceThis + self.ID
            if (document.getElementById(neco)) {
              document.getElementById(neco).click()
              setTimeout(function() {
                self.addKalkCol('Mat')
                self.addKalkCol('Dok')
                self.addKalkCol('Dok1')
                self.addKalkCol('Dok2')
                self.addKalkCol('Dok3')
              },2000)


          //    document.getElementById(neco).style.color='red'

            }


       }
       },1500)


     } catch (e) {
       console.log(e)
     }

     try{
       tmpData = (await (self.strojmod(501)))   //MOdy pro V nebo A
       oData.Mat      =  tmpData
       oData.MatMenu1 =  []
       oData.MatValue =  ''

      /*
       tmpData.forEach((el,idx) => {
        nTmp =  _.findIndex(oData.MatMenu1, function (o) { return o.nazev == el.nazev})
        if (nTmp == -1 ) oData.MatMenu1.push({'text': el.nazev })
        if (idx == 0) oData.MatValue =  el.idefix_rozmer
       })
      */


       self.$store.dispatch('addKalk', {kalkulaceid: newId,data: oData,type: KalkType, sloupecid:[]})

       self.aKalkulace = self.$store.state.Kalkulace

       self.setKalk(newId)
       //self.KalkulaceThis = newId
       self.KalkulaceLast = self.$store.getters.getKalkLast
       setTimeout(function(){
         if (self.KalkulaceLast != KalkulaceLast) {
          //alert("ted")
          eventBus.$emit('enable')
       }
       },500)


     } catch (e) {
       console.log(e)
     }

      //  self.$store.dispatch('addKalk', {kalkulaceid: newId,data: oData,type: KalkType, sloupecid:[]})
      //  self.aKalkulace = self.$store.state.Kalkulace
      //  self.setKalk(newId)
       //self.KalkulaceThis = newId

     } catch (e) {
       console.log(e)
     }




     console.log("tmpData ", tmpData  )
     //self.aKalkulace.push({kalkulaceid: newId,sloupecid:[]})

   },

   removeKalk (kalkulaceid) {
      const self = this
     // alert(kalkulaceid)
      self.$store.dispatch('removeKalk', kalkulaceid )
      self.aKalkulace = self.$store.state.Kalkulace
      if (self.aKalkulace.length > 0 ) {
        self.setKalk(self.aKalkulace[0].kalkulaceid)
        //self.KalkulaceThis = self.aKalkulace[0].kalkulaceid
      }

   },

  k_id() {
  var kRet=   this.$store.getters.getId(this.KalkulaceThis)
  return kRet


 },
   addColMat() {
     const self =this
     var idK = self.KalkulaceThis-1
     var idK = this.k_id()
     //this.k_id()
//      alert(idK)
  //  return
     //--self.setKalk(idK)

     //self.$store.dispatch('addColMat', {kalkulaceid: self.KalkulaceThis, type: 'Mat'})
     self.$store.dispatch('addColMat', {kalkulaceid: idK, type: 'Mat1'})
        /////self.addKalkCol("Mat");
     self.aKalkulace = self.$store.state.Kalkulace
     // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'FormatSirka' , value: 9999 })

     // alert("Pridma mat na prvni misto")

   },

   addKalkCol (type="X") {
     const self =this
     self.$store.dispatch('addKalkCol', {kalkulaceid: self.KalkulaceThis, type: type})
     self.aKalkulace = self.$store.state.Kalkulace


     return

        var newKalkColId = -1

        self.CalcCount++
   },
   removeKalkCol(kalkulaceid,sloupecid) {

     console.log('Mazu', JSON.stringify(sloupecid) )
     const self= this
     self.$store.dispatch('removeKalkCol', {kalkulaceid: kalkulaceid, sloupecid: sloupecid} )
     //self.KalkulaceThis = kalkulaceid
     self.setKalk(kalkulaceid)



   },

   dropKalk(kalkulaceid) {
     const self = this
      self.aKalkulace.forEach((element,idx) => {
       if ( element.kalkulaceid == kalkulaceid ) {
                  self.aKalkulace.splice(idx,1)
                  return
            }
       });
   },

  defaultStyle(setkalkId) {
    const self = this
    var neco
         self.aKalkulace.forEach(element => {
            neco = 'ref_'+element.kalkulaceid + self.ID
            if (document.getElementById(neco)){
              document.getElementById(neco).style.color="green"
              f.changeClass(document.getElementById(neco),"elevation-12",'elevation-0')
              //f.addClass("elevation-0",'elevation-12')
            }
         })

         if (setkalkId > 0) {

              //alert('b'+self.ID)
               neco = 'ref_'+setkalkId+self.ID
               setTimeout(function(){
               if (document.getElementById(neco)) {
                      //alert('c'+self.ID)
                 document.getElementById(neco).style.color='red'
                 f.changeClass(document.getElementById(neco),"elevation-0",'elevation-12')
                }
           },100)
         }

  },
   dropCol(kalkulaceid, sloupecid) {
     const self = this
     var ref = self.$refs[sloupecid]
  //this.items.$remove(item)
     self.aKalkulace.forEach(element => {
       if ( element.kalkulaceid == kalkulaceid ) {
          element.sloupecid.forEach((elS,idx) =>{
            if ( elS == sloupecid) {
              element.sloupecid.splice(idx,1)
              return

            }
          })

       }

     });
     //alert("drop" )

   },

   setKalk(idK) {
          this.$store.dispatch('setKalk',idK)


           var neco = 'ref_'+idK+this.ID


           //document.getElementById(neco).click()

           this.defaultStyle(idK)

          console.log('setKalk',idK)
   },
   getKalk() {
     return this.$store.getters('getKalk')
   },

   chooseItem: function (event, bEvent) {
      console.log('Choos item: ', event.draggedRect, 'B', bEvent)
      // alert(Object.keys(bEvent))
    },
 },
 computed: {
    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',
      'KalkulaceThis'


    ]),
  },

}

</script>

<style >

.v-list__tile__title {

  font-size:13px;

  padding: 0;
}

.v-list__tile--input .v-select__selection .v-select__selection--comma {
  /*
  font-size:20px !important;
  height: 14px !important;
  */

}
.v-label .theme--light .v-input__slot .v-select__slot .v-label .theme--light .v-select__selections {
  font-size:22px !important;
  height: 14px !important;

}
.v-list__tile {

    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: inherit;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 12px;
    font-weight: 100;
    height: 25px;
    margin: 0;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

}
.v-overflow-btn .v-input__append-inner {
    width: 18px !important;
    height: 18px  !important;
    -ms-flex-item-align: auto;
    align-self: auto;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0;
    padding: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
}

div .v-select__slot {
  height: 22px !important;
  background: lightblue;
  padding: 0px 0px 0px 0px ;



}

input {
    width: 100%;
    height: 14px;
    font-size: 12px;

    margin: 0px;
}
.v-overflow-btn .v-select__selections {
    width: 100%;
    height: 12px;
    font-size: 12px;

    margin: 0px;
    padding: 0px;
}
</style>


