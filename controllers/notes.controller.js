const Note = require('../models/note.model');
const asyncHandler = require('express-async-handler');

// Get all notes
exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.findAll({
    order: [['createdAt', 'DESC']]
  });
  res.status(200).json({
    status: 'success',
    data: { notes }
  });
});

// Create a new note
exports.createNote = asyncHandler(async (req, res) => {
  const { title, content, tags } = req.body;
  
  if (!title || !content) {
    res.status(400);
    throw new Error('Please provide title and content for the note');
  }
  
  const note = await Note.create({ 
    title, 
    content,
    tags: tags || []
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Catatan berhasil ditambahkan',
    data: {
      noteId: note.id,
      note
    }
  });
});

// Get a single note by ID
exports.getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const note = await Note.findByPk(id);
  
  if (!note) {
    res.status(404);
    throw new Error('Catatan tidak ditemukan');
  }
  
  res.status(200).json({
    status: 'success',
    data: { note }
  });
});

// Update a note
exports.updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;
  
  const note = await Note.findByPk(id);
  
  if (!note) {
    res.status(404);
    throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
  }
  
  // Update note properties
  if (title) note.title = title;
  if (content) note.content = content;
  if (tags) note.tags = tags;
  
  // Save the updated note
  await note.save();
  
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
    data: { note }
  });
});

// Delete a note
exports.deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const note = await Note.findByPk(id);
  
  if (!note) {
    res.status(404);
    throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
  }
  
  await note.destroy();
  
  res.status(200).json({
    status: 'success',
    message: 'Catatan berhasil dihapus'
  });
});
