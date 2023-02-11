const express = require('express')
const cors=require('cors')
const app=express()

const PORT = process.env.PORT || 5000
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(express.json())

const getErrorList = require('./routes/getWebError')

app.use("/api/v1/test", getErrorList)
app.listen(PORT, () => {
    console.log('app is running .....')
})


