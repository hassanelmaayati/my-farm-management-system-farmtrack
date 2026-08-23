const mongoose = require('mongoose')


const logEntrySchema=new mongoose.Schema({
  date:{
    type: Date,
    required: true,
  }

  ,eventType:{
    type: String,
    enum: ['Fed', 'Vet Visit', 'Sold', 'Died', 'Other'],
    required: true,
  }

  ,description:{
    type: String,
  }

  ,animal:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: true,
  }
})

const LogEntry = mongoose.model('LogEntry', logEntrySchema);
module.exports=LogEntry