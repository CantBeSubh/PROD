import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { addTimerM, getTimersQ } from '../../gql/queries'

import { useAuthContext } from '../../context/auth'

import TimerList from '../../components/Timer/TimerList'
import Input from '../../components/Input2'
import { spitTime } from '../../utils/SpitTime'

import styles from '../../styles/Home.module.css'


const index = () => {
    const router = useRouter()
    const [auth] = useAuthContext()
    useEffect(() => {
        if (!auth) {
            setTimeout(() => router.push('/auth'), 500)
        }
    }, [auth])

    const [entries, setEntries] = useState([])
    const getTimers = useQuery(getTimersQ, { variables: { uid: auth } })

    const [addTimer, status] = useMutation(addTimerM, { refetchQueries: [{ query: getTimersQ }, 'GetTimers'] })
    const [timer, setTimer] = useState()
    const [entry, setEntry] = useState({
        name: '',
        genre: '',
        category: '',
        start: null,
        end: null,
        isPaused: true
    })
    const [id, setId] = useState()

    useEffect(() => {
        if (getTimers.data) setEntries(getTimers.data.timers);
    }, [getTimers])

    useEffect(() => {
        if (entry.start && entry.end && entry.isPaused) {
            const l = {
                ...entry,
                uid: auth,
                start: entry.start.toString(),
                end: entry.end.toString()
            }
            delete l.isPaused
            addTimer({ variables: l })
            setEntry({
                name: '',
                genre: '',
                category: '',
                start: null,
                end: null,
                isPaused: true
            })
        }
    }, [entry])

    const handleStart = () => {
        let current = 0
        setEntry({ ...entry, end: null, start: new Date(), isPaused: false })
        setTimer(0)
        setId(setInterval(() => {
            current += 1000
            setTimer(current)
        }, 1000))
    }

    const handleStop = () => {
        clearInterval(id)
        setEntry({ ...entry, end: new Date(), isPaused: true })
        setTimer(0)
        setId('')
    }


    return (
        <div className={styles.container}>
            <div className='App'>
                <div className={styles.Container}>
                    <form className={styles.formContainer}>
                        <div className='form-group'>

                            <Input
                                label='Name'
                                type='text'
                                value={entry.name}
                                onChange={e => setEntry({ ...entry, name: e.target.value })}
                            />
                            <i className="input-icon uil uil-plus"></i>
                        </div>

                        <br />

                        <div className='form-group '>

                            <Input
                                label='Genre'
                                type='text'
                                value={entry.genre}
                                onChange={e => setEntry({ ...entry, genre: e.target.value })}
                            />
                            <i className="input-icon uil uil-plus"></i>
                        </div>

                        <br />

                        <div className='form-group'>

                            <Input
                                label='Category'
                                type='text'
                                value={entry.category}
                                onChange={e => setEntry({ ...entry, category: e.target.value })}
                            />
                            <i className="input-icon uil uil-plus"></i>
                        </div>

                        <br />

                        {
                            entry.isPaused &&
                            <button
                                className={styles.btn}
                                onClick={handleStart}
                            >Start</button>
                        }

                        {
                            !entry.isPaused &&
                            `${spitTime(timer)}`
                        }
                        {
                            !entry.isPaused &&
                            <div
                                className={styles.btn}
                                onClick={handleStop}>||
                            </div>
                        }
                    </form>

                    <div className={styles.image}>
                        <Image src='/Pixel.png'
                            width={540}
                            height={540}
                            alt='logo' />
                    </div>

                    <TimerList entries={entries} />
                </div>
            </div>
        </div>
    )
}

export default index