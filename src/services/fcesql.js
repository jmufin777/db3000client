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

      cq = `select a.*,b.cena_naklad_m2,b.cena_prodej_m2 from (${cq}) a join list_mat b on a.idefix_mat=b.idefix where a.zkratka !='X' order by nazev,zkratka `


      //console.log("AAAAA", cq)

     return cq

  }  ,

   getStrojItems(cwhere = '', technologie='')  {

    var cq = `select a.*
      ,b.nazev as nazev_stroj
      ,b.nazev_text as technologie
      ,b.delka_mat_max_mm,b.sirka_mat_max_mm
      ,b.delka_tisk_max_mm,b.sirka_tisk_max_mm
      ,b.tech_okraj_strana_mm,b.tech_okraj_start_mm
      ,b.tech_okraj_spacecopy_mm,b.tech_okraj_spacejobs_mm
      ,bez_okraj
      ,spadavka_mm,space_znacky_mm
      ,sirka_lam_max_mm,delka_lam_max_mm

      ,b.nazev_text as technologie
      /* n naklady */
      ,priprava_minuta_naklad,priprava_minuta_prodej
      ,priprava_cas_minuta,priprava_celkem_naklad,priprava_celkem_prodej
      ,tisk

      from list_strojmod a join list_stroj b on a.idefix_stroj = b.idefix`
      if (technologie>''){
        cq+=` where b.nazev_text ilike '${cwhere}'`
      } else {
        cq+=` where a.nazev ilike '${cwhere}'`
      }

      cq+=` order by case when a.mod_priorita = true then 1 else 2 end,  a.kod`
       cq = `select distinct on (a.nazev)  * from ( ${cq} ) a order by nazev`
       if (cwhere=='') {
         cq += ' limit 0'
         alert('Limit 0')
       }

    return cq ;

   },
   getStrojOnly(cwhere = '')  {

    var cq = `select a.*, b.nazev as nazev_stroj
      ,b.delka_mat_max_mm,b.sirka_mat_max_mm
      ,b.delka_tisk_max_mm,b.sirka_tisk_max_mm
      ,b.tech_okraj_strana_mm,b.tech_okraj_start_mm
      ,b.tech_okraj_spacecopy_mm,b.tech_okraj_spacejobs_mm
      ,bez_okraj
      ,spadavka_mm,space_znacky_mm
      ,sirka_lam_max_mm,delka_lam_max_mm

      ,b.nazev_text as technologie
      --naklady
      ,priprava_minuta_naklad,priprava_minuta_prodej
      ,priprava_cas_minuta,priprava_celkem_naklad,priprava_celkem_prodej
      ,tisk

      from list_strojmod a join list_stroj b on a.idefix_stroj = b.idefix  where b.nazev ilike '${cwhere}'
      order by case when a.mod_priorita = true then 1 else 2 end,  a.kod`
       cq = `select distinct on (a.nazev_stroj)  * from ( ${cq} ) a order by nazev_stroj`
       if (cwhere=='') {
         cq += ' limit 0'
         alert('Limit 0')
       }

    return cq ;

   },
   getLaminace() {
    return this.getStrojItems('%lam%','1'); // hleda jen v laminatorech
   },
   getRezani() {
    return this.getStrojItems('%ez_n%','1');
   },
   getKasir() {
    return this.getStrojItems('%ka__r%');
   },
   getBaleni() {
    return this.getStrojItems('%balen%');
   },
   getStroj1(colType="") {
     if (colType=="Rezani")
    return this.getStrojOnly('%ez_n%',"1");
   },
   getStroj(colType="") {
    if (colType=='Kasir') {
      return this.getKasir();
    } else
    if (colType=='Laminace') {
      return this.getLaminace();
    }
    else
    if (colType=='Baleni') {
      return this.getBaleni();
    }
    if (colType=='Rezani') {
      return this.getRezani();
    }
    return ''
   }




}
