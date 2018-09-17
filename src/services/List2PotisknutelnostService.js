import Api from '@/services/Api'

export default {
  all (user,typ) {
    console.log('jedou postinutel')
    return Api().get('list2-potisknutelnost',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2-potisknutelnost', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2-potisknutelnost', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})

    return Api().post('list2-potisknutelnost',  { form: form ,user: user })
   }

}
