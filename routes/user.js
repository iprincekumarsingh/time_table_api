const express = require('express')

const router = express.Router()

const { createAccount } = require('../controllers/userController')


router.route('/register').post(createAccount)


module.exports = router

