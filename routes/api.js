const express = require("express")
const app = express()

const AuthMiddleware = require('../middleware/auth')

const AuthController = require('../controllers/AuthController')

app.post('/sign-up', AuthController.signUp)
app.post('/sign-in', AuthController.signIn)
app.get('/profile', AuthMiddleware, AuthController.profile)

module.exports = app