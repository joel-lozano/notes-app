import React, { useEffect, useState, useRef } from 'react';
import appConfig from '../config/app.config';
import Note from '../types/Note';
import './NoteEditor.css';

export default function NoteEditor(props: any) {
    const focusedNote = props.note;
    const setStatus = props.setStatus;
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
        
        setStatus('Saving note to database...');

        try {
            const res = await fetch(`${appConfig.destination}/${focusedNote._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(state)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }
        } catch (err: any) {
            setStatus(err.message);
            return;
        }
    
        props.updateNotes();
        setStatus('Saved note successfully.');
    }

    const handleDeleteClick = async (event: React.MouseEvent<HTMLSpanElement>) => {
        if (!focusedNote._id) {
            return;
        }

        setStatus('Deleting note from database...');

        try {
            const res = await fetch(`${appConfig.destination}/${focusedNote._id}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }
        } catch (err: any) {
            setStatus(err.message);
            return;
        }
    
        props.updateNotes(true);
        setStatus('Deleted note successfully.');
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