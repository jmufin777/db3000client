import f from '@/services/fce';
// import query from '../../services/query'
import Q from '../../services/query';
import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
//import queryKalk from '../../services/fcesqlKalkulace';

//import w1 from './CalcWorkButtonMenu.vue'; // Prehledova dole

//import { Notification } from 'element-ui';
import { eventBus } from '@/main.js';
import fceNova from './CalcFceNova.js'; // Funkce seznam
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
  async FillFormWait(polozka, nova = false) {
    const self = this;
    f.dispatch("cleanKalk");
    self.c1.bKalkulace = [];
    await self.cleanItems(polozka);
    await self.FillForm(polozka);

    if (self.c1.timeout && nova == false) {
      clearTimeout(self.c1.timeout);
      self.c1.timeout = false;
      return;
    }
    self.c1.timeout = setTimeout(function() {
      self.FillForm(polozka);
      if (nova == true) {
        //nova upravou
        setTimeout(function() {
          fce.Nova(true);
          if (self.c1.MAINMENULAST == "zakazky") {
            f.notify({
              title: self.c1.MAINMENULAST,
              message: `Zalozena nova pro upravou z ${polozka.cislozakazky}`,
              type: "error",
              offset: 100,
              duration: 5000
            });
          }
          if (self.c1.MAINMENULAST == "kalkulace") {
            f.notify({
              title: self.c1.MAINMENULAST,
              message: `Zalozena nova pro upravou z ${polozka.cislonabidky}`,
              type: "error",
              offset: 100,
              duration: 5000
            });
          }

          //f.Alert('Nova Up')
        }, 100);
      }
      //console.log("Render col ", self.c1.TestRend )
    }, 500);
  },

  async cleanItems(polozka) {
    const self = this;
    var typ = "zak";
    var idfx = 0;

    if (self.c1.MAINMENULAST == "zakazky") {
      typ = "zak";
      idfx = polozka.idefix;
    }
    if (self.c1.MAINMENULAST == "kalkulace") {
      typ = "nab";
      idfx = polozka.idefix;
    }
    if (f.isEmpty(idfx)) {
      //alert('ted ne')
      return;
    }
    var qb = `drop table if exists ${self.c1.cTable} ;drop sequence if exists ${self.c1.cTable}_seq
       ;create sequence ${self.c1.cTable}_seq
       ;create table ${self.c1.cTable} without oids  as select * from ${typ}_t_items where idefix_${typ} = ${idfx}

       ;alter table ${self.c1.cTable} alter idefix  set default nextval('list2_seq')
       ;alter table ${self.c1.cTable} alter id set default nextval('${self.c1.cTable}_seq')
      `;
    //f.Alert2(f.Jstr(polozka))
    //var qb=`create table ${self.c1.cTable} without oids  as select * from zak_t_items where idefix_zak = ${polozka.idefix}`

    var b = await Q.post(self.idefix, qb);
  },

  async FillForm(polozka) {
    const self = this;
    eventBus.$emit('w1fillform',polozka)
    return

    self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
    //self.$refs.w1.aFirma=   await SQL.getFirmaOsoba(polozka.idefix_firma)
    self.$refs.w1.aFirma = await SQL.getFirma(
      polozka.idefix_firma,
      "",
      100000
    );

    self.$refs.w1.form.osoba = "";
    if (self.c1.MAINMENULAST == "zakazky") {
      self.$refs.w1.form.cislo = polozka.cislozakazky;

      self.c1.polozka_zak = polozka;
      //f.Alert2('A',f.Jstr(self.c1.polozka_zak.zamek))
      //return
      self.c1.status_zak = 2;
    } else if (self.c1.MAINMENULAST == "kalkulace") {
      self.$refs.w1.form.cislo = polozka.cislonabidky;
      self.c1.polozka_nab = polozka;
      self.c1.status_nab = 2;
    }

    self.$refs.w1.form.idefix = polozka.idefix;
    self.$refs.w1.form.nazev = polozka.nazev;
    self.$refs.w1.form.idefix_firma = polozka.idefix_firma;
    self.$refs.w1.form.idefix_firmaosoba = polozka.idefix_firmaosoba;
    self.$refs.w1.form.nazevfirmy = polozka.firma;
    self.$refs.w1.form.idefix_obchodnik = polozka.idefix_obchodnik;
    self.$refs.w1.form.idefix_produkce = polozka.idefix_produkce;
    self.$refs.w1.form.obchodnik = polozka.obchodnik;
    self.$refs.w1.form.produkce = polozka.produkce;
    self.$refs.w1.form.osoba = polozka.osoba;

    self.$refs.w1.form.splatnost = polozka.splatnost;
    self.$refs.w1.form.hotovost = polozka.hotovost;
    self.$refs.w1.form.stav = polozka.stav;

    self.$refs.w1.form.datumzadani = f.datum20(polozka.datumzadani);
    self.$refs.w1.form.datumexpedice = f.datum3(polozka.datumexpedice);

    self.$refs.w1.form.vyrobapopis_print = (
      polozka.vyrobapopis_print + ""
    ).replace("null", "");
    self.$refs.w1.form.poznamky = (polozka.poznamky + "").replace("null", "");

    if (self.$refs.w1.aOsoba.length > 0) {
      if (self.$refs.w1.aOsoba.length == 1) {
        self.$refs.w1.form.idefix_firmaosoba = self.$refs.w1.aOsoba[0].idefix;
        self.$refs.w1.form.osoba = self.$refs.w1.aOsoba[0].nazev;
      }
      // f.Alert(self.$refs.w1.form.idefix_firmaosoba, " ", f.Jstr(self.$refs.w1.aOsoba), f.Jstr(polozka) )
      setTimeout(function() {
        $("#" + self.$refs.w1.fields["osoba"]["nazev"]).focus();
      }, 1000);
    }
  },



}

