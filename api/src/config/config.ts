import dotenv from 'dotenv';
dotenv.config()


export const config = {
    MOVIE_API: process.env.MOVIE_API,
    PORT: process.env.PORT || 3001,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
}

export const smallImageUrl = 'https://image.tmdb.org/t/p/w500'
export const bigImageUrl = 'https://image.tmdb.org/t/p/original'

export const videoUrl = 'https://www.youtube.com/watch?v='