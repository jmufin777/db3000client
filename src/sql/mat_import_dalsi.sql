Plotrové folie

insert into list_mat(nazev1,nazev2,nazev3) values ('Přenoska','papírová','') ;--	122	100 m	33,00 Kč	33	S		Střední lepivost	MacTac
insert into list_mat(nazev1,nazev2,nazev3) values ('Přenoska','PVC',''); -- "pomeranč"	122	100 m	33,00 Kč	33	S		Bez podkladového papíru, nižší lepivost	Poli-Tape
insert into list_mat(nazev1,nazev2,nazev3) values ('Přenoska','PVC',''); --	100	100 m	60,00 Kč	60	S		S podkladovým papírem, nejsilnější lepivost	Poli-Tape


update list_mat set idefix_matsubskup=(select idefix from list2_matsubskup where nazev = 'Přenosky') where  (idefix_matsubskup is null or idefix_matsubskup=0);
update list_mat set idefix_matskup=(select idefix from list2_matskup where zkratka= 'R') where idefix_matskup =0 ;
delete from list_mat where idefix_matskup =0 ;


