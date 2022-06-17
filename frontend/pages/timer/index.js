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
    const [entry,setEntry]=useState({
        name:'',
        genre:'',
        category:'',
        start:null,
        end:null,
        isPaused:true
    })
    const [id,setId]=useState()

    useEffect(()=>console.table(entry),[entry])

    const handleStart=()=>{
        let current=0
        setEntry({...entry,end:null,start:new Date(),isPaused:false})
        setTimer(0)
        setId(setInterval(()=>{
            current+=1*MS_TO_SEC
            setTimer(current)
        },1000))

    }

    const handleStop=()=>{
        clearInterval(id)
        setEntry({name:'',genre:'',category:'',end:new Date(),isPaused:true})
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
                    onChange={e=>setEntry({...entry,name:e.target.value})}
                />
                <input 
                    placeholder='genre' 
                    type='text' 
                    value={entry.genre}
                    onChange={e=>setEntry({...entry,genre:e.target.value})}
                />
                <input 
                    placeholder='category' 
                    type='text' 
                    value={entry.category}
                    onChange={e=>setEntry({...entry,category:e.target.value})}
                />
            </form>

            {!entry.isPaused && `Start timer = ${spitTime(timer)}`}
            {entry.isPaused && <button onClick={handleStart}>+</button>}
            {!entry.isPaused && <button onClick={handleStop}>X</button>}
            {entry.isPaused && entry.end && 
            `timeSpent:${spitTime(entry.end-entry.start)}`}
        </div>
    )
}

export default index