import f from '@/services/fce';
// import query from '../../services/query'
import Q from '../../services/query';
//import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import queryKalk from '../../services/fcesqlKalkulace';

//import w1 from './CalcWorkButtonMenu.vue'; // Prehledova dole

//import { Notification } from 'element-ui';
import { eventBus } from '@/main.js';
import fceSeznam from './CalcFceSeznam.js'; // Funkce seznam



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

  ///Methods for Save ....
  async Ulozit(kod = "") {
    const self = this;
    var ceho = "";
    var qoprava = "";
    var qoprava2 = "";
    var b = "";
    this.getState()
    await eventBus.$emit('w1set',{})  //Ulozi form do c1.tmp

    if (self.c1.MAINMENULAST == "kalkulace") {
      ceho = "nab";
    } else if (self.c1.MAINMENULAST == "zakazky") {
      ceho = "zak";
    }

    qoprava = `update ${self.c1.cTable} set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from ${self.c1.cTable})  a where rn >1 and radek > 1 order by id
  )
  ;`;
    b = await Q.post(self.idefix, qoprava);

    //f.Alert2(qoprava)

    qoprava2 = `update ${ceho}_t_items set idefix=nextval('list2_seq'::regclass) where id in (
  select id from (select count(*) over(partition by idefix) as rn ,
   row_number() over(partition by idefix order by id) as radek
  , id, idefix from ${ceho}_t_items ) a where rn >1 and radek > 1 order by id
  )
  ;`;

  //Kolekce
  var kolekce = {
    q2:  qoprava2,
    q :  qoprava
  };
  f.log("KOLEKCE 1:", f.Jstr(kolekce));
  var aKolekce = await Q.Q2(self.idefix, kolekce);

  //f.Alert2(f.Jstr(aKolekce))
   //  b = await Q.post(self.idefix, qoprava2);
    //f.Alert2(qoprava)

    //var b = await Q.post(self.idefix, qoprava);

    if (self.c1.obrazovka_nab == 3 && self.c1.MAINMENULAST == "kalkulace") {
      await self.setVL(self.c1.IDEFIXACTIVE, 1);
    }
    if (self.c1.obrazovka_zak == 3 && self.c1.MAINMENULAST == "zakazky") {
      await self.setVL(self.c1.IDEFIXACTIVE, 1);
    }

    await eventBus.$emit('w1set',{})
    var data2 = c1.tmp;

    var q1 = "";
    var _idefix = 0;
    if (kod == "n") {
      self.c1.MAINMENULAST = "kalkulace";
      self.c1.status_nab = 1; // Save AS nb - zakazku - zmena c1.statusu na vklad
      eventBus.$emit("setmenu", { setmenu: "kalkulace" });
    } else if (kod == "z") {
      self.c1.MAINMENULAST = "zakazky";
      self.c1.status_zak = 1; // Save AS nb - zakazku - zmena c1.statusu na vklad
      eventBus.$emit("setmenu", { setmenu: "zakazky" });
    }

    f.notify({
      title: `Kod kliku: ${kod} ${self.c1.MAINMENULAST}`,
      message: `Status kliku : Zak:   ${self.c1.status_zak} Nab:  ${self.c1.status_nab} `,
      type: "success",
      offset: 100,
      duration: 2000
    });

    if (true || self.c1.status_zak == 2) {
      if (self.c1.status_nab == 2 && self.c1.MAINMENULAST == "kalkulace") {
        //Tohle domyslet co vlastne vidim
        if (self.c1.obrazovka_nab == 2) {
          //self.mAlert('a'+ self.c1.obrazovka_nab)
          return;
        }

        //w1.form.cislo
        //        f.Alert2(`select * from nab_t_list where cislonabidky= ${w1.form.cislo}`, ' :: ', self.c1.status_zak, ' :: ',self.c1.status_nab)
        alert(1)
        await eventBus.$emit('w1set',{})
        var c = (
          await Q.all(
            self.idefix,
            `select * from nab_t_list where cislonabidky= ${c1.tmp.cislo}`
          )
        ).data.data[0];

        var qset = await self.UpdateSet(data2);
        if (!self.ZpravaValidace(data2)) {
          return;
        }
        var q = `update nab_t_list ${qset} where idefix = ${c.idefix}`;
        var d = await Q.post(self.idefix, q);
        var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
        //f.Alert('ZakTus' ,dporadi)
        var uporadi = await Q.post(self.idefix, dporadi);

        var iset = await self.InsertSet(c.idefix);
        var del = await Q.post(
          self.idefix,
          `delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`
        );

        var qitems = `insert into nab_t_items
           ${iset}
           from ${self.c1.cTable} where obsah::text >''
         `;
        qitems = qitems.replace("idefix_zak", "idefix_nab");
        //f.Alert2(qitems)

        var e = await Q.post(self.idefix, qitems);
        var pomocIdefix = await Q.post(
          self.idefix,
          `update nab_t_items set idefix = idefix_src where idefix_src>0 and idefix_nab = ${c.idefix}`
        );

        f.notify({
          title: self.c1.MAINMENULAST,
          message: `Zmeneno 1  ${c.cislonabidky}`,
          type: "success",
          offset: 100,
          duration: 5000
        });

        fceSeznam.Seznam("nab");

        self.c1.status_nab = 2;
      }
      if (self.c1.status_zak == 2 && self.c1.MAINMENULAST == "zakazky") {
        if (self.c1.obrazovka_zak == 2) {
          //self.mAlert('a'+ self.c1.obrazovka_nab)
          return;
        }

        //w1.form.cislo = c.cislo
        //alert('2')
        await eventBus.$emit('w1set',{})
        //alert('2 2',`select * from zak_t_list where cislozakazky= ${c1.tmp.cislo}`)
        var c = (
          await Q.all(
            self.idefix,
            `select * from zak_t_list where cislozakazky= ${c1.tmp.cislo}`
          )
        ).data.data[0]
        if (!self.ZpravaValidace(data2)) {

          return;
        }
        //alert('2 3',`select * from zak_t_list where cislozakazky= ${c1.tmp.cislo}`)
        var qset = await self.UpdateSet(data2);
        var q = `update zak_t_list ${qset} where idefix = ${c.idefix}`;
        var d = await Q.post(self.idefix, q);
        //Vlozit (zmenit ) polozky z kalkulace
        // f.Alert(self.c1.cTable)
        var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
        //f.Alert('ZakTus' ,dporadi)
        var uporadi = await Q.post(self.idefix, dporadi);
        var iset = await self.InsertSet(c.idefix);
        var del = await Q.post(
          self.idefix,
          `delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`
        );

        var qitems = `insert into zak_t_items
          ${iset}
          from ${self.c1.cTable} where obsah::text >''
        `;
        //f.Alert2(qitems)
        //var pomocIdefix=(await Q.post(self.idefix,`update ${self.c1.cTable} set idefix = idefix_src where idefix_src>0`))

        var e = await Q.post(self.idefix, qitems);
        var pomocIdefix = await Q.post(
          self.idefix,
          `update zak_t_items set idefix = idefix_src where idefix_src>0 and idefix_zak = ${c.idefix}`
        );
        f.notify({
          title: self.c1.MAINMENULAST,
          message: `Zmeneno 1   ${c.cislozakazky}`,
          type: "success",
          offset: 100,
          duration: 5000
        });
        fceSeznam.Seznam("zak");
        self.c1.status_zak = 2;
      }
    }
    if (true || self.c1.status == 1) {
      if (self.c1.status_nab == 1 && self.c1.MAINMENULAST == "kalkulace") {
        //f.Alert('Vlozim novou', self.c1.MAINMENULAST )
        data2.idefix_obchodnik = this.idefix;
        if (f.isEmpty(data2.idefix_firma)) {
          data2.idefix_firma = 0;
        }

        q1 = `select * from nab_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `;
        if (!self.ZpravaValidace(data2)) {
          return;
        }

        // f.Alert2(q1)
        // return
        var c = (await Q.all(self.idefix, q1)).data.data[0];
        alert(3)
        await eventBus.$emit('w1set',{cislo: c.cislo})
        //w1.form.cislo = c.cislo;
        //w1.form.cislo
        //f.Alert("NAB", f.Jstr(c));
        var qset = await self.UpdateSet(data2);
        var q = `update nab_t_list ${qset} where idefix = ${c.idefix}`;
        var d = await Q.post(self.idefix, q);
        var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
        //f.Alert('ZakTus' ,dporadi)
        var uporadi = await Q.post(self.idefix, dporadi);

        var iset = await self.InsertSet(c.idefix, "idefix_nab");

        var del = await Q.post(
          self.idefix,
          `delete from nab_t_items where obsah::text > '' and idefix_nab = ${c.idefix}`
        );
        var qitems = `insert into nab_t_items
        ${iset}
        from ${self.c1.cTable} where obsah::text >''
      `;
        var e = await Q.post(self.idefix, qitems);
        f.notify({
          title: self.c1.MAINMENULAST,
          message: `Ulozeno ${c.cislo}`,
          type: "success",
          offset: 100,
          duration: 5000
        });
        self.c1.status_nab = 2;
        eventBus.$emit("SavedZN", {
          id: self.c1.MAINMENULAST,
          // cislo: c.cislo,
          // exp: c.exp,
          // prod: self.idefix,
          // prod_txt : c.produkce,
          // zadani:c.zadani,
          status_zak: self.c1.status_zak,
          status_nab: self.c1.status_nab
        });
        fceSeznam.Seznam("nab");

        //Vlozit polozky z kalkulace
      } else if (self.c1.status_zak == 1 && self.c1.MAINMENULAST == "zakazky") {
        q1 = `select * from zak_insert(${self.idefix},${data2.idefix_firma}, '${data2.datumexpedice}')  `;
        //f.Alert2(q1)
        //return

        if (!self.ZpravaValidace(data2)) {
          return;
        }
        var c = (await Q.all(self.idefix, q1)).data.data[0]; //Pouziju polozky idefix, splatnost, zbytek by mel byt ve formulari spravne
        //w1.form.cislo = c.cislo;
        alert(4)
        await eventBus.$emit('w1set',{cislo: c.cislo})
        var qset = await self.UpdateSet(data2);
        var q = `update zak_t_list ${qset} where idefix = ${c.idefix}`;
        q = q.replace("'undefined'", "''");

        var d;
        try {
          d = await Q.post(self.idefix, q);
        } catch (e) {
          f.notify({
            title: `ERROR ${e}`,
            message: `${q}`,
            type: "error",
            offset: 100,
            duration: 5000
          });
          f.Alert2(
            `${q}`,
            data2.idefix_obchodnik,
            parseInt(data2.idefix_obchodnik),
            data2.idefix_obchodnik * 1
          );
          return;
        }

        //Vlozit (zmenit ) polozky z kalkulace
        //f.Alert(self.c1.cTable)
        var dporadi = `update ${self.c1.cTable} set poradi = id where poradi is null`;
        //f.Alert('ZakTus' ,dporadi)
        var uporadi = await Q.post(self.idefix, dporadi);
        var iset = await self.InsertSet(c.idefix);
        var del = await Q.post(
          self.idefix,
          `delete from zak_t_items where obsah::text > '' and idefix_zak = ${c.idefix}`
        );
        var qitems = `insert into zak_t_items
        ${iset}
        from ${self.c1.cTable} where obsah::text >''
      `;
        var e = await Q.post(self.idefix, qitems);
        f.notify({
          title: self.c1.MAINMENULAST,
          message: `Ulozeno  ${c.cislo}`,
          type: "success",
          offset: 100,
          duration: 5000
        });
        self.c1.status_zak = 2;
        eventBus.$emit("SavedZN", {
          id: self.c1.MAINMENULAST,
          // cislo: c.cislo,
          // exp: c.exp,
          // prod: self.idefix,
          // prod_txt : c.produkce,
          // zadani:c.zadani,
          status_zak: self.c1.status_zak,
          status_nab: self.c1.status_nab
        });

        fceSeznam.Seznam("zak");

        //Zmena c1.statusu

        //f.Alert2(d)

        //f.Alert("ZAK", f.Jstr(c));
      }

      //f.Alert2(f.Jstr(data2))

      //    var necox = {"cislo":"1900900016","vl_rozsah":"","idefix_firma":"13464","idefix_firmaosoba":0,
      //    "nazev":"neco je to","cisloobjednavky":"petka","datumzadani":"18.08.2019 06:32:21",
      //    "datumexpedice":"28.08.2019","datumsplatnosti":null,"vyrobapopis":"","naklad":0,
      //    "poznamky":"rychle hlavne mez to uvidis to zaplat","zamknuto":null,"idefix_user_lock":0,
      //    "odemknuto":null,"idefix_user_unlock":0,"zamek":false,"uct_rok":2019,"login":"",
      //    "vyrobapopis_print":"uriznout tak aby ve skladu zbylo na dalsi","cislofaktury":"","idefix_obchodnik":0,
      //    "idefix_produkce":"9","idefix_last":0,"idefix_nabidka":0,"dodak0":"","objednavka0":"",
      //    "pdf0":"","informace":"",
      //    "nazevfirmy":"AbbVie s.r.o.",
      //    "osoba":"Belasová Iva","obchodnik":"","produkce":"mares mares "}
    }
  },
  ZpravaValidace(data2) {
    var zpravatxt = "";

    if (this.c1.MAINMENULAST == "kalkulace") {
      return true;
    }
    //if (f.isEmpty(data2.nazevfirmy)) {
    if (f.isEmpty(data2.idefix_firma)) {
      zpravatxt += ", Firma ";
      eventBus.$emit("Focus", { pole: "firma" });
    }

    if (f.isEmpty(data2.idefix_obchodnik)) {
      zpravatxt += ", Obchodnik ";
    }
    if (f.isEmpty(data2.idefix_produkce)) {
      zpravatxt += ", Produkce";
    }
    if (f.isEmpty(data2.nazev)) {
      zpravatxt += ", Nazev zakazky (nabidky) ";
    }
    if (f.isEmpty(data2.poznamky)) {
      data2.poznamky = "";
    }
    if (f.isEmpty(data2.vyrobapopis_print)) {
      data2.vyrobapopis_print = "";
    }
    if (zpravatxt > "") {
      //f.notify( { title: 'Upozorneni',  message: `Tyto povinne polozky nejsou vyplneny : ${zpravatxt}`, type: 'error', offset: 100, duration: 5000 })
      f.Alert2(`Tyto povinne polozky nejsou vyplneny : `, `${zpravatxt}`);

      return false;
    }
    return true;
  },

  async InsertSet(idefix_zak, itemIdName = "idefix_zak") {
    const self = this;

    var creturn = `(
          kod,
          nazev,
          obsah,
          kcks,
          ks,
          naklad,
          marze,
          prodej,
          marze_pomer,
          expedice_datum,
          expedice_cas,
          datum,
          poradi,

          id_src,
          active,
          idefix_src,
          ${itemIdName},
          user_insert_idefix,
          user_update_idefix,
          idefix_dod,
          idefix_prace,
          status,vl_id,vl_znacka,poradi2

      )

          select
          kod,
          nazev,
          obsah,
          kcks,
          ks,
          naklad,
          marze,
          prodej,
          marze_pomer,
          expedice_datum,
          expedice_cas,
          datum,
          poradi,


          id,
          active,
          idefix,
          ${idefix_zak},
          ${self.idefix},
          ${self.idefix},
          idefix_dod,
          idefix_prace,
          status,vl_id,vl_znacka,poradi2
          `;

    return creturn;
  },
  async UpdateSet(data2) {
    const self = this;
    var qset = `set `;
    if (self.c1.MAINMENULAST == "zakazky") {
      //             qset+=`cislozakazky        =  ${data2.cislo},`
    } else if (self.c1.MAINMENULAST == "kalkulace") {
      //           qset+=`cislonabidky        =  ${data2.cislo},`
    }

    qset += `vl_rozsah           =  '',`; // vymenit za funkci
    qset += `idefix_firma        =  ${data2.idefix_firma},`; // pujde ci nepujde menit ?
    qset += `idefix_firmaosoba   =  coalesce(${data2.idefix_firmaosoba},0),`; // pujde ci nepujde menit ?
    qset += `nazev               =  '${data2.nazev}',`; // pujde ci nepujde menit ?
    qset += `cisloobjednavky     =  '${data2.cisloobjednavky}',`; // pujde ci nepujde menit ?
    qset += `cislofaktury        =  '${data2.cislofaktury}',`; // pujde ci nepujde menit ?
    //qset+=`datumzadani         =  '${data2.datumzadani}',`  // nebude - je jen proi vlozeni!!!!
    qset += `datumexpedice       =  '${data2.datumexpedice}',`; // pujde ci nepujde menit ?
    //qset+=`datumsplatnosti     =  '${data2.datumsplatnosti}',`  // na starem datum studio, co to vlastneje
    qset += `vyrobapopis         =  '${data2.vyrobapopis}',`; // pujde ci nepujde menit ?
    qset += `odemknuto           =   null,`; // !!!!DULEZITE   - pri zmene zamku
    qset += `zamknuto            =   null,`; // !!!!DULEZITE   - pri zmene zamku
    qset += `idefix_user_unlock  =  '${data2.idefix_user_unlock}',`; // !!!!DULEZITE
    qset += `zamek               =  '${data2.zamek}',`; // pujde ci nepujde menit ?
    qset += `login               =   idefix2login(${self.idefix}),`; // pujde ci nepujde menit ?
    qset += `vyrobapopis_print   =  '${data2.vyrobapopis_print}',`; // pujde ci nepujde menit ?
    qset += `poznamky            =  '${data2.poznamky}',`; // pujde ci nepujde menit ?
    qset += `idefix_obchodnik    =  '${data2.idefix_obchodnik}',`; // !!!!DULEZITE
    qset += `idefix_produkce     =  '${data2.idefix_produkce}',`; // !!!!DULEZITE
    qset += `idefix_last         =  '${data2.idefix_last}',`; // !!!!DULEZITE  - nova uprvou - originalni zakazka
    qset += `idefix_nabidka      =  '${data2.idefix_nabidka}',`; // !!!!DULEZITE  - Vychozi nabidka (zakazka)
    qset += `dodak0              =  '${data2.dodak0}',`; // !!!!DULEZITE  PRILOHY
    qset += `objednavka0         =  '${data2.objednavka0}',`; // !!!!DULEZITE  PRILOHY
    qset += `pdf0                =  '${data2.pdf0}' `; // !!!!DULEZITE  PRILOHY
    return qset;
  },

  async setVL(idefix, jenUloz = 0) {
    const self = this;
    var idefixActive = self.c1.IDEFIXACTIVE;
    //await f.Alert2(f.Jstr(self.c1.bKalkulace) == f.Jstr(c1.bKalkulaceOld)
    //, f.Jstr(c1.bKalkulaceOld)
      //)
      var stavZmenyK = f.Jstr(self.c1.bKalkulace) == f.Jstr(c1.bKalkulaceOld)
    if (!stavZmenyK) {
      //f.Alert2('Kalkulace zmenena byla')
      if (await f.Confirm2('Kalkulace zmenena byla','Ulozit zmeny ?')){

      }
    }


    var neco = $("#Zmenad").get(0).value;

    f.log("1", "setVL", idefix, idefixActive);
    document.getElementById("obalKalkulace").style.opacity = 0.5;

    if (self.c1.StopStav) {
      f.mAlert("Cekam", 2000);
      f.log("2", "setVL");

      setTimeout(function() {
        //self.c1.StopStav=false
        f.log("3", "setVL");
      }, 2000);
      return;
    }
    self.c1.StopStav = true;


    if (idefixActive == 0 && self.c1.bKalkulace.length > 0 && idefix > 0) {
      alert("0. Je  treba ulozit neulozenou");
      f.log("4", "setVL");
      var dataRadka = f.dataRadka(0);

      try {
        f.log("EMIT 10 ", "SAVEZAZNAM");
        f.log("5", "setVL");
        await self.saveZaznam({ idefix: 0, data: dataRadka }, 3);
        f.log("6", "setVL");
        await self.setRender();
        f.log("7", "setVL");
        await self.setZabalit();
        f.log("8", "setVL");

        self.c1.Pocet++;
      } catch (e) {
        f.Alert("Vklad selhal 11 ");
      }
      //        alert('Bylo  treba ulozit neulozenou')
      //      return
    }
    var necoSave = 0;
    f.log("9", "setVL");

    necoSave = await self.SaveAll(idefix);

    if (jenUloz == 1) {
      f.log("10", "setVL");
      await self.setZabalit();
      f.log("11", "setVL");
      self.c1.StopStav = false;
      document.getElementById("obalKalkulace").style.opacity = 1;
      f.log("12", "setVL");
      return;
    }
    //alert("Save Result " + necoSave)
    if (necoSave < 0) {
      self.c1.StopStav = false;
      f.log("13", "setVL");
      document.getElementById("obalKalkulace").style.opacity = 1;
      f.log("14", "setVL");
      return;
    }

    if (idefixActive == 0 && idefix > 0) {
      f.log("15", "setVL");
      await self.setRozbalit(idefix);
      f.log("16", "setVL");
      self.c1.StopStav = false;
      document.getElementById("obalKalkulace").style.opacity = 1;
      f.log("17", "setVL");
      return;
    }
    if (idefixActive > 0 && idefix == idefixActive) {
      f.log("18", "setVL");
      await self.setRozbalit(idefix);
      f.log("19", "setVL");
      await self.setZabalit(idefix);
      f.log("20", "setVL");
      self.c1.StopStav = false;
      document.getElementById("obalKalkulace").style.opacity = 1;
      f.log("21", "setVL");
      return;
      //await self.setRozbalit(idefix)
    }
    if (idefixActive > 0 && idefix != idefixActive && idefix > 0) {
      f.log("22", "setVL");
      //alert('C Prebalit')
      await self.setZabalit();
      f.log("23", "setVL");
      await self.setRozbalit(idefix);

      f.log("24", "setVL");
      self.c1.StopStav = false;

      document.getElementById("obalKalkulace").style.opacity = 1;
      f.log("25", "setVL");
      return;
    }

    return;

    self.c1.bKalkulace = [];
    f.dispatch("cleanKalk");
    await queryKalk.setActive(0, self.c1.cTable, 0); //tj.vypne vse, nezalezina idefixu
    self.setIdefixDeActive();
  },
  async saveVL(idefix) {
    const self = this;
    f.Alert("Uloz - update saveVL ", idefix);
    //var nK= await(queryKalk.getTemplate(self.form.idefix))
  },

  async SaveAll(idefix = 0, PreskocChybu = 0) {
    const self = this;
    var dataRadka = {};

    var idefixActive = self.c1.IDEFIXACTIVE;
    var neco = $("#Zmenad").get(0).value;
    var neco = false;
    //$('div').css({opacity:'0.8'})

    if (neco < 0) {
      //neuklada
      return;
    }
    self.c1.Pocet = 0;

    //while(self.Z)
    await f.asyncForEach(self.c1.aKalkBefore, async el => {
      if (el.idefix > 0) {
        dataRadka = f.dataRadka(el.idefix);
        if (f.isEmpty(dataRadka.nazev)) {
          dataRadka.nazev = "-";
        }

        if (f.isEmpty(dataRadka.nazev)) {
          dataRadka.nazev += " ERROR (1) ";
          alert("Error" + dataRadka.nazev);
          var objFiluta = f.getElByIdefix("seek", el.idefix);
          objFiluta.focus();
          self.c1.Pocet = -1;
          if (PreskocChybu == 0) {
            return;
          }
        } else if (
          self.c1.bKalkulace.length > 0 &&
          self.c1.IDEFIXACTIVE == el.idefix
        ) {
          f.log("EMIT 7 ", "SAVEZAZNAM");
          await self
            .saveZaznam({ idefix: el.idefix, data: dataRadka }, 2)
            .then(res => {
              self.c1.Pocet++;
            });
        } else {
          neco = true;
          self.c1.Pocet++;

          // f.log("EMIT 8 ", "SAVEZAZNAM");
          //await self.saveZaznam({idefix: el.idefix, data: dataRadka   },1)
          // await f.sleep(1).then(res => {
          //   self.c1.Pocet++;
          // });
        }
        //f.Alert(f.Jstr(dataRadka))
      }
    });
    if (self.c1.Pocet == -1) {
      f.Alert("Pochybeni");
      return -1;
    }
    if (
      idefixActive == 0 &&
      self.c1.bKalkulace.length > 0 &&
      f.getElByIdefix("seek", "0")
    ) {
      //alert('1 Vklad by idefix - zabalit Active 0' )
      dataRadka = f.dataRadka(idefix);
      try {
        f.log("EMIT 9 ", "SAVEZAZNAM");
        await self.saveZaznam({ idefix: idefixActive, data: dataRadka }, 3);
        await self.setRender();
        self.c1.aKalkBefore = []; // 1.JARDA
        await self.setZabalit();
        // f.Alert('Vkladam prvni')
        self.c1.Pocet++;
      } catch (e) {
        f.Alert("Vklad selhal 22", e);
      }
    }
    $("#Zmenad").get(0).value = 0;
    //alert('Pocet ' + self.c1.Pocet)
    return 0;
  },


  async saveZaznam(server, kod) {
    const self = this;
    var SaveKalkulkace = false;

    f.log(" SAVE ZAZNAM");
    if (kod == 1) {
      SaveKalkulkace = false; //Ulozeni radky zavrene kalkulace
      //f.Alert('kod 1 - prepis bez Kalk')
      //saveZaznam(server,SaveKalkulace,1)
      await queryKalk.VkladUser(
        server.data,
        self.c1.bKalkulace,
        self.c1.cTable,
        "",
        false,
        server.idefix,
        SaveKalkulkace
      );

      //f.Alert(kod," : ", self.c1.IDEFIXACTIVE)
    }
    if (kod == 2) {
      SaveKalkulkace = true; //Ulozeni otevrene kalkulace
      //f.Alert('kod 2 - prepis - otevrena Kalkulace')
      //saveZaznam(server,SaveKalkulace,1)
      await queryKalk.VkladUser(
        server.data,
        self.c1.bKalkulace,
        self.c1.cTable,
        "",
        false,
        server.idefix,
        SaveKalkulkace
      );
    }
    if (kod == 3) {
      //saveZaznam(server,SaveKalkulace,3)
      // f.Alert('kod 3 - Vklad - otevrenakalkulace')
      SaveKalkulkace = true;
      await queryKalk
        .VkladUser(
          server.data,
          self.c1.bKalkulace,
          self.c1.cTable,
          "",
          true,
          server.idefix,
          SaveKalkulkace
        )
        .then(res => {
          //this.$message({
          f.notify({
            message: "Vlozeno 2",
            type: "error",
            center: true,
            duration: 5000
          });
        });
    }
    if (kod == 4) {
      f.Alert("kod 4 - prepis - en kalkulace ne datova radka");
      //Pri prepnuti ulozit kalkulaci a data v radce ponechat
      SaveKalkulkace = true;
      await queryKalk.VkladUser(
        server.data,
        self.c1.bKalkulace,
        self.c1.cTable,
        "",
        false,
        server.idefix,
        SaveKalkulkace,
        false
      );
    }
    return;
    $("#Zmenad").get(0).value = 0;
    //var nK=            await(queryKalk.getTemplateUser(idefix,self.c1.cTable))
    f.log("9 getTemplatesUser");
    self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);
    await self.setIdefixActive();
    // alert(self.c1.IDEFIXACTIVE)

    //self.c1.bKalkulace=[]
    //self.c1.bKalkulace =  f.Jparse(nK[0].obsah)
    //self.c1.bKalkulace = JSON.parse(JSON.stringify( self.$store.state.Kalkulace ))
    //await  f.dispatch('saveKalkCela', {data: self.c1.bKalkulace })

    if (self.c1.IDEFIXACTIVE > 0) {
      //AAAAAAA
      self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
    }

    setTimeout(function() {
      self.c1.idRend++;
      self.c1.TestRend++;
    }, 500);
  },
  ///Methods EOF
  //Presunout
  async setRozbalit(idefix) {
    const self = this;
    f.log("1", "Rozbalit");
    //funkce serveru
    //1 onzacit active
    //2 vratit aktualni viditelnou kalkulaci
    //3

    //--await queryKalk.setActive(idefix, self.c1.cTable);
    f.log("2", "setActive");
    var qAct = queryKalk.setActiveQ(idefix, self.c1.cTable);
    var qnK = queryKalk.getTemplateUserIdefixQ(idefix, self.c1.cTable);
    var qBef = queryKalk.getTemplatesUserQ(self.c1.cTable);

    var qTest = await Q.Q2(self.idefix, {
      a1: qAct,
      a2parse: qnK,
      a3: qBef
    });
    if (!f.isEmpty(qTest.data.data)) {
      f.log("12 QQQQQ OK", "setActive"); //,f.Jstr(qTest.data.data.a2)
    } else {
      f.log("12 QQQQQ ERR", "setActive", f.Jstr(qTest));
    }

    f.log("12A", "setActive");

    self.c1.bKalkulace = qTest.data.data.a2parse[0].obsah;
    f.log("12C PARSE END", "setActive");
    var neco=qTest.data.data.a3;
    f.log("12BCC", "setActive");
    self.c1.idRend++;
    self.c1.TestRend++;
    self.c1.aKalkBefore = qTest.data.data.a3;
    f.log("12B", "setActive");

    self.c1.IDEFIXACTIVE = idefix;
    f.log("14", "setActive");
    await f.dispatch("saveKalkCela", { data: self.c1.bKalkulace });

    f.log("5", "SaveKalk ok");
    await self.setIdefixActive();
    f.log("6", "Active OK");
    //return

    if (self.c1.IDEFIXACTIVE > 0) {
      //AAAAAAA
      self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
    }
    f.Alert2('Ukladam Stav Nyni')
    c1.bKalkulaceOld = f.Jparse(c1.bKalkulace)
    //return
    //setTimeout(function() {

    //}, 10000);
  },
  async setZabalit() {
    const self = this;
    f.log("ZAB 0:");

    self.c1.bKalkulace = [];
    f.dispatch("cleanKalk");
    if (self.c1.IDEFIXACTIVE > 0) {
      //AAAAAAA
      self.c1.IDEFIXACTIVELAST = self.c1.IDEFIXACTIVE;
    }
    //return
    f.log("ZAB 1:");
    //Kolekce
    var kolekce = {
      Active: queryKalk.setActiveQ(0, self.c1.cTable, 0),
      Abefore: queryKalk.getTemplatesUserQ(self.c1.cTable)
    };
    f.log("KOLEKCE 1:", f.Jstr(kolekce));
    var aKolekce = await Q.Q2(self.idefix, kolekce);
    //console.log(f.Jstr(kolekce))

    self.c1.IDEFIXACTIVE = 0; //nahrazuje funckci deactive
    self.c1.NAZEVACTIVE = ""; //nahrazuje funckci deactive
    f.log("KOLEKCE 2 TEST", self.c1.aKalkBefore == aKolekce.data.data.Abefore);
    self.c1.aKalkBefore = [];
    try {
      aKolekce.data.data.Abefore.forEach((el, id) => {
        self.c1.aKalkBefore.push(el);
        //f.log("KOLEKCE 2 PUSH")
      });
    } catch (e) {
//        f.log('Kolekce ma potize 1',e)
//       f.log('Kolekce ma potize 2',f.Jstr(kolekce))
      console.log("Kolekce ma potize 1");

    }

    //self.c1.aKalkBefore = aKolekce.data.data.Abefore;
    //await self.beforeArray(aKolekce.data.data.Abefore); //2.JARDA
    f.log("KOLEKCE 2: Return test", self.c1.TestRend, self.c1.IDEFIXACTIVELAST);

    self.c1.idRend++;
    self.c1.TestRend++;

    //return;

    //queryKalk.getTemplatesUser(self.c1.cTable);
    /*
    try {
      await queryKalk.setActive(0, self.c1.cTable, 0); //tj.vypne vse, nezalezina idefixu
      f.log('ZAB 2:')
    } catch (e) {
      console.log("1: ", e);
    }

    try {
      await self.setIdefixDeActive();
      f.log('ZAB 3:')
    } catch (e) {
      console.log("2: ", e);
    }
    try {
      await self.beforeArray(); //2.JARDA
      f.log('ZAB 4:')
    } catch (e) {
      console.log("3 ", e);
    }
    */
  },

  async setIdefixActive() {
    const self = this;
    //return;
    self.c1.aKalkBefore.forEach(el => {
      if (el.active == true) {

        self.c1.IDEFIXACTIVE = el.idefix;
        self.c1.NAZEVACTIVE = el.nazev;
        if (self.c1.MAINMENULAST == "zakazky") {
          if (el.idefix_src > 0) {
            self.c1.aktivni_polozka_zak = el.idefix_src;
          }
        }
        if (self.c1.MAINMENULAST == "kalkulace") {
          if (el.idefix_src > 0) {
            self.c1.aktivni_polozka_nab = el.idefix_src;
          }
        }

        return;
      }
    });
  },
  async setIdefixDeActive() {
    const self = this;
    self.c1.aKalkBefore.forEach(el => {
      if (el.active == true) {
        self.c1.IDEFIXACTIVE = 0;

        self.c1.NAZEVACTIVE = "";
        el.active = false;
        return;
      }
    });
  },

  async setRender() {
    const self = this;
    f.log("7 getTemplatesUser");
    self.c1.aKalkBefore = await queryKalk.getTemplatesUser(self.c1.cTable);

    try {
      await self.setIdefixActive();
    } catch (e) {
      f.Alert("Chyba ACTIVE", e);
      console.log("Chyba ACTIVE");
    }
    await f.sleep(500);
    //setTimeout(function(){
    self.c1.idRend++;
    return self.c1.aKalkBefore.length;
  },

  //Presunout


}

