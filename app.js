const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoute')
const productRoute = require('./routes/productRoute')
const config = require('./config')
const { connect } = require('./config/db')
const errorHandler = require('./error/errorHandler')
const path = require('path')
const { getRoutes } = require('get-routes')
const app = express()

dotenv.config()

const PORT = process.env.PORT || 8000

connect(config.mongoURI)

const sessionMiddleware = session({
  secret: process.env.JWT_SECRET_KEY,
  resave: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: 'none',
    secure: true
  },
  saveUninitialized: true
})
app.set('trust proxy', 1)
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use(sessionMiddleware)

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://bioveda.eoxyslive.com'
      ]
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          'The CORS policy for this site does not allow access from the specified Origin.'
        return callback(new Error(msg), false)
      }
      return callback(null, true)
    },
    credentials: true,
    methods: 'GET, PUT, POST, PATCH, DELETE, OPTIONS',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  })
)

app.use(helmet())

app.get('/', (req, res) => {
  res.json({ message: "It's show time." })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/product', productRoute)

const routers = getRoutes(app)

// console.log(routers)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
