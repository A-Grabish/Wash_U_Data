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
SET first_name = "GROUCHO"
WHERE first_name = "HARPO" AND actor_id >= 0;

