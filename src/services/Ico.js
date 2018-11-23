import Api from '@/services/Api'

export default {
  all (user,ico) {
    //console.log('jedou credentials: ')
    return Api().get('ico',{params: {  user: user,id: ico }})
  },


}
