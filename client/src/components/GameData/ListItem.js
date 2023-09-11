const ListItem = (props) => {
  return (
    <div>
      <h1>{props.opponent}</h1>
      <p>{props.gameDay}</p>
      <p>{props.venue}</p>
      <p>{props.time}</p>
      <p>{props.teamScore}</p>
      <p>{props.oppScore}</p>
      <p>{props.gameStatus}</p>
    </div>
  );
};

export default ListItem;
