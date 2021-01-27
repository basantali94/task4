const express = require('express')
const Reporter = require('../models/reporters.js');
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/reporters',auth,async(req,res)=>{
    const reporter = new Reporter({
        ...req.body,
        owner: req.news._id
    })
    try{
        await reporter.save()
        res.status(200).send(reporter)
    }catch(e){
        res.status(400).send(e)
    }
})
router.get('/reporters/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const reporter = await Reporter.findOne({_id, owner:req.news._id})
        if(!reporter){
            return res.status(400).send()
        }
        res.send(reporter)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch('/reporters/:id', auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
        const reporter = await Reporter.findOne({_id, owner:req.news._id})
        if(!reporter){
            return res.status(404).send()
        }
        updates.forEach((update)=>task[update]=req.body[update])
        await reporter.save()
        res.send(reporter)
    }
    catch(e){
        res.status(400).send()
    }
})

router.delete('/reporters/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const reporter = await Reporter.findOneAndDelete({_id, owner:req.news._id})
        if(!task){
          return  res.status(404).send()
        }
        res.send(reporter)

    }catch(e){
        res.status(500).send
    }
})

module.exports = router