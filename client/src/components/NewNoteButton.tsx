import React from 'react';
import './NewNoteButton.css';
import { Note } from '../Types'

export default function NewNoteButton(props: any) {
    const handleClick = async (event: React.MouseEvent<HTMLLIElement>): Promise<void> => {
        try {
            const data: Note = await (
                await fetch('/notes', { method: 'POST' })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above

            props.setFocusedNote(data);
        } catch (error) {
            console.error(error);
        }
    
        props.updateNotes();
    }

    return (
        <li className="new-note-button" onClick={handleClick}>
            <span className="material-symbols-outlined">
                note_add
            </span>
            <span>
                Create new note
            </span>
        </li>
    );
}