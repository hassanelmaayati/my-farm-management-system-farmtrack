const User=require('../models/user.js')
const bcrypt= require('bcrypt')

const signup= async(req,res)=>{
  try{
    const userInDatabase= await User.findOne({username:req.body.username})
    if(userInDatabase){
      return res.send('Username unavailable.')
    }
    const user=await User.create({
      username:req.body.username,
      password: req.body.password,
    })

    req.session.user={username:user.username, _id:user._id}
    req.session.save(()=>{
      res.redirect('/structures')
    })


  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}





