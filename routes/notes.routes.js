const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');

// Get all notes
router.get('/', notesController.getNotes);

// Create a new note
router.post('/', notesController.createNote);

// Get a single note by ID
router.get('/:id', notesController.getNote);

// Update a note
router.put('/:id', notesController.updateNote);

// Delete a note
router.delete('/:id', notesController.deleteNote);

module.exports = router;
