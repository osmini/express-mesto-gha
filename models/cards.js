const mongoose = require('mongoose');  //подключаем mongoose

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const cardsSchame = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: Object,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

})

module.exports = mongoose.model('card', cardsSchame);