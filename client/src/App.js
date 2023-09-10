import { useCallback, useEffect, useState } from 'react';
import './App.css';
import UserInput from './components/UserInputs/UserInput';

function App() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Game Data
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

  useEffect(() => {
    FetchGameData;
  }, [FetchGameData]);

  //Add Game Submission
  const onGameSubmission = async (game) => {
    try {
      const response = await fetch('http://localhost:8000/api/addgame', {
        method: 'POST',
        body: JSON.stringify(task),
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <UserInput onAddGameDay={onGameSubmission} />
    </div>
  );
}

export default App;
