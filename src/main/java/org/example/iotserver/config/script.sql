SELECT * FROM building;


SELECT building_id, name, floor, COUNT(*)
FROM office
GROUP BY building_id, name, floor
HAVING COUNT(*) > 1;


SELECT * FROM building;
SELECT * FROM office;
SELECT * FROM sensor;
SELECT * FROM measurement;