const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const corsMiddleware = require("./middleware/cors.middleware")
const authRouter = require("./routes/auth.routes")
const PORT = config.get("serverPort")

const app = express()

app.use(corsMiddleware)
app.use(express.json()) // распарсить json
app.use("/api/auth", authRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get("dbURL"))

    app.listen(PORT, () => {
      console.log('Server started', PORT)
    })

  } catch (e) {

  }
}

start()