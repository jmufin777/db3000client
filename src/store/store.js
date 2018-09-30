import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'
// https://vuex.vuejs.org/guide/structure.html
// https://vuex.vuejs.org/guide/plugins.html

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    token: null,
    user: null,
    level: null,
    idefix: null,
    isUserLoggedIn: false,
    WinDows: [],
    active: null,
    zMax: 999,
    txt: null,
    xMenuz: [],
    compaStore: null,
    xMenuMain: []
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setLevel (state, level) {
      state.level = level
    },
    setIdefix (state, idefix) {
      state.idefix = idefix
    },
    TXT (state, textik) {
      state.txt = textik
    },
    SETMENU (state, xMenuz) {
       state.xMenuz = xMenuz
    },
    SETCOMPASTORE (state, compaStore) {
      state.compaStore = compaStore
    },
    ADDCOMPASTORE (state, compaStore) {
      state.compaStore = []
      compaStore.forEach(el => {
        state.compaStore.push(el)
      })
    },
    SETMENUMAIN (state, xMenuMain  ) {
      state.xMenuMain = xMenuMain
      //state.xMenuMain = JSON.parse(JSON.stringify(xMenuMain))
   },
    SETWIN (state, newWin) {
       // state.WinDows = []
      var nasel = state.WinDows.findIndex( (el) => {
        return el.id === newWin.id
      })

      // console.log("Nasel : ", nasel )
      if (nasel>=0) {
        // newWin.z = newWin.z +7
        state.WinDows[nasel] =  newWin
        state.active = nasel
      } else {
        state.WinDows.push(newWin)
        state.active = state.WinDows.length
        //
      }
      state.WinDows.forEach((el, ind) => {
        if (ind==nasel) {
          state.zMax = state.zMax+1
          state.WinDows[ind].z1 = state.zMax

        } else {
          state.WinDows[ind].z1 = 999
        }
      })

    },
    DROPWIN (state, oldWin) {
      state.WinDows=state.WinDows.filter(function (el){
         return el.id !== oldWin
      })
    },
    DROPALLWIN (state) {
      state.WinDows = []
    }

  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setLevel ({commit}, level) {
      commit('setLevel', level)
    },
    setIdefix ({commit}, idefix) {
      commit('setIdefix', idefix)
    },
    setTxt ({commit}, textik) {
      commit('TXT', textik)
    },
    setWin ({commit}, newWin) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('SETWIN', newWin)
    },
    dropWin({commit}, oldWind ) {
      commit('DROPWIN', oldWind)
    },
    dropAllWin({commit} ) {
      commit('DROPALLWIN' )
    },

    setMenu({commit}, xMenuy1) {
      commit('SETMENU', xMenuy1)
    },
    setMenuMain({commit}, xMenuMain) {
      commit('SETMENUMAIN', xMenuMain)
    },
    setCompaStore({commit}, compaStore) {
      commit('SETCOMPASTORE', compaStore)
    },
    addCompaStore({commit}, compaStore) {
      commit('ADDCOMPASTORE', compaStore)
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
