const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
const usersRouters = require('./users'); // импортируем модуль роутеров пользователей
const usersCards = require('./cards'); // импортируем модуль роутеров карточек

router.use('/users', usersRouters); // подключаем обработку роутеров пользователей
router.use('/cards', usersCards); // подключаем обработку роутеров карточек

module.exports = router;

