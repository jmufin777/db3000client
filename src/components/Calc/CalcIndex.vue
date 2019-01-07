<template>
  <div style="height:400px">
    <!-- Link:
  <router-link :to="{name: 'col', params: {ktery: 1 }}">Moduly</router-link> -->
    <my-layout>

    <div slot="hlavni">
      <menu-hlavni>

      </menu-hlavni>
    </div>

    <menu-left slot="menuleft"></menu-left>

      <work slot="kalkulace" :typid="1" :kalkulkaceid="iKalk.kalkulkaceid"  v-for="(iKalk ,iK) in aKalkulace" :key="iK">

     <!-- <work slot="kalkulace" v-for="na in (2 ,20) " :key="na"> -->
        <span slot="leva">

          <work-left :typid="1" :kalkulaceid="iKalk.kalkulaceid">

              <button slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalk(iKalk.kalkulaceid)" >
                <a :name="iKalk.kalkulaceid"></a>
                <i class="el-icon-delete" size="mini"></i></button>
          </work-left>

        </span>

        <div v-for="(iSloupec,i) in iKalk.sloupecid" :key="i" :slot="'sloupec'+(i+1)" :ref="iSloupec" :style="'backgroundcolor:blue;display:block'">
         <work-col :typid="1" :kalkulaceid="iKalk.kalkulaceid" :sloupecid="iSloupec.id" >
            <button slot="akce" type="button" style="width:30%;height:16px" class="white  px-0 cell" @click="removeKalkCol(iKalk.kalkulaceid, iSloupec)" ><i class="el-icon-delete" size="mini"></i></button>
        </work-col>
        </div>

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
              {{itemP}} {{ KalkulaceThis }}
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
      <span  v-for="(iKalk0 ,iK0) in aKalkulace" :key="iK0">

      <a :href="'#'+iKalk0.kalkulaceid" @click="KalkulaceThis=iKalk0.kalkulaceid" :ref="'ref_'+iKalk0.kalkulaceid">

        &nbsp;{{iKalk0.kalkulaceid}}

        </a> &nbsp;

      </span>
      <div :ref="'neco11'"></div>
     </div>
    </my-layout>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import MyLayout from './CalcMyLayout.vue'
import MenuHlavni from './CalcMenuHlavni.vue'
import MenuLeft from './CalcMenuLeft.vue'

import Work from './CalcWork.vue'       // Pracovni cast nahore, obshahuje levou cast a sloupce
import WorkLeft from './CalcWorkLeft.vue'       // Pracovni cast nahore
import WorkCol from './CalcWorkCol.vue' // Prehledova dole



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
     CalcCount: 0,
     ColCount: 0,
     showPrehled: 0
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

 created () {
      const self = this
//      alert('Tvorim')
     eventBus.$off('MenuHlavni')
     eventBus.$off('MenuLeft')
     eventBus.$on('kalkulaceDelete',(serverDel) => {
     console.log(serverDel)

     })
     //eventBus.$off()
     eventBus.$on('MenuHlavni', (server) => {
      self.Hlavni=server.key
      if (server.key == 666) {  //Guma
         self.$store.dispatch('cleanKalk')
         self.aKalkulace = self.$store.state.Kalkulace
      }

      if (server.key == 777) {
        //self.aKalkulace=[]
        self.showPrehled=1
      }

      if (server.key < 11) {
         self.addKalk()
      }
      if (server.key == 11) {
        self.addKalkCol()
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
 mounted () {
   this.aKalkulace = this.$store.state.Kalkulace
   if (this.aKalkulace.length > 0 ) {
     this.KalkulaceThis = this.aKalkulace[0].kalkulaceid

   }
 },
 beforeEnter: (to, from, next) => {
 //  this.$destroy()
 },
 methods: {

   addKalk () {
     const self = this
     var newId = self.aKalkulace.length+1
     //self.aKalkulace.push({kalkulaceid: newId,sloupecid:[]})
     self.$store.dispatch('addKalk', {kalkulaceid: newId,sloupecid:[]})
     self.aKalkulace = self.$store.state.Kalkulace
     self.KalkulaceThis = newId

   },
   removeKalk (kalkulaceid) {
      const self = this
     // alert(kalkulaceid)
      self.$store.dispatch('removeKalk', kalkulaceid )
      self.aKalkulace = self.$store.state.Kalkulace
      if (self.aKalkulace.length > 0 ) {
        self.KalkulaceThis = self.aKalkulace[0].kalkulaceid
      }

   },
   addKalkCol () {
     const self =this
     self.$store.dispatch('addKalkCol', self.KalkulaceThis)
     self.aKalkulace = self.$store.state.Kalkulace



     return

        var newKalkColId = -1
        if (self.aKalkulace.length && self.aKalkulace.length > 0)  {
          var tmpx=self.aKalkulace.length -1
          self.aKalkulace[tmpx].kalkulaceid  = tmpx+1
          if (!self.aKalkulace[tmpx].sloupecid) {
            self.aKalkulace[tmpx].sloupecid = Array()

          } else {

          }

          self.aKalkulace[tmpx].sloupecid.push((self.aKalkulace[tmpx].sloupecid.length+1)  )
          //self.aKalkulace[tmpx].sloupecid.push((self.aKalkulace[tmpx].sloupecid.length+1) +Math.round(Math.random()*100000) )
        }
        //self.$store.dispatch()
        self.CalcCount++
   },
   removeKalkCol(kalkulaceid,sloupecid) {
     alert(kalkulaceid)
     console.log('Mazu', JSON.stringify(sloupecid) )
     const self= this
     self.$store.dispatch('removeKalkCol', {kalkulaceid: kalkulaceid, sloupecid: sloupecid} )
     self.KalkulaceThis = kalkulaceid



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

   }
 },
 computed: {


    ...mapState([
      'isUserLoggedIn',
      'xMenuMain',
      'level',
      'idefix',
      'compaStore',
      'Kalkulace',


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


