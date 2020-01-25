import moment from "moment";
//import Q from '../../services/query'
import Q from "./query";
import f from "./fce";
import prepocty from "./fceKalkulacePrepocty";
import store from "@/store/store";
import { mapState } from "vuex";
import { eventBus } from "@/main.js";
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

  `;

var idefix_vlastnik = 0;
var idefix_vlastnikPrace = 0;

export default {
  ///Prace

  async setKalk(data, kalkulace, _idefix = 0) {
    const self = this;
    var q = "";
    var idefix = store.state.idefix;
    var qover = "NIC";

    //self.Vklad()
    //return

    data.kcks *= 1;
    data.ks *= 1;
    data.naklad *= 1; // spravne = sum naklad ze vsech radek aktulani kalkulace
    data.prodej *= 1;
    data.marze *= 1; // Spocitat z prodej naklad
    data.marze_pomer *= 1; // Spocitat take z prodej naklad

    // f.Alert("Prepocet na jeden kus", data.ks)
    //prepocty.KalkulacePrepocetKusyNa1(kalkulace,data.ks)
    var kalkulace2 = JSON.stringify(kalkulace);
    //kalkulace2= f.Jparse(kalkulace2)
    await prepocty.KalkulacePrepocetKusyNa1(kalkulace, data.ks);
    try {
      // kalkulace2= await(prepocty.KalkulacePrepocetKusyNa1(kalkulace,data.ks))
      kalkulace2 = await prepocty.KalkulacePrepocetKusyNa1(kalkulace, data.ks);
      kalkulace2 = JSON.stringify(kalkulace2);
      data.ks = 1;
      //kalkulace2=  await(prepocty.KalkulacePrepocetKusy(nK[0].obsah,neco))
      //kalkulace2= prepocty.KalkulacePrepocetKusy(kalkulace2,data.ks)
    } catch (e) {
      f.Alert("Nejde mi to prepocitat");
    }

    //return

    // kalkulace2= JSON.stringify(kalkulace2)

    var atmp = [];

    // f.Alert('1')
    //   title: "Success" + data.idefix+ ' '+ data.nazev + '/ ' + data.nazevOrig + data.user_update_idefix + ' '+ idefix,
    //  f.Alert2(data.user_update_idefix,data.nazev, idefix)

    if (
      data.user_update_idefix * 1 > 0 &&
      idefix * 1 !== data.user_update_idefix * 1
    ) {
      // f.Alert('2')
      //  f.Alert('Cizi vynalez -VLOZIT',idefix , data.user_update_idefix)
      $("#box" + data.ID).dialog({
        modal: false,
        buttons: {
          Vlozit: function() {
            data.Vlozit = 1;
            self.Vklad(data, kalkulace2);

            $(this).dialog("close");
          },
          Zrusit: function() {
            data.Vlozit = -1;

            $(this).dialog("close");
          }
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
        }
        // position:
        //   {
        //       my: 'left',
        //       at: 'right',
        //       of: event
        //   }
      });
      return;
    }

    //  f.Alert('2.5', ' ', data.user_update_idefix,' : ',idefix )

    var idefixOver = 0;
    if (
      data.user_update_idefix == 0 ||
      data.user_update_idefix == idefix //Pridano pri ukladni z kalkulace jako template
    ) {
      //    f.Alert('3')
      qover = `select * from calc_templates where nazev = trim('${data.nazev}') and user_update_idefix = ${idefix} `;
      // f.Alert(qover)
      try {
        atmp = (await Q.all(idefix, qover)).data.data;
        // f.Alert(JSON.stringify(atmp) )
        if (atmp.length >= 1) {
          idefixOver = atmp[0].idefix;
        } else {
          //Vloziti
          $("#box" + data.ID).dialog({
            modal: false,
            buttons: {
              Vlozit: function() {
                data.Vlozit = 1;
                self.Vklad(data, kalkulace2);
                $(this).dialog("close");
              },
              Zrusit: function() {
                data.Vlozit = -1;
                $(this).dialog("close");
              }
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
            }
          });
          //Vloziti
        }
      } catch (e) {
        f.Alert("Nelze zjistit obsah templates", e);
        console.log("ERR Kalk1", e);
      }
    }
    // f.Alert('Template - ulozeni','3.5', data.nazev , ' : ', idefixOver )
    if (idefixOver > 0) {
      // f.Alert('4')
      $("#box" + data.ID).dialog({
        modal: false,
        buttons: {
          Ulozit: function() {
            data.Vlozit = 1;
            self.Zmena(data, kalkulace2, idefixOver);
            $(this).dialog("close");
          },
          Zrusit: function() {
            data.Vlozit = -1;
            $(this).dialog("close");
          }
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
        }
        // position:
        //     {
        //         my: 'left',
        //         at: 'right',
        //         of: event
        //     }
      });
    }
    // && !f.isEmpty(data.idefixtemplate)
    else if (data.idefix > 0) {
      if (data.nazev !== data.nazevOrig) {
        $("#box" + data.ID).dialog({
          modal: false,
          buttons: {
            Prepis: function() {
              data.Vlozit = 1;
              self.Zmena(data, kalkulace2, data.idefix);
              $(this).dialog("close");
            },
            Vlozit: function() {
              data.Vlozit = 1;
              self.Vklad(data, kalkulace2);
              $(this).dialog("close");
            },
            Zrusit: function() {
              data.Vlozit = -1;
              $(this).dialog("close");
            }
          },
          title: "Zmena nazvu " + data.idefix + " " + data.idefixtemplate,
          dialogClass: "my-dialog-1",
          show: {
            effect: "fade",
            duration: 500
          },
          hide: {
            effect: "fade",
            duration: 500
          }
        });
      } else if (data.nazev == data.nazevOrig) {
        $("#box" + data.ID).dialog({
          modal: false,
          buttons: {
            Prepis: function() {
              data.Vlozit = 1;
              self.Zmena(data, kalkulace2, data.idefix);
              $(this).dialog("close");
            },

            Zrusit: function() {
              data.Vlozit = -1;
              $(this).dialog("close");
            }
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
          }
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

    if (_idefix > 0 && data.nazev == data.nazevOrig) {
      self.Zmena(data, kalkulace2, _idefix);
    }
  },

  async Vklad(data, kalkulace2) {
    var idefix = store.state.idefix;
    var atmp = [];
    var nret = 0;
    if (idefix_vlastnikPrace == 0) {
      await this.Vlastnik();
      await this.VlastnikPrace();
      // })

      //f.Alert('hoooohohoho 00', idefix_vlastnikPrace)
    }
    // f.Alert('hoooohohoho 1', idefix_vlastnikPrace)
    if (!f.Jstr(kalkulace2).match(/a-z/)) {
      f.Alert("kalkulace je prazdna?");
    }
    var q = `insert into calc_templates ( ${cols},user_insert_idefix,user_update_idefix
    ,idefix_dod,idefix_prace)
  values (
    trim('${data.nazev}'),'${data.kcks}','${data.ks}','${data.naklad}','${data.marze}','${data.prodej}','${data.marze_pomer}','${kalkulace2}','${data.expedice_datum}','${data.expedice_cas}','${idefix}','${idefix}'
    ,'${idefix_vlastnik}','${idefix_vlastnikPrace}'

  ) `;
    await Q.post(0, q);
    try {
      atmp = (
        await Q.all(idefix, "select max(idefix) as idefix  from calc_templates")
      ).data.data;
      if (atmp.length == 1) {
        nret = atmp[0].idefix;
        //f.Alert(nret)
        store.dispatch("setKalkulaceIdefix", nret);
      }
      //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
    } catch (e) {
      f.Alert("ERR Vklad kalkulace ", e);
      console.log("ERR Kalk1", e);
    }

    // f.Alert('Funkce vklad')
  },
  async CopyUser(idefixactive = 0, cTable = "") {
    if (idefix_vlastnikPrace == 0) {
      await this.Vlastnik();
      await this.VlastnikPrace();
    }
    //f.Alert('hoooohohoho 2', idefix_vlastnikPrace)

    var q = `insert into ${cTable} ( ${cols},user_insert_idefix,user_update_idefix, active
    ,idefix_dod,idefix_prace
    )
  select ${cols},user_insert_idefix,user_update_idefix, true
  ,'${idefix_vlastnik}','${idefix_vlastnikPrace}'
   from ${cTable} where idefix=${idefixactive}
  `;
    var idefix = store.state.idefix;
    Q.vl_copy(idefix, cTable, idefixactive, {
      q1: q,
      q2: `update ${cTable} set active=false where active`,
      q3: `update ${cTable} set nazev = nazev|| ' 2' where idefix = (select max(idefix) from ${cTable})`
    });
    return;
    //await Q.post(0,q)
    //await Q.post(0,`update ${cTable} set active=false where active`)
    if (cTable.match(/zak/)) {
      //f.Alert('pokus -sync item s docasnou tabulkou') //syn
      await Q.sync(0, cTable);
    }
    await Q.post(
      0,
      `update ${cTable} set nazev = nazev|| ' 2' where idefix = (select max(idefix) from ${cTable})`
    );
  },

  async CopyUser_old(idefixactive = 0, cTable = "") {
    if (idefix_vlastnikPrace == 0) {
      await this.Vlastnik();
      await this.VlastnikPrace();
    }
    //f.Alert('hoooohohoho 2', idefix_vlastnikPrace)

    var q = `insert into ${cTable} ( ${cols},user_insert_idefix,user_update_idefix, active
    ,idefix_dod,idefix_prace
    )
  select ${cols},user_insert_idefix,user_update_idefix, true
  ,'${idefix_vlastnik}','${idefix_vlastnikPrace}'
   from ${cTable} where idefix=${idefixactive}
  `;

    await Q.post(0, `update ${cTable} set active=false where active`)
      .then(res => {
        if (cTable.match(/zak/)) {
          //f.Alert('pokus -sync item s docasnou tabulkou') //syn
          Q.sync(0, cTable);
        }
        //f.Alert('pokus')
      })
      .catch(e => {
        f.Alert2("Doslo k chyba pri oznaceni ACTIVE ", e);
      });
    await Q.post(0, q)
      .then(res => {
        //f.Alert('pokuscopy', q)
      })
      .catch(e => {
        f.Alert2("Doslo k chyba pri vkladu kopie kalkulace", e);
      });
    await Q.post(
      0,
      `update ${cTable} set nazev = nazev|| ' 2' where idefix = (select max(idefix) from ${cTable})`
    )
      .then(res => {
        //f.Alert('pokus')
      })
      .catch(e => {
        f.Alert2("Doslo k chyba pri oznaceni ACTIVE ", e);
      });
  },
  async Vlastnik() {
    const self = this;
    var qVlastnik = `select idefix from list_dodavatel where vlastnik = 1 order by time_update  desc limit 10 ;`;
    var aRet = [];

    try {
      aRet = (await Q.all(self.idefix, qVlastnik)).data.data;
      if (aRet.length == 0) {
        f.Alert("Vlastnik neni definovan");
      } else if (aRet.length == 1) {
        idefix_vlastnik = aRet[0].idefix;
      } else if (aRet.length > 1) {
        idefix_vlastnik = aRet[0].idefix;
        f.Alert(
          "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
        );
      }
      //f.Alert(self.idefix_vlastnik)
    } catch (e) {
      console.log(e);
    }
  },
  async VlastnikPrace() {
    const self = this;
    var qVlastnik = `select * from list_firmaprace where vlastnik = 1 limit 2`;
    var aRet = [];

    try {
      aRet = (await Q.all(self.idefix, qVlastnik)).data.data;
      if (aRet.length == 0) {
        f.Alert("Vlastnik neni definovan");
      } else if (aRet.length == 1) {
        idefix_vlastnikPrace = aRet[0].idefix_prace;
      } else if (aRet.length > 1) {
        idefix_vlastnikPrace = aRet[0].idefix_prace;
        f.Alert(
          "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
        );
      }
      //f.Alert(self.idefix_vlastnik)
    } catch (e) {
      console.log(e);
    }
  },

  async VkladUser(
    data,
    kalkulace2,
    cTable,
    nazev = "",
    active = false,
    idefixactive = 0,
    SaveKalkulkace = true,
    SaveData = true
  ) {
    var idefix = store.state.idefix;
    var atmp = [];
    var nret = 0;
    var dataBck = f.Jparse(data);
    var aCols = cols.split(",");
    f.log("1.", "VkladUser");
    if (idefix_vlastnikPrace == 0) {
      await this.Vlastnik();
      await this.VlastnikPrace();
    }
    //f.Alert('hoooohohoho 3', idefix_vlastnikPrace)
    if (nazev > "") {
      data.nazev = nazev;
    }
    if (nazev == "undefined") {
      alert("sakra");
    }
    // await this.Vlastnik()
    // await this.VlastnikPrace()

    //if (f.isEmpty(data.nazev)) {
    //data.nazev=''

    data.kcks = 0;
    data.ks = 0;
    data.naklad = 0;
    data.marze = 0;
    data.prodej = 0;
    data.marze_pomer = 0;
    data.expedice_datum = "2019-01-01";
    data.expedice_cas = "12:00";

    var neco = "";

    for (var x = 0; x < aCols.length; x++) {
      neco = aCols[x].trim();
      if (!f.isEmpty(dataBck[neco])) {
        data[neco] = dataBck[neco];
      }
    }

    //f.Alert("Data po ", f.Jstr(data), f.Jstr(dataBck))  ;

    //f.Alert('Data X', cols.split(",").length)
    //return;
    //}
    // if (data.ks>0) {
    //alert("A " + data.naklad)
    if (SaveKalkulkace) {
      //alert("C " + data.naklad)
      data.naklad = await prepocty.getNaklad(f.Jparse(kalkulace2));
    }
    if (data.naklad > 0 && data.ks > 0) {
      data.kcks = data.naklad / data.ks;
    } else {
      data.kcks = 0;
    }

    // var q = `
    // ;create table ${cTable} without oids as select * from calc_templates limit 0
    // ;alter table ${cTable} add poradi serial
    // ;alter table ${cTable} add active bool default false
    // ;alter table ${cTable} add idefix_src bigint default 0
    // ;alter table ${cTable} alter idefix  set default nextval('list2_seq')
    // ;alter table ${cTable} alter id set default nextval('${cTable}_seq')
    // `
    // Q.post(0,q)

    // alert("B" + data.naklad)
    //}
    kalkulace2 = JSON.stringify(kalkulace2);
    await Q.post(0, `update ${cTable} set active=false where active`);
    //Prepocet
    if (active == true || idefixactive == 0) {
      var q = `insert into ${cTable} ( ${cols},user_insert_idefix,user_update_idefix, active
    ,idefix_dod,idefix_prace)
  values (
    trim('${data.nazev}'),'${data.kcks}','${data.ks}','${data.naklad}','${data.marze}','${data.prodej}','${data.marze_pomer}','${kalkulace2}','${data.expedice_datum}','${data.expedice_cas}'
    ,'${idefix}','${idefix}','${active}',
    '${idefix_vlastnik}','${idefix_vlastnikPrace}'

  ) `;

      // f.Alert("Isert " , idefixactive , active)
      // f.Alert(idefix_vlastnik, idefix_vlastnikPrace, q)
    } else {
      if (SaveKalkulkace == true && SaveData == true) {
        f.log("2a.", "VkladUser");
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
      `;
      } else if (SaveKalkulkace == true && SaveData == false) {
        var q = `update ${cTable} set
        obsah              = '${kalkulace2}',
        user_update_idefix = '${idefix}',
        time_update = now()
        where idefix = ${idefixactive}
  `;
        //  f.Alert('Ulozeni bez data ', q )
      } else if (SaveKalkulkace == false) {
        //Zabalena radka, kalkulaci neprepisuji
        f.log("2b.", "VkladUser");
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
    `;
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
    await Q.post(0, q)
      .then(res => {
        //f.Alert('pokus')
      })
      .catch(e => {
        f.Alert2("Doslo k chyba pri vkladu do DB", e);
      });
    return;
  },
  async setActive(idefix = 0, cTable, Aktivuj = 1) {
    f.log("Set ACTIVE FCE");
    var q = this.setActiveQ(idefix, cTable, Aktivuj = 1)
    await Q.post(0,q)
    return

    await Q.post(0, `update ${cTable} set active = false where active`);
    if (Aktivuj > 0) {
      await Q.post(
        0,
        `update ${cTable} set active=true where idefix=${idefix}`
      );
    }
  },
   setActiveQ(idefix = 0, cTable, Aktivuj = 1) {
    var q=`update ${cTable} set active = false where active ;`
    if (Aktivuj > 0) {
      q+=  `update ${cTable} set active=true where idefix=${idefix}`
    }
    return q;

  },
  async getActive(cTable) {
    var defer = $.Deferred();
    try {
      var atmp = await Q.all(
        0,
        `select idefix from  ${cTable} where  active=true `
      );
      if (atmp.length > 0) {
        f.Alert2(
          "ACTIVE",
          1,
          f.Jstr(atmp),
          `select idefix from  ${cTable} where  active=true`
        );
        //defer.resolve(atmp[0].idefix)
      } else {
        f.Alert2(
          "ACTIVE",
          0,
          f.Jstr(atmp),
          `select idefix from  ${cTable} where  active=true`
        );
        defer.resolve(0);
      }
    } catch (e) {
      f.Alert("pojeblo");
    }

    return defer.promise();
  },
  async delete(idefix = 0, cTable) {
    await Q.post(0, `delete from  ${cTable}  where idefix=${idefix}`);
  },

  async Zmena(data, kalkulace2, _idefix) {
    var idefix = store.state.idefix;
    var atmp = [];
    var nret = 0;
    var tempTable = "calc_templates";
    var addObsah = "";
    if (!f.Jstr(kalkulace2).match(/[a-z]/)) {
      //f.Alert('kalkulace je prazdna?', f.Jstr(kalkulace2))
      addObsah = "";
    } else {
      addObsah = `obsah          = '${kalkulace2}',`;
    }
    var q = `update ${tempTable} set
            nazev          = trim('${data.nazev}'),
            kcks           = '${data.kcks}',
            ks             = '${data.ks}',
            naklad         = '${data.naklad}',
            marze          = '${data.marze}',
            prodej         = '${data.prodej}',
            marze_pomer    = '${data.marze_pomer}',
            ${addObsah}
            expedice_datum = '${data.expedice_datum}',
            expedice_cas   = '${data.expedice_cas}',
            user_update_idefix='${idefix}',
            time_update = now()
          where idefix = ${_idefix}
  `;
    //obsah='${kalkulace}',
    //f.Alert('Update idfix' ,_idefix )
    console.log("Update ", q);

    await Q.post(0, q);
    try {
      atmp = (
        await Q.all(idefix, "select max(idefix) as idefix  from calc_templates")
      ).data.data;
      if (atmp.length == 1) {
        nret = atmp[0].idefix;
        //f.Alert(nret)
        store.dispatch("setKalkulaceIdefix", _idefix);
      }
      //f.Alert(atmp.length,' :: ',JSON.stringify(atmp))
    } catch (e) {
      f.Alert("Err Zmena Kalkulace", e);
      console.log("ERR Kalk1", e);
    }
    //console.log(store)
    return nret;
  },
  async getTemplates() {
    var idefix = store.state.idefix;
    var q = `select
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
    q = `${q} order by  case when a.user_update_idefix = ${idefix} then 1 else 2 end , nazev`;
    var atmp = [];
    //f.Alert("BUS ",Vue2)
    try {
      atmp = (await Q.all(idefix, q)).data.data;
      eventBus.$emit("DATATEMPLATES", { data: atmp });
      return atmp;
      //
    } catch (e) {
      f.Alert("nevidim templats", e, q);
      console.log("ERR pozadavek na templates", e);
    }
    ///f.Alert(JSON.stringify(atmp))
  },
  async getTemplatesUser(cTable, poradiFrom = 0, poradiTo = 0) {
    var defer = $.Deferred();
    var idefix = store.state.idefix;
    var q = "";
    q = this.getTemplatesUserQ(cTable,poradiFrom,poradiTo)


    f.log("ORDER TEMPLATES");

    var atmp = [];
    try {
      // f.Alert('kve 1')
      atmp = (await Q.all(idefix, q)).data.data;

      if (atmp.length == 0) {
        defer.resolve(atmp);
      } else {
        await atmp.forEach(el => {
          el.expedice_datum = f.datum3(el.expedice_datum);
          el.expedice_cas = f.cas3(el.expedice_cas);
          defer.resolve(atmp);
          // f.Info('Get User 1',el.expedice_datum, "DATA: ",JSON.stringify(atmp))
        });
      }
    } catch (e) {
      defer.resolve(atmp);
      //f.Alert2('Chyba  getTemplatesUser', e,q )
      console.log("Chyba  getTemplatesUser", e, q);
    }

    //f.Info('Get User 1',JSON.stringify(atmp))

    return defer.promise();
    ///f.Alert(JSON.stringify(atmp))
  },

  getTemplatesUserQ(cTable, poradiFrom = 0, poradiTo = 0) {
    var defer = $.Deferred();
    var idefix = store.state.idefix;
    var q = "";
    if (cTable.match(/zak/g)) {
      q = `select
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
          a.idefix_src,
          coalesce(a.status,0) as status,
          c.vl_znacka,
          c.vl_id,
          c.poradi2,

          c.idefix as idefix_vl,
          d.pocet as pocet_vl,
          b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix
          left join  zak_t_vl_v c on a.idefix_src=c.idefix_item
          left join  zak_vl_last d on c.idefix_zak=d.idefix_zak
          `;
      f.log("ORDER TEMPLATES", "zak");
    } else {
      q = `select
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
          a.idefix_src,
          2 as status,
          '' as vl_znacka,
          0 as vl_id,
          0 as poradi2,
          0 as idefix_vl,
          0 as pocet_vl,
          b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix
          `;
      f.log("ORDER TEMPLATES", "nab");
    }

    q = `${q} where  true and obsah is not null `;

    if (poradiFrom > 0) {
      q = `${q} and poradi>= ${poradiFrom} `;
    }
    if (poradiTo > 0) {
      q = `${q} and poradi<= ${poradiTo} `;
    }

    q = `select * from (${q}) qa  order by
  case when qa.active  then 1 else 2 end,
  case when status =1 then 2 else 1 end,
  poradi2 desc,  qa.idefix --datum--cas--`
console.log('case when qa.active  then 1 else 2 end', '')
    f.log("ORDER TEMPLATES STRING :", q);
    return q

    ///f.Alert(JSON.stringify(atmp))
  },

  async getTemplate(_idefix = 0, cTable = "") {
    var defer = $.Deferred();
    var idefix = store.state.idefix;
    var q =
      "select a.*,b.login  from calc_templates a join list_users b on a.user_update_idefix = b.idefix ";
    q = `${q} where a.idefix= ${_idefix} `;
    var atmp = [];
    //f.Alert("BUS ",Vue2)
    try {
      atmp = (await Q.all(idefix, q)).data.data;
      defer.resolve(atmp);
      //  eventBus.$emit('DATATEMPLATE',{data: atmp})
      //return atmp
      //
    } catch (e) {
      f.Alert("nevidim templats", e, q);
      console.log("ERR pozadavek na templates", e);
      defer.resolve(false);
    }
    return defer.promise();
    ///f.Alert(JSON.stringify(atmp))
  },

  async getTemplateUserIdefix(_idefix = 0, cTable = "") {
    var defer = $.Deferred();
    var idefix = store.state.idefix;
    // var q = `select a.*,b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix `;
    // q = `${q} where a.idefix= ${_idefix} `;
    q = this.getTemplateUserIdefixQ(_idefix, cTable)
    var atmp = [];
    //f.Alert("BUS ",Vue2)
    try {
      atmp = (await Q.all(idefix, q)).data.data;
      defer.resolve(atmp);

    } catch (e) {
      f.Alert("nevidim templats", e, q);
      console.log("ERR pozadavek na templates", e);
      defer.resolve(false);
    }
    return defer.promise();
    ///f.Alert(JSON.stringify(atmp))
  },
  getTemplateUserIdefixQ(_idefix = 0, cTable = "") {

    var idefix = store.state.idefix;
    var q = `select a.*,b.login  from ${cTable} a join list_users b on a.user_update_idefix = b.idefix `;
    q = `${q} where a.idefix= ${_idefix} `;
    q +=  '--parse--'

    return q

    ///f.Alert(JSON.stringify(atmp))
  },

  async deleteTemplate(_idefix) {
    const self = this;
    var idefix = store.state.idefix;
    var q = "";

    var atmp = [];
    //f.Alert("BUS ",Vue2)
    var q = `delete  from calc_templates where idefix = ${_idefix} returning *`;
    //f.Alert("BUS ",q)
    try {
      atmp = (await Q.post(idefix, q)).data.data;

      self.getTemplates();
      return atmp;

      //
    } catch (e) {
      f.Alert("nevidim templates", e, q);
      console.log("ERR pozadavek na templates", e);
    }
    ///f.Alert(JSON.stringify(atmp))
  },

  async setKorekce(data) {
    var defer = $.Deferred();
    var nsum = 0;
    var ntmp = 0;
    const self = this;

    //alert(this.getNakladSloupce())
    if (f.isEmpty(data) || f.Jstr(data) == "null") {
      defer.resolve(nsum);
      return defer.promise();
    }
    //defer.resolve(nsum)
    //return defer.promise()
    try {
      await data.forEach(async (element, idx) => {
        ntmp = 0; // Zde bude naklad leve strany, pokud bude k dispozici
        if (!f.isEmpty(element.sloupecid)) {
          element.sloupecid.forEach(el => {
            //Prochod vsema sloupcema a pricteni ceny
            self.setKorekceCol(element.data, el);
          });
        }
        //nsum = nsum + ntmp // potom co se sjedou vsechny sloupce, pripocitam vysledek
      });

      defer.resolve(nsum);
    } catch (e) {
      console.log(err1);
      defer.resolve(nsum);
    }
    return defer.promise();
  },

  setKorekceCol(data, sloupec) {
    // data jsou leva strana kalkulace
    var nSum = 0;
    //Zpracovat levou stranu
    // alert(JSON.stringify(data))
    if (!f.isEmpty(sloupec.data.nakladkorekce)) {
      // korekce ma prednost
      //f.Alert2(sloupec.data.nakladkorekce)
      sloupec.data.nakladkorekce = 0;
      //f.Alert2(sloupec.data.nakladkorekce)
    }
    // else propocet nakladu

    //return nSum
  },
  async setPrilohy(data) {
    var defer = $.Deferred();
    var nsum = 0;
    var ntmp = 0;
    const self = this;
    if (f.isEmpty(data) || f.Jstr(data) == "null") {
      defer.resolve(nsum);
      return defer.promise();
    }
    //alert(this.getNakladSloupce())

    await data.forEach(async (element, idx) => {
      ntmp = 0; // Zde bude naklad leve strany, pokud bude k dispozici
      if (!f.isEmpty(element.data.Priloha1Txt)) {
        element.data.Priloha1Txt = "";
        element.data.Priloha1Idefix = 0;
      }
      //nsum = nsum + ntmp // potom co se sjedou vsechny sloupce, pripocitam vysledek
    });
    defer.resolve(nsum);
    return defer.promise();
  },

  async setKorekceAndPrilohy(data) {
    if (f.isEmpty(data) || f.Jstr(data) == "null") {
      return;
    }
    await this.setKorekce(data);
    await this.setPrilohy(data);
  },

  //Stroj
  async getStrojDetail(idefixmod) {
    var atmp = [];
  },

  computed: {
    ...mapState([
      "isUserLoggedIn",
      "xMenuMain",
      "level",
      "idefix",
      "compaStore",
      "Kalkulace",
      "KalkulaceThis",
      "user"
    ])
  }
};
