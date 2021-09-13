const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
  // тип строковый, параметр обязательный и уникальный
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  diskSpace: {type: Number, default: 1024 ** 3 * 10},
  usedSpace: {type: Number, default: 0},
  avatar: {type: String},
  // связываем сущность пользователя с сущностью файлов:
  // это массив каждый объект которого имеет тип ObjectId
  // и ссылается на сущность файл
  file: [{type:ObjectId, ref:"file"}]
})

module.exports = model("User", User)