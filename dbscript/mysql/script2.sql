use digitallibrary;
select * from users;
delete from users where id > 0;

select * from products where id = 5 limit 1;
select * from sessions;
select * from products;

select * from orders;
select * from order_details;

delete from orders;
delete from order_details;


create table temp (id int, mydate datetime);

insert into temp values (2, '2017-8-23 9:15');

select * from temp