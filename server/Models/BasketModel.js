const mongoose = require("mongoose")
const {itemSchema:item} = require("./itemModel")
const basketSchema = new mongoose.Schema({
userId:{
    type:mongoose.Schema.Types.ObjectId,
  //  required:true
}
,
items:{
    type: [item],
    default:[]
}

},{timestamps:true})
module.exports = mongoose.model('Basket',basketSchema)