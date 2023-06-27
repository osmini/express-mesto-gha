const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
const usersRouters = require('./users'); // импортируем модуль роутеров пользователей
const usersCards = require('./cards'); // импортируем модуль роутеров карточек
const auth = require('../middlewares/auth'); // мидлевар защиты роутов от тех кто не авторизовался

// импорт всех контролеров для работы с пользователями
const {createUser, login} = require('../controllers/users');

// обработка запроса регистрации нового пользователя
router.post('/signup', createUser);

// обработка запроса авторизации пользователя
router.post('/signin', login);

// роуты ниже этой записи защищены от входа незарегистрированных пользователей
router.use(auth);

router.use('/', usersRouters); // подключаем обработку роутеров пользователей
router.use('/cards', usersCards); // подключаем обработку роутеров карточек

// обработка несуществующего роута
router.use((req, res, next) => {
  res.status(404).send({message: 'Маршрут не найден'})
});

module.exports = router;