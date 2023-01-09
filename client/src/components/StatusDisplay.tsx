import './StatusDisplay.css';

export default function StatusDisplay(props: any) {
    return (
        <div className="status-display">
            <span className="text">
                {props.status}
            </span>
            <span className="sort">

            </span>
        </div>
    );
}