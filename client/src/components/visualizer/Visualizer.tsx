import { useEffect } from "react"
import { getHomeMovie, getPopularMovies } from "../../redux/movieSlice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import style from './Visualizer.module.css';
import imagendeprueba from './IMAGENDEPRUEBA2.jpg';
import playIcon from '../../media/play.svg';
import infoIcon from '../../media/info.svg';
import reloadIcon from '../../media/reload.svg';
import List from "../List/List";




export default function Visualizer () {
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => state.movies)

    useEffect(() => {
        dispatch(getHomeMovie())
    }, [])

    return (
        <div className={style.ContVisualizer}>
            <div className={style.imgCont}>
                {/* <img src={imagendeprueba} alt="background movie" /> */}
                <img src={movies.homeMovie.data?.image} alt="background movie" />
            </div>
            <div className={style.shadow}> 
                <div className={style.up}>
                    <div className={style.info}>
                        <div className={style.description}>
                            <div className={style.title}>
                                <h3>{movies.homeMovie.data?.title}</h3>
                            </div>
                            <div className={style.rate}>

                            </div>
                            <div className={style.overview}>
                                <p className={style.texto}>{movies.homeMovie.data?.description}</p>
                            </div>
                            <div className={style.buttons}>
                                <button className={style.playButton}>
                                    <img src={playIcon} alt="play Icon" />
                                    Play
                                </button>
                                <button className={style.infoButton}>
                                    <img src={infoIcon} alt="info icon" />
                                    More Info
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={style.controls}>
                        <div className={style.grids}>

                        </div>
                        <div className={style.player}>
                            <div className={style.videoControls}>
                                <img src={reloadIcon} alt="reload" />
                            </div>
                            <div className={style.clasification}>
                                <span>13+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.down}>
                    <List name={'popular'} call={getPopularMovies()} />
                    {/* <List name={'popular'} call={getPopularMovies()} /> */}
                </div>
            </div>
        </div>
    )
}