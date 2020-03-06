import f from '@/services/fce';
import Q from '../../services/query';
import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import queryKalk from '../../services/fcesqlKalkulace';


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
  async to1Z() {
    const self = this;
    await eventBus.$emit('w1set',{})
    //f.Alert(c1.tmp.cislo)
    //return
    if (
      c1.tmp.cislo > 0 &&
      //self.$refs.w1.form.cislo > 0 &&
      self.c1.obrazovka_zak == 3 &&
      self.c1.status_zak == 2
    ) {
      await fceSave.Ulozit()
        .then(() => {
          //     alert('bobry')
        })
        .catch(e => {
          f.Alert2("Chyba 1", e);
          self.c1.obrazovka_zak = 1;
        });
      //         await self.to2N(self.c1.polozka_nab)
      //       await f.sleep(3000)
    }
    if (
      self.c1.order_zak != self.c1.order_zak_default &&
      self.c1.query_zak_last > ""
    ) {
      self.c1.query_zak_last = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;
      var q = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;

      self.c1.order_zak = self.c1.order_zak_default;
      self.c1.desc_zak = self.c1.desc_zak_default;
      q = q.replace("  ", "");
      q = q.replace("  ", "");
      q = q.replace("  ", "");
      q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");

      self.c1.seznam_zak = (await Q.all(self.idefix, q)).data.data;
    }

    if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
      f.Confirm2(
        "Zrusit zakladni nove zakazky ? " + self.c1.aktivni_zak,
        "",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "Ano?",
          cancelButtonText: "Ne"
        }
      ).then(() => {
        self.c1.obrazovka_zak = 1;

        eventBus.$emit("SavedZN", {
          id: self.c1.MAINMENULAST,
          // cislo: c.cislo,
          // exp: c.exp,
          // prod: self.idefix,
          // prod_txt : c.produkce,
          // zadani:c.zadani,
          status_zak: 0,
          status_nab: self.c1.status_nab
        });

        if (self.c1.aktivni_zak > 0) {
          //document.getElementById('trn_'+self.c1.aktivni_zak)
          var bck_aktivni = self.c1.aktivni_zak;
          self.c1.query_zak_last = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;
          var q = `select * from (${self.c1.query_zak_last}) a order by kategorie, ${self.c1.order_zak_default} ${self.c1.desc_zak_default}`;

          //self.c1.query_zak_last,
          //f.Alert2("1",self.c1.order_zak,q)
          self.c1.order_zak = self.c1.order_zak_default;
          self.c1.desc_zak = self.c1.desc_zak_default;
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("  ", "");
          q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
          //self.c1.seznam_zak = (await Q.all(self.idefix,q)).data.data
          Q.all(self.idefix, q).then(res => {
            if (!f.isEmpty(res.data.data)) {
              self.c1.seznam_zak = res.data.data;
              self.c1.aktivni_zak = self.c1.seznam_zak[0].idefix;
              fceFillForm.FillFormWait(self.c1.seznam_zak[0]);
            }
          });

          /*
          setTimeout(function(){
            f.Alert("huhu 2",self.c1.aktivni_zak )
            self.seekzaknab('zak', self.c1.aktivni_zak);

            return
            if ( document.getElementById('trz_'+self.c1.aktivni_zak) ){
                document.getElementById('trz_'+self.c1.aktivni_zak).click()


               //f.Alert('trn_'+self.c1.aktivni_zak, document.getElementById('trz_'+self.c1.aktivni_zak)  )
            }

          },1000)
        */
        }
      });
    } else {
      self.c1.obrazovka_zak = 1;
    }
  },

  async to2Z(polozka) {
    const self = this;
    var ceho = "";
    var b = "";
    var b2 = "";
    var qoprava = "";
    var qoprava2 = "";
    self.getState()
    self.c1.StopStav = false;
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

    if (self.c1.obrazovka_zak == 3) {
      await fceSave.Ulozit();
      var b2 = await Q.post(self.idefix, qoprava2);
      await f.sleep(200).then(() => {
        Q.all(
          self.idefix,
          `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix} order by idefix`
        )
          .then(res => {
            self.c1.polozky_zak = res.data.data;
            fceNova.polozky_soucet("zak");
          })
          .then(() => {
            fceNova.addPol("zak", polozka.idefix);
          })
          .then(() => {
            self.c1.obrazovka_zak = 2;
          });
      });

      return;
    }
    if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
      f.Confirm2("Zrusit zakladni nove zakazky ? ??", "", {
        distinguishCancelAndClose: true,
        confirmButtonText: "Ano?",
        cancelButtonText: "Ne"
      }).then(() => {
        self.c1.obrazovka_zak = 1;

        eventBus.$emit("SavedZN", {
          id: self.c1.MAINMENULAST,
          // cislo: c.cislo,
          // exp: c.exp,
          // prod: self.idefix,
          // prod_txt : c.produkce,
          // zadani:c.zadani,
          status_zak: 0,
          status_nab: self.c1.status_nab
        });

        if (self.c1.aktivni_zak > 0) {
          //document.getElementById('trn_'+self.c1.aktivni_zak)
          setTimeout(function() {
            if (document.getElementById("trz_" + self.c1.aktivni_zak)) {
              document.getElementById("trz_" + self.c1.aktivni_zak).click();

              //f.Alert('trn_'+self.c1.aktivni_zak, document.getElementById('trz_'+self.c1.aktivni_zak)  )
            }
          }, 1000);
        }
      });

      return;
    } else {
      self.c1.obrazovka_zak = 1;
    }

    if (self.c1.obrazovka_zak == 3) {
      alert("Jonea neeee?");
      await fceSave.Ulozit();
      await f.sleep(1000);
    }

    //self.$refs.w1.aOsoba = await SQL.getFirmaOsoba(polozka.idefix_firma);
    var neco = await SQL.getFirmaOsoba(polozka.idefix_firma)
    //await f.Alert2(f.Jstr(neco))
    await eventBus.$emit('w1setvar',{aOsoba: await SQL.getFirmaOsoba(polozka.idefix_firma)})

    if (!f.isEmpty(polozka) && !f.isEmpty(polozka.idefix)) {
      self.c1.status_zak = 2;
      self.c1.obrazovka_zak = 2;
      //update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null  where idefix in ( 67198, 67199 ) ;
      //update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null  where idefix in ( 67156, 67157 ) ;
      //update nab_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67157 ) ;
      //update zak_t_items  set nazev='Prázdný',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=1, obsah=null,idefix_dod = 0  where idefix in (  67199 ) ;
      //update zak_t_items  set nazev='Prázdný s',kcks =0,naklad=0,prodej=0, idefix_zak=-1,vzor=2  where idefix in (  135369 ) ;
      //update nab_t_items  set nazev='Prázdný s',kcks =0,naklad=0,prodej=0, idefix_nab=-1,vzor=2  where idefix in (  135371 ) ;

      self.updateDefault(); //oprava dodavatele
      var q= `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak= ${polozka.idefix} order by idefix`

//      f.Alert2('ERR',q, "IDFX" , self.idefix)
      self.c1.polozky_zak = (
        await Q.all(
          self.idefix,
          q
        )
      ).data.data;
      fceNova.polozky_soucet("zak");
      fceNova.addPol("zak", polozka.idefix);

      await fceFillForm.FillForm(polozka);
      //self.$refs.w1.form.osoba   = polozka.idefix_firma
      //f.Alert(polozka.idefix, f.Jstr(polozka))
    } else {
      f.Alert2('ERR :',f.Jstr(polozka), "IDFX" , self.idefix)
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Chyba pri nacteni polozek `,
        type: "error",
        offset: 100,
        duration: 5000
      });
    }
  },

  async to3Z(polozka, odkud = 1) {
    const self = this;
    var idfx = 0;
    var idfxKalkulace = 0;
    var presun = true;
    self.c1.StopStav = false;
    if (self.c1.MAINMENULAST == "zakazky" && self.c1.aktivni_zak > 0) {
      var q = `select rok(cislozakazky) as rok,cislo(cislozakazky) as cislo, cislozakazky from zak_t_list  where idefix = ${self.c1.aktivni_zak} `;
        var aneco = (await Q.all(self.idefix, q)).data.data;
      self.c1.aktivni_zak_short = aneco[0].cislo;
      self.c1.aktivni_zak_rok = aneco[0].rok;

      //var b2 = (await Q.post(self.idefix,qoprava2))
      // f.Alert2('v poho', q, f.Jstr(aneco))
    }

    if (self.c1.MAINMENULAST == "kalkulace" && self.c1.aktivni_nab > 0) {
      var q = `select rok(cislonabidky) as rok,cislo(cislonabidky) as cislo, cislonabidky from nab_t_list  where idefix = ${self.c1.aktivni_nab} `;
      var aneco = (await Q.all(self.idefix, q)).data.data;
      self.c1.aktivni_nab_short = aneco[0].cislo;
      self.c1.aktivni_nab_rok = aneco[0].rok;
      //var b2 = (await Q.post(self.idefix,qoprava2))
      //f.Alert2('v poho', q, f.Jstr(aneco))
    }

    if (odkud == 1 && self.c1.aktivni_polozka_zak > 0) {
      //Polozka vybarna, pristup pres tlacitko nahore
      self.c1.polozky_zak.forEach(el => {
        if (el.idefix == self.c1.aktivni_polozka_zak) {
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
      //Polozky
      if (polozka.idefix_dod == self.c1.idefix_vlastnik) {
        presun = true;
      } else {
        presun = false;
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
      idfx = polozka.idefix_zak;
    } else if (odkud == 1) {
      idfx = polozka.idefix;
    }
    if (presun == true) {
      self.c1.obrazovka_zak = 3;
      await self.to3(polozka, "zak", idfx, idfxKalkulace);
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

