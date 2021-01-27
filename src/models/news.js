const mongoose = require('mongoose')
 const jwt = require ('jsonwebtoken')
// const News = mongoose.model("News", {
  const NewsSchema = mongoose.Schema({
    title:{
        type: String,
        unique:true,
      required:true,
      trim:true
    },
    describtion:{
        type: String,
        
    },
    author:{
        type: String,
        required:true,


    },
//     date:{
//         type: Date,
//         // timestampe:true ,
        
// //Date.prototype.addHours = function(h) {
//  //this.setTime(this.getTime() + (h*60*60*1000));
//  // return this;

//     },
    tokens:[{
        token:{
          type:String,
          required:true
        }
      }],
      avatar:{
        type:Buffer
      },
      
},
{
  timestamps: true,


})
NewsSchema.virtual('reporters',{
    ref:'Reporter',
    localField:'_id',
    foreignField:'owner'
  
  })

  NewsSchema.methods.generateToken = async function(){
    const news = this
    const token = jwt.sign({_id:news._id.toString()},'node course')
    news.tokens = news.tokens.concat({token})
    await news.save()
    return token
  }

  

const News = mongoose.model("News", NewsSchema);
module.exports = News