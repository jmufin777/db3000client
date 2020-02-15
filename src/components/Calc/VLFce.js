import f from '@/services/fce';
import Q from '../../services/query';
//import SQL from '../../services/fcesql';
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

  vl_view(_idefix_vl) {
    eventBus.$emit("IDEFIX_VL", { IDEFIX_VL: _idefix_vl });
  },
  vl_viewlist(_idefix_vl) {
    alert(_idefix_vl)
    eventBus.$emit("IDEFIX_VLIST", { IDEFIX_VL: _idefix_vl });
  },
  async IDEFIXS_VL(czak) {
    const self = this;
    //alert('vllist')
    var seznam = await Q.vl_list(self.idefix, {
      idefix_zak: self.c1.aktivni_zak
    });

    return new Promise(resolve => {
      // f.Jstr(c1.seznam),
      f.log(
        "huhu ",
        self.c1.aktivni_zak,
        " SEZNAM ",
        f.Jstr(seznam.data.vllist) + " --END"
      );
      resolve(seznam.data.vllist);
    });
    //
    //f.Alert2('huhu ',self.c1.IDEFIXACTIVE_ZAK)
  },
  nahledCancel() {
    const self = this;

    if (this.c1.nahledTimeOut) {
      this.c1.nahledTimeOut = false;

      if ($("#vlview" + self.ID).is(":animated")) {
        $("#vlview" + self.ID)
          .stop()
          .animate({ opacity: "100" });
        // $("#vlview"+self.ID).stop(true,true).fadeIn();
        //alert('stopka 1')
        self.c1.nahled = true;
      }
      self.c1.nahled = true;

      return;
    }
    this.c1.nahledTimeOut = setTimeout(function() {
      $("#vlview" + self.ID).fadeOut(500, function() {
        self.c1.nahled = false;
      });
    }, 1000);
  },

  nahledView() {
    const self = this;
    $("#vlview" + self.ID).fadeIn(500, function() {
      self.c1.nahled = true;
    });
  },

  async sendAllVLDraw() {
    const self = this;
    let neco = await this.sendAllVL();
    if (neco >= 1) {
      setTimeout(function() {
        self.beforeArray();
      }, 500);
    }
  },
  async sendAllVL(ifx = 0, sendStatus = true) {
    const self = this;
    let dataTemp = {};
    let dataItem = {};
    var q = "";
    let res = [];
    let res1 = [];
    let res2 = [];
    let nRet = 0;

    if (self.c1.MAINMENULAST == "kalkulace") {
      f.mAlert(
        "V rezimu nabidek nelze zadavat praci na vyrobu, je nutne vytvorit zakazku"
      );
      return;
    }

    //f.Alert('Jeste uplnene, ale bude to v poho co nejryhleji to pujde', self.idefix)
    f.log("VL ALL 0");
    //var q=`select * from ${self.c1.cTable} where idefix = ${self.form.idefix}`
    var q = `select * from ${self.c1.cTable} where status is null or status=0 or status = 2`;
    res = await Q.all(self.idefix, q);
    f.log("VL ALL 1", q, f.Jstr(res));
    //return

    if (!f.isEmpty(res.data.data)) {
      //f.Alert('Odeslilam do vyroby vse','Uz to jede ....' )
      //f.log('VL ALL 1B', q, f.Jstr(res.data.data))
      let necores = res.data.data;
      nRet = necores.length;
      if (await self.otazka(`Odeslat ${nRet} zbyvajicich VL ?`)) {
        await f
          .asyncForEach(necores, async (dataTemp, idx) => {
            f.log("VL ALL - temp ", f.Jstr(dataTemp));
            // alert('a')
            f.log("VL ALL 1C", q, dataTemp.idefix_src);
            //dataTemp = res.data.data[0]
            if (dataTemp.idefix_src >= 0 && dataTemp.idefix_zak > 0) {
              f.log("VL ALL 1D", q, dataTemp.idefix_src);
              //Tohle prohodit - napred uspesne vlozit a pak teprv oznacit c1.status = 1 jako ze  existuje VL
              let q2 = `update zak_t_items set status = 1  where idefix = ${dataTemp.idefix_src}  and idefix_zak = ${dataTemp.idefix_zak} ;
                   update ${self.c1.cTable} set status = 1  where idefix = ${dataTemp.idefix_src}  and idefix_zak = ${dataTemp.idefix_zak};
                   update zak_t_vl_v set datumodeslani=now(),idefix_odeslal=${self.idefix},user_update_idefix=${self.idefix} where idefix_item=${dataTemp.idefix_src} ;
                 `;
              f.log("VL ALL 2 A", q2);
              res2 = await Q.post(self.idefix, q2);
              f.log("VL ALL 2 B", q2);

              await fceVL.Vklad(dataTemp.idefix_src, "", self.c1.cTable);
              f.log("VL ALL 3");
              await Q.post(
                self.idefix,
                `select vl_set(idefix_zak(${dataTemp.idefix_src}),-1)`
              ); //uklid
              //f.log('VL ALL 4')
            }
          })
          .then(() => {
            //Uklid presunut az po vsech
            //Q.post(self.idefix,`select vl_set(idefix_zak(${dataTemp.idefix_src}),-1)`)  //uklid
            Q.post(
              self.idefix,
              `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
            ); //uklid
            f.log(
              "VL ALL 4A ",
              `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
            );
          })
          .catch(e => {
            f.log(
              "VL ALL 4 ERR ",
              `select vl_set(idefix_zak(${self.c1.aktivni_zak}),-1)`
            );
          });
      } else {
        nRet = -1;
      }
      //f.Alert(dataTemp.idefix_src)
    } else {
      f.Alert2("Zadne zaznamy k odeslani");
      nRet = -1;
    }
    return new Promise(resolve => {
      resolve(nRet);
    });
    //f.Alert2(f.Jstr(res), q)
  },


}

