const express = require('express')
const { addStudent, getStudent, deleteStudent } = require('../controller/studentcontroller')


const router = express.Router()

//routes
router.post('/', addStudent)

router.get('/', getStudent)

router.delete('/:id', deleteStudent)

module.exports = router