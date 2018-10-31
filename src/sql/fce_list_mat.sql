create or replace FUNCTION fce_list_mat_copy(_idefix bigint, _user varchar(50) default 'mares') returns bigint as $$
   declare  idefix_new bigint := 0 ;
   declare r record ;
begin
	drop table if exists tmp_mat_insert ;

    drop table if exists tmp_list_mat_vlastnosti ;
    drop table if exists tmp_list_mat_barva ;
	drop table if exists tmp_list_mat_rozmer;
    drop table if exists tmp_list_mat_strojskup;

	create table tmp_mat_insert without oids as select * from list_mat where idefix = _idefix;
    create table tmp_list_mat_vlastnosti without oids as select * from list_mat_vlastnosti where idefix_mat = _idefix;
    create table tmp_list_mat_barva without oids as select * from     list_mat_barva where idefix_mat = _idefix;
    create table tmp_list_mat_rozmer without oids as select * from     list_mat_rozmer where idefix_mat = _idefix;
    create table tmp_list_mat_strojskup without oids as select * from     list_mat_strojskup where idefix_mat = _idefix;

	update tmp_mat_insert set id = nextval('list_mat_id_seq'::regclass), idefix=nextval('list2_seq'::regclass) ,time_insert = now(), time_update= now(),user_insert_idefix = login2idefix(_user) returning *;



    raise notice 'r %',r.idefix ;


    insert into list_mat select * from tmp_mat_insert ;
    /*
    list_mat_vlastnosti
    list_mat_barva
    list_mat_rozmer
    list_mat_strojskup
    */



    return idefix_new;
end;
$$LANGUAGE plpgsql;

create or replace function idefix_mat(text) returns bigint as $$
declare nret bigint := 0 ;
begin
select idefix into nret from list_mat where  upper(replace(replace(replace(nazev1||nazev2||nazev3,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',','')) order by idefix limit 1;
return nret;
end;
$$LANGUAGE plpgsql IMMUTABLE;

create or replace function idefix_mat(text) returns bigint as $$
declare nret bigint := 0 ;
begin
select idefix into nret from list_mat where
upper(replace(replace(replace(nazev1||nazev2||nazev3,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',',''))
or
upper(replace(replace(replace(txt,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',',''))
order by idefix limit 1;
return nret;
end;
$$LANGUAGE plpgsql IMMUTABLE;

create or replace function idefix_vyrobce(text) returns bigint as $$
declare nret bigint := 0 ;
begin
select idefix into nret from list2_matvyrobce where
upper(replace(replace(replace(nazev,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',',''))
or
upper(replace(replace(replace(vyrobce,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',',''))
order by idefix limit 1;
return nret;
end;
$$LANGUAGE plpgsql IMMUTABLE;

create or replace function idefix_dostupnost(text) returns bigint as $$
declare nret bigint := 0 ;
begin
select idefix into nret from list2_matdostupnost where
upper(replace(replace(replace(zkratka,' ',''),'-',''),',','')) =	upper(replace(replace(replace(	$1,' ',''),'-',''),',',''))

order by idefix limit 1;
return nret;
end;
$$LANGUAGE plpgsql IMMUTABLE;
-- drop function fce_list_mat_copy (bigint)
-- select * from fce_list_mat_copy(655)
