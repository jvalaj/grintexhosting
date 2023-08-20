import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js'
import authRoutes from "./routes/authRoutes.js"
import path from 'path'
dotenv.config()
const __dirname = path.resolve();

//rest object
const app = express()

//database config
connectDB()

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/api/v1/auth', authRoutes)

//static files
app.use(express.static(path.join(__dirname, "./client/build")))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"))
})
//PORT
const PORT = process.env.PORT || 8080

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`.bgCyan.white)
})