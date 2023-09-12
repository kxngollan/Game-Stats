import GameDetails from './GameDetails.js';

const UserInput = (props) => {
  return <GameDetails onAddGame={props.onAddGameDay} />;
};

export default UserInput;
