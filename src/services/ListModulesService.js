import Api from '@/services/Api'

export default {
  all (user, typ) {

    return Api().get('list_modules', { params:  {u: 'user', typ: typ }} )
  },
  usedInMenu (user, idMenu) {
      return Api().get('list_modules_used_in_menu', { params:  {u: user, idMenu: idMenu }} )
  },
  init (user, xdata, del ) {
    return Api().post('list_modules', { data: xdata, user: user, del: del})
  }
 ,
  update (user, xdata, del, id ) {
    return Api().put('list_modules', { data: xdata, user: user, del: del, id: id})
  }
}
