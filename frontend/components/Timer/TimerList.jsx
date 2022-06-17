import React from 'react'
import Timer from './Timer'

const TimerList = ({ entries }) => {
    return (
        <ol>
            {
                entries && entries.map(
                    entry => <Timer entry={entry} key={entry.id} />
                )
            }
        </ol>
    )
}

export default TimerList