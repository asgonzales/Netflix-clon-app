import { Request, Response } from "express";
import axios from "axios";
import { Category } from "../config/types";


export const getSeriesCategories = async (_:Request, res:Response) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/tv/list?language=es-ES'
        })
        const categories:Category[] = response.data.genres

        res.status(200).json({
            status: 200,    
            data: categories
        })
    } catch(err:any) {
        res.status(400).json({error: err.message})
    }
}