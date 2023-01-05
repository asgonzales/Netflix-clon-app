import { Request, Response } from "express";
import axios from "axios";
import { BigCard, Category, MiniCard, PreviewCard, RandomMovie, similarMovieInterface, videoResponseType } from "../config/types";
import { smallImageUrl, bigImageUrl } from "../config/config";
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
            image: bigImageUrl + selectedMovie.backdrop_path,
            video: ''
        }
        
        //Obtener video de la pelicula seleccionada
        const videoResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${finalMovie.id}/videos`
        })
        if (videoResponse.data.results.length > 0) {
            finalMovie.video = videoResponse.data.results.find((el:videoResponseType) => el.type === 'Trailer').key
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
        let filteredResponse:PreviewCard[] = []
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
            const filter:PreviewCard = {
                image: smallImageUrl + responses[i].backdrop_path,
                // genres: responses[i].genre_ids,
                id: responses[i].id,
                title: responses[i].title,
                // date: responses[i].release_date,
                // rate: responses[i].vote_average
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

export const getMoviesByCategory = async (req:Request, res:Response) => {

    const { genreId } = req.query
    let responses:any = []
    let filteredResponse:PreviewCard[] = []
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
            console.log(smallImageUrl + responses[i].backdrop_path)
            const filter:PreviewCard = {
                image: smallImageUrl + responses[i].backdrop_path,
                // genres: responses[i].genre_ids,
                id: responses[i].id,
                title: responses[i].title,
                // date: responses[i].release_date,
                // rate: responses[i].vote_average
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
export const getMovieMinInfo = async (req:Request, res:Response) => {
    try {
        
        const { id } = req.query
        const response = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?language=es-ES`
        })

        const movie:MiniCard = {
            // id:response.data.id,
            genres: response.data.genres.map((el:Category) => el.id),
            date: response.data.release_date,
            rate: response.data.vote_average
        }

        res.status(200).json({
            status: 200,
            data: movie
        })
    } catch (err:any) {
        res.status(400).json({
            status:400,
            error:err.message
        })
    }
}
export const getMovieFullInfo = async (req:Request, res:Response) => {
        const { id } = req.query
        console.log(id)
    try {
        const generalResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}?language=es-ES`
        })
        //Get the cast
        const castResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`
        })
        const director = castResponse.data.crew?.find((el:any) => el.job === 'Director')?.name || null
        const fullCast:string[] = []
        for(let i = 0; i < 10; i++) { //flter data
            fullCast.push(castResponse.data.cast[i].name)
        }
        //Get similar movies
        const similarMoviesResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
        })
        const similarMovies:similarMovieInterface[] = []
        for(let i = 0; i < 15; i++) { //filter data
            const data:similarMovieInterface = {
                id: similarMoviesResponse.data.results[i].id,
                image: smallImageUrl + similarMoviesResponse.data.results[i].backdrop_path,
                title: similarMoviesResponse.data.results[i].title,
                description: similarMoviesResponse.data.results[i].overview,
                date: similarMoviesResponse.data.results[i].release_date
            }
            similarMovies.push(data)
        }
        //Get videos of the movie
        const videosResponse = await axios({
            method: 'GET',
            url: `https://api.themoviedb.org/3/movie/${id}/videos`
        })
        let videos:videoResponseType[] = [] //filter data
        videos.push(videosResponse.data.results.find((el:videoResponseType) => el.type === 'Trailer'))
        videos.push(videosResponse.data.results.find((el:videoResponseType) => el.type === 'Teaser'))
        videos = videos.map(el => {
            return {
                id: el.id,
                name: el.name,
                type: el.type,
                key: el.key
            }
        })
        //data => info
        const movie:BigCard = {
            imgHD: bigImageUrl + generalResponse.data.backdrop_path,
            language: generalResponse.data.original_language,
            description: generalResponse.data.overview,
            country: {
                name: generalResponse.data.production_countries[0].name,
                iso: Object.values(generalResponse.data.production_countries[0])[0] as string
            },
            status: generalResponse.data.status,
            cast: {
                director,
                first: fullCast.slice(0, 5),
                full: fullCast
            },
            similar: similarMovies,
            videos
        }
        //Response
        res.status(200).json({
            status: 200,
            data: movie
        })
    } catch (err:any) {
        console.log('ERROR API', err.message)
        res.status(400).json({
            status: 400,
            error: err.message
        })
    }
}