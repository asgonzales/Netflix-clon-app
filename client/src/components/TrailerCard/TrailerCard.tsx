import { TrailerCardInterface } from '../../config/types';
import MiniPlay from '../Buttons/MiniPlay/MiniPlay';
import style from './TrailerCard.module.css';
import YouTube from 'react-youtube';


interface TrailerCardProps {
    data:TrailerCardInterface
    title:string
}




export default function TrailerCard ({data, title}:TrailerCardProps) {


    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 0,
            frameborder: 0,
            showinfo: false,
            modestbranding: true
          },
    }

    return (
        <div className={style.ContTrailerCard}>
            <div className={style.videoDiv}>
                {/* <div className={style.videoYotubeDiv}> */}
                    <YouTube videoId={data.key} className={style.video} opts={opts} />
                {/* </div> */}
                {/* <div className={style.playButtonDiv}>
                    <div>
                        <MiniPlay />
                    </div>
                </div> */}
            </div>
            <div className={style.titleDiv}>
                <span>{data.type}: {title}</span>
            </div>
        </div>
    )
}