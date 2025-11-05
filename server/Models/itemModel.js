const mongoose =require("mongoose")
const itemSchema =new mongoose.Schema({

idAppartment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Appartment',
    required:true
},
sDate:{
    type:Date,
    required:true
},
eDate:{
    type:Date,
    required:true
}

},{timestamps:true})
module.exports = {itemSchema}