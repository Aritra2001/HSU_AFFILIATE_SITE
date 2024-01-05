const express = require('express')
const { affiliate_post } = require('../controller/affiliatecontroller')

const router = express.Router()

//routes
router.post('/affiliate', affiliate_post)

module.exports = router