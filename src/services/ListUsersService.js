import Api from '@/services/Api'
export default {
  all (user, typ) {
    return Api().get('list_users', {params:  {u: user, typ: typ }} )
  },
  init (user, form , typ ) {
        return Api().post('list_users', {form: form ,user: user, typ: typ })
  },
  delete (user, id ) {
    return Api().delete('list_users', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
   return Api().put('list_users', { form: form,  user: user})
  },
  updateMenus (user,  form ) {
    return Api().put('list_users-menus', { form: form,  user: user})
  },
  updateGroups (user,  form ) {
    return Api().put('list_users-groups', { form: form,  user: user})
  },
  loginExists (user, typ) {

    return Api().get('list_users-login-exists', {params:  {u: user, typ: typ }} )
  }

}
