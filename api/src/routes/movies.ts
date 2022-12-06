import { Router } from "express";
import { getMovieCategories, getPopularMovies, getRandomMovie } from "../controllers/moviesController";



const movieRoute = Router()




movieRoute.get('/categories', getMovieCategories)
movieRoute.get('/random', getRandomMovie)
movieRoute.get('/popular', getPopularMovies)


export default movieRoute;