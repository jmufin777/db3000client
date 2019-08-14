import moment from 'moment'
import Q from './query'
import f from './fce'
import store from '@/store/store'

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
      if (cwhere == 'Jine') {
        cq+=` where not b.tisk `
        cq+=` and not b.nazev_text ilike any(array['lam%','bal%','%ez_n%','%ka__r%'] ) `
      } else
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
   getKasir(kalkulace="") {
    return this.getStrojItems('%ka__r%','1');
   },
   getBaleni() {
    return this.getStrojItems('%balen%','1');
   },
   getJine() {
    return this.getStrojItems('Jine','1');
   },
   getStroj1(colType="") {
//    alert(colType)
     if (colType=="Rezani"){

      return this.getStrojOnly('%ez_n%',"1");
     }
     if (colType=="Kasir"){
      return this.getStrojOnly('%Ka__r%',"1");
     }


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
    if (colType=='Jine') {
      return this.getJine();
    }
    return ''
   }

///Prace

,getPraceDod(){
  var q="select b.nazev as firma,c.nazev as prace, a.idefix_prace, a.idefix_firma from list_firmaprace a join list_dodavatel b on a.idefix_firma=b.idefix join list2_prace c on a.idefix_prace =c.idefix";
  return q;
}
,getPrace(){
  var q=`select distinct c.nazev as prace, a.idefix_prace,array_agg(b.idefix) as dod_seznam from list_firmaprace a
        join list_dodavatel b on a.idefix_firma=b.idefix join list2_prace c on a.idefix_prace =c.idefix group by c.nazev,a.idefix_prace order by c.nazev`;
  return q;
}
,getDod(idefix_prace=0){
  var q=`select  b.nazev as firma, a.idefix_firma,array_agg(a.idefix_prace) as prace_seznam from list_firmaprace a join list_dodavatel b on a.idefix_firma=b.idefix join list2_prace c on a.idefix_prace =c.idefix
          where ${idefix_prace} = 0  or a.idefix_prace = ${idefix_prace}
          group by b.nazev , a.idefix_firma
  order by b.nazev`;
  return q;
}

,async getFirma(idefix_firma=0){
  var idefix=store.state.idefix
  var defer = $.Deferred();
  var q=`select a.idefix,a.nazev,a.ico,idefix2fullname(user_update_idefix) from list_dodavatel a order by nazev `;
  var atmp=[]
  try {
    // f.Alert('kve 1')
    atmp= (await Q.all(idefix,q)).data.data
    // f.Info('Get Firma 1', "DATA: ",JSON.stringify(atmp))
    defer.resolve(atmp)



  }  catch(e) {
    defer.resolve(atmp)
    f.Alert2('Chyba  Dotaz Firma', e )
  }




  return defer.promise();
}

,async getFirmaOsoba(idefix_firma=0){
  var idefix=store.state.idefix

  var q=`select idefix, idefix_firma, osoba(idefix ) as nazev, aktivni,mail,tel from list_firmaosoba where idefix_firma = ${idefix_firma} order by jmeno`
  var defer = $.Deferred();
  var atmp=[]
  try {
    // f.Alert('kve 1')
    atmp= (await Q.all(idefix,q)).data.data

    if (atmp.length==0) {
      defer.resolve(atmp)
    } else  {
    await atmp.forEach(el=>{

      defer.resolve(atmp)
      // f.Info('Get User 1',el.expedice_datum, "DATA: ",JSON.stringify(atmp))
    })
    }
  }  catch(e) {
    defer.resolve(atmp)
    f.Alert2('Chyba  getFirmaOsoba', e )
  }


  return defer.promise();
}


,async getOsoba(idefix_osoba=0, skupina=''){
  var idefix=store.state.idefix
  var q=`select idefix,login,email,telefon, plati, zobraz ,level,idefix2fullname(idefix) as fullname, coalesce(b.skupiny,'N') as skupiny from list_users u
  left join (
  select a.idefix_user,array_to_string(array_agg(b.nazev order by nazev ),',') as skupiny  from list_groups_users a join list_groups b on a.idefix_group = b.idefix group by idefix_user
  ) b on u.idefix = b.idefix_user
  where u.plati= 1
  `
  q= `select * from (${q}) a where

  ( ${idefix_osoba} = 0 or idefix = ${idefix_osoba}   )
  and
  ( '${skupina}' = '' or  skupiny ilike '%${skupina}%'   )

  order by fullname
  `

  var defer = $.Deferred();
  var atmp=[]
  try {
    // f.Alert('kve 1')
    atmp= (await Q.all(idefix,q)).data.data

    if (atmp.length==0) {
      defer.resolve(atmp)
    } else  {
    await atmp.forEach(el=>{

      defer.resolve(atmp)
      // f.Info('Get User 1',el.expedice_datum, "DATA: ",JSON.stringify(atmp))
    })
    }
  }  catch(e) {
    defer.resolve(atmp)
    f.Alert2('Chyba  getFirmaOsoba', e , q )
  }


  return defer.promise();
}



}
