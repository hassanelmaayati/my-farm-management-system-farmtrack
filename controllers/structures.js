const Structure= require ('../models/structure.js')
const index= async(req,res)=>{
  try{
    const structures = await Structure.find({user: req.session.user._id})
    res.render('structures/index.ejs', {structures})

  }catch(err){
    console.log(err)
    res.redirect('/')
  }
}

const create =async (req,res)=>{
  try{
    req.body.user=req.session.user._id
    await Structure.create(req.body)
    res.redirect('/structures')
  }catch(err){
    console.log(err)
    res.redirect('/structures')
  }
}

const show=async(req,res)=>{
try{
  const structure=await Structure.findOne({
    _id: req.params.id,
    user:req.session.user._id,
  })
  if(!structure) return res.redirect('/structures')
    res.render('structures/show.ejs',{structure})
}catch(err){
  console.log(err)
  res.redirect('/structers')
}
}
const renderEditForm = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.id,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');
    res.render('structures/edit.ejs', { structure });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const update = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.id,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    await Structure.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/structures/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const destroy = async (req, res) => {
  try {
    await Structure.findOneAndDelete({
      _id: req.params.id,
      user: req.session.user._id,
    });
    res.redirect('/structures');
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

module.exports = { index, create, show, renderNewForm, renderEditForm, update, destroy };

