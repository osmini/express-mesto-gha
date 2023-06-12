const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
// импорт всех контролеров для работы с пользователями
const {getUsers, getUsersById, createUsers, updatetUsers, updatetAvatar, deleteUsers} = require('../controllers/users');

// обработка запроса полуяения всех пользователей из файла
router.get('/', getUsers);

// обработка запроса получения одного пользователя по id
router.get('/:userId', getUsersById);

// обработка запроса добавление пользователя
router.post('/', createUsers);

// обработка запроса обновления данных пользователя
router.patch('/me', updatetUsers);

// обработка запроса обновления аватара пользователя
router.patch('/me/avatar', updatetAvatar);

// экспортируем модуль
module.exports = router;

