import React, { useEffect, useState } from 'react'

const MS_TO_HR= 3600000
const MS_TO_MIN=60000
const MS_TO_SEC=1000

const spitTime=ms=>{
    let hr=Math.floor(ms/MS_TO_HR)
    let min=Math.floor(ms/MS_TO_MIN)
    let sec=Math.floor(ms/MS_TO_SEC)
    ms=Math.floor(((ms/1000)%1)*1000)
    sec%=60
    min%=60
    const time=`${hr}hours:${min}min:${sec}seconds`
    return time
}

const index = () => {
    const [timer,setTimer]=useState()
    const [start,setStart]=useState()
    const [end,setEnd]=useState()
    const [isPaused,setIsPaused]=useState(true)
    const [id,setId]=useState()

    const handleStart=()=>{
        let current=0
        setEnd()
        setStart(new Date())
        setTimer(0)
        setIsPaused(false)

        setId(setInterval(()=>{
            current+=1*MS_TO_SEC
            setTimer(current)
        },1000))

    }

    const handleStop=()=>{
        clearInterval(id)
        setIsPaused(true)
        setTimer(0)
        setId('')
        setEnd(new Date())
    }

    return (
        <div>
            {!isPaused && `Start timer = ${spitTime(timer)}`}
            {isPaused && <button onClick={handleStart}>+</button>}
            {!isPaused && <button onClick={handleStop}>X</button>}
            {isPaused && end && `timeSpent:${spitTime(end-start)}`}
        </div>
    )
}

export default index