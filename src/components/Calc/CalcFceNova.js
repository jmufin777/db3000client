import f from '@/services/fce';
// import query from '../../services/query'
import Q from '../../services/query';
//import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import queryKalk from '../../services/fcesqlKalkulace';
import _ from 'lodash'


//import { Notification } from 'element-ui';
import prepocty from '../../services/fceKalkulacePrepocty';
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

  async Nova(upravou = false) {
    const self = this;
    var c = 0;
    this.getState()
    //alert('B')
    //return
    if (self.c1.MAINMENULAST == "zakazky" && self.c1.aktivni_zak < 1) {
      f.Alert("Pro kopii musi být zakazka vybrána", self.c1.aktivni_zak);
      return;
    }
    if (self.c1.MAINMENULAST == "kalkulace" && self.c1.aktivni_nab < 1) {
      f.Alert("Pro kopii musi být nabidka vybrána");
      return;
    }

    self.c1.bKalkulace = [];
    //self.$store.dispatch("cleanKalk");
    await f.dispatch("cleanKalk");
    //await queryKalk.setActive(0,self.c1.cTable,0)  //tj.vypne vse, nezalezina idefixu
    //self.setIdefixDeActive()
    var c = await Q.post(self.idefix, `delete from  ${self.c1.cTable}`);
    //await queryKalk.setActive(0,self.c1.cTable,0)  //tj.vypne vse, nezalezina idefixu
    self.c1.aKalkBefore = [];
    self.c1.aKalkAfter = [];
    // f.Alert(self.c1.cTable)

    //self.cleanItems

    if (self.c1.MAINMENULAST == "zakazky") {
      if (upravou == false) {
        self.c1.status_zak = 1;
        self.c1.obrazovka_zak = 2;
      }
      var cisti = await Q.post(
        self.idefix,
        `delete from zak_t_items where user_insert_idefix = ${self.idefix} and idefix_zak=-100`
      );

      var c = (
        await Q.all(
          self.idefix,
          `select newzak(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce`
        )
      ).data.data[0];
      if (upravou == false) {
        self.c1.polozky_zak = [];

        self.addPol("zak", -100);
        self.polozky_soucet("zak");
      }
      // `select newzak(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce`
    }
    if (self.c1.MAINMENULAST == "kalkulace") {
      if (upravou == false) {
        self.c1.status_nab = 1;
        self.c1.obrazovka_nab = 3;
      }
      var cisti = await Q.post(
        self.idefix,
        `delete from nab_t_items where user_insert_idefix = ${self.idefix} and idefix_nab=-100`
      );

      if (upravou == false) {
        if (upravou == false) {
          self.c1.polozky_nab = [];
          self.addPol("nab", -100);
          self.polozky_soucet("nab");
        }
      }

      var c = (
        await Q.all(
          self.idefix,
          `select newnab(${self.idefix}) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(${self.idefix}) as produkce `
        )
      ).data.data[0];
      //select newnab(9) as cislo, d_exp(10) as exp, now()::timestamp(0) as zadani,fce_user_fullname(9) as produkce
    }
    c.exp = f.datum3(c.exp);
    c.zadani = f.datum20(c.zadani);

    //f.Alert('B',f.Jstr(c));
    if (upravou == false) {
      eventBus.$emit("NovaZN", {
        id: self.c1.MAINMENULAST,
        cislo: c.cislo,
        exp: c.exp,
        prod: self.idefix,
        prod_txt: c.produkce,
        zadani: c.zadani,
        status_zak: self.c1.status_zak,
        status_nab: self.c1.status_nab
      });
    } else if (upravou == true) {
      if (self.c1.MAINMENULAST == "zakazky" && self.c1.status_zak == 1) {
        f.Alert("Nelze zakladat novou upravou , pokud je stav zakladani aktivni");
        return;
      }
     var necoConfirm = await f.Confirm2(
       self.c1.MAINMENULAST == 'kalkulace'
        ? 'Nabidka'
        : 'Zakazka' + ' bude zalozena ?'
        ,`Nova upravou z ${c.cislo} `)
      if (necoConfirm) {
        self.NovaUpravou(c)
      } else {
        alert('Nedelam ji')
      }
    }

  },

  async NovaUpravou(c) {
//Top
   const self=this


{
  eventBus.$emit("NovaZNU", {
    id: self.c1.MAINMENULAST,
    cislo: c.cislo,
    exp: c.exp,
    prod: self.idefix,
    prod_txt: c.produkce,
    zadani: c.zadani,
    status_zak: self.c1.status_zak,
    status_nab: self.c1.status_nab
  });
  if (self.c1.MAINMENULAST == "kalkulace") {
    self.c1.status_nab = 1;
    self.c1.obrazovka_nab = 2;
  } else if (self.c1.MAINMENULAST == "zakazky") {
    self.c1.status_zak = 1;
    self.c1.obrazovka_zak = 2;
  }
  var cT1 = self.c1.cTable + "_1";
  var cT2 = self.c1.cTable + "_2";
  var qU1 = "";
  var qCopy1 = `create `;
  //          f.Alert('Zalozim zakazku nobou', c.cislo, self.c1.aktivni_zak, self.c1.cTable)
  if (self.c1.MAINMENULAST == "zakazky") {
    qCopy1 = `create table ${cT1} without oids as select * from zak_t_list where idefix = ${self.c1.aktivni_zak};
          create table ${cT2} without oids as select * from zak_t_items where idefix_zak = ${self.c1.aktivni_zak} order by idefix`;

    Q.post(
      self.idefix,
      `drop table if exists ${cT1}; drop table if exists ${cT2};`
    ).then(() => {
      Q.post(self.idefix, `${qCopy1}`).then(() => {
        qU1 = `begin ;
          update ${cT1} set idefix = nextval('list2_seq'::regclass ),id=nextval('zak_t_list_id_seq'::regclass) , idefix_last = ${self.c1.aktivni_zak}
          , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
          , datumzadani=now()
          , cislozakazky = ${c.cislo}
          ,idefix_produkce=${self.idefix}, datumexpedice='${c.exp}'
          ,zamek=false
          ,zamknuto=null
          ,idefix_user_lock=0
          ,odemknuto=null
          ,idefix_user_unlock =0
          `;
        qU1 += `;update ${cT2} set idefix = nextval('list2_seq'::regclass ),id=nextval('zak_t_items_id_seq'::regclass)
          , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
          ,vl=''
          ,vl_znacka=''
          ,vl_id=0

          ,idefix_zak=(select max(idefix) from ${cT1})


          `;

        qU1 += `;update ${cT2} set idefix_src=idefix,  status=0`;

        qU1 += `;insert into zak_t_list (select * from ${cT1} );`;
        qU1 += `;insert into zak_t_items (select * from ${cT2});`;
        qU1 += `;update zak_t_list set datumsplatnosti = splatnost(idefix) where idefix  =(select max(idefix) from ${cT1} )`;
        qU1 += `;commit`;
        //Vymazat

        //f.Alert2(c.cislo, f.Jstr(c) , " > ",qU1)
        Q.post(self.idefix, `${qU1} `).then(() => {
          self.c1.order_zak == "cislozakazky";
          self.c1.desc_zak = " desc ";
          //fceSeznam.Seznam('zak', '','cislozakazky')
          fceSeznam.Seznam("zak")

            .then(() => {
              var ifx = 0;
              Q.all(
                self.idefix,
                `select max(idefix) from ${cT1} `
              ).then(resx => {
                self.c1.aktivni_zak = resx.data.data[0].max;
                //f.Alert(f.Jstr(resx.data.data))
                Q.all(
                  self.idefix,
                  `select *,0 as vse,idefix_vl(idefix) as idefix_vl from zak_t_items where idefix_zak =${self.c1.aktivni_zak} order by idefix `
                ).then(res => {
                  //f.Alert(self.c1.aktivni_zak)
                  //f.Alert2(f.Jstr(res.data.data))
                  self.c1.polozky_zak = [];
                  self.c1.polozky_zak = res.data.data;
                  self.addPol("zak", self.c1.aktivni_zak);
                  self.polozky_soucet("zak");
                  self.c1.status_zak = 2;
                  if (self.c1.polozky_zak.length > 0) {
                    self.c1.status_zak = 2;
                    var naklad = 0;
                    ///
                    self.c1.polozky_zak.forEach(el => {
                      naklad = 0;
                      //f.Alert(f.Jstr(el.obsah)=='null')
                      //queryKalk.setKorekce(el.obsah )
                      queryKalk
                        .setKorekceAndPrilohy(el.obsah)

                        .then(() => {
                          prepocty.getNaklad(el.obsah).then(n => {
                            naklad = n;
                            //f.Alert(naklad)
                            //f.Alert2(f.Jstr(el.obsah))
                            //polozka.obsah=f.Jstr(polozka.obsah)
                            var obsah = f.Jstr(el.obsah);
                            if (obsah.length > 100) {
                              var _qsetitem = `update zak_t_items set obsah = '${obsah}'::jsonb, naklad=${naklad} where idefix = ${el.idefix}`;
                              //f.Alert(_qsetitem)
                              Q.post(self.idefix, _qsetitem).then(
                                () => {
                                  el.naklad = naklad;
                                }
                              );
                            }
                          });
                        });
                    });
                    ///

                    //self.to3N(self.c1.polozky_zak[0],2)
                  }
                });
              });
            });

          //f.Alert(f.Jstr('part 1 ok'))
        });
      });
    });
  }
  //////////////////

  if (self.c1.MAINMENULAST == "kalkulace") {
    qCopy1 = `create table ${cT1} without oids as select * from nab_t_list where idefix = ${self.c1.aktivni_nab};
          create table ${cT2} without oids as select * from nab_t_items where idefix_nab = ${self.c1.aktivni_nab} order by idefix`;

    Q.post(
      self.idefix,
      `drop table if exists ${cT1}; drop table if exists ${cT2};`
    ).then(() => {
      Q.post(self.idefix, `${qCopy1}`).then(() => {
        qU1 = `begin ;
          update ${cT1} set idefix = nextval('list2_seq'::regclass ),id=nextval('nab_t_list_id_seq'::regclass) , idefix_last = ${self.c1.aktivni_nab}
          , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
          , datumzadani=now()
          , cislonabidky = ${c.cislo}
          ,idefix_produkce=${self.idefix}, datumexpedice='${c.exp}'`;
        qU1 += `;update ${cT2} set idefix = nextval('list2_seq'::regclass ),id=nextval('nab_t_items_id_seq'::regclass)
          , user_insert_idefix=${self.idefix}, user_update_idefix=${self.idefix},time_insert=now(),time_update=now()
          ,idefix_nab=(select max(idefix) from ${cT1})`;

        qU1 += `;insert into nab_t_list (select * from ${cT1} );`;
        qU1 += `;insert into nab_t_items (select * from ${cT2});`;
        qU1 += `;update nab_t_list set datumsplatnosti = splatnost(idefix) where idefix  =(select max(idefix) from ${cT1} )`;
        qU1 += `;commit`;

        //f.Alert2(c.cislo, f.Jstr(c) , " > ",qU1)
        Q.post(self.idefix, `${qU1} `).then(() => {
          self.c1.order_nab == "cislonabidky";
          self.c1.desc_nab = " desc ";
          //fceSeznam.Seznam('nab', '','cislonabidky')
          fceSeznam.Seznam("nab")

            .then(() => {
              var ifx = 0;
              Q.all(
                self.idefix,
                `select max(idefix) from ${cT1} `
              ).then(resx => {
                self.c1.aktivni_nab = resx.data.data[0].max;
                //f.Alert(f.Jstr(resx.data.data))
                Q.all(
                  self.idefix,
                  `select *,0 as vse from nab_t_items where idefix_nab =${self.c1.aktivni_nab} order by idefix `
                ).then(res => {
                  //f.Alert(self.c1.aktivni_nab)
                  //f.Alert2(f.Jstr(res.data.data))
                  self.c1.polozky_nab = [];
                  self.c1.polozky_nab = res.data.data;
                  self.addPol("nab", self.c1.aktivni_nab);
                  self.polozky_soucet("nab");
                  self.c1.status_nab = 2;
                  if (self.c1.polozky_nab.length > 0) {
                    self.c1.status_nab = 2;
                    var naklad = 0;
                    self.c1.polozky_nab.forEach(el => {
                      naklad = 0;
                      queryKalk.setKorekce(el.obsah).then(() => {
                        prepocty.getNaklad(el.obsah).then(n => {
                          naklad = n;
                          //f.Alert(naklad)
                          //f.Alert2(f.Jstr(el.obsah))
                          //polozka.obsah=f.Jstr(polozka.obsah)
                          var obsah = f.Jstr(el.obsah);
                          if (obsah.length > 100) {
                            var _qsetitem = `update nab_t_items set obsah = '${obsah}'::jsonb, naklad=${naklad} where idefix = ${el.idefix}`;
                            //f.Alert(_qsetitem)
                            Q.post(self.idefix, _qsetitem).then(() => {
                              el.naklad = naklad;
                            });
                          }
                        });
                      });
                    });
                    //self.to3N(self.c1.polozky_nab[0],2)
                  }
                });
              });
            });
          //f.Alert(f.Jstr('part 1 ok'))
        });
      });
    });
  }
  ////////nabidky///nab////////
}


//Eof
  },



  ///Methods for addPol
  async addPol(ceho = "zak", idefix_zaknab = -1) {
    const self = this;
    var addPol = [];
    var addEmpty = {};
    var qVzor1 = `
    select *,0 as vse from ${ceho}_t_items where vzor>=1  and obsah is null
    order by idefix_dod desc limit 1
    `

    var qVzor2 = `
    select *,0 as vse from ${ceho}_t_items where vzor>=1  and obsah is not null
    order by idefix_dod desc limit 1
    `

    var qVzor = `select * from (${qVzor1}) a union select * from (${qVzor2}) b `


    addPol = (
      await Q.all(
        self.idefix,
        qVzor
      )
    ).data.data;

    var l1=self.c1.polozky_zak.length
    var l2=0

    // await f.Alert2(
    //   qVzor,
    // f.Jstr(addPol.length),
    // l1,  l2
    // )
    //Pridatprazdnou radku

    addPol.forEach(el => {
      if (ceho == "zak") {
        el.idefix_zak = idefix_zaknab;
        if (
          _.findIndex(self.c1.polozky_zak, function(o) {
            return o.vzor == -999;
          }) == -1
        ) {
          addEmpty = f.Jparse(el);
          addEmpty.nazev = "XXXXX";
          addEmpty.idefix *= -1;
          addEmpty.obsah = [];
          //addEmpty.idefix_zak=-999
          addEmpty.idefix_dod = -999;
          addEmpty.idefix_prace = -999;
          addEmpty.vzor = -999;
          self.c1.polozky_zak.push(addEmpty);

          //f.Alert(f.Jstr(self.c1.polozky_zak))
          //f.Alert(f.Jstr(el))
        }
        if (
          _.findIndex(self.c1.polozky_zak, function(o) {
            return o.nazev == el.nazev && o.idefix_dod == el.idefix_dod;
          }) == -1
        ) {
          self.c1.polozky_zak.push(el);
        }
      } else if (ceho == "nab") {
        el.idefix_nab = idefix_zaknab;
        if (
          _.findIndex(self.c1.polozky_nab, function(o) {
            return o.vzor == -999;
          }) == -1
        ) {
          addEmpty = f.Jparse(el);
          addEmpty.nazev = "AAAAAA";
          addEmpty.idefix *= -1;
          addEmpty.obsah = [];
          //addEmpty.idefix_zak=-999
          addEmpty.idefix_dod = -999;
          addEmpty.idefix_prace = -999;
          addEmpty.vzor = -999;
          self.c1.polozky_nab.push(addEmpty);
          // f.Alert(f.Jstr(addEmpty))
          //f.Alert(f.Jstr(self.c1.polozky_zak))
          //f.Alert(f.Jstr(el))
        }
        if (
          _.findIndex(self.c1.polozky_nab, function(o) {
            return o.nazev == el.nazev && o.idefix_dod == el.idefix_dod;
          }) == -1
        ) {
          self.c1.polozky_nab.push(el);
        }
      }
    });
    if (ceho =='zak') {
      self.c1.polozky_zak= _.sortBy(self.c1.polozky_zak,['vzor','idefix'])
    } else {
      self.c1.polozky_nab= _.sortBy(self.c1.polozky_nab,['vzor','idefix'])
    }

    var addfix=''
    self.c1.polozky_zak.forEach(el=>{
      addfix+=' '+el.idefix+' '+el.vzor
    })

    // await f.Alert2(addfix)
     //self.c1.polozky_zak=[]
    //   qVzor,
    // f.Jstr(addPol.length),
    // l1,  l2
    // )
  },

  async polozky_soucet(ceho = "zak") {
    const self = this;
    if (ceho == "nab") {
      self.c1.nab_naklady = 0;
      self.c1.nab_marze = 0;
      self.c1.nab_prodej = 0;
      self.c1.polozky_nab.forEach(el => {
        self.c1.nab_naklady += el.naklad * 1;
        self.c1.nab_prodej += el.prodej * 1;
        self.c1.nab_marze += self.c1.nab_prodej - self.c1.nab_naklady;
      });
    }
    if (ceho == "zak") {
      self.c1.zak_naklady = 0;
      self.c1.zak_marze = 0;
      self.c1.zak_prodej = 0;
      self.c1.polozky_zak.forEach(el => {
        self.c1.zak_naklady += el.naklad * 1;
        self.c1.zak_prodej += el.prodej * 1;
        self.c1.zak_marze += self.c1.zak_prodej - self.c1.zak_naklady;
      });
    }
  },


  //Presunout


}

