import './StatusDisplay.css';
import SortDropdown from './SortDropdown';

export default function StatusDisplay(props: any) {
    return (
        <div className="status-display">
            <span className="status-container">
                <div className="status">
                    {props.status}
                </div>
            </span>
            <span className="sort-container">
                <SortDropdown notes={props.notes} setNotes={props.setNotes} />
            </span>
        </div>
    );
}