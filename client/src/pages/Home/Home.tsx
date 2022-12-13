import style from './Home.module.css';
import Visualizer from '../../components/visualizer/Visualizer';
import { useEffect } from 'react';
import List from '../../components/List/List';
import { getPopularMovies } from '../../redux/movieSlice';






export default function Home () {

    useEffect(() => {
        document.title = 'Home - MovieApp'
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