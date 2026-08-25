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

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

//to hide the password when sending user data
userSchema.set('toJSON',{
transform:(document, returnedObject)=>{
  delete returnedObject.password
}
})

const User=mongoose.model('User',userSchema)

module.exports=User


