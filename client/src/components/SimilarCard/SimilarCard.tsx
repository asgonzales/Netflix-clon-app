import { SimilarCardInterface } from '../../config/types';
import AddToList from '../Buttons/AddToList/AddToList';
import MiniPlay from '../Buttons/MiniPlay/MiniPlay';
import style from './SimilarCard.module.css';
import defaultImage from '../../media/defaultImage.jpg';


interface SimilarCardProps {
    data:SimilarCardInterface
}




export default function SimilarCard ({data}:SimilarCardProps) {




    return (
        <div className={style.ContSimilarCard}>
            <div className={style.imageDiv}>
                <img src={data.image.includes('null') ? defaultImage : data.image} alt={data.title} />
                <div>
                    <div>
                        <MiniPlay />
                    </div>
                </div>
            </div>
            <div className={style.detailDiv}>
                <div className={style.up}>
                    <span>{data.date}</span>
                    <div>
                        <AddToList />
                    </div>
                </div>
                <div className={style.description}>
                    <p>{data.description}</p>
                    <div></div>
                </div>
            </div>
        </div>
    )
}