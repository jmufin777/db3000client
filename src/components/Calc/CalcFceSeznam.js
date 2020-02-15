import f from '@/services/fce';
import Q from '../../services/query';
import SQL from '../../services/fcesql';
// import query from '../../services/query'
import c1 from './CalcCentral.js';
import { eventBus } from '@/main.js';


export default {
  c1: c1,
  //idefix: 9,
  getState(){
    const self=this
    //f.Alert2(f.getStore('idefix'))
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

  async Seznam(ceho = "zak", where = "", orderby = "", add = false) {
    const self = this;
    var desc = "";

    var cWhereRow = "";
    var cWhereCislo = "";
    var cWhereRok = "";
    var cislo = "";
    var qadd = "";
    this.getState()
    var q = `select a.*,b.nazev as firma,b.splatnost,b.hotovost,b.vlastnik,c.*, osoba( coalesce(o.idefix,0)) as osoba

          , coalesce(o.idefix,0) as idefix_osoba
          , 'F,N,KOSIK'::text as  stav
          ,zamek

        from ${ceho}_t_list a
        left join list_dodavatel b on a.idefix_firma= b.idefix
        left join list_firmaosoba o on a.idefix_firmaosoba = o.idefix

        left join (
        select idefix_${ceho}, sum(naklad) as nakladsum, sum(prodej) as prodejsum from ${ceho}_t_items  group by idefix_${ceho}
    ) c on a.idefix = c.idefix_${ceho}`;

    //order by a.idefix desc limit 100 `

    // 2 as kategorie,

    if (ceho == "zak") {
      cislo = "cislozakazky";
      if (self.c1.search_zak > "") {
        cWhereRow = self.c1.search_zak;
      }
      if (self.c1.search_zak_rok > "") {
        cWhereRok = self.c1.search_zak_rok;
      }
      if (self.c1.search_zak_cislo > "") {
        cWhereCislo = self.c1.search_zak_cislo;
      }
      if (f.isEmpty(orderby) && self.c1.order_zak > "") {
        //f.Alert2("TED",self.c1.order_zak, ' b: ', orderby )
        orderby = self.c1.order_zak;
        desc = self.c1.desc_zak;
      } else if (self.c1.order_zak == orderby) {
        if (self.c1.desc_zak == "") {
          self.c1.desc_zak = "desc";
        } else {
          self.c1.desc_zak = "";
        }
      } else {
        self.c1.order_zak = orderby;
        self.c1.desc_zak = "";
      }

      desc = self.c1.desc_zak;
    }
    if (ceho == "nab") {
      //where podmninka
      cislo = "cislonabidky";
      if (self.c1.search_nab > "") {
        cWhereRow = self.c1.search_nab;
      }
      if (self.c1.search_nab_rok > "") {
        cWhereRok = self.c1.search_nab_rok;
      }
      if (self.c1.search_nab_cislo > "") {
        cWhereCislo = self.c1.search_nab_cislo;
      }
      if (f.isEmpty(orderby) && self.c1.order_nab > "") {
        //f.Alert2("TED",self.c1.order_zak, ' b: ', orderby )
        orderby = self.c1.order_nab;
        desc = self.c1.desc_nab;
      } else if (self.c1.order_nab == orderby) {
        if (self.c1.desc_nab == "") {
          self.c1.desc_nab = "desc";
        } else {
          self.c1.desc_nab = "";
        }
      } else {
        self.c1.order_nab = orderby;
        self.c1.desc_nab = "";
      }

      desc = self.c1.desc_nab;
    }

    //where to_aascii(row(a.*)::text)  ilike '%ruzi%'

    // f.Alert2(orderby)
    if (add && self.c1.search_zak_cislo2 > 0 && ceho == "zak") {
      cislo = "cislozakazky";

      qadd = `select  *
                  , idefix2fullname(idefix_obchodnik) as obchodnik
                  , idefix2fullname(idefix_produkce)  as produkce
           from (${q}) a    where datumexpedice>=now()::date +'-365 days'::interval and right(${cislo},5)::bigint = right(${self.c1.search_zak_cislo2},5)::bigint`;
    } else if (add && self.c1.search_nab_cislo2 > 0 && ceho == "nab") {
      cislo = "cislonabidky";
      qadd = `select  *
                  , idefix2fullname(idefix_obchodnik) as obchodnik
                  , idefix2fullname(idefix_produkce)  as produkce
           from (${q}) a    where datumexpedice>=now()::date +'-365 days'::interval and right(${cislo},5)::bigint = right(${self.c1.search_zak_cislo2},5)::bigint`;
    }
    if (ceho == "zak" && self.c1.seek_zak_moje && !self.c1.search_nab_cislo2 > 0) {
      q = `select * from (${q}) a  where a.idefix_obchodnik  = ${self.idefix}`;
    }
    if (ceho == "nab" && self.c1.seek_nab_moje && !self.c1.search_nab_cislo2 > 0) {
      q = `select * from (${q}) a  where a.idefix_obchodnik  = ${self.idefix}`;
    }
    if (cWhereRok > "") {
      /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
      q = `select * from (${q}) a  where left(${cislo},2) = right(${cWhereRok},2)`;
      //f.Alert2(q)
    }
    if (cWhereCislo > "") {
      /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`
      q = `select * from (${q}) a  where right(${cislo},5)::bigint = right(${cWhereCislo},5)::bigint`;
      // f.Alert2(q)
    }
    if (cWhereRow > "") {
      if (ceho == "zak") {
        var cWhereCol = [];
        if (
          !self.c1.seek_zak_firma &&
          !self.c1.seek_zak_nazev &&
          !self.c1.seek_zak_obchodnik &&
          !self.c1.seek_zak_stav
        ) {
          q = `select * from (${q}) a  where to_aascii(row(a.*)::text)  ilike '%${cWhereRow}%'`;
        } else {
          if (self.c1.seek_zak_firma) {
            cWhereCol.push(
              `to_aascii(a.firma::text)  ilike '%${cWhereRow}%'`
            );
          }
          if (self.c1.seek_zak_nazev) {
            cWhereCol.push(
              `to_aascii(a.nazev::text)  ilike '%${cWhereRow}%'`
            );
          }

          if (self.c1.seek_zak_obchodnik) {
            //                 select idefix from list_users where to_aascii(idefix2fullname(idefix)) ilike '%${cWhereRow}%'
            //cWhereCol.push(`to_aascii(a.obchodnik::text)  ilike '%${cWhereRow}%'`)
            cWhereCol.push(`a.idefix_obchodnik   in (
                 select idefix_obchodnik from list_users where to_aascii(idefix2fullname(idefix_obchodnik)) ilike '%${cWhereRow}%'
                )`);
          }
          if (self.c1.seek_zak_stav) {
            cWhereCol.push(`to_aascii(a.stav::text)  ilike '%${cWhereRow}%'`);
          }
          var cPomoc = cWhereCol.join(" or ");
          q = `select * from (${q}) a  where ${cPomoc}`;

          //f.Alert(cPomoc)
        }
      }
      if (ceho == "nab") {
        var cWhereCol = [];
        if (
          !self.c1.seek_nab_firma &&
          !self.c1.seek_nab_nazev &&
          !self.c1.seek_nab_obchodnik &&
          !self.c1.seek_nab_stav
        ) {
          q = `select * from (${q}) a  where to_aascii(row(a.*)::text)  ilike '%${cWhereRow}%'`;
        } else {
          if (self.c1.seek_nab_firma) {
            cWhereCol.push(
              `to_aascii(a.firma::text)  ilike '%${cWhereRow}%'`
            );
          }
          if (self.c1.seek_nab_nazev) {
            cWhereCol.push(
              `to_aascii(a.nazev::text)  ilike '%${cWhereRow}%'`
            );
          }
          if (self.c1.seek_nab_obchodnik) {
            //                 select idefix from list_users where to_aascii(idefix2fullname(idefix)) ilike '%${cWhereRow}%'
            //cWhereCol.push(`to_aascii(a.obchodnik::text)  ilike '%${cWhereRow}%'`)
            cWhereCol.push(`a.idefix_obchodnik   in (
                 select idefix_obchodnik from list_users where to_aascii(idefix2fullname(idefix_obchodnik)) ilike '%${cWhereRow}%'
                )`);
          }
          if (self.c1.seek_nab_stav) {
            cWhereCol.push(`to_aascii(a.stav::text)  ilike '%${cWhereRow}%'`);
          }
          var cPomoc = cWhereCol.join(" or ");
          q = `select * from (${q}) a  where ${cPomoc}`;
          //f.Alert(cPomoc)
        }
      }
      /// cWhereRow= `where to_aascii(row(a.*)::text)  ilike '%ruzi%'`

      //f.Alert2(q)
    }
    var qsubSum = q;
    self.Skupiny();
    if (self.c1._IsObchod) {
      qsubSum = `select * from (${q}) a where idefix_obchodnik=${self.idefix}`;
      // f.Alert2(qsubSum)
    } else if (!self.c1._IsObchod && self.c1._IsVedeni) {
      qsubSum = `select * from (${q}) a `;
      // f.Alert2(qsubSum)
    } else {
      qsubSum = `select * from (${q}) a limit 1 `;
    }
    //f.Alert( self.c1._IsObchod , self.c1._IsVedeni, self.c1._Skupiny )

    var qsum = `select count(*) as pocet, min(datumexpedice::date)::text as _od, max(datumexpedice::date)::text as _do ,sum(prodejsum) as prodej,sum(nakladsum) as naklad  from ( ${qsubSum} ) a`;

    qsum = `select *, prodej - naklad as zisk, (prodej/nullif(naklad,0))::numeric(15,2) as marze from (${qsum}) a `;

    q = `select *
          , idefix2fullname(idefix_obchodnik) as obchodnik
          , idefix2fullname(idefix_produkce)  as produkce
       from (${q}) a  `; // c1.seznam_zak
    var orderbyfull = "";
    if (orderby > "") {
      if (orderby == "cislozakazky" || orderby == "cislonabidky") {
        orderbyfull = ` right(${orderby},5) ${desc} `;
        f.Alert2(orderbyfull, q); //JARDA
        q = `select * from (${q}) a order by right(${orderby},5) ${desc} limit 105`;
      } else {
        orderbyfull = `${orderby} ${desc}  `;
        q = `select * from (${q}) a  order by ${orderby} ${desc}  `;
      }
    } else {
      orderbyfull = ` a.idefix desc   `;
      // f.Alert2(q)
    }
    if (add && qadd > "") {
      q = `select 1 as kategorie, * from (${qadd}) a  union select * from (select 2 as kategorie, * from (${q} ) a order by ${orderbyfull} limit 105) a  `;
    } else {
      q = `select 2 as kategorie, * from (${q} ) a   order by ${orderbyfull} limit 105`;
    }
    //f.Alert2(q)
    q = `select * from (${q}) a  order by kategorie , ${orderbyfull}`;

    // f.Alert2(q)
    if (ceho == "zak") {
      try {
        q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("cislozakazky desc", "right(cislozakazky,5) desc");
        //q=q.replace('cislozakazky  desc', 'right(cislozakazky,5) desc')
        //q=q.replace('cislozakazky', 'right(cislozakazky,5)')
        // q=''
        //f.Alert2(q)

        self.c1.query_zak_last = q;
        // if (self.c1.seek_zak_obchodnik){
        // f.Alert2(q)
        // }

        self.c1.seznam_zak = (await Q.all(self.idefix, q)).data.data;
        self.c1.seznam_zak_sum = (await Q.all(self.idefix, `${qsum}`)).data.data;
      } catch (e) {
        console.log("EROROR : ", q);
      }
    }
    if (ceho == "nab") {
      try {
        q = q.replace("cislonabidky desc", "right(cislonabidky,5) desc");
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("  ", "");
        q = q.replace("cislonabidky desc", "right(cislonabidky,5) desc");
        self.c1.query_nab_last = q;
        self.c1.seznam_nab = (await Q.all(self.idefix, q)).data.data;
        self.c1.seznam_nab_sum = (await Q.all(self.idefix, `${qsum}`)).data.data;
      } catch (e) {
        console.log("EROROR : ", q);
      }
    }
  },


  async Skupiny() {
    const self = this;
    self.c1._Skupiny = await SQL.isObchod();
    self.c1._IsObchod = self.c1._Skupiny.match(/obchod/i) ? true : false;
    self.c1._IsVedeni = self.c1._Skupiny.match(/vedeni/i) ? true : false;
  },

  async delzak(polozka) {
    const self = this;
    if (polozka.nazev == "[[STORNO]]") {
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Jiz bylo stornovano`,
        type: "error",
        offset: 100,
        duration: 5000
      });
      return;
    }
    if (!await f.Confirm2(`Storno pro  ${polozka.cislozakazky} ?`)) {
      return;
    }

    var q0 = `update zak_t_items set prodej = 0 where idefix_zak = ${polozka.idefix} ;`;
    var q = `${q0} ; update zak_t_list set nazev = '[[STORNO]]' where idefix = ${polozka.idefix}`;
    var b = await Q.post(self.idefix, q);

    await self.Seznam("zak");
    eventBus.$emit('w1set',{nazev:'[[STORNO]]'})  //Zapis do pole form we w1

    f.notify({
      title: self.c1.MAINMENULAST,
      message: `Zakazka ${polozka.cislozakazky} byla stornovana`,
      type: "error",
      offset: 100,
      duration: 5000
    });

    //f.Alert2(f.Jstr(polozka))
  },
  async delnab(polozka) {
    const self = this;
    if (polozka.nazev == "[[STORNO]]") {
      f.notify({
        title: self.c1.MAINMENULAST,
        message: `Jiz bylo stornovano`,
        type: "error",
        offset: 100,
        duration: 5000
      });
      return;
    }
    if (!await f.Confirm2(`Storno pro  ${polozka.cislonabidky} ?`)) {
      return;
    }
    //     alert('delzak')
    var q0 = `update nab_t_items set prodej = 0 where idefix_nab = ${polozka.idefix} ;`;
    var q = `${q0} ; update nab_t_list set nazev = '[[STORNO]]' where idefix = ${polozka.idefix}`;

    var b = await Q.post(self.idefix, q);
    self.Seznam("nab");
    eventBus.$emit('w1set',{nazev:'[[STORNO]]'})  //Zapis do poleform we w1


    f.notify({
      title: self.c1.MAINMENULAST,
      message: `Zakazka ${polozka.cislonabidky} byla stornovana`,
      type: "error",
      offset: 100,
      duration: 5000
    });

    //f.Alert2(q, f.Jstr(polozka))
  },



}

