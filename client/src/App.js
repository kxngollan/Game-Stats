import { useCallback, useEffect, useState } from 'react';
import './App.css';
import UserInput from './components/UserInputs/UserInput';
import ListResult from './components/GameData/ListResult';

function App() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const FetchGameData = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api');
      if (!response.ok) {
        throw new Error('Something went wrong when receiving data');
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
        gameResult: data[key].gameResult,
      }));

      const sortedGames = [...teamGameDays].sort(
        (game1, game2) => new Date(game1.date) - new Date(game2.date)
      );

      setGames(sortedGames);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    FetchGameData();
  }, [FetchGameData]);

  const onGameSubmission = async (game) => {
    try {
      const response = await fetch('http://localhost:8000/api/addgame', {
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      await response.json();
      FetchGameData();
      console.log(games);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <UserInput onAddGameDay={onGameSubmission} />
      {!error && <ListResult games={games} />}
      {error && <h2>{error}</h2>}
    </div>
  );
}

export default App;
