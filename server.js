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

// schemas
const User = require('./models/User')
const Score = require('./models/Score')

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

// routes
app.get('/scores', (req, res) => {
  console.log('get /scores')
  // get scores from DB. public.
  // req.body get scores from categories / difficulties

  console.log(req.body.difficulty)

  Score.find({categoryID: req.body.category})
  .populate({path: 'scores', populate: { path: 'user', model: 'User' }})
  .exec((err, data) => {
    console.log(data)
    res.json(data)
  })
})

app.post('/addscore', (req, res) => {
  console.log('post /score')
})

app.post('/register', (req, res) => {
  console.log('post /register')
})

app.post('/login', (req, res) => {
  console.log('post /login')
})

// TODO: do trivia api calls from the server w/ session
app.post('/answer', (req, res) => {
  console.log('post /answer')
})

// listen
app.listen(port, () => console.log(`✨ Server listening on port ${port}`))