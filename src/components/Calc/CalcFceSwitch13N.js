import f from '@/services/fce';
import Q from '../../services/query';
import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import queryKalk from '../../services/fcesqlKalkulace';

//import { Notification } from 'element-ui';
import { eventBus } from '@/main.js';
import fceNova from './CalcFceNova.js'; // Funkce seznam
import fceFillForm  from './CalcFceFillForm.js'; // Funkce seznam
import fceSave from './CalcFceSave.js'; // Funkce seznam
//import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam

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
  async to3N(polozka, odkud = 1) {
    const self = this;
    var idfx = 0;
    var idfxKalkulace = 0;
    var presun = true;
    console.log("3N  ", f.Jstr(polozka));
    if (odkud == 1 && self.c1.aktivni_polozka_nab > 0) {
      //Polozka vybarna, pristup pres tlacitko nahore
      self.c1.polozky_nab.forEach(el => {
        if (el.idefix == self.c1.aktivni_polozka_nab) {
          if (el.obsah > "") {
            //f.Alert2(f.Jstr(el) ) ;
            polozka = el;
            odkud = 2;
            return;
          }
        }
      });
    }

    if (odkud == 2) {
      //f.Alert2('2 --  ',f.Jstr(polozka.idefix_dod), '::',  self.c1.idefix_vlastnik)

      if (polozka.idefix_dod == self.c1.idefix_vlastnik) {
        presun = true;
      } else if (
        polozka.idefix_dod != self.c1.idefix_vlastnik &&
        polozka.obsah.length > 0
      ) {
        polozka.idefix_dod = self.c1.idefix_vlastnik;
        presun = true;
      } else {
        presun = false;
        f.Alert(
          polozka.idefix_dod,
          self.c1.idefix_vlastnik,
          polozka.obsah.length
        );
        f.notify({
          title: self.c1.MAINMENULAST,
          message: `Pro cizi dodavatele nejsou  kalkulacek dispozici`,
          type: "error",
          offset: 100,
          duration: 5000
        });
        return;
      }

      idfxKalkulace = polozka.idefix;
      idfx = polozka.idefix_nab;
    } else if (odkud == 1) {
      idfx = polozka.idefix;
    }
    //f.Alert('3 --  ', idfx)
    if (presun == true) {
      self.c1.obrazovka_nab = 3;
      await self.to3(polozka, "nab", idfx, idfxKalkulace);
    } else {
    }
  },

  async to3N(polozka, odkud = 1) {
      const self = this;
      var idfx = 0;
      var idfxKalkulace = 0;
      var presun = true;
      console.log("3N  ", f.Jstr(polozka));
      if (odkud == 1 && self.c1.aktivni_polozka_nab > 0) {
        //Polozka vybarna, pristup pres tlacitko nahore
        self.c1.polozky_nab.forEach(el => {
          if (el.idefix == self.c1.aktivni_polozka_nab) {
            if (el.obsah > "") {
              //f.Alert2(f.Jstr(el) ) ;
              polozka = el;
              odkud = 2;
              return;
            }
          }
        });
      }

      if (odkud == 2) {
        //f.Alert2('2 --  ',f.Jstr(polozka.idefix_dod), '::',  self.c1.idefix_vlastnik)

        if (polozka.idefix_dod == self.c1.idefix_vlastnik) {
          presun = true;
        } else if (
          polozka.idefix_dod != self.c1.idefix_vlastnik &&
          polozka.obsah.length > 0
        ) {
          polozka.idefix_dod = self.c1.idefix_vlastnik;
          presun = true;
        } else {
          presun = false;
          f.Alert(
            polozka.idefix_dod,
            self.c1.idefix_vlastnik,
            polozka.obsah.length
          );
          f.notify({
            title: self.c1.MAINMENULAST,
            message: `Pro cizi dodavatele nejsou  kalkulacek dispozici`,
            type: "error",
            offset: 100,
            duration: 5000
          });
          return;
        }

        idfxKalkulace = polozka.idefix;
        idfx = polozka.idefix_nab;
      } else if (odkud == 1) {
        idfx = polozka.idefix;
      }
      //f.Alert('3 --  ', idfx)
      if (presun == true) {
        self.c1.obrazovka_nab = 3;
        await self.to3(polozka, "nab", idfx, idfxKalkulace);
      } else {
      }
    },




  async to3(polozka, typ = "zak", idfx = 0, idfxKalkulace) {
    const self = this;

    //      f.Alert('to3  ', idfx)

    //eventBus.$emit('MenuHlavni', {key: 666 })
    //if ()
    //self.$store.dispatch("cleanKalk");
    f.dispatch("cleanKalk");
    self.c1.bKalkulace = [];
    self.c1.aKalkBefore = [];
    self.c1.aKalkAfter = [];
    //this.$store.dispatch("setKalk", -1);
    f.dispatch("setKalk", -1);
    self.c1.KalkulaceLast = -1;
    self.c1.IDEFIXACTIVE = 0;

    //eventBus.$emit(666)
    //var a = (await Q.post(self.idefix,`drop table if exists ${self.c1.cTable}`))
    //;create table ${self.c1.cTable} without oids as select * from calc_templates limit 0
    //  ;alter table ${self.c1.cTable} add poradi serial
    //  ;alter table ${self.c1.cTable} add active bool default false
    //  ;alter table ${self.c1.cTable} add idefix_src bigint default 0
    var qb = `drop table if exists ${self.c1.cTable} ;drop sequence if exists ${self.c1.cTable}_seq
       ;create sequence ${self.c1.cTable}_seq
       ;create table ${self.c1.cTable} without oids  as select * from ${typ}_t_items where idefix_${typ} = ${idfx}

       ;alter table ${self.c1.cTable} alter idefix  set default nextval('list2_seq')
       ;alter table ${self.c1.cTable} alter id set default nextval('${self.c1.cTable}_seq')
      `;
    //f.Alert2(f.Jstr(polozka))
    //var qb=`create table ${self.c1.cTable} without oids  as select * from zak_t_items where idefix_zak = ${polozka.idefix}`

    var b = await Q.post(self.idefix, qb);
    //f.Alert2( qb);
    self.c1.aKalkBefore = []; // 1.JARDA
    f.log("5 getTemplatesUser");
    self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

    //f.Alert(f.Jstr(self.c1.aKalkBefore))
    await fceSave.setZabalit();
    if (idfxKalkulace > 0) {
      await fceSave.setRozbalit(idfxKalkulace);
    }

    $("#Zmenad").get(0).value = 0;

    // f.Alert2('3Z?', qb)
  },

  async to2N(polozka) {
    const self = this;
    var ceho = "";
    var b = "";
    var b2 = "";
    var qoprava = "";
    var qoprava2 = "";
    if (self.c1.MAINMENULAST == "kalkulace") {
      ceho = "nab";
    } else if (self.c1.MAINMENULAST == "zakazky") {
      ceho = "zak";
    }

    var qoprava = `update ${self.c1.cTable} set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from ${self.c1.cTable} ) a where rn >1 and radek > 1 order by id
  )
  ;`;
    var b = await Q.post(self.idefix, qoprava);
    var qoprava2 = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
  )
  ;`;

    if (self.c1.obrazovka_nab == 3) {
      await fceSave.Ulozit();
      var b2 = await Q.post(self.idefix, qoprava2);
      await f
        .sleep(200)

        .then(() => {
          Q.all(
            self.idefix,
            `select *,0 as vse from nab_t_items where idefix_nab= ${polozka.idefix} order by idefix`
          )
            .then(res => {
              self.c1.polozky_nab = res.data.data;
              fceNova.polozky_soucet("nab");
            })
            .then(() => {
              fceNova.addPol("nab", polozka.idefix);
            })
            .then(() => {
              self.c1.obrazovka_nab = 2;
              //f.Alert(self.c1.aktivni_polozka_nab)
            });
        });
      return;
    }
    //self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
    await eventBus.$emit('w1setvar',{aOsoba: await SQL.getFirmaOsoba(polozka.idefix_firma)})
    //alert(self.c1.obrazovka_zak)

    if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
      self.c1.status_nab = 2;
      self.c1.obrazovka_nab = 2;

      self.c1.polozky_nab = (
        await Q.all(
          self.idefix,
          `select *,0 as vse from nab_t_items where idefix_nab= ${polozka.idefix}`
        )
      ).data.data;
      fceNova.polozky_soucet("nab");
      fceNova.addPol("nab", polozka.idefix);
      await fceFillForm.FillForm(polozka);
      // var clean=  (await Q.post(self.idefix,`truncate table ${self.c1.cTable}`))
      // self.$store.dispatch('cleanKalk')
      // self.c1.bKalkulace=[]

      //self.$refs.w1.form.osoba   = polozka.idefix_firma
      //f.Alert(polozka.idefix, f.Jstr(polozka))
    } else {
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Chyba pri nacteni polozek`,
        type: "error",
        offset: 100,
        duration: 5000
      });
    }
  },

  async to1N() {
    const self = this;
    await eventBus.$emit('w1set',{})
    //f.Alert(c1.tmp.cislo)
    //return
    if (
      c1.tmp.cislo > 0 &&
      self.c1.obrazovka_nab == 3 &&
      self.c1.status_nab == 2
    ) {
      await fceSave.Ulozit()
        .then(() => {
          //     alert('bobry')
        })
        .catch(e => {
          f.Alert2("hyba", e);
          self.c1.obrazovka_nab = 1;
        });
      //         await self.to2N(self.c1.polozka_nab)
      //       await f.sleep(3000)
    }

    if (self.c1.MAINMENULAST == "kalkulace" && self.c1.status_nab == 1) {
      f.Confirm2("Zrusit zakladni nove kalkulace ? ", "", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Ano?",
        cancelButtonText: "Ne"
      }).then(() => {
        self.c1.obrazovka_nab = 1;
        eventBus.$emit("SavedZN", {
          id: self.c1.MAINMENULAST,
          // cislo: c.cislo,
          // exp: c.exp,
          // prod: self.idefix,
          // prod_txt : c.produkce,
          // zadani:c.zadani,
          status_zak: self.c1.status_zak,
          status_nab: 0
        });

        if (self.c1.aktivni_nab > 0) {
          setTimeout(function() {
            if (document.getElementById("trn_" + self.c1.aktivni_nab)) {
              document.getElementById("trn_" + self.c1.aktivni_nab).click();
            }
          }, 1000);
        }
      });
    } else {
      self.c1.obrazovka_nab = 1;
    }
  },

  async updateDefault() {
    const self = this;
    if (self.c1.idefix_vlastnik > 0 && self.c1.idefix_vlastnikPrace > 0) {
      var q = `update zak_t_items set idefix_dod=${self.c1.idefix_vlastnik}, idefix_prace= ${self.c1.idefix_vlastnikPrace} where obsah::text  ~*  '[a-z]'
           and (idefix_dod is null  or idefix_prace!=${self.c1.idefix_vlastnikPrace} or idefix_dod!=${self.c1.idefix_vlastnik}) or idefix_prace is null    `;

      var a = await Q.post(self.idefix, q);
    }
  },


  ///Methods for Save ....

  //Presunout


}

