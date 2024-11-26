import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'
const app = express()
app.disable('x-powered-by')

app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3000'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, true)
    }
    return callback(new Error('Not allowed by CORS  '))
  }
}))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
