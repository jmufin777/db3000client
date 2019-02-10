import Api from '@/services/Api'

export default {
  all (user,typ, order='' , limit = 0, offset= 0) {  //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit
    //console.log('jedou credentials: ')
    return Api().get('list-stroj',{ params: {  user: user,id: typ, order: order , limit: limit, offset: offset  }})
  },
  one (user,typ, id_query = -1, string_query = '') {
    //console.log('jedou credentials: ')
     if (string_query == 'copy') {
//        alert('ONO' + typ )
    }

    return Api().get('list-stroj-one',{ params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },

  nema (user,typ, id_query = -1, string_query = 'nema') {
    //console.log('jedou credentials: ')
     if (string_query == 'copy') {
//        alert('ONO' + typ )
    }

    return Api().get('list-stroj-one',{ params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },
  delete (user, id ) {
    return Api().post('list-stroj-delete', { params: {  user: user,id: id}} )
  },
  setTisk (user, id, anone = true) {
    return Api().post('list-stroj-settisk', { params: {  user: user,id: id, anone: anone }} )
  },

  update (user,  form ) {
    return Api().put('list-stroj', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})
    return Api().post('list-stroj',  { form: form ,user: user })
   },
  saveone (user, idefix, form ) {
    console.log({'Form': form})
    return Api().post('list-stroj-save-one',  { form: form ,user: user, idefix: idefix })
   }

}

