import Api from '@/services/Api'

export default {
  all (user) {
    return Api().get('list_modules', { params:  {u: 'user'}} )
  },
  init (user, xdata) {
    return Api().post('list_modules', { data: xdata, user: user })
  }
}
