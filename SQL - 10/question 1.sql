USE sakila;

#1a
select first_name, last_name from actor;

#1b
select CONCAT_WS(" ", UPPER(first_name), UPPER(last_name)) as `Actor Name`
from actor;