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
  const { name, email, phone, experience, expectations, institution, dob } = req.body;

  // simple regex checks
  const isNum = /^\d+$/.test(phone);
  const dateReg = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.test(dob);
  const defaultPass = 'HSU' + phone.toString().substring(0, 4);

  try {
    // Mandatory fields
    if (!name || !email || !phone || !institution || !dob) {
      throw Error('Mandatory fields must be filled!');
    }

    if (name.length <= 1) {
      throw Error('Enter a valid name');
    }

    if (!validator.isEmail(email)) {
      throw Error('Email is not valid!');
    }

    // Email uniqueness
    if (await affiliates.findOne({ email })) {
      throw Error('Email already exists!');
    }

    // Phone format & uniqueness
    if (!isNum || phone.toString().length !== 10) {
      throw Error('Enter a valid phone number');
    }
    if (await affiliates.findOne({ phone })) {
      throw Error('Phone number already exists!');
    }

    // DOB format
    if (!dateReg) {
      throw Error('Date format is incorrect! Use DD-MM-YYYY');
    }

    // Hash the generated password
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(defaultPass, salt);

    // Create affiliate record
    await affiliates.create({
      name,
      email,
      phone,
      experience,
      expectations,
      institution,
      dob,
      password: hashPass
    });

    // Send welcome email
    await instanceResend.emails.send({
      from: 'network@hexstaruniverse.com',
      to: email,
      subject: 'Welcome aboard, future Affiliate partner!',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Hex-Star Universe</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #f4f4f7;
      color: #333333;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f4f7;
      padding: 20px 0;
    }
    .email-content {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .email-header {
      background-color: #6637ed;
      color: #ffffff;
      text-align: center;
      padding: 20px;
      font-size: 24px;
      font-weight: 600;
    }
    .email-body {
      padding: 30px 25px;
      line-height: 1.6;
      font-size: 16px;
      color: #555555;
    }
    .highlight {
      display: inline-block;
      background-color: #e0deff;
      color: #6637ed;
      padding: 8px 12px;
      border-radius: 4px;
      font-weight: 600;
      margin: 10px 0;
    }
    .email-footer {
      background-color: #f4f4f7;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      color: #999999;
    }
    a.button {
      display: inline-block;
      background-color: #6637ed;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 4px;
      font-weight: 600;
      margin-top: 15px;
    }
    @media (max-width: 620px) {
      .email-content { margin: 0 15px; }
      .email-header { font-size: 20px; }
    }
  </style>
</head>
<body>
  <table role="presentation" class="email-wrapper" width="100%">
    <tr>
      <td align="center">
        <table role="presentation" class="email-content" width="100%">
          <!-- Header -->
          <tr>
            <td class="email-header">
              Welcome to Hex-Star Universe!
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="email-body">
              <p>Hi ${name},</p>
              <p>Welcome aboard to the <strong>Hex-Star Universe Affiliate Program</strong>! We’re thrilled to have your energy and ideas join our community.</p>
              <p>Your login password is:</p>
              <p class="highlight">${defaultPass}</p>
              <p>Over the next few days, you’ll receive:</p>
              <ul>
                <li>Program guidelines & best practices</li>
                <li>Exclusive resources & creatives</li>
                <li>Access to our affiliate community</li>
                <li>Prize money based on your performance</li>
              </ul>
              <a href="https://affiliate.hexstaruniverse.com/login" target="_blank" class="button">Log In Now</a>
              <p>If you have any questions, just hit reply — we’re here to help!</p>
              <p>Excited to have you on the team,</p>
              <p><strong>Team Hex-Star Universe</strong></p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="email-footer">
              © ${new Date().getFullYear()} Hex-Star Universe. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
    });

    // Generate auth token
    const token = createToken(email); 
    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const login = async (req, res) => {

    const {email, password} = req.body

    try {

        if(!email || !password) {
            throw Error('Mandetory fields must be filled!')
        }
    
        const mail = await affiliates.findOne({ email })
    
        if(!mail) {
            throw Error('Incorrect Email')
        }
    
        const match = await bcrypt.compare(password, mail.password)
    
        if(!match) {
            throw Error('Incorrect Password')
        }

        const token = createToken(mail._id)

        res.status(200).json({email, name: mail.name, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
    
}
module.exports = {affiliate_post, login}