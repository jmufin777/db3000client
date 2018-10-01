select * from wfm.shift_status
select * from wfm.cis_shift_block
select count(*), count(distinct user_id1)
, array_to_string(array_agg(user_login(user_id1)),',') as rozpis_lidi_s_podivnym_chovanim_smlouvy
from wfm.shift_users a  where 
--user_id1= 114026 and 
shift_block = 99 
and exists (select * from doch_t_smlouva b where a.user_id1 = b.user_id and 
			(b._do >a.d_from 
			or b._do is null
			)
			)
and obdobi(a.d_from)>= obdobi_prev(now()::date)
limit 10 