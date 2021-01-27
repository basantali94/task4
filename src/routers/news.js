const express = require('express')
const router = new express.Router()
const News = require('../models/news')
const auth = require('../middleware/auth')
const multer = require('multer')
//////////////////////
//post
// router.post('/news',(req,res)=>{
//     const news = new News(req.body)
//     news.save().then(()=>{
//         res.status(200).send(news)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
// })
router.post('/news',async (req,res)=>{
    const news = new News(req.body)
    try{
        await news.save()
        const token = await news.generateToken()
        res.status(200).send({news,token})
    }
    catch(e){
        res.status(400).send(e)
    }

})
///////////////////
router.get('/news/:id',(req,res)=>{
    // console.log(req.params)
    // console.log(req.params.id)
    const _id = req.params.id

    News.findById(_id).then((news)=>{
        if(!news){
            return res.status(400).send('Unable to find news')
        }
        res.status(200).send(news)
    }).catch((e)=>{
        res.status(500).send('Internal server error')
    })
})

/////////////////////////////
router.patch('/news/:id', async(req,res)=>{
    const updates = Object.keys(req.body) 
    const allowedUpdates = ['title','describtion']
    
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
      return  res.status(400).send("can not update")
    }
    const _id = req.params.id
    try{
    const news = await News.findByIdAndUpdate(_id,req.body,{
        new:true,
        runValidators:true
    })
    if(!news){
        return res.send('No news is found')
    }
    res.status(200).send(news)
    } catch(e){
        res.status(400).send('Error has occurred')
    }
})

////////////////////
router.delete('/news/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const news = await News.findByIdAndDelete(_id)
        if(!news){
            return res.status(400).send('Not found')
        }
        res.status(200).send(news)
    }
    catch(e){
        res.send(e)
    }
})

router.post('/news/login',async (req,res)=>{

    try{
    const news = await News.findByCredentials(req.body.title,req.body.author)
    const token = await news.generateToken()
    res.send({news,token})
    }
    catch(error){
        // res.status(400).send('Error has occurred' + error)
        res.status(400).send('Unable to login')
    }
    
})


router.get('/profile',auth,async(req,res)=>{
    res.send(req.news)
   
})
const uploads = multer({
    limits:{
      fileSize:1000000
    },
    fileFilter(req,file,cb){
      if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
        return cb(new Error('Please upload an image'))
      }
      cb(undefined,true)
    }

  })

router.post('/profile/avatar',auth,uploads.single('avatar'),async(req,res)=>{

    try{ 
    req.news.avatar = req.file.buffer
    await req.news.save()
    res.send()
    }catch(e){
        res.send(e)
    }
  
    

})

module.exports = router 