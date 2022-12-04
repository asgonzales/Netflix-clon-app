import style from './NavBar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import brandLogo from '../../media/Banner.png';






export default function NavBar () {

    const [navBarScroll, setNavBarScroll] = useState(false)
    const changeBackground = () => {
        if(window.scrollY > 0) setNavBarScroll(true)
        else setNavBarScroll(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
    })


    return (
        <div className={navBarScroll ? style.ContNavBarScroll : style.ContNavBar}>
            <div className={style.links}>
                <Link to='/browse' className={style.homeImageLink}>
                    <img src={brandLogo} alt="logo" />
                    {/* <button onClick={ () => console.log(window.scrollY)}>OA</button> */}
                </Link>
                <NavLink to='/browse' className={({isActive}) => isActive ? style.linkActive : style.link}>
                    Home
                </NavLink>
                <NavLink to='/series' className={({isActive}) => isActive ? style.linkActive : style.link}>
                    TV Shows
                </NavLink>
                <NavLink to='/movies' className={({isActive}) => isActive ? style.linkActive : style.link}>
                    Movies
                </NavLink>
            </div>
            <div className={style.userMenu}>

            </div>
        </div>
    )
}