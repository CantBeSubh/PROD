import React from 'react'
import { spitTime } from '../../utils/SpitTime'
import { delTimerM, getTimersQ } from '../../gql/queries'
import { useMutation } from '@apollo/client'
const Timer = ({ entry }) => {
    const [delTimer, status2] = useMutation(delTimerM, { refetchQueries: [{ query: getTimersQ }, 'GetTimers'] })

    return (
        <div>
            <li>
                <ul>
                    <li>{entry.name || 'No Name'} </li>
                    <li>{entry.genre || 'No genre'} </li>
                    <li>{entry.category || 'No category'} </li>
                    <li>{spitTime(new Date(entry.end) - new Date(entry.start))}</li>
                    <button onClick={() => delTimer({ variables: { id: entry.id } })}>-</button>
                </ul>
            </li>
        </div>
    )
}

export default Timer