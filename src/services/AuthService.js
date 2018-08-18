import Api from '@/services/Api'

export default {
  login (credentials) {
    // console.log('jedou credentials: ', credentials)
    return Api().post('login', credentials)
  },
  update (credentials) {
    // console.log('jedou credentials: ', credentials)
    return Api().post('login-update', credentials)
  },
  menuUpdate (credentials) {
    // console.log('jedou credentials: ', credentials)
    return Api().post('login-menu-update', credentials)
  }
}
