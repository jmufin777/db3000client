import moment from 'moment'
//import Q from '../../services/query'
import Q from './query'
import f from './fce'
import store from '@/store/store'
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
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


///Prace


async setKalk(data,kalkulace,_idefix=0) {
  const self=this
  var q=""
  if (_idefix ==0) {
    var qover=`select * from calc_templates where nazev = trim('${data.nazev}')`
    // f.Alert(qover)
    try {
      atmp= (await Q.all(idefix,qover)).data.data
      f.Alert(JSON.stringify(atmp) )
      if (atmp.length >= 1 ){
        _idefix = atmp[0].idefix
         //f.Alert('Nalezen ', _idefix )
      }
    }catch(e) {
      f.Alert('Nelze zjistit obsah templates',e)
      console.log("ERR Kalk1", e)
    }
  }





  data.kcks*=1
  data.ks*=1
  data.naklad*=1  // spravne = sum naklad ze vsech radek aktulani kalkulace
  data.prodej*=1
  data.marze*=1 // Spocitat z prodej naklad
  data.marze_pomer*=1 // Spocitat take z prodej naklad
  kalkulace= JSON.stringify(kalkulace)
  var idefix=store.state.idefix
  var atmp=[]
  var nret = 0


if (_idefix == 0 ) {
    q = `insert into calc_templates ( ${cols},user_insert_idefix,user_update_idefix)
    values (
      trim('${data.nazev}'),'${data.kcks}','${data.ks}','${data.naklad}','${data.marze}','${data.prodej}','${data.marze_pomer}','${kalkulace}','${idefix}','${idefix}'

    ) `;
    await Q.post(0,q)
    try {
      atmp= (await Q.all(idefix,'select max(idefix) as idefix  from calc_templates')).data.data
      if (atmp.length == 1 ){
        nret = atmp[0].idefix
        //f.Alert(nret)
        store.dispatch('setKalkulaceIdefix',nret)
      }
      //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
    } catch (e) {
      f.Alert('nevim neniv',e)
      console.log("ERR Kalk1", e)
    }
    //console.log(store)
    return nret
}
if (_idefix > 0) {
  q = `update calc_templates set
  nazev      = trim('${data.nazev}'),
  kcks       = '${data.kcks}',
  ks         = '${data.ks}',
  naklad     = '${data.naklad}',
  marze      = '${data.marze}',
  prodej     = '${data.prodej}',
  marze_pomer= '${data.marze_pomer}',

  user_update_idefix='${idefix}',
  time_update = now()
   where idefix = ${_idefix}
  `
  //obsah='${kalkulace}',
   //  f.Alert('Update ' ,q)
     console.log('Update ' ,q)


    await Q.post(0,q)
    try {
      atmp= (await Q.all(idefix,'select max(idefix) as idefix  from calc_templates')).data.data
      if (atmp.length == 1 ){
        nret = atmp[0].idefix
        //f.Alert(nret)
        store.dispatch('setKalkulaceIdefix',nret)
      }
      //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
    } catch (e) {
      f.Alert('nevim neniv',e)
      console.log("ERR Kalk1", e)
    }
    //console.log(store)
    return nret
}
},
async getTemplates() {
  var q= 'select a.*,b.login  from calc_templates a join list_users b on a.user_update_idefix = b.idefix';
  var idefix=store.state.idefix
  var atmp=[]
  //f.Alert("BUS ",Vue2)
  try {
    atmp= (await Q.all(idefix,q)).data.data

    eventBus.$emit('DATATEMPLATES',{data: atmp})
    return atmp

    //
  } catch (e) {
    f.Alert('nevidim templats',e)
    console.log("ERR pozadavek na templates", e)
  }
  ///f.Alert(JSON.stringify(atmp))

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


}
