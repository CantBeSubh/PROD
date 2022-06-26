import { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

const Footer = () => {
    const [height, setHeight] = useState('380')
    return (
        <footer>
            {/* <ReactAudioPlayer
                src="https://audioplayer.madza.dev/Madza-Persistence.mp3"
                autoPlay
                controls
                className="player"
            /> */}

            <iframe
                className="player"
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/4pZbkjfYF1Iciank0Betm1?utm_source=generator&theme=0"
                width="30%"
                height={height}
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; 
                clipboard-write;
                encrypted-media; 
                fullscreen; 
                picture-in-picture"
                onClick={() => console.log('dingus')}
            />
        </footer>
    )
}

export default Footer;