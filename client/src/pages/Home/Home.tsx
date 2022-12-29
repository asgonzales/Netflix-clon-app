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
                            <div key={index}>
                                <List categoryToCall={el} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function callLists (q:number, categories:categoryType[]):categoryType[] {
    const selectedCategories:categoryType[] = []
    let i = 0
    while (i < q) {
        const option = categories[Math.round(Math.random() * (categories.length - 1))]
        // console.log('Inicio', selectedCategories)
        if(i === 0) {
            selectedCategories.push(option)
            i++
            // console.log('I igual a cero', selectedCategories)
        }
        else {
            // i = 99
            // console.log('Vuelta numero ', i, selectedCategories)
            const ids = selectedCategories.map(el => el.id )
            if(!ids.includes(option.id)) {
                    selectedCategories.push(option)
                    i++
                    // console.log('Push en la vuelta numero', i, selectedCategories)
                }
            }
        }
        // console.log('FIN FUNCION')
    return selectedCategories
}