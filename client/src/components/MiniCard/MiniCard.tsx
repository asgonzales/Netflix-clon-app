import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import style from './MiniCard.module.css';
import ReactDOM from 'react-dom';
import playIcon from '../../media/play.svg';
import { MovieInfoInterface } from '../../config/types';
import { getMovieInfo } from '../../redux/movieSlice';
import LikeButton from '../Buttons/Like/Like';
import AddToList from '../Buttons/AddToList/AddToList';
import MoreInfo from '../Buttons/MoreInfo/MoreInfo';
import BigCard from '../BigCard/BigCard';
import defaultImage from '../../media/defaultImage.jpg'
import YouTube from 'react-youtube';
import { categoriesInCommon } from '../../functions';
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
    const [bigCardModal, setBigCardModal] = useState(false)
    const [videoShow, setVideoShow] = useState(false)
    const [categoriesBelong, setCategoriesBelong] = useState<string[]>([])

    const textoRef = useRef<HTMLDivElement>(null)

    if(miniCardRef.current) {
        miniCardRef.current.onmouseleave = () => {
            if(!isBigCardOpen()) {
                setTimeout(() => {
                    close()
                }, 300)
            }
        }
    }

    useEffect(() => {
        dispatch(getMovieInfo({
            categoryName: categoryBelong,
            movieId: previewData.id
        }))
        setTimeout(() => {
            if(textoRef.current) {
                if(textoRef.current.offsetHeight === 0 && !isBigCardOpen()) close()
            }
        }, 2000)
    }, [])

    
    useEffect(() => {
        if(minicardInfo && minicardInfo.date) {
            const categoriesStored = minicardInfo?.genres
            if(categoriesStored) setCategoriesBelong(categoriesInCommon(categoriesStored, categories))
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
                        <YouTube onPlay={showVideo} onEnd={hideVideo} opts={opts} videoId={minicardInfo.video} className={ videoShow ? style.video : style.videoHidden} />
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