import './Input.css';

export default function Input({ type, required, label, initialValue, onChange }) {
    return (
        <div className="input-group">
            <label className="input-label">{label}</label>

            <input type={type} className="input-field"
                value={initialValue}
                required={required}
                onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}