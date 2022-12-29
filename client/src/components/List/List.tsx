import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react';
import { categoryType, MiniCardInterface } from '../../config/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
// import MiniCard from '../MiniCard/MiniCard';
import style from './List.module.css';
// import DataDePrueba from './listadePrueba';
import leftArrowIcon from '../../media/listArrow.svg';
import { Link } from 'react-router-dom'
import PreviewCard from '../PreviewCard/PreviewCard';
import { getMoviesByCategory } from '../../redux/movieSlice';

interface Props {
    name:string
    // call:AsyncThunkAction<{name:string, data:any}, void, any>
    categoryToCall:categoryType
}




export default function List ({name, categoryToCall}:Props) {
    const elements = 6
    const dispatch = useAppDispatch()
    const lista = useAppSelector(state => state.movies.lists[name])
    const [indice, setIndice] = useState(1)
    const [subLists, setSubLists] = useState(1)
    const listContent = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const rigthButtonImageRef = useRef<HTMLImageElement>(null)
    const leftButtonImageRef = useRef<HTMLImageElement>(null)
    const miniButtonsRef = useRef<HTMLDivElement>(null)
    const [leftButtonHidden, setLeftButtonHidden] = useState(true)
    const [afterItems, setAfterItems] = useState<MiniCardInterface[]>([])
    const [showedItems, setShowedItems] = useState<MiniCardInterface[]>([])
    const [beforeItems, setBeforeItems] = useState<MiniCardInterface[]>([])
    const titleRef = useRef<HTMLHeadingElement>(null)
    const [modalDiff, setModalDiff] = useState(false)
    useEffect(() => {
        if(beforeItems.length > 0) {
            setModalDiff(true)
        }
    }, [beforeItems.length])

    useEffect(() => {
        if(!lista) {
            dispatch(getMoviesByCategory(categoryToCall))
        }
        else {
            setShowedItems(lista.data.slice(0, elements))
            setAfterItems(lista.data.slice(elements * indice, elements + (elements * 1)))
            setSubLists((lista.data.length / elements))
        }
    }, [lista?.data.length])
    
    useEffect(() => {
        if(miniButtonsRef.current) {
            for(let i = 0; i < miniButtonsRef.current.children.length; i++) {
                const buttonSelected = miniButtonsRef.current.children[i]
                if(buttonSelected) buttonSelected.className = style.miniButton
            }

            miniButtonsRef.current.children[indice - 1].className = style.miniButtonSelected

        }
    }, [indice])
    if(listRef.current) {
        listRef.current.onmouseenter = () => {
            if(miniButtonsRef.current) miniButtonsRef.current.style.visibility = 'visible'
            if(leftButtonImageRef.current) leftButtonImageRef.current.style.visibility = 'visible'
            if(rigthButtonImageRef.current) rigthButtonImageRef.current.style.visibility = 'visible'
        }
        listRef.current.onmouseleave = () => {
            if(miniButtonsRef.current) miniButtonsRef.current.style.visibility = 'hidden'
            if(leftButtonImageRef.current) leftButtonImageRef.current.style.visibility = 'hidden'
            if(rigthButtonImageRef.current) rigthButtonImageRef.current.style.visibility = 'hidden'
        }
    }
    const moveRight = () => {
        const space = beforeItems.length === 0 ? ((215 * - afterItems.length) - 24) : (((215 * - afterItems.length * 2) - 48))
        if(listContent.current) {
            listContent.current.ontransitionstart = () => {
                setTimeout(() => {
                    setShowedItems(afterItems)       
                }, 900);
            }
            listContent.current.style.transition = '1s'
            listContent.current.style.transform = `translateX(${space}px)`
            listContent.current.ontransitionend = () => {
                if(leftButtonHidden) setLeftButtonHidden(false)
                setBeforeItems(showedItems)
                if (listContent.current) {
                    listContent.current.ontransitionend = null
                    listContent.current.style.transition = '0s'
                    listContent.current.style.transform = `translateX(${((215 * - afterItems.length) - 24)}px)`
                }
                if(indice === (subLists - 1)) {
                    setAfterItems(lista.data.slice(0, elements))
                    setIndice(indice + 1)
                }
                else if(indice === subLists) {
                    setIndice(1)
                    setAfterItems(lista.data.slice(elements, elements * 2))
                }
                else {
                    let firstElement = (elements * (indice + 1))
                    let lastElement = (elements + (elements * (indice + 1)))
                    setAfterItems(lista.data.slice(firstElement, lastElement))
                    setIndice(indice + 1)
                }
            }
        }
    }
    
    const moveLeft = () => {
        if(listContent.current) {
            listContent.current.ontransitionstart = () => {
                setTimeout(() => {
                    setAfterItems(showedItems)
                    setShowedItems(beforeItems)
                }, 800)
            }
            listContent.current.style.transition = '1s'
            listContent.current.style.transform = `translateX(0px)`
            listContent.current.ontransitionend = () => {
                if (listContent.current) {
                    listContent.current.ontransitionend = null
                    listContent.current.style.transition = '0s'
                    listContent.current.style.transform = `translateX(${((215 * - afterItems.length) - 24)}px)`
                }
                if(indice === 2) {
                    const items = lista.data.slice(-6, -1)
                    items.push(lista.data[lista.data.length - 1])
                    setBeforeItems(items)
                    setIndice(indice - 1)
                }
                else if(indice === 1){

                    let lastElement = elements * (indice - 2)
                    let firstElement = lastElement - elements
                    console.log(firstElement, lastElement)
                    setBeforeItems(lista.data.slice(firstElement, lastElement))
                    setIndice(subLists)
                }
                else {
                    let lastElement = elements * (indice - 2)
                    let firstElement = lastElement - elements
                    console.log(firstElement, lastElement)
                    setBeforeItems(lista.data.slice(firstElement, lastElement))
                    setIndice(indice - 1)
                }
            }
        }
    }
    // const consologeo = () => {
    //     console.log(
    //         'Items anteriores', beforeItems,
    //         'Items mostrados', showedItems,
    //         'Items siguientes', afterItems,
    //         'indice', indice,
    //         'subLists', subLists
    //     )
    // }
    return (
        <div className={style.ContList}>
            <div className={`${style.listTitle} listTitle`}>
                <Link to='' className={style.link}>
                    <h1 ref={titleRef}>
                    {name[0].toUpperCase() + name.slice(1)}
                        <span className={style.spanShow}>Explore All</span>
                        <div>
                            <img src={leftArrowIcon} alt="arrow" />
                        </div>
                    </h1>
                </Link>
            </div>
            <div className={style.list} ref={listRef}>
                <div className={style.contentList} ref={listContent}>
                    {
                        beforeItems.length > 0 && beforeItems.map((el:MiniCardInterface, index) => {
                            return (
                                <PreviewCard key={el.id} data={el} />
                            )
                        })
                    }
                    {
                        showedItems.length > 0 && showedItems.map((el:MiniCardInterface, index) => {
                            if(index === 0)  {
                                return(
                                    <PreviewCard key={el.id} data={el} modalDiff={modalDiff} first />
                                )
                            }
                            if(index === showedItems.length - 1) {
                                return(
                                    <PreviewCard key={el.id} data={el} modalDiff={modalDiff} last />
                                )
                            }
                            return (
                                <PreviewCard key={el.id} data={el} modalDiff={modalDiff} />
                            )
                        })
                    }
                    {
                        afterItems.length > 0 && afterItems.map((el:MiniCardInterface, index) => {
                            return(
                                <PreviewCard key={el.id} data={el} />
                            )
                        })
                    }
                </div>
                <button
                 className={ 
                 leftButtonHidden ? 
                 style.leftButtonHidden : 
                 style.listButtonLeft} onClick={moveLeft}
                >
                    <img ref={leftButtonImageRef} src={leftArrowIcon} alt="arrow" />
                </button>
                {/* <button style={{
                    position:'absolute',
                    top: 0,
                    left: '50%',
                    zIndex: 5
                }}
                onClick={consologeo}>ASD</button> */}
                <button className={style.listButtonRight} onClick={moveRight} >
                    <img ref={rigthButtonImageRef} src={leftArrowIcon} alt="arrow" />
                </button>
            </div>
            <div ref={miniButtonsRef} className={style.miniButtons}>
                {miniButtons(subLists, categoryToCall.id)}
            </div>
        </div>
    )
}

function miniButtons (cant:number, categoryId:number) {
    const array = []
    for(let i = 0; i < cant; i++) {
        if(i === 0) array.push(<button key={i} className={style.miniButtonSelected}></button>)
        array.push(<button key={'categoryId' + i} className={style.miniButton}></button>)
    }
    return array
}