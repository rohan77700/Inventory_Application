-- Drop existing tables if they exist
DROP TABLE IF EXISTS song;
DROP TABLE IF EXISTS album;
DROP TABLE IF EXISTS artist;

-- Create artist table
CREATE TABLE artist (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT
);

-- Create album table
CREATE TABLE album (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    release_year INTEGER,
    artist_id INTEGER REFERENCES artist(id) ON DELETE CASCADE
);

-- Create song table
CREATE TABLE song (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    duration TEXT,
    album_id INTEGER REFERENCES album(id) ON DELETE CASCADE
);