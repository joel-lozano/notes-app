import React from 'react';
import './NewNoteButton.css';
import Note from '../types/Note';

export default function NewNoteButton(props: any) {
    const setStatus = props.setStatus;

    const handleClick = async (event: React.MouseEvent<HTMLLIElement>) => {
        setStatus('Creating new note in database...');

        try {
            const data: Note = await(
                await fetch('/notes', { method: 'POST' })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above

            props.setFocusedNote(data);
        } catch (err: any) {
            console.error(err.message);
        }
    
        props.updateNotes();
        setStatus('Created note successfully.');
    }

    return (
        <li
            key="new-note-button"
            className="new-note-button"
            onClick={handleClick}
        >
            <span className="material-symbols-outlined">
                note_add
            </span>
            <span>
                Create new note
            </span>
        </li>
    );
}