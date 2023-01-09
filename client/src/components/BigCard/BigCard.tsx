import { useEffect, useRef, useState } from 'react';
import { MovieInfoInterface, SimilarCardInterface, TrailerCardInterface } from '../../config/types';
import { getMovieCategories, getMovieFullInfo } from '../../redux/movieSlice';
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
import ReactDOM from 'react-dom';
import defaultImage from '../../media/defaultImage.jpg';
import YouTube from 'react-youtube';

interface BigCardProps {
    categoryBelong:string
    // id:number
    previewData:MovieInfoInterface
    close: () => void
    closeParent: () => void
}




export default function BigCard ({categoryBelong, previewData, close, closeParent}:BigCardProps) {
    const dispatch = useAppDispatch()
    const movieInfo = useAppSelector(state => state.movies.lists[categoryBelong].data.find(el => el.id === previewData.id))
    const [countryPopUp, setCountryPopUp] = useState(false)
    const countryRef = useRef<HTMLSpanElement>(null)
    // const movieInfo = testData
    const categories = useAppSelector(state => state.movies.categories.data)
    const similarDivRef = useRef<HTMLDivElement>(null)
    const shadowDivRef = useRef<HTMLDivElement>(null)
    const moreButtonRef = useRef<HTMLButtonElement>(null)
    const [similarDivController, setSimilarDivController] = useState(false)
    const cardContent = useRef<HTMLDivElement>(null)
    const [videoShow, setVideoShow] = useState(false)

    useEffect(() => {
        if(countryRef.current) {
            countryRef.current.onmouseenter = () => {
                setCountryPopUp(true)
            }
            countryRef.current.onmouseleave = () => {
                setCountryPopUp(false)
            }
        }
        document.body.style.overflowY = 'hidden'
        return function out () {
            document.body.style.overflowY = 'scroll'
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
    useEffect(() => {
        console.log(categoryBelong)
        dispatch(getMovieFullInfo({
            movieId: previewData.id,
            categoryName: categoryBelong
        }))
        if(categories.length === 0) {
            dispatch(getMovieCategories())
        }
    }, [])

    const [categoriesBelong, setCategoriesBelong] = useState<string[]>([])
    
    useEffect(() => {
        if(movieInfo && movieInfo.date) {
            const categoriesStored = movieInfo?.genres
            if(categoriesStored) {
                const categoriesInCommon:string[] = categoriesStored.map(element => {
                    const find = categories.find(el => el.id === element)
                    if(find) return find.name
                    else return ''
                })
                setCategoriesBelong(categoriesInCommon)
            }
        }
    }, [movieInfo?.date, categories.length])
    const closeModal = () => {
        close()
        closeParent()
    }
    const seeMore = () => {
        if(cardContent.current)
        cardContent.current.scrollTo(0, cardContent.current.scrollHeight)
    }

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

    return ReactDOM.createPortal(
        <div ref={cardContent} className={style.ContBigCard}>
            {/* <button onClick={() => console.log(movieInfo)}>presioname prro</button> */}
            <div className={style.bigCardContent}>
                <div className={style.imageDiv}>
                    <img src={movieInfo?.imgHD ? (movieInfo?.imgHD?.includes('null') ? defaultImage : movieInfo?.imgHD) : movieInfo?.image} alt={movieInfo?.title} />
                    {
                        movieInfo?.video &&
                        <YouTube onPlay={showVideo} onEnd={hideVideo} opts={opts} videoId={movieInfo?.video} className={ videoShow ? style.video : style.videoHidden} />
                    }
                    <div className={style.shadow}>
                        <div className={style.movieControls}>
                            <h2>{movieInfo?.title}</h2>
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
                            <button className={style.closeButton} onClick={closeModal}>
                                <img src={closeIcon} alt="close" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className={style.infoDiv}>
                    <div className={style.infoLeft}>
                        <div className={style.infoStats}>
                            <span>{ movieInfo?.rate? +movieInfo?.rate?.toFixed(0) : 0 * 10}% Match</span>
                            <span>{movieInfo?.date}</span>
                            <span>{movieInfo?.language}</span>
                            <span ref={countryRef} >
                                {movieInfo?.country?.iso}
                                <PopUp message={movieInfo?.country?.name as string} active={countryPopUp} />
                            </span>
                            <span>{movieInfo?.status}</span>
                        </div>
                        <div className={style.description}>
                            <p>{movieInfo?.description}</p>
                        </div>
                    </div>
                    <div className={style.infoRight}>
                        <div>
                            <span>Cast: </span>
                            <span>{movieInfo?.cast?.first.join(', ')}, <span onClick={seeMore}>more</span></span>
                        </div>
                        <div>
                            <span>Genres: </span>
                            <span>{categoriesBelong.join(', ')}</span>
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
                            movieInfo?.similar?.map((el:SimilarCardInterface) => {
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
                {
                    movieInfo && movieInfo.videos && movieInfo?.videos?.length > 0 &&
                    <div className={style.trailersDiv}>
                        <h2>{'Trailer & More'}</h2>
                        <div>
                            {
                                movieInfo?.videos?.map((el:TrailerCardInterface) => {
                                    return(
                                        <TrailerCard data={el} title={movieInfo?.title} />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
                <div className={style.aboutDiv}>
                    <h2>About {movieInfo?.title}</h2>
                    <div>
                        <span>
                            <span>Director: </span> <span>{movieInfo?.cast?.director}</span>
                        </span>
                        <span>
                            <span>Cast: </span> <span>{movieInfo?.cast?.full.join(', ')}</span>
                        </span>
                        <span>
                            <span>Genres: </span>
                            {
                                categoriesBelong.join(', ')
                            }

                        </span>
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById('bigCardModals')!)
}