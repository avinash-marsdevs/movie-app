const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    posterUrl: { type: String, required: true },
    publishYear: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
