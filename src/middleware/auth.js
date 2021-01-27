const jwt = require('jsonwebtoken')
const News = require('../models/news')
const auth = async(req,res,next)=>{
    try{
        
        const token = req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decode = jwt.verify(token,'node course')
        
       
        const news = await News.findOne({_id:decode._id , 'tokens.token':token})
        
        if(!news){
            throw new Error()
        }
        req.news = news

        req.token = token
       
        next()

    }
    catch(e){
        res.status(401).send({error:'Please authenticate'})
    }
}


module.exports = auth