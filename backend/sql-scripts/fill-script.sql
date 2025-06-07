
-- Insert data into buildings
INSERT INTO buildings (name, address)
VALUES 
    ('Tech Tower', '123 Innovation St'),
    ('Data Hub', '456 Database Rd'),
    ('Cloud Center', '789 Cloud Ave'),
    ('Main Plaza', '101 Main St'),
    ('Research Lab', '202 Science Rd'),
    ('City Hall', '303 Civic St'),
    ('Tech Startup HQ', '404 Startup Ln'),
    ('Health Center', '505 Wellness Rd');

-- Insert data into offices
INSERT INTO offices (building_id, name, floor, capacity)
VALUES 
    (1, 'IT Department', 2, 50),
    (2, 'Database Lab', 3, 30),
    (3, 'AI Research', 1, 25),
    (4, 'Executive Suite', 10, 5),
    (5, 'Conference Room', 2, 15),
    (6, 'Public Office', 1, 100),
    (7, 'Startup Incubator', 1, 40),
    (8, 'Health Administration', 3, 20);

-- Insert data into sensors
INSERT INTO sensors (office_id, type, model, serial_number, installed_at)
VALUES 
    (1, 'temperature', 'TempSensorX', 'SN1001', '2024-01-01 10:02:00'),
    (2, 'oxygen', 'OxySensorY', 'SN1002', '2024-01-02 11:15:00'),
    (3, 'noise', 'NoiseSensorZ', 'SN1003', '2024-01-03 09:30:00'),
    (4, 'light', 'LightSensorA', 'SN1004', '2024-01-04 14:45:00'),
    (5, 'motion', 'MotionSensorB', 'SN1005', '2024-01-05 16:20:00'),
    (6, 'temperature', 'TempSensorC', 'SN1006', '2024-01-06 08:50:00'),
    (7, 'oxygen', 'OxySensorD', 'SN1007', '2024-01-07 13:10:00'),
    (8, 'noise', 'NoiseSensorE', 'SN1008', '2024-01-08 15:55:00');
    ON CONFLICT (serial_number) DO NOTHING;

-- Insert data into measurements
INSERT INTO measurements (sensor_id, timestamp, value, unit)
VALUES 
    (1, '2024-01-01 08:00:00', 22.5, '°C'),
    (2, '2024-01-01 09:00:00', 19.8, '%'),
    (3, '2024-01-01 10:00:00', 35.7, 'dB'),
    (4, '2024-01-01 11:00:00', 150.5, 'lux'),
    (5, '2024-01-01 12:00:00', 1.0, 'boolean'),
    (6, '2024-01-01 13:00:00', 21.3, '°C'),
    (7, '2024-01-01 14:00:00', 20.5, '%'),
    (8, '2024-01-01 15:00:00', 37.2, 'dB');

-- Insert data into users
INSERT INTO users (username, email, password, role)
VALUES 
    ('admin1', 'admin1@example.com', 'pass123', 'admin'),
    ('user1', 'user1@example.com', 'pass123', 'user'),
    ('user2', 'user2@example.com', 'pass123', 'user'),
    ('techlead', 'techlead@example.com', 'pass123', 'admin'),
    ('analyst', 'analyst@example.com', 'pass123', 'user'),
    ('researcher1', 'researcher1@example.com', 'pass123', 'user'),
    ('developer1', 'developer1@example.com', 'pass123', 'user'),
    ('admin2', 'admin2@example.com', 'pass123', 'admin');

-- Insert data into administrators
INSERT INTO administrators (user_id, privileges)
VALUES 
    (1, 'Full Access'),
    (4, 'Manage Users'),
    (8, 'Manage Systems');


INSERT INTO logs (user_id, action, description, created_at)
VALUES
    (1, 'DELETE_USER', 'User with ID 2 was deleted by Admin ID 1.', NOW()),
    (1, 'CREATE_SENSOR', 'Sensor SN1001 created in office ID 1.', NOW()),
    (2, 'ACCESS_DENIED', 'User with ID 2 attempted to access admin panel.', NOW()),
    (3, 'UPDATE_MEASUREMENT', 'Measurement ID 5 updated by User ID 3.', NOW()),
    (1, 'DELETE_OFFICE', 'Office ID 3 deleted by Admin ID 1.', NOW());
    
