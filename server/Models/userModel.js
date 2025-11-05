const mongoose = require("mongoose")
const {itemSchema:item} = require("./itemModel")
const UserSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
userName:{
    required:true,
    type:String,
    unique:true
},
// basket:{
//     type: [item],
//     default:[]
// },
basket:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Basket'
},
phone:{
    required:true,
    type:String
},
email:{
    required:true,
    type:String
},
password:{
    type: String,
    required:true
},
role:{
    type:String,
    enum:["admin","user"],
    default:"user"
}
},{timestamps:true})
module.exports = mongoose.model('User',UserSchema)