const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./Config/db')
const { readdirSync } = require('fs')

//const productRouters= require('./Routes/product')
//const authRouters=require('./Routes/auth')

const app = express()

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))  // <-- ใช้ bodyParser ตรงนี้ ถูกต้องแล้ว

//Route1
//app.get('/product', (req,res) => {
//    res.send('Hello Endpoint 1232131')
//})

//Route2
//app.use('/api',productRouters)
//app.use('/api',authRouters)

//Route3
readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)))

app.listen(5000, () => console.log('Server is Runing  port 5000'))
