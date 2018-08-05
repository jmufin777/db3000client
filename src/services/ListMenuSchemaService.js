import Api from '@/services/Api'

export default {
  all (user, typ) {
    return Api().get('list_menu', {params:  {u: 'user', typ: typ }} )
  },
  init (user, xdata,nazev,popis ) {
      return Api().post('list_menu', {data: xdata, nazev: nazev, popis: popis,user: user})
  },
  delete (user, id ) {
    return Api().delete('list_menu', {params: {  user: user,id: id}} )
  },
  update (user,  form, data ) {

    return Api().put('list_menu', {data: data, form: form,  user: user})
  }
}
