import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { delTimerM, getTimersQ } from '../../gql/queries'
import { spitTime } from '../../utils/SpitTime'

const Timer = ({ entry }) => {
    const [show, setShow] = useState(false)
    const [delTimer, status2] = useMutation(delTimerM,
        { refetchQueries: [{ query: getTimersQ }, 'GetTimers'] })

    const handleDel = () => {
        delTimer({ variables: { id: entry.id } })
    }
    const handleDisplay = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    return (
        <li>
            <a
                onClick={handleDel}
                onContextMenu={handleDisplay}
            >
                {entry.name || 'No Name'}
            </a>
            {
                show &&
                <>
                    <span className='nop'>  {entry.genre || 'No genre'}  </span>
                    <span className='nop'> {entry.category || 'No category'}  </span>
                </>
            }
            <span className='nop'> {spitTime(new Date(entry.end) - new Date(entry.start))}
            </span>
        </li>
    )
}
export default Timer