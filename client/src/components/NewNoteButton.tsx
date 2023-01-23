import React from 'react';
import './NewNoteButton.css';
import Note from '../types/Note';

export default function NewNoteButton(props: any) {
    const setStatus = props.setStatus;

    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        setStatus('Creating new note in database...');

        try {
            const res = await(fetch('/notes', { method: 'POST' }));
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            props.setFocusedNote(data);
        } catch (err: any) {
            setStatus(err.message);
            return;
        }
    
        props.updateNotes();
        setStatus('Created note successfully.');
    }

    return (
        <div
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
        </div>
    );
}