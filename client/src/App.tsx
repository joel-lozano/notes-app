import { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import { Note, ErrorMessage } from './Types';
import './App.css';

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [focusedNote, setFocusedNote] = useState<Note | null>(null);

	const updateNotes = async (focusFirstNote = false): Promise<void> => {
		try {
			const data: Array<Note> | ErrorMessage = await (await fetch('/notes')).json();
			if (Array.isArray(data)) {
				setNotes(data);
			} else {
				throw new Error(data.message);
			}

			if (focusFirstNote) {
				if (!data.length) {
					return;
				}
				setFocusedNote(data[0]);
			}
		} catch (err: any) {
			console.error(err.message || String(err) || "Error occurred while fetching notes.");
		}
	}
	
	// Set up initial display on page load
	useEffect(() => {
		updateNotes(true);
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
