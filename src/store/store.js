import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    WinDows: [],
    txt: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    TXT (state, textik) {
      state.txt = textik
    },
    SETWIN ( state, newWin) {
       state.WinDows.push(newWin)
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setTxt ({commit}, textik) {
      commit('TXT',textik)
    },
    setWin ({commit}, newWin) {
      console.log('Actions- setWin -Dispatch', newWin)
      commit('SETWIN',newWin)
    }
  },
  getters: {
    infoTxt: state => {
      return state.txt
    }
  }
})
