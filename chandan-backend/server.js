import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/usersRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use(process.env.BASE_ROUTE + '/users', userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
