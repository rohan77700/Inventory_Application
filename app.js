require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const artistRoutes = require('./routes/artists');
const albumRoutes = require('./routes/albums');
const songRoutes = require('./routes/songs');

app.use('/artists', artistRoutes);
app.use('/albums', albumRoutes);
app.use('/songs', songRoutes);

app.get('/', (req, res) => res.redirect('/artists'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));