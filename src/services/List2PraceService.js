import Api from '@/services/Api'

export default {
  all (user,typ) {
    return Api().get('list2-prace',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2-prace', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2-prace', { form: form,  user: user})
   },
  insert (user,  form ) {
    return Api().post('list2-prace',  { form: form ,user: user })
   }

}
