import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB = 'mongodb://localhost:27017';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const gameSchema = new mongoose.Schema({
  opponent: String,
  location: String,
  date: String,
  teamScore: Number,
  opponentScore: Number,
  id: String,
  status: String,
});

const Game = mongoose.model('Game', gameSchema);

app.get('/api', async (req, res) => {
  try {
    const allGames = await Game.find();
    res.json(allGames);
  } catch (error) {
    console.error('Error fetching game data!');
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/addgame', async (req, res) => {
  try {
    const { id, opponent, date, location, teamScore, opponentScore, status } =
      req.body;
    const newGame = new Game({
      id: id,
      opponent: opponent,
      date: date,
      location: location,
      teamScore: teamScore,
      opponentScore: opponentScore,
      status: status,
    });

    const gameSavedId = newGame.id;
    await newGame.save();
    console.log('Game added to Website ', gameSavedId);
    res.status(201).json({ message: 'Game added successfully' });
  } catch (error) {
    console.error('Error adding game to Database: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
