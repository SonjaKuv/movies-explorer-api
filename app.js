require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErorrs');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const MONGODB_ADDRESS = require('./utils/constants');

const { NODE_ENV, DB_ADDRESS, PORT = 3000 } = process.env;
const app = express();

const options = {
  origin: [
    'http://localhost:3000',
    'http://sonja-diplom.nomoredomains.club',
    'https://sonja-diplom.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use(helmet());
app.use('*', cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : MONGODB_ADDRESS, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
})
  .then(() => console.log('connected to db'))
  .catch((err) => console.log('error', err));
app.listen(PORT, () => {
  console.log('server has been started');
});
