const db = require('../models/db');

exports.list = async (req, res) => {
    const result = await db.query('SELECT * FROM artist');
    res.render('artists/list', { artists: result.rows });
};

exports.detail = async (req, res) => {
    const artist = await db.query('SELECT * FROM artist WHERE id = $1', [req.params.id]);
    const albums = await db.query('SELECT * FROM album WHERE artist_id = $1', [req.params.id]);
    res.render('artists/detail', { artist: artist.rows[0], albums: albums.rows });
};

exports.createForm = (req, res) => res.render('artists/form', { artist: {}, action: 'Create' });

exports.create = async (req, res) => {
    await db.query('INSERT INTO artist (name, genre) VALUES ($1, $2)', [req.body.name, req.body.genre]);
    res.redirect('/artists');
};

exports.editForm = async (req, res) => {
    const result = await db.query('SELECT * FROM artist WHERE id = $1', [req.params.id]);
    res.render('artists/form', { artist: result.rows[0], action: 'Edit' });
};

exports.update = async (req, res) => {
    await db.query('UPDATE artist SET name=$1, genre=$2 WHERE id=$3', [req.body.name, req.body.genre, req.params.id]);
    res.redirect('/artists');
};

exports.delete = async (req, res) => {
    await db.query('DELETE FROM artist WHERE id=$1', [req.params.id]);
    res.redirect('/artists');
};