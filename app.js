// 648476afc6258b5f9eee415e тестовый пользователь
const express = require('express'); // импортируем библиотеку express
const bodyParser = require('body-parser'); // импортируем парсер json
const routes = require('./routes/index'); // импортируем модуль всех роутеров приложения
const mongoose = require('mongoose');  //подключаем mongoose

const {PORT = 3000} = process.env // вынесли порт по умолчанию в переменную окружения проекта

// подключение к БД
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
})
.then(() => {
  console.log('connected to db');
});

const app = express(); // создаем приложение

// важно писать запуск middleware в определенной очередности запросов
app.use(bodyParser.json()); // подключаем обработку json всех запросах к серверу

app.use((req, res, next) => {
  req.user = {
    _id: '648476afc6258b5f9eee415e' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// обработка запроса по адресу "/" методом get
app.get('/', (req, res) => {
  res.status(200);
  res.send('hello world2');
});

app.use(routes); // подключаем обработку всех роутеров

// запускаем сервер на порту 3000, с этого порта слушаем все входящие запросы
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

