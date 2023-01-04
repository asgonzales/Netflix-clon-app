import { useEffect, useRef, useState } from 'react';
import { MovieInfoInterface, SimilarCardInterface, TrailerCardInterface } from '../../config/types';
import { getMovieFullInfo } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './BigCard.module.css';
import closeIcon from '../../media/plus.svg';
import testData from './testData.json';
import PlayButton from '../Buttons/PlayButton/PlayButton';
import AddToList from '../Buttons/AddToList/AddToList';
import LikeButton from '../Buttons/Like/Like';
import arrowIcon from '../../media/listArrow.svg';
import PopUp from '../Buttons/PopUp/PopUp';
import SimilarCard from '../SimilarCard/SimilarCard';
import TrailerCard from '../TrailerCard/TrailerCard';

interface BigCardProps {
    categoryBelong?:string
    id?:number
    previewData?:MovieInfoInterface
}




export default function BigCard ({categoryBelong, id, previewData}:BigCardProps) {
    // const dispatch = useAppDispatch()
    // const movieInfo = useAppSelector(state => state.movies.lists[categoryBelong].data.find(el => el.id === id))
    const [countryPopUp, setCountryPopUp] = useState(false)
    const countryRef = useRef<HTMLSpanElement>(null)
    const movieInfo = testData
    const similarDivRef = useRef<HTMLDivElement>(null)
    const shadowDivRef = useRef<HTMLDivElement>(null)
    const moreButtonRef = useRef<HTMLButtonElement>(null)
    const [similarDivController, setSimilarDivController] = useState(false)
    useEffect(() => {
        if(countryRef.current) {
            countryRef.current.onmouseenter = () => {
                setCountryPopUp(true)
            }
            countryRef.current.onmouseleave = () => {
                setCountryPopUp(false)
            }
        }
    }, [])
    const similarDivHandle = () => {
        setSimilarDivController(!similarDivController)
    }
    useEffect(() => {
        if(similarDivController) {
            if(similarDivRef.current) {
                similarDivRef.current.style.maxHeight = '2000px';
                similarDivRef.current.style.paddingBottom = '50px';
            }
            if(shadowDivRef.current) {
                shadowDivRef.current.style.visibility = 'hidden'
            }
            if(moreButtonRef.current) {
                moreButtonRef.current.style.transform = 'translateY(50%) rotateZ(90deg)'
            }
        }
        else {
            if(similarDivRef.current) {
                similarDivRef.current.style.maxHeight = '1000px';
                similarDivRef.current.style.paddingBottom = '0px';
            }
            if(shadowDivRef.current) {
                shadowDivRef.current.style.visibility = 'visible'
            }
            if(moreButtonRef.current) {
                moreButtonRef.current.style.transform = 'translateY(50%) rotateZ(-90deg)'
            }
        }
    }, [similarDivController])
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
                    <img src={movieInfo.imgHD} alt={movieInfo.title} />
                    <div className={style.shadow}>
                        <div className={style.movieControls}>
                            <h2>{movieInfo.title}</h2>
                            <div className={style.controlsButtons}>
                                <div>
                                    <PlayButton />
                                </div>
                                <div>
                                    <AddToList />
                                </div>
                                <div>
                                    <LikeButton />
                                </div>
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
                            <span>{+movieInfo.rate.toFixed(0) * 10}% Match</span>
                            <span>{movieInfo.date}</span>
                            <span>{movieInfo.language}</span>
                            <span ref={countryRef} >
                                {movieInfo.country.iso}
                                <PopUp message={movieInfo.country.name} active={countryPopUp} />
                            </span>
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
                    <h2>More Like This</h2>
                    <div ref={similarDivRef}>
                        {
                            movieInfo.similar.map((el:SimilarCardInterface) => {
                                return(
                                    <SimilarCard data={el} />
                                )
                            })
                        }
                        <div ref={shadowDivRef} className={style.moreShadow}>
                        </div>
                    </div>
                    <button ref={moreButtonRef} className={style.moreButton} onClick={similarDivHandle}>
                        <img src={arrowIcon} alt="arrow" />
                    </button>
                </div>
                <div className={style.trailersDiv}>
                    <h2>{'Trailer & More'}</h2>
                    <div>
                        {
                            movieInfo.videos.map((el:TrailerCardInterface) => {
                                return(
                                    <TrailerCard data={el} title={movieInfo.title} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}