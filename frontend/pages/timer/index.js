import React, { useEffect, useState } from 'react'
import { useMutation,useQuery } from '@apollo/client'
import {addTimerM, getTimersQ} from '../../gql/queries'
import { useAuthContext } from '../../context/auth'


const MS_TO_HR = 3600000
const MS_TO_MIN = 60000
const MS_TO_SEC = 1000

const spitTime = (ms) => {
    let hr = Math.floor(ms / MS_TO_HR)
    hr = hr == 0 ? `` : `${hr}hrs:`

    let min = Math.floor(ms / MS_TO_MIN)
    min %= 60
    min = min == 0 ? `` : `${min}mins:`

    let sec = Math.floor(ms / MS_TO_SEC)
    sec %= 60
    sec = `${sec}sec`

    const time = `${hr}${min}${sec}`
    return time
}

const index = () => {
    const [auth,setAuth]=useAuthContext()
    const [entries, setEntries] = useState([])
    const getTimers = useQuery(getTimersQ,{variables:{uid:auth}})

    const [addTimer,status]=useMutation(addTimerM,{variables:{uid:auth},refetchQueries:[{query:getTimersQ},'GetTimers']})
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

    useEffect(()=>{
        if(getTimers.data){
            setEntries(getTimers.data.timers)
            console.log(getTimers.data.timers)
        }
    },[getTimers])

    useEffect(() => {
        if (entry.start && entry.end && entry.isPaused) {
            const l={...entry,uid:auth,start:entry.start.toString(),end:entry.end.toString()}
            delete l.isPaused
            console.log(l)
            addTimer({variables:l})
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
            current += 1 * MS_TO_SEC
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

            <ol>
                {entries &&
                    entries.map(
                        elm => (
                            <li key={elm.id}>
                                <ul>
                                    <li>{elm.name || 'No Name'} </li>
                                    <li>{elm.genre || 'No genre'} </li>
                                    <li>{elm.category || 'No category'} </li>
                                    <li>{spitTime(new Date(elm.end) - new Date(elm.start))}</li>
                                </ul>
                            </li>
                        )
                    )
                }
            </ol>
        </div>
    )
}

export default index