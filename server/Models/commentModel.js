const mongoose =require("mongoose")
const commentSchema =new mongoose.Schema({
name:{
     type:String,
    required:true
},

content:{
    type:String,
},
stars:{
   type:Number,
   min:1,
   max:5
}
},{timestamps:true})
module.exports = {commentSchema}