import React, { useEffect, useState } from 'react'
// const id=setInterval(()=>{console.log('Hello')},1000)
// setTimeout(()=>{clearInterval(id)},10000)
const MS_TO_HR= 3600000
const MS_TO_MIN=60000
const MS_TO_SEC=1000

const index = () => {
    const [date,setDate]=useState()
    const [start,setStart]=useState()
    let current = new Date()
    const [isPaused,setIsPaused]=useState(false)
    const [id,setId]=useState()

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

    useEffect(()=>{
        setDate(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} | ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`)
    },[])

    useEffect(()=>{
        console.log(start)
    },[start])
    
    const handleStart=()=>{
        setStart(new Date())
        setId(setInterval(()=>{
            current.setTime(Date.now());
            setDate(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()} | ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`)
        },1000))
    }

    const handleStop=()=>{
        current=Date.now()-start
        clearInterval(id)
        console.log(spitTime(current))
    }

    return (
        <div>
            Start timer = {date}
            <button onClick={handleStart}>+</button>
            <button onClick={handleStop}>X</button>
        </div>
    )
}

export default index