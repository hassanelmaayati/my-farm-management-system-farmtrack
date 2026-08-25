const LogEntry = require('../models/logEntry.js');
const Animal = require('../models/animal.js');
const Structure = require('../models/structure.js');


const findOwnedAnimal = async (req) => {
  const structure = await Structure.findOne({
    _id: req.params.structureId,
    user: req.session.user._id,
  });
  if (!structure) return null;

  const animal = await Animal.findOne({
    _id: req.params.animalId,
    structure: structure._id,
  });
  return animal ? { structure, animal } : null;
};

const create = async (req, res) => {
  try {
    const owned = await findOwnedAnimal(req);
    if (!owned) return res.redirect('/structures');

    const { date, eventType } = req.body;
    if (!date || !eventType) {
      return res.render('logEntries/new.ejs', { structure: owned.structure, animal: owned.animal, error: 'Date and event type are required.' });
    }

    req.body.animal = owned.animal._id;
    await LogEntry.create(req.body);
    res.redirect(`/structures/${owned.structure._id}/animals/${owned.animal._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const renderNewForm = async (req, res) => {
  try {
    const owned = await findOwnedAnimal(req);
    if (!owned) return res.redirect('/structures');
    res.render('logEntries/new.ejs', { structure: owned.structure, animal: owned.animal });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const renderEditForm = async (req, res) => {
  try {
    const owned = await findOwnedAnimal(req);
    if (!owned) return res.redirect('/structures');

    const logEntry = await LogEntry.findOne({
      _id: req.params.id,
      animal: owned.animal._id,
    });
    if (!logEntry) return res.redirect(`/structures/${owned.structure._id}/animals/${owned.animal._id}`);

    res.render('logEntries/edit.ejs', { logEntry, structure: owned.structure, animal: owned.animal });
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const update = async (req, res) => {
  try {
    const owned = await findOwnedAnimal(req);
    if (!owned) return res.redirect('/structures');

    const logEntry = await LogEntry.findOne({
      _id: req.params.id,
      animal: owned.animal._id,
    });
    if (!logEntry) return res.redirect(`/structures/${owned.structure._id}/animals/${owned.animal._id}`);

    await LogEntry.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/structures/${owned.structure._id}/animals/${owned.animal._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

const destroy = async (req, res) => {
  try {
    const owned = await findOwnedAnimal(req);
    if (!owned) return res.redirect('/structures');

    await LogEntry.findOneAndDelete({
      _id: req.params.id,
      animal: owned.animal._id,
    });
    res.redirect(`/structures/${owned.structure._id}/animals/${owned.animal._id}`);
  } catch (err) {
    console.log(err);
    res.redirect('/structures');
  }
};

module.exports = { create, renderNewForm, renderEditForm, update, destroy };