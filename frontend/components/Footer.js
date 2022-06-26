import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ReactAudioPlayer from 'react-audio-player';
import { useAuthContext } from '../context/auth'


const Footer = () => {
    const router = useRouter()
    const [auth, setAuth] = useAuthContext()
    const [height, setHeight] = useState('380')
    useEffect(() => {
        if (router.pathname === '/about') {
            setHeight('80')
        } else {
            setHeight('380')
        }
    }, [router])

    if (auth) {
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
                    src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator&theme=0"
                    width="30%"
                    height={height}
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; 
                    clipboard-write;
                    encrypted-media; 
                    fullscreen; 
                    picture-in-picture"
                />
            </footer>
        )
    }

}

export default Footer;