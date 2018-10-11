USE sakila;

#1a
select first_name, last_name from actor;

#1b
select CONCAT_WS(" ", UPPER(first_name), UPPER(last_name)) as `Actor Name`
from actor;

'PENELOPE GUINESS'


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
HAVING COUNT(first_name) >=2;

#4c
UPDATE actor
SET first_name = "HARPO"
WHERE first_name = "GROUCHO" AND last_name = "WILLIAMS";

#4d
UPDATE actor
SET first_name = 'GROUCHO'
WHERE first_name = 'HARPO' AND actor_id >= 0;


#5a
SHOW CREATE TABLE address;


#6a
select first_name, last_name, address
FROM staff
LEFT JOIN address ON staff.address_id = address.address_id;

#6b
select first_name, last_name, SUM(amount)
FROM staff
LEFT JOIN payment ON staff.staff_id = payment.staff_id
WHERE payment_date between '2005-8-1' and '2005-8-31'
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

#6e
select first_name, last_name, SUM(amount) AS `total amount paid`
FROM customer
JOIN payment USING (customer_id)
GROUP BY last_name;


#7a
select title, name as `film language` from film
JOIN language USING (language_id)
WHERE title LIKE 'k%' OR title LIKE 'q%';

#7b
select first_name, last_name FROM actor
WHERE actor_id IN (
	SELECT actor_id FROM film_actor
	WHERE film_id = (
		SELECT film_id FROM film
		WHERE title = 'alone trip'))
ORDER BY last_name;

#7c
select first_name, last_name, email, country.country
FROM (((customer
JOIN address ON customer.address_id = address.address_id)
JOIN city ON address.city_id = city.city_id)
JOIN country ON city.country_id = country.country_id)
WHERE country = 'canada';

#7d
select title, name as `film category`
from ((film
	JOIN film_category ON film.film_id = film_category.film_id)
    JOIN category ON film_category.category_id = category.category_id)
WHERE name = 'family';

#7e
select title, COUNT(rental_id) AS `times rented`
from((rental
JOIN inventory ON rental.inventory_id = inventory.inventory_id)
JOIN film ON inventory.film_id = film.film_id)
GROUP BY title
ORDER BY `times rented` DESC;

#7f
select store.store_id as `store id`, city, sum(amount) AS `store gross revenue`
FROM ((((payment
	JOIN staff ON payment.staff_id = staff.staff_id)
    JOIN store ON staff.store_id = store.store_id)
	JOIN address ON store.address_id = address.address_id)
    JOIN city ON address.city_id = city.city_id)
GROUP BY `store id`;

#7g
select store_id, city, country
FROM (((store
	JOIN address ON store.address_id = address.address_id)
		JOIN city ON address.city_id = city.city_id)
			JOIN country ON city.country_id = country.country_id);
            
#7h
select name AS `film category`, SUM(amount) AS `gross revenue`
FROM ((((category
	JOIN film_category ON category.category_id = film_category.category_id)
		JOIN inventory ON film_category.film_id = inventory.film_id)
			JOIN rental ON inventory.inventory_id = rental.inventory_id)
				JOIN payment ON rental.rental_id = payment.rental_id)
GROUP BY `film category`
ORDER BY `gross revenue` DESC
LIMIT 5;


#8a
CREATE VIEW `top five genres` AS
select name AS `film category`, SUM(amount) AS `gross revenue`
FROM ((((category
	JOIN film_category ON category.category_id = film_category.category_id)
		JOIN inventory ON film_category.film_id = inventory.film_id)
			JOIN rental ON inventory.inventory_id = rental.inventory_id)
				JOIN payment ON rental.rental_id = payment.rental_id)
GROUP BY `film category`
ORDER BY `gross revenue` DESC
LIMIT 5;

#8b
select * FROM `top five genres`;

#8c
DROP VIEW `top five genres`;





#fin
