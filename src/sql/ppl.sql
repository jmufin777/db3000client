 select user_login_xlogin('xlogin')
select user_login_xlogin(login),* from doch_t_ppl  limit 10 

select 

datum::date,
jmeno,
user_login_xlogin(login),

login_dur::time as t_login,
login_time,
logout_time ,
meal_dur as aux1 ,  -- obed,
break_dur as aux4, -- osobni
coach_dur as kaucing,
activities_dur as aux_total,
time2sec(login_dur::text::interval) 
,time_sum(meal_dur::interval::text, break_dur::interval::text)


from doch_t_ppl limit 10 

select time_sum('08:00'::interval, '08:00'::interval)
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

select uct_kod_db('PPL-IL')
											  
									
Tlogin  = v dtb doch_t_ppl pod názvem ‚login_dur ‘
Login = login_time
Logout = logout_time
AUX 1 – Oběd = meal_dur
AUX 4 – Osobko/Personal = break_dur – s tím, že v Agenti Hradci čerpají 30min/8hodin a v ostatních lokalitách je to 5min na každe 2 odpracované hodiny
Kaučing = coach_dur                  
Total aux = activities_dur
																				