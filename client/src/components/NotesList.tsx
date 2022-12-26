import './NotesList.css'

export default function NotesList(props: any) {
    const notesList: Array<JSX.Element> = props.list;

    return (
        <section className="notes-list">
            <ul>{notesList.length === 0 ? "No notes" : notesList}</ul>
        </section>
    );
}