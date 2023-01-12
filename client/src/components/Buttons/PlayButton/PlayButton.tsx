import style from './PlayButton.module.css';
import playIcon from '../../../media/play.svg';






export default function PlayButton() {




    return(
            <button className={style.ContPlayButton}>
                <img src={playIcon} alt="play Icon" />
                Play
            </button>
    )
}