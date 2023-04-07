const express = require('express')

const router = express.Router()

const { createAccount,login } = require('../controllers/userController')
const { route } = require('./timeTable.route')

router.route('/register').post(createAccount)
router.route('/login').post(login)

module.exports = router

