Plotrové folie
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','500 –','monomer'); --	61, 123	bm	91,00 Kč	80			Dostupnost do druhého dne, 5let život	Papyrus
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','700 –','polymer'); --	61, 123	bm	210,00 Kč	155			Dostupnost na objednání do 14ti dnů od objedn., 7let život	Papyrus
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','800 –','litá'); --	123	bm	210,00 Kč	210			Dostupnost na objednání do 14ti dnů od objednání, 9let život	Papyrus
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','SWF –','litá wrapping'); --	152	bm	340,00 Kč	340			BF čiré lepidlo, na objednání do 14ti dnů, 9let život	Papyrus
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','NV 500 –','reflexní'); --	123	bm	400,00 Kč	400			Na objednání do 14ti dnů, život do 2let	Papyrus
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','zrcadlová','zlatá/stříbrná'); --	123	bm	240,00 Kč				Skladem 	Igepa
insert into list_mat(nazev1,nazev2,nazev3) values ('Aslan','– dry apply', 'písková'); --	126, 152	bm	230,00 Kč	195			Skladem pouze v š. 126 cm	Vink
insert into list_mat(nazev1,nazev2,nazev3) values ('Avery','Wrap Gloss','Metalic Silver'); --	152	bm	384,00 Kč				Na polep Maserati	Integard
insert into list_mat(nazev1,nazev2,nazev3) values ('Mactac','8300 –','monomer'); --	61, 123	bm	80,00 Kč	80			Dostupnost do druhého dne, 5let život	Antalis
insert into list_mat(nazev1,nazev2,nazev3) values ('Mactac','9800 –','polymer'); --	61, 123	bm	150,00 Kč	150			Dostupnost na objednání do 14ti dnů od objedn., 7let život	Antalis
insert into list_mat(nazev1,nazev2,nazev3) values ('Tuning','film 700','BF'); --	152	bm	300,00 Kč	300			BF čiré lepidlo, na objednání do 14ti dnů, 9let život
insert into list_mat(nazev1,nazev2,nazev3) values ('Mactac','8900 –','na ploché stěny'); --	123	bm	100,00 Kč	100			Na objednání do 14ti dnů, život do 2let, nelze potisknout	Antalis
insert into list_mat(nazev1,nazev2,nazev3) values ('Hexis','20000 –','litá'); -- 	137, 152	bm	310,00 Kč	310			Skladem	Spandex
insert into list_mat(nazev1,nazev2,nazev3) values ('3M','SC 50 -','polymer'); --	122	bm	250,00 Kč	250			Čiré lepidlo, skladem, 6let život	Igepa
insert into list_mat(nazev1,nazev2,nazev3) values ('3M','SC 80 -','litá'); --	122	bm	290,00 Kč	290			Čiré lepidlo, skladem, 8let život	Igepa
insert into list_mat(nazev1,nazev2,nazev3) values ('3M','1080 -','Wrapping barvy'); --	152	bm	540,00 Kč	540			Kanálkové šedé lepidlo, skladem, metráž, 9let život	Igepa
insert into list_mat(nazev1,nazev2,nazev3) values ('3M','1080 -','Wrapping metalické'); --	152	bm	615,00 Kč	615			Kanálkové šedé lepidlo, skladem, metráž, 9let život	Igepa
insert into list_mat(nazev1,nazev2,nazev3) values ('Tabulovka',' – černá',''); --	137	bm	270,00 Kč				Na suchou křídu	Antalis
insert into list_mat(nazev1,nazev2,nazev3) values ('Tabulovka',' – čirá',''); --	137	bm	167,00 Kč				Na popisovací fixy	Igepa

update list_mat set idefix_matsubskup=(select idefix from list2_matsubskup where nazev = 'Plotrové folie') where  (idefix_matsubskup is null or idefix_matsubskup=0);
update list_mat set idefix_matskup=(select idefix from list2_matskup where zkratka= 'R') where idefix_matskup =0 ;
delete from list_mat where idefix_matskup =0 ;


