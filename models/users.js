const mongoose = require('mongoose');  //подключаем mongoose

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const userSchame = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('user', userSchame);


