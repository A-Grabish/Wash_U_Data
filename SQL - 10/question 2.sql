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