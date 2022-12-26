import React, { useState, useEffect, useRef } from 'react';
import { Note, ErrorMessage } from './Types';
import './App.css';

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [focusedNote, setFocusedNote] = useState<Note | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	async function refreshNotes(): Promise<void> {
		try {
			const data: Array<Note> | ErrorMessage = await (await fetch('/notes')).json();
			if (Array.isArray(data)) {
				setNotes(data);
			} else {
				throw new Error(data.message);
			}
		} catch (error: any) {
			let message;
			if (error instanceof Error) {
				message = error.message;
			} else {
				message = String(error);
			}

			console.error(message);
		}
	}
	
	// Fetch existing notes on page load
	useEffect(() => {
		refreshNotes();
	}, []);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'title': inputRef.current?.value,
				'content': 'New Note'
			}),
		};

		(async (): Promise<void> => {
			try {
				const data: Note = await (
					await fetch('/notes', requestOptions)
				).json();

				// Add some type of error checking
				// Check against possible responses from API
				// Make use of data declared above

				console.log('Note created successfully');
			} catch (error) {
				console.error(error);
			}
		})();

		refreshNotes();
	}

	const notesList = notes.map((note) => {
		return (
			<li key={note._id} onClick={() => setFocusedNote(note)}>
				<div className="note-title-preview">
					{note.title}
				</div>
				<div className="note-content-preview">
					{note.content}
				</div>
			</li>
		);
	});

	return (
		<div className="App">
			<header>
				<form onSubmit={handleSubmit}>
					<label htmlFor="new-note-input">Note name:</label>
					<input type="text" id="new-note-input" ref={inputRef} />
					<input type="submit" />
				</form>
			</header>
			<main>
				<section className="note-viewer">
					<div className="current-note-title">
						{focusedNote ? focusedNote.title : "No note selected"}
					</div>
					<div className="current-note-content">
						{focusedNote ? focusedNote.content : "Select existing note or create new..."}
					</div>
				</section>
				<section className="notes-list">
					<ul>{notesList.length === 0 ? "No notes" : notesList}</ul>
				</section>
			</main>
		</div>
	);
}

export default App;
