import { useState } from 'react';

const GameDetails = (props) => {
  const [opponent, setOpponent] = useState('');
  const [gameDay, setGameDay] = useState('');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');
  const [teamScore, setTeamScore] = useState('');
  const [oppScore, setOppScore] = useState('');
  const [gameResult, setGameResult] = useState('');

  const onGameDayChange = (event) => {
    setGameDay(event.target.value);
  };

  const onOpponentChange = (event) => {
    setOpponent(event.target.value);
  };

  const onVenueChange = (event) => {
    setVenue(event.target.value);
  };

  const onTimeChange = (event) => {
    setTime(event.target.value);
  };

  const onTeamScoreChange = (event) => {
    setTeamScore(event.target.value);
  };

  const onOpponentScoreChange = (event) => {
    setOppScore(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const gameDayData = {
      opponent: opponent,
      gameDay: gameDay,
      venue: venue,
      time: time,
      teamScore: teamScore,
      oppScore: oppScore,
      gameResult: gameResult,
      id: Math.random().toString(),
    };
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>Date</label>
      <input type="date" value={gameDay} onChange={onGameDayChange} />
      <br />
      <label>Opponent</label>
      <input type="text" value={opponent} onChange={onOpponentChange} />
      <br />
      <label>Venue</label>
      <select onChange={onVenueChange}>
        <option value={venue}>Home</option>
        <option value={venue}>Away</option>
      </select>
      <br />
      <label>Time</label>
      <input type="time" value={time} onChange={onTimeChange} />
      <br />
      <label>Team Score</label>
      <input
        type="number"
        value={teamScore}
        min={0}
        max={1000}
        step={1}
        onChange={onTeamScoreChange}
      />
      <br />
      <label>Opponent Score</label>
      <input
        type="number"
        value={oppScore}
        min={0}
        max={1000}
        step={1}
        onChange={onOpponentScoreChange}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};
export default GameDetails;
