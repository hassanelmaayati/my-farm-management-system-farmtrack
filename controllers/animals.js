const Animal = require('../models/animal.js');
const Structure = require('../models/structure.js');
const LogEntry = require('../models/logEntry.js');

const create = async (req, res) => {
  try {
    const structure = await Structure.findOne({ _id: req.params.structureId, user: req.session.user._id });
    if (!structure) return res.redirect('/structures');

    const { name, species } = req.body;
    if (!name || !name.trim() || !species || !species.trim()) {
      return res.render('animals/new.ejs', { structure, error: 'Name and species are required.' });
    }

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

    const logs = await LogEntry.find({ animal: animal._id }).sort({ date: -1 });

    res.render('animals/show.ejs', { animal, structure, logs });
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
    res.render('animals/new.ejs', { structure, error: null });
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

    res.render('animals/edit.ejs', { animal, structure, error: null });
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

    const { name, species } = req.body;
    if (!name || !name.trim() || !species || !species.trim()) {
      return res.render('animals/edit.ejs', { animal, structure, error: 'Name and species are required.' });
    }

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
