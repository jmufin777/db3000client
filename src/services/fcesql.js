import moment from 'moment'

export default {

  getMatList(strojmod=0,sirka=0,vyska=0) {
   var  cq=""
   var cq2 =""
   var cq_zaklad=""
   var ntmp = sirka

   if (vyska < ntmp) {
     sirka=vyska
     vyska=ntmp
   }
   cq_zaklad= "select a.idefix as idefix_rozmer,idefix_mat,sirka_mm,vyska_mm,b.zkratka from list_mat_rozmer a  join list2_matdostupnost b on a.idefix_dostupnost=b.idefix "

   // update  list_mat_rozmer set sirka_mm=sirka_mm*10 where idefix_mat in (select idefix  from list_mat where idefix_matskup=276 and idefix_matsubskup!=411 );
    cq=`${cq_zaklad}

    where sirka_mm >= ${sirka} and vyska_mm >= ${vyska}
    and sirka_mm <=
      (
        select sirka_tisk_max_mm from list_stroj where idefix in
        (
          select idefix_stroj from list_strojmod where idefix= ${strojmod}
        )
      )
    and vyska_mm <=
      (
        select delka_tisk_max_mm from list_stroj where idefix in
        (
          select idefix_stroj from list_strojmod where idefix= ${strojmod}
        )
      )`

      cq2 = `select * from ( ${cq_zaklad} ) a where not exists (select * from (${cq}) b where a.idefix_rozmer=b.idefix_rozmer)`
      cq=`select 1::int as poradi,* from (${cq}) a union select 2::int as poradi,* from (${cq2}) b`


      cq=`select distinct on (c.nazev,concat2(' ',nazev1,nazev2,nazev3)) c.nazev as sub,concat2(' ',nazev1,nazev2,nazev3) as nazev,b.* from list_mat a  join (
          ${cq}
      ) b on a.idefix=b.idefix_mat join (select * from list2_matsubskup aa) c on a.idefix_matsubskup=c.idefix `


      cq = `select a.*,b.cena_naklad_m2,b.cena_prodej_m2 from (${cq}) a join list_mat b on a.idefix_mat=b.idefix where a.zkratka !='X' order by poradi`





      //console.log("AAAAA", cq)

     return cq

  }  ,




}
