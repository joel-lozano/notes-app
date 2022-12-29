import { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import { Note, ErrorMessage } from './Types';
import './App.css';

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [focusedNote, setFocusedNote] = useState<Note | null>(null);

	const refreshNotes = async (): Promise<void> => {
		try {
			const data: Array<Note> | ErrorMessage = await (await fetch('/notes')).json();
			if (Array.isArray(data)) {
				setNotes(data);
			} else {
				throw new Error(data.message);
			}
		} catch (err: any) {
			console.error(err.message || String(err) || "Error occurred while fetching notes.");
		}
	}
	
	// Fetch existing notes on page load
	useEffect(() => {
		refreshNotes();
	}, []);

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
			<main>
				<NoteEditor note={focusedNote}/>
				<NotesList list={notesList}
					refreshNotes={refreshNotes}
					focusNote={setFocusedNote}
				/>
			</main>
		</div>
	);
}

export default App;
