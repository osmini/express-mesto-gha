const mongoose = require('mongoose');  //подключаем mongoose
const validator = require('validator'); // подключаем библиотеку валидатор

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const userSchame = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  about: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
    required: [true, 'Поле "name" должно быть заполнено'],
  },
},
{
  versionKey: false,
})

module.exports = mongoose.model('user', userSchame);