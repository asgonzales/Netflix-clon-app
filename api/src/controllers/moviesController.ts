import { Request, Response } from "express";
import axios from "axios";
import { Category, MiniCard, RandomMovie, videoResponseType } from "../config/types";
import { imageUrl, videoUrl } from "../config/config";
// import config from "../config/config";


export const getMovieCategories = async (_:Request, res:Response) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?language=es-ES'
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

export const getRandomMovie = async (_:Request, res:Response) => {
    try {
        //Obtener categorias
        const categoriesResponse = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/genre/movie/list?language=es-ES'
        })
        const categories:Category[] = categoriesResponse.data.genres
        const selectedCategory = categories[Math.round(Math.random() * categories.length - 1)].id

        console.log('ID CAETGORIA:', selectedCategory)

        //Obtener listado de peliculas según categoría seleccionada
        const showsListResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedCategory}&sort_by=popularity.desc&language=es-ES`
        })

        //Seleccionar una pelicula de la lista
        const selectedMovie = showsListResponse.data.results[Math.round(Math.random() * 2)]

        console.log('ID PELICULA: ', selectedMovie.id)
        //Limpiar datos de la pelicula seleccionada

        let finalMovie:RandomMovie = {
            id: selectedMovie.id,
            title: selectedMovie.title,
            description: selectedMovie.overview,
            image: imageUrl + selectedMovie.backdrop_path,
            video: videoUrl
        }
        
        //Obtener video de la pelicula seleccionada
        const videoResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${finalMovie.id}/videos`
        })
        if (videoResponse.data.results.length > 0) {
            finalMovie.video = finalMovie.video + videoResponse.data.results.find((el:videoResponseType) => el.type === 'Trailer').key
        }
        else {
            finalMovie.video = 'false'
        }

        //Responder con la pelicula 
        res.status(200).json({
            status: 200,
            data: finalMovie
        })
    } catch (err:any) {
        res.status(400).json({
            status: 400,
            error: err.message
        })
    }
} 

export const getPopularMovies = async (_:Request, res:Response) => {
    try {
        let responses:any = []
        let filteredResponse:MiniCard[] = []
        const limit = 42

        //Obtengo la lista de peliculas populares desde la API
        const response = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1'
        })
        responses = [...responses, ...response.data.results]

        const response2 = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=2'
        })
        responses = [...responses, ...response2.data.results]

        const response3 = await axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular?language=es-ES&page=3'
        })
        responses = [...responses, ...response3.data.results]

        //Filtro los datos
        for(let i = 0; i < limit; i++) {
            const filter:MiniCard = {
                image: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
                genres: responses[i].genre_ids,
                id: responses[i].id,
                title: responses[i].title,
                date: responses[i].release_date,
                rate: responses[i].vote_average
            }
            filteredResponse.push(filter)
        }

        res.status(200).json({
            status: 200,
            data: filteredResponse
        })
    } catch (err:any) {
        res.status(400).json({
            status: 400,
            error: err.message
        })
    }
}

export const getMovieByCategory = async (req:Request, res:Response) => {

    const { genreId } = req.query
    let responses:any = []
    let filteredResponse:MiniCard[] = []
    const limit = 42
    try {
        const response = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=1`
        })
        responses = [...responses, ...response.data.results]

        const response2 = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=2`
        })
        responses = [...responses, ...response2.data.results]

        const response3 = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=3`
        })
        responses = [...responses, ...response3.data.results]

        //Filtro los datos
        for(let i = 0; i < limit; i++) {
            const filter:MiniCard = {
                image: 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png',
                genres: responses[i].genre_ids,
                id: responses[i].id,
                title: responses[i].title,
                date: responses[i].release_date,
                rate: responses[i].vote_average
            }
            filteredResponse.push(filter)
        }
        //filtrar datos
        // const filteredResponse:MiniCard = response.data.map(el => {
            res.status(200).json({
                status: 200,
                data: filteredResponse
            })
        // })
    } catch (err:any) {
        res.status(400).json({error: err.message})
    }
}