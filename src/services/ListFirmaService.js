import Api from '@/services/Api'

export default {
  all (user,typ) {
    return Api().get('list-firma',{params: {  user: user,id: typ }})
  },
  delete (user, id ) {
    return Api().post('list-firma-delete', {params: {  user: user,id: id}} )
  },
  update (user,  form ) {
    return Api().put('list-firma', { form: form,  user: user})
   },

  insert (user,  form ) {
    return Api().post('list-firma',  { form: form ,user: user })
   },

  one (user,typ, id_query = -1, string_query = '' ) {
     if (string_query == 'copy') {
//        alert('ONO' + typ )
    }
    return Api().get('list-firma-one',{ params: {  user: user, id: typ, id_query: id_query, string_query: string_query }})
  },
  saveone (user, idefix, form ) {
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix })
   },
   saveNotice (user, idefix, form,id_query ) {
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix, id_query: id_query })
   },

   saveOsoba (user, idefix, form ,id_query) {
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix, id_query: id_query })
   },

   saveProvozovna (user, idefix, form ,id_query) {
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix, id_query: id_query })
   },
   savePrace (user, idefix, form ,id_query) {
    return Api().post('list-firma-save-one',  { form: form ,user: user, idefix: idefix, id_query: id_query })
   }





}
