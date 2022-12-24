import express from 'express';
import * as notes from '../controllers/note.controller';

const router = express.Router();

// Create a new note
router.post('/', notes.createOne);

// Retrieve all notes
router.get('/', notes.findAll);

// Retreive single note with noteId
router.get('/:noteId', notes.findOne);

// Update a note with noteId
router.put('/:noteId', notes.updateOne);

// Delete a note with noteId
router.delete('/:noteId', notes.deleteOne);

export default router;