import NewNoteButton from './NewNoteButton';
import parseTimestamp from '../utils/parseTimestamp';
import { Note } from '../Types';
import './NotesList.css'

export default function NotesList(props: any) {
    const focusNote = props.focusNote;
    const notesList: Array<JSX.Element> = props.notes.map((note: Note) => {
        const { date, time } = parseTimestamp(note.updatedAt);
		return (
			<li key={note._id} onClick={() => focusNote(note)} className="notes">
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
                    focusNote={focusNote}
                />
                {notesList}
            </ul>
        </section>
    );
}