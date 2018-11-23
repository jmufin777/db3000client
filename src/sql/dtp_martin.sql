with t1 as (
with t as (
select cislozakazky,year(datumexpedice) as  rok,month(datumexpedice) as  mesic,nazev,nazevprace,sum(rozpocet) over (partition by kodzakazky) as prodej_celkem ,rozpocet as prodej_orig
	 ,b.cena as naklad_hod
	, nakladovacena as naklad
	 ,pocetkusu as hod
	 ,sum(pocetkusu) over (partition by kodzakazky) as hod_celkem
	 
	, count(*) over(partition by kodzakazky) as pocet, kodzakazky  from vyroba_prace a join 
(
select * from c_prac where vazba_studio is not null and nazevprace ~*'dtp' and poradi < 1000
	) b on a.kodprace=b.kodprace 
left join 	zak_list c on a.kodzakazky =c.kodzakazkoveholistu
where  pocetkusu >0  
	-- and zamknuto = 1::bit
) 
select *, (prodej_celkem / hod_celkem * hod)::numeric(10,2) as prodej_realnejsi  from t 
	--where pocet > 1

order by kodzakazky desc
	) select nazevprace,rok,mesic,sum(prodej_realnejsi) as prodej_real, sum(hod) as hodin
	 ,sum(naklad )::numeric(10,2) as naklad_uvedeny
	 ,sum(naklad_hod* hod )::numeric(10,2) as naklad_z_hodin_kalkulovany
	 
	, (sum(prodej_realnejsi) - sum(naklad))::numeric(12,2) as zisk_z_casu_zakazky_studio
    , (sum(prodej_realnejsi) - sum(naklad_hod * hod))::numeric(12,2) as zisk_z_casu_zakazky_studio_hod								   
	from t1
	group by rok,mesic,nazevprace order by rok desc ,mesic desc
	
--select * from vyroba_prace limit 10