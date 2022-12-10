import { useState, useEffect, useRef } from 'react'

function App() {
	const [notes, setNotes] = useState([]);
	const inputRef = useRef(null);

	useEffect(() => {
		fetch('/notes')
			.then((res) => res.json())
			.then((data) => setNotes(data))
			.catch((err) => console.log(err));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				'title': inputRef.current.value,
				'content': 'New Note'
			}),
		}

		fetch('/notes', requestOptions)
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error(res.message);
			})
			.catch((err) =>{
				console.log(err);
			});
	}

	const notesList = notes.map((note) => {
		return (
			<li key={note._id}>{note.title}</li>
		);
	});

	return (
		<div className="App">
			<header className="App-header">
				<p>Welcome to the notes app!</p>
				<form onSubmit={handleSubmit}>
					<label htmlFor="new-note-input">Note name:</label>
					<input type="text" id="new-note-input" ref={inputRef} />
					<input type="submit" />
				</form>
			</header>
			<div className="notes-list">
				<h3>Current notes:</h3>
				<ul>{!notesList ? "No notes" : notesList}</ul>
				{/* <p>{notes}</p> */}
			</div>
		</div>
	);
}

export default App;
