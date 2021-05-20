const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

dotenv.config({path:'./config/config.env'})

connectDB()

const app = express()

app.use(express.json())

app.use('/client', express.static(path.join(__dirname, 'client')))

app.use('/api/users',require('./routes/users'))
app.use('/api/proizvodi',require('./routes/proizvodi'))
app.use('/api/kupovine',require('./routes/kupovine'))

const port = process.env.PORT || 10000

app.listen(port,()=>console.log(`SERVER USPOSTAVLJEN NA ADRESI : http://localhost:${port}`))