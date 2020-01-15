import Api from '@/services/Api'
import f from '@/services/fce'
var pocet=0
export default {

  all (user, query) {  //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit
    //if (query){
      var neco = typeof query
      //console.log('jedou credentials: ',user, query, neco, `select '${neco}' as nazev, 2 as nazev_txt,3 as idefix,4 as idefix_stroj,5 as idefix_mat` )
      //return Api().get('query',{ params: {  user: user,query: `select '${neco}' as nazev, 2 as nazev_txt,3 as idefix,4 as idefix_stroj,5 as idefix_mat`   }})
    //}
    if (query.match(/set_open|prilohy_prijem/g) ){
    }else {
      f.log(query)
    }
    if (neco=='undefined') {
      console.log('GET Vracim nahradu dotaz je undefined : ',user, query, neco, `select '${neco}' as nazev, 2 as nazev_txt,3 as idefix,4 as idefix_stroj,5 as idefix_mat` )
      return Api().get('query',{ params: {  user: user,query: `select '${neco}' as nazev, 2 as nazev_txt,3 as idefix,4 as idefix_stroj,5 as idefix_mat limit 0`   }})
    }
      return Api().get('query',{ params: {  user: user,query: query  }})
  },

  post (user, query ) {
    //query=query.replace('undefined','0')
    console.log('POST: query ',user, ++pocet)
    f.log(query)
    //return
    return Api().post('query', { params: {  user: user,query: query}} )
  }
  ,
  vl_copy (user, cTable,idefix_item,query ) {
    //query=query.replace('undefined','0')
    console.log('POST: query ',user, ++pocet)
    f.log(query)
    //return
    return Api().post('vl_copy', { params: {  user: user,table: cTable,idefix_item:idefix_item,query: query}} )
  }
  ,
  vl_set (user, query ) {
    //query=query.replace('undefined','0')
    //console.log('POST: VLSET ',user, ++pocet)
    f.log('POST: VLSET ',query)

    return Api().post('vlset', { params: {  user: user,query: query}} )
  },

  vl_unset (user, query ) {
    //query=query.replace('undefined','0')
    //console.log('POST: VLUNSET ',user)
    //f.log('POST: VLUNSET  ',query)
    return Api().post('vlunset', { params: {  user: user,query: query}} )
  }

  ,sync (user, query ) {
    //query=query.replace('undefined','0')
    //console.log('POST: VLUNSET ',user)
    //alert('UNSET ',JSON.stringify(query))
    //f.log('POST: VLUNSET  ',query)
    return Api().post('sync', { params: {  user: user,query: query}} )
  }



}
