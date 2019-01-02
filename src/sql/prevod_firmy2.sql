select * from vazba_firma
select * from list_firmaosoba

--delete from list_dodavatel  where id in (26,27,28)
select * from list_dodavatel order by ico
update list_dodavatel set mat = 0 where id > 25

alter table list_dodavatel alter tel type varchar(50)
drop rule log_list_dodavatel on list_dodavatel
log_list_dodavatel

nazev,ulice,obec,psc,tel,tel2,mail,splatnost,hotovost, time_insert,ico
nazevfirmy,adresa,mesto,psc,mobil,telefonnicislo,email,splatnost,hotovost,d_insert,ico
