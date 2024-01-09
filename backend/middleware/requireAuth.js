const jwt = require('jsonwebtoken')
const affiliate = require('../modules/affiliateModule')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Authorization token Required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await affiliate.findOne({ _id }).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not Authorized'})
    }


}

module.exports = requireAuth