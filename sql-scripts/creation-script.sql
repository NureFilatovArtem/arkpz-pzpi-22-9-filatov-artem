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


CREATE TABLE IF NOT EXISTS subscription (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensor(id) ON DELETE CASCADE
);

-- Создаем триггер для автоматического обновления поля updated_at
CREATE TRIGGER set_updated_at_subscription
BEFORE UPDATE ON subscription
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();




-- Insert data into the building table
INSERT INTO building (name, address)
VALUES 
    ('Amazon Headquarters', '123 Main St, Cityville'),
    ('PrivatBank Central', '456 Side Rd, Townsville'),
    ('Avrora Shopping Mall', '789 High St, Villagetown'),
    ('SoccerGirls Sports Club', '1010 Elm St, Metropolis'),
    ('Tech Hub Tower', '2020 Maple St, Smallville'),
    ('Startup Haven', '3030 Oak St, Gotham'),
    ('Elite Business Center', '4040 Pine St, Star City'),
    ('Crystal Palace Hotel', '5050 Cedar St, Central City'),
    ('Greenfield University', '6060 Birch St, Coast City'),
    ('Aurora Luxury Apartments', '7070 Willow St, Keystone City')
ON CONFLICT DO NOTHING;

-- Insert data into the office table
INSERT INTO office (building_id, name, floor, capacity)
VALUES 
    (1, 'Innovation Lab', 1, 15),
    (1, 'Think Tank', 2, 20),
    (2, 'Money Matters', 1, 10),
    (2, 'Executive Lounge', 3, 12),
    (3, 'Fashion Hub', 2, 25),
    (3, 'Retail Gurus', 4, 18),
    (4, 'Sports Analytics', 3, 20),
    (5, 'Coders Paradise', 5, 22),
    (6, 'Startup Pod', 6, 30),
    (7, 'Top Floor Visionaries', 7, 12)
ON CONFLICT DO NOTHING;

-- Insert data into the sensor table
INSERT INTO sensor (office_id, type, model, serial_number, installed_at)
VALUES 
    (1, 'temperature', 'TempMaster2000', 'SN001', '2024-01-01'),
    (1, 'oxygen', 'OxySenseX1', 'SN002', '2024-01-02'),
    (2, 'noise', 'NoiseTrackerZ', 'SN003', '2024-01-03'),
    (3, 'light', 'LightProLX', 'SN004', '2024-01-04'),
    (4, 'motion', 'MotionEyeAdvanced', 'SN005', '2024-01-05')
ON CONFLICT DO NOTHING;

-- Insert data into the measurement table
INSERT INTO measurement (sensor_id, timestamp, value, unit)
VALUES 
    (1, '2024-12-01 08:00:00', 22.5, '°C'),       -- Temperature
    (1, '2024-12-01 12:00:00', 23.1, '°C'),       -- Temperature
    (2, '2024-12-01 09:00:00', 19.8, '%'),        -- Oxygen level
    (2, '2024-12-01 14:00:00', 20.2, '%'),        -- Oxygen level
    (3, '2024-12-01 10:00:00', 35.7, 'dB'),       -- Noise level
    (3, '2024-12-01 15:00:00', 45.2, 'dB'),       -- Noise level
    (4, '2024-12-01 11:00:00', 150.5, 'lux'),     -- Light intensity
    (4, '2024-12-01 16:00:00', 200.3, 'lux'),     -- Light intensity
    (5, '2024-12-01 12:00:00', 1.0, 'boolean'),   -- Motion detected
    (5, '2024-12-01 17:00:00', 0.0, 'boolean')    -- No motion detected
ON CONFLICT DO NOTHING;


DROP IF EXISTS subscription;
-- Create subscription table
CREATE TABLE IF NOT EXISTS subscription (
    id SERIAL PRIMARY KEY,
    sensor_id INT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sensor_id) REFERENCES sensors(id) ON DELETE CASCADE
);

-- Insert data into subscription
INSERT INTO subscription (sensor_id, url, created_at, updated_at)
VALUES
    (1, 'http://example.com/notify1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 'http://example.com/notify2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 'http://example.com/notify3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 'http://example.com/notify4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (5, 'http://example.com/notify5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

