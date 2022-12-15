import style from './Home.module.css';
import Visualizer from '../../components/visualizer/Visualizer';
import { useEffect } from 'react';
import List from '../../components/List/List';
import { getMovieCategories, getPopularMovies } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';






export default function Home () {

    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.movies.categories.data)
    document.title = 'Home - MovieApp'
    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getMovieCategories())
        }
    }, [])



    return (
        <div className={style.ContHome}>
            <Visualizer />
            {/* <div className={style.lists}> */}
                {/* <List name={'popular'} call={getPopularMovies()}/> */}
            {/* </div> */}
        </div>
    )
}