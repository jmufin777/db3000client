<template>
  <!-- <div style="max-height:100px; overflow:auto" class="teal lighten-4 pt-1 "> -->
       <div style="max-height:400px; overflow:auto;font-size:70%" class="orange lighten-5 pt-1 " >

       <button @click="getOld()" class="green elevation-2 pa-2 ">Prevod dat ze stare DB</button>

       tady a zde {{ citac}}
        {{dataNew}} / {{dataOrig.length}}

     </div>

  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
import { setTimeout, clearInterval } from 'timers'
import Q from '../../services/query'
import Qold from '../../services/query_old'
import queryKalk from '../../services/fcesqlKalkulace'
import SQL from '../../services/fcesql'
import f from '@/services/fce'

export default {
  props: {

  },
 data () {
   return {
     dataOrig:[],
     dataNew:[],
     info:'',
     citac:0,

   }
 },
 async mounted(){



 },
 methods: {
   async getOld(){
     const self=this
     var res1 //hlavni
     var tmp1 // mezi vysledky
     var tmp2 // mezi vysledky
     var tmp3 // mezi vysledky
     var tmp4 // mezi vysledky
     var ares2 // Polozky

     var i=2007
     var qI=''
     var aI=[]
     var idfxz=0 //idefix nove zakazky
     self.citac++
     try {
       //res1=  (await Q.post(self.idefix,`delete from zak_t_list`))
       // res1=  (await Q.post(self.idefix,`delete from zak_t_items where vzor= 0`))
      try {
        res1=  (await Q.post(self.idefix,`alter table  zak_t_list add old_kod bigint`))
      } catch (e) {
        console.log('Tvorba polozek 1 jiz je asi todlencto .... hotova vlastne')
       }
      try {
        res1=  (await Q.post(self.idefix,`alter table  zak_t_items add old_kod bigint`))
        } catch (e) {
        console.log('Tvorba polozek 2 jiz je asi todlencto .... hotova vlastne')
       }
      try {
        res1=  (await Q.post(self.idefix,`alter table  zak_t_items add old_kodv bigint`))
        } catch (e) {
        console.log('Tvorba polozek 3 jiz je asi todlencto .... hotova vlastne')
       }
       try {
        res1=  (await Q.post(self.idefix,`create index   zak_t_list_old_kod on zak_t_list (old_kod)`))
        } catch (e) {
        console.log('Tvorba polozek 4 jiz je asi todlencto .... hotova vlastne')
       }



       for (i=2019 ; i > 2009 ; i -- ) {


         self.dataOrig=  (await Qold.all(self.idefix,`select
          c_zam_login(accountrego) as l1,
          c_zam_login(account2) as l2,
          datumexpedice::date::text as datumx,
          *
          from zak_list a where uct_rok=${i} and year(datumexpedice) = uct_rok and datumexpedice is not null and kodzakazkoveholistu <=34573

          order by kodzakazkoveholistu
          limit 50000
         `
         )).data.data


            //select login2idefix('mares') as obchodnik, login2idefix('honza') as produkce ,(select idefix from vazba_firma where id_old = 100 ) as idefix_firma

          await f.asyncForEach(self.dataOrig,async (el)=> {
            qI = `
            select coalesce(login2idefix('${el.l1}'),9) as obchodnik, coalesce(login2idefix('${el.l2}'),9) as produkce
            ,coalesce((select idefix from vazba_firma where id_old = ${el.kodklienta} limit 1),10124) as idefix_firma

            `
            aI=  (await Q.all(self.idefix,qI)).data.data
            if (aI.length<1) {
              f.Alert('Chybak')
              return
            }


            var qIZ = `select * from zak_insert ( ${aI[0].obchodnik},${aI[0].idefix_firma},'${el.datumx}' )`
            var ar  =  (await Q.all(self.idefix,`${qIZ} `)).data.data
             if (ar.length==1){
                 var idfxz=ar[0].idefix
                 var qu=`update  zak_t_list set nazev = '${el.nazev}'
                         ,old_kod= ${el.kodzakazkoveholistu}
                         ,idefix_obchodnik= ${aI[0].obchodnik}
                         ,idefix_produkce= ${aI[0].produkce }
                         ,poznamky= '${el.poznamky }'
                         ,vyrobapopis_print= '${el.vyrobapopis_print }'
                         ,cislofaktury= '${el.cislofaktury }'
                         ,zamek= ${el.zamknuto } =1

                 where idefix = ${idfxz}`
                     tmp1  =  (await Q.post(self.idefix,`${qu} `))

               }



            console.log(qIZ,f.Jstr(ar))


            //Vklad
            //f.Info(qI , f.Jstr(qI), f.Jstr(aI))
             //console.log(qI , f.Jstr(qI), f.Jstr(aI))


                ares2 =  (await Qold.all(self.idefix,`select * from vyroba_prace a where kodzakazky=${el.kodzakazkoveholistu} and pocetkusu > 0 order by kodvyrobaprace`)).data.data
                await f.asyncForEach(ares2,async (el2)=> {
                  var qI=`
                  insert into zak_t_items (
                   old_kod,old_kodv,idefix_zak ,idefix_dod,idefix_prace,idefix_src
                   ,nazev,faktura
                   ,kcks
                   ,marze
                   ,ks
                   ,prodej
                   ,naklad

                  )
                  values
                  (
                    ${el2.kodzakazky},${el2.kodvyrobaprace},${idfxz},0,0,0
                    ,'${el2.prace_txt}','${el2.c_fak}'
                    ,'${el2.cenazakus}'
                    ,'${el2.agenturniodmena}'
                    ,'${parseInt(el2.pocetkusu)}'
                    ,'${el2.rozpocet}'
                    ,'${el2.nakladovacena}'

                  )
                  `
                  try{
                    tmp2  =  (await Q.post(self.idefix,`${qI} `))
                  } catch(e){
                    console.log("ERROR " ,  qI )
                  }




                  console.log( qI )
                }
                )
          })

        console.log('HOTOVO', i )

       }




     } catch(e) {
       f.Alert(f.Jstr(e))
     }



   }
 }


}

</script>


<style scoped>
</style>


