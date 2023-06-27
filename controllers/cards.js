const Card = require('../models/cards'); // подключаем модель пользователей
const BadRequestError = require('../errors/badRequestError'); // подключаем класс ошибок 400
const NotFoundErrors = require('../errors/notFoundErrors'); // подключаем класс ошибок 404

// получить всех карточек
const getCards = (req, res, next) => {

  return Card.find({})
    .then((cards) => {
      if(!cards){
        next (new NotFoundErrors({message:'Карточки не найдены'}));
      };
      return res.status(200).send(cards);
    })
};

// создать карточку
const createCards = (req, res, next) => {
  const newCard = req.body;

  return Card.create(newCard)
  .then((newCard) => {
    next (res.status(201).send(newCard));
  })
  .catch((err) =>{
    if (err.name === 'ValidationError'){
      next (new BadRequestError({message:'переданы некорректные данные карточки'}));
    };
  })
};

// удалить карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if(!card){
        next (new NotFoundErrors({message:'Карточка не найдена'}));
      };
      Card.deleteOne(card)
      .then(() => {
        return res.status(200).send({message:'Карточка удалена'});
      })
    })
    .catch((err) =>{
      if(err.name === 'CastError'){
        next (new BadRequestError({message:'Передан некорректный id карточки'}));
      };
    })
};

// поставить лайк
const createLike = (req, res, next) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      if(!card){
        next (new NotFoundErrors({message:'Карточка не найдена'}));
      };
      return res.status(200).send(cards);
    })

// удалить лайк
const deleteLike = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true })
  .then((card) => {
    if(!card){
      next (new NotFoundErrors({message:'Карточка не найдена'}));
    };
    return res.status(200).send(cards);
  })

module.exports = {
  getCards,
  createCards,
  deleteCard,
  createLike,
  deleteLike
}