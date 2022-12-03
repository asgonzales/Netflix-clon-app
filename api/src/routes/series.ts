import { Router } from "express";
import { getSeriesCategories } from "../controllers/seriesController";



const seriesRoute = Router()




seriesRoute.get('/categories', getSeriesCategories)



export default seriesRoute