import Api from '@/services/Api'

export default {
  all (user,typ) {
    //console.log('jedou credentials: ')

    return Api().get('list-matprojcena',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().delete('list-matprojcena', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list-matprojcena', { form: form,  user: user})
   },
  insert (user,  form ) {
    console.log({'Form': form})

    return Api().post('list-matprojcena',  { form: form ,user: user })
   }

}

