import Api from '@/services/Api'

export default {
  all (user,typ) {
    console.log('jedou postiknutelnost')
    return Api().get('list2-matvyrobce',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2-matvyrobce', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2-matvyrobce', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})
    return Api().post('list2-matvyrobce',  { form: form ,user: user })
   }

}
