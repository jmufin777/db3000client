import Api from '@/services/Api'

export default {
  all (nothing_yet) {
    //alert(nothing_yet)
    // console.log('jedou credentials: ', credentials)
    return Api().post('db-status',  nothing_yet )
  },
  who (whos) {
    //alert(nothing_yet)
    // console.log('jedou credentials: ', credentials)
    return Api().post('db-status-who',  whos )
  },

}
