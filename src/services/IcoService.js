import Api from '@/services/Api'

export default {
  all (user,ico) {
    return Api().get('ico',{params: {  user: user,id: ico }})
  },


}
