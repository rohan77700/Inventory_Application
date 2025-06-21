const db = require('../models/db');

// List all albums with their artist names
exports.list = async (req, res) => {
    const result = await db.query(`
        SELECT album.*, artist.name AS artist_name 
        FROM album 
        JOIN artist ON album.artist_id = artist.id
    `);
    res.render('albums/list', { albums: result.rows });
};

// Show details for one album (including artist and songs)
exports.detail = async (req, res) => {
    const albumResult = await db.query(`
        SELECT album.*, artist.name AS artist_name 
        FROM album 
        JOIN artist ON album.artist_id = artist.id 
        WHERE album.id = $1
    `, [req.params.id]);

    if (albumResult.rows.length === 0) {
        return res.status(404).send('Album not found');
    }

    const album = albumResult.rows[0];

    const songsResult = await db.query(`
        SELECT * FROM song 
        WHERE album_id = $1
    `, [req.params.id]);

    res.render('albums/detail', {
        album: album,
        artist: { name: album.artist_name },
        songs: songsResult.rows
    });
};

// Show form to create new album
exports.createForm = async (req, res) => {
    const artists = await db.query('SELECT * FROM artist');
    res.render('albums/form', {
        album: {},
        artists: artists.rows,
        action: 'Create'
    });
};

// Create new album
exports.create = async (req, res) => {
    await db.query(`
        INSERT INTO album (title, release_year, artist_id) 
        VALUES ($1, $2, $3)
    `, [req.body.title, req.body.release_year, req.body.artist_id]);

    res.redirect('/albums');
};

// Show form to edit existing album
exports.editForm = async (req, res) => {
    const albumResult = await db.query('SELECT * FROM album WHERE id = $1', [req.params.id]);
    const artists = await db.query('SELECT * FROM artist');

    if (albumResult.rows.length === 0) {
        return res.status(404).send('Album not found');
    }

    res.render('albums/form', {
        album: albumResult.rows[0],
        artists: artists.rows,
        action: 'Edit'
    });
};

// Update existing album
exports.update = async (req, res) => {
    await db.query(`
        UPDATE album 
        SET title = $1, release_year = $2, artist_id = $3 
        WHERE id = $4
    `, [req.body.title, req.body.release_year, req.body.artist_id, req.params.id]);

    res.redirect('/albums');
};

// Delete album
exports.delete = async (req, res) => {
    await db.query('DELETE FROM album WHERE id = $1', [req.params.id]);
    res.redirect('/albums');
};