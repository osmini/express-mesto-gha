const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами

// импорт всех контролеров для работы с пользователями
const {getUsers, getUsersById, getInfoMe, updatetUsers, updatetAvatar} = require('../controllers/users');

// обработка запроса получения всех пользователей из файла
router.get('/users', getUsers);

// обработка запроса получения инфы о себе
router.get('/users/me', getInfoMe);

// обработка запроса обновления данных пользователя
router.patch('/users/me', updatetUsers);

// обработка запроса обновления аватара пользователя
router.patch('/users/me/avatar', updatetAvatar);

// обработка запроса получения одного пользователя по id
router.get('/users/:userId', getUsersById);

// экспортируем модуль
module.exports = router;