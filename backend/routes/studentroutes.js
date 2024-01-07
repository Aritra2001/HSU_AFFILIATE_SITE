const express = require('express')
const { addStudent, getStudent } = require('../controller/studentcontroller')


const router = express.Router()

//routes
router.post('/', addStudent)

router.get('/', getStudent)

module.exports = router