import BigCard from '../../components/BigCard/BigCard';
import AddToList from '../../components/Buttons/AddToList/AddToList';
import LikeButton from '../../components/Buttons/Like/Like';
import List from '../../components/List/List';
import { getPopularMovies } from '../../redux/movieSlice';
import style from './Test.module.css';








export function Test () {




    return(
        <div className={style.ContTest}>
            {/* <div> */}
                {/* <BigCard  categoryBelong={'Ciencia ficción'} /> */}
                {/* <LikeButton /> */}
                {/* <AddToList /> */}
            {/* </div> */}
        </div>
    )
}