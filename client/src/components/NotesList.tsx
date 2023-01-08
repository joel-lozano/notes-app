import parseTimestamp from '../utils/parseTimestamp';
import NewNoteButton from './NewNoteButton';
import { useState } from 'react';
import Note from '../types/Note';
import './NotesList.css'

export default function NotesList(props: any) {
    const setFocusedNote = props.setFocusedNote;
    const [hoveredNote, setHoveredNote] = useState<Note | null>(null);
    const notesList: Array<JSX.Element> = props.notes.map((note: Note, index: number) => {
        const { date, time } = parseTimestamp(note.updatedAt);
        let background = 'transparent';

        if (note === hoveredNote) {
            background = '#DDDDDD'
        }
        
        /* 
        * New notes from database won't equal their equivalents in the notes
        * array because array members don't have access to some of database
        * notes' properties. Therefore we compare ids instead of the notes
        * themselves, so new notes can display focused background on creation.
        */
       
       if (note._id === props.focusedNote._id) {
           background = '#DDDFFF';
        }

		return (
			<li
                key={note._id}
                className="notes"
                style={{ background: background }}
                onMouseEnter={() => setHoveredNote(note)}
                onMouseLeave={() => setHoveredNote(null)}
                onClick={() => setFocusedNote(note)}
            >
                <span className="previews">
                    <div className="title-preview">
                        {note.title}
                    </div>
                    <div className="content-preview">
                        {note.content}
                    </div>
                </span>
                <span className="timestamps">
                    <div className="date">
                        {date}
                    </div>
                    <div className="time">
                        {time}
                    </div>
                </span>
			</li>
		);
	});

    return (
        <section className="notes-list">
            <ul>
                <NewNoteButton
                    updateNotes={props.updateNotes}
                    setFocusedNote={setFocusedNote}
                />
                {notesList}
            </ul>
        </section>
    );
}