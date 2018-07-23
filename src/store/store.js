import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

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
    SETWIN (state, newWin) {
      // state.WinDows = []
      var nasel = state.WinDows.findIndex( (el) => {
        return el.id === newWin.id
      })

      // console.log("Nasel : ", nasel )
      if (nasel>=0) {
        state.WinDows[nasel] =  newWin
      } else {
        state.WinDows.push(newWin)
        //
      }
    },
    DROPWIN (state, oldWin) {
      state.WinDows=state.WinDows.filter(function (el){
        return el.id !== oldWin
      })
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
    },
    dropWin({commit}, oldWind ) {
      commit('DROPWIN', oldWind)
    }
  },
  getters: {
    infoTxt: state => {
      return state.txt
    },
    getWinList: state => {
      return state.WinDows
    }

  }
})
