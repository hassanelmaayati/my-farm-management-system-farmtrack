//importing libraries
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

//user schema
const userSchema= new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
})

//hashing the pass before saving it in the database
userSchema.pre('save',async function (next) {
  if(!this.isModified('password')) return next()
  this.password=await bcrypt.hash(this.password,10)
  next()
})

//to hide the password when sending user data
userSchema.set('toJSON',{
transform:(document, returnedObject)=>{
  delete returnedObject.password
}
})

const User=mongoose.model('User',userSchema)

module.exports=User


