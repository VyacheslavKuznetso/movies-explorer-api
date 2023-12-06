const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { NODE_ENV, PORT, DB_URL } = process.env;
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./express-rate-limit/limiter');

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:3000/bitfilmsdb');

const app = express();
app.use(helmet());
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter); // подключаем rate-limiter //
app.use(requestLogger); // // подключаем логгер запросов до роутов //

app.use(router); // подключаем роутеры //

app.use(errorLogger); // подключаем логгер ошибок после обработчиков роутов и до обработчиков ошибок

// Обработчик валидации celebrate
app.use(errors());

app.use((err, req, res, next) => {
  const { status = 500, message } = err; // если у ошибки нет статуса, выставляем 500 //
  res
    .status(status)
    .send({ // проверяем статус и выставляем сообщение в зависимости от него //
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next(err);
});

app.listen(PORT, () => {
  console.log(`listen ${PORT}`);
});
