import './App.css'
import { useState } from 'react';
import Player from './components/Player/Player.jsx'
import BoardGame from './components/BoardGame/BoardGame.jsx'

const INITIAL_PLAYERS = {
  X: { name: 'Player 1', symbol: 'X' },
  O: { name: 'Player 2', symbol: 'O' },
}


function App() {
  const [players, setPlayers] = useState(INITIAL_PLAYERS);

  const updatePlayerName = (symbol, newName) => {
    setPlayers(prevPlayers => ({
      ...prevPlayers,
      [symbol]: { ...prevPlayers[symbol], name: newName },
    }));
  };

  return (
    <div id='container'>
      <h1>Tic-Tac-Toe</h1>
      <div className='players'>
        <ol>
          {console.log(`X: ${players.X.name} and O: ${players.O.name}`)}
          <Player name={players.X.name} symbol={players.X.symbol} onNameChange={(newName) => updatePlayerName(players.X.symbol, newName)} />
          <Player name={players.O.name} symbol={players.O.symbol} onNameChange={(newName) => updatePlayerName(players.O.symbol, newName)} />
        </ol>
      </div>

      <BoardGame />
    </div>
  )
}

export default App
