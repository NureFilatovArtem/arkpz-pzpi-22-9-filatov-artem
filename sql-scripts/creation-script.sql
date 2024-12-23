-- Define ENUM for Sensor Types (проверка вручную)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sensor_type') THEN
        CREATE TYPE sensor_type AS ENUM (
            'temperature',
            'oxygen',
            'noise',
            'light',
            'motion'
        );
    END IF;
END $$;

-- Define ENUM for Measurement Units (проверка вручную)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'measurement_unit') THEN
        CREATE TYPE measurement_unit AS ENUM (
            '°C',     -- Temperature
            'dB',     -- Noise level
            'lux',    -- Light intensity
            '%',      -- Oxygen level
            'boolean' -- Motion detection
        );
    END IF;
END $$;


-- Creating building table
CREATE TABLE IF NOT EXISTS building (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER IF NOT EXISTS set_updated_at_building
BEFORE UPDATE ON building
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creating office table
CREATE TABLE IF NOT EXISTS office (
    id SERIAL PRIMARY KEY,
    building_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (building_id) REFERENCES building(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS set_updated_at_office
BEFORE UPDATE ON office
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creating sensor table
CREATE TABLE IF NOT EXISTS sensor (
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

CREATE TRIGGER IF NOT EXISTS set_updated_at_sensor
BEFORE UPDATE ON sensor
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Creating measurement table
CREATE TABLE IF NOT EXISTS measurement (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value DECIMAL(10, 2) NOT NULL,
    unit measurement_unit NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensor(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS set_updated_at_measurement
BEFORE UPDATE ON measurement
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();


CREATE TABLE IF NOT EXISTS subscriptions (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    callback_url VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE
);

-- Create trigger for automatic updated_at column update
CREATE TRIGGER set_updated_at_subscription
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();





