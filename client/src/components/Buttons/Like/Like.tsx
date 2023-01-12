import style from './Like.module.css';
import likeIcon from '../../../media/like.svg';
import doubleLikeIcon from '../../../media/doubleLike.svg';
import PopUp from '../PopUp/PopUp';
import { useEffect, useRef, useState } from 'react';







export default function LikeButton() {

    const [dislikePopUp, setDislikePopUp] = useState(false)
    const dislikeRef = useRef<HTMLDivElement>(null)
    const [likePopUp, setLikePopUp] = useState(false)
    const likeRef = useRef<HTMLDivElement>(null)
    const [lovePopUp, setLovePopUp] = useState(false)
    const loveRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(dislikeRef.current) {
            dislikeRef.current.onmouseenter = () => {
                setDislikePopUp(true)
            }
            dislikeRef.current.onmouseleave = () => {
                setDislikePopUp(false)
            }
        }
        if(likeRef.current) {
            likeRef.current.onmouseenter = () => {
                setLikePopUp(true)
            }
            likeRef.current.onmouseleave = () => {
                setLikePopUp(false)
            }
        }
        if(loveRef.current) {
            loveRef.current.onmouseenter = () => {
                setLovePopUp(true)
            }
            loveRef.current.onmouseleave = () => {
                setLovePopUp(false)
            }
        }
    }, [])


    return(
        <div className={style.ContLikeButton}>
            <img src={likeIcon} alt="Like" />
            <div className={style.likes}>
                <div ref={dislikeRef} >
                    <img src={likeIcon} alt="dislke" />
                    <PopUp message='Not for me' active={dislikePopUp} />
                </div>
                <div ref={likeRef} >
                    <img src={likeIcon} alt="like" />
                    <PopUp message='I like this' active={likePopUp} />
                </div>
                <div ref={loveRef} >
                    <img src={doubleLikeIcon} alt="love" />
                    <PopUp message='Love this!' active={lovePopUp} />
                </div>
            </div>
        </div>
    )
}