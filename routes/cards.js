const router = require('express').Router(); // подключаем библиотеку express для работы с роутерами
// импорт всех контролеров для работы с пользователями
const {getCards, createCards, deleteCard, createLike, deleteLike} = require('../controllers/cards');

// обработка запроса получения всех карточек
router.get('/', getCards);

// обработка запроса создания карточки
router.post('/', createCards);

// обработка запроса  на удаления карточки
router.delete('/:cardId', deleteCard);

// обработка запроса  поставить лайк
router.put('/:cardId/likes', createLike);

// обработка запроса  удалить лайк
router.delete('/:cardId/likes', deleteLike);

// экспортируем модуль
module.exports = router;


