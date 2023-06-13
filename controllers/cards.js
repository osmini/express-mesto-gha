const Card = require('../models/cards'); // подключаем модель пользователей

// получить всех карточек
const getCards = (req, res) => {

  return Card.find({})
    .then((cards) => {
      if(!cards){
        return res.status(404).send({message:'Карточки не найдены'});
      };
      return res.status(200).send(cards);
    })
    .catch((err) =>{
      return res.status(500).send(err.message);
    });
};

// создать карточку
const createCards = (req, res) => {
  const newCard = req.body;

  return Card.create(newCard)
  .then((newCard) => {
    return res.status(201).send(newCard);
  })
  .catch((err) =>{
    if (err.name === 'ValidationError'){
      return res.status(400).send({message:'переданы некорректные данные карточки'});
    };
    return res.status(500).send(err.message);
  })
};

// удалить карточку
const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if(!card){
        return res.status(404).send({message:'Карточка не найдена'});
      };
      Card.deleteOne(card)
      .then(() => {
        return res.status(200).send({message:'Карточка удалена'});
      })
    })
    .catch((err) =>{
      if(err.name === 'CastError'){
        return res.status(400).send({message:'Передан некорректный id карточки'});
      };
      return res.status(500).send(err.message);
    })
};

// поставить лайк
const createLike = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((card) => {
      if(!card){
        return res.status(404).send({message:'Карточка не найдена'});
      };
      return res.status(200).send(cards);
    })
    .catch((err) =>{
      return res.status(500).send(err.message);
    });

// удалить лайк
const deleteLike = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true })
  .then((card) => {
    if(!card){
      return res.status(404).send({message:'Карточка не найдена'});
    };
    return res.status(200).send(cards);
  })
  .catch((err) =>{
    return res.status(500).send(err.message);
  });

module.exports = {
  getCards,
  createCards,
  deleteCard,
  createLike,
  deleteLike
}