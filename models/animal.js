const mongoose= require('mongoose')

const animalSchema= new mongoose.Schema({

  name:{
    type: String,
    required: true,
  }

  ,species:{
    type: String,
    required:true,
  }
  ,breed:{
    type: String,
  }

  ,birthdate:{
    type: Date,
  }

  ,status:{
    type: String,
    enum:['Healthy','Sick','Sold','Deceased','Other'],
    default:'Healthy'
  }

  ,notes:{
    type: String,
  }

  ,structure:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Structure',
    required:true,
  },

});

const Animal= mongoose.model('Animal',animalSchema)
module.exports= Animal