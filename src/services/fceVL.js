import moment from "moment";
//import Q from '../../services/query'
import Q from "./query";
import f from "./fce";
import store from "@/store/store";
import { mapState } from "vuex";

import { eventBus } from "@/main.js";

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import lang from 'element-ui/lib/locale/lang/cs-CZ'
// import locale from 'element-ui/lib/locale'

// configure language
// locale.use(lang)
const { forEach } = require("p-iteration");

export default {
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
  },

  qZ(idefix_zak = 0) {
    var ceho = "zak";
    var q = `select a.*,b.nazev as firma,b.splatnost,b.hotovost,b.vlastnik,c.*, osoba( coalesce(o.idefix,0)) as osoba

            , coalesce(o.idefix,0) as idefix_osoba
            , 'F,N,KOSIK'::text as  stav
            ,zamek

          from ${ceho}_t_list a
          left join list_dodavatel b on a.idefix_firma= b.idefix
          left join list_firmaosoba o on a.idefix_firmaosoba = o.idefix

          left join (
      	  select idefix_${ceho}, sum(naklad) as nakladsum, sum(prodej) as prodejsum from ${ceho}_t_items  group by idefix_${ceho}
      ) c on a.idefix = c.idefix_${ceho} where a.idefix  = ${idefix_zak}`;

    var q2 = `select  *
                    , idefix2fullname(idefix_obchodnik) as obchodnik
                    , idefix2fullname(idefix_produkce)  as produkce
             from (${q}) a `;
    return q2;
  },
  async Vklad(idefix_item = "", cTable = "", tmpTable = "") {
    const self = this;

    var idefix = store.state.idefix;
    var form_item = {};
    var form_zak = {};
    var q2 = "";
    var qI = "";
    var qTmp = "";
    //return new Promise((resolve,reject)=>{

    if (cTable == "") cTable = "zak_t_items";
    //f.Alert('VkladVL 22 ', idefix_item , idefix )
    var q1 = `select * from ${cTable} where idefix = ${idefix_item}`;
    //form_item = (await Q.all(idefix,q1)).data.data
    var neco = "nic";

    Q.all(idefix, q1) //Default - polozky
      .then(res => {
        if (!f.isEmpty(res.data.data)) {
          form_item = res.data.data[0];
          if (form_item.idefix_zak > 0) {
            q2 = this.qZ(form_item.idefix_zak);
            Q.all(idefix, q2).then(res2 => {
              if (!f.isEmpty(res2.data.data)) {
                form_zak = res2.data.data[0];
              }
              // Zpracuj
              // f.Alert2(q2)
              // f.Alert('2: ', f.Jstr(form_zak))
              // Vlozeno zaznamu do VL
              qTmp = `select * from zak_t_vl_v where idefix_item =${form_item.idefix} `;
              Q.all(idefix, qTmp).then(resTmp => {
                //f.Alert(f.Jstr(resTmp.data.data.length))
                if (resTmp.data.data.length == 0) {
                  //f.Alert('1',f.Jstr(resTmp.data.data.length))
                  //Dekoduji polozky pro VL
                  //f.Alert('Obsah ',f.Jstr(form_item.obsah))

                  qI = `insert into zak_t_vl_v (idefix_zak, idefix_item, cislozakazky,idefix_obchodnik,idefix_firma, nazev, polozka,expedice_datum,expedice_cas)
                    values (${form_zak.idefix}, ${form_item.idefix}, ${form_zak.cislozakazky},${form_zak.idefix_obchodnik},${form_zak.idefix_firma},'${form_zak.nazev}','${form_item.nazev}'
                    ,'${form_item.expedice_datum}', '${form_item.expedice_cas}'
                    );select vl_set(${form_zak.idefix}, ${form_item.idefix}) `;
                  //f.Alert2('1',qI)

                  Q.post(idefix, qI).then(() => {
                    console.log(qI);
                    self.UpdateVL(form_zak, form_item).then(() => {
                      self.getLastID(form_item); //Docasne - jeste rozmyslim, ted je aby to poslalo event na zobrazeni s daty
                    });
                  });
                } else {
                  self
                    .getLastID(form_item)
                    //Docasne - jeste rozmyslim, ted je aby to poslalo event na zobrazeni s daty
                    .then(() => {
                      //if (confirm("VL jiz jsou  zalozeny a  odeslany, chcete jej aktualizovat ?"))  {
                      self.UpdateVL(form_zak, form_item).then(() => {
                        //Q.post(idefix,`select vl_set(${form_zak.idefix}, ${form_item.idefix}) `)
                        var sendString = {
                          idefix_zak: form_zak.idefix,
                          idefix_item: form_item.idefix,
                          tmpTable: tmpTable
                        };
                        Q.vl_set(idefix, sendString);
                      });

                      //}
                    });
                }
              });
            });
          }
        } else {
          f.Alert("Polozka neni k dispozici");
        }
      });
    //.then(()=>{ //nejde to notify
    //this.$notify( { title: self.MAINMENULAST,  message: `VL Odeslan ` , type: 'warning', offset: 100, duration: 5000 })
    //})

    /*
        kod int,
        nazev text,
        polozka text,
        idefix_firma bigint,
        idefix_obchodnik bigint,
        vl_znacka text,
        expedice_datum date,
        expedice_cas time,
        datumzadani TIMESTAMP,
        datumodeslani timestamp,
        datumdokonceni timestamp,
        datumvraceni timestamp,
        idefix_odeslal bigint default 0,
        idefix_vratil bigint default 0,
        idefix_dokoncil bigint default 0,
        idefix_zak bigint not null,
        cislozakazky bigint not null,
        idefix_item bigint default 0,
        idefix_tmp bigint default 0,
        idefix_stroj bigint default 0,
        stroj text,
        strojmod text,
        idefix_strojmod bigint default 0,
        celkme_ks numeric(10,2),
        celkem_m2  numeric(15,4),
        cas_tisku time default '0:0',
        mat_gramaz numeric(10,2),
        mat_txt text,
        idefix_mat bigint default 0,
        mat_sirka int default 0,
        mat_format_idefix bigint default 0,
        mat_format_txt text,
        mat_spotreba_m2 numeric(15,2),
        mat_spotreba_bm numeric(15,2),
        poradi serial
    */

    //  })
  },
  async getLastID(form_item, zobraz = false) {
    //Tohle je pozustatek,jeste kdyz melo nbyt VL vic,necemu to nevadi, ale nebude to zrejme potreba
    const self = this;

    var q = `select * from zak_t_vl_v where idefix_item=${form_item.idefix} order by id desc limit 1`;
    //f.Alert(q, f.Jstr(form_item))
    Q.all(self.idefix, q).then(res => {
      if (!f.isEmpty(res.data.data) && res.data.data.length > 0) {
        //        f.Alert2("IDEFIX_VL ", res.idefix, "Q :", q , f.Jstr(res))
        if (zobraz) {
          eventBus.$emit("IDEFIX_VL", { IDEFIX_VL: res.data.data[0].idefix });
        }
      }
    });
  },

  async UpdateVL(form_zak, form_item) {
    //Kompletni polozky VL
    const self = this;
    var qU = "";

    var res = await self.VLdecode(form_item.obsah);

    //f.Alert("RESE ",f.Jstr(res))
    qU = `update zak_t_vl_v set `;
    qU += ` nazev='${form_zak.nazev}' `;
    qU += `,polozka='${form_item.nazev}' `;
    qU += `,celkem_ks='${form_item.ks}' `;
    qU += `,mat_txt='${res.mat.mat}' `;
    qU += `,idefix_mat='${res.mat.idefix_mat}' `;
    qU += `,mat_sirka='${res.mat.mat_sirka}' `;
    qU += `,mat_poznamka='${res.mat.mat_poznamka}' `;

    qU += `,stroj='${res.stroj.nazev}' `;
    qU += `,strojmod='${res.stroj.mod}' `;

    qU += `,celkem_m2='${res.metry.m2}' `;

    qU += ` where idefix_item = ${form_item.idefix}`;
    qU = qU.replace(/undefined/g, "0");

    //f.Alert2('funkce UpdateVL 12 ::',qU)

    await Q.post(self.idefix, qU);

    //Doplnit polozky pro finalni zalozeni
  },
  async UpdateVL_old(form_zak, form_item) {
    //Kompletni polozky VL
    const self = this;
    var qU = "";

    self.VLdecode(form_item.obsah).then(res => {
      //f.Alert(f.Jstr(res))
      qU = `update zak_t_vl_v set `;
      qU += ` nazev='${form_zak.nazev}' `;
      qU += `,polozka='${form_item.nazev}' `;
      qU += `,celkem_ks='${form_item.ks}' `;
      qU += `,mat_txt='${res.mat.mat}' `;
      qU += `,idefix_mat='${res.mat.idefix_mat}' `;
      qU += `,mat_sirka='${res.mat.mat_sirka}' `;
      qU += `,mat_poznamka='${res.mat.mat_poznamka}' `;

      qU += `,stroj='${res.stroj.nazev}' `;
      qU += `,strojmod='${res.stroj.mod}' `;

      qU += `,celkem_m2='${res.metry.m2}' `;

      qU += ` where idefix_item = ${form_item.idefix}`;
      qU = qU.replace(/undefined/g, "0");

      f.Alert2("funkce UpdateVL 12 ::", qU);

      Q.post(self.idefix, qU);
    });

    //Doplnit polozky pro finalni zalozeni
  },

  async VLdecode(data) {
    var defer = $.Deferred();
    var nsum = 0;
    var ntmp = 0;
    var res = {
      mat: {},
      stroj: {},
      metry: {}
    };
    res["mat"]["mat_poznamka"] = "";
    res["metry"]["m2"] = 0;
    //alert(this.getNakladSloupce())

    await data.forEach(async (element, idx) => {
      ntmp = 0; // Zde bude naklad leve strany, pokud bude k dispozici
      //,element.data,
      console.log("Dekode stroje", idx, " : ", element.data.txtFormat);
      res["stroj"]["nazev"] = element.data.stroj[0].nazev;
      res["stroj"]["mod"] = element.data.strojmod[0].nazev;

      res["metry"]["m2"] += element.data.ResultM2 * 1;
      //res['stroj']['all'] = element.data.stroj[0]

      if (!f.isEmpty(element.sloupecid)) {
        element.sloupecid.forEach(el => {
          //Prochod vsema sloupcema a pricteni ceny
          //console.log('Dekode Sloupce', el)
          if (el.type == "Mat1") {
            res["mat"]["mat"] = el.data.mat.nazev;
            res["mat"]["idefix_mat"] = el.data.mat.idefix_mat;
            res["mat"]["idefix_mat"] = el.data.mat.idefix_mat;
            res["mat"]["mat_sirka"] = el.data.mat.sirka_mm / 10;
            if (el.data.poznamka > "") {
              if (res["mat"]["mat_poznamka"] > "")
                res["mat"]["mat_poznamka"] += "; ";
              res["mat"]["mat_poznamka"] += el.data.poznamka;
            }

            console.log("Dekode Mat Sloupce", el.data.mat.nazev, el.data);
            console.log("Dekode RES Sloupce", res);
          }

          //Sloupce decode - dokoncovani
        });
      }
    });

    defer.resolve(res);
    return defer.promise();
  }
};
