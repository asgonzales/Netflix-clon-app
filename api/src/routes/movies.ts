import { Router } from "express";
import { getMovieCategories, getRandomMovie } from "../controllers/moviesController";



const movieRoute = Router()




movieRoute.get('/categories', getMovieCategories)
movieRoute.get('/random', getRandomMovie)


export default movieRoute;