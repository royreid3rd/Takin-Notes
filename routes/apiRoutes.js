const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

// Read notes from db.json
router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
  res.json(notes);
});

// Add a new note
router.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };

  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
  notes.push(newNote);

  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

  res.json(newNote);
});

module.exports = router;
