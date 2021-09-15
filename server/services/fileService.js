const fs = require('fs') // модуль для работы с файловой системой
const File = require('../models/File')
const config = require('config')

class FileService {

  createDir(file) {
    const filePath = `${config.get('filePath')}//${file.user}//${file.path}`
    return new Promise(((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'File was created'})
        } else {
          return reject({message: "File already exist"})
        }
      } catch (e) {
        return reject({message: 'File error'})
      }
    }))
  }

  deleteFile(file) {
    const path = this.getPath(file)
    // в модуле fs файлы и папки отличаются и за их удаление отвечают разные функции
    if (file.type === 'dir') {
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    // путь до папки (конфиг) + userId + путь относительно папки каждого пользователя
    return config.get('filePath') + '//' + file.user + '//' + file.path
  }
}


module.exports = new FileService()
