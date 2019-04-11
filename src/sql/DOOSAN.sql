with t as (
select order_date::date as order_number ,orderid

,product
,item_quantity as quantity

,doosan_cena_radek(a.*)
,doosan_cena_obj(orderid)
,doosan_cena_bez_ser_obj(orderid)
,doosan_vaha_obj(orderid)
,doosan_ups_br_obj(orderid)
,doosan_ups_om_obj(orderid)	
,doosan_ups_obj(orderid)
,doosan_ups_rozdil(orderid)

,doosan_cena_br_item(a.*)
,doosan_cena_br_radek(a.*)
,doosan_cena_br_obj(orderid)
,doosan_count_br_obj(orderid)
,doosan_vaha_br_obj(orderid)

,doosan_cena_om_item(a.*)
,doosan_cena_om_radek(a.*)
,doosan_cena_om_obj(orderid)
,doosan_count_om_obj(orderid)
,doosan_vaha_om_obj(orderid)

,doosan_cena_ser_item(a.*)
,doosan_cena_ser_radek(a.*)
,doosan_cena_ser_obj(orderid)
,doosan_count_ser_obj(orderid)
,doosan_vaha_ser_obj(orderid)

,doosan_is_om(a.*)as is_om
,doosan_is_broz(a.*) as is_br

,doosan_ups_sluzba(a.*)
,doosan_zona(a.*)

,pages
,shipping_method
,item_price
,item_quantity
,item_price/item_quantity::float 


from doosan_exports a 
where poslanodovyroby is not null and item_quantity > 0 

--and orderid like '%4833%'
--where not orderid like '%1803%'
limit 1000
	) 
	select * from t limit 100 

