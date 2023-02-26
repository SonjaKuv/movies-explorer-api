const { celebrate, Joi, Segments } = require('celebrate');
const linkRegExp = require('../utils/constants');

const signInValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const userValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

const createMovieValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(RegExp(linkRegExp)),
    trailerLink: Joi.string().required().pattern(RegExp(linkRegExp)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(RegExp(linkRegExp)),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  userValidation,
  createMovieValidation,
  deleteMovieValidation,
};
