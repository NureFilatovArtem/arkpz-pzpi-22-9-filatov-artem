-- Define ENUM for Sensor Types
CREATE TYPE sensor_type AS ENUM (
    'temperature',
    'oxygen',
    'noise',
    'light',
    'motion'
);

-- Define ENUM for Measurement Units
CREATE TYPE measurement_unit AS ENUM (
    '°C',     -- Temperature
    'dB',     -- Noise level
    'lux',    -- Light intensity
    '%',      -- Oxygen level in percentage
    'boolean' -- Motion detection
);


--creating building table

CREATE TABLE building (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER set_updated_at_building
BEFORE UPDATE ON building
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


--office table

CREATE TABLE office (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES building(id) ON DELETE CASCADE
);

CREATE TRIGGER set_updated_at_office
BEFORE UPDATE ON office
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE sensor (
    id SERIAL PRIMARY KEY,
    office_id INT NOT NULL,
    type sensor_type NOT NULL,
    model VARCHAR(255),
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    installed_at DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (office_id) REFERENCES office(id) ON DELETE CASCADE
);

CREATE TRIGGER set_updated_at_sensor
BEFORE UPDATE ON sensor
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE measurement (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value DECIMAL(10, 2) NOT NULL,
    unit measurement_unit NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensor(id) ON DELETE CASCADE
);

CREATE TRIGGER set_updated_at_measurement
BEFORE UPDATE ON measurement
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

