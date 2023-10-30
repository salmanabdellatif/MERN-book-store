const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./db/connect')

const app = express()
app.use(express.json()) // to make it able to send json in req body

// middleware for handling CORS POLICY
// option 1: Allow all origins with default of cors(*)
// app.use(cors())
// option 2: Allow custom origins
app.use(
  cors({
    origin: 'https://mern-book-store-backend.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
)

const bookRouter = require('./routers/bookRouter')

app.use('/books', bookRouter)

app.get('/', (req, res) => {
  res.status(201).send('<h1>welcom to my server</h1>')
})

const port = process.env.PORT
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
