const mongoose = require('mongoose')
const validator = require('validator')
 const bcrypt = require ('bcryptjs')
 const jwt = require ('jsonwebtoken')
const ReporterSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
      },
      email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error('Email is invalid')
          }
        }
      },
      password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
        validate(value){
          if(value.toLowerCase().includes('password')){
            throw new Error ('Password can\'t contain word password')
          }
        }
      },
      owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'News'
    }
})

ReporterSchema.pre('save',async function(next){
    const reporters = this
    if(reporters.isModified('password')){
      reporters.password = await bcrypt.hash(reporters.password,8)
    }
    next()
 })
const Reporter = mongoose.model("Reporter", ReporterSchema);
module.exports = Reporter