const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const fileUpload = require("express-fileupload")
const corsMiddleware = require("./middleware/cors.middleware")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const cors = require('cors')

const PORT = config.get("serverPort")
const app = express()

app.use(fileUpload({}))
app.use(cors())
// app.use(corsMiddleware)
app.use(express.json()) // распарсить json
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"))

    app.listen(PORT, () => {
      console.log('Server started', PORT)
    })

  } catch (e) {
    console.log(e)
  }
}

start()