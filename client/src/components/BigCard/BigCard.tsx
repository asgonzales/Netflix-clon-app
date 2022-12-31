import { useEffect } from 'react';
import { MovieInfoInterface } from '../../config/types';
import { getMovieFullInfo } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './BigCard.module.css';
import closeIcon from '../../media/plus.svg';
import testData from './testData.json';

interface BigCardProps {
    categoryBelong?:string
    id?:number
    previewData?:MovieInfoInterface
}




export default function BigCard ({categoryBelong, id, previewData}:BigCardProps) {
    const dispatch = useAppDispatch()
    // const movieInfo = useAppSelector(state => state.movies.lists[categoryBelong].data.find(el => el.id === id))
    const movieInfo = testData
    // useEffect(() => {
    //     dispatch(getMovieFullInfo({
    //         movieId: id,
    //         categoryName: categoryBelong
    //     }))
    // }, [])

    //Bring Director an hd image



    return (
        <div className={style.ContBigCard}>
            {/* <button onClick={() => console.log(movieInfo)}>presioname prro</button> */}
            <div className={style.bigCardContent}>
                <div className={style.imageDiv}>
                    <img src={movieInfo.image} alt={movieInfo.title} />
                    <div className={style.shadow}>
                        <div className={style.movieControls}>
                            <h2>{movieInfo.title}</h2>
                            <div className={style.controlsButtons}>

                            </div>
                        </div>
                        <div className={style.cardControls}>
                            <button className={style.closeButton}>
                                <img src={closeIcon} alt="close" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.infoDiv}>
                    <div className={style.infoLeft}>
                        <div className={style.infoStats}>
                            <span>{movieInfo.rate}</span>
                            <span>{movieInfo.date}</span>
                            <span>{movieInfo.language}</span>
                            <span>{movieInfo.status}</span>
                        </div>
                        <div className={style.description}>
                            <p>{movieInfo.description}</p>
                        </div>
                    </div>
                    <div className={style.infoRight}>
                        <div>
                            <span>Cast: </span>
                            <span>{movieInfo.cast.first.join(', ')}, more</span>
                        </div>
                        <div>
                            <span>Genres: </span>
                            <span>{movieInfo.genres.join(', ')}</span>
                        </div>
                        {/* <div>
                            <span></span>
                            <span></span>
                        </div> */}
                    </div>
                </div>
                <div className={style.similarDiv}>

                </div>
            </div>
        </div>
    )
}