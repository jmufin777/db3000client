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
    showEdit: false,
    showModule: null,
    showModuleTitle: null,
    showIdefix: null,
    isUserLoggedIn: false,
    WinDows: [],
    active: null,
    zMax: 999,
    txt: null,
    xMenuz: [],
    compaStore: null,
    xMenuMain: [],
    seekFirma: null,
    Kalkulace: [],
    KalkulaceThis: -1,
    KalkulaceLast: -1
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
    setshowEdit (state, showEdit) {
      state.showEdit = showEdit
    },
    setshowModule (state, showModule) {
      state.showModule = showModule
    },
    setshowIdefix (state, showIdefix) {
      state.showIdefix = showIdefix
    },
    setshowModuleTitle (state, showModuleTitle) {
      state.showModuleTitle = showModuleTitle
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

      // console.log('Nasel : ', nasel )
      if (nasel >= 0) {
        // newWin.z = newWin.z +7
        state.WinDows[nasel] =  newWin
        state.active = nasel
      } else {
        state.WinDows.push(newWin)
        state.active = state.WinDows.length
        //
      }
      state.WinDows.forEach((el, ind) => {
        if (ind === nasel) {
          state.zMax = state.zMax + 1
          state.WinDows[ind].z1 = state.zMax
        } else {
          state.WinDows[ind].z1 = 999
        }
      })
    },
    DROPWIN (state, oldWin) {
      state.WinDows = state.WinDows.filter(function (el) {
        return el.id !== oldWin
      })
    },
    DROPALLWIN (state) {
      state.WinDows = []
    },

    SETSEEKFIRMA (state, seekFirma) {
      state.seekFirma = seekFirma
      // state.xMenuMain = JSON.parse(JSON.stringify(xMenuMain))
    },

    DROPKALKULACE (state) {
      state.Kalkulace = []
    },
    addKalk (state, kalkulace) { //Vlozi celou definic
      var tmpIdNew = 1
      //console.log('A :', JSON.stringify(kalkulace))
      if (state.Kalkulace == null) {
        state.Kalkulace = []
      }
      if (state.Kalkulace.length>0) {
        var tmpId = kalkulace.kalkulaceid
        tmpIdNew = kalkulace.kalkulaceid
        for (var i = 0; i < 3; i++) {
          state.Kalkulace.forEach(el => {
            if (el.kalkulaceid === tmpId) {
              tmpIdNew += 1
              tmpId = tmpIdNew
            }
          })
        }
      }
      kalkulace.kalkulaceid = tmpIdNew
      state.Kalkulace.push(kalkulace)
      state.KalkulaceLast = kalkulace.kalkulaceid
      // console.log("Vkladam : ", state.KalkulaceLast )


    },

    addKalkCol (state, kalkulaceid) {
      console.log('A :', JSON.stringify(kalkulaceid))
      var newId = -1
      var idK = -1


      state.Kalkulace.forEach((el, idxk) => {
        if (el.kalkulaceid === kalkulaceid) {
          idK = idxk
          if (el.sloupecid.length === 0) {
            newId = el.sloupecid.length + 1
          } else {
            newId = el.sloupecid.length + 1
            el.sloupecid.forEach(eSl => {
              if (eSl.id >= newId) {
                newId = eSl.id + 1

              }
            })
          }
          return 0
        }
      })
      if (newId > 0)  {
        //console.log('Add : ', state.Kalkulace[idK])
        state.Kalkulace[idK].sloupecid.push({id: newId, data: {}})
      }
    },
    removeKalk (state, kalkulaceid) {
      console.log('Remov ', kalkulaceid)
      state.Kalkulace = state.Kalkulace.filter(function (el) {
        return el.kalkulaceid !== kalkulaceid
      })
    },
    setKalk (state, kalkulaceid) {
      console.log('Set ', kalkulaceid)
      state.KalkulaceThis = kalkulaceid
    },
    editKalk (state, kalkulaceidKeyValue) {
      console.log('Edit:  ', kalkulaceidKeyValue)
      var klic = kalkulaceidKeyValue.key
      console.log("Klic :", klic , kalkulaceidKeyValue.key )
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[`'${kalkulaceidKeyValue.key}'`] = kalkulaceidKeyValue[kalkulaceidKeyValue.value]
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data['Menu1Value'] = kalkulaceidKeyValue.value

      state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[klic] = kalkulaceidKeyValue.value
      //console.log('Edit 2', state.Kalkulace["'" + kalkulaceidKeyValue.key + "'"])
    },
    removeKalkCol (state, pole) {
      var kalkulaceid = pole.kalkulaceid
      var sloupecid = pole.sloupecid
      var idk = -1
      var ids = -1
      console.log('A :', JSON.stringify(kalkulaceid, sloupecid))
      state.Kalkulace.forEach((el, idxk) => {
        if (el.kalkulaceid === kalkulaceid) {
          console.log('C', sloupecid)
          idk = idxk

          el.sloupecid.forEach((el2, idx) => {
            if (el2.id === sloupecid.id) {
              ids = idx
            }
          })
        }
      })
      if (idk > -1 && ids > -1 ) {
        state.Kalkulace[idk].sloupecid.splice(ids, 1)
      }
    },
    cleanKalk (state) {
      state.Kalkulace = []
      state.KalkulaceLast = -1
      state.KalkulaceThis = -1
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
    setshowEdit ({commit}, showEdit) {
      commit('setshowEdit', showEdit)
    },
    setshowModule ({commit}, showModule) {
      commit('setshowModule', showModule)
    },
    setshowIdefix ({commit}, showIdefix) {
      commit('setshowIdefix', showIdefix)
    },
    setshowModuleTitle ({commit}, showModuleTitle) {
      commit('setshowModuleTitle', showModuleTitle)
    },
    setTxt ({commit}, textik) {
      commit('TXT', textik)
    },
    setWin ({commit}, newWin) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('SETWIN', newWin)
    },
    dropWin ({commit}, oldWind) {
      commit('DROPWIN', oldWind)
    },
    dropAllWin ({commit}) {
      commit('DROPALLWIN')
    },
    setMenu ({commit}, xMenuy1) {
      commit('SETMENU', xMenuy1)
    },
    setMenuMain ({commit}, xMenuMain) {
      commit('SETMENUMAIN', xMenuMain)
    },
    setCompaStore ({commit}, compaStore) {
      commit('SETCOMPASTORE', compaStore)
    },
    addCompaStore ({commit}, compaStore) {
      commit('ADDCOMPASTORE', compaStore)
    },
    seekFirma ({commit}, seekFirma) {
      commit('SETSEEKFIRMA', seekFirma)
    },
    cleanKalk ({commit}) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('cleanKalk')
    },
    addKalk ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('addKalk', kalkulaceid)
    },
    setKalk ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('setKalk', kalkulaceid)
    },

    editKalk ({commit}, kalkulaceidKeyValue) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('editKalk', kalkulaceidKeyValue)
    },
    removeKalk ({commit}, kalkulaceid) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('removeKalk', kalkulaceid)
    },
    addKalkCol ({commit}, kalkulaceid) {
      console.log('Actions- addKalkCol -Dispatch', kalkulaceid)
      commit('addKalkCol', kalkulaceid)
    },
    removeKalkCol ({commit}, pole) {
      console.log('Actions- setWin -Dispatch', pole)
      commit('removeKalkCol', pole)
    }
  },
  getters: {
    infoTxt: state => {
      return state.txt
    },
    getWinList: state => {
      return state.WinDows
    },
    getKalk: state => {
      return state.KalkulaceThis
    },
    getKalkLast: state => {
      return state.KalkulaceLast
    },
    //getId - index kalkulace pro dane id Kalulace
    getId: state => (id) => {
      var idx = 0
      state.Kalkulace.forEach((el, idxk) => {
        if (el.kalkulaceid === id) {
          idx = idxk
          return idx
        }
      })
      return idx
    }

  }
})
