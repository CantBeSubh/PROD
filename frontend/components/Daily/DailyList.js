import DailyDue from './DailyDue'
import DailyDone from './DailyDone'
import { useState } from 'react'

const DailyList = ({ dailies }) => {
    const today = new Date()
    today.setHours(24, 0, 0, 0)
    const [show, setShow] = useState(true)
    return (
        <>
            <button onClick={() => setShow(true)}>Due</button>
            <button onClick={() => setShow(false)}>Done</button>
            <ul>
                {
                    dailies.map(daily => {
                        const date = new Date(daily.iat)
                        if (date < today) {
                            return < DailyDue
                                key={daily.id}
                                daily={daily}
                                show={show}
                            />
                        } else {
                            return <DailyDone
                                key={daily.id}
                                daily={daily}
                                show={show}
                            />
                        }
                    }

                    )
                }
            </ul>
        </>
    )
}

export default DailyList