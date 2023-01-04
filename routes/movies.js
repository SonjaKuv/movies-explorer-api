const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const linkRegExp = require('../utils/constants');

router.use(auth);

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailer: Joi.string().required().pattern(linkRegExp),
    nameRU: Joi.number().required(),
    nameEN: Joi.number().required(),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/movies/:movieId', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
