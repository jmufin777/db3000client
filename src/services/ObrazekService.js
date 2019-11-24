import Api from '@/services/Api'

export default {
  all (user,obrazek) {
    return Api().get('obrazek',{params: {  user: user,id: obrazek }})
  },


}
