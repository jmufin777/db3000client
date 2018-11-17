1.4       x 3
1.4       x 3
1         x 1.4
1         x 1.4
1.4       x 3
0         x 0
1.4,2     x 3
1.4,1     x 3
1         x 1,4
1.5,2     x 3
1.5,2     x 3
0         x 0
1.53      x 3
1.53      x 3
1.5,2     x 3
1.5,2     x 3
1.5,2     x 3
1.5,2     x 3
1.5,2     x 3
1.5,2     x 3
1.5,2     x 3
1.5       x 3
0         x 0
1.5       x 3
1.5       x 3
2,1.4     x 1
1         x 1.4
1         x 1.4
2,1.5     x 3
2,1.5     x 3
4.3       x 1.5
3         x 1.5
1.6       x 2
1.6       x 2.2
1.05      x 1.3
1.58      x 2.2
1.6       x 2.2
1.45      x 1.6
0.7       x 1
1.2,2.1   x 1.6
0.7       x 1
1.2       x 777
0.7       x 1
0.7       x 1
1.6       x 3.2
1.6       x 3.2
1.6       x 3.2
1.5,2     x 3,
1.25      x 2.45
1,1.2     x 2
1,1.2     x 2
1,1.2     x 2
2.2       x 0.8
1.5       x 2    ,   1 x 3
1.5       x 2


  ,   1 x 3

insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Foam X (Kapa - Papírová) 10 mm'	),	unnest(string_to_array(trim(	'1.4    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Foam X (Kapa - Papírová) 5 mm'	),	unnest(string_to_array(trim(	'1.4    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Foam X (Kapa - Papírová) 3 mm'	),	unnest(string_to_array(trim(	'1      '	),','))::float*1000,	'1.4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kapa Line - Papírová pěnová 3 mm'	),	unnest(string_to_array(trim(	'1      '	),','))::float*1000,	'1.4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kapa Line - Papírová pěnová 5 mm'	),	unnest(string_to_array(trim(	'1.4    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Kapa Line - Papírová pěnová 10 mm'	),	unnest(string_to_array(trim(	'0      '	),','))::float*1000,	'0'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kapa Plast - Plastová pěnová  10 mm'	),	unnest(string_to_array(trim(	'1.4,2'	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kapa Plast - Plastová pěnová  5 mm'	),	unnest(string_to_array(trim(	'1.4,1  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Kapa Plast - Plastová pěnová  3 mm'	),	unnest(string_to_array(trim(	'1      '	),','))::float*1000,	'1,4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Stadur - Plastová s pěnovým jádrem  10 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Stadur - Plastová s pěnovým jádrem  5 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Smart X (varianta Staduru) 0 mm'	),	unnest(string_to_array(trim(	'0      '	),','))::float*1000,	'0'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex Digital - Pěněné PVC 3 mm'	),	unnest(string_to_array(trim(	'1.53   '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex Digital - Pěněné PVC 5 mm'	),	unnest(string_to_array(trim(	'1.53   '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Forex - Pěněné PVC 10 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Forex - Pěněné PVC 8 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex - Pěněné PVC 6 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex - Pěněné PVC 5 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex - Pěněné PVC 4 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex - Pěněné PVC 3 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex - Pěněné PVC 2 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Forex - Pěněné PVC 1 mm'	),	unnest(string_to_array(trim(	'1.5    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Forex originál 0 mm'	),	unnest(string_to_array(trim(	'0      '	),','))::float*1000,	'0'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Forex - Pěněné PVC barevné 5 mm'	),	unnest(string_to_array(trim(	'1.5    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Forex - Pěněné PVC barevné 3 mm'	),	unnest(string_to_array(trim(	'1.5    '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'PVC - Iroplast 0.5 mm'	),	unnest(string_to_array(trim(	'2,1.4  '	),','))::float*1000,	'1'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Pentaprint 0.3 mm'	),	unnest(string_to_array(trim(	'1      '	),','))::float*1000,	'1.4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'PET-G 0.5 mm'	),	unnest(string_to_array(trim(	'1      '	),','))::float*1000,	'1.4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Dibond Hliníkový kompozit 0,21mm 3 mm'	),	unnest(string_to_array(trim(	'2,1.5  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Dibond Hliníkový kompozit 0,21mm 2 mm'	),	unnest(string_to_array(trim(	'2,1.5  '	),','))::float*1000,	'3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'X'	),idefix_mat(	'orig. 6 mm'	),	unnest(string_to_array(trim(	'4.3    '	),','))::float*1000,	'1.5'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'X'	),idefix_mat(	'anglický bílý (mat/mat)  4 mm'	),	unnest(string_to_array(trim(	'3      '	),','))::float*1000,	'1.5'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kartonové vlny 4 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kartonové vlny 1 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'2.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Kartonové vlny 1 mm'	),	unnest(string_to_array(trim(	'1.05   '	),','))::float*1000,	'1.3'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kartonové vlny 4 mm'	),	unnest(string_to_array(trim(	'1.58   '	),','))::float*1000,	'2.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Kartonové vlny 3 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'2.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'GT2 Ultraboard plus 450g  0.3 mm'	),	unnest(string_to_array(trim(	'1.45   '	),','))::float*1000,	'1.6'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'GD2 Ultraboard 450g 0.3 mm'	),	unnest(string_to_array(trim(	'0.7    '	),','))::float*1000,	'1'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Carrier kraft 330g 0 mm'	),	unnest(string_to_array(trim(	'1.2,2.1'	),','))::float*1000,	'1.6'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Ensocoat 350g 0 mm'	),	unnest(string_to_array(trim(	'0.7    '	),','))::float*1000,	'1'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'KATZ Board 2 mm'	),	unnest(string_to_array(trim(	'1.2    '	),','))::float*1000,	'777'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Eskaduo 1 mm'	),	unnest(string_to_array(trim(	'0.7    '	),','))::float*1000,	'1'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'Eskamono  2 mm'	),	unnest(string_to_array(trim(	'0.7    '	),','))::float*1000,	'1'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Voštinová deska Re-board basic 10 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'3.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Voštinová deska Re-board basic 16 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'3.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Voštinová deska Re-board premium s certifikátem FSC 10 mm'	),	unnest(string_to_array(trim(	'1.6    '	),','))::float*1000,	'3.2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Dutinka - kartonplast 5 mm'	),	unnest(string_to_array(trim(	'1.5,2  '	),','))::float*1000,	'3,'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'S'	),idefix_mat(	'DISPA - super papírová deska 3.8 mm'	),	unnest(string_to_array(trim(	'1.25   '	),','))::float*1000,	'2.4'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'HPS  1 mm'	),	unnest(string_to_array(trim(	'1,1.2  '	),','))::float*1000,	'2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'HPS  2 mm'	),	unnest(string_to_array(trim(	'1,1.2  '	),','))::float*1000,	'2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'HPS  3 mm'	),	unnest(string_to_array(trim(	'1,1.2  '	),','))::float*1000,	'2'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Pěněný polypropylen 3 mm'	),	unnest(string_to_array(trim(	'2.2    '	),','))::float*1000,	'0.8'	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Crylon čirý 3 mm'	),	unnest(string_to_array(trim(	'1.5    '	),','))::float*1000,	'2  '	*1000	;
insert into list_mat_rozmer(idefix_dostupnost,idefix_mat,sirka_mm,vyska_mm)		select 	idefix_dostupnost(	'O'	),idefix_mat(	'Crylon čirý 5 mm'	),	unnest(string_to_array(trim(	'1.5    '	),','))::float*1000,	'2  '	*1000	;


