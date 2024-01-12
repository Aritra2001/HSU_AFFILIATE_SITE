require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const affiliateRoutes = require('./routes/affiliateroutes')
const studentRoutes = require('./routes/studentroutes')

//create the express app
const app = express()

//cors origin
//cors
const allowedOrigins = [
    'http://localhost:3000', 'https://affiliate.hexstaruniverse.com'
];

app.use(cors({
    origin:function(origin,callback){
        if(allowedOrigins.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials:true,
}))

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

//routes
app.use('/api', affiliateRoutes)
app.use('/api/students', studentRoutes)

//database
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    //listening to port
    app.listen(process.env.PORT, () => {
        console.log('Listening for requests on PORT', process.env.PORT)
    })
})
.catch((err) => {
    console.log('server encountered an error', err)
})