--select doch_ppl_other('20181010');
create or replace function doch_ppl_other(date) returns text as $$
begin

if is_table('doch_t_other_ppl_tmp')=1 then
   drop table doch_t_other_ppl_tmp;
end if ;


--update doch_t_users2 set xlogin=trim((string_to_array(xlogin2,','))[1]) where xlogin!=trim((string_to_array(xlogin2,','))[1]) and xlogin2>'';


RAISE NOTICE 'Vytvarim PPL pracovni tabulku';

create table doch_t_other_ppl_tmp without oids as
select * from (
select
datum::date as obdobi
,datum::date as _od
,case when logout_time::interval < login_time::interval then datum::date+1 else datum::date end as _do
,user_id_xlogin(login) as user_id
,'PPL'::text as typ
,'PPL'::text as typ_2
,'APP'::text as zdroj
,login_time::interval as _odt
,logout_time::interval as _dot
,'REPORTS_PPL'::text as poznamka

   ,time2sec((login_dur::text::interval) - time_sum(meal_dur::interval::text, break_dur::interval::text)     ) as delka

, login_dur::text::interval as celkem_od_do
, time_sum(meal_dur::interval::text, break_dur::interval::text)
, login
, 'PPL-IL' as uct_kod


from doch_t_ppl 
												   
where date1(datum::text) between dmonth_obdobi(obdobi('201810'),0) and dmonth_obdobi(obdobi('201810'),1)
)
 a join (
select uct_kod as uct_kod_b,max(dpp_ppauza) as dpp_ppauza
,max(dpc_ppauza) as dpc_ppauza
,max(hpp_ppauza) as hpp_ppauza
from doch_t_uct_kod
--where
--dpp_ppauza <> 0 or dpc_ppauza<>0 or hpp_ppauza <> 0

group by uct_kod order by uct_kod,hpp_ppauza desc

 ) b on  a.uct_kod::text=b.uct_kod_b
 --uct_kod_db(skupina)::text=b.uct_kod_b

where obdobi(_od)=obdobi('201810')
;


delete from doch_t_other where obdobi(_od)=obdobi('201810') and typ='PPL' and typ_2='PPL';
--select * from doch_t_other where obdobi(_od)=obdobi('201810') and typ='PPL' and typ_2='PPL';

perform ins_sel_add('doch_t_other_ppl_tmp','doch_t_other');


return 'Reports PPL  za ' ||$1 ||' Vlozeny';



end;
$$language PLPGSQL;