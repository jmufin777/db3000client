
insert into list_mat(nazev1,nazev2,nazev3) values ('Fotopapír','Satén','205gsm'); --	91, 106, 137, 152	61 m	42,00 Kč	40	S	UV, Latex	Určený k oboustrannému tisku, matný povrch, laminovat pouze oboustranně	HP
insert into list_mat(nazev1,nazev2,nazev3) values ('Fotopapír','Lesklý','260gsm'); --	91, 106, 137, 152	61 m			S	UV, Latex	Jednostranný tisk, lesklý povrch	HP
insert into list_mat(nazev1,nazev2,nazev3) values ('CLV','150gsm','') ; --	137	100 m	17,00 Kč	17	S	UV, Latex	Jednostranný tisk, možnost nahuštění barvy pro prosvětlení	Chantaffiche
insert into list_mat(nazev1,nazev2,nazev3) values ('CLV','200gsm',''); --137	100 m	22,00 Kč	22	S	UV, Latex	Jednostranný tisk	Chantaffiche
insert into list_mat(nazev1,nazev2,nazev3) values ('Blueback', '115gsm',''); --	137	100 m	15,00 Kč	15	S	UV, Latex	Jednostranný tisk, modrá zadní strana, určené na polepy billboardů	Symbio
insert into list_mat(nazev1,nazev2,nazev3) values ('Ofsetový','papír 90gsm',''); --	106	50 m	10,00 Kč	10	S	UV	Jednostranný tisk, zářivě bílý materiál	Symbio

update list_mat set idefix_matskup=(select idefix from list2_matskup where zkratka= 'R') where idefix_matskup =0 ;
update list_mat set idefix_matsubskup=(select idefix from list2_matsubskup where nazev = 'Papíry') where  (idefix_matsubskup is null or idefix_matsubskup=0);
