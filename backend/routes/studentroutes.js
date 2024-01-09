const express = require('express')
const { addStudent, getStudent, deleteStudent } = require('../controller/studentcontroller')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//middleware
router.use(requireAuth)

//routes
router.post('/', addStudent)

router.get('/', getStudent)

router.delete('/:id', deleteStudent)

module.exports = router