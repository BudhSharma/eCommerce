const mongoose = require('mongoose')

const { initModels } = require('../models/initModel')

let db
let connected = false
const isDev = process.env.NODE_ENV === 'development'
let seconds = 1

const connect = URL => {
  mongoose.set('strictQuery', false)
  mongoose.connect(URL, { useNewUrlParser: true }).catch(e => {
    console.log(e)
    connected = false
    setTimeout(() => {
      connect(URL)
      seconds = seconds + 1
    }, seconds * 1000)
  })

  if (!db) {
    db = mongoose.connection
  }

  db.once('open', () => {
    connected = true
    console.info('Connected to db')

    initModels()

    console.info({ isDev }, 'development mode', process.env.NODE_ENV)
  })
}

module.exports = { connect }
