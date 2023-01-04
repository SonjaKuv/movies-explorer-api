const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErorrs');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoIndex: true,
})
  .then(() => console.log('connected to db'))
  .catch((err) => console.log('error', err));
app.listen(PORT, () => {
  console.log('server has been started');
});
