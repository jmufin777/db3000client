import f from '@/services/fce';
import Q from '../../services/query';
import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import queryKalk from '../../services/fcesqlKalkulace';

//import w1 from './CalcWorkButtonMenu.vue'; // Prehledova dole

//import { Notification } from 'element-ui';
import { eventBus } from '@/main.js';
import fceNova from './CalcFceNova.js'; // Funkce seznam
import fceFillForm  from './CalcFceFillForm.js'; // Funkce seznam
import fceSave from './CalcFceSave.js'; // Funkce seznam
//import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam
//this.ahoj()

export default {

  c1: c1,
  //idefix: 9,
  getState(){
    const self=this
//    f.Alert2(f.getStore('idefix'))
    self.c1.computed.mystate.forEach(el=>{
      if (!self.hasOwnProperty[el]){
        self[el] = f.getStore(el)
      } else
      if (self[el] == f.getStore(el)){
      } else{
        self[el] = f.getStore(el)
      }
    })
    return 1;
  },


  ///Methods for Items  ....

  async Sparuj(polo) {

    const self = this;

    if (polo.idefix_prace > 0 && polo.idefix_dod > 0) {
      var qOvar = `select * from list_firmaprace  where idefix_firma=${polo.idefix_dod} and idefix_prace = ${polo.idefix_prace} `;
      var afound = (await Q.all(self.idefix, qOvar)).data.data;
      if (afound.length == 0) {
        f.Confirm2("Novy vztah prace  - dodavatel ", "Vlozit ?", {
          distinguishCancelAndClose: true,
          confirmButtonText: "Ano?",
          cancelButtonText: "Ne"
        }).then(() => {
          var qInsert = `insert into list_firmaprace (idefix_firma , idefix_prace ,        time_insert        , time_update         , user_insert_idefix , user_update_idefix )
      values (
        ${polo.idefix_dod} , ${polo.idefix_prace}, now(),now(), ${self.idefix}, ${self.idefix}
      )
     `;
          Q.post(self.idefix, qInsert).then(() => {
            self.CisDod(0);
            self.CisDodAll(0);
            self.CisPraceDod();
            f.Alert("Vlozeno");
          });
        });
      }
      f.mAlert(f.Jstr(afound));
    } else {
    }

    return true;
  },
  filterPrace(polozka, radekDod) {
    const self = this;
    var lRet = false;

    if (polozka.idefix_dod == 0) {
      lRet = true;
    }
    if (polozka.idefix_dod > 0) {
      console.log(radekDod.prace_seznam);
      radekDod.dod_seznam.forEach(el2 => {
        if (el2 == polozka.idefix_dod) {
          lRet = true;
          return;
        }
      });
    }
    return lRet;
  },
  filterDod(polozka, radekDod) {
    const self = this;
    var lRet = false;

    if (polozka.idefix_prace == 0) {
      lRet = true;
    }
    // console.log('Radek',radekDod)
    if (polozka.idefix_prace > 0) {
      // console.log(radekDod.prace_seznam)
      radekDod.prace_seznam.forEach(el2 => {
        if (el2 == polozka.idefix_prace) {
          lRet = true;
          return;
        }
      });
    }
    return lRet;
  },

  async CisPrace(query = "") {
    const self = this;
    var qPrace = SQL.getPraceAll(0, query);

    f.log("GETPRACEALL::: ", qPrace);

    self.c1.loading = true;
    try {
      self.c1.cis_prace = (await Q.all(self.idefix, qPrace)).data.data;
      self.c1.cis_prace_vlastnik = self.c1.cis_prace.filter(el => {
        return (
          _.findIndex(el.dod_seznam, function(o) {
            return o * 1 == self.c1.idefix_vlastnik * 1;
          }) > -1
        );
        // return true
      });
      //f.Alert(f.Jstr(self.c1.cis_prace_vlastnik), self.c1.idefix_vlastnik )
      self.c1.loading = false;
    } catch (e) {
      console.log(e);
    }
  },
  async CisDod(idefix_prace = 0) {
    const self = this;
    console.log("start");
    var qDod = SQL.getDod(idefix_prace);
    f.log("CISDOD ");
    //console.log("end", qDod);
    self.c1.loading = true;
    //await self.Vlastnik()
    try {
      self.c1.cis_dod = (await Q.all(self.idefix, qDod)).data.data;
      self.c1.cis_dod_vlastnik = self.c1.cis_dod.filter(el => {
        return el.idefix_firma == self.c1.idefix_vlastnik;
      });

      // f.Alert(f.Jstr(self.c1.cis_dod_vlastnik), self.c1.idefix_vlastnik)
      self.c1.loading = false;
    } catch (e) {
      console.log(e, qDod);
    }
  },
  async CisDodAll(idefix_prace = 0) {
    const self = this;
    console.log(
      "Hyr: ",
      idefix_prace,
      self.c1.MAINMENULAST,
      " ",
      f.Jstr(self.c1.zak_item_active)
    );
    //console.log("start");
    //return

    var qDod = SQL.getDodAll(idefix_prace);

    //console.log("end", qDod);
    self.c1.loading = true;
    //await self.Vlastnik()
    try {
      self.c1.cis_dod_all = (await Q.all(self.idefix, qDod)).data.data;
      self.c1.cis_dod_vlastnik = self.c1.cis_dod_all.filter(el => {
        return el.idefix_firma == self.c1.idefix_vlastnik;
      });

      // f.Alert(f.Jstr(self.c1.cis_dod_vlastnik), self.c1.idefix_vlastnik)
      self.c1.loading = false;
    } catch (e) {
      console.log(e, qDod);
    }
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
        self.c1.idefix_vlastnik = aRet[0].idefix;
      } else if (aRet.length > 1) {
        self.c1.idefix_vlastnik = aRet[0].idefix;
        f.Alert(
          "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
        );
      }
      //f.Alert(self.c1.idefix_vlastnik)
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
        self.c1.idefix_vlastnikPrace = aRet[0].idefix_prace;
      } else if (aRet.length > 1) {
        self.c1.idefix_vlastnikPrace = aRet[0].idefix_prace;
        f.Alert(
          "Je definovano vice vlastniku aplikace, bude urcen ten kde je nejnovejsi zmena"
        );
      }
      //f.Alert(self.c1.idefix_vlastnik)
    } catch (e) {
      console.log(e);
    }
  },

  async CisPraceDod() {
    const self = this;
    await self.CisDod();
    await self.CisPrace();
  },

  async ZalozitZobrazit(polozka2) {
    const self = this;
    //to3N(polozka2,2)
    //ZmenPolozku('zak',polozka2)
    if (polozka2.nazev.match(/^Pr.zdn.*$/)) {
      polozka2.nazev = "Nova";
      self.ZmenPolozku(
        self.c1.MAINMENULAST == "zakazky" ? "zak" : "nab",
        polozka2
      );
    }
    f.mAlert("Polozka musi byt pred pristupen do kalkulace ulozena");
  },

  async ZmenPolozku(ceho = "zak", polozka, ev = 1) {
    const self = this;
    var lRet = false;

    //f.Alert2(f.Jstr(polozka))
    if (self.c1.timeout) {
      clearTimeout(self.c1.timeout);
      //this.$notify( { title: self.c1.MAINMENULAST,  message: `Cancel timout ${self.c1.timeout}` , type: 'error', offset: 100, duration: 500 })
      self.c1.timeout = false;
    }

    self.c1.timeout = setTimeout(function() {
      self.ZmenPolozku0(ceho, polozka, ev)
      .then(()=>{
        fceNova.addPol("zak", self.c1.aktivni_zak);
      });
    }, 100);
  },
  async ZmenPolozku0(ceho = "zak", polozka, ev = 1) {
    const self = this;
    self.getState()
    var q = "";
    var idefix_ceho = ceho == "zak" ? polozka.idefix_zak : polozka.idefix_nab;
    var isInsert = false;

    if (polozka.vzor == 0) {
      q = `update  ${ceho}_t_items a set
        idefix_prace = ${polozka.idefix_prace} ,
        idefix_dod =   ${polozka.idefix_dod},
        user_update_idefix =   ${self.idefix},
        time_update = now(),
        nazev      =   trim('${polozka.nazev}'),
        ks        =   ${polozka.ks},
        kcks        =   ${polozka.kcks},
        naklad    =   ${polozka.naklad},
        prodej    =   ${polozka.prodej}
        where idefix = ${polozka.idefix}`;
    }

    // marze              | 0.00

    //nextval('list2_seq'::regclass)

    if (polozka.vzor >= 1 && !polozka.nazev.match(/^Pr.zdn.*$/)) {
      //
      if (!f.isEmpty(polozka.obsah)) {
        polozka.obsah = f.Jstr(polozka.obsah);
        //f.Alert(polozka.obsah)
      }

      var qCols = `(
     nazev
    ,obsah
    ,kcks
    ,ks
    ,naklad
    ,marze
    ,prodej
    ,marze_pomer
    ,poradi
    ,idefix_tmp
    ,idefix_${ceho}
    ,idefix_src
    ,id_src
    ,active
    ,time_insert
    ,time_update
    ,user_insert_idefix
    ,user_update_idefix
    ,idefix_dod
    ,idefix_prace
    ,d_fak
    ,faktura
    ,vzor
    ,expedice_datum
    ,expedice_cas
    ,datum

     ) `;

      var qVals = `(
     '${polozka.nazev}'
    ,'${polozka.obsah}'
    ,'${polozka.kcks}'
    ,'${polozka.ks}'
    ,'${polozka.naklad}'
    ,'${polozka.marze}'
    ,'${polozka.prodej}'
    ,'${polozka.marze_pomer}'
    ,'${polozka.poradi}'
    ,'${polozka.idefix_tmp}'
    ,'${idefix_ceho}'
    ,'${polozka.idefix_src}'
    ,'${polozka.id_src}'
    ,'${polozka.active}'
    ,now()
    ,now()
    ,'${self.idefix}'
    ,'${self.idefix}'
    ,'${polozka.idefix_dod}'
    ,'${polozka.idefix_prace}'
    ,'${polozka.d_fak}'
    ,'${polozka.faktura}'
    ,0
    ,now()::date
    ,now()::time
    ,now()

    ) `;
      qVals = qVals.replace(/'null'/g, "null");

      var q = `insert into ${ceho}_t_items ${qCols} values ${qVals}`;
      ev = 1;
      isInsert = true;
    } else if (polozka.vzor >= 1 && polozka.nazev.match(/^Pr.zdn.*$/)) {
      f.Alert("Nedelam nic");
      return;
    }
    if (polozka.vzor == -999) {
      f.Alert("Nedelam nic -999");
      return;
    }

    // f.Alert2("VKLAD", q)

    var qoprava = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
  )
  ;`;

    try {
      /*
    var qoprava=`update zak_t_item set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from zak_t_items ) a where rn >1 and radek > 1 order by id
  )
  ;`
*/

      var b = await Q.post(self.idefix, q);

      //ev =1
      //self.mAlert(q,10000)
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Polozka ulozena  ${polozka.vzor}  ${polozka.idefix}`,
        type: "success",
        offset: 100,
        duration: 1000
      });
      polozka.vzor = 0;
    } catch (e) {
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Doslo k chybe pri ulozeni `,
        type: "error",
        offset: 100,
        duration: 5000
      });

      f.Alert2("ERROR polozky ", q, f.Jstr(polozka));
    }
    try {
      var boprava = await Q.post(self.idefix, qoprava);
    } catch (e) {
      this.$notify({
        title: self.c1.MAINMENULAST,
        message: `Doslo k chybe 2 pri ulozeni `,
        type: "error",
        offset: 100,
        duration: 5000
      });

      f.Alert2("ERROR polozky ", qoprava, f.Jstr(polozka));
    }

    // await self.DocasneReseni()
    if (ceho == "zak") {
      if (ev == 1) {
        self.c1.polozky_zak = (
          await Q.all(
            self.idefix,
            `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix_zak} order by idefix`
          )
        ).data.data;
        if (self.c1.polozky_zak.length > 0) {
          self.c1.aktivni_polozka_zak =
          self.c1.polozky_zak[self.c1.polozky_zak.length - 1].idefix;
        }

        //f.Alert("Insert")
      }

      fceNova.polozky_soucet("zak");

      //f.Alert(ev)
      if (ev == 1) {
        fceNova.addPol("zak", polozka.idefix_zak);
      }
    } else if (ceho == "nab") {
      if (ev == 1) {
        self.c1.polozky_nab = (
          await Q.all(
            self.idefix,
            `select *,0 as vse,idefix_vl(idefix) as idefix_vl from nab_t_items where idefix_nab= ${polozka.idefix_nab} order by idefix`
          )
        ).data.data;
        if (self.c1.polozky_nab.length > 0) {
          self.c1.aktivni_polozka_nab =
            self.c1.polozky_nab[self.c1.polozky_nab.length - 1].idefix;
        }
      }
      await fceNova.polozky_soucet("nab");

      if (ev == 1) {
        fceNova.addPol("nab", polozka.idefix_nab);
      }
    }
  },



  async deleteItem(ceho = "zak", polozka) {
    const self = this;
    f.Confirm2("Vymazat zaznam ", polozka.nazev, {
      distinguishCancelAndClose: true,
      confirmButtonText: "Ano?",
      cancelButtonText: "Ne"
    }).then(() => {
      self.deleteItemRun(ceho, polozka);
    });
  },
  async deleteItemRun(ceho = "zak", polozka) {
    const self = this;
    var idefix_ceho = ceho == "zak" ? polozka.idefix_zak : polozka.idefix_nab;
    var b = await Q.post(
      self.idefix,
      `delete from ${ceho}_t_items where idefix = ${polozka.idefix} and vzor=0`
    );
    //f.Alert2(`delete from ${ceho}_t_items where idefix = ${polozka.idefix} and vzor=0`)
    if (ceho == "zak") {
      self.c1.polozky_zak = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${idefix_ceho} order by idefix`
        )
      ).data.data;

      fceNova.polozky_soucet("zak");

      self.c1.klikyzak++;
    }
    if (ceho == "nab") {
      self.c1.polozky_nab = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${idefix_ceho} order by idefix`
        )
      ).data.data;

      fceNova.polozky_soucet("nab");
      self.c1.klikynab++;
    }

    await fceNova.addPol(ceho, idefix_ceho);
    //await f.sleep(1000)
  },

  async copyRadek(ifx) {
    const self = this;
     self.getState()

    var randTab = "tmp_" + Math.ceil(Math.random() * 91000879);
    var ceho = "";
    var ifx_aktivni;
    if (self.c1.MAINMENULAST == "zakazky") {
      ceho = "zak";
      ifx_aktivni = self.c1.aktivni_zak;
    } else if (self.c1.MAINMENULAST == "kalkulace") {
      ceho = "nab";
      ifx_aktivni = self.c1.aktivni_nab;
    }

    var qC = `create table ${randTab} without oids as select * from ${ceho}_t_items where idefix=${ifx}`;
    await Q.post(self.idefix, qC);

    var qU = `update ${randTab} set idefix_${ceho} = ${ifx_aktivni}, time_insert=now()
   ,time_update=now(),user_insert_idefix=${self.idefix}
   ,user_update_idefix=${self.idefix},idefix= nextval('list2_seq'::regclass),id=nextval('zak_t_items_id_seq'::regclass),status=0`;
    await Q.post(self.idefix, qU);
    var qSpoj = `insert into ${ceho}_t_items select * from ${randTab}`;
    await Q.post(self.idefix, qSpoj);
    var qOprav = `update ${ceho}_t_items set idefix_src=idefix where idefix_src is null or idefix_src!=idefix`;
    await Q.post(self.idefix, qOprav);
    // f.Alert(self.c1.cTable)

    if (self.c1.MAINMENULAST == "zakazky") {
      f.log("DROP CALC Z", self.idefix);
      await Q.create_tmp_zak(self.idefix, self.c1.cTable, ifx_aktivni);

      //await Q.post(self.idefix,`select drop_tmp(${self.idefix});`)

      //await Q.post(self.idefix,`drop table if exists ${self.c1.cTable}`)
      //await Q.post(self.idefix,`create table  ${self.c1.cTable} without oids as select * from ${ceho}_t_items where idefix_zak=${ifx_aktivni}`)
      //await Q.post(self.idefix,`create sequence ${self.c1.cTable}_seq`)

      //await Q.post(self.idefix,`alter table  ${self.c1.cTable}  alter column id set default nextval('${self.c1.cTable}_seq'::regclass ) `)
      //await Q.post(self.idefix,`alter table  ${self.c1.cTable}  alter column idefix set default  nextval('list2_seq'::regclass) `)
      //nextval('calc_my_9_zak_seq'::regclass)
      // nextval('list2_seq'::regclass)

      self.c1.polozky_zak = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${ifx_aktivni} order by idefix`
        )
      ).data.data;
      //alert(11)
      //return
      //fceNova.addPol("zak", polozka.idefix);
      fceNova.addPol("zak", ifx_aktivni);
      fceNova.polozky_soucet("zak");
    } else if (self.c1.MAINMENULAST == "kalkulace") {
      await Q.post(self.idefix, `drop table if exists ${self.c1.cTable}`);
      await Q.post(
        self.idefix,
        `create table  ${self.c1.cTable} without oids as select * from ${ceho}_t_items where idefix_zak=${ifx_aktivni}`
      );
      await Q.post(
        self.idefix,
        `alter table  ${self.c1.cTable}  alter column id set default nextval('${self.c1.cTable}_seq'::regclass ) `
      );
      await Q.post(
        self.idefix,
        `alter table  ${self.c1.cTable}  alter column idefix set default  nextval('list2_seq'::regclass) `
      );

      self.c1.polozky_nab = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from ${ceho}_t_items where idefix_${ceho}= ${ifx_aktivni} order by idefix`
        )
      ).data.data;
      //fceNova.addPol("nab", polozka.idefix);
      fceNova.addPol("nab", ifx_aktivni);
      fceNova.polozky_soucet("nab");
    }

    //   f.Alert2(qC)
    //     return
    //f.Alert(ifx+' 2387 ', randTab)
  },




  //Presunout


}

