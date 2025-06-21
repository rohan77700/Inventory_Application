const db = require('../models/db');

exports.list = async (req, res) => {
    const result = await db.query(`
        SELECT song.*, album.title AS album_title 
        FROM song 
        JOIN album ON song.album_id = album.id
    `);
    res.render('songs/list', { songs: result.rows });
};

exports.detail = async (req, res) => {
    const song = await db.query('SELECT * FROM song WHERE id = $1', [req.params.id]);
    res.render('songs/detail', { song: song.rows[0] });
};

exports.createForm = async (req, res) => {
    const albums = await db.query('SELECT * FROM album');
    res.render('songs/form', { song: {}, albums: albums.rows, action: 'Create' });
};

exports.create = async (req, res) => {
    await db.query(
        'INSERT INTO song (title, duration, album_id) VALUES ($1, $2, $3)',
        [req.body.title, req.body.duration, req.body.album_id]
    );
    res.redirect('/songs');
};

exports.editForm = async (req, res) => {
    const song = await db.query('SELECT * FROM song WHERE id = $1', [req.params.id]);
    const albums = await db.query('SELECT * FROM album');
    res.render('songs/form', { song: song.rows[0], albums: albums.rows, action: 'Edit' });
};

exports.update = async (req, res) => {
    await db.query(
        'UPDATE song SET title=$1, duration=$2, album_id=$3 WHERE id=$4',
        [req.body.title, req.body.duration, req.body.album_id, req.params.id]
    );
    res.redirect('/songs');
};

exports.delete = async (req, res) => {
    await db.query('DELETE FROM song WHERE id=$1', [req.params.id]);
    res.redirect('/songs');
};