import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    baseURL: `http://78.102.17.162:3003/`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
