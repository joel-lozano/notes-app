import React, { useState } from 'react';
import { Note } from '../Types';
import './NoteEditor.css';

export default function NoteEditor(props: any) {
    const focusedNote: Note = props.note;

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

    }

    return (
        <section className="note-editor">
            <div className="focused-note-title">
                {/* <textarea onChange={handleChange}> */}
                    {focusedNote ? focusedNote.title : "No note selected"}
                {/* </textarea> */}
            </div>
            <div className="focused-note-content">
                {focusedNote ? focusedNote.content : "Select existing note or create one to get started."}
            </div>
            <div className="icons">
                <span className="material-symbols-outlined">
                    save
                </span>
            </div>
        </section>
    );
}