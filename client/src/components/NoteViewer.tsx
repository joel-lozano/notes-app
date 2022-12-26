import { Note } from '../Types';
import './NoteViewer.css';

export default function NoteViewer(props: any) {
    const focusedNote: Note = props.note;

    return (
        <section className="note-viewer">
            <div className="focused-note-title">
                {focusedNote ? focusedNote.title : "No note selected"}
            </div>
            <div className="focused-note-content">
                {focusedNote ? focusedNote.content : "Select existing note or create one to get started."}
            </div>
        </section>
    );
}