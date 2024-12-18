import * as dotenv from 'dotenv';
import { addMovie, deleteMovie, getAllMovies, getMovieByID, updateMovie, searchMovies } from './routes/movieRoutes';
import { isValidIdMiddleware } from './validators';
import { IncomingMessage, ServerResponse } from 'http';
import Router from 'eframix';
import Movies from '../data/movies.json';
import { initializeElasticSearch } from './utils/elasticSearchSetup';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = new Router();

const setMoviesMiddleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    req.movies = Movies;
    console.log("req.movies", req.movies);
    next();
};

initializeElasticSearch();

app.use(app.bodyParser);
app.use(setMoviesMiddleware);

app.get("/api/movies/search", searchMovies);
app.get("/api/movies", getAllMovies);
app.get("/api/movies/:id", isValidIdMiddleware, getMovieByID);
app.post("/api/movies", addMovie);
app.put("/api/movies/:id", isValidIdMiddleware, updateMovie);
app.delete("/api/movies/:id", isValidIdMiddleware, deleteMovie);

app.startServer(Number(PORT), () => {
    console.log("Server listening on port:", PORT);
});
