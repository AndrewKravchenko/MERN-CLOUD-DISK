const Router = require("express")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const authMiddleware = require("../middleware/auth.middleware")
const fileService = require('../services/fileService')
const File = require('../models/File')

const router = new Router()


router.post("/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Password must be longer than 3 and shorter than 12")
      .isLength({min: 3, max: 12}),

  ],
  async (req, res) => {
    try {
      //результат валидации
      const errors = validationResult(req)
      // если результат валидации имеет ошибки, то статус код 400 + сообщение об ошибке
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Incorrect request", errors})
      }

      const {email, password} = req.body

      const candidate = await User.findOne({email})
      // проверка существует ли пользователь с таким имэйлом в базе
      if (candidate) {
        return res.status(400).json({message: `User with email ${email} already exist`})
      }
      const hashPassword = await bcrypt.hash(password, 8) // цифра степень хэширования
      const user = new User({email, password: hashPassword})
      // сохраняем пользователя
      await user.save()
      // после сохр пользователя в базе, созд. для него отдельую папку с названием его id
      await fileService.createDir(new File({user:user.id, name: ''}))
      return res.json({message: "User was created"})

    } catch (error) {
      console.log(error)
      res.send({message: "Server error"})
    }
  })

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }
    // проверка совпадает ли пароль с тем, что хранится в базе
    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({message: "Invalid password"})
    }
    // создаем токен
    // 1. объект который хотим поместить в токен
    // 2. секретный ключ
    // 3. время существования токена
    const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      }
    })

  } catch (error) {
    console.log(error)
    res.send({message: "Server error"})
  }
})

router.get('/auth', authMiddleware,
  async (req, res) => {
    try {
      // находим юзер по id, который достали из токена
      const user = await User.findOne({_id: req.user.id})
      const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      })
    } catch (e) {
      console.log(e)
      res.send({message: "Server error"})
    }
  })

module.exports = router
