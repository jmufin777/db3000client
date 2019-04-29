import moment from 'moment'

export default {

  getMatList(strojmod=0,sirka=0,vyska=0) {
   var  cq="";
   var ntmp = sirka
   if (vyska < ntmp) {
     sirka=vyska
     vyska=ntmp
   }
   // update  list_mat_rozmer set sirka_mm=sirka_mm*10 where idefix_mat in (select idefix  from list_mat where idefix_matskup=276 and idefix_matsubskup!=411 );
    cq=`select idefix_mat,sirka_mm,vyska_mm,b.zkratka from list_mat_rozmer a  join list2_matdostupnost b on a.idefix_dostupnost=b.idefix

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
        select sirka_tisk_max_mm from list_stroj where idefix in
        (
          select idefix_stroj from list_strojmod where idefix= ${strojmod}
        )
      )`

      cq=`select c.nazev as sub,concat2(' ',nazev1,nazev2) as nazev,b.* from list_mat a  join (
          ${cq}
      ) b on a.idefix=b.idefix_mat join (select * from list2_matsubskup aa) c on a.idefix_matsubskup=c.idefix`
      console.log(cq)
     return cq

  }  ,




}
