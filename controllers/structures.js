const Structure = require('../models/structure.js')
const Animal = require('../models/animal.js') 

const index = async (req, res) => {
  try {
    const structures = await Structure.find({ user: req.session.user._id })
    res.render('structures/index.ejs', { structures })
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const renderNewForm = (req, res) => {
  res.render('structures/new.ejs', { error: null });
};

const create = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !name.trim() || !type) {
      return res.render('structures/new.ejs', { error: 'Name and type are required.' });
    }
    req.body.user = req.session.user._id;
    await Structure.create(req.body);
    res.redirect('/structures');
  } catch (err) {
    console.log(err);
    res.render('structures/new.ejs', { error: 'Something went wrong. Try again.' });
  }
};

const show = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.id,
      user: req.session.user._id,
    })
    if (!structure) return res.redirect('/structures')

    const animals = await Animal.find({ structure: structure._id }) 

    res.render('structures/show.ejs', { structure, animals }) 
  } catch (err) {
    console.log(err)
    res.redirect('/structures')
  }
}

const renderEditForm = async (req, res) => {
  try {
    const structure = await Structure.findOne({ _id: req.params.id, user: req.session.user._id });
    if (!structure) return res.redirect('/structures');
    res.render('structures/edit.ejs', { structure, error: null });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const update = async (req, res) => {
  try {
    const { name, type } = req.body;
    const structure = await Structure.findOne({ _id: req.params.id, user: req.session.user._id });
    if (!structure) return res.redirect('/structures');

    if (!name || !name.trim() || !type) {
      return res.render('structures/edit.ejs', { structure, error: 'Name and type are required.' });
    }

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