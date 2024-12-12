
DROP TABLE IF EXISTS measurements CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS buildings CASCADE;





ALTER TABLE offices
    ADD CONSTRAINT fk_offices_building_id FOREIGN KEY (building_id) REFERENCES buildings (id);



-- INSERT INTO buildings (name, address)
-- VALUES
--     ('Business Center A', '123 Main St'),
--     ('Tech Park B', '456 Technology Ave'),
--     ('Avrora Ukraine', 'Street of Shevchenko, 121b '),
--     ('Bank PrivatBank', 'New York Street, 228');
--
--
--
--
-- INSERT INTO offices (building_id, name, floor)
-- VALUES
--     (1, 'HR Department', 2),
--     (1, 'IT Department', 3),
--     (2, 'Marketing', 1),
--     (2, 'Development', 2);
--
--
-- INSERT INTO sensors (office_id, type, location)
-- VALUES
--     (1, 'Light', 'Near Window'),
--     (1, 'Noise', 'Center Room'),
--     (2, 'Oxygen', 'Corner A'),
--     (3, 'Light', 'Entrance'),
--     (4, 'Noise', 'Conference Room');
--
--
-- INSERT INTO measurements (sensor_id, measurement_date, measurement_time, light_level, noise_level, oxygen_level)
-- VALUES
--     (1, '2024-11-30', '09:00:00', 500.5, NULL, NULL),
--     (2, '2024-11-30', '09:05:00', NULL, 35.2, NULL),
--     (3, '2024-11-30', '09:10:00', NULL, NULL, 21.0),
--     (4, '2024-11-30', '09:15:00', 450.8, NULL, NULL),
--     (5, '2024-11-30', '09:20:00', NULL, 50.0, NULL);

INSERT INTO buildings (name, address, number_of_floors, location)
VALUES
    ('Business Center A', '123 Main St', 5, 'City Center'),
    ('Tech Park B', '456 Technology Ave', 8, 'Tech District'),
    ('Avrora Ukraine', 'Street of Shevchenko, 121b', 3, 'Kyiv'),
    ('Bank PrivatBank', 'New York Street, 228', 6, 'Financial Area');

INSERT INTO offices (building_id, name, floor)
VALUES
    (1, 'HR Department', 2),
    (1, 'IT Department', 3),
    (2, 'Marketing', 1),
    (2, 'Development', 2);

INSERT INTO sensors (office_id, type, location)
VALUES
    (1, 'Light', 'Near Window'),
    (1, 'Noise', 'Center Room'),
    (2, 'Oxygen', 'Corner A'),
    (3, 'Light', 'Entrance'),
    (4, 'Noise', 'Conference Room');

INSERT INTO measurements (sensor_id, measurement_date, measurement_time, light_level, noise_level, oxygen_level)
VALUES
    (1, '2024-11-30', '09:00:00', 500.5, 0.0, 0.0),
    (2, '2024-11-30', '09:05:00', 0.0, 35.2, 0.0),
    (3, '2024-11-30', '09:10:00', 0.0, 0.0, 21.0),
    (4, '2024-11-30', '09:15:00', 450.8, 0.0, 0.0),
    (5, '2024-11-30', '09:20:00', 0.0, 50.0, 0.0);
