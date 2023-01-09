import parseTimestamp from '../utils/parseTimestamp';
import NewNoteButton from './NewNoteButton';
import StatusDisplay from './StatusDisplay';
import { useState } from 'react';
import Note from '../types/Note';
import './NotesList.css'

export default function NotesList(props: any) {
    const setFocusedNote = props.setFocusedNote;
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    const notesList: Array<JSX.Element> = props.notes.map((note: Note, index: number) => {
        const { date, time } = parseTimestamp(note.updatedAt);
        let background = 'transparent';

        if (index === hoveredIndex) {
            background = '#DDDDDD';
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
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
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
        <section className="right-column">
            <StatusDisplay status={props.status} />
            <ul className="notes-list">
                <NewNoteButton
                    setStatus={props.setStatus}
                    updateNotes={props.updateNotes}
                    setFocusedNote={setFocusedNote}
                />
                {notesList}
            </ul>
        </section>
    );
}