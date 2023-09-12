import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB = 'mongodb://localhost:27017/TeamSchedule';

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
  id: String,
  opponent: String,
  gameDay: String,
  venue: String,
  time: String,
  teamScore: String,
  oppScore: String,
  gameResult: String,
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
    const {
      id,
      opponent,
      gameDay,
      venue,
      teamScore,
      oppScore,
      gameResult,
      time,
    } = req.body;
    const newGame = new Game({
      id: id,
      opponent: opponent,
      gameDay: gameDay,
      venue: venue,
      teamScore: teamScore,
      oppScore: oppScore,
      gameResult: gameResult,
      time: time,
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
