import { useEffect } from 'react';
import { getMovieCategories, getPopularMovies } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import playIcon from '../../media/play.svg';
import plusIcon from '../../media/plus.svg';
import likeIcon from '../../media/like.svg';
import doubleLikeIcon from '../../media/doubleLike.svg';
import downArrowIcon from '../../media/downArrow.svg';
// import dotIcon from '../../media/dot.svg';

import imagenPrueba from './pruebaCard.jpg';
import fondoPrueba from './IMAGENDEPRUEBA.jpg';





export default function MiniCard () {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.movies.lists?.popular)
    const categories = useAppSelector(state => state.movies.categories.data)

    useEffect(() => {
        dispatch(getPopularMovies())
        dispatch(getMovieCategories())
    }, [])

    const generos = [28, 12, 16, 99]
    const generosletras = generos.map(elmnt => {
        const find = categories.find(el => el.id === elmnt)
        return find?.name
    })
    return (
        <div className={style.ContMiniCard}>
            <div className={style.backgroundImage} >
                <img src={imagenPrueba} alt='pepe' />
            </div>
            <div className={style.Card}>
                <div className={style.imagen}>
                    <img src={fondoPrueba} alt="fondoPrueba" />
                    {/* <h1>TituloTituloTituloTituloTituloTituloTituloTituloTituloTitulo</h1> */}
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
                        <span className={style.rate}>78% Match</span>
                        <span>Date</span>
                    </div>
                    <div className={style.secondLine}>
                        {
                            generosletras.map((el, index) => {
                                if (index === 0) {
                                    return (
                                        <div>
                                            <span>{el}</span>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div>
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
                <button onClick={() => console.log(data)}>HIT ME</button>
        </div>
    )
}