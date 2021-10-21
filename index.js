const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

// rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
})
app.use(limiter)
app.set("trust proxy", 1)

// set static folder
app.use(express.static('./public'))

// use cors
app.use(cors())

// routes
app.use('/api', require('./routes'))


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})