import React, { useEffect, useState } from 'react';
import { Note } from '../Types';
import './NoteEditor.css';

export default function NoteEditor(props: any) {
    const focusedNote: Note = props.note;
    const [state, setState] = useState<Note>({
        title: 'No note selected',
        content: 'Select existing note or create one to get started.'
    })

    useEffect(() => {
        if (focusedNote) {
            setState(focusedNote);
        }
    }, [focusedNote]);

    const handleSaveClick = async (event: React.MouseEvent<HTMLSpanElement>): Promise<void> => {
        let url = '/notes';
        let httpMethod = 'POST';

        if (focusedNote) {
            url += `/${focusedNote._id}`;
            httpMethod = 'PUT';
        };

        try {
            const data: Note = await (await fetch(url, {
                    method: httpMethod,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(state)
                })
            ).json();

            // Add some type of error checking
            // Check against possible responses from API
            // Make use of data declared above
        } catch (error) {
            console.error(error);
        }
    
        props.updateNotes();
    }

    return (
        <section className="note-editor">
            <textarea className="focused-note-title"
                // onChange={(event) => handleChange(event, UpdateActionType.Title)}
                onChange={(event) => setState({ ...state, title: event.target.value })}
                value={state.title}
            />
            <textarea className="focused-note-content"
                onChange={(event) => setState({ ...state, content: event.target.value })}
                value={state.content}
            />
            <div className="icons">
                <span className="material-symbols-outlined"
                    onClick={handleSaveClick}
                    title="Save"
                >
                    save
                </span>
            </div>
        </section>
    );
}