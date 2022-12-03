import { Router } from "express";
import movieRoute from "./movies";
import axios from "axios";
import seriesRoute from "./series";
import { config } from '../config/config';
axios.defaults.headers.common['Authorization'] = config.MOVIE_API


const routes = Router()

routes.use('/movies', movieRoute)
routes.use('/series', seriesRoute)


export default routes