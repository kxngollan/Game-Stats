import { Express } from 'express';
import { CorsOptions } from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB = process.env.MONGODBURL;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: '*',
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

const game = mongoose.model('Game', gameSchema);

app.get('/api', async (req, res) => {
  try {
    const allGames = Game.find();
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
      time,
      teamScore,
      oppScore,
      gameStatus,
    } = req.body;
    const newGame = new Game({
      id: id,
      opponent: opponent,
      gameDay: gameDay,
      venue: venue,
      time: time,
      teamScore: teamScore,
      oppScore: oppScore,
      gameStatus: gameStatus,
    });

    const gameSavedId = newGame.id;
    console.log('Game added to Webiste ', gameSavedId);
    res.status(201).json({ message: 'Game added successfully:' });
  } catch (error) {
    console.error('Error adding game to Database: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
