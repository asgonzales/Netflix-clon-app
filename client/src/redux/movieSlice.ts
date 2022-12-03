import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { config } from "../config/config";

interface homeMovie {
    id?:number
    title?:string
    description?:string
    image?:string
    video?:string
}
type loadings = {
    homeMovie:boolean
}
type errors = {
    homeMovie:boolean
}
interface Movies {
    homeMovie:homeMovie
    loading: loadings
    error:errors
}

const initialState:Movies = {
    homeMovie: {},
    loading: {
        homeMovie: false
    },
    error: {
        homeMovie: false
    }
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

//Reducer
const movieSlice = createSlice({
    name:'movieSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHomeMovie.pending, (state) => {
            state.loading.homeMovie = true
        })
        builder.addCase(getHomeMovie.fulfilled, (state, action) => {
            state.loading.homeMovie = false
            state.homeMovie = action.payload
        })
        builder.addCase(getHomeMovie.rejected, (state) => {
            state.loading.homeMovie = false
            state.error.homeMovie = true
        })
    },
})





export default movieSlice.reducer