import Api from '@/services/Api'

export default {
  all (user,typ) {
    return Api().get('list2-jednotka',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2-jednotka', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2-jednotka', { form: form,  user: user})
   },
  insert (user,  form ) {
    return Api().post('list2-jednotka',  { form: form ,user: user })
   }

}
