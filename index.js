require('dotenv').config()

let express = require("express")
let app = express()
let cors = require('cors')
let routeApi = require("./routes/api")
let bodyParser = require("body-parser")
const expressValidator = require('express-validator')

const port = process.env.PORT || 7000 

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", routeApi)

app.listen(port, () => console.log(`Server Started On Port ${port}`))