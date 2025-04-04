import './BoardGame.css';

export default function BoardGame({ boardGame, onCellClick }) {
    return (
        <ol id="game-board">
            {boardGame.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((cellValue, columnIndex) => (
                            <li key={columnIndex}>
                                <button
                                    onClick={() => onCellClick(rowIndex, columnIndex)}
                                    disabled={!!cellValue}
                                >
                                    {cellValue}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
