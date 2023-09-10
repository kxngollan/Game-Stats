import { useCallback, useState } from 'react';
import './App.css';
import UserInput from './components/UserInputs/UserInput';

function App() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const FetchGameData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api');
      if (!response.ok) {
        throw new Error('Something went wrong when recieving data');
      }
      const data = await response.json();

      const teamGameDays = Object.keys(data).map((key) => ({
        id: data[key].id,
        opponent: data[key].opponent,
        gameDay: data[key].gameDay,
        venue: data[key].venue,
        time: data[key].time,
        teamScore: data[key].teamScore,
        oppScore: data[key].oppScore,
        gameStatus: data[key].gameStatus,
      }));

      const sortedGames = [...teamGameDays].sort((game1, game2) => {
        new Date(game1.date) - new Date(game2.date);
      });

      setGames(sortedGames);
    } catch (error) {
      setError(error.message);
    }
  });

  const onGameSubmission = (game) => {};

  return (
    <div className="App">
      <UserInput onAddGameDay={onGameSubmission} />
    </div>
  );
}

export default App;
