const student = require('../modules/studentModule')
const mongoose = require('mongoose')
const validator = require('validator')

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
        if(!validator.isEmail(email)) {
            throw Error('Email is not valid!')
        }
        const ph_no = await student.findOne({ phone })
        if(ph_no) {
            throw Error('Phone no Alreay Exits!')
        }
        if(payment === 'null') {
            throw Error('Select a valid Payment status!')
        }
        if(amount > 599 || amount < 0) {
            throw Error('Enter the Amount Correctly!')
        }
        if(payment === 'Paid' && (amount !== '399' || amount !=='599' )) {
            throw Error('Payment has to be 399 or 599 for Status Paid!')
        }
        if(payment === 'Pending' && amount !== '0') {
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

    const user_id = req.user._id
    
    const students = await student.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(students)
}

const userStudent = async (req, res) => {
    const user_id = req.user._id;

    // Filtering out students with payment status as "pending"
    const students = await student.find({ payment: { $ne: "Pending" }, user_id }).sort({createdAt: -1});

    // Extracting amount property from each student and summing them up
    const totalAmount = students.map(student => student.amount).reduce((acc, curr) => acc + curr, 0);

    res.status(200).json({ totalAmount });
}



const userSearch = async (req, res) => {
    const { name } = req.body;
    const user_id = req.user._id;
  
    // Use a regular expression to match names containing the provided substring
    const regex = new RegExp(name, 'i'); // 'i' makes the search case-insensitive
  
    try {
      const students = await student.find({ name: { $regex: regex }, user_id }).sort({ createdAt: -1 });
  
      res.status(200).json(students);
    } catch (error) {
      console.error('Error searching for students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

const deleteStudent = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such Student'})
    }
  
    const students = await student.findOneAndDelete({_id: id})
  
    if(!students) {
      return res.status(400).json({error: 'No such student'})
    }
  
    res.status(200).json(students)
  }
  
    

module.exports = { addStudent, getStudent, deleteStudent, userStudent, userSearch }