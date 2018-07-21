import Api from '@/services/Api'

export default {
  login (credentials) {
    // console.log('jedou credentials: ', credentials)
    return Api().post('login', credentials)
  }
}
