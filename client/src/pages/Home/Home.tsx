import style from './Home.module.css';
import Visualizer from '../../components/visualizer/Visualizer';
import { useEffect } from 'react';






export default function Home () {

    useEffect(() => {
        document.title = 'Home - MovieApp'
    }, [])



    return (
        <div className={style.ContHome}>
            <Visualizer />
        </div>
    )
}