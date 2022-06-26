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
                <span
                    onClick={() => {
                        if (height == '80') {
                            for (let i = 81; i < 381; i++) {
                                setTimeout(() => { setHeight(i) }, 100)
                            }
                        } else {
                            for (let i = 379; i > 79; i--) {
                                setTimeout(() => { setHeight(i) }, 100)
                            }
                        }
                    }
                    }
                >
                    {
                        height == '80' ? '+' : '-'
                    }
                </span>
            </footer>
        )
    }

}

export default Footer;