select 
a.* from list_mat a
left join list2_matskup ms on a.idefix_matskup = ms.idefix
left join list2_matsubskup mss on a.idefix_matsubskup = mss.idefix
left join list2_matvyrobce mv on a.idefix_vyrobce = mv.idefix
left join list_matvyrobce mv on a.idefix_vyrobce = mv.idefix
left join 
(select * from list_dodavatel where mat =1 ) md
 on a.idefix_dodavatel = md.idefix


select * from list_mat_vlastnosti
select * from list_mat_rozmer
select * from list_mat_strojskup
select * from list_mat_stroj



delete from list_mat where id > 10
alter table 
--select * from list2_matskup
select * from list_dodavatel


--alter table list_mat drop idefix_dotavatel cascade