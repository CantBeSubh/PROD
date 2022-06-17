import React, { useEffect, useState } from 'react'

const MS_TO_HR= 3600000
const MS_TO_MIN=60000
const MS_TO_SEC=1000

const spitTime = (ms) => {
    let hr=Math.floor(ms/MS_TO_HR)
    hr = hr==0?``:`${hr}hrs:`

    let min=Math.floor(ms/MS_TO_MIN)
    min%=60
    min = min==0?``:`${min}mins:`

    let sec=Math.floor(ms/MS_TO_SEC)
    sec%=60
    sec =`${sec}sec`
    
    const time=`${hr}${min}${sec}`
    return time
}

const index = () => {
    const [entries,setEntries]=useState([])
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

    useEffect(()=>{
        if(entry.start && entry.end && entry.isPaused){
                setEntries([...entries,entry])
                setEntry({        
                name:'',
                genre:'',
                category:'',
                start:null,
                end:null,
                isPaused:true
            })
            }
    },[entry])

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
        setEntry({...entry,end:new Date(),isPaused:true})
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
                    autoComplete='off'
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
                {entry.isPaused && <button onClick={handleStart}>+</button>}
                {!entry.isPaused && <button onClick={handleStop}>X</button>}
            </form>

            {!entry.isPaused && `Start timer = ${spitTime(timer)}`}

            <ol>
            {entries&&
            entries.map(
                elm=>(
                    <li>
                        <ul>
                            <li>{elm.name || 'No Name'} </li>
                            <li>{elm.genre || 'No genre'} </li>
                            <li>{elm.category || 'No category'} </li> 
                            <li>{spitTime(elm.end-elm.start)}</li>
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