import { useState } from 'react';

const GameDetails = (props) => {
  const [opponent, setOpponent] = useState('');
  const [gameDay, setGameDay] = useState('');
  const [venue, setVenue] = useState('');
  const [time, setTime] = useState('');
  const [teamScore, setTeamScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [gameResult, setGameResult] = useState('');

  const onGameDayChange = (event) => {
    setGameDay(event.target.value);
  };

  const onResultChange = (event) => {
    console.log(event.target.value);
    setGameResult(event.target.value);
  };

  const onOpponentChange = (event) => {
    setOpponent(event.target.value);
  };

  const onVenueChange = (event) => {
    console.log(event.target.value);
    setVenue(event.target.value);
  };

  const onTimeChange = (event) => {
    console.log(event.target.value);
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
      id: Math.random().toString(),
      opponent: opponent,
      gameDay: gameDay,
      venue: venue,
      time: time,
      teamScore: teamScore,
      oppScore: oppScore,
      gameResult: gameResult,
    };

    props.onAddGame(gameDayData);

    setOpponent('');
    setGameDay('');
    setVenue('');
    setTime('');
    setTeamScore(0);
    setOppScore(0);
    setGameResult('');
  };

  return (
    <form onSubmit={onFormSubmit}>
      <label>Date</label>
      <input type="date" value={gameDay} onChange={onGameDayChange} />
      <br />
      <label>Result</label>
      <select value={gameResult} onChange={onResultChange}>
        <option value="Scheduled">Scheduled</option>
        <option value="Win">Win</option>
        <option value="Lose">Lose</option>
        <option value="Delayed">Delayed</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <br />
      <label>Opponent</label>
      <input type="text" value={opponent} onChange={onOpponentChange} />
      <br />
      <label>Venue</label>
      <select value={venue} onChange={onVenueChange}>
        <option value="Home">Home</option>
        <option value="Away">Away</option>
        <option value="Undetermined">Undetermined</option>
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
        max={300}
        step={1}
        onChange={onTeamScoreChange}
      />
      <br />
      <label>Opponent Score</label>
      <input
        type="number"
        value={oppScore}
        min={0}
        max={300}
        step={1}
        onChange={onOpponentScoreChange}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};
export default GameDetails;