--    INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
-- VALUES
--     (1, 'http://example.com/notify1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (2, 'http://example.com/notify2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (3, 'http://example.com/notify3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (4, 'http://example.com/notify4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (5, 'http://example.com/notify5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)



DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE sensor_id = 1 AND callback_url = 'http://example.com/notify1'
    ) THEN
        INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
        VALUES (1, 'http://example.com/notify1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE sensor_id = 2 AND callback_url = 'http://example.com/notify2'
    ) THEN
        INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
        VALUES (2, 'http://example.com/notify2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE sensor_id = 3 AND callback_url = 'http://example.com/notify3'
    ) THEN
        INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
        VALUES (3, 'http://example.com/notify3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE sensor_id = 4 AND callback_url = 'http://example.com/notify4'
    ) THEN
        INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
        VALUES (4, 'http://example.com/notify4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM subscriptions
        WHERE sensor_id = 5 AND callback_url = 'http://example.com/notify5'
    ) THEN
        INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
        VALUES (5, 'http://example.com/notify5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;
END $$;



--


-- -- Insert data into the building table
-- INSERT INTO building (name, address)
-- VALUES 
--     ('Amazon Headquarters', '123 Main St, Cityville'),
--     ('PrivatBank Central', '456 Side Rd, Townsville'),
--     ('Avrora Shopping Mall', '789 High St, Villagetown'),
--     ('SoccerGirls Sports Club', '1010 Elm St, Metropolis'),
--     ('Tech Hub Tower', '2020 Maple St, Smallville'),
--     ('Startup Haven', '3030 Oak St, Gotham'),
--     ('Elite Business Center', '4040 Pine St, Star City'),
--     ('Crystal Palace Hotel', '5050 Cedar St, Central City'),
--     ('Greenfield University', '6060 Birch St, Coast City'),
--     ('Aurora Luxury Apartments', '7070 Willow St, Keystone City')
-- ON CONFLICT DO NOTHING;

-- -- Insert data into the office table
-- INSERT INTO office (building_id, name, floor, capacity)
-- VALUES 
--     (1, 'Innovation Lab', 1, 15),
--     (1, 'Think Tank', 2, 20),
--     (2, 'Money Matters', 1, 10),
--     (2, 'Executive Lounge', 3, 12),
--     (3, 'Fashion Hub', 2, 25),
--     (3, 'Retail Gurus', 4, 18),
--     (4, 'Sports Analytics', 3, 20),
--     (5, 'Coders Paradise', 5, 22),
--     (6, 'Startup Pod', 6, 30),
--     (7, 'Top Floor Visionaries', 7, 12)
-- ON CONFLICT DO NOTHING;

-- -- Insert data into the sensor table
-- INSERT INTO sensor (office_id, type, model, serial_number, installed_at)
-- VALUES 
--     (1, 'temperature', 'TempMaster2000', 'SN001', '2024-01-01'),
--     (1, 'oxygen', 'OxySenseX1', 'SN002', '2024-01-02'),
--     (2, 'noise', 'NoiseTrackerZ', 'SN003', '2024-01-03'),
--     (3, 'light', 'LightProLX', 'SN004', '2024-01-04'),
--     (4, 'motion', 'MotionEyeAdvanced', 'SN005', '2024-01-05')
-- ON CONFLICT DO NOTHING;

-- -- Insert data into the measurement table
-- INSERT INTO measurement (sensor_id, timestamp, value, unit)
-- VALUES 
--     (1, '2024-12-01 08:00:00', 22.5, '°C'),       -- Temperature
--     (1, '2024-12-01 12:00:00', 23.1, '°C'),       -- Temperature
--     (2, '2024-12-01 09:00:00', 19.8, '%'),        -- Oxygen level
--     (2, '2024-12-01 14:00:00', 20.2, '%'),        -- Oxygen level
--     (3, '2024-12-01 10:00:00', 35.7, 'dB'),       -- Noise level
--     (3, '2024-12-01 15:00:00', 45.2, 'dB'),       -- Noise level
--     (4, '2024-12-01 11:00:00', 150.5, 'lux'),     -- Light intensity
--     (4, '2024-12-01 16:00:00', 200.3, 'lux'),     -- Light intensity
--     (5, '2024-12-01 12:00:00', 1.0, 'boolean'),   -- Motion detected
--     (5, '2024-12-01 17:00:00', 0.0, 'boolean')    -- No motion detected
-- ON CONFLICT DO NOTHING;

-- INSERT INTO subscriptions (sensor_id, callback_url, createdAt, updatedAt)
-- VALUES
--     (1, 'http://environmentalmonitors.com/motion-alert', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (2, 'http://climatesensors.com/temperature-tracker', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (3, 'http://healthsensors.com/oxygen-monitor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (4, 'http://noisesensors.com/noise-level-check', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
--     (5, 'http://lightsensors.com/light-intensity-watch', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

