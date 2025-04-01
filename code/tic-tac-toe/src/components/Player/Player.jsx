import './Player.css';
import { useState } from 'react';

export default function Player({ name, symbol, onNameChange }) {
    const [playerName, setPlayerName] = useState(name);
    const [isEditable, setIsEditable] = useState(false);

    function toggleEditMode() {
        if (isEditable) {
            onNameChange(playerName);
        }

        setIsEditable(editable => !editable);
    }

    return (
        <li className='player'>
            {
                isEditable ?
                    <input className='player-input' value={playerName} maxLength={10} onChange={(e) => setPlayerName(e.target.value)} /> :
                    <span>{playerName} [ {symbol} ]</span>
            }

            <button onClick={toggleEditMode}>
                {isEditable ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}