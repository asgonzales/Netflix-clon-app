import { useEffect, useRef, useState } from 'react';
import { MiniCardInterface } from '../../config/types';
import style from './PreviewCard.module.css';
import ReactDOM from 'react-dom';
import MiniCard from '../MiniCard/MiniCard';


interface Props {
    data:MiniCardInterface
    first?:boolean
    last?:boolean
    // onClick:void
    modalDiff?:boolean
}


interface modalProps {
    top:number
    left:number
    close:() => void
}
function Portal ({top, left, close}:modalProps) {

    const portalRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(portalRef.current) {
            portalRef.current.onmouseenter = () => {
                console.log('entré')
            }
            portalRef.current.onmouseleave = () => {
                console.log('sali')
                close()
            }
        }
    }, [])
    return ReactDOM.createPortal(
        <div ref={portalRef} className={style.pepe}  style={{position: 'absolute', top: top, left: left}}>
            <h1>Ola soy el portal</h1>
        </div>
    , document.getElementById('modals')!)
}


export default function PreviewCard ({data, modalDiff}:Props) {

    const [openPortal, setOpenPortal] = useState(false)
    const [offsets, setOffsets] = useState({
        top: 0,
        left: 0 
    })
    const [diff, setDiff] = useState(0)
    const previewCardRef = useRef<HTMLDivElement>(null)

    if(previewCardRef.current) {
        // console.log(previewCardRef.current.style.position)
        // console.log('X:', previewCardRef)
        previewCardRef.current.onmouseenter = () => {
            setOpenPortal(true)
        }
        // previewCardRef.current.onmouseleave = () => {
        //     setOpenPortal(false)
        // }
    }
    const [ahora, setAhora] = useState('noo')
    // useEffect(() => {
    //     if(indice && indice > 1 && offsets.top === 0) {
    //         const pepe = ((215 * - 6) - 24)
    //         // console.log('PEPE:', pepe)
    //         setOffsets({
    //             top: 0,
    //             left: pepe
    //         })
    //         // setAhora('sii')
    //     }
    // }, [])
    useEffect(() => {
        if(previewCardRef.current) {
            var cumulativeOffset = function(element:HTMLDivElement) {
                var top = 0, left = 0;
                do {
                    top += element.offsetTop  || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent as HTMLDivElement;
                } while(element);
                // console.log(top, left)
                return {
                    top: top,
                    left: left
                };
            };
            // setOffsets({
            //     top: previewCardRef.current.offsetTop,
            //     left: previewCardRef.current.offsetLeft
            // })
            // const {top, left} = cumulativeOffset(previewCardRef.current)
            setOffsets(cumulativeOffset(previewCardRef.current))
            if(modalDiff) {
                const pepe = ((215 * -6) -24)
                // console.log('AJUA')
                // setOffsets({
                //     top: offsets.top,
                //     left: offsets.left + pepe
                // })
                setDiff(pepe)
            }
                // cumulativeOffset(previewCardRef.current))
        }
    }, [])
    // if(previewCardRef.current) {
    //     previewCardRef.current.onmouseover = () => {
    //         console.log('AJUA')
    //     }
    // }
    const close = () => {
        setOpenPortal(false)
    }

    return(
        <div ref={previewCardRef} className={style.ContPreview}>
            <img src={data.image} alt="prev" />
            {
                openPortal && <MiniCard ahora={ahora} data={data} position={ {top: offsets.top, left: offsets.left + diff}} close={close} />
            }
            {/* <button onClick={() => PORTAL()}></button> */}
        </div>
    )
}