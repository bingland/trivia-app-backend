const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
  category: String,
  categoryID: Number,
  scores: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      score: Number,
      date: Date,
      difficulty: String
    }
  ]
}, { collection: 'scores' })

module.exports = mongoose.model('Score', ScoreSchema)