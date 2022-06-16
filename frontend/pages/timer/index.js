import React, { useEffect, useState } from 'react'
// const id=setInterval(()=>{console.log('Hello')},1000)
// setTimeout(()=>{clearInterval(id)},10000)
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
    const time=`${hr}hours:${min}min:${sec}seconds:${ms}ms`
    return time
}

const time=t=>{
    return `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()} | ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
}

const index = () => {
    const [date,setDate]=useState('')
    const [start,setStart]=useState(new Date())
    const [timeSpent,setTimeSpent]=useState('')
    const [isPaused,setIsPaused]=useState(true)
    const [id,setId]=useState()
    let current = new Date()

    const handleStart=()=>{
        setStart(new Date())
        setDate(time(new Date()))
        setIsPaused(false)
        setTimeSpent('')
        setId(setInterval(()=>{
            current = new Date();
            console.log(start)
            setDate(spitTime(current-start))
        },1000))
    }

    const handleStop=()=>{
        clearInterval(id)
        setDate('')
        setId('')
        setIsPaused(true)
        setTimeSpent(spitTime(Date.now()-start))
        setStart()
    }

    return (
        <div>
            {!isPaused && `Start timer = ${date}`}
            {isPaused && <button onClick={handleStart}>+</button>}
            {!isPaused && <button onClick={handleStop}>X</button>}
            {isPaused && `timeSpent:${timeSpent}`}
        </div>
    )
}

export default index