require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const DefaultErrorHandler = require('./middlewares/DefaultErrorHandler')

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {});

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'))

app.use(errorLogger);

app.use(errors());

app.use(DefaultErrorHandler)

app.listen(PORT);
