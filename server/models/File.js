const {model, Schema, ObjectId} = require('mongoose')


const File = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  accessLink: {type:String},
  size: {type: Number, default: 0},
  path: {type: String, default: ''},
  user: {type: ObjectId, ref: 'User'},
  parent: {type: ObjectId, ref: 'File'}, // ссылается на папку в котором находится файл
  childs: [{type: ObjectId, ref: 'File'}], // на все файлы внутри папки
})

module.exports = model('File', File)
