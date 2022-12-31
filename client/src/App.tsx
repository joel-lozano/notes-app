import { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import { Note, ErrorMessage } from './Types';
import './App.css';

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [focusedNote, setFocusedNote] = useState<Note | null>(null);

	const updateNotes = async (): Promise<void> => {
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
		updateNotes();
	}, []);

	return (
		<div className="App">
			<main>
				<NoteEditor
					note={focusedNote}
					updateNotes={updateNotes}
				/>
				<NotesList
					notes={notes}
					updateNotes={updateNotes}
					focusNote={setFocusedNote}
				/>
			</main>
		</div>
	);
}

export default App;
