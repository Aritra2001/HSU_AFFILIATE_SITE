const express = require('express')
const { addStudent, getStudent, deleteStudent, userStudent, userSearch } = require('../controller/studentcontroller')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//middleware
router.use(requireAuth)

//routes
router.post('/', addStudent)

router.post('/money', userStudent)

router.post('/name', userSearch)

router.get('/', getStudent)

router.delete('/:id', deleteStudent)

module.exports = router