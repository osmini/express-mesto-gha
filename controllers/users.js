const User = require('../models/users'); // подключаем модель пользователей

// получить всех пользователей
const getUsers = (req, res) => {

  return User.find({})
    .then((users) => {
      if(!users){
        return res.status(404).send({message:'Пользователи не найдены'});
      };
      return res.status(200).send(users);
    })
    .catch((err) =>{
      return res.status(500).send(err.message);
    });
};

// получить одного пользователя по id
const getUsersById = (req, res) => {
  const {userId} = req.params;

  return User.findById(userId)
  .orFail(new Error('NotValidId'))
  .then((user) => {
    return res.status(200).send(user);
  })
  .catch((err) =>{
    if(err.message === 'NotValidId'){
      return res.status(404).send({message:'Пользователь не найден'});
    };
    if(err.name === 'CastError'){
      return res.status(400).send({message:'Передан некорректный id пользователя'});
    };
    return res.status(500).send(err.message);
  })
};

// создать нового пользователя
const createUsers = (req, res) => {
  const newUser = req.body;

  return User.create(newUser)
  .then((newUser) => {
    return res.status(201).send(newUser);
  })
  .catch((err) =>{
    if (err.name === 'ValidationError'){
      return res.status(400).send({message:'переданы некорректные данные пользователя'});
    };
    return res.status(500).send(err.message);
  })
};

// обновить данные о пользователе
const updatetUsers = (req, res) => {
  const {name, about} = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {name, about},
    { new: true, runValidators: true })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) =>{
      if(err.message === 'NotValidId'){
        return res.status(404).send({message:'Пользователь не найден'});
      };
      return res.status(500).send(err.message);
    })
};

// обновить аватар
const updatetAvatar = (req, res) => {
  const avatar = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    avatar,
    { new: true, runValidators: true })
    .then((user) => {
      return res.status(200).send(user);
    })
    .catch((err) =>{
      if(err.message === 'NotValidId'){
        return res.status(404).send({message: 'Пользователь не найден'});
      };
      return res.status(500).send(err.message);
    })
};

module.exports = {
  getUsers,
  getUsersById,
  createUsers,
  updatetUsers,
  updatetAvatar
}