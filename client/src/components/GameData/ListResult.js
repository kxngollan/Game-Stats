import ListItem from './ListItem';

const ListResult = (props) => {
  if (props.games.length === 0) {
    return <h2>Schedule Not Yet Released</h2>;
  } else {
    return (
      <ul>
        {props.games.map((game) => (
          <ListItem
            key={game.id}
            id={game.id}
            opponent={game.opponent}
            gameDay={new Date(game.gameDay).toDateString()}
            venue={game.venue}
            time={game.time}
            teamScore={game.teamScore}
            oppScore={game.oppScore}
            Result={game.gameResult}
          />
        ))}
      </ul>
    );
  }
};

export default ListResult;
