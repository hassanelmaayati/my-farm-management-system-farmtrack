const mongoose=require("mongoose")

const structureSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  type:{
    type:String,
    enum:['Barn','Stable','Coop','Pen','Other'],
    required:true
  },
  notes:{
    type:String,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
})

const Structure=mongoose.model('Structure', structureSchema)

module.exports= structure