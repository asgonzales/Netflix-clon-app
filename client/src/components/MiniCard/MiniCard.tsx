import { useEffect } from 'react';
import { getMovieCategories, getPopularMovies } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import playIcon from '../../media/play.svg';
import plusIcon from '../../media/plus.svg';
import likeIcon from '../../media/like.svg';
import downArrowIcon from '../../media/downArrow.svg';


import imagenPrueba from './pruebaCard.jpg';
import fondoPrueba from './IMAGENDEPRUEBA.jpg';





export default function MiniCard () {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.movies.lists?.popular)

    useEffect(() => {
        dispatch(getPopularMovies())
    }, [])

    const generos = ['uno', 'dos', 'tres']
    return (
        <div className={style.ContMiniCard}>
            <div className={style.backgroundImage} >
                <img src={imagenPrueba} alt='pepe' />
            </div>
            <div className={style.Card}>
                <div className={style.imagen}>
                    <img src={fondoPrueba} alt="fondoPrueba" />
                    <h1>TituloTituloTituloTituloTituloTituloTituloTituloTituloTitulo</h1>
                </div>
                <div className={style.texto}>
                    <div className={style.controls}>
                        <div>
                            <img src={playIcon} alt="play" />
                        </div>
                        <div>
                            <img src={plusIcon} alt="Plus" />
                        </div>
                        <div>
                            <img src={likeIcon} alt="Like" />
                        </div>
                        <div>
                            <img src={downArrowIcon} alt="More" />
                        </div>
                    </div>
                    <div className={style.firstLine}>
                        <span className={style.rate}>78% Match</span>
                        <span>Date</span>
                    </div>
                    <div className={style.secondLine}>
                        {
                            generos.map((el, index) => {
                                if (index === generos.length - 1) {
                                    return (
                                        <span>{el}</span>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <span>{el} °</span>
                                            {/* <img /> */}
                                        </>
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