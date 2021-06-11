/* Updated my Information in the students database */

UPDATE students
	SET
		country = 'India',
		age = 26
	WHERE
		name= 'saidev'

/* Selecting students based on criteria */
SELECT * FROM students WHERE country= 'Germany'
SELECT * FROM students WHERE country= 'Thailand' OR country = 'Brazil'
SELECT * FROM students WHERE name LIKE'Tom%' 
SELECT name FROM students WHERE age > 23
SELECT * FROM students WHERE age > 23 AND age < 30
SELECT * FROM students ORDER BY age ASC
SELECT name FROM students WHERE age > 25

/* Delete  below 18 */

DELETE FROM students WHERE age < 18