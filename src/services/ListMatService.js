import Api from '@/services/Api'

export default {
  all (user,typ, order='' , limit = 0, offset= 0 ) {  //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit
    //console.log('jedou credentials: ')

    return Api().get('list-mat',{params: {  user: user,id: typ, order: order , limit: limit, offset: offset  }})
  },
  one (user,typ, id_query = -1, string_query = '' ) {
    //console.log('jedou credentials: ')
     //alert('ONO' + typ )
    return Api().get('list-mat-one',{params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },
  delete (user, id ) {

    return Api().post('list-mat-delete', {params: {  user: user, id: id}} )
  },
  update (user,  form ) {
    return Api().put('list-mat', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})

    return Api().post('list-mat',  { form: form ,user: user })
   },
   saveone (user, idefix, form ) {
    console.log({'Form': form})

    return Api().post('list-mat-save-one',  { form: form ,user: user, idefix: idefix })
   }

}

