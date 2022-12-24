import Note from '../models/note.model';
import { Request, Response } from 'express';

// Helper function to eliminate string literal repetition
function idNotFoundMessage(id: string): string {
	return `Note not found with id ${id}.`;
}

export async function createOne(req: Request, res: Response) {
	const note = new Note({
		title: req.body.title || "Untitled Note",
		content: req.body.content || "Empty note"
	});

	try {
		const noteCreated = await note.save();
		res.send(noteCreated);
	} catch(err: any) {
		res.status(500).send({
			message: err.message || String(err) || "Error occurred while creating note."
		});
	}
}

export async function findAll(req: Request, res: Response) {
	try {
		const notesFound = await Note.find();
		res.send(notesFound);
	} catch(err: any) {
		res.status(500).send({
			message: err.message || String(err) || "Error occurred while retrieving notes."
		});
	}
}

export async function findOne(req: Request, res: Response) {
	const noteId = req.params.noteId;

	try {
		const noteFound = await Note.findById(noteId);

		if (!noteFound) {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		res.send(noteFound);
	} catch(err: any) {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		return res.status(500).send({
			message: `Error retrieving note with id ${noteId}.`
		});
	}
}

export async function updateOne(req: Request, res: Response) {
	const noteId = req.params.noteId;

	try {
		const modifiedNote = await Note.findByIdAndUpdate(noteId, {
			title: req.body.title || "Untitled Note",
			content: req.body.content || "Empty note"
		}, { new: true });

		if (!modifiedNote) {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		res.send(modifiedNote);
	} catch(err: any) {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		return res.status(500).send({
			message: `Error updating note with id ${noteId}.`
		});
	}
}

export async function deleteOne(req: Request, res: Response) {
	const noteId = req.params.noteId;
	
	try {
		const deletedNote = await Note.findByIdAndDelete(noteId);
		if (!deletedNote) {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		res.send({ message: "Note deleted successfully." })
	} catch(err: any) {
		if (err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: idNotFoundMessage(noteId)
			});
		}

		return res.status(500).send({
			message: `Could not delete note with id ${noteId}.`
		});
	}
}