import Api from '@/services/Api'

export default {
  all (user,typ) {
    return Api().get('list2_barevnost',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2_barevnost', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2_barevnost', { form: form,  user: user})
   },
  insert (user,  form ) {
    return Api().post('list2_barevnost',  { form: form ,user: user })
   }

}
