import GameDetails from './GameDetails.js';

const UserInput = (props) => {
  return <GameDetails onAddGame={props.onAddGame} />;
};

export default UserInput;
