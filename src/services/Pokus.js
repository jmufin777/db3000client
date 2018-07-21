import Api from '@/services/Api'

export default {
  pokus (credentials) {
    return Api().post('login', credentials)
  }
}
