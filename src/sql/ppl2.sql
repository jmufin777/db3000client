select a.*
,case when user_smlouva_xlogin(obdobi::date ,user_name)='hpp' then b.hpp_ppauza
      when user_smlouva_xlogin(obdobi::date ,user_name)='dpp' then b.dpp_ppauza
      when user_smlouva_xlogin(obdobi::date ,user_name)='dpc' then b.dpc_ppauza
      end as add_pb_pauza

,trim(uct_kod_db(skupina)) as uct_kod

 from
(
select
obdobi::date as obdobi
,obdobi::date as _od
,case when logout_time::interval < login_time::interval then obdobi::date+1 else obdobi::date end as _do
,user_id_xlogin(user_name) as user_id
,'IP'::text as typ
,'IP'::text as typ_2
,'APP'::text as zdroj
,login_time::interval as _odt
,logout_time::interval as _dot
,'REPORTS_PPL'::text as poznamka
--, time2sec((time_diff(login_time,logout_time) - time_sum(aux1,aux4))) as delka   ---!!!! Zmena placeneho casu !!!!! 20140430
    ,time2sec((t_login::text::interval) - time_sum(aux1,aux4)) as delka
--, time_diff(login_time,logout_time) as celkem_od_do                              ---!!!! Zmena placeneho casu !!!!! 20140430  
, t_login::text::interval as celkem_od_do
, time_sum(aux1,aux4)
, user_name
, skupina
--, as uct_kod

from doch_t_ip_sklad_zm
where date1(obdobi) between dmonth_obdobi(obdobi($1),0) and dmonth_obdobi(obdobi($1),1)
)
 a join (
select uct_kod as uct_kod_b,max(dpp_ppauza) as dpp_ppauza
,max(dpc_ppauza) as dpc_ppauza
,max(hpp_ppauza) as hpp_ppauza
from doch_t_uct_kod
--where
--dpp_ppauza <> 0 or dpc_ppauza<>0 or hpp_ppauza <> 0

group by uct_kod order by uct_kod,hpp_ppauza desc

 ) b on  uct_kod_db(skupina)::text=b.uct_kod_b

where obdobi(_od)=obdobi($1)
;
