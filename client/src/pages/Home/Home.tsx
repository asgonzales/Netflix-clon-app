import style from './Home.module.css';
import Visualizer from '../../components/visualizer/Visualizer';
import { useEffect, useState } from 'react';
import List from '../../components/List/List';
import { getMovieCategories, getMoviesByCategory, getPopularMovies } from '../../redux/movieSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { categoryType } from '../../config/types';






export default function Home () {

    const dispatch = useAppDispatch()
    const categories = useAppSelector(state => state.movies.categories.data)
    const [lists, setLists] = useState<categoryType[]>([])
    document.title = 'Home - MovieApp'
    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getMovieCategories())
        }
        else {
            // console.log(callLists(5, categories))
            setLists(callLists(5, categories))
        }
        
    }, [categories.length])



    return (
        <div className={style.ContHome}>
            <Visualizer />
            <div className={style.listsDiv}>
                {
                    categories.length > 0 && lists.map((el, index) => {
                        return(
                            <div>
                                <List key={index} name={el.name} call={getMoviesByCategory(el)} />
                            </div>
                        )
                    })
                }
            </div>
            {/* <div className={style.lists}>
                <List name={'popular'} call={getPopularMovies()}/>
            </div> */}
        </div>
    )
}

function callLists (q:number, categories:categoryType[]):categoryType[] {
    // const categories = useAppSelector(state => state.movies.categories.data)
    // console.log('INICIO FUNCION')
    const selectedCategories:categoryType[] = []
    // console.log('Vacio', selectedCategories)
    // console.log('INICIO CATEGORIAS', categories)
    let i = 0
    // console.log('i', i)
    while (i < q) {
        const option = categories[Math.round(Math.random() * (categories.length - 1))]
        console.log('Inicio', selectedCategories)
        if(i === 0) {
            selectedCategories.push(option)
            i++
            console.log('I igual a cero', selectedCategories)
        }
        else {
            // i = 99
            console.log('Vuelta numero ', i, selectedCategories)
            const ids = selectedCategories.map(el => el.id )
            if(!ids.includes(option.id)) {
                    selectedCategories.push(option)
                    i++
                    console.log('Push en la vuelta numero', i, selectedCategories)
                }
            }
        }
        // selectedCategories.push(categories[Math.round(Math.random() * (categories.length - 1))])
        console.log('FIN FUNCION')
    return selectedCategories
}