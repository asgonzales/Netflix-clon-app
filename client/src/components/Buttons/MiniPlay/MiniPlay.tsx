import style from './MiniPlay.module.css';
import playIcon from '../../../media/play.svg';







export default function MiniPlay () {




    return (
        <div className={style.ContMiniPlay}>
            <img src={playIcon} alt="play" />
        </div>
    )
}