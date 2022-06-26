import { useMutation } from '@apollo/client'

import { delTimerM, getTimersQ } from '../../gql/queries'
import { spitTime } from '../../utils/SpitTime'

const Timer = ({ entry }) => {
    const [delTimer, status2] = useMutation(delTimerM,
        { refetchQueries: [{ query: getTimersQ }, 'GetTimers'] })

    const handleDel = () => {
        delTimer({ variables: { id: entry.id } })
    }

    return (
        <li>
            <a onClick={handleDel}>
                {entry.name || 'No Name'}
            </a>
            <span className='nop'>  {entry.genre || 'No genre'}  </span>
            <span className='nop'> {entry.category || 'No category'}  </span>
            <span className='nop'>  {spitTime(new Date(entry.end) - new Date(entry.start))}  </span>
        </li>
    )
}
export default Timer