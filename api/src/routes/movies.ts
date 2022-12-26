import { Router } from "express";
import { getMovieCategories, getPopularMovies, getRandomMovie, getMovieByCategory } from "../controllers/moviesController";



const movieRoute = Router()




movieRoute.get('/categories', getMovieCategories)
movieRoute.get('/random', getRandomMovie)
movieRoute.get('/popular', getPopularMovies)
movieRoute.get('/bycategory', getMovieByCategory)

export default movieRoute;