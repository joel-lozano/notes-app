import parseTimestamp from '../utils/parseTimestamp';
import NewNoteButton from './NewNoteButton';
import StatusDisplay from './StatusDisplay';
import { useState } from 'react';
import Note from '../types/Note';
import './NotesList.css'

export default function NotesList(props: any) {
    const setFocusedNote = props.setFocusedNote;
    const [ focusedIndex, setFocusedIndex ] = useState<number>(0);
    
    const notesList: Array<JSX.Element> = props.notes.map((note: Note, index: number) => {
        const handleClick = () => {
            setFocusedNote(note);    
            setFocusedIndex(index);
        };

        const { date, time } = parseTimestamp(note.updatedAt);
        let background = undefined;
       
        if (index === focusedIndex) {
           background = 'var(--current-note-active-bg)';
        }

		return (
			<li
                key={note._id}
                className="notes"
                style={{ background: background }}
                onClick={handleClick}
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
            <div className="list-header">
                <StatusDisplay
                    notes={props.notes}
                    status={props.status}
                    setNotes={props.setNotes}
                />
                <NewNoteButton
                    setStatus={props.setStatus}
                    updateNotes={props.updateNotes}
                    setFocusedNote={setFocusedNote}
                />
            </div>
            <ul className="notes-list">
                {notesList}
            </ul>
        </section>
    );
}