import Api from '@/services/Api'

export default {
  all () {
    // console.log('jedou credentials: ', credentials)
    return Api().get('list2_barevnost')
  },
  delete (user, id ) {
    return Api().delete('list2_barevnost', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2_barevnost', { form: form,  user: user})
   },
  insert (user,  form ) {
    return Api().post('list2_barevnost',  {form: form ,user: user })
   }

}
