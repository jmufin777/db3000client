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
   },

  one (user,typ, id_query = -1, string_query = '' ) {
    //console.log('jedou credentials: ')
     if (string_query == 'copy') {
//        alert('ONO' + typ )
    }
    return Api().get('list-firma-one',{ params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },
  saveone (user, idefix, form ) {
    console.log({'Form': form})
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix })
   }

}
