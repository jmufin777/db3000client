import moment from 'moment'
//import Q from '../../services/query'
import Q from './query'
import f from './fce'
import prepocty from './fceKalkulacePrepocty'
import store from '@/store/store'
import {mapState} from 'vuex'
import { eventBus } from '@/main.js'
//import Vue2 from 'vue'
// export const eventBus = new Vue()

const cols = `
  nazev,
  kcks,
  ks,
  naklad ,
  marze ,
  prodej ,
  marze_pomer,
  obsah,
  expedice_datum,
  expedice_cas

  `

  //--obsah,

export default {


///Prace


async setKalk(data,kalkulace,_idefix=0) {
  const self=this
  var q=""
  var idefix=store.state.idefix
  var qover ='NIC'

  //self.Vklad()
  //return

  data.kcks*=1
  data.ks*=1
  data.naklad*=1  // spravne = sum naklad ze vsech radek aktulani kalkulace
  data.prodej*=1
  data.marze*=1 // Spocitat z prodej naklad
  data.marze_pomer*=1 // Spocitat take z prodej naklad

  var kalkulace2= JSON.stringify(kalkulace)

  var atmp=[]

  //   title: "Success" + data.idefix+ ' '+ data.nazev + '/ ' + data.nazevOrig + data.user_update_idefix + ' '+ idefix,
//  f.Alert2(data.user_update_idefix,data.nazev, idefix)

  if (data.user_update_idefix*1 > 0 && idefix*1 !== data.user_update_idefix*1){
  //  f.Alert('Cizi vynalez -VLOZIT',idefix , data.user_update_idefix)
    $("#box"+data.ID ).dialog({
      modal: false,
      buttons: {
        Vlozit: function() {
          data.Vlozit=1
          self.Vklad(data, kalkulace2)

          $( this ).dialog( "close" );
        },
        Zrusit: function() {
          data.Vlozit=-1

          $( this ).dialog( "close" );
        },
      },
      title: "Vklad - kopie",
      dialogClass: "my-dialog-1",

      show: {
        effect: "fade",
        duration: 500
      },
      hide: {
        effect: "fade",
        duration: 500
      },
      // position:
      //   {
      //       my: 'left',
      //       at: 'right',
      //       of: event
      //   }

    });
    return
  }




  var idefixOver=0
  if (data.user_update_idefix ==0) {
    qover=`select * from calc_templates where nazev = trim('${data.nazev}') and user_update_idefix = ${idefix} `
    // f.Alert(qover)
    try {
      atmp= (await Q.all(idefix,qover)).data.data
      // f.Alert(JSON.stringify(atmp) )
      if (atmp.length >= 1 ){
        idefixOver = atmp[0].idefix
      } else {
        //Vloziti
        $("#box"+data.ID ).dialog({
          modal: false,
          buttons: {

            Vlozit: function() {
              data.Vlozit=1
              self.Vklad(data, kalkulace2)
              $( this ).dialog( "close" );
            },
            Zrusit: function() {
              data.Vlozit=-1
              $( this ).dialog( "close" );
            },
          },
          title: "Zmena nazvu",
          dialogClass: "my-dialog-1",
          show: {
            effect: "fade",
            duration: 500
          },
          hide: {
            effect: "fade",
            duration: 500
          },
        });
        //Vloziti
      }
    }catch(e) {
      f.Alert('Nelze zjistit obsah templates',e)
      console.log("ERR Kalk1", e)
    }
  }
 if (idefixOver > 0 ) {
  $("#box"+data.ID ).dialog({
    modal: false,
    buttons: {
      Ulozit: function() {
        data.Vlozit=1
        self.Zmena(data, kalkulace2,idefixOver)
        $( this ).dialog( "close" );
      },
      Zrusit: function() {
        data.Vlozit=-1
        $( this ).dialog( "close" );
      },
    },
    title: "Nalezen stejny nazev",
    dialogClass: "my-dialog-1",

    show: {
      effect: "fade",
      duration: 500
    },
    hide: {
      effect: "fade",
      duration: 500
    },
    // position:
    //     {
    //         my: 'left',
    //         at: 'right',
    //         of: event
    //     }

  });
} else

if (data.idefix > 0) {

    if (data.nazev !== data.nazevOrig){
      $("#box"+data.ID ).dialog({
        modal: false,
        buttons: {
          Prepis: function() {
            data.Vlozit=1
            self.Zmena(data, kalkulace2,data.idefix)
            $( this ).dialog( "close" );
          },
          Vlozit: function() {
            data.Vlozit=1
            self.Vklad(data, kalkulace2)
            $( this ).dialog( "close" );
          },
          Zrusit: function() {
            data.Vlozit=-1
            $( this ).dialog( "close" );
          },
        },
        title: "Zmena nazvu",
        dialogClass: "my-dialog-1",
        show: {
          effect: "fade",
          duration: 500
        },
        hide: {
          effect: "fade",
          duration: 500
        },
      });
    } else
    if (data.nazev == data.nazevOrig){
      $("#box"+data.ID ).dialog({
        modal: false,
        buttons: {
          Prepis: function() {
            data.Vlozit=1
            self.Zmena(data, kalkulace2,data.idefix)
            $( this ).dialog( "close" );
          },

          Zrusit: function() {
            data.Vlozit=-1
            $( this ).dialog( "close" );
          },
        },
        title: "Ulozeni ",
        dialogClass: "my-dialog-1",
        show: {
          effect: "fade",
          duration: 500
        },
        hide: {
          effect: "fade",
          duration: 500
        },
        // position:
        // {
        //     my: 'left',
        //     at: 'right',
        //     of: event
        // }
      });
    }
  }


  // kalkulace.forEach(element => {
  //   element.data.Format=[]

  // });



if (_idefix > 0 && data.nazev==data.nazevOrig) {

 self.Zmena(data,kalkulace2,_idefix)
}
},


async Vklad(data, kalkulace2 ){
  var idefix=store.state.idefix
  var atmp=[]
  var nret = 0
  var q = `insert into calc_templates ( ${cols},user_insert_idefix,user_update_idefix)
  values (
    trim('${data.nazev}'),'${data.kcks}','${data.ks}','${data.naklad}','${data.marze}','${data.prodej}','${data.marze_pomer}','${kalkulace2}','${data.expedice_datum}','${data.expedice_cas}','${idefix}','${idefix}'

  ) `;
  await Q.post(0,q)
  try {
    atmp= (await Q.all(idefix,'select max(idefix) as idefix  from calc_templates')).data.data
    if (atmp.length == 1 ){
      nret = atmp[0].idefix
      //f.Alert(nret)
      store.dispatch('setKalkulaceIdefix',nret)
    }
    //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
  } catch (e) {
    f.Alert('ERR Vklad kalkulace ',e)
    console.log("ERR Kalk1", e)
  }


  // f.Alert('Funkce vklad')

},
async CopyUser(idefixactive=0,cTable="") {

  var q = `insert into ${cTable} ( ${cols},user_insert_idefix,user_update_idefix, active)
  select ${cols},user_insert_idefix,user_update_idefix, true from ${cTable} where idefix=${idefixactive}
  `
  await Q.post(0,`update ${cTable} set active=false where active`)
  .then ( res=>{
    //f.Alert('pokus')
  })
  .catch(e=>{
    f.Alert2("Doslo k chyba pri oznaceni ACTIVE ", e)
  })
  await Q.post(0,q)
  .then ( res=>{
    //f.Alert('pokuscopy', q)
  })
  .catch(e=>{
    f.Alert2("Doslo k chyba pri vkladu kopie kalkulace", e)
  })
  await Q.post(0,`update ${cTable} set nazev = nazev|| ' 2' where idefix = (select max(idefix) from ${cTable})`)
  .then ( res=>{
    //f.Alert('pokus')
  })
  .catch(e=>{
    f.Alert2("Doslo k chyba pri oznaceni ACTIVE ", e)
  })

},
async VkladUser(data, kalkulace2, cTable, nazev="", active= false, idefixactive=0, SaveKalkulkace=true, SaveData=true){

  var idefix=store.state.idefix
  var atmp=[]
  var nret = 0
  var dataBck=f.Jparse(data)
  var aCols = cols.split(",")
  if (nazev >''){
    data.nazev=nazev
  }
  if (nazev=="undefined"){
    alert('sakra')
  }
  //if (f.isEmpty(data.nazev)) {
    //data.nazev=''


    data.kcks=0
    data.ks=0
    data.naklad=0
    data.marze=0
    data.prodej=0
    data.marze_pomer=0
    data.expedice_datum='2019-01-01'
    data.expedice_cas='12:00'

    var neco=""

    for (var x=0; x< aCols.length;x++){
        neco = aCols[x].trim()
      if (!f.isEmpty(dataBck[neco])){
        data[neco]  = dataBck[neco]
      }
    }

    //f.Alert("Data po ", f.Jstr(data), f.Jstr(dataBck))  ;

    //f.Alert('Data X', cols.split(",").length)
    //return;
  //}
    if (data.ks>0) {
      data.naklad = await(prepocty.getNaklad(f.Jparse(kalkulace2)))
    }
    kalkulace2 = JSON.stringify(kalkulace2)
    await Q.post(0,`update ${cTable} set active=false where active`)
    //Prepocet
  if (active==true || idefixactive==0)  {
  var q = `insert into ${cTable} ( ${cols},user_insert_idefix,user_update_idefix, active)
  values (
    trim('${data.nazev}'),'${data.kcks}','${data.ks}','${data.naklad}','${data.marze}','${data.prodej}','${data.marze_pomer}','${kalkulace2}','${data.expedice_datum}','${data.expedice_cas}'
    ,'${idefix}','${idefix}','${active}'

  ) `
  //f.Alert("Isert " , idefixactive , active)
  } else {
    if (SaveKalkulkace==true && SaveData==true) {
        var q = `update ${cTable} set
      nazev              = trim('${data.nazev}'),
      kcks               = '${data.kcks}',
      ks                 = '${data.ks}',
      naklad             = '${data.naklad}',
      marze              = '${data.marze}',
      prodej             = '${data.prodej}',
      marze_pomer        = '${data.marze_pomer}',
      obsah              = '${kalkulace2}',
      expedice_datum     = '${data.expedice_datum}',
      expedice_cas       = '${data.expedice_cas}',
      user_update_idefix = '${idefix}',
      time_update = now()
      where idefix = ${idefixactive}
      `
  } else
  if (SaveKalkulkace==true && SaveData==false) {

    var q = `update ${cTable} set
        obsah              = '${kalkulace2}',
        user_update_idefix = '${idefix}',
        time_update = now()
        where idefix = ${idefixactive}
  `
//  f.Alert('Ulozeni bez data ', q )
} else
  if (SaveKalkulkace==false) {  //Zabalena radka, kalkulaci neprepisuji
    var q = `update ${cTable} set
    nazev              = trim('${data.nazev}'),
    kcks               = '${data.kcks}',
    ks                 = '${data.ks}',
    naklad             = '${data.naklad}',
    marze              = '${data.marze}',
    prodej             = '${data.prodej}',
    marze_pomer        = '${data.marze_pomer}',
    expedice_datum     = '${data.expedice_datum}',
    expedice_cas       = '${data.expedice_cas}',
    user_update_idefix = '${idefix}',
    time_update = now()
    where idefix = ${idefixactive}
    `
  }
  //f.Alert("IPDATE")
  }
  //obsah='${kalkulace}',
   //  f.Alert('Update ' ,q)
     // console.log('Update ' ,q)

//    await Q.post(0,q)

  //f.Info("Q", q)
  // return
  //f.Alert("VKL", nazev, f.Jstr(data.nazev))
  await Q.post(0,q)
  .then ( res=>{
    //f.Alert('pokus')
  })
  .catch(e=>{
    f.Alert2("Doslo k chyba pri vkladu do DB", e)
  })
  return;
},
async setActive(idefix=0,cTable, Aktivuj=1){
  await Q.post(0,`update ${cTable} set active=false where active`)
  if (Aktivuj>0) {
    await Q.post(0,`update ${cTable} set active=true where idefix=${idefix}`)
  }

},
async getActive(cTable){
    var defer = $.Deferred();
    try {
      var atmp= (await Q.all(0,`select idefix from  ${cTable} where  active=true `))
    if (atmp.length>0){
        f.Alert2("ACTIVE",1, f.Jstr(atmp),`select idefix from  ${cTable} where  active=true`)
        //defer.resolve(atmp[0].idefix)
    } else {
       f.Alert2("ACTIVE",0, f.Jstr(atmp),`select idefix from  ${cTable} where  active=true`)
        defer.resolve(0)
    }

    }catch(e) {
      f.Alert('pojeblo')
  }

  return defer.promise()
},
async delete(idefix=0,cTable){
  await Q.post(0,`delete from  ${cTable}  where idefix=${idefix}`)
},

async Zmena(data,kalkulace2,_idefix){
  var idefix=store.state.idefix
  var atmp=[]
  var nret = 0

  var q = `update calc_templates set
  nazev          = trim('${data.nazev}'),
  kcks           = '${data.kcks}',
  ks             = '${data.ks}',
  naklad         = '${data.naklad}',
  marze          = '${data.marze}',
  prodej         = '${data.prodej}',
  marze_pomer    = '${data.marze_pomer}',
  obsah          = '${kalkulace2}',
  expedice_datum = '${data.expedice_datum}',
  expedice_cas   = '${data.expedice_cas}',
  user_update_idefix='${idefix}',
  time_update = now()
   where idefix = ${_idefix}
  `
  //obsah='${kalkulace}',
   //  f.Alert('Update ' ,q)
     console.log('Update ' ,q)

    await Q.post(0,q)
    try {
      atmp= (await Q.all(idefix,'select max(idefix) as idefix  from calc_templates')).data.data
      if (atmp.length == 1 ){
        nret = atmp[0].idefix
        //f.Alert(nret)
        store.dispatch('setKalkulaceIdefix',_idefix)
      }
      //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
    } catch (e) {
      f.Alert('Err Zmena Kalkulace',e)
      console.log("ERR Kalk1", e)
    }
    //console.log(store)
    return nret

},
async getTemplates() {

  var idefix=store.state.idefix
  var q= `select
          a.idefix,
          a.nazev,
          a.kcks,
          a.ks,
          a.naklad ,
          a.marze ,
          a.prodej ,
          a.marze_pomer,
          a.expedice_datum,
          a.expedice_cas,
          a.user_update_idefix,
          b.login  from calc_templates a join list_users b on a.user_update_idefix = b.idefix `;
  q= `${q} order by  case when a.user_update_idefix = ${idefix} then 1 else 2 end , nazev`
  var atmp=[]
  //f.Alert("BUS ",Vue2)
  try {
    atmp= (await Q.all(idefix,q)).data.data
    eventBus.$emit('DATATEMPLATES',{data: atmp})
    return atmp
    //
  } catch (e) {
    f.Alert('nevidim templats',e, q)
    console.log("ERR pozadavek na templates", e)
  }
  ///f.Alert(JSON.stringify(atmp))
},
async getTemplatesUser(cTable,poradiFrom=0,poradiTo=0) {
  var defer = $.Deferred();
  var idefix=store.state.idefix

  var q= `select
          a.idefix,
          a.nazev,
          a.kcks,
          a.ks,
          a.naklad ,
          a.marze ,
          a.prodej ,
          a.marze_pomer,
          a.expedice_datum,
          a.expedice_cas,
          a.user_update_idefix,
          a.poradi,
          a.active,
          b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix `;

  q= `${q} where true `

  if (poradiFrom > 0) {
    q= `${q} and poradi>= ${poradiFrom} `
  }
  if (poradiTo > 0) {
    q= `${q} and poradi<= ${poradiTo} `
  }
  q= `${q} order by  idefix,case when a.user_update_idefix = ${idefix} then 1 else 2 end , nazev `
  //return;
  var atmp=[]
    try {
      // f.Alert('kve 1')
      atmp= (await Q.all(idefix,q)).data.data
      // f.Alert('kve 2')
      await atmp.forEach(el=>{
        el.expedice_datum= f.datum3(el.expedice_datum)
        el.expedice_cas  = f.cas3(el.expedice_cas)
        defer.resolve(atmp)
        // f.Info('Get User 1',el.expedice_datum, "DATA: ",JSON.stringify(atmp))
      })
    }  catch(e) {
      defer.resolve(atmp)
      f.Alert2('Chyba  getTemplatesUser', e )
    }

    //f.Info('Get User 1',JSON.stringify(atmp))


  return defer.promise()
  ///f.Alert(JSON.stringify(atmp))
},

async getTemplate(_idefix=0, cTable="") {
  var defer = $.Deferred();
  var idefix=store.state.idefix
  var q= 'select a.*,b.login  from calc_templates a join list_users b on a.user_update_idefix = b.idefix ';
  q= `${q} where a.idefix= ${_idefix} `
  var atmp=[]
  //f.Alert("BUS ",Vue2)
  try {
    atmp= (await Q.all(idefix,q)).data.data
    defer.resolve(atmp);
  //  eventBus.$emit('DATATEMPLATE',{data: atmp})
    //return atmp
    //
  } catch (e) {
    f.Alert('nevidim templats',e, q)
    console.log("ERR pozadavek na templates", e)
    defer.resolve(false);
  }
  return defer.promise();
  ///f.Alert(JSON.stringify(atmp))
},

async getTemplateUser(_idefix=0, cTable="") {
  var defer = $.Deferred();
  var idefix=store.state.idefix
  var q= `select a.*,b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix `;
  q= `${q} where a.idefix= ${_idefix} `
  var atmp=[]
  //f.Alert("BUS ",Vue2)
  try {
    atmp= (await Q.all(idefix,q)).data.data
    defer.resolve(atmp);
  //  eventBus.$emit('DATATEMPLATE',{data: atmp})
    //return atmp
    //
  } catch (e) {
    f.Alert('nevidim templats',e, q)
    console.log("ERR pozadavek na templates", e)
    defer.resolve(false);
  }
  return defer.promise();
  ///f.Alert(JSON.stringify(atmp))
},


async deleteTemplate(_idefix) {
  const self=this
  var idefix=store.state.idefix
  var q= '';

  var atmp=[]
  //f.Alert("BUS ",Vue2)
  var q= `delete  from calc_templates where idefix = ${_idefix} returning *`;
  //f.Alert("BUS ",q)
  try {
    atmp= (await Q.post(idefix,q)).data.data

    self.getTemplates()
    return atmp

    //
  } catch (e) {
    f.Alert('nevidim templates',e, q)
    console.log("ERR pozadavek na templates", e)
  }
  ///f.Alert(JSON.stringify(atmp))

},


//Stroj
async getStrojDetail(idefixmod){
var atmp=[]

},

computed: {
  ...mapState([
    'isUserLoggedIn',
    'xMenuMain',
    'level',
    'idefix',
    'compaStore',
    'Kalkulace',
    'KalkulaceThis',
    'user',
  ]),

},


}
