import NewNoteButton from './NewNoteButton';
import './NotesList.css'

export default function NotesList(props: any) {
    const notesList: Array<JSX.Element> = props.list;

    return (
        <section className="notes-list">
            <ul>
                <NewNoteButton 
                    updateNotes={props.updateNotes}
                    focusNote={props.focusNote}
                />
                {notesList}
            </ul>
        </section>
    );
}