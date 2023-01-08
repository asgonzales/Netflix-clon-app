import { useEffect, useRef, useState } from 'react';
// import { getMovieCategories } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import ReactDOM from 'react-dom';
import playIcon from '../../media/play.svg';
// import dotIcon from '../../media/dot.svg';

// import imagenPrueba from './pruebaCard.jpg';
// import fondoPrueba from './IMAGENDEPRUEBA.jpg';
import { MovieInfoInterface } from '../../config/types';
import { getMovieInfo } from '../../redux/movieSlice';
import LikeButton from '../Buttons/Like/Like';
import AddToList from '../Buttons/AddToList/AddToList';
import MoreInfo from '../Buttons/MoreInfo/MoreInfo';
import BigCard from '../BigCard/BigCard';
import defaultImage from '../../media/defaultImage.jpg'
import YouTube from 'react-youtube';
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
    ref:React.RefObject<HTMLDivElement>
}



export default function MiniCard ({ categoryBelong, previewData, first, last, position, close }:Props) {
    // let pepe = false
    
    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.movies.categories.data)
    const minicardInfo = useAppSelector(state => state.movies.lists[categoryBelong].data.find(el => el.id === previewData.id))
    const miniCardRef = useRef<HTMLDivElement>(null)
    const [bigCardModal, setBigCardModal] = useState(false)
    const [videoShow, setVideoShow] = useState(false)
    // const [pepe, setPepe] = useState(false)

    const textoRef = useRef<HTMLDivElement>(null)
    // const papaya = useState(null)

    if(miniCardRef.current) {
        // miniCardRef.current.onmouseover = () => {
        //     setPepe(true)
        //     console.log('ONMOSEOVERpepe')
            
        // }
        miniCardRef.current.onmouseleave = () => {
            // const children = document.getElementById('bigCardModals')
            if( !isBigCardOpen()) {
                // console.log('ENTRO EN SALIDA DE MINICARD')
                setTimeout(() => {
                    close()
                }, 300)
            }
        }
    }
    // useEffect(() => {
    //     console.log(textoRef.current?.matches(':hover'))
    // }, [textoRef.current?.matches(':hover')])
    // console.log(textoRef.current.matches(':hover'))
    // const run = () => {
    //     setPepe(true)
    //     console.log('seteado')
    // }
    // useEffect(() => {
    //     if(textoRef.current) {
    //         textoRef.current.ontransitionrun = () => {
    //             run()
    //             console.log('asadasdasdasd', pepe)
    //         }
    //         textoRef.current.ontransitionend = () => {
    //             console.log('OEOE AL FINAL DELA ANMIACION', pepe)
    //         }
    //     }
    // }, [textoRef.current])
    // useEffect(() => {
    //     console.log('PEPE:', pepe)
    // }, [pepe])
    // const peep = miniCardRef.current?.getElementsByClassName(style.texto)[0] as HTMLDivElement
    // useEffect(() => {
    //     if(miniCardRef.current) {
    //         if(peep.style.overflow === 'visible') setPepe(true)
    //         console.log(peep)
            
    //     }
    // }, [peep.style.overflow])
    useEffect(() => {
        // setPepe(true)
        dispatch(getMovieInfo({
            categoryName: categoryBelong,
            movieId: previewData.id
        }))
        setTimeout(() => {
            if(textoRef.current) {
                // console.log('ALTURA', textoRef.current.offsetHeight)
                // console.log('CIERRE', bigCardModal)
                if(textoRef.current.offsetHeight === 0 && !isBigCardOpen()) {
                    close()
                }
            }

        }, 2000)
    }, [])

    // useEffect(() => {
    // }, [])

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

    const openBigCard = () => {
        setBigCardModal(true)
    }
    const closeBigCard = () => {
        setBigCardModal(false)
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
        <div id='miniCardModal' ref={miniCardRef} className={style.ContMiniCard} style={{
            top: position.top,
            left: position.left
        }} >
            <div className={`${style.Card}  ${first ? style.first : last ? style.last : ''}`}>
                <div className={style.imagen}>
                    <h1>{minicardInfo?.title}</h1>
                    <img src={minicardInfo?.image.includes('null')? defaultImage : minicardInfo?.image} alt="cover" />
                    {
                        minicardInfo?.video && !bigCardModal &&
                        <YouTube onReady={showVideo} onEnd={hideVideo} opts={opts} videoId={minicardInfo.video} className={ videoShow ? style.video : style.videoHidden} />
                    }
                </div>
                <div ref={textoRef} className={style.texto}>
                    <div className={style.controls}>
                        <div>
                            <img src={playIcon} alt="play" />
                        </div>
                        <div>
                            <AddToList />
                        </div>
                        <div>
                            <LikeButton />
                        </div>
                        <div onClick={openBigCard}>
                            <MoreInfo />
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
            {
                bigCardModal && <BigCard categoryBelong={categoryBelong} previewData={previewData} close={closeBigCard} closeParent={close}/>
            }
        </div>
    , document.getElementById('modals')!)
}

function isBigCardOpen ():boolean {
    const children = document.getElementById('bigCardModals')
    if( children && children.children.length == 0) return false
    else return true
}