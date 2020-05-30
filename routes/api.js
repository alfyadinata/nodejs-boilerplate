const express = require("express")
const app = express()

const AuthController = require('../controllers/AuthController')

app.post('/sign-up', AuthController.signUp)
app.post('/sign-in', AuthController.signIn)

module.exports = app