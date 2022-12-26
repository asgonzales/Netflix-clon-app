import { createAsyncThunk, createSlice, PayloadActionCreator } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from 'axios';
import { config } from "../config/config";
import { CardList, categoryType, Movies } from "../config/types";



const initialState:Movies = {
    homeMovie: {
        error: false,
        loading: false,
        data: {
            id: 0,
            title: '',
            description: '',
            image: '',
            video: ''
        }
    },
    categories: {
        error: false,
        loading: false,
        data: []
    },
    lists: {}
}


//Async Actions
export const getHomeMovie = createAsyncThunk(
    'movies/getHomeMovie',
    async (_, thunkAPI) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.urlAPI}/movies/random`
            })
            return response.data.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getMovieCategories = createAsyncThunk(
    'movies/getMovieCategories',
    async (_, thunkAPI) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.urlAPI}/movies/categories`
            })
            return response.data.data
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getPopularMovies = createAsyncThunk(
    'movies/getPopularMovies',
    async (_, thunkAPI) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.urlAPI}/movies/popular`
            })
            return response.data.data
        } catch(err:any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getMoviesByCategory = createAsyncThunk<{name:string, data: any}, any>(
    'movies/getMoviesByCategory',
    async (category:categoryType, thunkAPI) => {
        try {
            const response = await axios({
                method: 'GET',
                url: `${config.urlAPI}/movies/bycategory?genreId=${category.id}`
            })
            // const respuesta = {
            // }
            return {
                name: category.name,
                data: response.data.data
            }
        } catch (err:any) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

//Reducer
const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getHomeMovie
        builder.addCase(getHomeMovie.pending, (state) => {
            state.homeMovie.loading = true
        })
        builder.addCase(getHomeMovie.fulfilled, (state, action) => {
            state.homeMovie.loading = false
            state.homeMovie.data = action.payload
        })
        builder.addCase(getHomeMovie.rejected, (state) => {
            state.homeMovie.loading = false
            state.homeMovie.error = true
        })
        //getMovieCategories
        builder.addCase(getMovieCategories.pending, (state) => {
            state.categories.loading = true
        })
        builder.addCase(getMovieCategories.fulfilled, (state, action) => {
            state.categories.loading = false
            state.categories.data = action.payload
        })
        builder.addCase(getMovieCategories.rejected, (state) => {
            state.categories.loading = false
            state.categories.error = true
        })
        //getPopularMovies
        builder.addCase(getPopularMovies.pending, (state) => {
            state.lists.popular = {
                name: 'Popular',
                loading: true,
                error: false,
                data: []
            }
        })
        builder.addCase(getPopularMovies.fulfilled, (state, action) => {
            state.lists.popular = {
                name: 'Popular',
                loading: false,
                error: false,
                data: action.payload
            }
        })
        builder.addCase(getPopularMovies.rejected, (state) => {
            state.lists.popular = {
                name: 'Popular',
                loading: false,
                error: true,
                data: []
            }
        })
        //getMoviesByCategory
        builder.addCase(getMoviesByCategory.pending, (state, action) => {
            state.lists[action.meta.arg.name] = {
                name: action.meta.arg.name,
                loading: true,
                error: false,
                data: []
            }
        })
        builder.addCase(getMoviesByCategory.fulfilled, (state, action) => {
            state.lists[action.payload.name] = {
                name: action.payload.name,
                loading: false,
                error: false,
                data: action.payload.data
            }
        })
        builder.addCase(getMoviesByCategory.rejected, (state, action) => {
            state.lists[action.meta.arg.name] = {
                name: action.meta.arg.name,
                loading: false,
                error: false,
                data: []
            }
        })
    },
})





export default movieSlice.reducer