USE sakila;

#1a
select first_name, last_name from actor;

#1b
select CONCAT_WS(" ", UPPER(first_name), UPPER(last_name)) as `Actor Name`
from actor;


#2a
select actor_id, first_name, last_name FROM actor
WHERE first_name = "JOE";

#2b
select actor_id, first_name, last_name FROM actor
WHERE last_name LIKE "%GEN%";

#2c
select actor_id, first_name, last_name FROM actor
WHERE last_name LIKE "%LI%"
ORDER BY last_name, first_name;

#2d
select country_id, country FROM country
WHERE  country IN ("Afghanistan", "Bangladesh", "China");


#3a
ALTER TABLE actor
ADD description BLOB;

#3b
ALTER TABLE actor
DROP description;


#4a
select last_name, COUNT(first_name)
FROM actor
GROUP BY last_name;

#4b
select last_name, COUNT(first_name)
FROM actor
GROUP BY last_name
HAVING COUNT(first_name) >=3;

#4c
UPDATE actor
SET first_name = "HARPO"
WHERE first_name = "GROUCHO" AND last_name = "WILLIAMS";

#4d
UPDATE actor
SET first_name = 'GROUCHO'
WHERE first_name = 'HARPO' AND actor_id >= 0;

#5a
CREATE SCHEMA `sakila`;

#SHOW CREATE TABLE `ADDRESS`;

#TO FIND SCHEMA
#SELECT `table_schema` 
#FROM `information_schema`.`tables` 
#WHERE `table_name` = 'ADDRESS';

#6a
select first_name, last_name, address
FROM staff
LEFT JOIN address ON staff.address_id = address.address_id;

#6b
select first_name, last_name, SUM(amount)
FROM staff
LEFT JOIN payment ON staff.staff_id = payment.staff_id
WHERE payment_date between '2005-8-1' and '2005-8-30'
GROUP BY first_name;

#6c
select title, COUNT(actor_id) AS `actors in movie`
FROM film
INNER JOIN film_actor ON film.film_id = film_actor.film_id
GROUP BY title;

#6d
select title, COUNT(film.film_id) AS `number of copies`
FROM film
LEFT JOIN inventory ON film.film_id = inventory.film_id
WHERE title = 'hunchback impossible';

#6
