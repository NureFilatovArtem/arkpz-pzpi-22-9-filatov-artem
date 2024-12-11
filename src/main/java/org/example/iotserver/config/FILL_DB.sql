
DROP TABLE IF EXISTS measurements CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS buildings CASCADE;


ALTER TABLE building ALTER COLUMN number_of_floors SET DEFAULT 0;
UPDATE building SET number_of_floors = 0 WHERE number_of_floors IS NULL;

ALTER TABLE building ADD COLUMN number_of_floors INT DEFAULT 0;
CREATE TABLE buildings (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           address TEXT NOT NULL
);


CREATE TABLE offices (
                         id SERIAL PRIMARY KEY,
                         building_id INT NOT NULL,
                         name VARCHAR(100) NOT NULL,
                         floor INT NOT NULL,
                         FOREIGN KEY (building_id) REFERENCES buildings (id) ON DELETE CASCADE
);


CREATE TABLE sensors (
                         id SERIAL PRIMARY KEY,
                         office_id INT NOT NULL,
                         type VARCHAR(50) NOT NULL,
                         location VARCHAR(100) NOT NULL,
                         FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE
);


CREATE TABLE measurements (
                              id SERIAL PRIMARY KEY,
                              sensor_id INT NOT NULL,
                              measurement_date DATE NOT NULL,
                              measurement_time TIME NOT NULL,
                              light_level NUMERIC(10, 2),
                              noise_level NUMERIC(10, 2),
                              oxygen_level NUMERIC(10, 2),
                              FOREIGN KEY (sensor_id) REFERENCES sensors (id) ON DELETE CASCADE
);


INSERT INTO building (name, address)
VALUES
    ('Business Center A', '123 Main St'),
    ('Tech Park B', '456 Technology Ave');


INSERT INTO office (building_id, name, floor)
VALUES
    (1, 'HR Department', 2),
    (1, 'IT Department', 3),
    (2, 'Marketing', 1),
    (2, 'Development', 2);


INSERT INTO sensor (office_id, type, location)
VALUES
    (1, 'Light', 'Near Window'),
    (1, 'Noise', 'Center Room'),
    (2, 'Oxygen', 'Corner A'),
    (3, 'Light', 'Entrance'),
    (4, 'Noise', 'Conference Room');


INSERT INTO measurement (sensor_id, measurement_date, measurement_time, light_level, noise_level, oxygen_level)
VALUES
    (1, '2024-11-30', '09:00:00', 500.5, NULL, NULL),
    (2, '2024-11-30', '09:05:00', NULL, 35.2, NULL),
    (3, '2024-11-30', '09:10:00', NULL, NULL, 21.0),
    (4, '2024-11-30', '09:15:00', 450.8, NULL, NULL),
    (5, '2024-11-30', '09:20:00', NULL, 50.0, NULL);