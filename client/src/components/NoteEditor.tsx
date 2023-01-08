import React, { useEffect, useState, useRef } from 'react';
import Note from '../types/Note';
import './NoteEditor.css';

export default function NoteEditor(props: any) {
    const focusedNote = props.note;
    const [state, setState] = useState<Note>(focusedNote);

    // Using a ref to avoid useEffect firing on initial render
    // since state is already initialized to focusedNote
    const initialRender = useRef<boolean>(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            setState(focusedNote);
        }
    }, [focusedNote]);

    const handleSaveClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!focusedNote._id) {
            return;
        }

        try {
            const data: Note = await(
                await fetch(`/notes/${focusedNote._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(state)
                })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above
        } catch (err: any) {
            console.error(err.message);
        }
    
        props.updateNotes();
    }

    const handleDeleteClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!focusedNote._id) {
            return;
        }

        try {
            const data: Note = await(
                await fetch(`/notes/${focusedNote._id}`, {
                    method: 'DELETE',
                })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above
        } catch (err: any) {
            console.error(err.message);
        }
    
        props.updateNotes(true);
    }

    return (
        <section className="note-editor">
            <textarea
                className="focused-note-title"
                onChange={(event) => setState({ ...state, title: event.target.value })}
                value={state.title}
            />
            <textarea
                className="focused-note-content"
                onChange={(event) => setState({ ...state, content: event.target.value })}
                value={state.content}
            />
            <div className="icons">
                <span
                    className="material-symbols-outlined"
                    onClick={handleSaveClick}
                    title="Save"
                >
                    save
                </span>
                <span
                    className="material-symbols-outlined"
                    onClick={handleDeleteClick}
                    title="Delete"
                >
                    delete
                </span>
            </div>
        </section>
    );
}