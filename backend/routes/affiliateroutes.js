const express = require('express')
const { affiliate_post, login } = require('../controller/affiliatecontroller')

const router = express.Router()

//routes
router.post('/affiliate', affiliate_post)

router.post('/login', login)

module.exports = router