import Api from '@/services/Api'

export default {
  all (user, query) {  //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit
    //console.log('jedou credentials: ')
    return Api().get('query',{ params: {  user: user,query: query  }})
  },

  post (user, query ) {
    return Api().post('query', { params: {  user: user,query: query}} )
  }



}
