import { Action, AnyAction, AsyncThunkAction, AsyncThunkOptions, ThunkAction } from '@reduxjs/toolkit';
// import { AsyncThunkConfig } from '@reduxjs/toolkit/dist';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { MiniCardInterface } from '../../config/types';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../redux/store';
import MiniCard from '../MiniCard/MiniCard';
import style from './List.module.css';
// import DataDePrueba from './listadePrueba';
import leftArrowIcon from '../../media/listArrow.svg';
import { Link } from 'react-router-dom'

interface Props {
    name:string
    call:AsyncThunkAction<any, void, any>
}




export default function List ({name, call}:Props) {
    const elements = 6
    const dispatch = useAppDispatch()
    const lista = useAppSelector(state => state.movies.lists[name])
    // const [dataDePrueba, setDataDePrueba] = useState<MiniCardInterface[]>(DataDePrueba)
    // const [extracted, setExtracted] = useState<MiniCardInterface[]>([])
    const [indice, setIndice] = useState(0)
    const pepe = useRef<HTMLDivElement>(null)
    const pepePadre = useRef<HTMLDivElement>(null)
    const miniButtonsRef = useRef<HTMLDivElement>(null)
    const buttonsRef = useRef<HTMLDivElement>(null)
    const [leftButtonHidden, setLeftButtonHidden] = useState(true)

    // const [after, setAfer] = useState(false)
    const [afterItems, setAfterItems] = useState<MiniCardInterface[]>([])
    const [beforeItems, setBeforeItems] = useState<MiniCardInterface[]>([])
    const [start, setStart] = useState(0)

    const titleRef = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        // console.log('asdsa')
        if(!lista) {
            dispatch(call)
        }
        if(miniButtonsRef.current) {
            miniButtonsRef.current.children[indice].className = style.miniButtonSelected
        }
        // if(titleRef.current) {
        //     titleRef.current.onmouseenter = () => {
        //         if(titleRef.current) {
        //             titleRef.current.children[0].className = style.spanShow
        //         }
        //     }
        //     titleRef.current.onmouseleave = () => {
        //         if(titleRef.current) {
        //             titleRef.current.children[0].className = style.spanGone
        //         }    
        //     }
        // }
        // if(buttonsRef.current) {
        //     buttonsRef.current.onmouseover = () => {
        //         if(buttonsRef.current) {
        //             buttonsRef.current.style.zIndex = '0'
        //         }
        //         if(miniButtonsRef.current) {
        //             miniButtonsRef.current.style.visibility = 'visible'
        //         }
        //     }
        //     buttonsRef.current.onmouseleave = () => {
        //         if(buttonsRef.current) {
        //             buttonsRef.current.style.zIndex = '1'
        //         }
        //         if(miniButtonsRef.current) {
        //             miniButtonsRef.current.style.visibility = 'hidden'
        //         }
        //     }
        // }
    }, [])

    useEffect(() => {
        if(indice > elements - 1) {
            // console.log('epep', after)
            setAfterItems(lista.data.slice(0, 8))
            // setAfer(true)
        }
        
        if(indice == 1 && beforeItems.length < 1) {
            const items = lista.data.slice(-12, -1)
            items.push(lista.data[lista.data.length - 1])
            // console.log('PEPE', indice)
            setBeforeItems(items)
            setStart(2)
            setIndice(3)
            if(pepe.current) {
                pepe.current.style.transition = 'none'
                pepe.current.style.transform = `translateX(${((215 * elements) + 24) * -(3)}px)`
            }
            setLeftButtonHidden(false)
        }
        if(indice == 9) {
            if(pepe.current) {
                setIndice(start)
                pepe.current.style.transition = 'none'
                pepe.current.style.transform = `translateX(${((215 * elements) + 24) * - (start)}px)`
            }
        }
        if(indice == 1 && beforeItems.length > 0) {
            // console.log('PAREJA')
            setIndice(8)
            if(pepe.current) {
                pepe.current.style.transition = 'none'
                pepe.current.style.transform = `translateX(${((215 * elements) + 24) * - (8)}px)`
            }
        }
    }, [indice])
    

    const moveRight = () => {
        // console.log('DERECHA', indice)
        if(pepe.current) {
            pepe.current.style.transition = '1s'
            pepe.current.style.transform = `translateX(${((215 * elements) + 24) * - (indice + 1)}px)`
            pepe.current.ontransitionend = () => {
                    if (pepe.current) {
                        pepe.current.ontransitionend = null
                    }
                    
                    //miniButtons
                    if(miniButtonsRef.current) {
                        // console.log(indice)
                        if(indice == 8) {
                            miniButtonsRef.current.children[indice < 2 ? indice : indice - 2].className = style.miniButton
                            miniButtonsRef.current.children[0].className = style.miniButtonSelected
                        }
                        else {
                            miniButtonsRef.current.children[indice < 2 ? indice : indice - 2].className = style.miniButton
                            miniButtonsRef.current.children[indice < 2 ? indice + 1 : indice - 1].className = style.miniButtonSelected
                        }
                    }
                    setIndice(indice + 1)
                }
        }

    }
    
    const moveLeft = () => {
        // console.log('IZQUIERDA', indice)
        if(pepe.current) {
            pepe.current.style.transition = '1s'
            pepe.current.style.transform = `translateX(${((215 * elements) + 24) * -(indice - 1)}px)`
            pepe.current.ontransitionend = () => {
                if (pepe.current) {
                    pepe.current.ontransitionend = null
                    // console.log('AHORASI')
                }

                //miniButtons
                if(miniButtonsRef.current) {
                    // console.log(indice)
                    if(indice == 2) {
                        miniButtonsRef.current.children[indice -2].className = style.miniButton
                        miniButtonsRef.current.children[6].className = style.miniButtonSelected
                    }
                    else {
                        miniButtonsRef.current.children[indice > 2 ? indice - 2 : indice].className = style.miniButton
                        miniButtonsRef.current.children[indice > 2 ? indice - 3 : indice - 1].className = style.miniButtonSelected
                    }
                }
                setIndice(indice - 1)
            }
        }
    }
    return (
        <div className={style.ContList}>
            {/* <h1>{name[0].toUpperCase() + name.slice(1)}</h1> */}
            <div className={style.titleDiv}>
                <Link to='' className={style.link}>
                    <h1 ref={titleRef}>
                    {'Imaginative US TV Sci-Fi & Fantasy'}
                        <span className={style.spanShow}>Explore All</span>
                        <div>
                            <img src={leftArrowIcon} alt="arrow" />
                        </div>
                    </h1>
                </Link>
            </div>
            <div className={style.list} ref={pepePadre}>
                <div ref={buttonsRef} className={style.buttons}>
                    <div ref={miniButtonsRef}>
                        {miniButtons(7)}
                    </div>
                    <div>
                        <button className={ leftButtonHidden ? style.leftButton : style.listButtons} onClick={moveLeft} >
                            <img src={leftArrowIcon} alt="arrow" />
                        </button>
                        <button className={style.listButtons} onClick={moveRight} >
                            <img src={leftArrowIcon} alt="arrow" />
                        </button>
                    </div>
                </div>
                <div className={style.contentList} ref={pepe}>
                    {
                        beforeItems.length > 0 && beforeItems.map((el:MiniCardInterface, index) => {
                            return (
                                <MiniCard key={index} data={el} />
                            )
                        })
                    }
                    {
                        lista?.data?.map((el:MiniCardInterface, index) => {
                            if(index == 0 || index % 6 == 0)  {
                                return(
                                    <MiniCard key={index} data={el} first={true}/>
                                )
                            }
                            if(index % 6 == 5) {
                                return(
                                    <MiniCard key={index} data={el} last={true}/>
                                )
                            }
                            return (
                                <MiniCard key={index} data={el} />
                            )
                        })
                    }
                    {
                        afterItems.length > 0 && afterItems.map((el:MiniCardInterface, index) => {
                            return(
                                <MiniCard key={index} data={el} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function miniButtons (cant:number) {
    const array = []
    for(let i = 0; i < cant; i++) {
        array.push(<button key={i} className={style.miniButton}></button>)
    }
    return array
}