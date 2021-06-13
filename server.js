// libraries
const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')
const passportLocal = require('passport-local')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// global vars
const port = process.env.PORT || 3535

// connect to MongoDB
mongoose.connect(
  process.env.MONGO_URL, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('✅ Mongoose connected')
  }
)

// middleware
app.use(express.urlencoded({extended: false}))
app.use(cors()) // can add origin / credentials in object for params
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// listen
app.listen(port, () => console.log(`✨ Server listening on port ${port}`))