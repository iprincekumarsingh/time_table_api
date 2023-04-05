const express = require('express')
const app = express()
var morgan = require('morgan')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// morgan('tiny')
app.use(morgan('tiny'))
const home = require('./routes/home.route')

// importing routes from routes folder
const user = require('./routes/user')

// timeTable = require('./routes/timeTable.route')
const timeTable = require('./routes/timeTable.route')


app.use('/api/v1/timetable', timeTable)

app.use('/', home);
app.use('/api/v1/user', user);
module.exports = app