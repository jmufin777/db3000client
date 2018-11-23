import Api from '@/services/Api'

export default {
  all (user,typ) {
    console.log('jedou postiknutelnost')
    return Api().get('list-firma',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list-firma', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list-firma', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})
    return Api().post('list-firma',  { form: form ,user: user })
   }

}
