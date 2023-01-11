import { useEffect, useRef, useState } from 'react';
import { MovieInfoInterface } from '../../config/types';
import style from './PreviewCard.module.css';
import MiniCard from '../MiniCard/MiniCard';
import defaultImage from '../../media/defaultImage.jpg';

interface Props {
    categoryBelong:string
    data:MovieInfoInterface
    first?:boolean
    last?:boolean
    modalDiff?:boolean
}

export default function PreviewCard ({ categoryBelong, data, modalDiff, first, last }:Props) {

    //Controlador del modal
    const [openPortal, setOpenPortal] = useState(false)
    //Posición del modal
    const [offsets, setOffsets] = useState({
        top: 0,
        left: 0 
    })
    //Diferencia en X cuando la lista se activa
    const [diff, setDiff] = useState(0)

    const previewCardRef = useRef<HTMLDivElement>(null)
    
    const acumulativeOffset = (element:HTMLDivElement) => { //Acumulador de posiciones relativas
        let top = 0, left = 0;
        do {
            top += element.offsetTop  || 0;
            left += element.offsetLeft || 0;
            element = element.offsetParent as HTMLDivElement;
        } while(element);
        return {
            top: top,
            left: left
        }
    };

    const getVW = (percent:number):number => {
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const res = ((percent * w) / 100)
        return Math.trunc(res);
    }
    const remTopx = (rem:number):number => {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    useEffect(() => {
        if(previewCardRef.current) {
            setOffsets(acumulativeOffset(previewCardRef.current))
            if(modalDiff) {
                const pepe = ((getVW(14.8) * - 6) - 36) //Formula donde 6 es la cantidad de cards renderizadas, 36 es el gap de la lista (6) por la cantidad de cartas mostradas
                setDiff(pepe)
            }
        }
    }, [])

    //Apertura del modal
    if(previewCardRef.current) { 
        previewCardRef.current.onmouseenter = () => {
                setOpenPortal(true)
        }
    }
    const closePortal = () => {
        setOpenPortal(false)
    }
    return(
        <div ref={previewCardRef} className={style.ContPreview} >
            <img src={data.image.includes('null') ? defaultImage : data.image} alt={data.title} />
            {
                openPortal && 
                <MiniCard categoryBelong={categoryBelong} previewData={data} position={ {top: offsets.top, left: offsets.left + diff}} close={closePortal} first={first} last={last}/>
            }
        </div>
    )
}