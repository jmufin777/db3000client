select * from list_mat
select
a.idefix
,ms.zkratka as mattyp
,ms.nazev as skupina ,mss.nazev  as podskupina
,a.nazev1,a.nazev2,a.nazev3
,a.cena_nakup_m2
,a.sila_mm
,mv.nazev
,mrs.rozmers,mrs.sirkys,mrs.delkymms,mrs.navins
,mro.rozmero,mro.sirkyo,mro.delkymmo,mro.navino
,mv.nazev as vyrobce
,md.nazev as dodavatel
--a.*,md.*
from list_mat a
--Enums
left join list2_matskup ms on a.idefix_matskup = ms.idefix
left join list2_matsubskup mss on a.idefix_matsubskup = mss.idefix
left join list2_matvyrobce mv on a.idefix_vyrobce = mv.idefix
---Propojky 1:1
left join
(select * from list_dodavatel where mat =1 ) md
 on a.idefix_dodavatel = md.idefix

--Propojky n:n

left join
(

select idefix_mat,b.zkratka
	           ,array_to_string(array_agg(distinct (sirka_mm/1000)::numeric(10,2)::text||'x'||(vyska_mm/1000)::numeric(10,2)::int::text),',') as rozmers
			   , array_to_string(array_agg(distinct sirka_mm::int),',') as sirkys
			   , array_to_string(array_agg(distinct vyska_mm::int),',') as delkymms
			   , array_to_string(array_agg(distinct vyska_mm/1000::int),',') as navins

from list_mat_rozmer a join list2_matdostupnost b on a.idefix_dostupnost = b.idefix where b.zkratka='S' and idefix_mat >0
group by b.zkratka, idefix_mat

) mrs on a.idefix =mrs.idefix_mat

left join
(

select idefix_mat,b.zkratka
	           ,array_to_string(array_agg(distinct (sirka_mm/1000)::numeric(10,2)::text||'x'||(vyska_mm/1000)::numeric(10,2)::int::text),',') as rozmero
			   , array_to_string(array_agg(distinct sirka_mm::int),',') as sirkyo
			   , array_to_string(array_agg(distinct vyska_mm::int),',') as delkymmo
			   , array_to_string(array_agg(distinct vyska_mm/1000::int),',') as navino

from list_mat_rozmer a join list2_matdostupnost b on a.idefix_dostupnost = b.idefix where b.zkratka='O' and idefix_mat >0
group by b.zkratka, idefix_mat

) mro on a.idefix =mro.idefix_mat




--left join (

--)
order by ms.nazev, mss.nazev




 where a.idefix = 655

select * from list_mat_stroj


select fce_list_mat_clean('')
select * from list_mat
select count(*), count(distinct idefix) from list_mat;
select fce_list_mat_copy(2937);
select count(*) from list_mat;


select idefix_mat,b.zkratka,array_agg(distinct sirka_mm::int::text||'x'||vyska_mm::int::text) as rozmer,
array_agg(distinct sirka_mm::int) as sirky, array_agg(distinct vyska_mm::int) as delky
from list_mat_rozmer a join list2_matdostupnost b on a.idefix_dostupnost = b.idefix
group by b.zkratka, idefix_mat

select * from list_mat_rozmer
select * from list_mat_projcena

 select * from list_mat_rozmer
 select * from list2_matsubskup
 select * from list2_matvlastnosti
  select kod,* from list_mat_projcena
  where idefix_mat = 1869

  insert into list_mat_projcena (idefix_mat,datum) select * from (select '1869' as idefix_mat,now()::date ) a
        where not exists (select * from list_mat_projcena b where a.idefix_mat=b.idefix_mat)
  delete from list_mat_projcena
  insert into list_mat_projcena (idefix_mat,datum) select * from (select 1869 as idefix_mat,now()::date ) a
  where not exists (select * from list_mat_projcena b where a.idefix_mat=b.idefix_mat)
  alter table list_mat_projcena rename monozstvi  to mnozstvi
select * from list_mat_strojskup
update list_mat set idefix_dodavatel = 631 where idefix = 655
update list_mat set popis = 'Testovaci popis materialu' where idefix = 655
update list_mat set idefix_matskup = 276
update list_mat set idefix_matsubskup = 430

select * from list2_matskup order by kod
select * from list_mat_strojskup

select * from list2_matvlastnosti ;
select * from list2_strojskup;
select * from list2_matdostupnost;
select * from list_dodavatel ;


insert into list_mat_vlastnosti(idefix_mat,idefix_vlastnost) values (655,939)
insert into list_mat_strojskup(idefix_mat,idefix_strojskup) values (655,244) --velkoploch
insert into list_mat_rozmer(idefix_mat,sirka_mm,vyska_mm, sirka_mm_zbytek,vyska_mm_zbytek, idefix_dostupnost) values (655,106,50000,1,2,286); --na objednavku vzor
insert into list_mat_rozmer(idefix_mat,sirka_mm,vyska_mm, sirka_mm_zbytek,vyska_mm_zbytek, idefix_dostupnost) values (655,160,50000,3,5,285); --Skladem vzor
insert into list_mat_rozmer(idefix_mat,sirka_mm,vyska_mm, sirka_mm_zbytek,vyska_mm_zbytek, idefix_dostupnost) values (655,137,50000,3,3,286); --na objednavku vzor
insert into list_mat_rozmer(idefix_mat,sirka_mm,vyska_mm, sirka_mm_zbytek,vyska_mm_zbytek, idefix_dostupnost) values (655,155,50000,3,4,285); --Skladem vzor


select * from list_mat
--alter table list_mat drop sirka_mm_zbytek cascade
--alter table list_mat drop vyska_mm_zbytek cascade

select * from list_mat_rozmer
select * from list_mat_strojskup
select * from list_mat_stroj



delete from list_mat where id > 10
alter table
--select * from list2_matskup
select * from list_dodavatel


--alter table list_mat drop idefix_dotavatel cascade
