import NewNoteButton from './NewNoteButton';
import './NotesList.css'

export default function NotesList(props: any) {
    const notesList: Array<JSX.Element> = props.list;

    return (
        <section className="notes-list">
            <ul>
                <NewNoteButton 
                    refreshNotes={props.refreshNotes}
                    focusNote={props.focusNote}
                />
                {notesList}
            </ul>
        </section>
    );
}