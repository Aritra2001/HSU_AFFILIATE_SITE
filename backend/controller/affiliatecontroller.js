const affiliates = require('../modules/affiliateModule')
const validator = require('validator')
const bcrypt = require('bcrypt')
const { Resend } = require("resend");
const jwt = require('jsonwebtoken')

//create json web token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }
  

// Send an email:
const instanceResend = new Resend(process.env.RESEND_API_KEY);

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

        await instanceResend.emails.send({
            from: 'network@hexstaruniverse.com',
            to: email,
            subject: 'Welcome aboard, future Affiliate partner!',
            html: `<html>
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
            </head>
            <body style="font-family: 'Poppins', sans-serif; font-size: 16px;">
            <div>
            <table style="width: 69.9834%;" role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0" align="center">
            <tbody>
            <tr>
            <td style="width: 100%;">
            <p><span>Hi ${name},</span></p>
            <p>Thanks for taking the leap and joining us in the Hex-Star Universe affiliate fam!  We're thrilled to have you on board and can't wait to see what amazing things you'll do with our brand.<br/></p>
            <p>Keep your eyes peeled for a follow-up email (or maybe even a call!) in the next few days. We'll be in touch with all the juicy details about the program, exclusive resources, and how you can connect with other awesome affiliates.<br/></p>
            <p>In the meantime, feel free to browse our content, get familiar with our products, and let your creative juices flow. We're all about building a community of passionate advocates, and you're officially part of it!<br/></p>
            <p><span>Excited to have you with us,</span><br/></p>
            <p><span>The Hex-Star Universe Affiliate Team</span></P>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            </body>
            </html>`
          });

        const token = createToken(name._id)

        res.status(200).json({email, token})
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

        const token = createToken(mail._id)

        res.status(200).json({email, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}
module.exports = {affiliate_post, login}