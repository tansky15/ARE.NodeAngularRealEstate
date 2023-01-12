const mongoose = require('mongoose');
const maisonSchema=new mongoose.Schema({
code:String,
titre:String,
description:String,
prix:Number,
adresse:String,
agent:String
});
module.exports=mongoose.model('maison',maisonSchema);