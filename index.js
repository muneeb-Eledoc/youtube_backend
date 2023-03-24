import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.js'
import videoRoutes from './routes/video.js'
import commentRoutes from './routes/comment.js'
import authRoutes from './routes/auth.js'
import coockieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('Connected to MongoDB')
    })
}

app.use(coockieParser())
app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res)=>{
    res.status(200).json({
        status: 'Server is running...'
    })
})

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || 'Something went wrong.';
    
    return res.status(status).json({
        error: true,
        message,
        status
    })
})

app.listen(process.env.PORT || 4000, () => {
    connectToDB()
    console.log('Server running at http://localhost:4000')
})