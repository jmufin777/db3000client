import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'
import ListStroj from '../services/ListStrojService'
import f from '@/services/fce'
import { eventBus } from "@/main.js";
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
    KalkulaceColThis: -1,
    KalkulaceLast: -1,
    KalkulaceID: -1, //Aktivni id sloupce ....
    KalkulaceIdefix: -1, //
    KalkulaceFormat:[],
    KalkulaceStrojeV:[],
    KalkulaceStrojeA:[],
    KalkulaceStrojeExterni:[],
    KalkulaceStrojeJine:[],
    KalkulaceMod:[],
    Strana: 15  //Default na stranku v tabulce
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setVal (state, jval) {
      for (const i in jval) {
        //  console.log(i)
          if (state.hasOwnProperty(i)) {  //Je t stejny, ale ty jo nevim tak je to jakoby rozdeleny, abyto slo upravit kdyby to nebylo takle spravne
            state[i]=jval[i]
          } else {
            state[i]=jval[i]
          }
      }
      //state['JARDATEST'] = jval.val
    },
    setValInit (state, jval) {
      for (const i in jval) {
        //  console.log(i)
          if (state.hasOwnProperty(i)) {  //Je t stejny, ale ty jo nevim tak je to jakoby rozdeleny, abyto slo upravit kdyby to nebylo takle spravne
            //pokud existuje nedela nic
          } else {
            state[i]=jval[i]  //Vklada nebo zaklada nboiu
          }
      }
      //state['JARDATEST'] = jval.val
    },
    unset (state, jval) {
      let nc=0;
      for (const i in jval) {
        //  console.log(i)
          if (state.hasOwnProperty(i)) {  //Pokud narazi na shodu, vrati jeho index ve state a odstrani jej
            delete state[i]
          }
      }
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
//          state.WinDows[ind].z1 = state.zMax
            state.WinDows[ind]["z1"]= state.zMax
        } else {
  //        state.WinDows[ind].z1 = 999

            if (state.WinDows[ind]) {
              state.WinDows[ind]["z1"] = 999
              // console.log("HUHUHU WIN ",ind , "   " , state.WinDows[ind])
            } else {
              // console.log("HOHOHOHOOOO WIN ",ind , "   " , state.WinDows[ind])

            }

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
      // console.log('A :', JSON.stringify(kalkulace))
      // alert('A :' + JSON.stringify(kalkulace) + ' // ' + state.Kalkulace.length)


      if (state.Kalkulace == null) {
        state.Kalkulace = []
      }
      // f.Alert('addKalkTYPE: ', ' ', '  ',f.Jstr(kalkulace) );
      if (state.Kalkulace.length>0) {
        // f.Alert2('A :' + JSON.stringify(state.Kalkulace[0].data) + ' // ' + state.Kalkulace.length)
        // JARDA 20191114
        kalkulace.data=state.Kalkulace[0].data
        kalkulace.type=state.Kalkulace[0].type

        var tmpId = kalkulace.kalkulaceid
        tmpIdNew = kalkulace.kalkulaceid
        for (var i = 0; i <= 3; i++) {
          state.Kalkulace.forEach(el => {
            if (el.kalkulaceid === tmpId) {
              tmpIdNew += 1
              tmpId = tmpIdNew
            }
          })
        }
      }
      kalkulace.kalkulaceid = tmpIdNew

      // kalkulace.type=kalkulace //Prijde ve strukture pri zalozeni
      state.Kalkulace.push(kalkulace)
      state.KalkulaceLast = kalkulace.kalkulaceid
      // console.log("Vkladam : ", state.KalkulaceLast )

    },
    setID(state, kalkulace) {
      if (state.KalkulaceID!=kalkulace.ID) {
        state.KalkulaceID = kalkulace.ID
      }

    },
    setStrana(state, kalkulace) {
      //if (state.Strana!=kalkulace.Strana) {
          state.Strana = kalkulace.Strana
      //}

    },

    setFormat(state) {
      const self = this
      if (state.Kalkulace.length==1 || !state.KalkulaceFormat.length || state.KalkulaceFormat.length==0 ){
          //var atmp=(await ListStroj.one(this.user,-1, 500)).data.enum_format
          ListStroj.one(this.user,-1, 500)
          .then(res => {
            self.commit('setFormatState',res.data.enum_format)
          })
          }
    },
    setFormatState(state,b2) {
      state.KalkulaceFormat = []
      state.KalkulaceFormat = b2
    },

    async setStrojeV(state) {

      if (state.Kalkulace.length==1 || !state.KalkulaceStrojeV.length || state.KalkulaceStrojeV.length==0 ){
        // alert('For,aty')
        let atmpV=[]
        state.KalkulaceStrojeV=[]
        atmpV=(await ListStroj.one(this.user,-1, 10411)).data.enum_strojmod_full
        atmpV.forEach(elV => {
          state.KalkulaceStrojeV.push(elV)
        })


      }
    },
    async setStrojeA(state) {
      if (state.Kalkulace.length==1 || !state.KalkulaceStrojeA.length || state.KalkulaceStrojeA.length==0 ){
        // alert('For,aty')
        let atmpA=[]
        atmpA=(await ListStroj.one(this.user,-1, 10410)).data.enum_strojmod_full
        state.KalkulaceStrojeA=[]
        atmpA.forEach(elA => {
          state.KalkulaceStrojeA.push(elA)
        })
      }
    },
    async setStrojeJine(state) {
      if (state.Kalkulace.length==1 || !state.KalkulaceStrojeJine.length || state.KalkulaceStrojeJine.length==0 ){
        // alert('For,aty')
        let atmpJ=[]
        atmpJ=(await ListStroj.one(this.user,-1, 10412)).data.enum_strojmod_full
        state.KalkulaceStrojeJine=[]
        atmpJ.forEach(elJ => {
          state.KalkulaceStrojeJine.push(elJ)
        })
      }
    },
    async setStrojeExterni(state) {
      if (state.Kalkulace.length==1 || !state.KalkulaceStrojeExterni.length || state.KalkulaceStrojeExterni.length==0 ){
        // alert('For,aty')
        let atmpE=[]
        atmpE=(await ListStroj.one(this.user,-1, 10413)).data.enum_strojmod_full
        state.KalkulaceStrojeExterni=[]
        atmpE.forEach(elE => {
          state.KalkulaceStrojeExterni.push(elE)
        })
      }
    },
    addKalkCol (state, kalkulacecoltype) {
      // console.log('A :', JSON.stringify(kalkulacecoltype.kalkulaceid))
      var newId = -1
      var idK  = -1
      return new Promise((resolve)=>{
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
        // console.log('Add : ', state.Kalkulace[idK])
        state.Kalkulace[idK].sloupecid.push({id: newId, type: kalkulacecoltype.type,  data: {}})
      }
      resolve(eventBus.$emit('addKalkCol'))
     })
    },
    KalkulaceColThis(state,ColThis){

      state.KalkulaceColThis = ColThis
    },
    saveKalk(state,kalkulace){
      // console.log('SAVE ' ,kalkulace.id)
      state.Kalkulace[kalkulace.id]= kalkulace.data
    },
    saveKalkCela(state,kalkulace){
      // console.log('SAVE ' ,kalkulace.id)

      return new Promise((resolve)=>{
        state.Kalkulace = []

        state.Kalkulace= kalkulace.data


        resolve(eventBus.$emit('saveKalkCela'))

      })

      return


    },
    saveCols(state,kalkulace){
      // console.log('SAVE COLS' ,kalkulace.id)
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
        // console.log('Mam delku:', JSON.stringify(kalkulacecoltype.kalkulaceid), "type orig:", state.Kalkulace[idK].sloupecid[0].type)
        if (state.Kalkulace[idK].sloupecid[0].type==type){
          // console.log('Shoda:', JSON.stringify(kalkulacecoltype.kalkulaceid), "type orig:", state.Kalkulace[idK].sloupecid[0].type)
          state.Kalkulace[idK].sloupecid[0] = {id: (Math.ceil(Math.random()*91000)) , type: type,  data: {}}
        } else {
          state.Kalkulace[idK].sloupecid.splice(0,0,{id: (Math.ceil(Math.random()*91000)) , type: type ,  data: {}})
        }
        //state.Kalkulace[idK].sloupecid[0] = {id: newId, type: kalkulacecoltype.type,  data: {}}
      } else {
        state.Kalkulace[idK].sloupecid.push({id: (Math.ceil(Math.random()*91000)) , type: type ,  data: {}})
        // console.log('NE Mam delku:', JSON.stringify(kalkulacecoltype.kalkulaceid))
        //state.Kalkulace[idK].sloupecid.push({id: 1, type: kalkulacecoltype.type,  data: {}})
      }
      return
    },
    addColMat2 (state, kalkulacecoltype) {
      var idK = kalkulacecoltype.kalkulaceid
      var type= kalkulacecoltype.type
      var colid= kalkulacecoltype.id
      // console.log('A 2aaaa2:', JSON.stringify(kalkulacecoltype))
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
      // console.log('Remov ', kalkulaceid)
      state.Kalkulace = state.Kalkulace.filter(function (el) {
        return el.kalkulaceid !== kalkulaceid
      })
    },
    removeKalkAccIdXXXXX (state, kalkulaceid) {
      // console.log('RemoveAccID ', kalkulaceid.kalkulaceid)
      state.Kalkulace.splice(kalkulaceid.kalkulaceid,1)
    },
    setKalkulaceIdefix (state, kalkulaceidefix) {
      // console.log('Set ', kalkulaceidefix)
      state.KalkulaceIdefix = kalkulaceidefix
    },
    setKalk2 (state, kalkulaceid) {
      f.Alert2('Set acc ID ', kalkulaceid)
      try {
        state.KalkulaceThis = state.Kalkulace[kalkulaceid].kalkulaceid
      } catch (e) {
          // console.log("Chyba sek Kalk2 ")
      }
    },
    setKalk (state, kalkulaceid) {
      //      f.Alert2('Set ', kalkulaceid)
            state.KalkulaceThis = kalkulaceid
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
        neco.data.Priloha1Txt=''
        neco.data.Priloha1Idefix=0
        neco.data.Priloha2Txt=''
        neco.data.Priloha2Idefix=0
        neco.data.Priloha3Txt=''
        neco.data.Priloha3Idefix=0
        neco.data.Priloha4Txt=''
        neco.data.Priloha4Idefix=0
        neco.data.Priloha5Txt=''
        neco.data.Priloha5Idefix=0
        if (neco.sloupecid.length>0){
            newIdC=Math.ceil(Math.random()*5587515)
            neco.sloupecid.forEach(el=>{
            el.id = newIdC++
        //    // console.log("copyKalk ", neco)
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
      neco.id=Math.ceil(Math.random()*55875115)
      // console.log("COPY: " , neco)
      state.Kalkulace[idx].sloupecid.push(neco)
      f.log('copyCol ')
      //state.Kalkulace[idx].sloupecid.push('ahoj')
    },
    replaceKalkCol (state, dataAll) {
      //var idx = this.getters.getId(dataAll.kalkulaceid)
      try {
        var idx = dataAll.kalkulaceid
        var idxCol = dataAll.idxCol
        state.Kalkulace[idx].sloupecid[idxCol].data = dataAll.data
        f.log('replaceKalkCol- SAVE')
      } catch (e) {
        f.log('replaceKalkCol- EROR')
      }
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
          // console.log('Chyba zmeny typu sloupec')
        }


    },

    editKalk (state, kalkulaceidKeyValue) {
  //    f.log('Edit Klice :  ', kalkulaceidKeyValue)
      var klic = kalkulaceidKeyValue.key
      // f.log("Klic :", klic , kalkulaceidKeyValue.key )
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[`'${kalkulaceidKeyValue.key}'`] = kalkulaceidKeyValue[kalkulaceidKeyValue.value]
      // state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data['Menu1Value'] = kalkulaceidKeyValue.value
      try {
        if (state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[klic] == kalkulaceidKeyValue.value){
          //f.log("OK  001 STORE klic SHODA : "+ klic+ " hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
        } else {
          state.Kalkulace[kalkulaceidKeyValue.kalkulaceid].data[klic] = kalkulaceidKeyValue.value
          f.log("OK  001 STORE klic: "+ klic+ " hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
        }
        // f.log("OK  001 STORE klic: "+ klic+ " hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
      } catch (err) {

        f.log("Chybka 001 STORE klic: "+ klic+ " hodnota: "  ,kalkulaceidKeyValue.value , " id kalkulace : ",kalkulaceidKeyValue.kalkulaceid )
      }

      // console.log('Edit 2', state.Kalkulace["'" + kalkulaceidKeyValue.key + "'"])
    },
    removeKalkCol (state, pole) {
      var kalkulaceid = pole.kalkulaceid
      var sloupecid = pole.sloupecid
      var idk = -1
      var ids = -1
      // console.log('A :', JSON.stringify(kalkulaceid, sloupecid))
      state.Kalkulace.forEach((el, idxk) => {
        if (el.kalkulaceid === kalkulaceid) {
          // console.log('C', sloupecid)
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
      //     // console.log('C', sloupecid)
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
        // console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2, " // ", el2.kalkulaceid  , pole )
        if (el2.kalkulaceid === pole.kalkulaceid) {
          // console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2 , pole )
          idk=idx2
        state.Kalkulace[idx2].sloupecid.forEach((el, idxk) => {
          // console.log("Hledam REMOVE ", pole.sloupecid , "v kalkulaci ", pole.kalkulaceid, " idx2 ", idx2 , el )
        if (el.id === pole.sloupecid) {
          idx = idxk
          return idx
        }
      })
      if (idk > -1 && idx > -1 ) {
        // console.log("COL NASEL Id :", pole.sloupecid, "  poradi ",idx )
        state.Kalkulace[idk].sloupecid.splice(idx, 1)
      }
      return
    }
    })



    } catch(e) {

     // console.log("NENI Sloupiec id pr kalkulaci ", idk ,  e )
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
          // console.log('C', sloupecid)
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
      // console.log('Actions- addKalkCol -Dispatch', kalkulaceid)
      commit('addKalkCol', kalkulaceid)
    },
    setID ({commit}, kalkulaceid) {
      // console.log('SET ID ', kalkulaceid)
      commit('setID', kalkulaceid)
    },
    setFormat ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setFormat')
    },

    setStrojeA ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setStrojeA')
    },
    setStrojeV ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setStrojeV')
    },
    setStrojeJine ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setStrojeJine')
    },
    setStrojeExterni ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setStrojeExterni')
    },
    setStrojeAll ({commit}) {
      // console.log('SET ID ', kalkulaceid)
      commit('setStrojeA')
      commit('setStrojeV')
      commit('setStrojeJine')
      commit('setStrojeExterni')
    },

    setKalkulaceIdefix ({commit}, kalkulaceidefix) {
      // console.log('SET ID ', kalkulaceidefix)
      commit('setKalkulaceIdefix', kalkulaceidefix)
    },

    setStrana ({commit}, kalkulaceid) {
      // console.log('SET STRANA ', kalkulaceid)
      commit('setStrana', kalkulaceid)
    },



    addColMat ({commit}, kalkulaceid) {
      // console.log('Add Materialy', kalkulaceid)
      // alert('store mat')
      commit('addColMat', kalkulaceid)
    },
    addColMat2 ({commit}, kalkulaceid) {
      // console.log('Add Materialy', kalkulaceid)
      // alert('store mat')
      commit('addColMat2', kalkulaceid)
    },

    removeKalkCol ({commit}, pole) {
      // console.log('Actions- setWin -Dispatch', pole)
      commit('removeKalkCol', pole)
    }
    ,removeKalkColID ({commit}, pole) {
      // console.log('REMOVE ID', pole)
      commit('removeKalkColID', pole)
    }
    ,saveKalkCela ({commit}, pole) {
      // console.log('saveKalkCela', pole)
      commit('saveKalkCela', pole)
    },
    removeKalkAccIdXXXXX ({commit}, pole) {
      // console.log('Actions- setWin -Dispatch', pole)
      commit('removeKalkAccId', pole)
    },
    KalkulaceColThis ({commit}, pole) {
      // console.log('Actions- setWin -Dispatch', pole)
      commit('KalkulaceColThis', pole)
    },
    setVal ({commit}, jval) {  //Vlozi nebo zalozi hodnotu
      commit('setVal', jval)
    },
    setValInit ({commit}, jval) {  //Vlozi pouze hodnoty( klice of state), ktere nejsou dosud pouzity
       commit('setValInit', jval)
    },
    unset ({commit}, jval) {
      // console.log('Actions- setWin -Dispatch', pole)
      commit('unset', jval)
    },





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
        // console.log('chybka id')
      }

      return idx
    },

    getIdCol: state => (id,idCol) => {
      var idx = -1

      try{
      state.Kalkulace.forEach((el2,idx2) => {
        if (el2.kalkulaceid === id) {
          // console.log("Hledam ", idCol , "v kalkulaci ", id, " idx2 ", idx2  )
        state.Kalkulace[idx2].sloupecid.forEach((el, idxk) => {
        if (el.id === idCol) {
          idx = idxk
          return idx
        }
      })
      return
    }
    })


      // console.log("Col Id :", icCol, "  poradi ",idx )
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


      // console.log("Col Id :", icCol, "  poradi ",idx )
    } catch(e) {

     // console.log("neni Sloupiec id pro kalkulaci ", id  )
    }

      return idx
    }

  }
})
