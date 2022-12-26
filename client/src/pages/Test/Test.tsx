import List from '../../components/List/List';
import { getPopularMovies } from '../../redux/movieSlice';
import style from './Test.module.css';








export function Test () {




    return(
        <div className={style.testCont}>
            <List name='popular' call={getPopularMovies()}/>
        </div>
    )
}