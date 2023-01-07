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


// interface modalProps {
//     top:number
//     left:number
//     close:() => void
// }
// function Portal ({top, left, close}:modalProps) {

//     const portalRef = useRef<HTMLDivElement>(null)
//     useEffect(() => {
//         if(portalRef.current) {
//             portalRef.current.onmouseenter = () => {
//                 console.log('entré')
//             }
//             portalRef.current.onmouseleave = () => {
//                 console.log('sali')
//                 close()
//             }
//         }
//     }, [])
//     return ReactDOM.createPortal(
//         <div ref={portalRef} className={style.pepe}  style={{position: 'absolute', top: top, left: left}}>
//             <h1>Ola soy el portal</h1>
//         </div>
//     , document.getElementById('modals')!)
// }


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

    useEffect(() => {
        if(previewCardRef.current) {
            setOffsets(acumulativeOffset(previewCardRef.current))
            if(modalDiff) {
                const pepe = ((215 * -6) -24) //Formula donde 6 es la cantidad de cards renderizadas
                setDiff(pepe)
            }
        }
    }, [])

    //Apertura del modal
    if(previewCardRef.current) { 
        previewCardRef.current.onmouseenter = () => {
            setOpenPortal(true)
        }
        previewCardRef.current.onmouseleave = () => {
            const children = document.getElementById('miniCardModal')
                if( children && children.children.length == 0) {
                    setOpenPortal(false)
                }
        }
    }

    const closePortal = () => {
        setOpenPortal(false)
    }

    return(
        <div ref={previewCardRef} className={style.ContPreview}>
            <img src={data.image.includes('null') ? defaultImage : data.image} alt={data.title} />
            {
                openPortal && <MiniCard categoryBelong={categoryBelong} previewData={data} position={ {top: offsets.top, left: offsets.left + diff}} close={closePortal} first={first} last={last}/>
            }
        </div>
    )
}