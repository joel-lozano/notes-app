import appConfig from '../config/app.config';
import './NewNoteButton.css';
import React from 'react';

export default function NewNoteButton(props: any) {
    const setStatus = props.setStatus;

    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        setStatus('Creating new note in database...');

        try {
            const res = await(fetch(appConfig.destination, { method: 'POST' }));
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