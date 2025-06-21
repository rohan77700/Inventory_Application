require('dotenv').config();
const db = require('./models/db');

async function seed() {
  try {
    console.log('Clearing tables...');
    await db.query('DELETE FROM song');
    await db.query('DELETE FROM album');
    await db.query('DELETE FROM artist');

    console.log('Seeding artists...');
    const artist1 = await db.query(
      `INSERT INTO artist (name, genre) VALUES ($1, $2) RETURNING id`,
      ['Jennie', 'K-POP, POP']
    );

    const artist2 = await db.query(
      `INSERT INTO artist (name, genre) VALUES ($1, $2) RETURNING id`,
      ['Rosé', 'K-Pop, R&B/Soul']
    );

    console.log('Seeding albums...');
    const album1 = await db.query(
      `INSERT INTO album (title, release_year, artist_id) VALUES ($1, $2, $3) RETURNING id`,
      ['Ruby', 2025, artist1.rows[0].id]
    );

    const album2 = await db.query(
      `INSERT INTO album (title, release_year, artist_id) VALUES ($1, $2, $3) RETURNING id`,
      ['rosie', 2024, artist2.rows[0].id]
    );

    console.log('Seeding songs...');
    await db.query(
      `INSERT INTO song (title, duration, album_id) VALUES 
       ($1, $2, $3),
       ($4, $5, $3)`,
      ['like JENNIE', '2:03', album1.rows[0].id, 'Seoul City', '2:44']
    );

    await db.query(
      `INSERT INTO song (title, duration, album_id) VALUES 
       ($1, $2, $3),
       ($4, $5, $3)`,
      ['number one girl', '3:36', album2.rows[0].id, 'toxic till the end', '2:36']
    );

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    process.exit();
  }
}

seed();