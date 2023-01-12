import { useEffect, useRef } from 'react';
import style from './PopUp.module.css';



interface PopUpInterface {
    message:string
    active:boolean
}




export default function PopUp({message, active}:PopUpInterface) {

    const popupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(popupRef.current) {
            if(active) {
                popupRef.current.style.filter = 'opacity(1)'
                popupRef.current.style.visibility = 'visible'
                popupRef.current.style.transitionDelay = '.2s'
            }
            else {
                popupRef.current.style.filter = 'opacity(0)'
                popupRef.current.style.visibility = 'hidden'
                popupRef.current.style.transitionDelay = '.2s'
            }
        }
    }, [active])



    return (
        <div ref={popupRef} className={style.ContPopUp}>
            <span>{message}</span>
            <div>
            </div>
        </div>
    )
}