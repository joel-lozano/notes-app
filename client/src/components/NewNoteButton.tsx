import './NewNoteButton.css';

export default function NewNoteButton() {
    return (
        <li className="new-note-button">
            <span className="material-symbols-outlined">
                note_add
            </span>
            <span>
                Create new note
            </span>
        </li>
    );
}