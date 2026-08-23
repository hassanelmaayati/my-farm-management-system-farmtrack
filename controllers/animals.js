const Animal = require('../models/animal.js');
const Structure = require('../models/structure.js');

const create = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    req.body.structure = structure._id;
    await Animal.create(req.body);
    res.redirect(`/structures/${structure._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const show = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    const animal = await Animal.findOne({
      _id: req.params.id,
      structure: structure._id,
    });
    if (!animal) return res.redirect(`/structures/${structure._id}`);

    res.render('animals/show.ejs', { animal, structure });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const renderNewForm = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');
    res.render('animals/new.ejs', { structure });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const renderEditForm = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    const animal = await Animal.findOne({
      _id: req.params.id,
      structure: structure._id,
    });
    if (!animal) return res.redirect(`/structures/${structure._id}`);

    res.render('animals/edit.ejs', { animal, structure });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const update = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    const animal = await Animal.findOne({
      _id: req.params.id,
      structure: structure._id,
    });
    if (!animal) return res.redirect(`/structures/${structure._id}`);

    await Animal.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/structures/${structure._id}/animals/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const destroy = async (req, res) => {
  try {
    const structure = await Structure.findOne({
      _id: req.params.structureId,
      user: req.session.user._id,
    });
    if (!structure) return res.redirect('/structures');

    await Animal.findOneAndDelete({
      _id: req.params.id,
      structure: structure._id,
    });
    res.redirect(`/structures/${structure._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

module.exports = { create, show, renderNewForm, renderEditForm, update, destroy };