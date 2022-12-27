import { useEffect, useRef } from 'react';
import { getMovieCategories } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import ReactDOM from 'react-dom';
import playIcon from '../../media/play.svg';
import plusIcon from '../../media/plus.svg';
import likeIcon from '../../media/like.svg';
import doubleLikeIcon from '../../media/doubleLike.svg';
import downArrowIcon from '../../media/downArrow.svg';
// import dotIcon from '../../media/dot.svg';

import imagenPrueba from './pruebaCard.jpg';
import fondoPrueba from './IMAGENDEPRUEBA.jpg';
import { MiniCardInterface } from '../../config/types';

interface Props {
    data:MiniCardInterface
    first?:boolean
    last?:boolean
    position: {
        top:number
        left:number
    }
    close:() => void
    ahora:string
    // onClick:void
}



export default function MiniCard ({ data, first, last, position, close, ahora }:Props) {
    useEffect(() => {
        console.log(position)
    }, [])
    // const dispatch = useAppDispatch()
    // const data = useAppSelector(state => state.movies.lists?.popular)
    const categories = useAppSelector(state => state.movies.categories.data)
    const miniCardRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        // dispatch(getPopularMovies())
        // dispatch(getMovieCategories())
        if(miniCardRef.current) {
            miniCardRef.current.onmouseenter = () => {
                // console.log('asdasd')
                const titles = document.getElementsByClassName('listTitle')
                // console.log(titles)
                for(let i = 0; i < titles.length; i++) {
                    const element = titles[i] as HTMLDivElement
                    element.style.zIndex = '0'
                    // console.log(element)
                }
            }
            miniCardRef.current.onmouseleave = () => {
                setTimeout(() => {
                    close()
                }, 200)
                // console.log('asdasdasds')
                const titles = document.getElementsByClassName('listTitle')
                // console.log(titles)
                for(let i = 0; i < titles.length; i++) {
                    const element = titles[i] as HTMLDivElement
                    element.style.zIndex = '1'
                    // console.log(element)
                }
            }
        }
        console.log(position.top, position.left)
    }, [])

    const generos = data.genres

    const generosletras = generos.map(elmnt => {
        const find = categories.find(el => el.id === elmnt)
        return find?.name
    })

    return ReactDOM.createPortal(
        <div ref={miniCardRef} className={style.ContMiniCard} style={{
            top: position.top,
            left: position.left
        }}>
            <div className={`${style.Card}  ${first ? style.first : last ? style.last : ''}`}>
                <div className={style.imagen}>
                    <h1>{data.title}</h1>
                    <img src={data.image} alt="cover" />
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
                        <span className={style.rate}>{data.rate * 10}% Match</span>
                        <span>{data.date}</span>
                    </div>
                    <div className={style.secondLine}>
                        {
                            generosletras.map((el, index) => {
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