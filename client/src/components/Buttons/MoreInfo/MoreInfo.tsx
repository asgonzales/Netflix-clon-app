import style from './MoreInfo.module.css';
import { useEffect, useRef, useState } from 'react';
import PopUp from '../PopUp/PopUp';
import downArrowIcon from '../../../media/downArrow.svg';






export default function () {
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
        <div ref={divRef} className={style.ContMoreInfo}>
            <img src={downArrowIcon} alt="More" />
            <PopUp message='More info' active={popUpController} />
        </div>
    )
}