import React, { useState, useEffect, useRef } from 'react';
import { Note, ErrorMessage } from './Types';
import './App.css';

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
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
				// Make use of data declared above

				console.log('Note created successfully');
			} catch (error) {
				console.error(error);
			}
		})();

		// fetch('/notes', requestOptions)
		// 	.then((res: Response) => console.log(res.json()))
		// 	.catch((err: Error) => console.log(err));

		refreshNotes();
	}

	const notesList = notes.map((note) => {
		return (
			<li key={note._id}>{note.title}</li>
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
						Place
					</div>
					<div className="current-note-content">
						Holder
					</div>
				</section>
				<section className="notes-list">
					<h3>Notes:</h3>
					<ul>{notesList.length === 0 ? "No notes" : notesList}</ul>
				</section>
			</main>
		</div>
	);
}

export default App;
