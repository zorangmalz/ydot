const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001

app.use(bodyParser.json())
