const mongoose = require('mongoose');  //подключаем mongoose

// описываем схему пользователя
// require: trye - поле обязательно
// minlength: 2 - минимальное количество символов в поле
// maxlength: 30 - максимальное количество символов
const cardsSchame = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "name" должно быть заполнено']
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},
{
  versionKey: false,
})

module.exports = mongoose.model('card', cardsSchame);