import { Router } from "express";
import { getMovieCategories, getPopularMovies, getRandomMovie, getMoviesByCategory, getMovieMinInfo } from "../controllers/moviesController";



const movieRoute = Router()




movieRoute.get('/categories', getMovieCategories)
movieRoute.get('/random', getRandomMovie)
movieRoute.get('/popular', getPopularMovies)
movieRoute.get('/bycategory', getMoviesByCategory)
movieRoute.get('/info', getMovieMinInfo)

export default movieRoute;