import Api from '@/services/Api'

export default {
  all (user, typ) {

    return Api().get('list_modules', { params:  {u: 'user', typ: typ }} )
  },
  init (user, xdata, del ) {
    return Api().post('list_modules', { data: xdata, user: user, del: del})
  }
  ,
  update (user, xdata, del ) {
    return Api().put('list_modules', { data: xdata, user: user, del: del})
  }
}
