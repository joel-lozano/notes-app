import { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NotesList from './components/NotesList';
import Note from './types/Note';
import './App.css';

const defaultNote: Note = {
	title: 'No notes',
	content: 'Create one to get started.'
};

function App() {
	const [notes, setNotes] = useState<Array<Note>>([]);
	const [status, setStatus] = useState<string>('');
	const [focusedNote, setFocusedNote] = useState<Note>(defaultNote);

	useEffect(() => { console.log(status) }, [status]);

	const updateNotes = async (focusFirstNote=false, updateStatus=false) => {
		setStatus('Getting notes from database...');

		try {
			const data: Array<Note> | { message: string } = await(
				await fetch('/notes')
			).json();

			if (Array.isArray(data)) {
				setNotes(data);
			} else {
				throw new Error(data.message);
			}

			if (focusFirstNote) {
				setFocusedNote(data.length? data[0] : defaultNote);
			}
		} catch (err: any) {
			setStatus(err.message);
		}

		if (updateStatus) {
			setStatus('Updated notes successfully.');
		}
	}
	
	// Set up initial display on page load
	useEffect(() => {
		updateNotes(true, true);
	}, []);

	return (
		<div className="App">
			<main>
				<NoteEditor
					note={focusedNote}
					setStatus={setStatus}
					updateNotes={updateNotes}
				/>
				<NotesList
					notes={notes}
					status={status}
					setStatus={setStatus}
					updateNotes={updateNotes}
					focusedNote={focusedNote}
					setFocusedNote={setFocusedNote}
				/>
			</main>
		</div>
	);
}

export default App;
