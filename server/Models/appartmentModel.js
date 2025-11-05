const mongoose = require('mongoose')
const {commentSchema:comment}=require("./commentModel")
const appaertmentSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    size:
    {
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    bookings:{
        type:[{sDate:{type:Date,required:true},eDate:{type:Date,required:true}}],
        default:[]
    },
    beds:{
        type:Number,
        require:true
    },
    description:{
        type:String
    },
     city:{
        type:String
    },
      img:{
        type:String
    },
    comments:{
        type:[comment],
        default:[]
    }

},{timestamps:true})
module.exports = mongoose.model('Appartment',appaertmentSchema)