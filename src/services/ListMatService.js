import Api from '@/services/Api'

export default {
  all (user,typ) {
    //console.log('jedou credentials: ')
    return Api().get('list-mat',{params: {  user: user,id: typ }})
  },
  one (user,typ, id_query = -1, string_query = '' ) {
    //console.log('jedou credentials: ')
    // alert('ONO' + typ )
    return Api().get('list-mat-one',{params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },
  delete (user, id ) {
    return Api().delete('list-mat', {params: {  user: user, id: id}} )
  },
  update (user,  form ) {
    return Api().put('list-mat', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})

    return Api().post('list-mat',  { form: form ,user: user })
   }

}

