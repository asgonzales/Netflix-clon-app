import style from './AddToList.module.css';
import plusIcon from '../../../media/plus.svg';
import PopUp from '../PopUp/PopUp';
import { useEffect, useRef, useState } from 'react';







export default function AddToList() {
    const [popUpController, setPopUpController] = useState(false)
    const divRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(divRef.current) {
            divRef.current.onmouseenter = () => {
                setPopUpController(true)
            }
            divRef.current.onmouseleave = () => {
                setPopUpController(false)
            }
        }
    }, [])



    return (
        <div ref={divRef} className={style.ContAddToList}>
            <img src={plusIcon} alt="Plus" />
            <PopUp message='Add to My List' active={popUpController} />
        </div>
    )
}