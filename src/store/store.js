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


    addKalkCol (state, kalkulacecoltype) {
      console.log('A :', JSON.stringify(kalkulacecoltype.kalkulaceid))
      var newId = -1
      var idK  = -1
      state.Kalkulace.forEach((el, idxk) => {
        if (el.kalkulaceid === kalkulacecoltype.kalkulaceid) {
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
        state.Kalkulace[idK].sloupecid.push({id: newId, type: kalkulacecoltype.type,  data: {}})
      }
    },
    saveKalk(state,kalkulace){
      console.log('SAVE ' ,kalkulace.id)
      state.Kalkulace[kalkulace.id]= kalkulace.data
    },
    saveKalkCela(state,kalkulace){
      console.log('SAVE ' ,kalkulace.id)
      state.Kalkulace= kalkulace.data
    },
    saveCols(state,kalkulace){
      console.log('SAVE ' ,kalkulace.id)
       state.Kalkulace[kalkulace.id].sloupecid= []
       state.Kalkulace[kalkulace.id].sloupecid.push(kalkulace.data)
    },
    addColMat (state, kalkulacecoltype) {
        var idK = kalkulacecoltype.kalkulaceid
        var type= kalkulacecoltype.type
        // console.log('A 2aaaa2: IDK :',idK, " type ", JSON.stringify(kalkulacecoltype), "This ", state.KalkulaceThis )
        // return
        // var newId = -1
        // var idK = -1
      if (state.Kalkulace[idK].sloupecid.length>0){
        console.log('Mam delku:', JSON.stringify(kalkulacecoltype.kalkulaceid), "type orig:", state.Kalkulace[idK].sloupecid[0].type)
        if (state.Kalkulace[idK].sloupecid[0].type==type){
          console.log('Shoda:', JSON.stringify(kalkulacecoltype.kalkulaceid), "type orig:", state.Kalkulace[idK].sloupecid[0].type)
          state.Kalkulace[idK].sloupecid[0] = {id: (Math.ceil(Math.random()*91000)) , type: type,  data: {}}
        } else {
          state.Kalkulace[idK].sloupecid.splice(0,0,{id: (Math.ceil(Math.random()*91000)) , type: type ,  data: {}})
        }
        //state.Kalkulace[idK].sloupecid[0] = {id: newId, type: kalkulacecoltype.type,  data: {}}
      } else {
        state.Kalkulace[idK].sloupecid.push({id: (Math.ceil(Math.random()*91000)) , type: type ,  data: {}})
        console.log('NE Mam delku:', JSON.stringify(kalkulacecoltype.kalkulaceid))
        //state.Kalkulace[idK].sloupecid.push({id: 1, type: kalkulacecoltype.type,  data: {}})
      }
      return
    },
    addColMat2 (state, kalkulacecoltype) {
      var idK = kalkulacecoltype.kalkulaceid
      var type= kalkulacecoltype.type
      var colid= kalkulacecoltype.id
      console.log('A 2aaaa2:', JSON.stringify(kalkulacecoltype))
      var nfound=-1;
    if (state.Kalkulace[idK].sloupecid.length>0){
      state.Kalkulace[idK].sloupecid.forEach((el,idx) => {
        if (el.id == colid ) {
          nfound=idx
          return
        }
      })
      if (nfound == -1){
        state.Kalkulace[idK].sloupecid.push({id: colid, type: type ,  data: {}})
      }
    } else {
      state.Kalkulace[idK].sloupecid.push({id: colid, type: type ,  data: {}})
    }

    return
  },
    removeKalk (state, kalkulaceid) {
      console.log('Remov ', kalkulaceid)
      state.Kalkulace = state.Kalkulace.filter(function (el) {
        return el.kalkulaceid !== kalkulaceid
      })
    },
    removeKalkAccId (state, kalkulaceid) {
      console.log('RemoveAccID ', kalkulaceid.kalkulaceid)
      state.Kalkulace.splice(kalkulaceid.kalkulaceid,1)
    },

    setKalk (state, kalkulaceid) {
      console.log('Set ', kalkulaceid)
      state.KalkulaceThis = kalkulaceid
    },
    setKalk2 (state, kalkulaceid) {
      console.log('Set acc ID ', kalkulaceid)
      state.KalkulaceThis = state.Kalkulace[kalkulaceid].kalkulaceid
    },
    replaceKalk (state, dataAll) {
      var idx = this.getters.getId(dataAll.kalkulaceid)
        state.Kalkulace[idx] = dataAll
    },
    copyKalk (state, dataAll) {
        //var idx = this.getters.getId(dataAll.kalkulaceid)
        var idx = dataAll.kalkulaceid
        var neco = JSON.parse(JSON.stringify(state.Kalkulace[idx]))
        var newId=-1
        var newIdC=0
        state.Kalkulace.forEach((el, idx) => {
          if (el.kalkulaceid > newId) {
            newId = el.kalkulaceid
          }
        })
        newId++
        neco.kalkulaceid = newId
        if (neco.sloupecid.length>0){
            newIdC=Math.ceil(Math.random()*5587515)
            neco.sloupecid.forEach(el=>{
            el.id = newIdC++
        //    console.log("copyKalk ", neco)
          })

        }
        state.Kalkulace.push(neco)

        //state.Kalkulace.push = dataAll
    },
    copyCol (state, dataAll) {
      //var idx = this.getters.getId(dataAll.kalkulaceid)
      var idx = dataAll.kalkulaceid
      var idc = dataAll.sloupecid
      var neco = JSON.parse(JSON.stringify(state.Kalkulace[idx].sloupecid[idc]))
      neco.id=Math.ceil(Math.random()*558755)
      console.log("COPY: " , neco)
      state.Kalkulace[idx].sloupecid.push(neco)
      //state.Kalkulace[idx].sloupecid.push('ahoj')
    },
    replaceKalkCol (state, dataAll) {
      //var idx = this.getters.getId(dataAll.kalkulaceid)
      var idx = dataAll.kalkulaceid
      var idxCol = dataAll.idxCol
        state.Kalkulace[idx].sloupecid[idxCol].data = dataAll.data
        return ;
        /*
        try {
          state.Kalkulace[idx].sloupecid[idxCol].type = dataAll.type
          state.Kalkulace[idx].sloupecid[idxCol].id = dataAll.id
        } catch(e) {
          alert('prdel')
        }
        */

    },
    changeColType (state, dataAll) {
      //var idx = this.getters.getId(dataAll.kalkulaceid)
      var idx = dataAll.kalkulaceid
      var idxCol = dataAll.idxCol

        state.Kalkulace[idx].sloupecid[idxCol].data = {}

        try {
          state.Kalkulace[idx].sloupecid[idxCol].type = dataAll.type
        //  state.Kalkulace[idx].sloupecid[idxCol].id = dataAll.id
        } catch(e) {
          console.log('Chyba zmeny typu sloupec')
        }


    },

    editKalk (state, kalkulaceidKeyValue) {
      console.log('Edit Klice :  ', kalkulaceidKeyValue)
      var klic = kalkulaceidKeyValue.key
      console.log("Klic :", klic , kalkulaceidKeyValue.key )
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[`'${kalkulaceidKeyValue.key}'`] = kalkulaceidKeyValue[kalkulaceidKeyValue.value]
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data['Menu1Value'] = kalkulaceidKeyValue.value
      try {
        state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[klic] = kalkulaceidKeyValue.value
        console.log("OK  001 STORE klic: ", klic, "hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
      } catch (err) {

        console.log("Chybka 001 STORE klic: ", klic, "hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
      }

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
    removeCol (state, pole) {
      var kalkulaceid = pole.kalkulaceid
      var sloupecidx = pole.idxCol

      state.Kalkulace[kalkulaceid].sloupecid.splice(sloupecidx, 1)
      return

      // console.log('A :', JSON.stringify(kalkulaceid, sloupecid))
      // state.Kalkulace.forEach((el, idxk) => {
      //   if (el.kalkulaceid === kalkulaceid) {
      //     console.log('C', sloupecid)
      //     idk = idxk

      //     el.sloupecid.forEach((el2, idx) => {
      //       if (el2.id === sloupecid.id) {
      //         ids = idx
      //       }
      //     })
      //   }
      // })
      // if (idk > -1 && ids > -1 ) {
      //   state.Kalkulace[idk].sloupecid.splice(ids, 1)
      // }
    },
    removeKalkColID (state, pole) {

    var idx = -1
    var idk = -1

      try{
      state.Kalkulace.forEach((el2,idx2) => {
        console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2, " // ", el2.kalkulaceid  , pole )
        if (el2.kalkulaceid === pole.kalkulaceid) {
          console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2 , pole )
          idk=idx2
        state.Kalkulace[idx2].sloupecid.forEach((el, idxk) => {
          console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2 , el )
        if (el.id === pole.sloupecid) {
          idx = idxk
          return idx
        }
      })
      if (idk > -1 && idx > -1 ) {
        //console.log("COL NASEL Id :", pole.sloupecid, "  poradi ",idx )
        state.Kalkulace[idk].sloupecid.splice(idx, 1)
      }
      return
    }
    })



    } catch(e) {

     console.log("NENI Sloupiec id pr kalkulaci ", idk ,  e )
    }
  },
    removeKalkColID0 (state, pole) {
      var kalkulaceid = pole.kalkulaceid
      var sloupecid = pole.sloupecid
      var idk = -1
      var ids = -1
      // console.log('Remove kalk kol id:', JSON.stringify(kalkulaceid, sloupecid))
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
    copyKalk ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('copyKalk', kalkulaceid)
    },
    copyCol ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('copyCol', kalkulaceid)
    },
    setKalk ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('setKalk', kalkulaceid)
    },
    setKalk2 ({commit}, kalkulaceid) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('setKalk2', kalkulaceid)
    },
    replaceKalk ({commit}, dataAll) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('replaceKalk', dataAll)
    },
    replaceKalkCol ({commit}, dataAll) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('replaceKalkCol', dataAll)
    },
    changeColType ({commit}, dataAll) {
      // console.log('Actions- setWin -Dispatch', newWin)
      commit('changeColType', dataAll)
    },

    editKalk ({commit}, kalkulaceidKeyValue) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('editKalk', kalkulaceidKeyValue)
    },
    saveKalk ({commit}, kalkulaceidKeyValue) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('saveKalk', kalkulaceidKeyValue)
    },
    saveCols ({commit}, kalkulaceidKeyValue) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('saveCols', kalkulaceidKeyValue)
    },
    removeKalk ({commit}, kalkulaceid) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('removeKalk', kalkulaceid)
    },
    removeCol ({commit}, kalkulaceid) {
      // console.log('Actions- removeKalk ', kalkulaceid)
      // return
      commit('removeCol', kalkulaceid)
    },
    addKalkCol ({commit}, kalkulaceid) {
      console.log('Actions- addKalkCol -Dispatch', kalkulaceid)
      commit('addKalkCol', kalkulaceid)
    },


    addColMat ({commit}, kalkulaceid) {
      console.log('Add Materialy', kalkulaceid)
      //alert('store mat')
      commit('addColMat', kalkulaceid)
    },
    addColMat2 ({commit}, kalkulaceid) {
      console.log('Add Materialy', kalkulaceid)
      //alert('store mat')
      commit('addColMat2', kalkulaceid)
    },

    removeKalkCol ({commit}, pole) {
      console.log('Actions- setWin -Dispatch', pole)
      commit('removeKalkCol', pole)
    }
    ,removeKalkColID ({commit}, pole) {
      console.log('REMOVE ID', pole)
      commit('removeKalkColID', pole)
    }
    ,saveKalkCela ({commit}, pole) {
      console.log('saveKalkCela', pole)
      commit('saveKalkCela', pole)
    },
    removeKalkAccId ({commit}, pole) {
      console.log('Actions- setWin -Dispatch', pole)
      commit('removeKalkAccId', pole)
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
      try {
        state.Kalkulace.forEach((el, idxk) => {
          if (el.kalkulaceid === id) {
            idx = idxk
            return idx
          }
        })
      } catch(e){
        console.log('chybka id')
      }

      return idx
    },

    getIdCol: state => (id,idCol) => {
      var idx = -1

      try{
      state.Kalkulace.forEach((el2,idx2) => {
        if (el2.kalkulaceid === id) {
          console.log("Hledam ", idCol , "v kalkulaci ", id, " idx2 ", idx2  )
        state.Kalkulace[idx2].sloupecid.forEach((el, idxk) => {
        if (el.id === idCol) {
          idx = idxk
          return idx
        }
      })
      return
    }
    })


      console.log("Col Id :", icCol, "  poradi ",idx )
    } catch(e) {

     // console.log("neni Sloupiec id pr kalkulaci ", id  )
    }

      return idx
    }

    ,getIdColType: state => (id,idCol) => {
      var idx = ""

      try{
      state.Kalkulace.forEach((el2,idx2) => {
        // console.log("Hledam ", idCol , "v kalkulaci ", id, " idx2 ", idx2 ,"el.kalkulaceid" , el2.kalkulaceid )
        if (el2.kalkulaceid === id) {
          // console.log("Hledam ", idCol , "v kalkulaci ", id, " idx2 ", idx2  )
        state.Kalkulace[idx2].sloupecid.forEach((el, idxk) => {
        if (el.id === idCol) {
          idx = el.type
          return idx
        }
      })
      return
    }
    })


      console.log("Col Id :", icCol, "  poradi ",idx )
    } catch(e) {

     //console.log("neni Sloupiec id pro kalkulaci ", id  )
    }

      return idx
    }

  }
})
