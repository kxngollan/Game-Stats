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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
