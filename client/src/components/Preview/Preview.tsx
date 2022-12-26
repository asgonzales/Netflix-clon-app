import style from './Preview.module.css';



interface Props {
    imgSource:string
    id?:number
}




export default function ({imgSource, id}:Props) {




    return(
        <div className={style.ContPreview}>
            <img src={imgSource} alt="prev" />
        </div>
    )
}