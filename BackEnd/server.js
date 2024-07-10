import express from 'express'
import mongoose from 'mongoose'
import router  from './router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import  { config }   from 'dotenv'
config()

const app = express()
const PORT = process.env.PORT;
app.use(express.json())
app.use(cors({
    origin:["https://todo-list-website-7kua.onrender.com", "http://localhost:5173"],method:["GET","POST"],credentials:true
}))

app.use(cookieParser()) 


try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('DB connected successfully')
} catch (error) {
    console.log(error.message)
}


app.get('/', (req, res) => {

    return res.status(200).send("hello world")
})

app.use(router);

app.listen(PORT, () => {
    console.log("server is running on", PORT)
})
