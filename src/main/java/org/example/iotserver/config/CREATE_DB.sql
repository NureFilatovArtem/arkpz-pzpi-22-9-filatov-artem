



-- DROP TABLE IF EXISTS buildings CASCADE;
--
-- DROP TABLE IF EXISTS buildings CASCADE;
-- CREATE TABLE buildings (
--                            id SERIAL PRIMARY KEY,
--                            name VARCHAR(100) NOT NULL,
--                            address TEXT NOT NULL,
--                            number_of_floors INT DEFAULT 0
-- );
--
-- DROP TABLE IF EXISTS offices CASCADE;
-- CREATE TABLE offices (
--                          id SERIAL PRIMARY KEY,
--                          building_id INT NOT NULL,
--                          name VARCHAR(100) NOT NULL,
--                          floor INT NOT NULL,
--                          FOREIGN KEY (building_id) REFERENCES buildings (id) ON DELETE CASCADE
-- );
--
-- DROP TABLE IF EXISTS sensors CASCADE;
-- CREATE TABLE sensors (
--                          id SERIAL PRIMARY KEY,
--                          office_id INT NOT NULL,
--                          type VARCHAR(50) NOT NULL,
--                          location VARCHAR(100) NOT NULL,
--                          FOREIGN KEY (office_id) REFERENCES offices (id) ON DELETE CASCADE
-- );
--
-- DROP TABLE IF EXISTS measurements CASCADE;
-- CREATE TABLE measurements (
--                               id SERIAL PRIMARY KEY,
--                               sensor_id INT NOT NULL,
--                               measurement_date DATE NOT NULL,
--                               measurement_time TIME NOT NULL,
--                               light_level NUMERIC(10, 2),
--                               noise_level NUMERIC(10, 2),
--                               oxygen_level NUMERIC(10, 2),
--                               FOREIGN KEY (sensor_id) REFERENCES sensors (id) ON DELETE CASCADE
-- );

CREATE TABLE buildings (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           address TEXT NOT NULL,
                           number_of_floors INT DEFAULT 1 NOT NULL,
                           location VARCHAR(255) DEFAULT 'Default Location' NOT NULL
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
                              light_level NUMERIC(10, 2) DEFAULT 0 NOT NULL,
                              noise_level NUMERIC(10, 2) DEFAULT 0 NOT NULL,
                              oxygen_level NUMERIC(10, 2) DEFAULT 0 NOT NULL,
                              FOREIGN KEY (sensor_id) REFERENCES sensors (id) ON DELETE CASCADE
);
