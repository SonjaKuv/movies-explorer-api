const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

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
