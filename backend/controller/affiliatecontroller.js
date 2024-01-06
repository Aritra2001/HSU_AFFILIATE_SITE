const affiliates = require('../modules/affiliateModule')
const validator = require('validator')
const bcrypt = require('bcrypt')

const affiliate_post = async (req, res) => {

    const { name, email, phone, experience, id_type, id_proof, expectation, institution, dob } = req.body

    var isnum =  /^\d+$/.test(phone);
    var addhar_reg =  /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/.test(id_proof)
    var  voter_reg =  /^[A-Z]{3}[0-9]{7}$/.test(id_proof)
    var pan_reg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(id_proof)
    var date_reg = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.test(dob)

    const date = new Date(dob)

    try {

        if(!name || !email || !phone || !id_type || !id_proof || !institution || !dob) {
            throw Error('Mandetory fields must be filled!')
        }

        if(name.length <= 1) {
            throw Error('Enter a Valid Name')
        }
        
        if(!validator.isEmail(email)) {
            throw Error('Email is not valid!')
        }

        const mail = await affiliates.findOne({email}) 
        if(mail) {
            throw Error('Email Already Exists!')
        }
        
        if((phone.toString().length < 10 || phone.toString().length >= 11) && isnum === true) {
            throw Error('Enter a valid Phone Number')
        }

        const ph_no = await affiliates.findOne({phone})
        if(ph_no) {
            throw Error('Phone no Alreay Exits!')
        }

        if(id_type === 'null') {
            throw Error('Choose an ID Type')
        }

        if(id_type === 'Addhar' && addhar_reg === false) {
            throw Error('Invalid Addhar Number!')
        }

        if(id_type === 'Voter' && voter_reg === false) {
            throw Error('Invalid Voter Number!')
        }
        if(id_type === 'Pan' && pan_reg === false) {
            throw Error('Invalid Pan Number!')
        }

        const aff_id = await affiliates.findOne({id_proof})
        if(aff_id) {
            throw Error('Document ID Already Exits!')
        }

        if(date_reg === false) {
            throw Error('Date format is incorrect!')
        }

        //hashing
        const salt = await bcrypt.genSalt(10)
        const hash_id = await bcrypt.hash(id_proof, salt)
        const hash_dob = await bcrypt.hash(dob, salt)

        await affiliates.create({ name, email, phone, experience, id_type, id_proof : hash_id, expectation, institution, dob : hash_dob})
        res.status(200).json({message: 'New Affiliate Added'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const login = async (req, res) => {

    const {email, dob} = req.body

    try {

        if(!email || !dob) {
            throw Error('Mandetory fields must be filled!')
        }
    
        const mail = await affiliates.findOne({ email })
    
        if(!mail) {
            throw Error('Incorrect Email')
        }
    
        const match = await bcrypt.compare(dob, mail.dob)
    
        if(!match) {
            throw Error('Incorrect Password')
        }

        res.status(200).json({mail})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}
module.exports = {affiliate_post, login}