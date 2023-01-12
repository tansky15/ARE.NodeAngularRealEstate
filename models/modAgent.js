const mongoose = require('mongoose');
const agentSchema=new mongoose.Schema({
nom:String,
numero:String,
});
module.exports=mongoose.model('agent',agentSchema);