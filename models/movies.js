const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    validate: {
      validator: (link) => isUrl(link),
      message: 'Неправильный формат ссылки на постер',
    },
  },
  trailerLink: {
    type: String,
    required: false,
    validate: {
      validator: (link) => isUrl(link),
      message: 'Неправильный формат ссылки на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: false,
    validate: {
      validator: (link) => isUrl(link),
      message: 'Неправильный формат ссылки на миниатюру',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
