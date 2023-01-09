import { useEffect, useState } from "react"
import { getHomeMovie, getPopularMovies } from "../../redux/movieSlice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import style from './Visualizer.module.css';
import imagendeprueba from './IMAGENDEPRUEBA2.jpg';
import infoIcon from '../../media/info.svg';
import reloadIcon from '../../media/reload.svg';
import List from "../List/List";
import { categoryType } from "../../config/types";
import PlayButton from "../Buttons/PlayButton/PlayButton";
import YouTube from "react-youtube";




export default function Visualizer () {
    const dispatch = useAppDispatch()
    const movies = useAppSelector(state => state.movies)
    const categories = useAppSelector(state => state.movies.categories.data)
    const [videoShow, setVideoShow] = useState(false)
    const [listToCall, setListToCall] = useState<categoryType>({
        id: -5,
        name: 'none'
    })

    useEffect(() => {
        dispatch(getHomeMovie())
    }, [])
    useEffect(() => {
        if(categories.length > 0) {
            setListToCall(categories[Math.round(Math.random() * (categories.length - 1))])
        }
    }, [categories])

    //Video Handle
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        frameborder: 0
        },
    };
    const showVideo = () => {
        setTimeout(() => {
            setVideoShow(true)
        }, 4000)
    }
    const hideVideo = () => {
        setVideoShow(false)
    }
    return (
        <div className={style.ContVisualizer}>
            <div className={style.imgCont}>
                {/* <img src={imagendeprueba} alt="background movie" /> */}
                <img src={movies.homeMovie.data?.image} alt="background movie" />
                <YouTube onPlay={showVideo} onEnd={hideVideo} opts={opts} className={ videoShow ? style.video : style.videoHidden}  videoId={movies.homeMovie.data.video} />
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
                                <div className={style.playButton}>
                                    {/* <img src={playIcon} alt="play Icon" /> */}
                                    {/* Play */}
                                    <PlayButton />  
                                </div>
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
                    {
                        listToCall.id !== -5 &&
                        <List categoryToCall={listToCall} />
                    }
                </div>
            </div>
        </div>
    )
}