import style from './NavBar.module.css';
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import brandLogo from '../../media/Banner.png';
import { debounce } from '../../functions';







export default function NavBar () {
    const [isMobile, setIsMobile] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const openMobileMenuRef = useRef<HTMLDivElement>(null)
    const [navBarScroll, setNavBarScroll] = useState(false)

    window.addEventListener('resize', debounce(() => {
        if(window.outerWidth > 768) {
            setIsMobile(false)
        }
        else {
            setIsMobile(true)
        }
    }, 500))

    const changeBackground = () => {
        if(window.scrollY > 0) setNavBarScroll(true)
        else setNavBarScroll(false)
    }
    
    useEffect(() => {
        window.addEventListener('scroll', changeBackground)
        if(window.outerWidth > 768) {
            setIsMobile(false)
        }
        else {
            setIsMobile(true)
        }
    }, [])

    const openMobileMenuController = () => {
        if(openMobileMenu) {
            if(openMobileMenuRef.current) {
                openMobileMenuRef.current.style.transition = '.2s'
                openMobileMenuRef.current.style.transform = 'translateX(-100%)'
                setTimeout(() => {
                    setOpenMobileMenu(false)
                }, 200)
            }
        }
        else setOpenMobileMenu(true)
    }

    if(isMobile) {
        return (
            <div className={navBarScroll ? style.ContNavBarScroll : style.ContNavBar}>
            <div onClick={openMobileMenuController} className={style.menu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
                <Link to='/browse' className={style.homeImageLink}>
                    <img src={brandLogo} alt="logo" />
                </Link>
                {
                    openMobileMenu &&
                    <div className={style.contLinks}>
                        <div ref={openMobileMenuRef} className={style.links}>
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
                    </div>
                }
        </div>
        )
    }
    else {
        return (
            <div className={navBarScroll ? style.ContNavBarScroll : style.ContNavBar}>
                <div className={style.links}>
                    <Link to='/browse' className={style.homeImageLink}>
                        <img src={brandLogo} alt="logo" />
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

}