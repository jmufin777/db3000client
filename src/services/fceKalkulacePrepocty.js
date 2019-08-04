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
