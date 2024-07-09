import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'
import postRoutes from './routes/postRoutes'
import sequelize from './config/database'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

sequelize
  .sync()
  .then(() => {
    console.log('Database connected')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
