import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { addTimerM, getTimersQ } from '../../gql/queries'
import { useAuthContext } from '../../context/auth'
import TimerList from '../../components/Timer/TimerList'
import { spitTime } from '../../utils/SpitTime'
import { useRouter } from 'next/router'


const index = () => {
    const router = useRouter()
    const [auth, setAuth] = useAuthContext()
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
            const l = { ...entry, uid: auth, start: entry.start.toString(), end: entry.end.toString() }
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
        <div>
            <form>
                <input
                    placeholder='name'
                    type='text'
                    value={entry.name}
                    onChange={e => setEntry({ ...entry, name: e.target.value })}
                    autoComplete='off'
                />
                <input
                    placeholder='genre'
                    type='text'
                    value={entry.genre}
                    onChange={e => setEntry({ ...entry, genre: e.target.value })}
                />
                <input
                    placeholder='category'
                    type='text'
                    value={entry.category}
                    onChange={e => setEntry({ ...entry, category: e.target.value })}
                />
                {entry.isPaused && <button onClick={handleStart}>+</button>}
                {!entry.isPaused && <button onClick={handleStop}>X</button>}
            </form>

            {!entry.isPaused && `Start timer = ${spitTime(timer)}`}

            {entries && <TimerList entries={entries} />}
        </div>
    )
}

export default index