import style from './Landing.module.css';
import arrowIcon from '../../media/listArrow.svg'
import React, { ChangeEvent, ChangeEventHandler, FormEvent, useState, useRef, useEffect, EventHandler } from 'react';
import backgroundImage from '../../media/LandingBackground.jpg';
import banner from '../../media/Banner.png';
import plusIcon from '../../media/plus.svg';
import { Link } from 'react-router-dom';




export default function Landing () {
    const [inputFocus, setInputFocus] = useState(false)
    const labelRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const errorRef = useRef<HTMLDivElement>(null)
    const errorSpanRef = useRef<HTMLSpanElement>(null)
    const emailRE = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const [email, setEmail] = useState('')

    document.title = 'MovieApp'
    const inputOnFocus = () => setInputFocus(true)
    const inputOnBlur = () => {
        if(inputRef.current) {
            setInputFocus(inputRef.current.value !== '' ? true : false)
        }
    }

    useEffect(() => {
        if( inputFocus) {
            // console.log('asdasd')
            if(labelRef.current) {
                labelRef.current.className = style.labelWritten
            }
        }
        else {
            if(labelRef.current) {
                labelRef.current.className = style.label
            }
        }
    }, [inputFocus])

    const inputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.value !== '' || inputFocus) {
            if(labelRef.current) {
                labelRef.current.className = style.labelWritten
            }
        }
        else {
            if(labelRef.current) {
                labelRef.current.className = style.label
            }
        }
        if(e.target.value.length < 5 || !emailRE.test(e.target.value)) {
            if(errorRef.current) {
                errorRef.current.className = style.errorFound
            }
            if(errorSpanRef.current) {
                errorSpanRef.current.hidden = false
                if(e.target.value.length < 5) {
                    errorSpanRef.current.innerText = 'El email es obligatorio.'
                }
                else {
                    errorSpanRef.current.innerText = 'Escribe una dirección de email válida.'
                }
            }
        }
        else {
            if(errorRef.current) {
                errorRef.current.className = ''
            }
            if(errorSpanRef.current) {
                errorSpanRef.current.hidden = true
            }
            setEmail(e.target.value)
        }
    }

    const submitHandler = (e:FormEvent) => {
        e.preventDefault()
        if(email !== '') {
            console.log(email)
        }
    }   

    const expandQuestion = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const expandendDivs = document.getElementsByClassName(style.expanded)
        // console.log('uno', pepe[0].className)
        const div = e.target as HTMLDivElement
        const actual = div.parentElement?.children[1].className
        // div.className = style.pepe
        // console.log('PRE CAMBIO', div.parentElement?.children[1].className)
        for(let i = 0; i < expandendDivs.length; i++) {
            expandendDivs[i].className = style.expand
            // console.log('asdasda', pepe[1])
        }
        // console.log('POST CAMBIO', div.parentElement?.children[1].className)
        if(div.parentElement) {
            // console.log(div.parentElement)
            // console.log(div.parentElement.children)
            if(actual == style.expand) {
                div.parentElement.children[1].className = style.expanded
                // console.log('cambio a expanded', div.parentElement.children[1].className)
            }
            else {
                    div.parentElement.children[1].className = style.expand
                    // console.log('cambio a expand', div.parentElement.children[1].className)
            }
            // if(div.parentElement.children[1].className == style.expanded) {
                
            // }
            // console.log(div.parentElement.children[1].className)
            // console.log(div.parentElement.children[1].className)
        }
        // console.log('CLASE', div.className)
        // if(div.className == style.expanded) {
        //     div.className = style.expand
        // }
        // conole.log(div.parentElement?.children[1]?.className)
    }

    return (
        <div className={style.ContLanding}>
            <div className={style.background}>
                <img src={backgroundImage} alt="background" />
            </div>
            <div className={style.content} >
                <div className={style.navDiv}>
                    <div className={style.banner}>
                        <img src={banner} alt="logo" />
                    </div>
                    <div className={style.options}>
                        <label ></label>
                        <select name="languages" id="languages">
                            <option value="español">Español</option>
                            <option value="ingles">English</option>
                        </select>
                        <button>Iniciar sesión</button>
                    </div>
                </div>
                <div className={style.getStarted}>
                    <h1>Películas y series ilimitadas y mucho más</h1>
                    <h4>Disfruta donde quieras. Cancela cuando quieras.</h4>
                    <p>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</p>
                    <form onSubmit={e => submitHandler(e)} className={style.suscriptionForm}>
                        <div className={style.inputsDiv}>
                            <div ref={errorRef}>
                                <input ref={inputRef} className={style.input} type="text" onChange={e => inputHandler(e)} onFocus={inputOnFocus} onBlur={inputOnBlur} />
                                <label ref={labelRef} className={style.label} >Email</label>
                            </div>
                            <div>
                                <button type='submit'>
                                    <span>Comenzar</span>
                                    <img src={arrowIcon} alt="arrow" />
                                </button>
                            </div>
                        </div>
                        <div className={style.errorDiv}>
                            <span ref={errorSpanRef} hidden>El email es obligatorio.</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className={style.cards}>
                <div className={style.card}>
                    <div className={style.text}>
                        <div>
                            <h1>Disfruta en tu TV</h1>
                            <p>Ve en smart TV, PlayStation, Xbox, Chromecast, Apple TV, reproductores de Blu-ray y más.</p>
                        </div>
                    </div>
                    <div className={style.image}>
                        <div className={style.videoDiv}>
                            <img src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png' alt="tv" />
                            <video className={style.video} data-uia={style.video} autoPlay playsInline muted loop>
                                <source src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v' type='video/m4v' />
                                <source src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v' type='video/ogg' />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={`${style.card} ${style.invert}`}>
                    <div className={style.textLeft}>
                        <div>
                            <h1>Descargar tus series para verlas offline</h1>
                            <p>Guarda tu contenido favorito y tendrás siempre algo para ver.</p>
                        </div>
                    </div>
                    <div className={style.image}>
                        <div className={style.downloadDiv}>
                            <img src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg' alt="download" />
                            <div className={style.download}>
                                <div>
                                    <img src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png' alt="cover" />
                                </div>
                                <div>
                                    <span>Stranger Things</span>
                                    <span>Descargando...</span>
                                </div>
                                <div>
                                    {/* <img src="ttps://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt="loading" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.text}>
                        <div>
                            <h1>Disfruta donde quieras</h1>
                            <p>Películas y series ilimitadas en tu teléfono, tablet, computadora y TV sin costo adicional.</p>
                        </div>
                    </div>
                    <div className={style.image}>
                        <div className={style.videoDiv}>
                            <img src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png' alt="tv" />
                            <video className={style.videoMac} data-uia={style.video} autoPlay playsInline muted loop>
                                <source src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v' type='video/m4v' />
                                <source src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v' type='video/ogg' />
                            </video>
                        </div>
                    </div>
                </div>
                <div className={`${style.card} ${style.invert}`}>
                    <div className={style.textLeft}>
                        <div>
                            <h1>Crea perfiles para niños</h1>
                            <p>Los niños vivirán aventuras con sus personajes favoritos en un espacio diseñado exclusivamente para ellos, sin costo con tu membresía.</p>
                        </div>
                    </div>
                    <div className={style.image}>
                        <div className={style.videoDiv}>
                            <img src="https://occ-0-2443-420.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABWhA7S8gKgO2_QQSYRTfuHJsMzqlrD0dFYILnwCBe0hjblWT1cNH7K1cDnOR_6ogaNeR404obloJ4HjEw-V-7ngs_k7W1kNNv89C.png?r=8ec" alt="kids" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.questionsDiv}>
                <h1>Preguntas frecuentes</h1>
                <div className={style.question} >
                    <div className={style.mini} onClick={(e) => expandQuestion(e)}>
                        <span>¿Que es MovieApp?</span>
                        <div className={style.expandIcon}>
                            <img src={plusIcon} alt="more" />
                        </div>
                    </div>
                    <div className={style.expand}>
                        <p>MovieApp es una aplicación que trata de recrear la estética de la página oficial de Netflix. MovieApp no ofrece ningún tipo de servicio de streaming, solo ofrece información de películas y series.</p>
                    </div>
                </div>
                <div className={style.question} >
                    <div className={style.mini} onClick={(e) => expandQuestion(e)}>
                        <span>¿Cuánto cuesta?</span>
                        <div className={style.expandIcon}>
                            <img src={plusIcon} alt="more" />
                        </div>
                    </div>
                    <div className={style.expand}>
                        <p>No cuesta nada, es una página hecha con propósitos académicos.</p>
                    </div>
                </div>
                <div className={style.question} >
                    <div className={style.mini} onClick={(e) => expandQuestion(e)}>
                        <span>¿En qué etapa se encuentra?</span>
                        <div className={style.expandIcon}>
                            <img src={plusIcon} alt="more" />
                        </div>
                    </div>
                    <div className={style.expand}>
                        <p>Actualmente se encuentra en etapa de desarrollo, calculo que tengo un 20% terminado.</p>
                    </div>
                </div>
                <div className={style.question} >
                    <div className={style.mini} onClick={(e) => expandQuestion(e)}>
                        <span>¿Cuántas funciones tiene?</span>
                        <div className={style.expandIcon}>
                            <img src={plusIcon} alt="more" />
                        </div>
                    </div>
                    <div className={style.expand}>
                        <p>La idea principal es replicar la estética pero también incorporar funciones generales como registro e inicio de sesión, lista de favoritos, perfiles, etc.</p>
                    </div>
                </div>
                <div>
                    <span>¿Quieres ver Net</span>
                </div>
                <div className={style.registerBottom}>
                    <p>¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.</p>
                    <form onSubmit={e => submitHandler(e)} className={style.suscriptionForm}>
                        <div className={style.inputsDiv}>
                            <div ref={errorRef}>
                                <input ref={inputRef} className={style.input} type="text" onChange={e => inputHandler(e)} onFocus={inputOnFocus} onBlur={inputOnBlur} />
                                <label ref={labelRef} className={style.label} >Email</label>
                            </div>
                            <div>
                                <button type='submit'>
                                    <span>Comenzar</span>
                                    <img src={arrowIcon} alt="arrow" />
                                </button>
                            </div>
                        </div>
                        <div className={style.errorDiv}>
                            <span ref={errorSpanRef} hidden>El email es obligatorio.</span>
                        </div>
                    </form>
                </div>
            </div>
            <div className={style.footerDiv}>
                <div className={style.footerContent}>
                    <div>
                        <span>¿Preguntas? Contáctanos con un email a asgonzales@gmail.com</span>
                    </div>
                    <div className={style.links}>
                        <div>
                            <Link className={style.linkFooter} to=''>Preguntas frecuentes</Link>
                            <Link className={style.linkFooter} to=''>Relaciones con inversionistas</Link>
                            <Link className={style.linkFooter} to=''>Privacidad</Link>
                            <Link className={style.linkFooter} to=''>Prueba de velocidad</Link>
                        </div>
                        <div>
                            <Link className={style.linkFooter} to=''>Centro de ayuda</Link>
                            <Link className={style.linkFooter} to=''>Empleo</Link>
                            <Link className={style.linkFooter} to=''>Preferencia de cookies</Link>
                            <Link className={style.linkFooter} to=''>Avisos legales</Link>
                        </div>
                        <div>
                            <Link className={style.linkFooter} to=''>Cuenta</Link>
                            <Link className={style.linkFooter} to=''>Formas de ver</Link>
                            <Link className={style.linkFooter} to=''>Información corporativa</Link>
                            <Link className={style.linkFooter} to=''>Solo en Netflix</Link>
                        </div>
                        <div>
                            <Link className={style.linkFooter} to=''>Prensa</Link>
                            <Link className={style.linkFooter} to=''>Términos de uso</Link>
                            <Link className={style.linkFooter} to=''>Contáctanos</Link>
                        </div>
                    </div>
                    <div>
                        <div className={`${style.options} ${style.bottomOptions}`}>
                            <label ></label>
                            <select name="languages" id="languages" className={style.bottomSelect}>
                                <option value="español">Español</option>
                                <option value="ingles">English</option>
                            </select>
                        </div>
                        <span>MovieApp Argentina</span>
                    </div>
                </div>
            </div>
        </div>
    )
}