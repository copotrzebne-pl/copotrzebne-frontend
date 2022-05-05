const serverless = require('serverless-http')
const express = require('express')
const app = express()

require('./server')(app)

module.exports.handler = serverless(app)
