import Api from '@/services/Api'
var pocet=0
export default {


  all (user, query) {  //typ - typ bud nic nebo where podmoinka, other -  Treba order nebo neco jinyho kdzy mnenapadne, ofset limit

      alert(user)
      var neco = typeof query
      console.log('get: Uploda 0 User: ',user,'query :',  query)
    return Api().get('upload0',{ params: {  user: user,file: query  }})
  },

  post (user, query ) {
    console.log('POST: Uploda 0 User: ',user,'query :',  query)

    return Api().post('upload0', { params: {  user: user,file: query}} )
  }

}
