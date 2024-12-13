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
    ('Aurora Luxury Apartments', '7070 Willow St, Keystone City');

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
    (7, 'Top Floor Visionaries', 7, 12);

-- -- Insert data into the sensor table
-- INSERT INTO sensor (office_id, type, model, serial_number, installed_at)
-- VALUES 
--     (1, 'temperature', 'TempMaster2000', 'SN001', '2024-01-01'),
--     (1, 'oxygen', 'OxySenseX1', 'SN002', '2024-01-02'),
--     (2, 'light', 'LightProLX', 'SN003', '2024-01-03'),
--     (2, 'noise', 'NoiseTrackZ', 'SN004', '2024-01-04'),
--     (3, 'motion', 'MotionEye100', 'SN005', '2024-01-05'),
--     (4, 'temperature', 'TempMaster3000', 'SN006', '2024-02-01'),
--     (5, 'oxygen', 'OxySenseY2', 'SN007', '2024-02-02'),
--     (6, 'light', 'LightProLZ', 'SN008', '2024-02-03'),
--     (7, 'noise', 'NoiseTrackerElite', 'SN009', '2024-02-04'),
--     (7, 'motion', 'MotionEyeAdvanced', 'SN010', '2024-02-05');

-- Insert data into the measurement table
-- INSERT INTO measurement (sensor_id, timestamp, value, unit)
-- VALUES 
--     (1, '2024-12-01 08:00:00', 22.5, '°C'),
--     (1, '2024-12-01 12:00:00', 23.1, '°C'),
--     (2, '2024-12-01 09:00:00', 19.8, '%'),
--     (2, '2024-12-01 14:00:00', 20.2, '%'),
--     (3, '2024-12-01 10:00:00', 150.5, 'lux'),
--     (3, '2024-12-01 15:00:00', 200.3, 'lux'),
--     (4, '2024-12-01 11:00:00', 35.7, 'dB'),
--     (4, '2024-12-01 16:00:00', 45.2, 'dB'),
--     (5, '2024-12-01 12:00:00', 1.0, 'boolean'),
--     (5, '2024-12-01 17:00:00', 0.0, 'boolean');


    INSERT INTO sensor (office_id, type, model, serial_number, installed_at)
VALUES 
    (1, 'temperature', 'TempMaster2000', 'SN001', '2024-01-01'),
    (1, 'oxygen', 'OxySenseX1', 'SN002', '2024-01-02'),
    (2, 'noise', 'NoiseTrackerZ', 'SN003', '2024-01-03'),
    (3, 'light', 'LightProLX', 'SN004', '2024-01-04'),
    (4, 'motion', 'MotionEyeAdvanced', 'SN005', '2024-01-05');

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
    (5, '2024-12-01 17:00:00', 0.0, 'boolean');   -- No motion detected
