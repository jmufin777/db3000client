import Api from '@/services/Api'

export default {
  all (user,typ) {
    //console.log('jedou credentials: ')
    return Api().get('list2-matskup',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list2-matskup', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list2-matskup', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})

    return Api().post('list2-matskup',  { form: form ,user: user })
   }

}