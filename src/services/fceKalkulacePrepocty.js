import moment from 'moment'
//import Q from '../../services/query'
import Q from './query'
import f from './fce'
import store from '@/store/store'
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
const { forEach } = require('p-iteration');
//import Vue2 from 'vue'
// export const eventBus = new Vue()

const cols = `
  nazev,

  kcks,
  ks,
  naklad ,
  marze ,
  prodej ,
  marze_pomer,
  obsah
  `

  //--obsah,

export default {

async getNaklad(data) {
  var defer = $.Deferred();
  var nsum = 0
  var ntmp = 0
  //alert(this.getNakladSloupce())

  await data.forEach(async (element,idx )=> {
          ntmp=0 // Zde bude naklad leve strany, pokud bude k dispozici
    if (!f.isEmpty(element.sloupecid) ) {
          element.sloupecid.forEach(el =>{ //Prochod vsema sloupcema a pricteni ceny
            ntmp+=this.getNakladSloupce(element.data, el)
          })
    }
    nsum = nsum + ntmp // potom co se sjedou vsechny sloupce, pripocitam vysledek


  });

  defer.resolve(nsum)
  return defer.promise()
},

getNakladSloupce(data, sloupec){ // data jsou leva strana kalkulace
  var nSum = 0
  //Zpracovat levou stranu
      // alert(JSON.stringify(data))
    if (!f.isEmpty(sloupec.data.nakladkorekce)){ // korekce ma prednost
      nSum = sloupec.data.nakladkorekce*1
    }
    // else propocet nakladu

  return nSum
},
async KalkulacePrepocetKusy(k, ks=1){
  //f.Alert2("K " , f.Jparse(k))
  //k=f.Jparse(k)
  //k=JSON.parse(k)
  //f.Alert2("K " , f.Jparse(k))



  //return
  var defer = $.Deferred();
  //f.Alert("Propocet 1")
  k.forEach(element => {

      //f.Alert("E :: " , f.isEmpty(element.data.FormatNakladKs ), f.isEmpty(10))
      if (f.isEmpty(element.data.FormatNakladKs)) {
        element.data.FormatNakladKs = ks
        element.data.ResultM2= ((element.data.FormatSirka/1000) * (element.data.FormatVyska/1000) ) * element.data.FormatNakladKs
      } else {
        element.data.FormatNakladKs = element.data.FormatNakladKs * ks
        element.data.ResultM2= ((element.data.FormatSirka/1000) * (element.data.FormatVyska/1000) ) * element.data.FormatNakladKs
      }
  });

  defer.resolve(k);

  return defer.promise();

},
async KalkulacePrepocetKusyNa1(k, ks=1){
  //f.Alert("K" , k.length)
  //return


  var defer = $.Deferred();
//  defer.resolve(k);
  //return defer.promise();

  // f.Alert2
  // var k2=f.Jparse(k2)
  // f.Alert2("Propocet na 1", k )
  var k2 = f.Jstr(k)
  var ksOld=0
  var ksNew=0
  k2= f.Jparse(k)
  try {
  k2.forEach(element => {

      //f.Alert("E :: " , f.isEmpty(element.data.FormatNakladKs ), f.isEmpty(10))
      if (f.isEmpty(element.data.FormatNakladKs)) {
        //element.data.FormatNakladKs = ks
        element.data.FormatNakladKs = 1
      } else {
        //element.data.FormatNakladKs = element.data.FormatNakladKs * ks
        ksOld =  element.data.FormatNakladKs;
        if (ks==1){
          element.data.FormatNakladKs
        }
        if (ks > 1) {
          //bylo : 10
          //chci 1
          //mam: 20
          //ksPomer= ksOld / ks
          ksNew = parseInt(ksOld / ks)
          // self.$store.dispatch('editKalk', {kalkulaceid: idK, key: 'ResultM2' , value: ((self.form.sirka/1000) * (self.form.vyska/1000) )*self.form.nakladks })
          // f.Alert(ksNew, ksOld)
          element.data.ResultM2= ((element.data.FormatSirka/1000) * (element.data.FormatVyska/1000) ) * ksNew


          element.data.FormatNakladKs = ksNew

        }


      }
  });
  defer.resolve(k2);
} catch (e) {

  console.log('Chyba prepoctu vracim original ', e)
  defer.resolve(k);

}



  return defer.promise();

},
///Prace




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


}
