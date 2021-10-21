const express = require('express')
const router = express.Router()
const needle = require('needle')
const url = require('url')
const apiCache = require('apicache')

// env variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// init cache
let cache = apiCache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        // console.log(url.parse(req.url, true).query)

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })
        const result = await needle('get', `${API_BASE_URL}?${params}`)
        const data = result.body
        if (data) {
            // log request
            if (process.env.NODE_ENV !== "production") {
                console.log(`Request: ${API_BASE_URL}?${params}`)
            }
            res.status(200).json(data)
        } else {
            res.status(200).json({ "message": "no results!" })
        }

    } catch(err) {
        console.log(err)
        res.status(500).json({ err })
    }
})

module.exports = router