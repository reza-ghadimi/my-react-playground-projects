import './App.css'
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations.js'

import Log from './components/Log/Log.jsx'
import Player from './components/Player/Player.jsx'
import GameOver from './components/GameOver/GameOver.jsx'
import BoardGame from './components/BoardGame/BoardGame.jsx'

const INITIAL_PLAYERS = {
  X: { name: 'Player 1', symbol: 'X' },
  O: { name: 'Player 2', symbol: 'O' },
}

const INITIAL_BOARD_ITEMS = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// const INITIAL_BOARD_ITEMS =
//  Array(3).fill(null).map(() => Array(3).fill(null));

function App() {

  const [winner, setWinner] = useState(null);
  const [gameTurns, setGameTurns] = useState([]);
  const [latestPlayer, setLatestPlayer] = useState(null);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);
  const [boardGame, setBoardGame] = useState(INITIAL_BOARD_ITEMS);

  const hasWinner = Boolean(winner);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setWinner(null);
    setGameTurns([]);
    setLatestPlayer(null);
    setPlayers(INITIAL_PLAYERS);
    setBoardGame(INITIAL_BOARD_ITEMS);
  }
  
  const updatePlayerName = (symbol, newName) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: { ...prevPlayers[symbol], name: newName },
    }));
  };

  function onCellClick(rowIndex, columnIndex) {
    let currentPlayer = latestPlayer === 'X' ? 'O' : 'X';
    setLatestPlayer(currentPlayer);

    const updatedBoard = boardGame.map(row => [...row]);
    updatedBoard[rowIndex][columnIndex] = currentPlayer;
    setBoardGame(updatedBoard);

    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { square: { row: rowIndex, column: columnIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });

    checkGameWinner(updatedBoard, currentPlayer);
  }

  const checkGameWinner = (board, currentPlayer) => {
    const playerMoves = [];

    board.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === currentPlayer) {
          playerMoves.push({ row: rowIndex, column: colIndex });
        }
      });
    });

    WINNING_COMBINATIONS.forEach(winningOption => {
      let matchCount = 0;

      winningOption.forEach(winPos => {
        playerMoves.forEach(playerMove => {
          if (winPos.row === playerMove.row && winPos.column === playerMove.column) {
            matchCount++;
          }
        });
      });

      if (matchCount === winningOption.length) {
        setWinner(currentPlayer);
      }
    });
  }

  return (
    <div>
      <div id='container'>
        <h1>Tic-Tac-Toe</h1>
        <div className='players'>
          <ol>
            {Object.entries(players).map(([symbol, player]) => (
              <Player
                key={symbol}
                name={player.name}
                symbol={player.symbol}
                onNameChange={newName => updatePlayerName(symbol, newName)}
              />
            ))}
          </ol>
        </div>

        <BoardGame boardGame={boardGame} onCellClick={onCellClick} />

        {(hasWinner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
      </div>

      <Log turns={gameTurns} />
    </div>
  )
}

export default App
