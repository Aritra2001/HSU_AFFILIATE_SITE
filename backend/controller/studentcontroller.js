const student = require('../modules/studentModule')
const mongoose = require('mongoose')

const addStudent = async (req, res) => {

    const { name, email, phone, payment, amount } = req.body

    try {
        if(!name || !email || !phone || !payment || !amount) {
            throw Error('Mandetory fields must be filled')
        }
        const mail = await student.findOne({ email })
        if(mail) {
            throw Error('Email Already Exits!')
        }
        const ph_no = await student.findOne({ phone })
        if(ph_no) {
            throw Error('Phone no Alreay Exits!')
        }
        if(payment === 'null') {
            throw Error('Select a valid Payment status!')
        }
        if(amount > 2999 || amount < 0) {
            throw Error('Enter the Amount Correctly!')
        }
        if(payment === 'Paid' && amount !== 2999) {
            throw Error('Payment has to be 2999 for Status Paid!')
        }
        if(payment === 'Pending' && amount !== 0) {
            throw Error('Payment has to be 0 for Status Pending!')
        }
        const user_id = req.user._id
        const students = await student.create({name, email, phone, payment, amount, user_id})
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getStudent = async (req, res) => {
    
    const students = await student.find({}).sort({createdAt: -1})

    res.status(200).json(students)
}

const deleteStudent = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Student'})
    }
  
    const students = await student.findOneAndDelete({_id: id})
  
    if(!students) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(students)
  }
  
    

module.exports = { addStudent, getStudent, deleteStudent }