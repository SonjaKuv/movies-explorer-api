const express = require('express');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const wrongPath = require('./wrongPath');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  signInValidation, signUpValidation,
} = require('../middlewares/validation');

const index = express();

index.post('/signin', signInValidation, login);
index.post('/signup', signUpValidation, createUser);

index.use(auth);
index.use(routerUsers);
index.use(routerMovies);
index.use(wrongPath);

module.exports = index;
