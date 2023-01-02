import NewNoteButton from './NewNoteButton';
import { Note } from '../Types';
import './NotesList.css'

export default function NotesList(props: any) {
    const focusNote = props.focusNote;
    const notesList: Array<JSX.Element> = props.notes.map((note: Note) => {
		return (
			<li key={note._id} onClick={() => focusNote(note)} className="notes">
                <span className="note-previews">
                    <div className="note-title-preview">
                        {note.title}
                    </div>
                    <div className="note-content-preview">
                        {note.content}
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
                    focusNote={focusNote}
                />
                {notesList}
            </ul>
        </section>
    );
}