DROP TABLE IF EXISTS administrators CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS measurements CASCADE;
DROP TABLE IF EXISTS sensors CASCADE;
DROP TABLE IF EXISTS offices CASCADE;
DROP TABLE IF EXISTS buildings CASCADE;
DROP TABLE IF EXISTS logs CASCADE;

DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS sensor_type CASCADE;
DROP TYPE IF EXISTS measurement_unit CASCADE;

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE sensor_type AS ENUM ('temperature', 'oxygen', 'noise', 'light', 'motion');
CREATE TYPE measurement_unit AS ENUM ('°C', 'dB', 'lux', '%', 'boolean');

-- Create buildings
CREATE TABLE IF NOT EXISTS buildings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL
);

-- Create offices
CREATE TABLE IF NOT EXISTS offices (
    id SERIAL PRIMARY KEY,
    building_id INT REFERENCES buildings(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL
);

-- Create sensors table
CREATE TABLE IF NOT EXISTS sensors (
    id SERIAL PRIMARY KEY,
    office_id INT REFERENCES offices(id) ON DELETE CASCADE,
    type sensor_type NOT NULL,
    model VARCHAR(255),
    serial_number VARCHAR(255) UNIQUE NOT NULL,
    installed_at DATE -- Добавляем эту колонку
);

-- Create measurements
CREATE TABLE IF NOT EXISTS measurements (
    id SERIAL PRIMARY KEY,
    sensor_id INT REFERENCES sensors(id) ON DELETE CASCADE,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    value DECIMAL(10, 2) NOT NULL,
    unit measurement_unit NOT NULL
);

-- Create users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'user' NOT NULL
);

-- Create administrators
CREATE TABLE IF NOT EXISTS administrators (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    privileges TEXT
);

CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);