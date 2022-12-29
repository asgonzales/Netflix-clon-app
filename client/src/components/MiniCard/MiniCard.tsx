import { useEffect, useRef, useState } from 'react';
// import { getMovieCategories } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import ReactDOM from 'react-dom';
import playIcon from '../../media/play.svg';
import plusIcon from '../../media/plus.svg';
import likeIcon from '../../media/like.svg';
import doubleLikeIcon from '../../media/doubleLike.svg';
import downArrowIcon from '../../media/downArrow.svg';
// import dotIcon from '../../media/dot.svg';

// import imagenPrueba from './pruebaCard.jpg';
// import fondoPrueba from './IMAGENDEPRUEBA.jpg';
import { MovieInfoInterface } from '../../config/types';
import { getMovieInfo } from '../../redux/movieSlice';

interface Props {
    categoryBelong:string
    previewData:MovieInfoInterface
    first?:boolean
    last?:boolean
    position: {
        top:number
        left:number
    }
    close:() => void
}



export default function MiniCard ({ categoryBelong, previewData, first, last, position, close }:Props) {

    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.movies.categories.data)
    const minicardInfo = useAppSelector(state => state.movies.lists[categoryBelong].data.find(el => el.id === previewData.id))
    const miniCardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(getMovieInfo({
            categoryName: categoryBelong,
            movieId: previewData.id
        }))
    }, [])
    useEffect(() => {
        if(miniCardRef.current) {
            miniCardRef.current.onmouseleave = () => {
                setTimeout(() => {
                    close()
                }, 200)
            }
        }
    }, [])

    const [categoriesBelong, setCategoriesBelong] = useState<string[]>([])
    
    useEffect(() => {
        if(minicardInfo && minicardInfo.date) {
            const categoriesStored = minicardInfo?.genres
            if(categoriesStored) {
                const categoriesInCommon:string[] = categoriesStored.map(elment => {
                    const find = categories.find(el => el.id === elment)
                    if(find) return find.name
                    else return ''
                })
                setCategoriesBelong(categoriesInCommon)
            }
        }
    }, [minicardInfo?.date])

    return ReactDOM.createPortal(
        <div ref={miniCardRef} className={style.ContMiniCard} style={{
            top: position.top,
            left: position.left
        }}>
            <div className={`${style.Card}  ${first ? style.first : last ? style.last : ''}`}>
                <div className={style.imagen}>
                    <h1>{minicardInfo?.title}</h1>
                    <img src={minicardInfo?.image} alt="cover" />
                </div>
                <div className={style.texto}>
                    <div className={style.controls}>
                        <div>
                            <img src={playIcon} alt="play" />
                        </div>
                        <div>
                            <img src={plusIcon} alt="Plus" />
                            <div className={style.popup}>
                                <span>Add to My List</span>
                                <div className={style.popupArrow}>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={likeIcon} alt="Like" />
                            <div className={style.likes}>
                                <div>
                                    <img src={likeIcon} alt="dislke" />
                                    <div className={style.popup}>
                                        <span>Not for me</span>
                                        <div className={style.popupArrow}>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img src={likeIcon} alt="like" />
                                    <div className={style.popup}>
                                        <span>I like this</span>
                                        <div className={style.popupArrow}>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <img src={doubleLikeIcon} alt="love" />
                                    <div className={style.popup}>
                                        <span>Love this!</span>
                                        <div className={style.popupArrow}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={downArrowIcon} alt="More" />
                            <div className={style.popup}>
                                <span>More info</span>
                                <div className={style.popupArrow}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.firstLine}>
                        <span className={style.rate}>{((minicardInfo?.rate || 0) * 10).toFixed(0)}% Match</span>
                        <span>{minicardInfo?.date}</span>
                    </div>
                    <div className={style.secondLine}>
                        {
                            categoriesBelong?.map((el, index) => {
                                if (index === 0) {
                                    return (
                                        <div key={index}>
                                            <span>{el}</span>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div key={index}>
                                            <div className={style.dot}>
                                            </div>
                                            <span>{el}</span>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    , document.getElementById('modals')!)
}